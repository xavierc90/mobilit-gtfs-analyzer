// Minimal uploaded file shape

export type UploadedFile = {
  originalname: string;
  mimetype: string;
  size: number;
};

export type UploadMetadata = {
  originalName: string;
  mimeType: string;
  size: number;
  extension: string;
};