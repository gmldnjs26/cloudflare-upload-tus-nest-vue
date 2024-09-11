"use client";

import { useUpload } from "@/contexts/uploadContext";

export default function UploadPage() {
  const { startUpload } = useUpload();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      startUpload(file);
    }
  };
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
}
