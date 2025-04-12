import { createDirectus, rest, staticToken } from '@directus/sdk';
import { userInfo, constants } from './helper.js'
import { editBasics, editHire, editCompany } from './edit.js'
import uploadFile from './uploadFile.js'
import removeFile from './removeFile.js'
import jwt from './jwt.js'
import multer from 'multer'

import 'dotenv/config'
import express from 'express'
import rateLimit from 'express-rate-limit'
import cors from 'cors'

const app = express();

const JWT = new jwt();

// Limit access
const limiter = rateLimit({
    windowMs: 0.2 * 60 * 1000, // 1 minute
    max: 5 // limit each IP to X requests per windowMs
  });

const port = process.env.PORT;

const directusReader = createDirectus(process.env.DIRECTUSURL)
.with(staticToken(process.env.DIRECTUSTOKEN))
.with(rest());

const directusUpdater = createDirectus(process.env.DIRECTUSURL)
.with(staticToken(process.env.DIRECTUS_UPDATER_TOKEN))
.with(rest());

//app.use(limiter)
app.use(cors());

app.listen (port, function(){
    console.log ('directus-api is running on port: ', port);
})

// Getter Endpoints
app.options('/v1/userinfo', cors()) 
app.post ('/v1/userinfo', cors(), express.json(), async (req, res) => {
    await userInfo(req, res, JWT, directusReader);
});
 
app.options('/v1/constants', cors()) 
app.get ('/v1/constants', cors(), express.json(), async (req, res) => {
    await constants(res, directusReader)
});

// Edit Endpoints
app.options('/v1/edit/basics', cors())
app.post ('/v1/edit/basics', cors(), express.json(), async (req, res) => {
    await editBasics(req, res, JWT, directusUpdater)
});

app.options('/v1/edit/hire', cors())
app.post ('/v1/edit/hire', cors(), express.json(), async (req, res) => {
    await editHire(req, res, JWT, directusUpdater)
});

app.options('/v1/edit/company', cors())
app.post ('/v1/edit/company', cors(), express.json(), async (req, res) => {
    await editCompany(req, res, JWT, directusUpdater)
});

// File Endpoints
app.options('/v1/uploadFile', cors()) 
app.post ('/v1/uploadFile', cors(), async (req, res) => {
    await uploadFile(req, res, JWT, directusUpdater)
});

app.options('/v1/removeFile', cors()) 
app.post ('/v1/removeFile', cors(), multer().none(), async (req, res) => {
    await removeFile(req, res, JWT, directusUpdater)
});


/// TESTS
app.get ('/v1/test/constants', cors(), express.json(), async (req, res) => {
    await constants(res)
});