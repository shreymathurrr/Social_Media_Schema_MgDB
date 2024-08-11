// const { ObjectId } = require('mongodb'); // Import ObjectId from mongodb
// const { getDB } = require('./db');

// // Function to validate ObjectId format
// const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

// // Function to register a new user
// const registerUser = async (userData) => {
//   const db = getDB();
//   try {
//     const result = await db.collection('users').insertOne(userData);
//     return result.insertedId;
//   } catch (error) {
//     console.error('Error registering user:', error);
//     throw new Error('Error registering user');
//   }
// };

// // Function to send a friend request
// const sendFriendRequest = async (senderId, receiverId) => {
//   console.log('Sender ID:', senderId);
//   console.log('Receiver ID:', receiverId);

//   if (!isValidObjectId(senderId) || !isValidObjectId(receiverId)) {
//     throw new Error('Invalid ObjectId format');
//   }

//   const db = getDB();
//   try {
//     await db.collection('users').updateOne(
//       { _id: new ObjectId(senderId) },
//       { $addToSet: { 'friend_requests.sent': new ObjectId(receiverId) } }
//     );

//     await db.collection('users').updateOne(
//       { _id: new ObjectId(receiverId) },
//       { $addToSet: { 'friend_requests.received': new ObjectId(senderId) } }
//     );
//   } catch (error) {
//     console.error('Error sending friend request:', error);
//     throw new Error('Error sending friend request');
//   }
// };

// // Function to accept a friend request
// const acceptFriendRequest = async (userId, friendId) => {
//   console.log('User ID:', userId);
//   console.log('Friend ID:', friendId);

//   if (!isValidObjectId(userId) || !isValidObjectId(friendId)) {
//     throw new Error('Invalid ObjectId format');
//   }

//   const db = getDB();
//   try {
//     await db.collection('users').updateOne(
//       { _id: new ObjectId(userId) },
//       {
//         $pull: { 'friend_requests.received': new ObjectId(friendId) },
//         $addToSet: { friends: new ObjectId(friendId) }
//       }
//     );

//     await db.collection('users').updateOne(
//       { _id: new ObjectId(friendId) },
//       {
//         $pull: { 'friend_requests.sent': new ObjectId(userId) },
//         $addToSet: { friends: new ObjectId(userId) }
//       }
//     );
//   } catch (error) {
//     console.error('Error accepting friend request:', error);
//     throw new Error('Error accepting friend request');
//   }
// };

// // Function to reject a friend request
// const rejectFriendRequest = async (userId, friendId) => {
//   console.log('User ID:', userId);
//   console.log('Friend ID:', friendId);

//   if (!isValidObjectId(userId) || !isValidObjectId(friendId)) {
//     throw new Error('Invalid ObjectId format');
//   }

//   const db = getDB();
//   try {
//     await db.collection('users').updateOne(
//       { _id: new ObjectId(userId) },
//       { $pull: { 'friend_requests.received': new ObjectId(friendId) } }
//     );

//     await db.collection('users').updateOne(
//       { _id: new ObjectId(friendId) },
//       { $pull: { 'friend_requests.sent': new ObjectId(userId) } }
//     );
//   } catch (error) {
//     console.error('Error rejecting friend request:', error);
//     throw new Error('Error rejecting friend request');
//   }
// };

// module.exports = { registerUser, sendFriendRequest, acceptFriendRequest, rejectFriendRequest };




const { ObjectId } = require('mongodb');
const { getDB } = require('./db');

// Function to register a new user
const registerUser = async (userData) => {
  const db = getDB();
  const result = await db.collection('users').insertOne(userData);
  return result.insertedId;
};

// Function to send a friend request
const sendFriendRequest = async (senderId, receiverId) => {
  const db = getDB();
  await db.collection('users').updateOne(
    { _id: new ObjectId(senderId) },
    { $addToSet: { 'friend_requests.sent': new ObjectId(receiverId) } }
  );

  await db.collection('users').updateOne(
    { _id: new ObjectId(receiverId) },
    { $addToSet: { 'friend_requests.received': new ObjectId(senderId) } }
  );
};

// Function to accept a friend request
const acceptFriendRequest = async (userId, friendId) => {
  const db = getDB();
  await db.collection('users').updateOne(
    { _id: new ObjectId(userId) },
    {
      $pull: { 'friend_requests.received': new ObjectId(friendId) },
      $addToSet: { friends: new ObjectId(friendId) }
    }
  );

  await db.collection('users').updateOne(
    { _id: new ObjectId(friendId) },
    {
      $pull: { 'friend_requests.sent': new ObjectId(userId) },
      $addToSet: { friends: new ObjectId(userId) }
    }
  );
};

// Function to reject a friend request
const rejectFriendRequest = async (userId, friendId) => {
  const db = getDB();
  await db.collection('users').updateOne(
    { _id: new ObjectId(userId) },
    { $pull: { 'friend_requests.received': new ObjectId(friendId) } }
  );

  await db.collection('users').updateOne(
    { _id: new ObjectId(friendId) },
    { $pull: { 'friend_requests.sent': new ObjectId(userId) } }
  );
};

module.exports = { registerUser, sendFriendRequest, acceptFriendRequest, rejectFriendRequest };
