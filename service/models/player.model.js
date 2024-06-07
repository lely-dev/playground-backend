import { Schema, model } from "mongoose";


const playerSchema = new Schema ({


    username:{
        type: String,
        required: true
    },

    password:{
        type: String,
        required: true
    },

    googleId:{
        type: String,
        required: false,
    },

    name:{
        type: String,
        required: true
    },

    surname:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true
    },

    bio:{
        type: String,
        required: false
    },

    avatar:{
        type: String,
        required: false
    }
},

{
    collection: "Player",
}


);


export default model ("Player", playerSchema);

