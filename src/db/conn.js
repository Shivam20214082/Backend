const mongoose =require("mongoose");
mongoose.connect("mongodb://127.0.0.1/ApnaKart",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    serverSelectionTimeoutMS: 5000
    // serverSelectionTimeoutMS: 5000 // optional
}).then(()=>{
    console.log(`connection successful`);
}).catch((e)=>{
    console.log(`no connection ${e}`);
});
