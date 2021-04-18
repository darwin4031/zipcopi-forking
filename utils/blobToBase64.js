/**
 * Get base64, including string `data:image/blabla, `
 * @param {Blob} blob
 */
const blobToBase64 = (blob) => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onloadend = function () {
      const base64Img = reader.result;
      return resolve(base64Img);
    };

    reader.readAsDataURL(blob);
  });
};

export default blobToBase64;
