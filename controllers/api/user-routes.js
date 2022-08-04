//require router, Post (from yout models), withAuth
const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

//get route that uses with Auth - uses findAll on posts
router.get('/',  withAuth, async (req, res) => {
    try {
      // Get all posts and JOIN with user data
      const postData = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  
      // Serialize data so the template can read it
      const posts = postData.map((post) => post.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('homepage', { 
        posts, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
//render all-posts-admin with the dashboard layout

//get route for rendering the new post page, also using withAuth - findAll

//render new-post with dashboard layout

//get route for editigin a post, using with aith - findbypk

// router.get('edit/:id', withAuth. async (req, res) => {
//     try {
//         //await post data
//     } catch (err) {
//         //throughs error with a redirect to the login page
//     }
// })

module.exports = router;