import express from "express";
import BagCarouselController from "../controllers/bagCarouselController.js";
const router = express.Router();

/// server/flight/new
router.post('/new', BagCarouselController.addBagCarousel);
router.get('/list', BagCarouselController.getBagCarousel);
router.get('/list/available', BagCarouselController.getAvailableBagCarousel);
router.get('/list/assigned', BagCarouselController.getAssignedBagCarousel);

export default router;
