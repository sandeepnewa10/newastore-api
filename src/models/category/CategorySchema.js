import  mongoose  from "mongoose";

const catSchema =  new mongoose.Schema({
    status:{
        type: String,
        default: 'inactive' //active, inactive
    },
    name: {
        type: String,
        require: true,
        maxLength: 50,
    },
    slug: {
        type: String,
        unique: true,
        index: 1,
        maxLength: 50,
        trim: true,
        require: true,
    },
    parentId:{
        type: mongoose.Schema.Types.ObjectId,
        default: null
    }
})

export default mongoose.model("Category", catSchema)