import { ref, computed } from 'vue'

export function useLocationHelper(form){

    const location = ref(null);

    const address = computed(()=>{

        if (!form && !form.value) return {};

        return{
            street: form.value[0].location_street,
            city: form.value[0].location_city,
            postalcode: form.value[0].location_postalcode,
            country: form.value[0].location_country,
        }
    })
    
    const handleLocation = (loc)=>{ 
        if (loc)
        {
            location.value = {
                lat: loc.geometry.coordinates[0],
                long: loc.geometry.coordinates[1]
            }      
        }
    }

    return { location, address, handleLocation }
}