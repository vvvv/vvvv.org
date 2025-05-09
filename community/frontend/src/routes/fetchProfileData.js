import Constants from '../constants'
import { getAccessToken, getMail, getUsername } from '../keycloak-helper'
import { makeFields } from '../utils'

const CONSTANTS_REQ = {
    method: "GET",
    headers: { 
      "Content-Type": "application/json"
    }
}

export async function fetchProfileData( loading, failure )
{
    loading.value = true

    try {
        const [ profileData, constantsData ] = await Promise.all([ 
            loadProfile(), 
            loadConstants() 
        ]);

        return {
            profileData,
            constantsData
        }

      } 
      catch (error){
        console.log (error)
        failure.value = error.message || "Can't get data, please try login later."
      } 
      finally{
        loading.value = false;
      }
}

async function loadConstants() 
{
    const response = await fetch(Constants.BACKEND_GET_CONSTANTS, CONSTANTS_REQ)

    if (response.status != 200)
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

    if (response.status != 200)
    {
        return {
            user: {
                username: getUsername(),
                email: getMail(),
            },
            social: {
                fields: makeFields([], 4)
            },
            hire: {},
            companies: [],
        };
    }

    const json = await response.json();
    const user = { ...json[0]};
    const companies = [ ...json[0].companies];
    const related = {...json[0].related[0]};
    const hire = related.hire || {};
    const social = related.social || {};
    
    delete user.related;
    delete user.companies; 

    social.fields = makeFields(social.fields ?? [], 4);
    companies.forEach((c)=>{
        c.social.fields = makeFields(c.social.fields ?? [], 4);
    })

    return {
        user,
        social,
        hire,
        companies
    };
  }