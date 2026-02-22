import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from './user.model';

const saltRounds = 10;
const secretKey = 'your_secret_key'; // Replace with your actual secret key

export const registerUser = async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ username, password: hashedPassword });
    return await newUser.save();
};

export const loginUser = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });
    return { token, user };
};