/**
 * Helper functions to help us manage users
 * whether it's joinin, signing out,
 * leaving, etc.
 */
const users = [];

const addUser = ({ id, name, room }) => {
  // we'll remove whitespace and lowercase
  // so case won't matter when joining
  name = name.trim().toLowerCase();
  room = name.trim().toLowerCase();

  // check if there is an existing user in a room
  // so there is no two users in the same room
  const existingUser = users.find(
    user => user.room === room && user.name === name
  );

  // check if existingUser is true, if yes, reject
  if (existingUser) {
    return { error: 'Username is taken' };
  }

  // if not, create an object with that user's data
  const user = { id, name, room };

  // add that user to our array
  users.push(user);
  // return that user
  return { user };
};

const removeUser = id => {
  // find user's index
  const index = users.findIndex(user => user.id === id);

  // if there is a user located, with an index
  if (index !== -1) {
    // we'll splice them out using that index
    return users.splice(index, 1)[0];
  }
};

// We'll check the array if there is an active user with that id,
// and return it if true
const getUser = id => {
  console.log(users);
  console.log('this is id', id);
  return users.find(user => id === user.id);
};

// Get's all users in a room by filtering the array for that room
const getUsersInRoom = room => user.filter(user => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
