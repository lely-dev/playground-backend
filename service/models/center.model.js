import { Schema, model } from "mongoose";

const centerSchema = new Schema ({


    username:{
        type: String,
        required: true
    },

    password:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true
    },

    name:{
        type: String,
        required: true
    },

    pi:{
        type: String,
        required: true
    },

    address:{
        type: String,
        required: true
    },

    cap:{
        type: String,
        required: true
    },

    city:{
        type: String,
        required: true
    },

    country:{
        type: String,
        required: true
    },

    logo:{
        type: String,
        required: false
    },

    bio:{
        type: String,
        required: false
    },

    comment: [
        {
            player:{
                type: Schema.Types.ObjectId,
                ref: 'Player'
            },

            description:{
                type: String,
                require: true
            },

            rate:{
                type:String,
                required: true
            }

        }
    ]
},

{
    collection: "Center",
}


);

export default model ("Center", centerSchema);