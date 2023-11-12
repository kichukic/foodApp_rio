import express from 'express';
const router = express.Router();
import userController from '../controllers/userController.mjs';

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.put('/edit-profile', userController.editProfile);
router.get('/sample', userController.sample);

export default router;
