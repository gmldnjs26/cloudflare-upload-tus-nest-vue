
<script lang="ts" setup>
import { Upload } from 'tus-js-client';
const onFileChanged = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files as FileList;
  const file = files[0];
  const upload = new Upload(file, {
    endpoint: 'http://localhost:3000/uploads',
    chunkSize: 8 * 1024 ** 2, // 8MB
    // retryDelays: [0, 3000, 5000, 10000, 20000],
    metadata: {
      name: file.name,
    },
    headers: {
      Accept: 'application/json',
    },
    onProgress(bytesUploaded, bytesTotal) {
      console.log(bytesUploaded, bytesTotal);
    },
    onSuccess() {
      console.log('Upload finished:');
    },
  });
  upload.findPreviousUploads().then(previousUploads => {
    // Found previous uploads so we select the first one.
    if (previousUploads.length) {
      // upload.resumeFromPreviousUpload(previousUploads[0]);
    }
    // Start the upload
    upload.start();
  });
};
</script>

<template>
  <input type="file" @change="onFileChanged" />
</template>