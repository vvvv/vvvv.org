import Constants from '../constants'
import { createAssetUrl } from '../utils'

const SORT = "sort=username"
const FIELDS =`fields[]=username,userpic,related.hire.available,date_created`

const imageParams = "?withoutEnlargement=true&quality=90&fit=cover&width=120&height=120"

export async function fetchUserData (tableData, state)
{

        const url = makeURL(state)

        try{
            const response = await fetch(url);
            const data = await response.json();
    
            tableData.value = data.data.map((u) => (
                {
                    src: u.userpic ? createAssetUrl(u.userpic) + imageParams : null,
                    username: u.username,
                    available: Array.isArray(u.related) ? u.related[0]?.hire?.available ?? false : false,
                    date_created: new Date(u.date_created).toDateString()
                }
            ))
    
            if (data?.meta)
            {
                state.value.totalCount = data.meta.total_count ?? data.meta.filter_count ?? state.value.totalCount ?? 0;
            }
    
            state.value.totalPages = Math.max(1, Math.ceil(state.value.totalCount / state.value.pageSize));
        }
        catch(error)
        {
            console.error(error)
            state.value.error = "Failed to fetch user data";
        }
}

function makeURL( state )
{
    const filter = state.value.filter ? `filter[username][_contains]=${state.value.filter}` : null

    const pages = state.value.pageSize ? `limit=${state.value.pageSize}&page=${state.value.currentPage}` : null;
    const count = state.value.currentPage === 1 ? (filter ? "meta=filter_count" : "meta=total_count") : "";

    const params = [FIELDS, SORT, filter, pages, count].filter(Boolean);
    const paramsString = params.join("&");

    return `${Constants.GET_USERS}?${paramsString}`;
}