import { PrismaClient } from '../generated/prisma'
import * as bcrypt from "bcrypt";
const prisma = new PrismaClient();

export const login = async (req: any, res: any) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).send("Invalid email or password");
        }
        // Compare password with hashed password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).send("Invalid email or password");
        }
        // Create session or token
        res.send("Login successful");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}
export const register = async (req: any, res: any) => {
    const { email, password, name, username } = req.body;
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                username,
            },
        });
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}
export const logout = async (req: any, res: any) => {
    // Destroy session or token
    res.send("Logout successful");
    res.render('login', { title: 'Login' });
}