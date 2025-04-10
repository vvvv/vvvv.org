import { createDirectus, rest, readItem, readItems, readField, staticToken } from '@directus/sdk';
import 'dotenv/config'

const client = createDirectus(process.env.DIRECTUSURL)
.with(staticToken(process.env.DIRECTUSTOKEN))
.with(rest());

async function getItemID (collection, userID, client)
{
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

async function getAvatar(user_id)
{
	var image = await client.request(readItems ('User_Image', {
		fields: [
			'image'
		],
		filter: {
			user_id: {
				_eq: user_id,
			}
		},
	}));

	return getImageURL(image[0].image);
}

function getImageURL(id)
{
	return `${process.env.IMAGEURL}${id}`;
}

async function getUserInfo(mail)
{
	var user = await client.request(readItems ('User', {
		fields:['*.*.*'],
		filter: {
			email: {
				_eq: mail,
			}
		}
	}))

	const companies = await client.request(readItems ('Company', {
		filter: {
			owner: {
				email: {
					_eq: mail,
				}
			}
		}
	}))

	user[0].companies = companies

	return user
}

function clone(o)
{
	return JSON.parse(JSON.stringify(o));
}

// async function getHire (user_id)
// {
// 	var hire = await client.request(readItems ('Hire', {
// 		fields: [
// 			'types.Hire_Types_id.*',
// 			'available'
// 		],
// 		filter: {
// 			user_id: {
// 				_eq: user_id,
// 			}
// 		},
// 	}));

// 	return hire.map((e) => ({
// 		available: e.available,
// 		types: prepareTypes(e.types)
// 	}));
// }

function prepareTypes(input)
{
	let output = []
	
	input.forEach((element)=>{
		var item = 
		{
			value: element.Hire_Types_id.id,
			label: element.Hire_Types_id.type
		}
		output.push(item);
	})

	return output;
}

async function getCompanies (user_id)
{
	var companies = await client.request(readItems ('User_Company', {
		fields: [
			'company.id',
			'company.name', 
			'company.logo',
			'company.description', 
			'company.website',
			'company.status',
			'company.uuid',
			'company.fields',
			'status'
		],
		filter: {
			_and:[
				{
					user: {
						_eq: user_id,
					}
				},
				{
					role: {
						id: {
							_eq: 1
						}
					}
				}
			]
		},
	}))

	return companies.map((e, index)=>({
		name: e.company.name,
		logo: e.company.logo,
		description: e.company.description,
		website: e.company.website,
		fields: e.company.fields,
		status: e.company.status,
		uuid: e.company.uuid
	}));
}

async function getInstitutions (user_id)
{
	var result = await client.request(readItems ('User_EduInstitution', {
		fields: [
			'institution.name', 'role.role'
		],
		filter: {
			user: {
				_eq: user_id,
			}
		},
	}));

	return result.map((data)=>({
		name: data.institution.name,
		role: data.role.role
	}));
}

async function getUserID (mail, client)
{
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

async function getSocialNetworks (user_id)
{
	var result = await client.request(readItems ('SocialNetworks2', {
		fields: [
			'nuget', 'github', 'fields'
		],
		filter: {
			user_id: {
				_eq: user_id,
			}
		},
	}));

	return result[0];
}

export { getUserID, getUserInfo, getItemID, clone }

///WORKS FOR
// var workFor = await client.request(readItems ('User_Company', {
// 	fields: [
// 		'company.name', 'role.id', 'status', 'uuid'
// 	],
// 	filter: {
// 		_and: [
// 			{
// 				user: {
// 					_eq: user_id,
// 				}
// 			},
// 			{
// 				role: {
// 					role:{
// 						_neq: "Owner"
// 					}
// 				}
// 			}
// 		]
// 	},
// }))

// workFor = workFor.map((e)=>{
// 	return {
// 		status: e.status,
// 		company: e.company.name,
// 		role: e.role.id,
// 		uuid: e.uuid
// 	}
// })



// var employees = []

// for (const company of companies)
// {
// 	var e = await client.request(readItems ('User_Company', {
// 		fields: [
// 			'user.email', 'role.id', 'status', 'uuid'
// 		],
// 		filter: {
// 			_and:[
// 				{				
// 					company: {
// 						id: {
// 							_eq: company.id
// 						}
// 					}
// 				},
// 				{
// 					role: {
// 						_neq: 1
// 					}
// 				}	
// 			]
// 		}
// 	}))

// 	employees.push (e.map((item) => {
// 		return{
// 			user: item.user.email,
// 			role: item.role.id,
// 			status: item.status,
// 			uuid: item.uuid
// 		}
// 	}))
// }