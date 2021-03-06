const Sauce = require('../models/Sauce.js');
const fs = require('fs');

exports.getAllSauce = (req, res, next) => {
    Sauce.find()
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(400).json({ error }));
}

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
}

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
  {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
  .then(sauce => {
    const filename = sauce.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
      Sauce.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
    });
  })
  .catch(error => res.status(500).json({ error })) 
};

exports.likeSauce = (req, res) => {
  //console.log("debut test")
  Sauce.findOne({_id: req.params.id})
  .then((sauce) => {
    // Pour un userId
    // Regarder si j'aime = 1 ou -1 existe déjà
    //if(req.body.userId === req.body.userId) {
      const like = req.body.like
      if(like === 1) {
        //console.log(like)
        Sauce.updateOne(
          {_id: req.params.id},
          {$push: {usersLiked: `${req.body.userId}`}, $inc: {likes: 1}}
        )
        .then(() => res.status(200).json({ message: 'Sauce like !'}))
        .catch(error => res.status(400).json({ error }));
      } else if(like === -1) {
        //console.log(like)
        Sauce.updateOne(
          {_id: req.params.id},
          {$push: {usersDisliked: `${req.body.userId}`}, $inc: {dislikes: 1}}
        )
        .then(() => res.status(200).json({ message: 'Sauce dislike !'}))
        .catch(error => res.status(400).json({ error }));
      } else if(like === 0) {
        //console.log(like)
        //console.log(sauce.usersLiked.includes(req.body.userId))
          if(sauce.usersLiked.find(user => user === req.body.userId)) {
            Sauce.updateOne(
              {_id: req.params.id},
              {$pull: {usersLiked: `${req.body.userId}`}, $inc: {likes: -1}}
            )
            .then(() => res.status(200).json({ message: 'Sauce dislike !'}))
            .catch(error => res.status(400).json({ error }));
          } else if(sauce.usersDisliked.find(user => user === req.body.userId)) {
            Sauce.updateOne(
              {_id: req.params.id},
              {$pull: {usersDisliked: `${req.body.userId}`}, $inc: {dislikes: -1}}
            )
            .then(() => res.status(200).json({ message: 'Sauce dislike !'}))
            .catch(error => res.status(400).json({ error }));
          }
      }
    //}
  })
  .catch(error => res.status(500).json({ error }));
}

