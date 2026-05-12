import { useState } from "react";
import { uploadGtfsZip } from "../services/upload.service";

export function useUploadGtfs() {
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");

  async function upload(file: File) {
    try {
      setIsUploading(true);
      setMessage("");

      const result = await uploadGtfsZip(file);

      setMessage(result.message);
    } catch {
      setMessage("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  }

  return {
    upload,
    isUploading,
    message,
  };
}