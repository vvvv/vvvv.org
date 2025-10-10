import { computed } from "vue";

export function useNominatimQuery( address ){

    return computed(()=>{

        if (!address.value.country || address.value.country === '')
        {
            return null;
        }

        const params = new URLSearchParams();

        Object.entries(address.value).forEach(([key, value])=>{
            if (value && value !== "")
            {
                params.append(key, value)      
            }
        })

        params.append("format", "geojson");

        return params.toString();
    });
}