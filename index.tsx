
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

console.log("WellSphere: Application mounting...");

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("WellSphere: Application rendered successfully.");
} catch (error) {
  console.error("WellSphere: Mount error", error);
}
