const DATA_LOCAL="http://localhost:8058/"
const DATA_REMOTE="https://data.vvvv.org/"

const BACKEND_LOCAL="http://localhost:4050/v1/"
const BACKEND_REMOTE="https://io.vvvv.org/v1/"

const DATAURL = DATA_REMOTE
const BACKENDURL = BACKEND_REMOTE

export default Object({   

    //LINKS
    FORUM:"https://forum.vvvv.org/",

    //DATA
    BASEURL: DATAURL, 
    ASSETS: DATAURL + "assets/",
    GET_COMPANIES: DATAURL + 'items/Company',
    GET_USERS: DATAURL + 'items/User',

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
    }
})