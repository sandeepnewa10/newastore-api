import  'dotenv/config'
import  express  from 'express'

const app = express()

import cors from "cors"
import helmet from 'helmet'

const PORT = process.env.PORT || 8000;

//db connection
import {dbConnection} from "./src/config/dbConfig.js"
dbConnection()


// middlewares
app.use(cors());
app.use(helmet());
app.use(express.json())


// Apis
import adminUserRouter  from "./src/routers/adminUserRouter.js";
import categoryRouter from "./src/routers/categoryRouter.js"
app.use("/api/v1/admin-user", adminUserRouter)
app.use("/api/v1/category", categoryRouter)






app.use((error, req, res, next)=>{
    console.log(error)
    const statusCode = error.status || 404
    res.status(statusCode).json({
        status: "error",
        message: error.message,
    })
})


app.get("/", (req, res) =>{
    res.json({
        message: "Hi therem you are lost."
    })
})


app.listen(PORT, error => {
    error
    ? console.log(error)
    :console.log(`Server running at http://localhost:${PORT}`)
})