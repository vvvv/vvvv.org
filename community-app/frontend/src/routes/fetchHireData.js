
import Constants from '../constants'

const url = Constants.BASEURL+`items/User?fields=*,related.social.contact,related.hire.*,related.hire.availableFor.AvailableFor_Options_id.value
&filter[related][hire][available][_eq]=true&sort=username&meta=filter_count`;

export async function fetchHireData () 
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
    
        return users;
    }
    else
    {
        throw Error ("Connection Error");
    }

}