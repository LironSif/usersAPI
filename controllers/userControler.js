import { STATUS_CODE } from "../constants/statusCode.js";
import { readUsersFromFile, writeUsersToFile } from "../models/userModel.js";
import { v4 as uuidv4 } from "uuid";

// @desc    Get all the users
// @route   GET /api/v1/users
// @access  Public
export const getAllUsers = async (req, res, next) => {
  try {
    const users = readUsersFromFile();
    res.send(users);
  } catch (error) {
    next(error)
  }
};

// @desc    Get a single user
// @route   GET /api/v1/users/:id
// @access  Public
export const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const users = readUsersFromFile();
    const user = users.find((u) => u.id === id);
    if (!user) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("this user id is not existing");
    }
    res.send(user);
  } catch (error) {
      next(error)
  }
};

// @desc    create a user
// @route   POST /api/v1/users/
// @access  Public
export const createNewUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      res.status(STATUS_CODE.BAD_REQUEST);
      throw new Error("Must provide email and name");
    }
    const users = readUsersFromFile();
    const exsitingUser = users.find((user) => user.email === email);
    if (exsitingUser) {
      res.status(STATUS_CODE.BAD_REQUEST);
      throw new Error("Email is taken");
    }

    const newUser = {
      id: uuidv4(),
      name,
      email,
    };
    users.push(newUser);
    writeUsersToFile(users);
    res.status(STATUS_CODE.CREATED);
    res.send(newUser);
  } catch (error) {
    next(error)
  }
};

// @desc    update a user
// @route   PUT /api/v1/users/:id
// @access  Public
export const updateUser = async (req, res, next) => {
  try {

    const { name, email } = req.body;
    if (!name || !email) {
      res.status(STATUS_CODE.BAD_REQUEST);
      throw new Error("Must provide email and name");
    }

    const id = req.params.id;
    const users = readUsersFromFile();
    const index = users.findIndex(user => user.id === id)
    console.log(" index is :",index)
    if(index === -1){
        res.status(STATUS_CODE.NOT_FOUND)
        throw new Error("User was not found")
    }

    const lastIndex = users.findLastIndex(user => user.email === email )
    console.log("last index is :",lastIndex)
    if(lastIndex != -1 && lastIndex != index){
        res.status(STATUS_CODE.BAD_REQUEST)
        throw new Error(`Cannot update user!, email: ${email} allready exist`)
    }

    const updatedUser = {...users[index],name,email}
    users[index] = updatedUser
    writeUsersToFile(users)
    res.send(updatedUser)

  } catch (error) {
    next(error)
  }
};



// @desc    delete a user
// @route   DELETE /api/v1/users/:id
// @access  Public
export const deleteUser = async (req, res, next) => {
  try {
    const users = readUsersFromFile();
    const id = req.params.id;
    const newUser = users.filter(user => user.id !== id)

    if(users.length === newUser.length){
        res.status(STATUS_CODE.NOT_FOUND)
        throw new Error("user not found")
    }

    writeUsersToFile(newUser)
    res.status(STATUS_CODE.OK)
    res.send(`user with id of ${req.params.id} was removed!`)

  } catch (error) {
    next(error)
  }
};
