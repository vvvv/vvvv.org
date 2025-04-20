import Constants from '../../constants'

const IMAGE_PARAMS = '?withoutEnlargement=true&quality=90&fit=cover&width=120';
const URL = Constants.BASEURL+`items/Company?fields=*,social.*&filter[name][_eq]=`;

export async function fetchBusinessData( loading, name )
{

    loading.value = true;
    const url = URL + name
    
    try{
        const response = await fetch(url);
        const json = await response.json();
    
        if (json.data.length == 0)
        {
            throw ("Can't find a profile for this company") 
        }

        const data = {...json.data[0]};
       
        data.logo = data?.logo ? createAssetUrl(data.logo) + IMAGE_PARAMS : null;
    
        return data;
    }
    catch (error) {
        console.error(error);
    }
    finally{
        loading.value = false;
    }   
}