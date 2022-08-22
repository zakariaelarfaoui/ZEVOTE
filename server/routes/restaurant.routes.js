import express from "express";
const router = express.Router();

import restaurantController from "../controllers/restaurantController.js";

router
  .route("/")
  .post(restaurantController.addRestaurant)
  .get(restaurantController.getAllRestaurants);
router
  .route("/:id")
  .patch(restaurantController.updateRestaurant)
  .put(restaurantController.addMealsToRestaurant)
  .get(restaurantController.getRestaurant)
  .delete(restaurantController.deleteRestaurant);

export default router;
