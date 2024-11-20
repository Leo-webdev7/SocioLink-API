export const validateThought = (req, res, next) => {
    const { thoughtText, username } = req.body;
    // Check if thoughtText is valid
    if (!thoughtText || thoughtText.length < 1 || thoughtText.length > 280) {
        res.status(400).json({ message: 'Thought text must be between 1 and 280 characters' });
        return; // Return after sending response to stop further execution
    }
    // Check if username is present
    if (!username) {
        res.status(400).json({ message: 'Username is required' });
        return; // Return after sending response to stop further execution
    }
    // If everything is valid, proceed to the next middleware/route handler
    next();
};
