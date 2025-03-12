const BASEURL="http://localhost:8055/"
const BACKENDURL="http://localhost:4050/v1/"

export default Object.freeze({   

    //DIRECTUS DIRECT
    ASSETS: BASEURL + "assets/",
    GET_COMPANIES: BASEURL + 'items/Company',
    GET_USERS: BASEURL + 'items/User',

    //BACKEND
    GET_USERINFO: BACKENDURL + "userinfo",
    GET_CONSTANTS: BACKENDURL + "constants",
    EDIT_COMPANY: BACKENDURL + "edit/company",
    EDIT_BASICS: BACKENDURL + "edit/basics",
    EDIT_HIRE: BACKENDURL + "edit/hire",
    FILE_REMOVE: BACKENDURL + "removeFile",
    FILE_UPLOAD: BACKENDURL + "uploadFile",
    LOGIN_OPTIONS: {
        url: 'https://login.vvvv.org/',
        realm: 'vvvv', 
        clientId: 'weblogin'
    },
    LOGIN_REDIRECT: 'http://localhost:5173/',
    
    PROFILEPIC_PARAMS: "?quality=90&fit=cover&width=120"

})