import express, { Router } from "express"
import { CreateAccount, DeleteAccount, viewAllAccounts } from "../controller/authController"
const router = express.Router()
router.route("/view-all").get(viewAllAccounts)
router.route("/register").post(CreateAccount)
router.route("/:userID/delete").delete(DeleteAccount)
export default router