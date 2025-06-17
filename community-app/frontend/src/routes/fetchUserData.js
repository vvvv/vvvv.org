import Constants from '../constants'
import { createAssetUrl, locationCityCountry } from '../utils'

const DEFAULT_SORT = "sort=username"
const FIELDS =`fields[]=username,userpic,related.hire.available,date_created,location_city,location_country`

const imageParams = "?withoutEnlargement=true&quality=90&fit=cover&width=120&height=120"

export async function fetchUserData (state)
{
    const url = makeURL(state)
    const result = {
        data: null,
        totalPages: 0,
        totalCount: 0
    }

    const response = await fetch(url);
    const data = await response.json();

    result.data = data.data?.map((u) => (
        {
            src: u.userpic ? createAssetUrl(u.userpic) + imageParams : null,
            username: u.username,
            available: Array.isArray(u.related) ? u.related[0]?.hire?.available ?? false : false,
            date_created: new Date(u.date_created).toDateString(),
            location: locationCityCountry(u.location_city, u.location_country)
        }
    ))

    if (data.meta)
    {
        result.totalCount = data.meta.total_count ?? data.meta.filter_count ?? state.totalCount ?? 0;
    }

    result.totalPages = Math.max(1, Math.ceil(state.totalCount / state.pageSize));

    return result;
}

function makeURL(state)
{
    const filter = state.filter ? `filter[username][_contains]=${state.filter}` : null

    const pages = state.pageSize ? `limit=${state.pageSize}&page=${state.currentPage}` : null;
    const count = state.currentPage === 1 ? (filter ? "meta=filter_count" : "meta=total_count") : "";

    let sort = "";

    console.log (state.sort)

    if (state.sort?.order)
    {
        const dir = state.sort.order != "descend" ? "-" : "";
        const key = state.sort.columnKey == "location" ? "location_country,location_city" : state.sort.columnKey;
        sort = 'sort='+dir+key;
    }
    else
    {
        sort = DEFAULT_SORT;
    }

    const params = [FIELDS, sort, filter, pages, count].filter(Boolean);
    const paramsString = params.join("&");

    const url = `${Constants.GET_USERS}?${paramsString}`

    console.log (url);

    return url;
}