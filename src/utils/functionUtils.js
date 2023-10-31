import bcrypt from 'bcrypt';

export const createHash = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error al crear el hash de la contraseña');
    }
}

export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
}



/*export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}*/