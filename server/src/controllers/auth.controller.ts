import { Request, Response } from "express";
import prisma from "../config/prisma";
import { register } from "module";


export const authController = {
    register: async (req: Request, res: Response): Promise<void> => {
        try {
            const { name, phone, sex, email, password } = req.body;

            const existingUser = await prisma.user.findUnique({
                where: { email }
            });

            if (existingUser) {
                const response = {
                    succes: false,
                    message: "User already exists"
                };

                res.status(400).json(response);
                return;
            }
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }
};