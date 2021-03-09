// implement your posts router here
const express = require('express')
const router = express.Router()
const Post = require('./posts-model')

//endpoints
// get /
router.get('/', (req, res) => {})
// get /:id
router.get('/:id', (req, res) => {})
// get /:id/posts
router.get('/:id/posts', (req, res) => {})
// post /
router.post('/', (req, res) => {})
// delete /:id
router.delete('/:id', (req, res) => {})
// put /:id
router.put('/:id', (req, res) => {})

module.exports = router;