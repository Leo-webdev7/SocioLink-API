import { Request, Response, NextFunction } from 'express';

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
    const { username, email } = req.body;
    const emailPattern = /.+@.+\..+/; // Simple regex pattern for email validation 
    
    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }

    if (!email || !emailPattern.test(email)) {
        return res.status(400).json({ message: 'Valid email is required' })
    }

    next()
};

