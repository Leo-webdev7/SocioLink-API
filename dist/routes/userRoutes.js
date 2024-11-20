import express from 'express';
import { getUsers, getUserById, createUser, updateUserById, deleteUser, addFriend, removeFriend, } from '../controllers/userController.js';
import { validateUser } from '../middleware/validateUser.js';
const router = express.Router();
router.route('/')
    .get(getUsers)
    .post(validateUser, createUser);
router.route('/:id')
    .get(getUserById)
    .put(validateUser, updateUserById)
    .delete(deleteUser);
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);
export default router;
