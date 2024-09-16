const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    const { username, password } = req.body;

    // This is a mock authentication. In real scenarios, you would fetch the user from the DB.
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};
