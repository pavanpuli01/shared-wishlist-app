import express from 'express';
import { db } from '../firebase.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const snap = await db.collection('wishlists').get();
  const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(data);
});

router.post('/', async (req, res) => {
  const { name, items, createdBy } = req.body;
  const ref = await db.collection('wishlists').add({
    name,
    items,
    createdBy,
    createdAt: Date.now()
  });
  res.json({ id: ref.id });
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  await db.collection('wishlists').doc(id).update(updateData);
  res.json({ updated: true });
});

export default router;
