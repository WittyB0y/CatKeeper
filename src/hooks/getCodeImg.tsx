export const getCodeImg = async () => {
    try {
      const response = await fetch('https://barcodeapi.org/api/128/22400000060415314');
      const imageData = await response.text();
  
      // Assuming 'imageData' is the URL of the image
      return imageData;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  