const { Counters } = require('./../../models/counter')
const {Movies} = require('./../../models/movie')
function autoIncr(seqName){
    // inspiration:
    // https://blog.eduonix.com/web-programming-tutorials/learn-auto-increment-sequences-mongodb/
    let seqCounter = Counter.findByIdAndUpdate({
       query:{_id: seqName },
       update: {$inc:{count:1}},
       new:true
    })
    return seqCounter.count;
}


module.exports = async (req, res) => {
  Counters.findByIdAndUpdate("moviecounter",
    {$inc:{count:1}},
    {new:true}).then((counter) => {
      const movie = new Movies({
        "_id": counter.count,
        "title": req.body.title,
        "director": req.body.director,
        "stars": req.body.actors,
        "description": req.body.description,
        "genres": req.body.genres,
        "imgsrc": req.body.imgsrc
      })
   return movie.save()
  }).then(movie =>
  res.send(movie)).catch(error => res.send(error))
}
