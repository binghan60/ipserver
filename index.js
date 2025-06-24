import express from 'express';
import cors from 'cors';
import requestIp from 'request-ip';

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(requestIp.mw());
// request-ip 套件版
app.get('/requestIP', (req, res) => {
  const ip = req.clientIp;
  res.send(`你的 IP 是：${ip}`);
});
// 純 EXPRESS 框架版
app.get('/expressIP', (req, res) => {
  const ip = req.ip;
  res.send(`你的 IP 是：${ip}`);
});
app.listen(PORT, () => {
  console.log(`BFF Server運行於 http://localhost:${PORT}`);
});
