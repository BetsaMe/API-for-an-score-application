

// module.exports = (req, res, next) => {      
//     try {
//         const validTextSauce= /^[#.0-9a-zA-Z\s]{3,10}$/; 
//         const validDescription = /^[#.0-9a-zA-Z\s]{3,50}$/; 
//         const sauceObject = JSON.parse(req.body.sauce);
        
//         if (!sauceObject.name) {
//             console.log('chap vide') 
//             throw 'champ vide'  
                 
            
//         }else if(!validTextSauce.test(sauceObject.name)){
//             console.log('champ non valide')
//             throw 'champ non valide'
             
//         }else {
//         next();
//       }
//     } catch(error) {
//         res.status(401).json({error});
       
//     }
//   };

  