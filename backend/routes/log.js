const express = require('express');
const router = express.Router();
const { Log } = require('../models');

router.get('/', async (req, res) => {
  const logs = await Log.findAll();
  res.json(logs);
});

module.exports = router;
