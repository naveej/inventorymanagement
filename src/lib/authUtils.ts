import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

export const hashPassword = async (password: string) => {
    const salt = bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, await salt)

    return hashedPassword
}

// export signToken = ()