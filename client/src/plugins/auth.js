import Vue from "vue";
import wolkenkit from "wolkenkit-client";
import DepotClient from "wolkenkit-depot-client";

export default {
  install: function() {
    Vue.$app = (async function() {
      return await wolkenkit
        .connect({
          host: "",
          port: 3000,
          authentication: new wolkenkit.authentication.OpenIdConnect({
            identityProviderUrl: "",
            clientId: "",
            scope: "",
            strictMode: false,
            redirectUrl: ""
          })
        })
        .catch(error => {
          console.log(error);
        });
    })();

    Vue.$image = (async function() {
      const app = await Vue.$app;

      return new DepotClient({
        host: "",
        port: 3001,
        token: app.auth.getToken()
      });
    })();

    Vue.$auth = {};

    Vue.$auth.isLoggedIn = async function() {
      const app = await Vue.$app
      return app.auth.isLoggedIn();
    };

    Vue.$auth.getLoggedUserId = async function() {
      const app = await Vue.$app
      return app.auth.getProfile().sub;
    };

    Vue.$auth.getLoggedUsername = async function() {
      const app = await Vue.$app
      return app.auth.getProfile().name;
    };

    Vue.$auth.logout = async function() {
      const app = await Vue.$app
      app.auth.logout();

      window.location.href =
        "";
    };

    Vue.$auth.login = async function(path) {
      const app = await Vue.$app
      app.auth.login(path);
    };
  }
};
