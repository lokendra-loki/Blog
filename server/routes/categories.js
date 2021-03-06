const router = require("express").Router();
const Category = require("../models/Category");

//CREATE NEW CATEGORY
router.post("/", async (req, res) => {
  try {
    const newCat = new Category(req.body);
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//GET ALL CATEGORY
router.get("/", async (req, res) => {
  try {
    const Cats = await Category.find();
    res.status(200).json(Cats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
