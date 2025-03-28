import Constants from './constants'

export function isEmpty(d)
{
    return (d !== null && d !== '' && d !== 'undefined') ? d : "---"
}

export const removeEmpty = obj => Object.entries(obj).reduce((a, [k, v]) => (v == null || v == "undefined" ? a : (a[k] = v, a)), {});
export const toJson = obj => JSON.stringify(removeEmpty(obj))
export const clone = obj => JSON.parse(toJson(obj))

export const replaceEmpty = obj => Object.entries(obj).map((p)=>(p !== "undefined" ? p : "---"))

export const removeProps = (obj, props) => props.forEach(prop => delete obj[prop])

export function cleanup(obj)
{
    const removeFields = ['date_updated', 'date_created']
    removeProps(obj, removeFields)
    return obj
}

export async function submitForm(form, data, url, keycloak)
{
    form.messageBag.clear()
    form.cancelToken = form.$vueform.services.axios.CancelToken.source()
  
    try{
        const token = await keycloak.getAccessToken()
        
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

export async function removeFile(value, el$, keycloak)
{
    const token = await keycloak.getAccessToken()
    await el$.$vueform.services.axios.request({
      url: Constants.FILE_REMOVE,
      method: 'POST',
      headers: {'Authorization ': token},
      data: el$.form$.convertFormData({
        id: value.tmp,
      }),
    })
}

export async function uploadTempFile(value, el$, keycloak)
{
  const token = await keycloak.getAccessToken()
  const response = await el$.$vueform.services.axios.request({
    url: Constants.FILE_UPLOAD,
    method: 'POST',
    headers: {'Authorization ': token},
    data: el$.form$.convertFormData({
      file: value,
    }),
    onUploadProgress: (e) => {
      el$.progress = Math.round((e.loaded * 100) / e.total)
    },
    cancelToken: el$.$vueform.services.axios.CancelToken.source().token,
  }) // errors are handled automatically

  return response.data
}