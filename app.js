const API_TOKEN = "r8_HLkLvFu9XD4YRljuP59vh9pXbrLQqg61l5s1A"; // Your Replicate API token
const MODEL_VERSION = "f121d640bd286e1fdc67f9799164c1d5be36ff74576ee11c803ae5b665dd46aa"; // Replace with your Replicate Real-ESRGAN version

const uploadInput = document.getElementById("uploadInput");
const enhanceBtn = document.getElementById("enhanceBtn");
const originalImg = document.getElementById("originalImg");
const enhancedImg = document.getElementById("enhancedImg");

let selectedFile = null;

uploadInput.addEventListener("change", e => {
  selectedFile = e.target.files[0];
  if (selectedFile) originalImg.src = URL.createObjectURL(selectedFile);
});

enhanceBtn.addEventListener("click", async () => {
  if (!selectedFile) return alert("Please select an image first!");

  enhanceBtn.textContent = "Enhancing...";
  enhanceBtn.disabled = true;

  const reader = new FileReader();
  reader.readAsDataURL(selectedFile);
  reader.onloadend = async () => {
    const base64Image = reader.result;

    try {
      const response = await fetch("https://api.replicate.com/v1/predictions", {
        method: "POST",
        headers: {
          "Authorization": `Token ${API_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          version: MODEL_VERSION,
          input: { image: base64Image }
        })
      });

      const data = await response.json();
      enhancedImg.src = data.output[0]; // display enhanced image

    } catch (err) {
      alert("Error: " + err.message);
    }

    enhanceBtn.textContent = "Enhance Photo";
    enhanceBtn.disabled = false;
  };
});