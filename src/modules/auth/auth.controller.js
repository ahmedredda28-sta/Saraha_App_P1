import { Router } from 'express'
import {  signup ,login} from './auth.service.js';
import {successResponse} from '../../utils/responseHandler.js'
const router = Router(); 
router.post("/signup", async (req, res, next) => {
    const result = await signup(req.body)
    return res.successResponse({res,status : 201, message: "user created successfully", data: result})
})
router.post("/login", async (req, res, next) => {
    const result = await login(req.body)
    return res.successResponse({res,status : 200, message: "user logged in successfully", data: result})
})


export default router