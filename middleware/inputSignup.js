// Middleware pour la validation des champs signup//

module.exports = (req, res, next) => {
    try {
        const validFormatEmail= /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/; 
        const validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/; //Huit caractères au minimum, au moins: une lettre majuscule, une minuscule, et une chiffre/        

        if (!validFormatEmail.test(req.body.email)) {
            console.log("Adresse e-mail non valide")
            throw "Adresse e-mail non valide"           
            
        }else if(!validPassword.test(req.body.password)){
            console.log('mot de passe trop faible!')
            throw "mot de passe trop faible!" 
        }else {
        next();
      }
    } catch {
      res.status(401).json({
        error: new Error('Invalid request!')
      });
    }
  };

  