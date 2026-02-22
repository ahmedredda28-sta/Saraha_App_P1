const authService = require('./auth.service');

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const token = await authService.login(username, password);
        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await authService.register(username, password);
        res.status(201).json({ user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};