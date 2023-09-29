import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { STATUS } from "../error/errorFile";
import bcrypt, { genSalt } from "bcrypt"

const prisma = new PrismaClient()
export const viewAllAccounts = async (req: Request, res: Response) => {
    try {
        const view = await prisma.user.findMany()
        return res.status(STATUS.CREATED).json({
            message : "This is the list of all accounts using the platform",
            data: view
        })
    } catch (error) {
        return res.status(STATUS.BAD).json({
            message : "Error occured while viewing accounts"
        })
    }
}


export const CreateAccount = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body
        const pass = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, pass)
        const account = await prisma.user.create({
            data: {email, name, password: hashed}
        })
        return res.status(STATUS.CREATED).json({
        message: `${name}'s account has been created successfully `,
        data: account
        })
    } catch (error: any) {
        return res.status(STATUS.BAD).json({
            message: "Error occured while creating account",
            data: error.message,
            error
        })
    }
}

export const DeleteAccount = async (req: Request, res: Response) => {
    try {
        const {userID} = req.params
        const deleteAccount = await prisma.user.delete({
            where: {id: userID}
        })
        return res.status(STATUS.OK).json({
            message : "Your account has been deleted successfully",
            // data: deleteAccount
        })
    } catch (error: any) {
        return res.status(STATUS.BAD).json({
            message : "Error occured while deleting account",
            data: error.message,
            error
        })
    }
}