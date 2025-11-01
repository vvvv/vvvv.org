import { ref, watch, toRef } from 'vue'
import { isEqual, cloneDeep } from 'lodash-es'

export function useFormHelper(_form)
{
    const form = _form;

    let prevFormValue = cloneDeep(form.value);
    let originalData = cloneDeep(form.value);

    const changed = ref(false);

    watch( form, (newVal) => {

            if (prevFormValue !== null)
            {
    
                if (!isEqual(newVal, prevFormValue)) 
                {
                    changed.value = true;
                    prevFormValue = cloneDeep(newVal);
                }
            }
            else {
                changed.value = false;
            }

        },
        { deep: true, immediate: false }
    )

    function revert()
    {
        form.value = cloneDeep(originalData);
        prevFormValue = cloneDeep(originalData);
        changed.value = false;
    }

    function setNewData(data)
    {
        prevFormValue = cloneDeep(data);
        originalData = cloneDeep(data);
        changed.value = false;
    }

    const transformer = {
        map:{
            toLocation: (geojson)=>{
                return {
                    lat: geojson.coordinates[1],
                    long: geojson.coordinates[0]
                }
            }
        },
        people:{
            toForm: (persons)=>{
            return persons.map(person=>({
                ...person,
                options:[person.person]
                }
            ))
            },
            toPayload: (persons)=>{
            const filtered = persons.filter(p => p.person.value && p.person.value !== "");
            const result = filtered.map(person=>{
                const result = { 
                User_Role_id: {
                    user_id: person.person.value,
                    role: person.role,
                } 
                }
                if (person.id) 
                result.User_Role_id.id = person.id;
                return result;
            })
            return result;
            }
        }
    }

    return { revert, changed, prevFormValue, setNewData, transformer }
}