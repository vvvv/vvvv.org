import Constants from './constants'
import axios from 'axios'
import { getAccessToken } from './keycloak-helper'
import Showdown from 'showdown'
import { countries } from './countries'
import router from './router'

const converter = new Showdown.Converter();

export const showUserProfile = (username, event) => {
    router.push({name: 'User Profile', params: { username: username }});
    if (event) event.preventDefault();
}

export const showBusinessProfile = (name, event) => {
    router.push({name: 'Business Profile', params: { name: name }});
    if (event) event.preventDefault();
}

export const stripPrefix = (url, prefix) => {
  if (!url) return '';
  const escaped = prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`^(https?:\\/\\/)?${escaped}`, 'i');
  return url.replace(regex, '');
}

export const stripBeforeLastSlash = (url) => {
  return url.replace(/^.*\//, '');
};

export const ensurePrefix = (url, prefix) => {
  if (!url) return '';
  if (!prefix) return url;

  const escaped = prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // Remove any existing protocol and prefix
  const regex = new RegExp(`^(https?:\\/\\/)?${escaped}`, 'i');
  const stripped = url.replace(regex, '');
  return `https://${prefix}${stripped}`;
}

export const stripHttp = (value) => {
  return value.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

export function ensureHttps(url) {
    return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

export const getURL = (value) => {

  if (!value) return { text: '' };
  
  if (/^https?:\/\//i.test(value)) {
    return { 
      text: stripHttp(value), 
      url: value 
    }
  }
  return {
    text: value
  }
}

export const toHtml = d => converter.makeHtml(d)
export const toMd = d => converter.makeMarkdown(d)

export const isEmpty = (d) =>{
    return (d !== null && d !== '' && d !== 'undefined') ? d : "---"
}

// export const removeEmpty = obj => Object.entries(obj).reduce((a, [k, v]) => (v == null || v == "undefined" ? a : (a[k] = v, a)), {});
export const toJson = obj => obj && JSON.stringify(obj)
export const clone = obj => obj && JSON.parse(toJson(obj))

export const replaceEmpty = obj => Object.entries(obj).map((p)=>(p !== "undefined" ? p : "---"))

export const removeProps = (obj, props) => props.forEach(prop => delete obj[prop])

export const createAssetUrl = id => id && Constants.ASSETS + id

export const post = async (url, payload) =>{
  try{
    const token = await getAccessToken()
    const response = await fetch(url, {
      headers: { 
        "Content-Type": "application/json",
        'Authorization': token
      },
      method: "POST",
      body: JSON.stringify(payload)
    })
  
    const json = await response.json()
  
    if (json.error)
    {
        throw new Error (data.response.error)
    }
    
    return json
  }
  catch(error) {
    throw new Error (error)
  }
}

export const removeFile = async (id) =>{
  const token = await getAccessToken()
  const formData = new FormData();
  formData.append('id', id)

  return axios.request({
    url: Constants.FILE,
    method: 'DELETE',
    headers: {'Authorization ': token},
    data: formData
  }).then(()=> true)
  .catch((error)=>{
    console.log (error)
    return false
  })
}

export const getAuthHeader = async ()=>{
  const token = await getAccessToken()
  return {'Authorization ': token}
}

export const uploadFile = async (file, folder) => {
  const formData = new FormData();
  formData.append('folder', folder)
  formData.append('file', file.file);

  const token = await getAccessToken()
  const request = {
    url: Constants.FILE,
    method: 'POST',
    headers: {'Authorization ': token},
    data: formData,
    onUploadProgress: (progressEvent) => {
      file.percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    }
  }

  try{
    const response = await axios.request(request)
    file.status = 'finished'
    file.percentage = 100
    file.url = Constants.ASSETS + response.data.tmp
    return response.data.tmp
  }
  catch (err) {
    console.error('Error uploading file:', err);
    file.status = 'error'
    file.percentage = 0
    return null
  }
}

export const makeFields = (f, count) => {

  var fields = (f !== null) ? clone(f) : []
  
  const missingFields = count - fields.length
  if (missingFields > 0)
  {
    for (var i=0; i<missingFields; i++)
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


export function getCountry(value) {
    const country = countries.find(country => country.value === value)
    return country ? country.label : null
}

export const getProperties = (obj, keys) => {
    var result = {}
    keys.forEach(key => {
          if (key in obj) {
              result[key] = obj[key];
          }
      });
    return result
}

export const stripBeforeLastAt = (url) => {
  return url.replace(/^.*@/, '@');
}

export function addHttp(l)
{
    return (l.startsWith ("http://") || l.startsWith("https://")) ? l : "https://"+l
}

export function removeHttp(l)
{
    if (l.startsWith ("http://"))
        return l.substr(7)
    if (l.startsWith("https://"))
        return l.substr(8)
}
