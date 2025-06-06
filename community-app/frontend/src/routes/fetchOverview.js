import Constants from '../constants'
import { createAssetUrl } from '../utils'

const imageParams = "?withoutEnlargement=true&quality=90&fit=cover&width=40&height=40";
const limit = 5;
const usersURL = Constants.GET_USERS+"?sort=-date_created&fields[]=username,userpic&limit=" + limit;
const businessesURL = Constants.GET_COMPANIES+"?sort=-date_updated&fields[]=name,logo&limit=" + limit;
const forHireURL = Constants.GET_HIRE+"?sort=-date_updated&fields[]=user_id.username,user_id.userpic&limit=" + limit +
"&filter[available][_eq]=true&filter[user_id][_null]=false";

export async function fetchOverview()
{

    let response = await fetch(usersURL);
    let data = await response.json();

    const users = data.data.map((u) => (
        {
            userpic: u.userpic ? createAssetUrl(u.userpic) + imageParams : null,
            username: u.username,
        }
    ))

    response = await fetch(businessesURL);
    data = await response.json();

    const businesses = data.data.map((b) => (
        {
            logo: b.logo ? createAssetUrl(b.logo) + imageParams : null,
            name: b.name,
        }
    ))

    response = await fetch(forHireURL);
    data = await response.json();

    const forHire = data.data.map((h) => (
        {
            username: h.user_id.username,
            userpic: h.user_id.userpic ? createAssetUrl(h.user_id.userpic) + imageParams : null,
        }
    ))

    return {
        users: users,
        businesses: businesses,
        forHire: forHire
    }
}