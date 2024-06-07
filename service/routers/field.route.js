import { Router } from "express";
import fieldModel from "../models/field.model.js";
import cloudinaryImage from "../middlewares/multer.image.js";
import {authCenterMiddleware} from "../middlewares/authlogin.js"

export const fieldRoute = Router();


//RICHIESTA GET PER I FIELDS
fieldRoute.get('/', async (req, res) => {
  try {
    const user = await fieldModel.find().populate('center');
    res.json(user);
    
} catch (error) {
    console.error("Errore durante il recupero dei fields:", error);
    res.status(500).json({ message: 'Errore durante il recupero dei fields' });
}
})



//RICHIESTA GET DEL FIELD TRAMITE ID
fieldRoute.get("/:id", async (req, res, next) => {
    try {

      let user = await fieldModel.findById(req.params.id).populate('center');
        
      res.send(user);
      console.log('sono al field tramite ID')
    } catch (err) {

      next(err);
    }
  });

  // RICHIESTA GET PER I FIELD DI UN CENTRO SPECIFICO
fieldRoute.get('/center/:centerId', async (req, res) => {
  try {
    const centerId = req.params.centerId;
    const fields = await fieldModel.find({ center: centerId }).populate('center');
    res.json(fields);
  } catch (error) {
    console.error("Errore durante il recupero dei field del centro:", error);
    res.status(500).json({ message: 'Errore durante il recupero dei field del centro' });
  }
});

  // POST DEL NUOVO FIELD
fieldRoute.post('/', authCenterMiddleware, async(req,res, next)=>{
  try {

      
      let newField = await fieldModel.create({...req.body, center: req.center._id});
      
      res.send(newField).status(200);
      console.log('post di un nuovo field')
      
  } catch (error) {
      next(error)
  }
})


  //RICHIESTA PUT DEL FIELD
  fieldRoute.put("/:id", async (req, res, next) => {
    try {
     
      let user = await fieldModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.send(user);
      console.log('ho modificato il field')
    } catch (err) {

      next(err);
    }
  });


  //DELETE DEL FIELD
  fieldRoute.delete("/:id", async (req, res, next) => {
    try {
      
      await fieldModel.deleteOne({
        _id: req.params.id,
      });
     
      res.send("Il field è stato eliminato").status(204);
    } catch (err) {
      
      next(err);
    }
  });


  // RICHIESTA PATCH DELLE IMMAGINI
  fieldRoute.patch("/:id/image", cloudinaryImage, async (req, res, next) => {
    try {
      const paths = req.files.map(file => file.path);


      let updateImageField = await fieldModel.findByIdAndUpdate(
        req.params.id,
        { image: paths },
        { new: true }
      );

      res.send(updateImageField);
    } catch (error) {

      next(error);
    }
  });