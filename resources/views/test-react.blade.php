<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React Test</title>
    <script src="https://unpkg.com/react@18.2.0/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.development.js" crossorigin></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
    <div id="root"></div>
    
    <script type="text/babel">
        // Basic React component
        function App() {
            const styles = {
                padding: '20px',
                margin: '20px',
                border: '2px solid blue',
                borderRadius: '8px'
            };
            
            return (
                <div style={styles}>
                    <h1>React Test App</h1>
                    <p>If you can see this, React is working!</p>
                </div>
            );
        }
        
        // Mount the component
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
    </script>
</body>
</html>
