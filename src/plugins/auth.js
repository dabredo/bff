import wolkenkit from 'wolkenkit-client'
import Vue from 'vue'

export default {
  install: function() {
    try {
      Vue.$auth1 = (async function() {
        let  app = await wolkenkit.connect({
          host: 'local.wolkenkit.io',
          port: 3000,
          authentication: new wolkenkit.authentication.OpenIdConnect({
            identityProviderUrl: '',
            clientId: '',
            scope: 'profile',
            strictMode: false,
            redirectUrl: 'http://localhost:8081/#/private/dashboard'
          })
        }).catch((error) => {console.log(error)})

        app.logout = (async function() {
          let auth = await app.auth;
          auth.logout()

          window.location.href = '';
        })

        return app;
      })()
    } catch (error) {
        console.log('ERROR', error)
    }
  }
}
