import Constants from '../constants'
import { createAssetUrl, locationCityCountry } from '../utils'

const DEFAULT_SORT = "sort=username"
const FIELDS =`fields[]=username,userpic,related.hire.available,date_created,last_modified,location_city,location_country`

const imageParams = "?withoutEnlargement=true&quality=90&fit=cover&width=120&height=120"

export async function fetchUserData (state)
{
    const url = makeURL(state)
    const result = {
        data: null,
        totalPages: 0,
        totalCount: 0,
        currentPage: 1,
    }

    const response = await fetch(url);
    const data = await response.json();

    const dateOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
    };

    result.data = data.data?.map((u) => (
        {
            src: u.userpic ? createAssetUrl(u.userpic) + imageParams : null,
            username: u.username,
            available: Array.isArray(u.related) ? u.related[0]?.hire?.available ?? false : false,
            date_created: new Date(u.date_created).toLocaleString("en-US", dateOptions),
            location: locationCityCountry(u.location_city, u.location_country),
            last_modified: u.last_modified ? new Date(u.last_modified).toLocaleString("en-US", dateOptions) : "",
        }
    ))

    result.totalCount = data.meta?.total_count ?? data.meta?.filter_count ?? state.totalCount ?? 0;
    result.totalPages = Math.max(1, Math.ceil(result.totalCount / state.pageSize));

    return result;
}

function makeURL(state)
{

    const filter = state.filter ? `filter[username][_contains]=${state.filter}` : null

    const pages = state.pageSize ? `limit=${state.pageSize}&page=${state.currentPage}` : null;
    const count = filter ? "meta=filter_count" : "meta=total_count";

    let sort = "";

    if (state.sort?.order)
    {
        const dir = state.sort.order != "descend" ? "-" : "";

        let key;

        if (state.sort.columnKey == "location")
        {
            key = `${dir}location_country,${dir}location_city`;
        }
        else
        {
            key = dir + state.sort.columnKey;
        }

        if (state.sort.columnKey == "last_modified")
        {
            key = `${dir}last_modified,${dir}date_created`;
        }
        
        sort = 'sort='+key;
    }
    else
    {
        sort = DEFAULT_SORT;
    }

    const params = [FIELDS, sort, filter, pages, count].filter(Boolean);
    const paramsString = params.join("&");

    const url = `${Constants.GET_USERS}?${paramsString}`

    return url;
}