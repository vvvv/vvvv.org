import Constants from "../../constants";
import { createAssetUrl, shuffle } from "../../utils.js"

export async function fetchLatestTopics(){

    const count = 6;
    const response = await fetch(Constants.FORUM_TOPICS+`?count=${count}`);

    if (response.ok)
    {
        const json = await response.json();
        
        const topics = json.map((t)=>{
                return {
                    id: t.id,
                    title: t.title,
                    link: Constants.FORUM+'t/'+t.slug
                }
            })

        return topics;
    }
    else
    {
        return [];
    }
}

export async function fetchBusinesses(){
        
    const imageParamsLogos = "?withoutEnlargement=true&quality=90&fit=cover&height=40";
    const url = Constants.GET_COMPANIES+"?fields[]=name,logo&meta=filter_count";

    const limit = 8;
    
    const response = await fetch(url);
    
    if (response.ok)
    {
        const json = await response.json();
        const items = json.data?.map((b) => (
            {
                img: b.logo ? createAssetUrl(b.logo) + imageParamsLogos : null,
                url: '/business/'+b.name,
                text: b.name,
            }
        ));
    
        return {
            items: shuffle(items).slice(0, limit), 
            total: json.meta?.filter_count ?? 0
        }
    }
    else {
        throw Error ("Connection error");
    }
}

export async function fetchForHire(){
    
    const imageParamsAvatars = "?withoutEnlargement=true&quality=90&fit=cover&height=60&width=60";
    const limit = 10;

    const url = Constants.GET_HIRE+"?fields[]=user_id.username,user_id.userpic&meta=filter_count";
        
    const response = await fetch(url);
    
    if (response.ok)
    {
        const json = await response.json();
        const items = json.data?.map((h) => (
            {
                img: h.user_id.userpic ? createAssetUrl(h.user_id.userpic) + imageParamsAvatars : null,
                text: h.user_id.username,
            }
        ));

        return {
            items: shuffle(items).slice(0, limit),
            total: json.meta?.filter_count ?? 0
        }
    }
    else {
        throw Error ("Connection Error");
    }
}