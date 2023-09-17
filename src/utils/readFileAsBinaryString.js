async function readFileAsBinaryString(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      resolve(reader.result);
    };

    reader.onerror = (event) => {
      reject(event.target.error);
    };

    reader.readAsDataURL(file);
  });
}

export default readFileAsBinaryString;
