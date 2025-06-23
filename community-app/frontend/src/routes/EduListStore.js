import Constants from "../constants.js"
import { defineStore } from 'pinia'

export const useEduListStore = defineStore ('eduList',{
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
                const {items, total} = await fetchEduList();
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

const url = Constants.GET_EDUS+`?fields=*&sort=name&meta=filter_count`;
const LOGO_SETTINGS = 'withoutEnlargement=true&fit=inside&height=50&quality=90&format=auto';

async function fetchEduList()
{

    const response = await fetch (url);

    if (response.ok)
    {
        const json = await response.json();
    
        const edus = json.data;
    
        edus.forEach ((c)=>{
            c.logo = logoSrc(c.logo)
        })
    
        return {
            items: edus,
            total: json.meta?.filter_count ?? 0
        }
    }
    else {
        throw new Error ("Connection Error");
    }

}


function logoSrc (src)
{
    return src ? `${Constants.ASSETS}${src}?${LOGO_SETTINGS}` : null;
}