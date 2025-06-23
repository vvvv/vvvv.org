import Constants from '../constants'
import { createAssetUrl } from '../utils'

const IMAGE_PARAMS = '?withoutEnlargement=true&quality=90&fit=cover&width=120';
const URL = Constants.BASEURL+`items/Company?fields=*,social.*,owner.username&filter[name][_eq]=`;

export default async function fetchCompanyProfile ( name )
{
    const url = URL + name
    
    const response = await fetch(url);

    if (response.ok)
    {
        const json = await response.json();
    
        if (json.data.length == 0)
        {
            throw ("Can't find a profile for this company") 
        }
    
        const data = {...json.data[0]};
        
        data.logo = data?.logo ? createAssetUrl(data.logo) + IMAGE_PARAMS : null;
    
        return data;
    }
    else
    {
        throw new Error ("Can't load Profile");
    }

}