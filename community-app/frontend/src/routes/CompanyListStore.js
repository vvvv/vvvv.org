import Constants from "../constants.js"
import { defineStore } from 'pinia'

export const useCompanyListStore = defineStore ('companyList',{
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
                const {items, total} = await fetchCompanyList();
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

const URL = Constants.BASEURL+`items/Company?fields=*&sort=name&meta=filter_count`;
const LOGO_SETTINGS = 'withoutEnlargement=true&fit=inside&height=50&quality=90&format=auto';

function logoSrc (src)
{
    return src ? `${Constants.ASSETS}${src}?${LOGO_SETTINGS}` : null;
}

async function fetchCompanyList()
{

    const response = await fetch (URL);

    if (response.ok)
    {
        const json = await response.json();
    
        const companies = json.data;
    
        companies.forEach ((c)=>{
            c.logo = logoSrc(c.logo)
        })
    
        return {
            items: companies,
            total: json.meta?.filter_count ?? 0
        }
    }
    else{
        throw Error ("Connection Error");
    }

}