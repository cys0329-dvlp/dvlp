
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

console.log("WellSphere: Initiating mount sequence...");

const container = document.getElementById('root');

if (!container) {
  console.error("WellSphere: Target container #root not found.");
} else {
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("WellSphere: Application mounted successfully.");
  } catch (err) {
    console.error("WellSphere: Critical mount failure:", err);
    container.innerHTML = `<div style="padding: 20px; color: red;">런타임 에러: ${err.message}</div>`;
  }
}
