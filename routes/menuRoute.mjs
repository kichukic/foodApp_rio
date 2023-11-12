import express from  'express';
import menuController from '../controllers/menuController.mjs';
const router =  express.Router();


router.post("/addMenu",menuController.addMenu)
router.put("/editMenu",menuController.editMenu)
router.get("/viewMenu",menuController.viewMenu)




export default router