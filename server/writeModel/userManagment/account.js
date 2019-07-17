'use strict';

const initialState = {
  id: null,
  user: null,
  fullname: null,
  type: '',
  cif: '',
  name: '',
  address: '',
  isAuthorized: {
    commands: {},
    events: {}
  }
};

const commands = {
  async register (account, command, { app, logger }) {
    if (!command.data.fullname) {
      return command.reject('Full name is missing');
    }

    if (command.data.type === 'animal-shelter') {
      if (!command.data.cif) {
         return command.reject('CIF is missing');
      }

      if (!command.data.cif) {
         return command.reject('Name is missing');
      }

      if (!command.data.address) {
         return command.reject('Address is missing');
      }
    }

    account.events.publish('registered', {
      user: command.user.id,
      fullname: command.data.fullname,
      type: command.data.type,
      cif: command.data.cif,
      name: command.data.name,
      address: command.data.address,
    });
  },
};

const events = {
  registered (account, event) {
    account.setState({
      user: event.data.user,
      fullname: event.data.fullname,
      type: event.data.type,
      cif: event.data.cif,
      name: event.data.name,
      address: event.data.address
    });
  },
};

module.exports = { initialState, commands, events };
