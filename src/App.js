import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const App = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const handleMessage = (event) => {
            // You might want to check the origin of the message for security
            // if (event.origin !== "http://expected-origin.com") return;

            setMessages(prevMessages => [...prevMessages, event.data]);
        };

        window.addEventListener('message', handleMessage);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []); // Empty dependency array means this effect runs once on mount

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Hello, World!</h1>
                <h2>Received Messages:</h2>
                {messages.length === 0 ? (
                    <p>No messages received yet.</p>
                ) : (
                    <div style={{ width: '80%', margin: 'auto' }}>
                        <Slider {...settings}>
                            {messages.map((message, index) => (
                                <div key={index} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
                                    <h3>Message {index + 1}</h3>
                                    <p>Type: {message.type}</p>
                                    <p>Data: {JSON.stringify(message.data)}</p>
                                </div>
                            ))}
                        </Slider>
                    </div>
                )}
            </header>
        </div>
    );
};

export default App;