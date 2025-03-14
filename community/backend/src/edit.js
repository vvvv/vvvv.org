import { createDirectus, rest, createItem, updateItem, deleteItems, readItems, staticToken } from '@directus/sdk';
import 'dotenv/config'
import { getUserID, getItemID } from "./helper.js"

const client = createDirectus('http://localhost:8055')
.with(staticToken(process.env.DIRECTUSTOKEN))
.with(rest());

const editBasics = async (req, res, JWT) => {
    
    try{   
        const mail = JWT.verify(req.get('Authorization'))
        var user = await getUserID(mail)

        var userID = null
        var basics = req.body.basics
        var social = req.body.social
        var userpic = req.body.basics.userpic
    
        if (user.length > 0)
        {        
            userID = user[0].id 
            await client.request(updateItem ('User', userID, basics))

            var socialNetworksID = await getItemID ('SocialNetworks2', userID)

            await client.request(updateItem ('SocialNetworks2', socialNetworksID, social))
        }
        else
        {
            var result = await client.request(createItem ('User', basics))
            userID = result.id
            social.user_id = userID
            await client.request(createItem ('SocialNetworks2', social))
        }

        if (userID != null && userpic)
        {
            var userImage = {
                image: userpic,
                user_id: userID
            }
        
            await client.request(createItem ('User_Image', userImage))
        }

        return res.status(200).send({
            result: "Updated"
        });
    }
    catch (error){ 
        console.log (error);
        return res.status(400).send({
            error: "Can't update Basics"
        });
    }

}

const editCompany = async (req, res, JWT) =>{

    var user = null
    var company = null
    
    try
    {
        const mail = JWT.verify(req.get('Authorization'))
        user = await getUserID(mail)
    }
    catch (error) { 
        console.log (error);
        return res.status(400).send({
            error: "Can't get user"
        });
    }
    
    if (user.length > 0)
    {
        try{
            company = await client.request(readItems ('User_Company', {
                fields: [
                    'company.id'
                ],
                filter: {
                    _and: [
                        {
                            company: {
                                    uuid: {
                                    _eq: req.body.company.uuid,
                                }
                            }
                        },
                        {
                            user: {
                                _eq: user[0].id
                            }
                        },
                        {
                            role: {
                                _eq: 1
                            }
                        }
                    ]
                }
            }));
        }
        catch (error) { 
            console.log (error);
            return res.status(400).send({
                error: "Can't get companies"
            });
        }

        if (company.length > 0 )
        {
            try{
                await client.request(updateItem ('Company', company[0].company.id, {
                    logo: req.body.company.logo,
                    description: req.body.company.description,
                    website: req.body.company.website,
                    fields: req.body.company.fields
                }))
    
                if (req.body.company.hasOwnProperty('employees'))
                {
                    for (const item of req.body.company.employees)
                        {
                            if (item.role > 1)
                            {
                                const user = await getUserID(item.email)
                            
                                if (user.length > 0)
                                {
                                    const employee = {
                                        id: user[0].id,
                                        uuid: item.uuid,
                                        role: item.role,
                                        action: item.action
                                    }
            
                                    await editEmployee ( employee, company[0].company.id )
                                } 
                            }
                        }
                }
    
                return res.status(200).send({
                    result: "Updated"
                });
            }
            catch (error) { 
                console.log (error);
                return res.status(400).send({
                    error: "Can't update Company"
                });
            }
        }
        else
        {            
            try{
                const companyID = await client.request(createItem ('Company', {
                    name: req.body.company.name,
                    logo: req.body.company.logo,
                    description: req.body.company.description,
                    website: req.body.company.website,
                    fields: req.body.company.fields
                }))

                await client.request(createItem ('User_Company', {
                        user: user[0].id,
                        role: 1,
                        company: companyID.id
                    }))
            }
            catch (error) { 
                console.log (error);
                return res.status(400).send({
                    error: "Can't create Company"
                });
            }

            return res.status(200).send({
                result: "Updated"
            });
        }
    }

}

const editEmployee = async ( employee, companyId )=> {

    switch (employee.action)
    {
        case "remove":
            await client.request(deleteItems ('User_Company', {
                filter: {
                    _and: [
                        {
                            uuid: {
                                _eq: employee.uuid
                            }
                        },
                        {
                            company: {
                                _eq: companyId
                            }
                        }
                    ]
                }
            }))
            break;
        
        case "add":
            await client.request(createItem ('User_Company', {
                user: employee.id,
                company: companyId,
                role: employee.role,
            }))
            break;
        default:
            return;
    }

}

const editHire = async (req, res, JWT) =>{
    try{       
        const mail = JWT.verify(req.get('Authorization'))
        const user = await getUserID(mail)
    
        if (user.length > 0)
        {
            const userID = user[0].id
            
            const hire = {
                available: req.body.available,
                types: req.body.types
            }

            const hireID = await getItemID ('Hire', userID)

            await client.request(updateItem ('Hire', hireID, hire))
            
            if (req.body.hasOwnProperty ('workFor'))
            {
                for (var company of req.body.workFor)
                    {
                        const item = await client.request(readItems ('User_Company', {
                                fields: [
                                    'id'
                                ],
                                filter: {
                                    _and: [
                                        {
                                            uuid: {
                                                _eq: company.uuid,
                                            }
                                        },
                                        {
                                            user: {
                                                _eq: userID
                                            }
                                        }
                                    ]
                                }
                        }));
        
                        await client.request(updateItem ('User_Company', userID, 
                            {
                                status: company.status
                            }
                        ))
                    } 
            }

            return res.status(200).send({
                result: "Updated"
            });
        }
    }
    catch (error){ 
        console.log (error);
        return res.status(400).send({
            error: "Can't update Hire"
        });
    }
}

export { editBasics, editCompany, editHire }