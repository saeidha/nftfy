export const GenerateRandomImageBase64 = (
  width: number,
  height: number
): string => {
  // Create a canvas element
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas not supported");
  }

  // Fill the canvas with a random background color
  context.fillStyle = `hsl(${Math.random() * 360}, 100%, 80%)`;
  context.fillRect(0, 0, width, height);

  // Add random circles
  for (let i = 0; i < 10; i++) {
    context.beginPath();
    const x = Math.random() * width;
    const y = Math.random() * height;
    const radius = Math.random() * 50 + 10;
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
    context.fill();
  }

  // Add random lines
  for (let i = 0; i < 10; i++) {
    context.beginPath();
    context.moveTo(Math.random() * width, Math.random() * height);
    context.lineTo(Math.random() * width, Math.random() * height);
    context.strokeStyle = `hsl(${Math.random() * 360}, 100%, 30%)`;
    context.lineWidth = Math.random() * 5 + 1;
    context.stroke();
  }

  // Convert the canvas content to a Base64 string
  return canvas.toDataURL("image/png"); // Returns a Base64 string
};
