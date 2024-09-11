import { atom } from "recoil";
import { Upload } from "tus-js-client";

export const uploadState = atom<Upload | null>({
  key: "uploadState",
  default: null,
});
