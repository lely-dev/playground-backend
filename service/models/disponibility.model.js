import { Schema, model } from "mongoose";

const disponibilityField = new Schema({

    from:{
        type: Date,
        require: true
    },

    to:{
        type: Date,
        required: true
    },

    fieldId:{
        type: Schema.Types.ObjectId,
        ref: 'Field',
        required: true
    },

    isBooked: {
        type: Boolean,
        default: false
    }
})

export default model ("Disponibility", disponibilityField);