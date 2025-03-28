// getting express
const express = require('express');
const app = express();

// getting third party middlware
const morgan = require('morgan');
app.use(morgan('dev'));

// express cant read post data so to help it 
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// helps to add css and javascript 
app.use(express.static(__dirname + '/public'));

// helps to add html/ejs file 
app.set("views",__dirname+"/views");
app.set("view engine",'ejs');


// Database work
const mongoose = require('mongoose');
const connection = mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected To DataBase")
})
const userSchema = new mongoose.Schema({
    Email:String,
    Password:String
})
const userMOdel = mongoose.model('user',userSchema);




// req to server 
app.get('/',(req,res)=>{
    res.render('index');
});
app.get('/make',async (req,res)=>{
    const newUser = await userMOdel.create({
        Email:"bhai@gmail.com",
        Password:"122njdosk"
    })
    res.send(newUser);
});

//post to server 
app.post('/get-form-data',async (req,res)=>{
    console.log(req.body);
    const {Email,password} = req.body;
    const newUser = await userMOdel.create({
        Email:Email,
        Password:password
    })
    res.send(newUser);
})

app.get('/get-users',(req,res)=>{
    userMOdel.find().then((users)=>{
        res.send(users);
    })
});
//starting the server 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
