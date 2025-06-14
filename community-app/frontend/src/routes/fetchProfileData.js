import Constants from '../constants'
import { getAccessToken, getMail, getUsername } from '../keycloak-helper'
import { makeFields } from '../utils'

const CONSTANTS_REQ = {
    method: "GET",
    headers: { 
      "Content-Type": "application/json"
    }
}

export async function fetchProfileData()
{
    const result = await Promise.all([ 
            loadProfile(), 
            loadConstants() 
        ]);

    return result;
}

async function loadConstants() 
{
    const response = await fetch(Constants.BACKEND_GET_CONSTANTS, CONSTANTS_REQ)

    if (!response.ok)
    {
      throw new Error ("Can't load constants") 
    }
    
    return response.json()
}

async function loadProfile() {
  
    let token;
  
    try{
      token = await getAccessToken();
    }
    catch {
        throw new Error ("Session expired. Please try to login again.");
    }
  
    const response = await fetch(Constants.BACKEND_GET_USER, {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
                'Authorization': token
            },
    })

    if (!response.ok)
    {
        const error = await response.json();

        let mail = getMail(); 

        if ( !mail || error.code === 'NO_MAIL')
            throw new Error ("Mail is not set for the account.");

        if (error.code === 'NO_USER')
            return {
                user: {
                    username: getUsername(),
                    email: mail
                },
                social: {
                    fields: makeFields([], 4)
                },
                hire: {},
                companies: [],
                edus: []
            };

        if (error.code === 'ERROR')
        {
            throw new Error ( error.message );
        }

        throw new Error(error.message || "Unknown error occurred.");

    }

    const json = await response.json();
    const user = { ...json};
    const companies = [ ...json.companies];
    const edus = [ ...json.edus];
    const related = {...json.related[0]};
    const hire = related.hire || {};
    const social = related.social || {};
    
    delete user.related;
    delete user.companies; 
    delete user.edus

    social.fields = makeFields(social.fields ?? [], 4);
    companies.forEach((c)=>{
        c.social.fields = makeFields(c.social.fields ?? [], 4);
    })

    edus.forEach((c)=>{
        c.social.fields = makeFields(c.social.fields ?? [], 4);
    })

    return {
        user,
        social,
        hire,
        companies,
        edus
    };
  }