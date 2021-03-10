// implement your posts router here
const express = require('express')
const router = express.Router()
const Post = require('./posts-model')

//endpoints
// base path is /api/posts

// get /
//find
router.get('/', (req, res) => {
    Post.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            res.status(500).json({
                message: "The posts information could not be retrieved"
            })
        })
})

// get /:id
//findById
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist" })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "The post information could not be retrieved" })
        })
})

// post /
//insert
//findById
router.post('/', (req, res) => {
    const newPost = req.body

    if (!newPost.title || !newPost.contents) {
        res.status(400).json({ message: "Please provide title and contents for the post" })
    } else {
        Post.insert(newPost)
            .then(post => {
                Post.findById(post.id)
                    .then(ourPost => {
                        res.status(201).json(ourPost);
                    })
            })
            .catch(err => {
                res.status(500).json({
                    message: "There was an error while saving the post to the database"
                })
            })
    }
})

// put /:id
//update
router.put('/:id', (req, res) => {
    const id = req.params.id
    const changes = req.body

    if (!changes.title || !changes.contents) {
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    }

    Post.update(id, changes)
        .then(post => {
            if (post) {
                Post.findById(id)
                    .then(ourPost => {
                        res.status(200).json(ourPost);
                    })
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist" })
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "The post information could not be modified"
            });
        });
})

// delete /:id
//remove
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await Post.remove(id)
        if (!deleted) {
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        } else {
            res.status(200).json(deleted)
        }
    } catch (err) {
        res.status(500).json({ message: "The post could not be removed" })
    }
})

// get /:id/comments
//findPostComments
router.get("/:id/comments", (req, res) => {
    Post.findPostComments(req.params.id)
        .then((posts) => {
            if (posts.length > 0) {
                res.status(200).json(posts)
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "The comments information could not be retrieved"
            })
        })
})

module.exports = router;
