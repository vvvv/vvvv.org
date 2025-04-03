import Keycloak from 'keycloak-js'
import Constants from './constants'

const keycloak = new Keycloak(Constants.LOGIN_OPTIONS);

export async function initKeycloak()
{
    const result = keycloak.init({
            onLoad: 'check-sso',
            silentCheckSsoRedirectUri: `${location.origin}/user/silent-check-sso.html`,
            checkLoginIframe: false,
            responseMode: 'fragment',
    })
    .catch(() => {
        console.error('Failed to initialize Keycloak');
    });

    return result
}

export function isAuthenticated() {
    return keycloak.authenticated;
  }

export function getUsername() {
    if (keycloak.authenticated) {
        return keycloak.tokenParsed.preferred_username;
    }
    return null;
}

export function getMail()
{
    if (keycloak.authenticated) {
        return keycloak.idTokenParsed.email
    }
    return null;
}

export function kclogout(url)
{
    return keycloak.logout({ redirectUri: url })
}

export function kclogin(url)
{
    return keycloak.login({ redirectUri: url })
}

export async function getAccessToken()
{
    try {
        // Ensure the Keycloak instance is initialized
        if (!keycloak.authenticated) {
          await keycloak.login();
        }
    
        // Update the token if needed
        await keycloak.updateToken(30); // Update token if it will expire in less than 30 seconds
    
        // Return the token
        return keycloak.token;
      } catch (error) {
        console.error('Failed to get access token:', error);
        throw error;
      }
}

export default keycloak;


//     logout(url)
//     {
//         return this.keycloak.logout({ redirectUri: url })
//     }

//     login(url)
//     {
//         return this.keycloak.login({redirectUri: url })
//     }
  



// class KC
// {
//     getMail = () => this.keycloak.idTokenParsed?.email
//     getUsername = () => this.keycloak.tokenParsed?.preferred_username;
//     // isLogged = () => !!this.keycloak.token

//     constructor()
//     {
//         this.tokens = null
//         this.initOptions = Constants.LOGIN_OPTIONS
//     }

//     async getAccessToken()
//     {
//         await this.keycloak.updateToken().catch(()=>{
//             throw ('Failed to refresh the token, or the session has expired');
//         })
        
//         return this.keycloak.token
//     }
    
//     logout(url)
//     {
//         return this.keycloak.logout({ redirectUri: url })
//     }

//     login(url)
//     {
//         return this.keycloak.login({redirectUri: url })
//     }

//     init()
//     {
//         this.keycloak = new Keycloak(this.initOptions)

//         this.keycloak.onReady = (auth) => {
//             this.onReady()
//         }

//         this.keycloak.onAuthSuccess = () =>{
//             this.onAuth()
//         }

//         try 
//         {
//             if (this.tokens !== null )
//             {
//                 this.keycloak.init({
//                     onLoad: 'check-sso',
//                     silentCheckSsoRedirectUri: `${location.origin}/user/sso.html`,
//                     token: this.tokens.at, 
//                     refreshToken: this.tokens.rt
//                 })
//             }
//             else
//             {
//                 this.keycloak.init({
//                     onLoad: 'check-sso',
//                     silentCheckSsoRedirectUri: `${location.origin}/user/sso.html`
//                 })
//             }
//         }
//             catch {
//             console.log ("Can't init Keycloak")
//         }
//     }   
// }

// export default KC