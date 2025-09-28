import React, { useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000'); // 🚀 Backend bağlantısı

export default function RegisterForm({ onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Lütfen kullanıcı adı ve şifre girin!");
      return;
    }

    // 🚀 Backend’e kullanıcıyı gönder
    socket.emit('registerUser', { username, password });

    // ✅ Backend’dan yanıt gelirse
    socket.once('registrationSuccess', (response) => {
      alert(response.message);
      onRegister({ username }); // Ana bileşene kullanıcıyı bildir
    });
  };
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-turkishRed mb-6 text-center">Kayıt Ol</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Kullanıcı Adı</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-turkishRed"
            placeholder="Kullanıcı adınızı girin"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Şifre</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-turkishRed"
            placeholder="Şifrenizi girin"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-turkishRed text-white py-2 rounded hover:bg-red-700 transition"
        >
          Kayıt Ol
        </button>
      </form>
    </div>
  );
            }
