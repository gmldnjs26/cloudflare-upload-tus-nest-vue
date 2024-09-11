"use client";

import { UploadProvider } from "@/contexts/uploadContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <UploadProvider>{children}</UploadProvider>;
}
