const db = require('../config/firebase');

class UserModel {
  static async createUser(userData) {
    const userRef = db.collection('users').doc();
    await userRef.set(userData);
    return { id: userRef.id, ...userData };
  }

  static async getAllUsers() {
    const snapshot = await db.collection('users').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  static async getUserById(id) {
    const doc = await db.collection('users').doc(id).get();
    if (!doc.exists) {
      throw new Error('User not found');
    }
    return { id: doc.id, ...doc.data() };
  }

  static async updateUser(id, userData) {  //update user information
    await db.collection('users').doc(id).update(userData);
    return { id, ...userData };
  }

  static async deleteUser(id) {
    await db.collection('users').doc(id).delete();
    return id;
  }
}

module.exports = UserModel;
