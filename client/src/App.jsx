import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import RegisterForm from './RegisterForm'; // 🆕 Yeni bileşeni dahil ettik

const socket = io('http://localhost:4000');

function App() {
  const [currentUser, setCurrentUser] = useState(null); // Kullanıcı kayıtlı mı?
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

  const handleRegister = (userData) => {
    console.log("🆕 Yeni kullanıcı kayıt oldu:", userData);
    setCurrentUser(userData.username); // Kullanıcıyı sisteme al
    alert(`Hoş geldin, ${userData.username}!`);
  };

  const handleSendMessage = () => {
    if (!currentUser) {
      alert("Önce kayıt olmalısın!");
      return;
    }
    const message = {
      username: currentUser,
      text: "Yerli ve Milli!",
      time: new Date().toLocaleTimeString()
    };
    socket.emit('sendMessage', message);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-turkishRed text-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <img src="/logo.svg" alt="MeteCord Logo" className="h-10" />
          <h1 className="text-2xl font-bold">MeteCord</h1>
        </div>
        <p className="text-sm italic hidden md:block">Yerli Ve Milli MeteCord</p>
      </header>

      {/* Ana Alan */}
      <main className="flex-1 p-4 overflow-y-auto">
        {!currentUser ? (
          // 👉 Kullanıcı yoksa kayıt formunu göster
          <RegisterForm onRegister={handleRegister} />
        ) : (
          // 👉 Kullanıcı varsa sohbet ekranını göster
          <div className="max-w-2xl mx-auto">
            <div className="mb-4 text-lg font-semibold">
              Hoş geldin, <span className="text-turkishRed">{currentUser}</span>!
            </div>
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
        )}
      </main>
    </div>
  );
}

export default App;
