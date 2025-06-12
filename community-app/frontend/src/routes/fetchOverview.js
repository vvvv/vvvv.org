import Constants from '../constants'
import { createAssetUrl } from '../utils'

const imageParamsLogos = "?withoutEnlargement=true&quality=90&fit=cover&height=40";
const imageParamsAvatars = "?withoutEnlargement=true&quality=90&fit=cover&height=60&width=60";
const limit = 10;
const businessesURL = Constants.GET_COMPANIES+"?fields[]=name,logo&meta=filter_count";
const forHireURL = Constants.GET_HIRE+"?fields[]=user_id.username,user_id.userpic&meta=filter_count";
const contentURL = Constants.BASEURL+"items/Community";

function shuffle(array)
{
    return array.sort(() => 0.5 - Math.random());
}

export async function fetchOverview()
{

    try{
        
        let response;
        let data;
        
        const result = {
            businesses: null,
            forHire: null,
            content: null
        };

        // Fetch for Business
        response = await fetch(businessesURL);
        
        if (response.ok)
        {
            data = await response.json();
            const items = data.data?.map((b) => (
                {
                    img: b.logo ? createAssetUrl(b.logo) + imageParamsLogos : null,
                    text: b.name,
                }
            ));
        
            result.businesses = {
                items: shuffle(items).slice(0, limit), 
                total: data.meta?.filter_count ?? 0
            }
        }
    
        // Fetch for Hire
        response = await fetch(forHireURL);
        
        if (response.ok)
        {
            data = await response.json();
            const forHireItems = data.data?.map((h) => (
                {
                    img: h.user_id.userpic ? createAssetUrl(h.user_id.userpic) + imageParamsAvatars : null,
                    text: h.user_id.username,
                }
            ));
        
            result.forHire = {
                items: shuffle(forHireItems).slice(0, limit),
                total: data.meta?.filter_count ?? 0
            }
        }
        
        // Fetch for Content
        response = await fetch (contentURL);

        if (response.ok)
        {
            const content = await response.json();
            result.content = content.data;
        }

        return result;
    }
    catch (error) {
        console.log (error); 
        return {};
    }
}