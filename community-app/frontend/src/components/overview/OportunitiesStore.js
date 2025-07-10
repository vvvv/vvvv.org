import Constants from "../../constants.js"
import { defineStore } from 'pinia'

export const useOportunitiesStore = defineStore ('oportunities',{
    state: ()=>{
        return {
            jobs: [],
            internships: [],
            total: 0,
            fetched: false
        }
    },
    actions: {
        async fetch(force = false){

            if (this.fetched && !force) return;

            try{
                this.internships = await fetchInternships();
                // this.count = this.jobs.length + this.internships.length;
            }
            catch (error){
                this.fetched = false;
            }

            try{
                this.jobs = await fetchJobs();
            }
            catch (error){
                this.fetched = false;
            }

        }
    }
})

async function fetchJobs(){

    const response = await fetch(Constants.FORUM_JOBS);

    if (response.ok)
    {
        const json = await response.json();
        
        const jobs = json.map((t)=>{
                return {
                    title: t.title,
                    link: Constants.FORUM+'t/'+t.slug,
                }
            })

        return jobs;
    }
    else
    {
        return [];
    }
}

async function fetchInternships(){

    const url = Constants.GET_COMPANIES+"?fields[]=name&filter[internships][_eq]=true&sort[]=-date_updated";
    
    console.log ("fetching: "+url)

    const response = await fetch(url);
    
    if (response.ok)
    {
        const json = await response.json();
        const companies = json.data?.map((h) => (
            {
                title: h.name,
                link: '/business/'+h.name
            }
        ));

        return companies;
    }
    else {
        throw Error ("Connection Error");
    }
}