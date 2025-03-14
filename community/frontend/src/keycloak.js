import Keycloak from 'keycloak-js'
import Constants from './constants'

class KC
{
    getMail = () => this.keycloak.idTokenParsed?.email
    getUsername = () => this.keycloak.tokenParsed?.preferred_username;
    // isLogged = () => !!this.keycloak.token

    constructor()
    {
        this.tokens = null
        this.initOptions = Constants.LOGIN_OPTIONS
    }

    async getAccessToken()
    {
        await this.keycloak.updateToken().catch(()=>{
            throw ('Failed to refresh the token, or the session has expired');
        })
        
        return this.keycloak.token
    }
    
    logout(url)
    {
        return this.keycloak.logout({ redirectUri: url })
    }

    login(url)
    {
        return this.keycloak.login({redirectUri: url })
    }

    init()
    {
        this.keycloak = new Keycloak(this.initOptions)

        this.keycloak.onReady = (auth) => {
            this.onReady()
        }

        this.keycloak.onAuthSuccess = () =>{
            this.onAuth()
        }

        try 
        {
            if (this.tokens !== null )
            {
                this.keycloak.init({
                    onLoad: 'check-sso',
                    silentCheckSsoRedirectUri: `${location.origin}/user/sso.html`,
                    token: this.tokens.at, 
                    refreshToken: this.tokens.rt
                })
            }
            else
            {
                this.keycloak.init({
                    onLoad: 'check-sso',
                    silentCheckSsoRedirectUri: `${location.origin}/user/sso.html`
                })
            }
        }
            catch {
            console.log ("Can't init Keycloak")
        }
    }   
}

export default KC