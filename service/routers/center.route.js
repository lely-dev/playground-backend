import { Router } from "express";
import centerModel from "../models/center.model.js";
import cloudinaryLogo from "../middlewares/multer.logo.js"

export const centerRoute = Router();


//RICHIESTA GET PER I CENTER
centerRoute.get('/', async (req, res) => {
  try {
    const user = await centerModel.find();
    res.json(user);
    
} catch (error) {
    console.error("Errore durante il recupero dei center:", error);
    res.status(500).json({ message: 'Errore durante il recupero dei center' });
}
})

//RICHIESTA GET DELL'UTENTE CENTER LOGGATO
centerRoute.get("/me", async (req, res, next) => {
 
  try {
    let user = await centerModel.findById(req.user.id);

    res.send(user);
  } catch (err) {
    next(err);
  }
});


//RICHIESTA GET DEL CENTER TRAMITE ID
centerRoute.get("/:id", async (req, res, next) => {
    try {

      let user = await centerModel.findById(req.params.id);
        
      res.send(user);
      console.log('sono al center tramite ID')
    } catch (err) {

      next(err);
    }
  });


  //RICHIESTA PUT DEL CENTER
  centerRoute.put("/:id", async (req, res, next) => {
    try {
     
      let user = await centerModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.send(user);
      console.log('ho modificato il center')
    } catch (err) {

      next(err);
    }
  });


  //DELETE DEL CENTER
  centerRoute.delete("/:id", async (req, res, next) => {
    try {
      
      await centerModel.deleteOne({
        _id: req.params.id,
      });
     
      res.send("Il center è stato eliminato").status(204);
    } catch (err) {
      
      next(err);
    }
  });


  // RICHIESTA PATCH DEL LOGO DEL CENTER
  centerRoute.patch("/:id/logo", cloudinaryLogo, async (req, res, next) => {
    try {
      let updateAvatarUser = await centerModel.findByIdAndUpdate(
        req.params.id,
        { logo: req.file.path },
        { new: true }
      );

      res.send(updateAvatarUser);
    } catch (error) {

      next(error);
    }
  });