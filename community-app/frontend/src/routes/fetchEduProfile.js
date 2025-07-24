import Constants from '../constants'
import { createAssetUrl } from '../utils'

const IMAGE_PARAMS = '?withoutEnlargement=true&quality=98&fit=cover&width=300&format=png';
const URL = Constants.BASEURL+`items/Edu?fields=*,social.*,owner.username,people.User_Role_id.role,people.User_Role_id.user_id.username&filter[slug][_eq]=`;

export default async function fetchEduProfile (slug)
{
    const url = URL + slug;
    
    const response = await fetch(url);
    const json = await response.json();

    if (response.ok)
    {
        if (json.data.length == 0)
        {
            throw ("Can't find a profile for this Educational Institution") 
        }
    
        const data = {...json.data[0]};

        data.people = data.people.filter(p => p.User_Role_id.user_id !== null);

        data.people = data.people.map (p=>(
            {
                role: p.User_Role_id.role,
                username: p.User_Role_id.user_id.username,
                link: '/people/'+p.User_Role_id.user_id.username
            }
        ))
        
        data.logo = data?.logo ? createAssetUrl(data.logo) + IMAGE_PARAMS : null;
    
        return data;
    }
    else
    {
        throw new Error ("Can't load Profile");
    }
}