import { createDirectus, rest, readItem, createItem, updateItem, deleteItems, readItems, staticToken } from '@directus/sdk';
import 'dotenv/config'
import { getUserID, getItemID, clone } from "./helper.js"

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
        user = await getUserID(mail, client)
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
            company = await client.request(readItems ('Company', {
                fields: [
                    'id'
                ],
                filter: {
                    _and: [
                        {
                            name: {
                                _eq: req.body.name,
                            }
                        },
                        {
                            owner: {
                                _eq: user[0].id
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

        const data = clone (req.body)
        data.social.fields = data.social.fields.slice(0,4)
        if (data.logo == '')
            delete data.logo

        if (company.length > 0 )
        {
            try{
                delete data.owner
                delete data.name

                await client.request(updateItem ('Company', company[0].id, data))
    
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
            data.owner = user[0].id

            try{
                await client.request(createItem ('Company', data))
                
                return res.status(200).send({
                    result: "Created new Company"
                });
            }
            catch (error) { 
                console.log (error);
                return res.status(400).send({
                    error: "Can't create Company"
                });
            }
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