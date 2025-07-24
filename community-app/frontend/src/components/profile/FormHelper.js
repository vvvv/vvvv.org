export const transformer = {
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