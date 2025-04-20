import Constants from '../../constants'

const SORT = "sort=username"
const FIELDS =`fields[]=username,userpic,related.hire.available,date_created`

export async function fetchUserData ( loading, tableData, state)
{
        loading.value = true

        const url = makeURL(state)

        try{
            const response = await fetch(url);
            const data = await response.json();
    
            tableData.value = data.data.map((u) => (
                {
                    src: u.userpic ? userpicLink(u.userpic) : null,
                    username: u.username,
                    available: Array.isArray(u.related[0]) ? u.realted[0]?.hire?.available ?? false : false,
                    date_created: new Date(u.date_created).toDateString()
                }
            ))
    
            if (data?.meta)
            {
                state.value.totalCount = data.meta.total_count ?? data.meta.filter_count ?? state.value.totalCount;    
            }
    
            state.value.totalPages = Math.ceil(state.value.totalCount / state.value.pageLimit) ?? state.value.totalPages
        }
        catch(error)
        {
            console.error(error)
            state.value.error = "Failed to fetch user data";
        }
        finally{
            loading.value = false
        }
}

function makeURL( state )
{
    const filter = state.value.filter ? `filter[username][_contains]=${state.value.filter}` : null

    const pages = state.value.pageLimit ? `limit=${state.value.pageLimit}&page=${state.value.currentPage}` : null;
    const count = state.value.currentPage === 1 ? (filter ? "meta=filter_count" : "meta=total_count") : "";

    const params = [FIELDS, SORT, filter, pages, count].filter(Boolean);
    const paramsString = params.join("&");

    return `${Constants.GET_USERS}?${paramsString}`;
}