import Keycloak from 'keycloak-js'
import Constants from './constants'

const keycloak = new Keycloak(Constants.LOGIN_OPTIONS)

const initKeycloak = async () =>
{

    const silentURL = window.location.origin+'/silent-check-sso.html';

    const result = await keycloak.init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: silentURL,
        checkLoginIframe: true
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
 
export { keycloak, initKeycloak };