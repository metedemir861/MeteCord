const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('✅ [Backend] Yeni kullanıcı bağlandı:', socket.id);

  socket.on('sendMessage', (data) => {
    console.log('📩 Gelen mesaj:', data);
    socket.broadcast.emit('receiveMessage', data);
  });
// 🆕 Yeni: Kullanıcı kayıt olayı
socket.on('registerUser', (userData) => {
  console.log('🆕 Yeni kullanıcı kayıt oldu:', userData);
  // Daha sonra burada veritabanına kaydedeceğiz
  socket.emit('registrationSuccess', { message: "Kayıt başarılı!", username: userData.username });
});
  socket.on('disconnect', () => {
    console.log('❌ [Backend] Kullanıcı ayrıldı:', socket.id);
  });
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`🚀 [Backend] MeteCord Server çalışıyor: http://localhost:${PORT}`);
});
