"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { Upload } from "tus-js-client";

interface IUploadContext {
  upload: Upload | null;
  progress: number;
  startUpload: (file: File) => void;
  cancelUpload: () => void;
}

const UploadContext = createContext<IUploadContext>({
  upload: null,
  progress: 0,
  startUpload: () => {},
  cancelUpload: () => {},
});

export const UploadProvider = ({ children }: { children: ReactNode }) => {
  const [upload, setUpload] = useState<Upload | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const startUpload = useCallback((file: File) => {
    const newUpload = new Upload(file, {
      endpoint: "http://localhost:3000/uploads",
      chunkSize: 8 * 1024 ** 2,
      metadata: {
        filename: file.name,
      },
      headers: {
        Accept: "application/json",
      },
      onProgress: (bytesUploaded, bytesTotal) => {
        console.log(`Upload progress: ${bytesUploaded}/${bytesTotal}`);
        setProgress((bytesUploaded / bytesTotal) * 100);
      },
      onSuccess: () => {
        console.log("Upload finished");
      },
    });
    newUpload.start();
    setUpload(newUpload);
  }, []);

  const cancelUpload = useCallback(() => {
    if (upload) {
      upload.abort();
    }
  }, [upload]);

  return (
    <UploadContext.Provider
      value={{ upload, progress, startUpload, cancelUpload }}
    >
      {children}
    </UploadContext.Provider>
  );
};

export const useUpload = () => useContext(UploadContext);
