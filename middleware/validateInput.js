
module.exports = (req, res, next) => {      
    try {
        const validTextSauce= /^[#.0-9a-zA-Z\s]{3,20}$/; 
        const validDescription = /^[#.0-9a-zA-Z\s]{3,250}$/; 
        const sauceObject = JSON.parse(req.body.sauce);
        
        if (!sauceObject.name || !sauceObject.description) {
            throw 'champ vide' 
            
        }else if(!validTextSauce.test(sauceObject.name) || !validTextSauce.test(sauceObject.manufacturer) || !validTextSauce.test(sauceObject.mainPepper) ){
            throw 'les champs doivent comporter entre 3 et 20 caractères'
             
        }else if(!validDescription.test(sauceObject.description)){
            throw 'la description doit comporter entre 3 et 250 caractères'
             
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

  