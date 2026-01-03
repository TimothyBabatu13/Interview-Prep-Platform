import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

export const hashPassword = async (plainPassword: string) => {
    try {
        const hashed = await bcrypt.hash(plainPassword, SALT_ROUNDS);
        return hashed;
    } catch (error) {
        const err = error as Error
        throw new Error(err.message)
    }
};

export const verifyPassword = async (plainPassword: string, hashedPassword: string) => {
    try {
        return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
        const err = error as Error
        throw new Error(err.message)
    }
};