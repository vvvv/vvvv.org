import { defineStore } from 'pinia'
import { storeObject } from "./ListStoreHelper.js";

const store = Object.create(storeObject('edu'));

export const useEduListStore = defineStore ('eduList', store)