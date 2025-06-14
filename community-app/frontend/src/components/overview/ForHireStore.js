import Constants from "../../constants.js"
import { defineStore } from 'pinia'
import { createAssetUrl, shuffle } from "../../utils.js"

export const useForHireStore = defineStore ('forHire',{
    state: ()=>{
        return {
            items: [],
            total: null,
            fetched: false
        }
    },
    actions: {
        async fetch(force = false){

            if (this.fetched && !force) return;

            try{
                const { items, total } = await fetchForHire();
                this.items = items;
                this.total = total;
                this.fetched = true;
            }
            catch (error){
                this.items = [];
                this.total = null;
                this.fetched = false;
            }

        }
    }
})

async function fetchForHire(){
    
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