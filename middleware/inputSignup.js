// Middleware pour la validation des champs signup//

module.exports = (req, res, next) => {
    try {
        const validFormatEmail= /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/; 
        const validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/; //Huit caractères au minimum, au moins: une lettre majuscule, une minuscule, et une chiffre/        

        if (!validFormatEmail.test(req.body.email)) {
            throw "Adresse e-mail non valide"           
            
        }else if(!validPassword.test(req.body.password)){
            throw "mot de passe trop faible!" 
        }else {
        next();
      }
    } catch(e) {
      res.status(401).json({
        message: e
      });
    }
  };

  