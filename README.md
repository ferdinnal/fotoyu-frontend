# 🌍 Fotoyu Frontend (React Native + Expo)

The **mobile client** for the Fotoyu project — an interactive map-based app that allows users to view, explore, and add Trees 🌳 or Spots 📍 around Semarang.

---

## 🚀 Overview

Fotoyu Frontend is built using **React Native** with **Expo**, providing a cross-platform experience for both Android and iOS devices.

### Key Features
- 🗺️ Interactive Google Map display using `react-native-maps`
- 🌳 Custom markers for “Tree” or “Spot”
- 📷 Add new locations with name, description, and photo upload
- 🧭 Center map on current GPS location
- 🪟 Bottom sheet/modal detail view for marker information
- 🔄 Auto refresh after adding new markers

---

## 🧩 Tech Stack
- **React Native (Expo)**
- **TypeScript**
- **Axios** for API communication
- **Expo Image Picker**
- **Expo Location**
- **React Native Maps**

---

## ⚙️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<yourusername>/fotoyu.git
   cd fotoyu/fotoyu-frontend
2. Install dependencies:

npm install


3. Start the Expo development server:

npx expo start


4. Scan the QR code with the Expo Go app (Android/iOS).

🔗 Environment Configuration

In utils/api.ts, ensure the API URL points to your backend instance:

export const API_URL = "https://fotoyu-backend-production.up.railway.app/api/locations";

📱 Usage

Long-press anywhere on the map to add a new Tree or Spot.

Fill in the name, description, type, and optionally pick a photo.

Tap on any marker to view details.

Use the 📍 button to re-center the map to your current GPS location.

🧭 Project Structure
fotoyu-frontend/
├── App.tsx
├── components/
│   ├── MapViewComponent.tsx
│   ├── MarkerDetailModal.tsx
│   └── AddLocationForm.tsx
├── assets/
│   ├── tree.png
│   └── spot.png
└── utils/
    ├── api.ts

🧪 Testing on Android Device

Ensure your Android device and development PC are on the same network.

Run:

npx expo start


Open the Expo Go app → Scan the QR code.

🩵 UI/UX Expectations

Clean, minimal, and consistent design.

Smooth map interactions and intuitive controls.

Responsive for both Android and iOS.

🧰 Troubleshooting
Issue	Possible Fix
Permission denied for location	Ensure location access is granted in system settings
Image picker not working	Add permission request using expo-image-picker
Markers not appearing	Check backend API URL or network connection
📜 License

MIT © 2025 Fotoyu Team
