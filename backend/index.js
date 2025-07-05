import express from 'express';
import cors from 'cors';
import wishlistRouter from './routes/wishlist.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/wishlists', wishlistRouter);

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Backend running at http://localhost:${PORT}`));
