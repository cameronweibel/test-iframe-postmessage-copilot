import React, { useState, useEffect } from 'react';

const App = () => {
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const handleMessage = (event) => {
            // You might want to check the origin of the message for security
            // if (event.origin !== "http://expected-origin.com") return;

            setMessage(event.data);
        };

        window.addEventListener('message', handleMessage);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div className="App">
            <header className="App-header">
                <h1>Hello, World!</h1>
                {message && (
                    <div>
                        <p>Received message:</p>
                        <p>Type: {message.type}</p>
                        <p>Data: {JSON.stringify(message.data)}</p>
                    </div>
                )}
            </header>
        </div>
    );
};

export default App;