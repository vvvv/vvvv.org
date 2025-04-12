import { deleteFile } from '@directus/sdk';

const removeFile = async(req, res, JWT, client) => {

    try{
        JWT.verify(req.get('Authorization'))
    }
    catch (error){
        return res.status(400).send("Can't upload file");
    }

    try{
       await client.request(deleteFile(req.body.id))
    }
    catch (error)
    {
        return res.status(400).send("Can't delete file");
    } 

    return res.status(200).send("Deleted")
}

export default removeFile