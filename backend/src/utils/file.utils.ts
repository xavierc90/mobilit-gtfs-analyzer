// Basic upload safety checks

const ZIP_MIME_TYPES = [
  "application/zip",
  "application/x-zip-compressed",
  "multipart/x-zip",
];

const MAX_UPLOAD_SIZE = 25 * 1024 * 1024; // 25 MB

export function isZipFile(filename: string): boolean {
  return filename.toLowerCase().endsWith(".zip");
}

export function isZipMimeType(mimeType: string): boolean {
  return ZIP_MIME_TYPES.includes(mimeType);
}

export function isAllowedFileSize(size: number): boolean {
  return size > 0 && size <= MAX_UPLOAD_SIZE;
}