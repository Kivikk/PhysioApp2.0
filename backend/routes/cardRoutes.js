import express from 'express';
import {
  getAllCards,
  getCardById,
  createCard,
  updateCard,
  deleteCard,
  getCardsByCategory
} from '../controllers/cardController.js';

const router = express.Router();

// Public routes
router.get('/', getAllCards);
router.get('/:id', getCardById);
router.get('/category/:category', getCardsByCategory);

// Diese Routes werden später durch Auth geschützt
router.post('/', createCard);
router.patch('/:id', updateCard);
router.delete('/:id', deleteCard);

export default router;