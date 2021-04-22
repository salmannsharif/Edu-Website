const express=require("express");
const path=require("path");
const fs=require("fs");
const port=80;
const hostname="127.0.0.1";
const app=express();

// for serving static files
app.use("/static", express.static("static"));
app.use(express.urlencoded())

// set the templates
app.set("view engine", "pug");
app.set("views", path.join(__dirname,("views")))

app.get("/",(req,res)=>{
    res.render("index.pug")
})

app.get("/contact",(req,res)=>{
    res.status(200).render("contact.pug")
})


app.post("/contact",(req,res)=>{
    name=req.body.name
    age=req.body.age
    email=req.body.email
    address=req.body.address

    var output=`Name:${name} , Age:${age},
    Email:${email},Address:${address}`
    
    fs.writeFileSync("data.txt",output);

    console.log(output)
    
    res.status(200).render("index.pug");
})

app.listen(port,()=>{
    console.log(`Server Running At : http://${hostname}:${port}`);
})