import Constants from '../../constants'
import { createAssetUrl } from '../../utils'

const imageParams = "?withoutEnlargement=true&quality=90&fit=cover&width=120&height=120";
const limit = 5;
const url = Constants.GET_USERS+"?sort=-date_created&fields[]=username,userpic&limit=" + limit;

export async function fetchNewestUsers()
{

    const response = await fetch(url);
    const data = await response.json();

    return data.data.map((u) => (
        {
            userpic: u.userpic ? createAssetUrl(u.userpic) + imageParams : null,
            username: u.username,
        }
    ))
}