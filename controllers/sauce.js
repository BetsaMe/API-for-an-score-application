const Sauce = require('../models/Sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {  
  const sauceObject = JSON.parse(req.body.sauce); 
  delete sauceObject._id;  
  const sauce= new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0
  });
  sauce.save() //enregistre le model sur ma bdd, et reenvoie une promise//
    .then(()=> res.status(201).json({ message: 'Article enregistré !'}))
    .catch(error => res.status(400).json({error})); 
};

exports.modifySauce = (req, res, next) => { 
  const sauceObject = req.file ?
  {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id}) //premier arg est l'objet de comparaison, le deuxième est l'objet modifié// 
    .then(() => res.status(200).json({ message: 'Article modifié!'}))
    .catch(error => res.status(404).json({ error }));
};


exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
  .then( (sauce) => {
      const filename = sauce.imageUrl.split('/images/')[1];

      if (!sauce) {
          res.status(404).json({
          error: new Error("Cela n'existe pas!")
        });
      }
      if (sauce.userId !== req.auth.userId) {
        res.status(400).json({
          error: new Error('Requête non autorisée !')
        });
      }
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Article supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));      
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })//je compare l'id de mon objet en vente avec l'id de ma url//
      .then(sauce=> res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
};

exports.getAllSauces =(req, res, next) => {
    Sauce.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(404).json({ error }));
};

// traitement de likes//

// exports.likeSauce = ((req, res, next) => {    
  
//     const choice = req.body.like;
//     const userId = req.body.userId;
    
//     if(choice == 1){
//       Sauce.updateOne({_id: req.params.id} , { $inc : {likes: +1}, $push : {usersLiked: userId } })
//         .then(() => res.status(200).json({ message: 'Article aimé !'}))
//         .catch(error => res.status(404).json({ error }));
//     }
//     if(choice == -1){
//       Sauce.updateOne({_id: req.params.id} , {$inc : {dislikes: +1}, $push: {usersDisliked: userId }})
//         .then(() => res.status(200).json({ message: 'Article pas aimé !'}))
//         .catch(error => res.status(404).json({ error }));
//     }

//     if(choice == 0){
//       Sauce.findOne({_id : req.params.id})
//        .then(sauce => {
//           if (sauce.usersLiked.includes(userId)){ 
//             Sauce.updateOne({_id : req.params.id}, {
//                $inc : {likes : -1 } , $pull : { usersLiked :userId }
//             })
//               .then(() => res.status(201).json({message : "j'aime a été retiré !"}))
//               .catch(error => res.status(500).json({error}))
//           }
//           if (sauce.usersDisliked.includes(userId)){
//             Sauce.updateOne({_id : req.params.id}, {
//               $inc : {dislikes : -1 } , $pull : { usersDisliked :userId }
//             })
//               .then(() => res.status(201).json({message : "je n'aime pas été retiré !"}))
//               .catch(error => res.status(500).json({ error }))
//           }
//         })
//       .catch(error => res.status(500).json({ error}))    
//     }
// });



exports.likeSauce = ((req, res, next) => {    
  
  const choice = req.body.like;
  const userId = req.body.userId; 
    
      Sauce.findOne({_id : req.params.id})
      .then(sauce => {

          if(choice == 1 && !sauce.usersLiked.includes(userId)){
            Sauce.updateOne({_id: req.params.id} , { $inc : {likes: +1}, $push: {usersLiked: userId } })
              .then(() => res.status(200).json({ message: 'Article aimé !'}))
              .catch(error => res.status(404).json({ error }));
          }

          if(choice == -1 && !sauce.usersDisliked.includes(userId)){
            Sauce.updateOne({_id: req.params.id} , {$inc : {dislikes: +1}, $push: {usersDisliked: userId }})
              .then(() => res.status(200).json({ message: 'Article pas aimé !'}))
              .catch(error => res.status(404).json({ error }));        
          }

          if(choice == 0){
            if (sauce.usersLiked.includes(userId)){ 
              Sauce.updateOne({_id : req.params.id}, {
                $inc : {likes : -1 } , $pull : { usersLiked :userId }
              })
                .then(() => res.status(201).json({message : "userId et like supprimés!"}))
                .catch(error => res.status(500).json({error}))
            }
            if (sauce.usersDisliked.includes(userId)){
              Sauce.updateOne({_id : req.params.id}, {
                $inc : {dislikes : -1 } , $pull : { usersDisliked :userId }
              })
                .then(() => res.status(201).json({message : "userId et dislike supprimés!"}))
                .catch(error => res.status(500).json({ error }))
            }
          }         
      })
      .catch(error => res.status(500).json({ error}))        
});