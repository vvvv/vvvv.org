import Constants from "../constants";
import { linkData } from "../components/LinksHelper";

const socialFetchURLs ={
    user: {
        url: `${Constants.GET_USERS}?fields=username,related.social.{SOCIAL}&filter[related][social][{SOCIAL}][_nempty]=true&sort=username`,
        itemPath: 'related.social'
    },
    company: {
        url: `${Constants.GET_COMPANIES}?fields=name,slug,social.{SOCIAL}&filter[social][{SOCIAL}][_nempty]=true&sort=name`,
        itemPath: 'social'
    },
    edu: 
    {
        url: `${Constants.GET_EDUS}?fields=name,slug,social.{SOCIAL}&filter[social][{SOCIAL}][_nempty]=true&sort=name`,
        itemPath: 'social'
    }
};

export async function fetchSocial(type, social)
{

    const query = socialFetchURLs[type]; 
    const url = query?.url.replaceAll('{SOCIAL}', social)
    if (!url) throw new Error ("Can't fetch Social");

    const response = await fetch (url);

    if (response.ok)
    {
        const json = await response.json();
    
        const items = json.data.map(item=>{
     
            const data = linkData (social, item[query.itemPath][social]);
         
            return {
                name: item.username || item.name,
                label: data.text,
                connectionLink: data.url,
                slug: item.slug,
            }
            
        });
        
        return {
            items: items,
            total: json.meta?.filter_count ?? 0
        }
    }
    else{
        throw Error ("Connection Error");
    }

}