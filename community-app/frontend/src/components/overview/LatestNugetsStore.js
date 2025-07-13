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

            let status="";

            try{
                if (new Date(n.firstPublished).getTime() + twoWeeks > Date.now()) {
                    status = "new";
                }
                else if (n.firstPublished != n.lastPublished) {
                    status = "updated";
                }
            }
            catch{
                // server still using an old API. Status will stay ""
            }

            return {
                id: n.id,
                icon: n.icon || "",
                by: n.owners.join(', '),
                link: `${Constants.NUGET_PACK_LINK}${n.id}#readme-body-tab`,
                status: status,
                desc: n.desc
            }
        })
        
        return nugets;
    }
    else
    {
        return [];
    }
}