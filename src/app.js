import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({
    limit : "20kb" 
}))

app.use(express.urlencoded({
    extended : true,
    limit : "16kb"
}))
app.use(express.static("public"))
app.use(cookieParser()) ;// can access bowser cookies from server and set it too  , securily

//routes
import userRouter from "./routes/user.routes.js"

//routes declaration
//we need to use middleware now cuz we cant use app.get
app.use("/api/v1/users",userRouter);


export {app}