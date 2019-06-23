'use strict';

const initialState = {
  user: null,
  name: '',
  size: null,
  gender: null,
  breed: null,
  birthdate: null,
  description: '',
  adoptionRequests: [],
  images: [],
  state: 'not_adopted',
  isAuthorized: {
    commands: {
      add: { forAuthenticated: true, forPublic: false },
      requestAdoption: { forAuthenticated: true, forPublic: false }
    },
    events: {
      added: { forPublic: true },
      updated: { forPublic: true },
      pictureUploaded: { forPublic: true },
      deleted: { forPublic: true },
    }
  }
};

const commands = {
  add (friend, command) {
    if (!command.data.name) {
      return command.reject('Name is missing');
    }

    friend.events.publish('added', {
      user: command.user.id,
      name: command.data.name,
      size: command.data.size,
      gender: command.data.gender,
      breed: command.data.breed,
      birthdate: command.data.birthdate,
      state: command.data.state,
      description: command.data.description,
      images: command.data.images,
    });
  },

  update (friend, command) {
    if (!friend.exists()) {
      return command.reject('Friend does not exist');
    }

    if (!command.data.name) {
      return command.reject('Name is missing');
    }

    friend.events.publish('updated', {
      name: command.data.name,
      size: command.data.size,
      gender: command.data.gender,
      breed: command.data.breed,
      birthdate: command.data.birthdate,
      state: command.data.state,
      description: command.data.description,
      images: command.data.images,
    });
  },

  delete (friend, command) {
    if (!friend.exists()) {
      return command.reject('Friend does not exist');
    }

    friend.events.publish('deleted');
  },

  requestAdoption(friend, command) {
    if (!friend.exists()) {
      return command.reject('Friend does not exist');
    }

    if (friend.state.adoptionRequests.indexOf(command.user.id) !== -1) {
      return command.reject('This adoption request already exists');
    }

    friend.events.publish('adoptionRequested', {
      user: command.user.id,
      username: command.user.token.name, //TODO: This is not updated in readmodel
      animalName: friend.state.name //TODO: This is not updated in readmodel
    })
  },
  approveAdoption(friend, command) {
    if (!friend.exists()) {
      return command.reject('Friend does not exist');
    }

    if (friend.state.adoptionRequests.indexOf(command.data.userId) === -1) {
      return command.reject('This adoption request does not exist');
    }

    friend.events.publish('adoptionApproved')
  },
  declineAdoption(friend, command) {
    if (!friend.exists()) {
      return command.reject('Friend does not exist');
    }

    if (friend.state.adoptionRequests.indexOf(command.data.userId) === -1) {
      return command.reject('This adoption request does not exist');
    }

    friend.events.publish('adoptionDeclined')
  },
};

const events = {
  added (friend, event) {
    friend.setState({
      user: event.data.user,
      name: event.data.name,
      size: event.data.size,
      gender: event.data.gender,
      breed: event.data.breed,
      birthdate: event.data.birthdate,
      images: event.data.images,
      state: event.data.state,
    });
  },

  updated (friend, event) {
    friend.setState({
      name: event.data.name,
      size: event.data.size,
      gender: event.data.gender,
      breed: event.data.breed,
      birthdate: event.data.birthdate,
      images: event.data.images,
      state: event.data.state,
    });
  },

  deleted (friend, event) {
  },

  adoptionRequested (friend, event) {
    let adoptionRequests = friend.state.adoptionRequests;
    adoptionRequests.push(event.data.user)
    friend.setState({
      adoptionRequests: adoptionRequests
    })
  },
  adoptionApproved (friend, event) {
    //TODO: Do we need adopted by field

    friend.setState({
      state: 'adopted',
      adoptionRequests: [],
    })
  },
  adoptionDeclined (friend, event) {
    //TODO: Do we need adopted by field

    let adoptionRequests = friend.state.adoptionRequests;
    let index = friend.state.adoptionRequests.indexOf(event.data.user);
    adoptionRequests.splice(index, 1)

    friend.setState({
      adoptionRequests: adoptionRequests,
    })
  }
};

module.exports = { initialState, commands, events };
