import Constants from "../../constants.js"
import { defineStore } from 'pinia'

export const useOpportunitiesStore = defineStore ('oportunities',{
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

    const url = Constants.GET_COMPANIES+"?fields[]=name,slug&filter[internships][_eq]=true&sort[]=-date_updated";

    const response = await fetch(url);
    
    if (response.ok)
    {
        const json = await response.json();
        const companies = json.data?.map((c) => (
            {
                title: c.name,
                link: '/business/'+c.slug,
                slug: c.slug
            }
        ));

        return companies;
    }
    else {
        throw Error ("Connection Error");
    }
}