import express from "express";
import cors from 'cors'
import 'dotenv/config';
import userRoutes from "./routes/userRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleWare.js";


const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1/users', userRoutes)
app.use(express.static('public'));
app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> {
    console.log(`app runnig on port ${PORT}`)
})

