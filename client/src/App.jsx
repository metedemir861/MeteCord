import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log("🔌 Frontend, backend'e bağlandı!");

    socket.on('receiveMessage', (data) => {
      setMessages(prev => [...prev, data]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const handleSendMessage = () => {
    const message = {
      username: "Mete",
      text: "Yerli ve Milli!",
      time: new Date().toLocaleTimeString()
    };
    socket.emit('sendMessage', message);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-turkishRed text-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <img src="/logo.svg" alt="MeteCord Logo" className="h-10" />
          <h1 className="text-2xl font-bold">MeteCord</h1>
        </div>
        <p className="text-sm italic hidden md:block">Yerli Ve Milli MeteCord</p>
      </header>

      <main className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={handleSendMessage}
            className="mb-4 bg-turkishRed text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            📩 Mesaj Gönder (Test)
          </button>

          <div className="space-y-3">
            {messages.map((msg, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <strong className="text-turkishRed">{msg.username}:</strong>{" "}
                {msg.text}{" "}
                <span className="text-xs text-gray-500">({msg.time})</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
