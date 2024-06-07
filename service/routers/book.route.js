import { Router } from "express";
import bookModel from "../models/book.model.js";
import fieldModel from "../models/field.model.js";
import playerModel from "../models/player.model.js";
import disponibilityModel from "../models/disponibility.model.js";
import { authPlayerMiddleware } from "../middlewares/authlogin.js";

export const bookRoute = Router();


//RICHIESTA GET PER AVERE LE PRENOTAZIONI
bookRoute.get('/', async (req, res) => {
    try {
      const booking = await bookModel.find().populate('player', 'disponibility');
      res.json(booking);
      console.log('vedo le prenotazioni');
  } catch (error) {
      console.error("Errore durante il recupero delle prenotazioni:", error);
      res.status(500).json({ message: 'Errore durante il recupero delle prenotazioni' });
  }
  })

 

    // RICHIESTA GET DELLE PRENOTAZIONI DEL PLAYER
bookRoute.get('/player/:playerId', async (req, res) => {
    try {
      const playerId = req.params.playerId;
      const booked = await bookModel.find({ player: playerId }).populate({path: 'disponibility', populate:{path: "fieldId", populate: {path: "center"}}}).populate({path: 'player', select:["surname", "name"]});
      res.json(booked);
    } catch (error) {
      console.error("Errore durante il recupero dei field del centro:", error);
      res.status(500).json({ message: 'Errore durante il recupero dei field del centro' });
    }
  });


  // POST DELLA PRENOTAZIONE AL CAMPO
bookRoute.post('/', authPlayerMiddleware, async (req,res, next)=>{
    try {
        
        const disponibility = await disponibilityModel.findById(req.body.disponibilityId);
        if (!disponibility) {
            return res.status(404).send({ error: 'Disponibility not found' });
        }

        //check per verificare che sia disponibile
        if (disponibility.isBooked) {
            return res.status(400).send({ error: 'Disponibility already booked' });
        }
  
        // creo la nuova prenotazione
        const newBook = new bookModel({ 
            player: req.player._id,
            disponibility: req.body.disponibilityId
        });

        // Salva la prenotazione nel database
        await newBook.save();

        await disponibilityModel.findByIdAndUpdate(req.body.disponibilityId, {isBooked: true}, {
            new: true,
          });

        res.status(201).send(newBook);
        console.log('Campo prenotato con successo');
        
    } catch (error) {
        next(error)
    }
})


 //RICHIESTA PUT DELLA PRENOTAZIONE
 bookRoute.put("/:id", authPlayerMiddleware, async (req, res, next) => {
    try {
     
      let book = await bookModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.send(book);
      console.log('ho modificato la prenotazione')
    } catch (err) {

      next(err);
    }
  });


  //DELETE DELLA PRENOTAZIONE
  bookRoute.delete("/:id", async (req, res, next) => {
    try {
      
      await bookModel.deleteOne({
        _id: req.params.id,
      });

      await disponibilityModel.findByIdAndUpdate(req.body.disponibilityId, {isBooked: false}, {
        new: true,
      });
     
      res.send("La prenotazione è stata eliminata").status(204);
    } catch (err) {
      
      next(err);
    }
  });