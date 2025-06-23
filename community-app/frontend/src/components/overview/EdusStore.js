import Constants from "../../constants.js"
import { defineStore } from 'pinia'
import { createAssetUrl, shuffle } from "../../utils.js"

export const useEdusStore = defineStore ('edus',{
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
                const {items, total} = await fetchEdus();
                this.items = items;
                this.total = total;
                this.fetched = true;
            }
            catch (error){
                this.fetched = false;
            }

        }
    }
})

async function fetchEdus(){
        
    const imageParamsLogos = "?withoutEnlargement=true&quality=90&fit=cover&height=40";
    const url = Constants.GET_EDUS+"?fields[]=name,logo&meta=filter_count";

    const limit = 8;
    
    const response = await fetch(url);
    
    if (response.ok)
    {
        const json = await response.json();
        const items = json.data?.map((b) => (
            {
                img: b.logo ? createAssetUrl(b.logo) + imageParamsLogos : null,
                url: '/edu/'+b.name,
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