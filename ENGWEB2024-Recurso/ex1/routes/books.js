var express = require('express');
var router = express.Router();
var book = require('../controllers/books')

/* GET users listing. */
router.get('/', function(req, res, next) {
  var d = new Date().toISOString().substring(0,16)
  if (req.query.charater){
    book.findAllWithChar(req.query.charater)
    .then(resp =>{
      // var books = resp 
      // res.status(200).render("bookListPage",{"lbooks":books, "date": d})
      res.jsonp(resp)
    }).catch(erro => res.jsonp(erro))
  }
  else if (req.query.genre){
    book.findAllGenre(req.query.genre)
    .then(resp =>{
      // var books = resp 
      // res.status(200).render("bookListPage",{"lbooks":books, "date": d})
      res.jsonp(resp)
    }).catch(erro => res.jsonp(erro))
  }
  else{
    book.list()
    .then(resp =>{
      res.jsonp(resp)
    }).catch(erro => res.jsonp(erro))
  }
});

router.get('/genres', function(req, res, next) {
  // var d = new Date().toISOString().substring(0,16)
  // res.status(200).render("contratoFormPage", {"date":d})
  book.findGenres()
  .then(resp =>{
    // var contratos = resp 
    // res.status(200).render("contratoListPage",{"lcontratos":contratos, "date": d})
    res.jsonp(resp)
  }).catch(erro => res.jsonp(erro))
});

router.get('/characters', function(req, res, next) {
  // var d = new Date().toISOString().substring(0,16)
  // res.status(200).render("contratoFormPage", {"date":d})
  book.findChar()
  .then(resp =>{
    // var contratos = resp 
    // res.status(200).render("contratoListPage",{"lcontratos":contratos, "date": d})
    res.jsonp(resp)
  }).catch(erro => res.jsonp(erro))
});


router.get('/:idbook', function(req, res, next) {
  // var d = new Date().toISOString().substring(0,16)
  // res.status(200).render("bookFormPage", {"date":d})
  book.findById(req.params.idbook)
  .then(resp =>{
    // var books = resp 
    // res.status(200).render("bookListPage",{"lbooks":books, "date": d})
    res.jsonp(resp)
  }).catch(erro => res.jsonp(erro))
});

router.post('/', function(req, res, next) {

  // var b = {
  //   bookId: req.body.bookId,
  //   title: req.body.title,
  //   series: req.body.series,
  //   author: req.body.author,
  //   rating: req.body.rating,
  //   description: req.body.bookId,
  //   language: req.body.bookId,
  //   isbn: req.body.bookId,
  //   genres: [req.body.bookId ],
  //   characters: [req.body.bookId],
  //   bookFormat: req.body.bookId,
  //   edition: req.body.bookId,
  //   pages: req.body.bookId,
  //   publisher: req.body.bookId,
  //   publishDate:req.body.bookId,
  //   firstPublishDate: req.body.bookId,
  //   awards: [req.body.bookId],
  //   numRatings: req.body.bookId,
  //   ratingsByStars: [req.body.bookId],
  //   likedPercent: req.body.bookId,
  //   setting: [req.body.bookId],
  //   coverImg: req.body.bookId,
  //   bbeScore: req.body.bookId,
  //   bbeVotes: req.body.bookId,
  //   price: req.body.bookId
  // }

  book.insert(req.body)
    .then(resp =>{
      // res.status(201).redirect('/')
      res.jsonp(resp)
    })
    .catch(erro =>{
      // res.status(502).render("error",{"error":erro})
      res.jsonp(erro)
    })
});



router.get('/delete/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0,16)
  book.delete(req.params.id)
  .then(resp =>{
    // res.status(200).redirect('/')
    res.jsonp(resp)
  })
  .catch(erro=>{  
    // res.status(505).render("error",{"error":erro})
    res.jsonp(erro)
  });
});

router.delete('/delete/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0,16)
  book.delete(req.params.id)
  .then(resp =>{
    // res.status(200).redirect('/')
    res.jsonp(resp)
  })
  .catch(erro=>{  
    // res.status(505).render("error",{"error":erro})
    res.jsonp(erro)
  });
});

router.put('/edit/:id', function(req, res, next) {

  book.update(req.params.id,req.body)
  .then(resp =>{
    // res.status(201).redirect('/')
    res.jsonp(resp)
  })
  .catch(erro=>{  
    // res.status(504).render("error",{"error":erro})
    res.jsonp(erro)
  });
});


module.exports = router;