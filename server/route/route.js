const express = require('express');

const router = express.Router();
router.get('/boardandeditor', () => {
  console.log('test');
});

module.exports = router;
