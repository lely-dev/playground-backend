import { Schema, model } from "mongoose";


const fieldSchema = new Schema({

    name:{
        type: String,
        required: false
    },

    typology:{
        type: String,
        required: true
    },

    image:[{
        type:String,
        required: false
    }],

    description:{
        type:String,
        required: true
    },

    center:{
        type: Schema.Types.ObjectId,
        ref: 'Center',
        required: true
    }

})


export default model ('Field', fieldSchema);


