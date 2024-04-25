import {Router} from "express"
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.route("/register").post(
    upload.fields([ //.fields expects an array of objects
        {
            name: "avatar",
            maxCount : 1
        },
        {
            name : "coverImage",
            maxCount : 1
        }
    ]),
    registerUser)


export default router;