import  mongoose  from "mongoose";

const listSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    regularPrice: {
        type: Number,
        required: true
    },
    discountPrice: {
        type: Number,
        required: true
    },
    bathRooms:{
        type: Number,
        required: true
    },
    bedRooms: {
        type: Number,
        required: true
    },
    furnished:{
        type: Boolean,
        required: true
    },
    parking:{
        type: Boolean,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    offer:{
        type: Boolean,
        required: true
    },
    imageUrls: {
        type: String,
        required: true
    },
    useRef: {
        type: String,
        required: true
    },

}, { timestamps: true }
);

const List = mongoose.model('List', listSchema);