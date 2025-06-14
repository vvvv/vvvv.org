import Constants from '../constants'

const URL = Constants.BASEURL+`items/Edu?fields=*&sort=name&meta=filter_count`;
const LOGO_SETTINGS = 'withoutEnlargement=true&fit=inside&height=50&quality=90&format=auto';


function logoSrc (src)
{
    return src ? `${Constants.ASSETS}${src}?${LOGO_SETTINGS}` : null;
}

export async function fetchEduData()
{
    const response = await fetch (URL);

    if (response.ok)
    {
        const json = await response.json();
    
        const edus = json.data;
    
        edus.forEach ((c)=>{
            c.logo = logoSrc(c.logo)
        })
    
        return {
            items: edus,
            count: json.meta?.filter_count ?? 0
        }
    }
    else{
        throw Error ("Connection Error");
    }

}