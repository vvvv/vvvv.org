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
            selectedConnection: connections[0],
            sections: sections,
            socialOptions: connections,
            loading: false
        }
    },
    actions: {

        async setSection(section, type)
        {
            this.selectedSection = sections.find(s=> s.key == section) ?? sections[0];
            if (type)
            {
                this.selectedConnection = connections.find(c=> c.key == type) || connections[0];
            }
        },

        async getData()
        {
            if (this.selectedSection.key == 'list')
            {
                await this.getList(true);
            }
            else if (this.selectedSection.key == 'connections')
            {
                await this.getConnections(true);
            }
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

        async getConnections(force = false){

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

const connections = [
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