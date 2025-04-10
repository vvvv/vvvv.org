const BASEURL="http://localhost:8058/"
const BACKENDURL="http://localhost:4050/v1/"

export default Object({   

    //DIRECTUS DIRECT
    ASSETS: BASEURL + "assets/",
    GET_FORHIRE: BASEURL + 'items/User?fields=*,related.hire.*&filter[related][hire][available][_eq]=true',
    GET_COMPANIES: BASEURL + 'items/Company',
    GET_USERS: BASEURL + 'items/User',

    //BACKEND
    BACKEND_GET_USER: BACKENDURL + "userinfo",
    BACKEND_GET_CONSTANTS: BACKENDURL + "constants",
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
    LOGIN_REDIRECT: 'http://localhost:1313/',
    
    PROFILEPIC_PARAMS: "?quality=90&fit=cover&width=120"

})