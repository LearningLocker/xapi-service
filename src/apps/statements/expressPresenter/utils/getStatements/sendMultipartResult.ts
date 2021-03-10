import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import AttachmentModel from '../../../models/AttachmentModel';
import streamStatementsWithAttachments, { boundary } from './streamStatementsWithAttachments';

export default async (jsonResponse: any, attachments: AttachmentModel[], res: Response) => {
  res.setHeader('Content-Type', `multipart/mixed; charset=UTF-8; boundary=${boundary}`);
  res.status(StatusCodes.OK);
  await streamStatementsWithAttachments(jsonResponse, attachments, res);
};
