import GoogleStrategy from "passport-google-oauth20";
import "dotenv/config";
import Player from "../models/player.model.js";
import { generateJWT } from "./authlogin.js";


const options = {
    clientID: process.env.G_CLIENT_ID,
    clientSecret: process.env.G_SECRET,
    callbackURL: process.env.G_CALLBACK
}

const googleStrategy = new GoogleStrategy(options, async ( _, __, profile, passportNext)=>{

    try {
        // DESTRUTTURARE IL PROFILE
    const {email, given_name, family_name, sub, picture} = profile._json;

    const user = await Player.findOne({email});

    if (user){
        const accToken = await generateJWT({
            _id: user._id,
        });

       

        passportNext(null, {accToken});
    } else {

        const newUser = new Player({
            username: email,
            password: sub,
            name: given_name,
            surname: family_name,
            email: email,
            googleId: sub,
            avatar: picture,
        });

        await newUser.save();

        const accToken = await generateJWT({
            _id: user._id,
        });

        passportNext(null, {accToken});


    }
    } catch (error) {
        passportNext(error);
    }

});


export default googleStrategy;