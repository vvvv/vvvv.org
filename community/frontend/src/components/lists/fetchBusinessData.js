import Constants from '../../constants'

const URL = Constants.BASEURL+`items/Company?fields=*&sort=name&meta=filter_count`;
const LOGO_SETTINGS = 'withoutEnlargement=true&fit=inside&height=50&quality=90&format=auto';


function logoSrc (src)
{
    return src ? `${Constants.ASSETS}${src}?${LOGO_SETTINGS}` : null;
}

export async function fetchBusinessData( companies, count, emit)
{

    try{
        const response = await fetch (URL);
        const data = await response.json();
    
        companies.value = data.data;
    
        companies.value.forEach ((c)=>{
            c.logo = logoSrc(c.logo)
        })
        count.value = data.meta.filter_count;
        //queryCoordinates()
    
        if (count.value > 0)
        {
            emit('setCount', count.value)    
        }
    }
    catch (error) {
        console.log("error")
    }
}