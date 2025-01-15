export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        resolve(reader.result as string);
      } else {
        reject(new Error("Failed to convert file to Base64"));
      }
    };
    reader.onerror = () => reject(new Error("FileReader error occurred"));
    reader.readAsDataURL(file);
  });
}
