import express from 'express'
import { readCSV } from '../controller/readCSV'

const router = express.Router()

router.get('/people-like-you', readCSV)

module.exports = router