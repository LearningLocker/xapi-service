
import * as jwt from 'jsonwebtoken';
import { Dictionary, includes, isArray } from 'lodash';
import { sha1 } from 'object-hash';
import { PassThrough } from 'stream';
import streamToString from 'stream-to-string';
import InvalidJws from '../../../errors/InvalidJws';
import InvalidSignatureAlgorithm from '../../../errors/InvalidSignatureAlgorithm';
import InvalidSignedStatement from '../../../errors/InvalidSignedStatement';
import InvalidX5CChain from '../../../errors/InvalidX5CChain';
import InvalidX5CType from '../../../errors/InvalidX5CType';
import JsonSyntaxError from '../../../errors/JsonSyntaxError';
import AttachmentModel from '../../../models/AttachmentModel';
import Statement from '../../../models/Statement';

const decodeToken = (token: string, path: string[]): any => {
  try {
    return jwt.decode(token, { json: true, complete: true });
  } catch {
    throw new JsonSyntaxError(path);
  }
};

export default async (
  statement: Statement,
  uniqueHashAttachmentDictionary: Dictionary<AttachmentModel>,
): Promise<void> => {
  const attachments = (
    statement.attachments !== undefined ? statement.attachments : []
  );
  const signaturedAttachments = attachments.filter((attachment) => {
    return attachment.usageType === 'http://adlnet.gov/expapi/attachments/signature';
  });

  if (signaturedAttachments.length === 0) {
    return;
  }

  const nonSignaturedAttachments = attachments.filter((attachment) => {
    return attachment.usageType !== 'http://adlnet.gov/expapi/attachments/signature';
  });
  const originalStatement = {
    ...statement,
    attachments: nonSignaturedAttachments,
  };

  if (originalStatement.attachments.length === 0) {
    delete originalStatement.attachments;
  }

  const originalStatementHash = sha1(originalStatement);
  const attachmentChecks = signaturedAttachments.map(async (signaturedAttachment) => {
    const hash = signaturedAttachment.sha2;
    const attachment = uniqueHashAttachmentDictionary[hash];
    const stream = attachment.stream.pipe(new PassThrough());
    const token = await streamToString(stream);
    const decodedToken = decodeToken(token, ['statement', originalStatement.id, 'attachments']);

    // Validates that the signature uses a valid algorithm.
    const decodedHeaders = decodedToken.header;
    if (!includes(['RS256', 'RS384', 'RS512'], decodedHeaders.alg)) {
      throw new InvalidSignatureAlgorithm(originalStatement.id, decodedHeaders.alg);
    }

    // Validates the decoded x5c header.
    const decodedX5C = decodedHeaders.x5c as string[] | undefined;
    if (decodedX5C !== undefined) {
      if (!isArray(decodedX5C)) {
        throw new InvalidX5CType(originalStatement.id);
      }
      if (decodedX5C.length === 0) {
        throw new InvalidX5CChain(originalStatement.id);
      }

      // Gets the public key from the decoded x5c header.
      const publicKeyDER = decodedX5C[0];
      const splitDER = publicKeyDER.replace(/(.{64})/g, '$1\n');
      const publicKey = `-----BEGIN CERTIFICATE-----\n${splitDER}\n-----END CERTIFICATE-----`;

      try {
        jwt.verify(token, publicKey);
      } catch {
        throw new InvalidJws(originalStatement.id);
      }
    }

    // Validates that the decoded statement matches the original statement.
    const decodedStatement = decodedToken.payload;
    const decodedStatementHash = sha1(decodedStatement);
    if (originalStatementHash !== decodedStatementHash) {
      throw new InvalidSignedStatement(originalStatement, decodedStatement);
    }
  });
  await Promise.all(attachmentChecks);
};
