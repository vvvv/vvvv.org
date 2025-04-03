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

export async function submitForm(form, data, url, keycloak)
{
    form.messageBag.clear()
    form.cancelToken = form.$vueform.services.axios.CancelToken.source()
  
    try{
        const token = await getAccessToken()
        
        return await form.$vueform.services.axios.post(url,
            data,
            {
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                        },
                cancelToken: form.cancelToken.token,
            }
            )
    }
    catch (err)
    {
        console.log (err)
    }
}

export function errorHandler(error, details, form$) 
{
    switch (details.type) {
      // Error occured while preparing elements (no submit happened)
      case 'prepare':
        console.log(error) // Error object
  
        form$.messageBag.append('Could not prepare form')
        break
  
      // Error occured because response status is outside of 2xx
      case 'submit':
        console.log(error) // AxiosError object
        console.log(error.response) // axios response
        console.log(error.response.status) // HTTP status code
        console.log(error.response.data) // response data
  
        form$.messageBag.append('Some error from the backend')
        break
  
      // Request cancelled (no response object)
      case 'cancel':
        console.log(error) // Error object
  
        form$.messageBag.append('Request cancelled')
        break
  
      // Some other errors happened (no response object)
      case 'other':
        console.log(error) // Error object
  
        form$.messageBag.append('Couldn\'t submit form')
        break
    }
}

export async function post(url, payload, token)
{
    var body = JSON.stringify({
            Token: token,
            Payload: payload
        })

    return fetch(url, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: body
    })
    .then((response) => response.json())
    .then((data) => {
        if (Object.hasOwn(data.response, 'error'))
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

export async function uploadFile(file, tempFile)
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

  axios.request(request)
  .then(response => {
    file.status = 'finished'
    file.percentage = 100
    tempFile.value = response.data.tmp
    file.url = Constants.ASSETS + tempFile.value
    console.log (tempFile.value)
  })
  .catch(error => {
    console.error('Error uploading file:', error);
    tempFile.value = null
    file.status = 'error'
    file.percentage = 0
  });
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