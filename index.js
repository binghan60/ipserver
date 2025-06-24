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

app.set('trust proxy', true); // 有 proxy 一定要開

app.get('/ip', (req, res) => {
  const requestIpClient = req.clientIp; // request-ip 套件抓的 IP
  let expressIp = req.ip; // Express 內建的 req.ip

  // 把 ::ffff: 開頭的 IPv6 映射格式轉成 IPv4
  if (expressIp && expressIp.startsWith('::ffff:')) {
    expressIp = expressIp.substring(7);
  }

  res.json({
    requestIpClient,
    expressIp,
  });
});

app.listen(PORT, () => {
  console.log(`BFF Server運行於 http://localhost:${PORT}`);
});
