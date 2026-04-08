import userModel from "./model.js";
import { v4 as uuidv4 } from "uuid";
export default function UsersDao() {
  const createUser = (user) => {
    const newUser = { ...user, _id: uuidv4() };
    return userModel.create(newUser);
  }; 
  const findAllUsers = () => userModel.find();
  const findUserById = (userId) => userModel.findById(userId);
  const findUserByUsername = (username) =>
    userModel.findOne({ username: username });
  const findUserByCredentials = (username, password) =>
    userModel.findOne({ username, password });
  const findUsersByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
    return userModel.find({
      $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
    });
  };

  const updateUser = (userId, user) =>
    userModel.updateOne({ _id: userId }, { $set: user });
  const deleteUser = (userId) => userModel.deleteOne({ _id: userId });
  const findUsersByRole = (role) => userModel.find({ role: role });
  return {
    createUser,
    findAllUsers,
    findUserById,
    findUserByUsername,
    findUserByCredentials,
    findUsersByRole,
    findUsersByPartialName,
    updateUser,
    deleteUser,
  };
}
