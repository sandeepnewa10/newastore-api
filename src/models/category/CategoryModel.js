import CategorySchema from "./CategorySchema.js"

//insert category
export const insertCategory = (obj) =>{
    return CategorySchema(obj).save()
}

//get categories
export const getAllCategories = () =>{
    return CategorySchema.find()
}


//get a category
export const getCategoryById = (_id) =>{
    return CategorySchema.findById(_id)
}


