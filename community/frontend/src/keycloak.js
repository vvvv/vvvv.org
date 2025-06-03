import Keycloak from 'keycloak-js'
import Constants from './constants'

const keycloak = new Keycloak(Constants.LOGIN_OPTIONS)

const initKeycloak = async () =>
{

    try{
        const result = await keycloak.init({
            onLoad: 'check-sso',
            silentCheckSsoRedirectUri: window.location.origin+'/user/silent-check-sso.html'
        })
        
        // cleanup hashes in url, after keycloak redirects.
        // have to wait a bit until the hash appears.
        // probably because it's being injected by silentSSO
        setTimeout(()=>{
            
            const hash = window.location.hash

            if ((hash.includes('code=') || hash.includes('error=')) 
                && hash.includes('state='))
                {
                    const [url] = window.location.href.split('#');
                    window.history.replaceState(null, '', url);
                }
        }, 500);

        return result
    }
    catch (error)
    {
        console.error('Failed to initialize Keycloak')
    }
}
 
export { keycloak, initKeycloak };