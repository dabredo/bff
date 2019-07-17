'use strict';

const fields = {
  id: { initialState: '' },
  user: { initialState: '' },
  fullname: { initialState: '' },
  type: { initialState: '' },
  cif: { initialState: '' },
  name: { initialState: '' },
  address: { initialState: '' },
};

const projections = {
  'userManagment.account.registered' (accounts, event) {
    accounts.add({
      id: event.data.id,
      user: event.data.user,
      fullname: event.data.fullname,
      type: event.data.type,
      name: event.data.name,
      cif: event.data.cif,
      address: event.data.address,
    });
  },
};

module.exports = { fields, projections };
