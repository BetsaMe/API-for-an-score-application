const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); //decodage du token//
      const userId = decodedToken.userId;
      req.auth = { userId };  //attribuer mon userId à l'objet req//
      if (req.body.userId && req.body.userId !== userId) {
        throw 'Invalid user ID';
      } else {
        next();
      }
  } catch {
    res.status(401).json({
      error: new Error('Invalid requeste!')
    });
  }
};

//on peut ajouter des attributs a l'objet req, et il seront disponibles dans tous les middleware suivants//
 