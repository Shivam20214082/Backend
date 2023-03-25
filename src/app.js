const express= require("express");
const path=require("path");
const app=express();
const hbs=require("hbs");

require("./db/conn");

const User=require("./models/usermessage");
const User1=require("./models/userlogin");
const port=process.env.PORT || 3000;

const static_path=path.join(__dirname,"../public");
const templates_path=path.join(__dirname,"../templates/views");
const partials_path=path.join(__dirname,"../templates/partials");
// console.log(path.join(__dirname," ../public"));


app.use(express.urlencoded({extended:false}))
app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use(express.static(static_path));
app.use(express.json());
app.set("view engine" , "hbs");
app.set("views",templates_path);
hbs.registerPartials(partials_path);

app.get("/",(req,res)=>{
    res.render("index")
});
app.get("/login",(req,res)=>{
    res.render("login")
});
app.get("/cart",(req,res)=>{
    res.render("cart")
});
app.get("/contact",(req,res)=>{
    res.render("contact")
});
app.get("/daal",(req,res)=>{
    res.render("daal")
});
app.get("/payment",(req,res)=>{
    res.render("payment")
});
app.get("/about",(req,res)=>{
    res.render("about")
});
app.get("/404",(req,res)=>{
    res.render("404")
});
app.get("/daal",(req,res)=>{
    res.render("daal")
});

app.post("/contact",async(req,res)=>{

    try{
        // res.send(req.body);
        const userData= new User(req.body);
        await userData.save();
        res.status(201).render("index");
    
    }
    catch(error){
        res.status(500).send(error);
    }
})


app.post("/login",async(req,res)=>{

    try{
        // res.send(req.body);
        // sessionStorage.setItem('loggedIn', true);
        const userData= new User1(req.body);
        await userData.save();
        res.status(201).render("index");
    
    }
    catch(error){
        res.status(500).send(error);
    }
})

app.listen(port, ()=>{
    console.log(`server is running at port no ${port}`);
})