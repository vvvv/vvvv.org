import { readItems } from '@directus/sdk';
import 'dotenv/config'

export const getItemID = async (collection, userID, client) => {
	var id = await client.request(readItems (collection, {
		fields: [
			'id'
		],
		filter: {
			user_id: {
				_eq: userID
			}
		}
	}));

	if ( id.length > 0)
	{
		return id[0].id;
	}
	{
		throw ("Can't find entry for this users")
	}
}

export const clone = obj => JSON.parse(JSON.stringify(obj))

export const getUserID = async (mail, client) => {
	var result = client.request(readItems ('User', {
			fields: [
				"id"
			],
			filter: {
				email: {
					_eq: mail,
				}
			}
		}))
	return result;
}

export const userInfo = async (req, res, JWT, client) =>
{   
	var mail = ''

	try {      
		mail = JWT.verify(req.get('Authorization'))
	}
	catch (err) {
		console.log (err)
		return res.status(400).send({message: "Login failed", code: 0})
	}

	try {
		
		var user = await client.request(readItems ('User', {
			fields:['*.*.*'],
			filter: {
				email: {
					_eq: mail,
				}
			}
		}))
	
		const companies = await client.request(readItems ('Company', {
			fields:['*, social.*'],
			filter: {
				owner: {
					email: {
						_eq: mail,
					}
				}
			}
		}))
	
		user[0].companies = companies
	
		return res.status(200).send(user);
	}
	catch (err) {
		console.log (err)
		return res.status(400).send({message: "Profile doesn't exist", code: 1})
	}

}

export const constants = async (res, client) =>
{
	try {
		const hireOptions = await client.request(readItems ('AvailableFor_Options'));

		const hireOptionsMapped = hireOptions.map( o => {
			return {
				value: o.id,
				label: o.value
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