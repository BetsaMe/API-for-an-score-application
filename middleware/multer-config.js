const multer = require('multer');


const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');//Le null signifie qu'il n'y a pas eu d'erreur et que vous appelez la callback avec succès et une valeur résultante.
  },
  filename: (req, file, callback) => {
    
    const name = file.originalname.split(' ').join('_');   

    callback(null,  Date.now() + name);    
  }
});

module.exports = multer({storage: storage}).single('image');//avec .single on ajout un seul fichier//


