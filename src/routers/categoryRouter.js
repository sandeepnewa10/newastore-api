import express from "express";
import {
  newCategoryValidation,
  updateCategoryValidation,
} from "../middlewares/joi-validation/joiValidation.js";
import {
  deleteCategoryById,
  getAllCategories,
  getCategoryById,
  hasClidCategoryById,
  insertCategory,
  updateCategoryById,
} from "../models/category/CategoryModel.js";
const router = express.Router();
import slugify from "slugify";

// get categories
router.get("/:_id?", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const categories = _id
      ? await getCategoryById(_id)
      : await getAllCategories();

    res.json({
      status: "success",
      message: "category list",
      categories,
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

// insert new category
router.post("/", newCategoryValidation, async (req, res, next) => {
  try {
    req.body.slug = slugify(req.body.name, {
      lower: true,
      trim: true,
    });

    const result = await insertCategory(req.body);

    result?._id
      ? res.json({
          status: "success",
          message: "New Category has been added",
        })
      : res.json({
          status: "error",
          message: "Unable to add the category, please try again later",
        });
  } catch (error) {
    next(error);
  }
});

// Updadte category

router.put("/", updateCategoryValidation, async (req, res, next) => {
  try {
    if (req.body.parentId) {
      const hasChildCats = await hasClidCategoryById(req.body._id);
      if (hasChildCats) {
        return res.json({
          status: "error",
          message:
            "This category has child categories, pelase delete or re assign them to another category befor taking this action.",
        });
      }
    }

    const catUpdate = await updateCategoryById(req.body);

    catUpdate?._id
      ? res.json({
          status: "success",
          message: "Category has been updated.",
        })
      : res.json({
          status: "error",
          message: "Unablel to update the category, Please try again later.",
        });
  } catch (error) {
    next(error);
  }
});

// delete category
router.delete("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;

    const hasChildCats = await hasClidCategoryById(_id);
    if (hasChildCats) {
      return res.json({
        status: "error",
        message:
          "This category has child categories, pelase delete or re assign them to another category befor taking this action.",
      });
    }

    const catDelete = await deleteCategoryById(_id);

    catDelete?._id
      ? res.json({
          status: "success",
          message: "Category has been Deleted.",
        })
      : res.json({
          status: "error",
          message: "Unablel to Delete the category, Please try again later.",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
