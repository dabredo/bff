import Vue from "vue";

export const accountService = {
  register,
  getByUserId
};

async function register(account) {
  const app = await Vue.$app;

  return await app.userManagment
    .account()
    .register(account)
    .failed(err => console.error("error", err));
}

async function getByUserId(userId) {
  const app = await Vue.$app;

  return await app.lists.accounts.readOne({
    where: { user: userId }
  });
}
