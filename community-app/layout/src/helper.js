import Showdown from 'showdown'
import { countries } from './countries'

const converter = new Showdown.Converter()

export const toHtml = d => converter.makeHtml(d)
export const toMd = d => converter.makeMarkdown(d)

export const toJson = obj => obj && JSON.stringify(obj)
export const clone = obj => obj && JSON.parse(toJson(obj))

export const createAssetUrl = id => id && `http://localhost:8058/assets/` + id

export function ensureHttps(url) {
    // Check if the URL starts with "http://" or "https://"
    if (/^https?:\/\//i.test(url)) {
        return url; // If it does, return the URL as is
    }
    // Otherwise, prepend "https://"
    return `https://${url}`;
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