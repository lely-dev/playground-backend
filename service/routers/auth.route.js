import { Router } from "express";
import bcrypt from "bcryptjs";
import { generateJWT } from "../middlewares/authlogin.js";
import playerModel from "../models/player.model.js";
import centerModel from "../models/center.model.js";
import passport from "passport";


export const authRouter = Router();

  
  // POST PER REGISTRARE IL PLAYER
  authRouter.post("/player/register", async (req, res, next) => {
    try {

      let newUser = await playerModel.create({
        ...req.body,
        password: await bcrypt.hash(req.body.password, 10),
      });
      
   
      res.send(newUser);

    } catch (err) {
      next(err);
    }
  });

    // POST PER REGISTRARE IL CENTRO
    authRouter.post("/center/register", async (req, res, next) => {
      try {
  
        let newUser = await centerModel.create({
          ...req.body,
          password: await bcrypt.hash(req.body.password, 10),
        });
        
     
        res.send(newUser);
  
      } catch (err) {
        next(err);
      }
    });


  // POST PER IL LOGIN DEL PLAYER PRECEDENTEMENTE REGISTRATO
  authRouter.post("/player/login", async (req, res, next) => {
    try {
      // RICERCA L'UTENTE CON USERNAME
      let findUser = await playerModel.findOne({
        username: req.body.username,
      });
  
      // SE TROVIAMO L'UTENTE CONTROLLO DELLA PASSWORD
      if (findUser) {
        const passwordCorrect = await bcrypt.compare(
          req.body.password,
          findUser.password
        );
  
        // SE LA PASSWORD COINCIDE GENERIAMO IL TOKEN
        if (passwordCorrect) {
          const token = await generateJWT({
            username: findUser.username,
            _id: findUser._id
          });
  
   
          res.send({ user: findUser, token});
    
        } else {
          res.status(400).send("Wrong Password");
        }
      } else {
        res.status(400).send("Player not found");
      }
    } catch (err) {
      next(err);
    }
  });




   // POST PER IL LOGIN DEL CENTRO PRECEDENTEMENTE REGISTRATO
   authRouter.post("/center/login", async (req, res, next) => {
    try {
      // RICERCA L'UTENTE CON USERNAME
      let findUser = await centerModel.findOne({
        username: req.body.username,
      });
  
      // SE TROVIAMO L'UTENTE CONTROLLO DELLA PASSWORD
      if (findUser) {
        const passwordCorrect = await bcrypt.compare(
          req.body.password,
          findUser.password
        );
  
        // SE LA PASSWORD COINCIDE GENERIAMO IL TOKEN
        if (passwordCorrect) {
          const token = await generateJWT({
            username: findUser.username,
            _id: findUser._id
          });
  
   
          res.send({ user: findUser, token});
    
        } else {
          res.status(400).send("Wrong Password");
        }
      } else {
        res.status(400).send("Center not found");
      }
    } catch (err) {
      next(err);
    }
  });


    // GET PER IL LOGIN TRAMITE GOOGLE
    authRouter.get("/googleLogin", passport.authenticate("google", {scope:["profile", "email"]}));

    authRouter.get("/callback", passport.authenticate("google", {session:false}), (req,res,next)=>{
      try {
        res.redirect(`http://localhost:3000/me?accessToken=${req.user.accessToken}`);
        
      } catch (error) {
        next(error);
      }
    });