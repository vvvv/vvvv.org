const DATA_LOCAL="http://localhost:8058/"
const DATA_REMOTE="https://data.vvvv.org/"

const BACKEND_LOCAL="http://localhost:4050/v1/"
const BACKEND_REMOTE="https://io.vvvv.org/v1/"

const DATAURL = DATA_REMOTE
const BACKENDURL = import.meta.env.DEV ? BACKEND_LOCAL: BACKEND_REMOTE

export default Object({   

    //LINKS
    FORUM:"https://forum.vvvv.org/",
    NUGET_ORG:"https://www.nuget.org/packages?q=tag%3Avl&includeComputedFrameworks=true&prerel=true&sortby=created-desc",
    NUGET_PACK_LINK:"https://www.nuget.org/packages/",
    
    //DATA
    BASEURL: DATAURL, 
    ASSETS: DATAURL + "assets/",
    GET_COMPANIES: DATAURL + 'items/Company',
    GET_EDUS: DATAURL + 'items/Edu',
    GET_USERS: DATAURL + 'items/User',
    GET_HIRE: DATAURL + 'items/Hire',
    
    //BACKEND
    NUGETS_LATEST: BACKENDURL + 'latestNugets',
    FORUM_TOPICS: BACKENDURL + 'discourseTopics',
    FORUM_JOBS: BACKENDURL + 'discourseJobs',
    BACKEND_GET_USER: BACKENDURL + "userinfo",
    BACKEND_GET_CONSTANTS: BACKENDURL + "constants",
    EDIT_PERSONAL: BACKENDURL + "edit/personal",
    EDIT_HIRE: BACKENDURL + "edit/hire",
    EDIT_COMPANY: BACKENDURL + "edit/company",
    EDIT_EDU: BACKENDURL + "edit/edu",
    FILE: BACKENDURL + "file",
    LOGIN_OPTIONS: {
        url: 'https://login.vvvv.org/',
        realm: 'vvvv', 
        clientId: 'weblogin'
    },
    FILE_TYPES: [
        {
            label: "gif",
            mime: "image/gif"
        },
        {
            label: "jpg",
            mime: "image/jpeg"
        },
        {
            label: "webp",
            mime: "image/webp"
        },
        {
            label: "png",
            mime: "image/png"
        }
    ]
})