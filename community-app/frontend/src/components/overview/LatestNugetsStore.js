import Constants from "../../constants.js"
import { defineStore } from 'pinia'

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

    const count = 5;
    const response = await fetch(Constants.NUGETS_LATEST+`?count=${count}`);

    if (response.ok)
    {
        const json = await response.json();

        const nugets = json.map((n)=>{
            return {
                title: n,
                link: `${Constants.NUGET_PACK_LINK}${n}#readme-body-tab`
            }
        })
        
        return nugets;
    }
    else
    {
        return [];
    }
}