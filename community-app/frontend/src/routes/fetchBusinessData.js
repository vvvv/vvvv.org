import Constants from '../constants'

const URL = Constants.BASEURL+`items/Company?fields=*&sort=name&meta=filter_count`;
const LOGO_SETTINGS = 'withoutEnlargement=true&fit=inside&height=50&quality=90&format=auto';


function logoSrc (src)
{
    return src ? `${Constants.ASSETS}${src}?${LOGO_SETTINGS}` : null;
}

export async function fetchBusinessData()
{
    const response = await fetch (URL);

    if (response.ok)
    {
        const json = await response.json();
    
        const companies = json.data;
    
        companies.forEach ((c)=>{
            c.logo = logoSrc(c.logo)
        })
    
        return {
            companies: companies,
            count: json.meta?.filter_count ?? 0
        }
    }
    else{
        throw Error ("Connection Error");
    }

}