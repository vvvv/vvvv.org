import { computed } from "vue";

export function useNominatimQuery( props ){

    return computed(()=>{

        if (!props.address.country || props.address.country === '')
        {
            return null;
        }

        const params = new URLSearchParams();

        Object.entries(props.address).forEach(([key, value])=>{
            if (value && value !== "")
            {
                params.append(key, value)      
            }
        })

        params.append("format", "geojson");

        return params.toString();
    });
}