import { defineStore } from 'pinia'
import { storeObject } from "./ListStoreHelper.js";

const store = Object.create(storeObject('people'));

export const usePeopleStore = defineStore ('peopleList', store);