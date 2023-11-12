
import express from 'express';
const router = express.Router();
import adminController from '../controllers/adminController.mjs';

router.get('/list-users', adminController.listUsers)
router.post('/add-menu', adminController.addMenu);
router.put('/edit-menu/:menuId', adminController.editMenu);
router.post("/change-Privilage",adminController.changeUserPrivilage)
export default router;
