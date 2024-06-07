import { Router } from "express";
import disponibilityModel from "../models/disponibility.model.js";
import fieldModel from "../models/field.model.js";

export const disponibilityRoute = Router();

//RICHIESTA GET DELLA DISPONIBILITA DEL FIELD
disponibilityRoute.get("/:fieldId", async (req, res, next) => {
    try {
      let disponibilities = await disponibilityModel.find({fieldId: req.params.fieldId});
        
      res.send(disponibilities);
      console.log('ho le disponibilità del campo')
    } catch (err) {

      next(err);
    }
  });

  //RICHIESTA GET DELLA SINGOLA DISPONIBILITA DEL FIELD
  disponibilityRoute.get("/:fieldId/:id", async (req, res, next) => {
    try {
      let disponibility = await disponibilityModel.find({fieldId: req.params.fieldId, _id: req.params.id});
      
      if (disponibility.fieldId !== req.params.fieldId) {
        res.status(404).send("Errore l'id del campo non corrisponde all'id della disponibilità");
      }
      res.send(disponibility);
      console.log('sono al field tramite ID')
    } catch (err) {

      next(err);
    }
  });

  // RICHIESTA POST DELLA DISPONIBILITA DEL FIELD
  disponibilityRoute.post("/:fieldId", async (req, res, next) => {
    try {
      
      const field = await fieldModel.findById(req.params.fieldId);
      if (!field) {
          return res.status(404).send({ error: 'Field not found' });
      }

      // creo la nuova disponibilità
        const newDisponibility = new disponibilityModel ({
            from: req.body.from,
            to: req.body.to,
            fieldId: req.params.fieldId
        });

        // Salva la disponibilità
        await newDisponibility.save();

        res.status(201).send(newDisponibility);
        console.log('Disponibilità salvata con successo');
    } catch (err) {

      next(err);
    }
  });

  // RICHIESTA PUT DELLA SINGOLA DISPONIBILITA NEL FIELD
  disponibilityRoute.put("/:fieldId/:id", async (req, res, next) => {
    try {

        let disponibility = await disponibilityModel.findById(req.params.id);

        if (!disponibility) {
            return res.status(404).send({ error: 'Disponibility not found' });
        }

        // Verifico che l'id del campo corrisponda alla disponibilità
        if (disponibility.fieldId !== req.params.fieldId) {
            return res.status(400).send({ error: 'Field ID mismatch' });
        }

        disponibility = await disponibilityModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

      res.send(disponibility);
      console.log('ho modificato la disponibilità selezionata')

    } catch (err) {

      next(err);
    }
  });

  // RICHIESTA DELETE DELLA DISPONIBILITA
  disponibilityRoute.delete("/:id", async (req, res, next) => {
    try {

        await disponibilityModel.deleteOne({
            _id: req.params.id,
          });
         
          res.send("La disponibilità è stata eliminata").status(204);
    } catch (err) {

      next(err);
    }
  });