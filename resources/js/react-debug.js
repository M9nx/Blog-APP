// Debug script to help troubleshoot React issues

// 1. Check browser environment
console.log('DEBUG: Browser compatibility check...');
console.log('UserAgent:', navigator.userAgent);
console.log('React 18 compatibility mode active');

// 2. Add visual indicator to the page
document.addEventListener('DOMContentLoaded', function() {
  const debugPanel = document.createElement('div');
  debugPanel.style.position = 'fixed';
  debugPanel.style.bottom = '10px';
  debugPanel.style.right = '10px';
  debugPanel.style.padding = '10px';
  debugPanel.style.background = 'rgba(0,0,0,0.7)';
  debugPanel.style.color = '#fff';
  debugPanel.style.borderRadius = '4px';
  debugPanel.style.fontFamily = 'monospace';
  debugPanel.style.zIndex = '9999';
  debugPanel.innerHTML = 'React 18 Debug Mode';
  
  document.body.appendChild(debugPanel);
  
  // Check if React mounted
  setTimeout(() => {
    const reactApp = document.getElementById('react-app');
    if (reactApp && reactApp.children.length > 0) {
      debugPanel.style.background = 'rgba(0,128,0,0.7)';
      debugPanel.innerHTML = 'React mounted successfully';
    } else {
      debugPanel.style.background = 'rgba(255,0,0,0.7)';
      debugPanel.innerHTML = 'React failed to mount';
    }
  }, 2000);
});
