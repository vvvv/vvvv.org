import Constants from "../constants.js"
import { defineStore } from 'pinia'

export const useForHireListStore = defineStore ('forHireList',{
    state: ()=>{
        return {
            items: [],
            total: 0,
            fetched: false
        }
    },
    actions: {
        async fetch(force = false){

            if (this.fetched && !force) return;

            try{
                const { items, total } = await fetchHireData();
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

const url = Constants.GET_USERS+`?fields=*,related.social.contact,related.hire.*,related.hire.availableFor.AvailableFor_Options_id.value
&filter[related][hire][available][_eq]=true&sort=username&meta=filter_count`;

async function fetchHireData () 
{
    const response = await fetch(url);
    const json = await response.json();
    
    if (response.ok)
    {
        const users = json.data.map((u)=>{
            const name = [u.name, u.surname].filter(Boolean).join(" ");
            return {
                    username: u.username,
                    name: name ?? null,
                    contact: u.related[0].social ?? null,
                    location: {
                        city: u.location_city,
                        country: u.location_country
                    },
                    hire: u.related[0].hire ?? null,
                };
        })
    
        return {
            items: users,
            total: json.meta?.filter_count ?? 0
        }
    }
    else
    {
        throw Error ("Connection Error");
    }

}