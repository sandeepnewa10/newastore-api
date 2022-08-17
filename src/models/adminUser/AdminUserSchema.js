import mongoose from "mongoose";

const adminUserSchema = new mongoose.Schema(
    {
        status: {
            type: String,
            default: 'inactive'
        },
        fName: {
            type: String,
            required: true,
            maxLength: [20, "First name  can't be longer than 20 characters"],
        },
        lName: {
            type: String,
            required: true,
            maxLength: [20, "Last name  can't be longer than 20 characters"],
        },
        email: {
            type: String,
            unique: true,
            index: 1,
            required: true,
            maxLength: [50, "Email name  can't be longer than 20 characters"],
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
            maxLength: [15, "Phone  can't be longer than 20 characters"],
        },
        address: {
            type: String,
            default: "n/a",
            maxLength: [100, "Address  can't be longer than 20 characters"],
        },
        dob: {
            type: String,
            default: "null",

        },
        emailValidationCod:{
            type: String,
            default: "",
        },              
        refreshJWT:{
            type: String,
            default: "",
        }
    },
    {
        timestamps: true,
    }

)


export default mongoose.model("Admin_user", adminUserSchema)