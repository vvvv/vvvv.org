
import Constants from '../constants'

const URL = Constants.BASEURL+`items/User?fields=*,related.social.contact,related.hire.*,related.hire.availableFor.AvailableFor_Options_id.value
&filter[related][hire][available][_eq]=true&sort=name&meta=filter_count`;

export async function fetchHireData (loading) 
{
    loading.value = true;
    try{
        const response = await fetch(URL);
        const json = await response.json();
        
        const users = json.data.map((u)=>{
            const name = [u.name, u.surname].filter(Boolean).join(" ");
            return {
                    title: name ? `${name} (${u.username})` : u.username,
                    contact: u.related[0].social ?? null,
                    hire: u.related[0].hire ?? null,
                };
        })

        return users;
        
    } catch (error){
        console.log(error)
    } finally{
        loading.value = false   
    }
}