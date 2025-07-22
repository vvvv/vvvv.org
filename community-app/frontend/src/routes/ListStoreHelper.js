import Constants from "../constants.js"
import { linkData } from "../components/LinksHelper";

export const storeObject = (key) => (
{
    state: ()=>{
        return {
            list: {},
            selectedSection: sections[0],
            selectedConnection: connections[0],
            sections: sections,
            socialOptions: connections,
            loading: false,
            pager: { page: 0, size: 10}
        }
    },
    actions: {

        async setSection(section, key)
        {
            this.selectedSection = sections.find(s=> s.key == section) ?? sections[0];
            this.selectedConnection = key ? connections.find(c=> c.key == key) ?? connections[0] : connections[0];
        },

        async getData(pager)
        {
            if (pager)
            {
                this.pager = pager;
    
                if (this.selectedSection.key == 'list')
                {
                    await this.getList(true);
                }
                else if (this.selectedSection.key == 'connections')
                {
                    await this.getConnections(true);
                }
            }
        },

        async getList(force = false){

            if (this.list.list && !force) return;
            this.loading = true;

            try{
                this.list.list = await fetchList(listFetchURLs[key], this.pager);
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
                const result = await fetchSocial(key, this.selectedConnection.key, this.pager);

                result.items.forEach(i=>{
                    i.profileLink = `/${key}/${i.slug}`
                    i.key = key
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

const LOGO_SETTINGS = 'withoutEnlargement=true&fit=inside&height=120&quality=90&format=png'

const listFetchURLs = {
    business: Constants.GET_COMPANIES + '?fields=*&sort=name&meta=filter_count',
    edu: Constants.GET_EDUS + '?fields=*&sort=name&meta=filter_count',
    people: Constants.GET_USERS + '?fields=*&sort=username&meta=filter_count'
}

const socialFetchURLs ={
    people: {
        url: `${Constants.GET_USERS}?fields=username,related.social.{SOCIAL}&filter[related][social][{SOCIAL}][_nempty]=true&sort=username&meta=filter_count`,
        itemPath: ['related', 'social']
    },
    business: {
        url: `${Constants.GET_COMPANIES}?fields=name,slug,social.{SOCIAL}&filter[social][{SOCIAL}][_nempty]=true&sort=name&meta=filter_count`,
        itemPath: 'social'
    },
    edu: 
    {
        url: `${Constants.GET_EDUS}?fields=name,slug,social.{SOCIAL}&filter[social][{SOCIAL}][_nempty]=true&sort=name&meta=filter_count`,
        itemPath: 'social'
    }
};

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


function pagerParam(pager)
{
    return `&limit=${pager.size}&page=${pager.page}`;
}

async function fetchList(url, pager)
{

    const response = await fetch (url + pagerParam(pager));

    if (response.ok)
    {
        const json = await response.json();
    
        const items = json.data;
    
        items.forEach ((c)=>{
            c.logo = logoSrc(c.logo)
        })
    
        return {
            items: items,
            total: json.meta?.filter_count ?? 0
        }
    }
    else{
        throw Error ("Connection Error");
    }

}

function logoSrc (src)
{
    return src ? `${Constants.ASSETS}${src}?${LOGO_SETTINGS}` : null;
}

function getSocials(object, path)
{
    return path.split('.').reduce((acc, key)=>{
        console.log (acc);
        console.log (key);
        return acc && acc[key] !== undefined ? acc[key] : acc;
    }, object);
}

async function fetchSocial(key, social, pager)
{

    const query = socialFetchURLs[key]; 
    const url = query?.url.replaceAll('{SOCIAL}', social)
    if (!url) throw new Error ("Can't fetch Social");

    const response = await fetch (url + pagerParam(pager));

    if (response.ok)
    {
        const json = await response.json();
    
        const items = json.data.map(item=>{
     
            const handle = (Array.isArray(query.itemPath) ? item[query.itemPath[0]][0][query.itemPath[1]] : item[query.itemPath])[social];

            const data = linkData (social, handle);
         
            return {
                name: item.username || item.name,
                label: data.text,
                connectionLink: data.url,
                slug: item.slug,
            }
            
        });
        
        return {
            items: items,
            total: json.meta?.filter_count ?? 0
        }
    }
    else{
        throw Error ("Connection Error");
    }

}
