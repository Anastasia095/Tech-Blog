const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

// Get all posts and JOIN with user data
router.get('/', async (req, res) => {
  console.log('++++++++++++++++++++++++++++++++++')
  try {
    const postData = await Post.findAll({
      // attributes: [
      //   'id',
      //   'title',
      //   'postContent',
      //   'date_created'
      // ],
      include: [
        {
          model: User,
        }
      ],
      // include: [
      //   {
      //     model: Comment,
      //     attributes: ['id', 'user_id', 'date_created'],
      //   },
      // ]
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log('=============================================')
    console.log(posts)
    console.log(posts[0].user.name)
    // Pass serialized data and session flag into template
    res.render('all-posts', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Route for a single post */
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    const post = postData.get({ plain: true });
    console.log(post);
    console.log(post.title);

    res.render('single-post', { post });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Route for a editing post */
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    const post = postData.get({ plain: true });
    console.log(post);
    console.log(post.title);
    //hookup to edit-post handlebars, maybe render text in the form so the user can edit
    res.render('single-post', { post });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;
