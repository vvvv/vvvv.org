import Constants from './constants'
import axios from 'axios';
import { getAccessToken } from './keycloak'

export function isEmpty(d)
{
    return (d !== null && d !== '' && d !== 'undefined') ? d : "---"
}

export const removeEmpty = obj => Object.entries(obj).reduce((a, [k, v]) => (v == null || v == "undefined" ? a : (a[k] = v, a)), {});
export const toJson = obj => JSON.stringify(removeEmpty(obj))
export const clone = obj => JSON.parse(toJson(obj))

export const replaceEmpty = obj => Object.entries(obj).map((p)=>(p !== "undefined" ? p : "---"))

export const removeProps = (obj, props) => props.forEach(prop => delete obj[prop])

export async function post(url, payload)
{
  const token = await getAccessToken()

  return fetch(url, {
        headers: { 
          "Content-Type": "application/json",
          'Authorization': token
        },
        method: "POST",
        body: JSON.stringify(payload)
    })
    .then((response) => response.json())
    .then((data) => {
        if (Object.hasOwn(data, 'error'))
            {
                throw new Error (data.response.error)
            }
        return data
    })
}

export async function removeFile(id)
{
  const token = await getAccessToken()
  const formData = new FormData();
  formData.append('id', id)

  axios.request({
    url: Constants.FILE_REMOVE,
    method: 'POST',
    headers: {'Authorization ': token},
    data: formData
  })
}

export async function getAuthHeader()
{
  const token = await getAccessToken()
  return {'Authorization ': token}
}

export function createAssetUrl(id)
{
  return Constants.ASSETS + id
}

export async function uploadFile(file)
{
  const formData = new FormData();
  formData.append('folder', 'dfd274cc-651b-4bef-89c9-1fe9ed070a47')
  formData.append('file', file.file);

  const token = await getAccessToken()
  const request = {
    url: Constants.FILE_UPLOAD,
    method: 'POST',
    headers: {'Authorization ': token},
    data: formData,
    onUploadProgress: (progressEvent) => {
      file.percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    }
  }

  const result = axios.request(request)
  .then(response => {
    file.status = 'finished'
    file.percentage = 100
    file.url = Constants.ASSETS + response.data.tmp
    return response.data.tmp
  })
  .catch(error => {
    console.error('Error uploading file:', error);
    file.status = 'error'
    file.percentage = 0
    return null
  })

  return result
}

export const makeFields = (f, count) => {

  console.log (f)

  var fields = (f !== null) ? clone(f) : []
  
  console.log (fields)
  
  const missingFields = count - fields.length
  if (missingFields > 0)
  {
    for (var i=0; i<=missingFields; i++)
    {
      fields.push ({key:"", value:""}) 
    }
  }

  if (missingFields < 0)
  {
    fields = fields.slice(0,count)
  }

  return fields
}

// export async function uploadTempFile(value, el$, keycloak)
// {
//   const token = await getAccessToken()
//   const response = await el$.$vueform.services.axios.request({
//     url: Constants.FILE_UPLOAD,
//     method: 'POST',
//     headers: {'Authorization ': token},
//     data: el$.form$.convertFormData({
//       file: value,
//     }),
//     onUploadProgress: (e) => {
//       el$.progress = Math.round((e.loaded * 100) / e.total)
//     },
//     cancelToken: el$.$vueform.services.axios.CancelToken.source().token,
//   }) // errors are handled automatically

//   return response.data
// }