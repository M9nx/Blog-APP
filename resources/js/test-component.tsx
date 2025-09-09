import React from 'react';
import ReactDOM from 'react-dom/client';

// Simple test component
const TestComponent: React.FC = () => {
  return (
    <div style={{ 
      padding: '20px',
      margin: '20px',
      backgroundColor: '#f0f8ff',
      border: '2px solid blue',
      borderRadius: '8px'
    }}>
      <h2 style={{ color: '#0066cc' }}>React Test Component</h2>
      <p>If you see this, React is working correctly!</p>
    </div>
  );
};

// Mount the component
console.log('Test component is loading...');
const mountElement = document.getElementById('react-app');

if (mountElement) {
  console.log('Found mount element, rendering test component');
  try {
    const root = ReactDOM.createRoot(mountElement);
    root.render(
      <React.StrictMode>
        <TestComponent />
      </React.StrictMode>
    );
    console.log('Test component rendered successfully');
  } catch (error) {
    console.error('Failed to render test component:', error);
    
    // Add visible error on page
    const errorDiv = document.createElement('div');
    errorDiv.style.padding = '20px';
    errorDiv.style.margin = '20px';
    errorDiv.style.backgroundColor = '#fff0f0';
    errorDiv.style.border = '2px solid red';
    errorDiv.innerHTML = `
      <h3>React Rendering Error</h3>
      <p>Error: ${error instanceof Error ? error.message : String(error)}</p>
    `;
    document.body.appendChild(errorDiv);
  }
} else {
  console.error('Could not find element with ID "react-app"');
}
