const UserModel = require('../models/userModel');
const logger = require('../utils/logger');

class UserService {
  static async createUser(userData) {
    try {
      const user = await UserModel.createUser(userData);
      logger.info(`User created with ID: ${user.id}`);
      return user;
    } catch (error) {
      logger.error(`Error creating user: ${error.message}`);
      throw new Error('Error creating user');
    }
  }

  static async getAllUsers() {
    try {
      const users = await UserModel.getAllUsers();
      return users;
    } catch (error) {
      logger.error(`Error fetching users: ${error.message}`);
      throw new Error('Error fetching users');
    }
  }

  static async getUserById(id) {
    try {
      const user = await UserModel.getUserById(id);
      return user;
    } catch (error) {
      logger.error(`Error fetching user by ID: ${error.message}`);
      throw new Error('User not found');
    }
  }

  static async updateUser(id, userData) {
    try {
      const updatedUser = await UserModel.updateUser(id, userData);
      return updatedUser;
    } catch (error) {
      logger.error(`Error updating user: ${error.message}`);
      throw new Error('Error updating user');
    }
  }

  static async deleteUser(id) {
    try {
      const deletedUser = await UserModel.deleteUser(id);
      return deletedUser;
    } catch (error) {
      logger.error(`Error deleting user: ${error.message}`);
      throw new Error('Error deleting user');
    }
  }
}

module.exports = UserService;
