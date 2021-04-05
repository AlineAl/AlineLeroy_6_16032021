const Sauce = require('../models/Sauce.js');
const fs = require('fs');
const { ObjectId } = require('bson');

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

exports.likeSauce = (req, res, next) => {
  const alreadyExistLike = req.body.likes.default === 1
  const alreadyExistDislike = req.body.dislikes.default === -1
  Sauce.findOne({_id: req.params.id})
  .then(sauce => {
    // Pour un userId
    // Regarder si j'aime = 1 ou -1 existe déjà
    if(req.body.userId) {
      if(alreadyExistLike || alreadyExistDislike) {
        console.log("test")
      } else {
          if(req.body.likes === 1) {
            Sauce.updateOne(
              {_id: req.params.id},
              {$push: {usersLiked: userId}}, 
              {$inc: {likes: +1}}
            )
          } else if(req.body.dislikes === -1) {
            Sauce.updateOne(
              {_id: req.params.id},
              {$push: {usersDisliked: userId}}, 
              {$inc: {likes: -1}}
            )
          } else if(req.body.likes === 0){
            Sauce.updateOne(
              {_id: req.params.id},
              {$push: {usersDisliked: userId}}, 
              {$inc: {likes: 0}}
            )
          }
          } 
      }
      
  })
  .catch(error => res.status(500).json({ error }));
}

