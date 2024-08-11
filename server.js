// const express = require('express');
// const bodyParser = require('body-parser');
// const { connectDB } = require('./db');
// const { registerUser, sendFriendRequest, acceptFriendRequest, rejectFriendRequest } = require('./user');
// const { createPost, createComment } = require('./post');

// const app = express();
// const port = 3000;

// app.use(bodyParser.json());

// app.post('/register', async (req, res) => {
//   const userData = req.body;
//   const userId = await registerUser(userData);
//   res.send({ userId });
// });

// app.post('/send-friend-request', async (req, res) => {
//   const { senderId, receiverId } = req.body;
//   await sendFriendRequest(senderId, receiverId);
//   res.send({ message: 'Friend request sent' });
// });

// app.post('/accept-friend-request', async (req, res) => {
//   const { userId, friendId } = req.body;
//   await acceptFriendRequest(userId, friendId);
//   res.send({ message: 'Friend request accepted' });
// });

// app.post('/reject-friend-request', async (req, res) => {
//   const { userId, friendId } = req.body;
//   await rejectFriendRequest(userId, friendId);
//   res.send({ message: 'Friend request rejected' });
// });

// app.post('/create-post', async (req, res) => {
//   const { userId, content } = req.body;
//   const postId = await createPost(userId, content);
//   res.send({ postId });
// });

// app.post('/create-comment', async (req, res) => {
//   const { userId, postId, content } = req.body;
//   const commentId = await createComment(userId, postId, content);
//   res.send({ commentId });
// });

// const startServer = async () => {
//   await connectDB();
//   app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}/`);
//   });
// };

// startServer();



const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('./db');
const { registerUser, sendFriendRequest, acceptFriendRequest, rejectFriendRequest } = require('./user');
const { createPost, createComment } = require('./post');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/register', async (req, res) => {
  try {
    const userData = req.body;
    const userId = await registerUser(userData);
    res.send({ userId });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.post('/send-friend-request', async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    await sendFriendRequest(senderId, receiverId);
    res.send({ message: 'Friend request sent' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.post('/accept-friend-request', async (req, res) => {
  try {
    const { userId, friendId } = req.body;
    await acceptFriendRequest(userId, friendId);
    res.send({ message: 'Friend request accepted' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.post('/reject-friend-request', async (req, res) => {
  try {
    const { userId, friendId } = req.body;
    await rejectFriendRequest(userId, friendId);
    res.send({ message: 'Friend request rejected' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.post('/create-post', async (req, res) => {
  try {
    const { userId, content } = req.body;
    const postId = await createPost(userId, content);
    res.send({ postId });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.post('/create-comment', async (req, res) => {
  try {
    const { userId, postId, content } = req.body;
    const commentId = await createComment(userId, postId, content);
    res.send({ commentId });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
};

startServer();
