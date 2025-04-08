import { createDirectus, rest, readItem, createItem, updateItem, deleteItems, readItems, staticToken } from '@directus/sdk';
import 'dotenv/config'
import { getUserID, getItemID } from "./helper.js"

const client = createDirectus(process.env.DIRECTUSURL)
.with(staticToken(process.env.DIRECTUS_UPDATER_TOKEN))
.with(rest());

const editBasics = async (req, res, JWT) => {
    
    try{   
        const mail = JWT.verify(req.get('Authorization'))
        
        const user = req.body.user

        if (mail != user.email) throw ("Emails doesn't match")

        delete user.id
        delete user.status
        delete user.username
        delete user.email

        var userID = await getUserID(mail, client)
        
        var social = req.body.social
        delete social.id

        if (userID.length > 0)
        {   
            const id = userID[0].id
            await client.request(updateItem ('User', id, user))

            const socialNetworksID = await getItemID ('Social', id, client)
            await client.request(updateItem ('Social', socialNetworksID, social))
        }
        // else
        // {
        //     const result = await client.request(createItem ('User', user))
        //     await client.request(createItem ('Social', user))
        //     await client.request(createItem ('User', user))

        //     userID = result.id
        //     social.user_id = userID
        //     await client.request(createItem ('SocialNetworks2', social))
        // }

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
        const hire = req.body

        const user = await getUserID(mail, client)
        const userID = user[0].id
        console.log (userID)

        const userData = await client.request(readItem ('User', userID, {
            fields: [
                'related.hire.id'
            ]
        }))

        const hireID = userData.related[0].hire.id

        await client.request(updateItem ('Hire', hireID, hire))
            return res.status(200).send({
            result: "Updated"
        });
    }
    catch (error){ 
        console.log (error);
        return res.status(400).send({
            error: "Can't update Hire"
        });
    }

                // if (req.body.hasOwnProperty ('workFor'))
            // {
            //     for (var company of req.body.workFor)
            //         {
            //             const item = await client.request(readItems ('User_Company', {
            //                     fields: [
            //                         'id'
            //                     ],
            //                     filter: {
            //                         _and: [
            //                             {
            //                                 uuid: {
            //                                     _eq: company.uuid,
            //                                 }
            //                             },
            //                             {
            //                                 user: {
            //                                     _eq: userID
            //                                 }
            //                             }
            //                         ]
            //                     }
            //             }));
        
            //             await client.request(updateItem ('User_Company', userID, 
            //                 {
            //                     status: company.status
            //                 }
            //             ))
            //         } 
            // }

}

export { editBasics, editCompany, editHire }