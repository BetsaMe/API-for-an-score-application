

module.exports = (req, res, next) => {      
    try {
        const validTextSauce= /^[#.0-9a-zA-Z\s]{3,20}$/; 
        const validDescription = /^[#.0-9a-zA-Z\s]{3,250}$/; 
        const sauceObject = JSON.parse(req.body.sauce);
        
        if (!sauceObject.name || !sauceObject.description) {
            console.log('champ vide') 
            throw 'champ vide' 
            
        }else if(!validTextSauce.test(sauceObject.name)){
            console.log( sauceObject.name + "n'est pas un nom valide")
            throw 'champ non valide'
             
        }else if(!validDescription.test(sauceObject.description)){
            console.log( 'description entre 3 et 200 caractères')
            throw 'champ non valide'
             
        }else {
        next();
      }
    } catch(e) {
        console.log(e)
        res.status(401).json({
            message: 'Invalid request!'
        });
    }
  };

  