const mongoose = require('mongoose');

var notEmpty = (features) => {
    if(features.length < 2){return false}
    else {return true};
}

const PrimaryObjectSchema = new mongoose.Schema({
    name:{
        type:String,
        minlength:[3, "Name must be at least 3 characters"]
    }

}, { timestamps: true })

mongoose.model("PrimaryObject", PrimaryObjectSchema);

// question: {
//     type: String,
//     minlength: [10, "A needs at least 10 characters"]
// },
// options: {
//     type:[{
//         text:"",
//         count:0,
//     }],
//     validate:[notEmpty,"Array needs at least 2 options"]
// }