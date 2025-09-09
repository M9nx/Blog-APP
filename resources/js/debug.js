// This is a debug file to help identify React initialization issues
import React from 'react';
import ReactDOM from 'react-dom/client';

console.log('Debug script loaded');

// Check React availability
console.log('React imported:', React?.version);

// Check ReactDOM availability
console.log('ReactDOM imported:', ReactDOM ? 'Yes' : 'No');

// Check if mount point exists
const reactAppElement = document.getElementById('react-app');
if (reactAppElement) {
  console.log('React app mount point found:', reactAppElement);
} else {
  console.log('React app mount point not found!');
}

// Add a visible element to confirm the script is running
const debugElement = document.createElement('div');
debugElement.style.padding = '20px';
debugElement.style.margin = '20px';
debugElement.style.backgroundColor = '#f0f0f0';
debugElement.style.border = '2px solid red';
debugElement.innerHTML = `
  <h3>React App Debug</h3>
  <p>This element was added by the debug script</p>
  <p>If you see this, the JavaScript is loading, but React might have issues mounting</p>
`;

// Add to the body or to the react-app element if it exists
(reactAppElement || document.body).appendChild(debugElement);
