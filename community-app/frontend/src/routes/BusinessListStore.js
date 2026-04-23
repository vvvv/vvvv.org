import { defineStore } from 'pinia'
import { storeObject } from "./ListStoreHelper.js";

const store = Object.create(storeObject('business'));

export const useBusinessListStore = defineStore ('businessList', store);