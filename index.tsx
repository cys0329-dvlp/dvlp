
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

console.log("WellSphere: Initializing React application...");

const container = document.getElementById('root');

if (!container) {
  console.error("Critical: #root element not found in DOM.");
} else {
  try {
    const root = ReactDOM.createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("WellSphere: Mount successful.");
  } catch (err: any) {
    console.error("WellSphere: Rendering error:", err);
    container.innerHTML = `
      <div style="padding: 20px; color: #b91c1c; font-family: sans-serif;">
        <h2 style="font-size: 18px; font-weight: bold;">렌더링 중 오류가 발생했습니다.</h2>
        <p style="font-size: 14px;">${err?.message || '알 수 없는 오류'}</p>
      </div>
    `;
  }
}
