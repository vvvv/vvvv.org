import { createDirectus, rest, readItem, readItems, readField, staticToken } from '@directus/sdk';
import { getUserInfo } from "./helper.js"

const client = createDirectus(process.env.DIRECTUSURL)
.with(staticToken(process.env.DIRECTUSTOKEN))
.with(rest());

const userInfo = async (req, res, JWT) =>
{   
    try{
        
        const mail = JWT.verify(req.get('Authorization'))
        try{
            const info = await getUserInfo(mail)
            return res.status(200).send(info);
        }
        catch (err)
        {
            console.log (err)
            return res.status(400).send({message: "Profile doesn't exist", code: 1})
        }
    }
    catch (err)
    {
        return res.status(400).send({message: "Login failed", code: 0})
    }
}

const constants = async (res) =>
{
    try {
		const hireOptions = await client.request(readItems ('AvailableFor_Options'));

		const hireOptionsMapped = hireOptions.map( o => {
			return {
				value: o.id,
				label: o.option
			}
		})

        const info = {
            hireOptions: hireOptionsMapped
		}

		res.status(200).send(info);	
	}
	catch (message) {
		res.status(400).send({message: "Can't get constants", code: 2})
	}
}

export { userInfo, constants }