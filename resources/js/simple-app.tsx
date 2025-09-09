import React from 'react';
import { createRoot } from 'react-dom/client';

// Most basic React component possible
const SimpleApp = () => {
  return (
    <div style={{ 
      padding: '20px',
      margin: '20px',
      backgroundColor: '#e6f7ff',
      border: '2px solid #1890ff',
      borderRadius: '8px'
    }}>
      <h1>Simple React App</h1>
      <p>This is a minimal React application to test if React is working correctly.</p>
    </div>
  );
};

// Basic mounting code
console.log('Simple React app mounting...');
const container = document.getElementById('react-app');

if (container) {
  console.log('Found mount element');
  try {
    const root = createRoot(container);
    root.render(<SimpleApp />);
    console.log('React app mounted successfully');
  } catch (error) {
    console.error('Failed to mount React app:', error);
    // Show error visually
    container.innerHTML = `
      <div style="padding: 20px; border: 2px solid red; margin: 20px; background-color: #fff1f0">
        <h2 style="color: #cf1322">React Mounting Error</h2>
        <p>${error instanceof Error ? error.message : String(error)}</p>
      </div>
    `;
  }
} else {
  console.error('Mount element not found!');
}
