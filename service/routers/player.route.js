import { Router } from "express";
import playerModel from "../models/player.model.js";
import cloudinaryAvatar from "../middlewares/multer.avatar.js"

export const playerRoute = Router();


//RICHIESTA GET PER I PLAYER
playerRoute.get('/', async (req, res) => {
  try {
    const user = await playerModel.find();
    res.json(user);
    
} catch (error) {
    console.error("Errore durante il recupero dei player:", error);
    res.status(500).json({ message: 'Errore durante il recupero dei player' });
}
})

//RICHIESTA GET DELL'UTENTE LOGGATO
playerRoute.get("/me", async (req, res, next) => {
 
  try {
    let user = await playerModel.findById(req.user.id);

    res.send(user);
  } catch (err) {
    next(err);
  }
});


//RICHIESTA GET DEL PLAYER TRAMITE ID
playerRoute.get("/:id", async (req, res, next) => {
    try {

      let user = await playerModel.findById(req.params.id);
        
      res.send(user);
      console.log('sono al player tramite ID')
    } catch (err) {

      next(err);
    }
  });


  //RICHIESTA PUT DEL PLAYER
  playerRoute.put("/:id", async (req, res, next) => {
    try {
     
      let user = await playerModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.send(user);
      console.log('ho modificato il player')
    } catch (err) {

      next(err);
    }
  });


  //DELETE DEL PLAYER
  playerRoute.delete("/:id", async (req, res, next) => {
    try {
      
      await playerModel.deleteOne({
        _id: req.params.id,
      });
     
      res.send("Il player è stato eliminato").status(204);
    } catch (err) {
      
      next(err);
    }
  });


  // RICHIESTA PATCH DELL AVATAR PLAYER
  playerRoute.patch("/:id/avatar", cloudinaryAvatar, async (req, res, next) => {
    try {
        console.log("File ricevuto:", req.file);

        if (!req.file) {
            return res.status(400).send("No file uploaded.");
        }

      let updateAvatarUser = await playerModel.findByIdAndUpdate(
        req.params.id,
        { avatar: req.file.path },
        { new: true }
      );

      res.send(updateAvatarUser);
    } catch (error) {

      next(error);
    }
  });