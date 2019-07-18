import Vue from "vue";
import wolkenkit from "wolkenkit-client";
import DepotClient from "wolkenkit-depot-client";

export default {
  install: function() {
    try {
      Vue.$auth1 = (async function() {
        let app = await wolkenkit
          .connect({
            host: "",
            port: 3000,
            authentication: new wolkenkit.authentication.OpenIdConnect({
              identityProviderUrl: "",
              clientId: "",
              scope: "profile",
              strictMode: false,
              redirectUrl: ""
            })
          })
          .catch(error => {
            console.log(error);
          });

        app.logout = async function() {
          let auth = await app.auth;
          auth.logout();

          window.location.href =
            "";
        };

        app.image = new DepotClient({
          host: "local.wolkenkit.io",
          port: 3001,
          token: app.auth.getToken()
        });

        return app;
      })();
    } catch (error) {
      console.log("ERROR", error);
    }
  }
};
