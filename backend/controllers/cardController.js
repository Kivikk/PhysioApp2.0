import mongoose from "mongoose";
import Card from "../models/Card.js";

// Get all cards
export const getAllCards = async (req, res) => {
  console.log('GET /api/cards request received');
  try {
    console.log('Starting database query...');
    // Zunächst zählen wir alle Dokumente
    const count = await Card.countDocuments();
    console.log(`Total documents in collection: ${count}`);

    // Dann führen wir die normale Query aus
    const cards = await Card.find()
      .sort({ createdAt: -1 })
      .lean() // für bessere Performance
      .exec();

    console.log('Query completed');
    console.log(`Found ${cards.length} cards in total`);
    console.log('First card title:', cards[0]?.title);
    console.log('Collection stats:', JSON.stringify({
      totalCount: count,
      returnedCount: cards.length,
      hasMore: count > cards.length
    }));

    res.status(200).json(cards);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get single card by id
export const getCardById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Card not found." });
    }
    const card = await Card.findById(id);
    if (!card) {
      return res.status(404).json({ message: "Card not found." });
    }
    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST create a new card
export const createCard = async (req, res) => {
  try {
    const card = await Card.create(req.body);
    res.status(201).json(card);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT/PATCH update a card
export const updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Card not found." });
    }
    const card = await Card.findByIdAndUpdate(id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!card) {
      return res.status(404).json({ message: "Card not found." });
    }
    res.status(200).json(card);
  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE a card
export const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Card not found." });
    }
    const card = await Card.findByIdAndDelete(id);
    if (!card) {
      return res.status(404).json({ message: "Card not found." });
    }
    res.status(200).json({ message: "Card deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET cards by category
export const getCardsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const cards = await Card.find({ category }).sort({ createdAt: -1 });
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};