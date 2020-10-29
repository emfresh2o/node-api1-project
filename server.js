const express = require('express');

const server = express();

const port = 5000;

server.use(express.json());

// User Schema

const data = [
  {
    id: 0,
    name: 'Mitch',
    bio: 'I have two fur babies',
  },
];

// Method POST /api/users

server.post('/api/users', (req, res) => {
  let newUser = req.body;
  newUser = {
    id: ids.generate(),
    ...req.body,
  };
  if (!req.body.name || !req.body.bio) {
    res.status(400).send({ errorMessage: 'Name and bio of user is required.' });
  } else {
    data.push(newUser);
    res.status(201).send(newUser);
  }
});

// Method GET /api/users

server.get('/api/users', (req, res) => {
  if (data.length === 0) {
    res.status(500).send({ errorMessage: 'User data  error!.' });
  } else {
    res.send(data);
  }
});

// Method GET /api/users/:id

server.get('/api/users/:id', (req, res) => {
  const user = data.find((item) => {
    if (item.id === req.params.id * 1) {
      return item;
    }
  });
  if (user) {
    res.status(200).send(user);
  } else {
    res.status(404).send({ message: 'User ID does not exist.' });
  }
});

//Method DELETE /api/users/:id

server.delete('/api/users/:id', (req, res) => {
  const user = data.find((item) => {
    if (item.id === req.params.id * 1) {
      return item;
    }
  });
  if (user) {
    const users = data.filter((item) => {
      if (item.id !== user.id) {
        return item;
      }
    });
    data.splice(data.indexOf(user), 1);
    res.status(200).send(users);
  } else {
    res.status(404).send({ message: 'User ID does not exist.' });
  }
});

// Method PUT /api/users/:id

server.put('/api/users/:id', (req, res) => {
  const user = data.find((item) => {
    if (item.id === req.params.id * 1) {
      return item;
    }
  });
  if (!req.body.name || !req.body.bio) {
    res.status(400).send({ errorMessage: 'Name and bio of user is required.' });
  } else {
    data[data.indexOf(user)] = {
      id: user.id,
      name: req.body.name,
      bio: req.body.bio,
    };
    res.status(200).send(data.find((item) => item.id === req.params.id * 1));
  }
});

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
