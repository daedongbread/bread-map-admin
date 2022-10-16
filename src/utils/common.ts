const blobToFile = (theBlob: Blob, fileName: string): File => {
  return new File([theBlob as any], fileName, {
    lastModified: new Date().getTime(),
    type: theBlob.type,
  });
};

const urlToFile = async (url: string, fileName: string): Promise<File> => {
  const file = await fetch(url)
    .then(r => r.blob())
    .then(blobFile => blobToFile(blobFile, fileName));

  return file;
};

export { urlToFile };
