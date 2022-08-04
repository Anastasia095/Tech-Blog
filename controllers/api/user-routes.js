//require router, Post (from yout models), withAuth
const { Router } = require("express");
const { Post } = require('../../models');

//get route that uses with Auth - uses findAll on posts
//render all-posts-admin with the dashboard layout

//get route for rendering the new post page, also using withAuth - findAll
//render new-post with dashboard layout

//get route for editigin a post, using with aith - findbypk

router.get('edit/:id', withAuth. async (req, res) => {
    try {
        //await post data
    } catch (err) {
        //throughs error with a redirect to the login page
    }
})