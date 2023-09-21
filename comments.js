// Create web server using Express.js

// Import express module
const express = require('express');
// Import body-parser module
const bodyParser = require('body-parser');
// Import mongoose module
const mongoose = require('mongoose');
// Import Comments schema
const Comments = require('../models/comments');
// Import Verify module
const verify = require('./verify');
// Create router object
const commentRouter = express.Router();

// Use body-parser module
commentRouter.use(bodyParser.json());

// Configure router for '/comments' endpoint
commentRouter.route('/')
// GET method
.get((req, res, next) => {
    // Find all comments
    Comments.find({})
    // Populate author field
    .populate('author')
    // Execute query
    .exec((err, comments) => {
        // If error, return error
        if (err) throw err;
        // Return comments
        res.json(comments);
    });
})
// POST method
.post(verify.verifyOrdinaryUser, (req, res, next) => {
    // Create comment
    Comments.create(req.body, (err, comment) => {
        // If error, return error
        if (err) throw err;
        // Return comment
        res.json(comment);
    });
})
// DELETE method
.delete(verify.verifyOrdinaryUser, verify.verifyAdmin, (req, res, next) => {
    // Remove all comments
    Comments.remove({}, (err, resp) => {
        // If error, return error
        if (err) throw err;
        // Return response
        res.json(resp);
    });
});

// Configure router for '/comments/:commentId' endpoint
commentRouter.route('/:commentId')
// GET method
.get((req, res, next) => {
    // Find comment by id
    Comments.findById(req.params.commentId)
    // Populate author field
    .populate('author')
    // Execute query
    .exec((err, comment) => {
        // If error, return error
        if (err) throw err;
        // Return comment
        res.json(comment);
    });
})
// PUT method
.put(verify.verifyOrdinaryUser, (req, res, next) => {
    // Find comment by id
    Comments.findById(req.params.commentId, (err, comment) => {
        // If error, return error
        if (err) throw err;
        // Update comment
        Comments.findByIdAndUpdate(req.params.commentId, {
            $set: req.body
        }, {
            new: true
        }, (err, comment) => {
            // If error, return error
            if (err) throw err;
            // Return comment
            res.json(comment);
        });
    });
}
// DELETE method
.delete(verify.verifyOrdinaryUser, (req, res, next) => {
    // Find comment by id
    Comments.findById(req.params.commentId, (err, comment) => {
        // If error, return error
        if (err) throw err;
        // Remove comment
        Comments.findByIdAndRemove(req.params.commentId, (err, resp) => {
            // If error, return error
            if (err) throw err;
            // Return response
            res.json(resp);
        });
    });
}
);

// Export module
module.exports = commentRouter;

// Path: skills.js
// Compare this snippet from member.js:
// function skillsMember() {
//     return {
//         name: 'skillsMember',
//         templateUrl: 'app/components/skills-member/skills-member.html',
//         restrict: 'E',
//         controller: 'SkillsMemberCtrl',
//         controllerAs: 'vm',
//         bindToController: true,
//         scope: {
//             member: '=',
//             skills: '='
//         }
//     };
// }
