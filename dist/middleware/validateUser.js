export const validateUser = (req, res, next) => {
    const { username, email } = req.body;
    const emailPattern = /.+@.+\..+/; // Simple regex pattern for email validation
    // Validate `username`
    if (!username) {
        res.status(400).json({ message: 'Username is required' });
        return; // Explicitly stop execution
    }
    // Validate `email`
    if (!email || !emailPattern.test(email)) {
        res.status(400).json({ message: 'Valid email is required' });
        return; // Explicitly stop execution
    }
    // If validation passes, call the next middleware
    next();
};
