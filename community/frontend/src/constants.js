const DIRECTUS_LOCAL="http://localhost:8058/"
const DIRECTUS_REMOTE="https://data.vvvv.org/"

const BACKEND_LOCAL="http://localhost:4050/v1/"
const BACKEND_REMOTE="https://io.vvvv.org/v1/"

const DIRECTUSURL = DIRECTUS_REMOTE
const BACKENDURL = BACKEND_LOCAL

export default Object({   

    //DIRECTUS
    BASEURL: DIRECTUSURL, 
    ASSETS: DIRECTUSURL + "assets/",
    GET_COMPANIES: DIRECTUSURL + 'items/Company',
    GET_USERS: DIRECTUSURL + 'items/User',

    //BACKEND
    BACKEND_GET_USER: BACKENDURL + "userinfo",
    BACKEND_GET_CONSTANTS: BACKENDURL + "constants",
    EDIT_COMPANY: BACKENDURL + "edit/company",
    EDIT_BASICS: BACKENDURL + "edit/basics",
    EDIT_HIRE: BACKENDURL + "edit/hire",
    FILE: BACKENDURL + "file",
    LOGIN_OPTIONS: {
        url: 'https://login.vvvv.org/',
        realm: 'vvvv', 
        clientId: 'weblogin'
    },
    LOGIN_REDIRECT: 'http://localhost:1313/',
    
})