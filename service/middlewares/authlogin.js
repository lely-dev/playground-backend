import jwt from "jsonwebtoken";
import playerModel from "../models/player.model.js";
import centerModel from "../models/center.model.js";


//CREIAMO IL JWT PER L'UTENTE
export const generateJWT = (payload) => {

    return new Promise((resolve, reject) => {

        //salvo anche l id
        const { _id, ...restPayload } = payload;
        
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn: "1d"},
            (err, token) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(token);
                }
            }
        )
    })

};

//VERIFICA DEL TOKEN
export const jwtVerify = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(
            token,
            process.env.JWT_SECRET,
            (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            }
        )
    })
};

// LOGIN PER I PLAYER 
export const authPlayerMiddleware = async (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        return res.status(400).send("Effettua il Login");
      }
  
      const token = req.headers.authorization.replace("Bearer ", "");
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      if (decoded.exp) {
        const player = await playerModel.findOne({ _id: decoded._id });
  
        if (player) {
          req.player = player;
          next();
        } else {
          res.status(401).send("Player not found");
        }
      } else {
        res.status(401).send("Token expired");
      }
    } catch (error) {
      next(error);
    }
  };

  // LOGIN PER IL CENTRO
  export const authCenterMiddleware = async (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        return res.status(400).send("Effettua il Login");
      }
  
      const token = req.headers.authorization.replace("Bearer ", "");
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      if (decoded.exp) {
        const center = await centerModel.findOne({ _id: decoded._id });
  
        if (center) {
          req.center = center;
          next();
        } else {
          res.status(401).send("Center not found");
        }
      } else {
        res.status(401).send("Token expired");
      }
    } catch (error) {
      next(error);
    }
  };