const mongoose =require('mongoose')
const SubSchema =new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please provide name of destination"],
    },
    img:{
        type:String,
        required:[true,"please provide image link of destination"],
        match:[
            /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
            'please provide a valid url'
        ]

    },
    rating:{
        type:Number,
        required:[true,"please provide rating for destination"],
        max:5.0,
        min:0,
    },
    description:{
        type:String,
        maxLength:200,
    }
})

const DestinationSchema = new mongoose.Schema({
    country:{
        type:String,
        required:[true,"please provide country name"]
    },
    destinations:{
        type:[SubSchema],
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'please provide user']
    }
})

module.exports =mongoose.model('Destination',DestinationSchema)
