const express = require('express');
const path = require('path');
const port = 8000;
const app = express();




app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

//for storing data in ram
app.use(express.urlencoded());




// //calling first middleware 

// app.use(function (req, res, next) {
//    console.log("middleware 1 called");
//    next();
// })

// //calling second middleware 

// app.use(function (req, res, next) {
//    console.log("middleware 2 called");
//    next();
// })





//acessing static files 

app.use(express.static("assets"));






var contactList = [
   {
      name: "Nitin kumar singh",
      phone: "7462070700"
   },
   {
      name: "rajesh",
      phone: "8084517922"
   },
   {
      name: "prem",
      phone: "111111111"
   }
]


//for home ejs
app.get('/', function (req, res) {
   return res.render('home', {
      tittle: "my contact_list",
      contact_List: contactList

   });
});



//foe pratice ejs
app.get('/pratice', function (req, res) {
   return res.render('pratice', {
      tittle: "playing"
   })
})



// taking data trough form and storing data on ram at home 
app.post('/create-contact', function (req, res) {
   contactList.push(req.body)

   // we also write this 
   // contactList.push({
   //    name:req.body.name,
   //    phone:req.body.phone
   // })

   return res.redirect("/")


});

// for deleting   contact
app.get('/delete-contact/:phone',function(req,res){
   

// get the string from url
   let phone=req.params.phone;


   let contactIndex=contactList.findIndex(contact =>contact.phone==phone);
   
   if(contactIndex != -1){
      contactList.splice(contactIndex,1);
   }
   return res.redirect('back');

})



app.listen(port, function (err) {
   if (err) {
      console.log('error persent', err);
      return;
   }
   console.log('server is running on port', port);

});