const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const albumArt = require('album-art')

//get all posts
router.get('/', (req, res) => {
  Post.findAll({
    attributes: ['id', 'title', 'content', 'created_at'],
    order: [
      ['created_at', 'DESC'],
    ],
    include: [{
      model: User,
      attributes: ['username'],
    },
    {
      model: Comment,
      attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
      include: {
        model: User,
        attributes: ['username'],
      }
    }
    ]
  })
    .then(dbPostData => res.json(dbPostData.reverse()))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});



//get one user
router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'content', 'title', 'created_at'],
    include: [{
      model: User,
      attributes: ['username'],


    },
    {
      model: Comment,
      attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
      include: {
        model: User,
        attributes: ['username'],


      }
    }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create new post
router.post('/', withAuth, (req, res) => {
  console.log(req.body)
  // const album = await albumArt(req.body.aritst).catch(err => {
  //   return ""

  // })
const searchArtist = req.body.artist;
const searchlp = req.body.lp;
const searchArtistString = searchArtist.toString();
const searchLpString = searchlp.toString();
  const album = albumArt(searchArtistString, searchLpString, function (err, res) {
    console.log('error: ', err)
    console.log('response: ', res)
  })
  


  Post.create({
    title: req.body.title,
    content: req.body.content,
    user_id: req.session.user_id,
    artist: req.body.artist,
    lp: req.body.lp,
    // photo: album.length ? photourl : "/img/comingsoon.jpg"
    photo: album
  })


  Post.create({
    title: req.body.title,
    content: req.body.content,
    artist: req.body.artist,
    lp: req.body.lp,
    photo: req.body.photo,
    user_id: req.session.user_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update post
router.put('/:id', withAuth, (req, res) => {
  Post.update({


    title: req.body.title,
    content: req.body.content
  }, {
    where: {
      id: req.params.id
    }
  }).then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.json(dbPostData);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);

    });
});

//delete post
router.delete('/:id', withAuth, (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id
    }
  }).then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.json(dbPostData);

  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


module.exports = router;