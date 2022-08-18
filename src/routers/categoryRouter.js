import express from 'express'
import { getAllCategories, getCategoryById, insertCategory } from '../models/category/CategoryModel.js'
import slugify from 'slugify'
import { newCategoryValidation } from '../middlewares/joi-validation/joiValidation.js'

const router = express.Router()


// Get categories
router.get("/:_id?", async(req, res, next) =>{
  try{
    const {_id} = req.params
    const categories =  _id
      ? await getCategoryById (_id)
      : await getAllCategories ()

      res.json({
        status: "Success",
        message: "category list",
        categories
      })
  } catch (error){
    error.status =500;
    next(error)
  }
})


// Insert new category
router.post("/", newCategoryValidation, async (req, res, next) =>{
    try{
        
        req.body.slug = slugify(req.body.name, {
          lower:true,
          trim: true,
        })

        const result =await insertCategory(req.body)
        result?._id
          ?  res.json({
                status: 'success',
                message: 'new category has been added'
            })
          : res.json ({
            status: 'error',
            message: 'unable to add the category Please'
          })
    }catch(error){
        next(error)
    }
})




export default router