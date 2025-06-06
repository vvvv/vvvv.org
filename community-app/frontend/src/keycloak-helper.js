import { keycloak } from "./keycloak";

export const isAuthenticated = () => keycloak.authenticated
export const kclogout = (url) => keycloak.logout({ redirectUri: url })
export const kclogin = (url) => keycloak.login({ redirectUri: url })

export const getUsername = () => {
    if (keycloak.authenticated) {
        return keycloak.tokenParsed?.preferred_username;
    }
    return null;
}

export const getMail = () => {
    if (keycloak.authenticated) {
        return keycloak.idTokenParsed?.email
    }
    return null;
}


export const getAccessToken = async () => {
    try {
        // Ensure the Keycloak instance is initialized
        if (!keycloak.authenticated) {
          await keycloak.login();
        }
    
        // Update the token if needed
        await keycloak.updateToken(30); // Update token if it will expire in less than 30 seconds
    
        // Return the token
        return keycloak.token;
    } 
    catch (error) {
        console.error('Failed to get access token:', error)
        throw error
    }
}