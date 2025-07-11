import Constants from "../../constants.js"
import { defineStore } from 'pinia'

const twoWeeks = 14 * 24 * 60 * 60 * 1000;

export const useLatestNugetsStore = defineStore ('latestNugets',{
    state: ()=>{
        return {
            nugets: [],
            fetched: false
        }
    },
    actions: {
        async fetch(force = false){

            if (this.fetched && !force) return;

            try{
                this.nugets = await fetchLatestNugets();
                this.fetched = true;
            }
            catch (error){
                this.fetched = false;
            }

        }
    }
})  

async function fetchLatestNugets(){

    const count = 7;
    const response = await fetch(Constants.NUGETS_LATEST+`?count=${count}`);

    if (response.ok)
    {
        const json = await response.json();

        const nugets = json.map((n)=>{

            // const by=[... new Set([ ...n.owners, ...n.authors])];

            return {
                id: n.id,
                icon: n.icon || "",
                by: n.owners.join(', '),
                link: `${Constants.NUGET_PACK_LINK}${n.id}#readme-body-tab`,
                status: n.status
            }
        })
        
        return nugets;
    }
    else
    {
        return [];
    }
}