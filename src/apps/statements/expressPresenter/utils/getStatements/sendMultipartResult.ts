import { Response } from 'express';
import AttachmentModel from '../../../models/AttachmentModel';
import streamStatementsWithAttachments, { boundary } from './streamStatementsWithAttachments';

export default async (jsonResponse: Object, attachments: AttachmentModel[], res: Response) => {
  res.setHeader('Content-Type', `multipart/mixed; charset=UTF-8; boundary=${boundary}`);
  res.status(200);
  await streamStatementsWithAttachments(jsonResponse, attachments, res);
};
