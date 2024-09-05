const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const userControllers = require('../controllers/userControllers');

router.post('/login', userControllers.login);
router.post('/register', userControllers.register);
router.get('/profile', auth, userControllers.getProfile);
router.post('/reset-password', userControllers.resetPassword);
router.post('/profile/update', auth, userControllers.updateProfile);
router.post('/reset-password-request', userControllers.resetPasswordRequest);

module.exports = router;