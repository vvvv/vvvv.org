
import Constants from '../constants'

const URL = Constants.BASEURL+`items/User?fields=*,related.social.contact,related.hire.*,related.hire.availableFor.AvailableFor_Options_id.value
&filter[related][hire][available][_eq]=true&sort=username&meta=filter_count`;

export async function fetchHireData (loading) 
{
    const response = await fetch(URL);
    const json = await response.json();
    
    const users = json.data.map((u)=>{
        const name = [u.name, u.surname].filter(Boolean).join(" ");
        return {
                username: u.username,
                name: name ?? null,
                contact: u.related[0].social ?? null,
                hire: u.related[0].hire ?? null,
            };
    })

    return users;
}