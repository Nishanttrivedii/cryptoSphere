// Vanta.js

import 'three'; // Import three.r134.min.js (make sure it's available in your project)
import 'vanta/dist/vanta.net.min'; // Import vanta.net.min.js (make sure it's available in your project)

const initializeVanta = () => {
  if (window.VANTA) {
    window.VANTA.NET({
      el: "#vanta-container", // Replace with your desired selector
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 875,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0x9e24d7,
      backgroundColor: 0x16161e,
      points: 12.00,
      maxDistance: 27.00
    });
  }
};

export default initializeVanta;
