import { hash, genSalt, compare } from "bcrypt";

export const hashPassword = async (salt: number, pass: string): Promise<string> => {
    const s = await genSalt(salt);
    const h = await hash(pass, s);
    return h;
}

export const comparePassword = async (hash: string, text: string): Promise<boolean> => {
    return compare(text, hash);
}
