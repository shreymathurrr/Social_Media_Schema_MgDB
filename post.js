// const { ObjectId } = require('mongodb');
// const { getDB } = require('./db');

// const createPost = async (userId, content) => {
//   const db = getDB();
//   const post = {
//     user_id: ObjectId(userId),
//     content: content,
//     timestamp: new Date(),
//     comments: []
//   };
//   const result = await db.collection('posts').insertOne(post);

//   await db.collection('users').updateOne(
//     { _id: ObjectId(userId) },
//     { $addToSet: { posts: result.insertedId } }
//   );

//   return result.insertedId;
// };

// const createComment = async (userId, postId, content) => {
//   const db = getDB();
//   const comment = {
//     post_id: ObjectId(postId),
//     user_id: ObjectId(userId),
//     content: content,
//     timestamp: new Date()
//   };
//   const result = await db.collection('comments').insertOne(comment);

//   await db.collection('posts').updateOne(
//     { _id: ObjectId(postId) },
//     { $addToSet: { comments: result.insertedId } }
//   );

//   return result.insertedId;
// };

// module.exports = { createPost, createComment };



const { ObjectId } = require('mongodb');
const { getDB } = require('./db');

// Function to create a new post
const createPost = async (userId, content) => {
  const db = getDB();
  const result = await db.collection('posts').insertOne({
    userId: new ObjectId(userId),
    content,
    created_at: new Date()
  });
  return result.insertedId;
};

// Function to create a new comment
const createComment = async (userId, postId, content) => {
  const db = getDB();
  const result = await db.collection('comments').insertOne({
    userId: new ObjectId(userId),
    postId: new ObjectId(postId),
    content,
    created_at: new Date()
  });
  return result.insertedId;
};

module.exports = { createPost, createComment };
