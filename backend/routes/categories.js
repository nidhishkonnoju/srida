const express = require('express');
const Category = require('../models/Category');
const router = express.Router();

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create sample data for Srida Wedding Planner
router.post('/sample-data', async (req, res) => {
  try {
    const sampleCategories = [
      {
        name: 'Stage Decorations',
        description: 'Beautiful stage decorations for wedding ceremonies',
        image: '/assets/stage-decor.jpg',
        subcategories: [
          {
            name: 'Floral Decor',
            items: [
              { 
                name: 'Rose Mandap', 
                description: 'Mandap decorated with fresh roses and marigolds', 
                price: 50000, 
                image: '/assets/rose-mandap.jpg', 
                vendor: 'Srida Floral Designs' 
              },
              { 
                name: 'Marigold Theme', 
                description: 'Traditional marigold decoration with diyas', 
                price: 30000, 
                image: '/assets/marigold-theme.jpg', 
                vendor: 'Srida Traditional Arts' 
              }
            ]
          },
          {
            name: 'Theme Based',
            items: [
              { 
                name: 'Royal Palace Theme', 
                description: 'Royal palace style decoration with velvet and gold', 
                price: 100000, 
                image: '/assets/royal-theme.jpg', 
                vendor: 'Srida Royal Decor' 
              },
              { 
                name: 'Garden Theme', 
                description: 'Natural garden style setup with fresh flowers', 
                price: 75000, 
                image: '/assets/garden-theme.jpg', 
                vendor: 'Srida Nature Designs' 
              }
            ]
          }
        ]
      },
      {
        name: 'Food & Catering',
        description: 'Delicious food options for wedding guests by Srida',
        image: '/assets/food-catering.jpg',
        subcategories: [
          {
            name: 'North Indian',
            items: [
              { 
                name: 'Premium Punjabi', 
                description: 'Authentic Punjabi cuisine with live counters', 
                price: 800, 
                image: '/assets/punjabi-food.jpg', 
                vendor: 'Srida Punjabi Kitchen' 
              },
              { 
                name: 'Mughlai Special', 
                description: 'Rich Mughlai dishes with biryani and kebabs', 
                price: 1200, 
                image: '/assets/mughlai-food.jpg', 
                vendor: 'Srida Mughlai Masters' 
              }
            ]
          },
          {
            name: 'South Indian',
            items: [
              { 
                name: 'Traditional Chettinad', 
                description: 'Spicy Chettinad cuisine from Tamil Nadu', 
                price: 700, 
                image: '/assets/chettinad-food.jpg', 
                vendor: 'Srida Chettinad House' 
              },
              { 
                name: 'Vegetarian Feast', 
                description: 'Pure vegetarian South Indian meals', 
                price: 600, 
                image: '/assets/veg-feast.jpg', 
                vendor: 'Srida Vegetarian Delight' 
              }
            ]
          }
        ]
      },
      {
        name: 'Bridal Jewelry',
        description: 'Exquisite jewelry collections for the bride',
        image: '/assets/jewelry.jpg',
        subcategories: [
          {
            name: 'Gold Jewelry',
            items: [
              { 
                name: 'Temple Jewelry Set', 
                description: 'Traditional temple jewelry in 22k gold', 
                price: 250000, 
                image: '/assets/temple-jewelry.jpg', 
                vendor: 'Srida Gold House' 
              },
              { 
                name: 'Kundan Set', 
                description: 'Royal kundan jewelry with precious stones', 
                price: 180000, 
                image: '/assets/kundan-set.jpg', 
                vendor: 'Srida Kundan Arts' 
              }
            ]
          }
        ]
      }
    ];

    await Category.deleteMany({});
    const categories = await Category.insertMany(sampleCategories);
    res.json({ 
      message: 'Srida wedding sample data created successfully!', 
      categories 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single category
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;