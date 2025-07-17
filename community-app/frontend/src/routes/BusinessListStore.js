import Constants from "../constants.js"
import { defineStore } from 'pinia'
import { fetchSocial } from "./fetchSocial.js"

const URL = Constants.BASEURL+`items/Company?fields=*&sort=name&meta=filter_count`;
const LOGO_SETTINGS = 'withoutEnlargement=true&fit=inside&height=120&quality=90&format=png';

export const useBusinessListStore = defineStore ('businessList',{
    state: ()=>{
        return {
            list: {},
            selectedSection: sections[0],
            selectedConnection: socials[0],
            sections: sections,
            socialOptions: socials,
            loading: false
        }
    },
    actions: {

        async setSection(key)
        {
            this.selectedSection = sections.find(s=> s.key == key);
            if (key == 'list') this.getList(true);
            if (key == 'connections') this.setConnection(socials[0].key)
        },

        async setConnection(key)
        {
            this.selectedConnection = socials.find(s=> s.key == key);
            this.getConnection(true);
        },

        async getList(force = false){

            if (this.list.list && !force) return;
            this.loading = true;

            try{
                this.list.list = await fetchList();
            }
            catch (error){
                this.fetched = false;
            }
            finally{
                this.loading = false;
            }

        },

        async getConnection(force = false){

            if (this.list.connections && !force) return;
            this.loading = true;

            try{
                const result = await fetchSocial('company', this.selectedConnection.key);

                result.items.forEach(i=>{
                    i.profileLink = '/business/' + i.slug
                    i.key = "business"
                })

                this.list.connections = result; 
            }
            catch (error){
                console.log (error);
            }
            finally{
                this.loading = false;
            }

        }
    }
})

const sections = [
    { label: "List", key: 'list', content: 'List'},
    // { label: "Map", key: 'map', content: 'Map'},
    { label: "Connections", key: 'connections', content: 'Social'},
];

const socials=[
    { label: "GitHub", key: "github" },
    { label: "NuGet", key: "nuget" },
    { label: "Mastodon", key: "mastodon" },
    { label: "Pixelfed", key: "pixelfed" },
    { label: "LinkedIn", key: "linkedin" },
    { label: "YouTube", key: "youtube" },
    { label: "PeerTube", key: "peertube" },
];

function logoSrc (src)
{
    return src ? `${Constants.ASSETS}${src}?${LOGO_SETTINGS}` : null;
}

async function fetchList()
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