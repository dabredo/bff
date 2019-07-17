import Vue from 'vue'

export const accountService = {
    register,
    getByUserId
};

async function register(account) {
  let app = await Vue.$auth1

    console.log(account)

  return await app.userManagment
    .account()
    .register(account)
    .failed(err => console.error('error', err))
}

async function getByUserId(userId) {
  let app = await Vue.$auth1

  return await app
    .lists
    .accounts
    .readOne({
      where: { user: userId }
    })
}
