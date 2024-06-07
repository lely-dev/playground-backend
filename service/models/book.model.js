import { Schema, model } from "mongoose";


const bookSchema = new Schema({

    player:{
        type: Schema.Types.ObjectId,
        ref: 'Player',
        require: true
    },

    disponibility:{
        type: Schema.Types.ObjectId,
        ref: 'Disponibility',
        require: true
    },

})


export default model ('Book', bookSchema);