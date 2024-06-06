var express = require('express');
var router = express.Router();
var book = require('../controllers/books')
var axios = require('axios')


/* GET users listing. */
router.get('/', function(req, res, next) {
  var d = new Date().toISOString().substring(0,16)
  axios.get("http://localhost:17000/books/")
  .then(resp =>{ 
    res.status(200).render("booksListPage",{"lBooks": resp.data, "date": d}
    
  )
})
  .catch(erro=>{  
    res.status(501).render("error",{"error":erro})
});

});

router.get('/authors/:idautor', function(req, res, next) {
  var d = new Date().toISOString().substring(0,16)

  //aqui habria que hacer en el ex1 un get distinto pero no me da tiempo
  // axios.get("http://localhost:17000" + req.params.idautor)
  book.getByAuthor(req.params.idautor)
  .then(resp =>{ 
    var suma = 1
    for (let i = 0; i < resp.data; i++) {
      suma += 1
    }
    console.log(suma)
    res.status(200).render("authorPage",{"lBooks": resp.data,"suma": suma,
      "author": req.params.idautor,"date": d}
  )
})
  .catch(erro=>{  
    res.status(501).render("error",{"error":erro})
});
});


router.get('/:idbook', function(req, res, next) {
  var d = new Date().toISOString().substring(0,16)
  axios.get("http://localhost:17000/books/" + req.params.idbook)
  .then(resp =>{ 
    console.log(resp)
    res.status(200).render("bookPage",{"book": resp.data, "data": d} 
  )
})
  .catch(erro=>{  
    res.status(501).render("error",{"error":erro})
});
});

// router.post('/', function(req, res, next) {

//   // var b = {
//   //   bookId: req.body.bookId,
//   //   title: req.body.title,
//   //   series: req.body.series,
//   //   author: req.body.author,
//   //   rating: req.body.rating,
//   //   description: req.body.bookId,
//   //   language: req.body.bookId,
//   //   isbn: req.body.bookId,
//   //   genres: [req.body.bookId ],
//   //   characters: [req.body.bookId],
//   //   bookFormat: req.body.bookId,
//   //   edition: req.body.bookId,
//   //   pages: req.body.bookId,
//   //   publisher: req.body.bookId,
//   //   publishDate:req.body.bookId,
//   //   firstPublishDate: req.body.bookId,
//   //   awards: [req.body.bookId],
//   //   numRatings: req.body.bookId,
//   //   ratingsByStars: [req.body.bookId],
//   //   likedPercent: req.body.bookId,
//   //   setting: [req.body.bookId],
//   //   coverImg: req.body.bookId,
//   //   bbeScore: req.body.bookId,
//   //   bbeVotes: req.body.bookId,
//   //   price: req.body.bookId
//   // }

//   book.insert(req.body)
//     .then(resp =>{
//       // res.status(201).redirect('/')
//       res.jsonp(resp)
//     })
//     .catch(erro =>{
//       // res.status(502).render("error",{"error":erro})
//       res.jsonp(erro)
//     })
// });



// router.get('/delete/:id', function(req, res, next) {
//   var d = new Date().toISOString().substring(0,16)
//   book.delete(req.params.id)
//   .then(resp =>{
//     // res.status(200).redirect('/')
//     res.jsonp(resp)
//   })
//   .catch(erro=>{  
//     // res.status(505).render("error",{"error":erro})
//     res.jsonp(erro)
//   });
// });

// router.delete('/delete/:id', function(req, res, next) {
//   var d = new Date().toISOString().substring(0,16)
//   book.delete(req.params.id)
//   .then(resp =>{
//     // res.status(200).redirect('/')
//     res.jsonp(resp)
//   })
//   .catch(erro=>{  
//     // res.status(505).render("error",{"error":erro})
//     res.jsonp(erro)
//   });
// });

// router.put('/edit/:id', function(req, res, next) {

//   book.update(req.params.id,req.body)
//   .then(resp =>{
//     // res.status(201).redirect('/')
//     res.jsonp(resp)
//   })
//   .catch(erro=>{  
//     // res.status(504).render("error",{"error":erro})
//     res.jsonp(erro)
//   });
// });


module.exports = router;