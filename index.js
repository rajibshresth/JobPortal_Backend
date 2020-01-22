var express= require('express');
var myapp=new express();
var bodyParser=require('body-parser');
var path = require('path');

const Sequelize = require('sequelize');



var multer = require('multer');

var mystorage= multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'uploads')
    },

    filename: (req, file, cb) => {
        cb(null,file.originalname + '-' + Date.now() +
            path.extname(file.originalname));
    }
});

var uploads= multer({storage: mystorage});

var usermodel=require('./models/UsersModel');
var userController=require('./controllers/UsersController');

var employeemodel=require('./models/EmployeeModel');
var employeeController=require('./controllers/EmployeeController');

var authController=require('./controllers/AuthController');

var favmodel=require('./models/FavouriteModel');

var favouriteController=require('./controllers/FavouriteController');

var bookmodel=require('./models/BookemployeeModel');

var bookController=require('./controllers/BookEmployeeController');

//making api public, this is first middleware -application middleware
myapp.use(function (req,res,next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'content-type,X-Requested-With,Authorization');
    next();
})

//this will parse the json data in form body that arrives from client-browser(ajax)
myapp.use(bodyParser.json());

myapp.post('/users',uploads.single('image'),userController.userValidator,userController.confirm,userController.hashGenerator,userController.registerUser,function(req,res){

    res.status(206);
    res.send({"message":"user was registered succesfully"})

});

myapp.post('/login',authController.validator,authController.check,authController.jwtTokenGen,authController.userData);

myapp.post('/userstest',userController.hashGenerator,userController.registerUserTest,function(req,res){

    res.status(206);
    res.send({"message":"user was registered succesfully"})

});

myapp.get('/usersdetail',function(req,res) {
    employeemodel.Employee.findAll({

    })
        .then(function (result) {
            // console.log(result)
            res.json(result);
        })
        .catch(function (err) {

        })

});

myapp.get('/vieweachusers/:user_id',function(req,res) {
    // console.log(req.params.user_id);
    usermodel.User.findOne({
        where: {userId: req.params.user_id}
    })
        .then(function (result) {
            // console.log(result)
            res.json(result);
        })
        .catch(function (err) {

        })
})

myapp.put('/editmydetail/:user_id',function (req,res) {
    // console.log(req.params.user_id);
    usermodel.User.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        address: req.body.address,
        gender:req.body.gender

    }, {
        where: {
            userId: req.params.user_id
        }
    })
        .then(function(result) {
            // console.log(result)
            res.status(201);
            res.send({
                "message": "User Edited successfully"
            })
        })
        .catch(function(err) {

        })
})

myapp.post('/employeedetail',employeeController.employeeValidator,employeeController.employeeDetail,function(req,res){

    res.status(201);
    res.send({"message":"Employee work Detail was registered succesfully"})

});

myapp.post('/emptest',employeeController.employeeDetail,function(req,res){

    res.status(201);
    res.send({"message":"Employee work Detail was registered succesfully"})

});

myapp.get('/viewoneemployee/:user_id',function (req,res) {
    // console.log(req.params.user_id);
    employeemodel.Employee.findOne({
        where: {userId: req.params.user_id}
    })
        .then(function (result) {
            // console.log(result);
            res.json(result);
        })
        .catch(function (err) {
            // res.send({"message":"Your work profile is empty.. Please registered your work profile"})
            // console.log('e');
        })
});

myapp.put('/editworkdetail/:eid',function (req,res) {
    // console.log(req.params.eid);
    employeemodel.Employee.update({
       Skill: req.body.Skill,
        Experiance: req.body.Experiance,
        JobCompleted: req.body.JobCompleted,
        Language: req.body.Language,
        Payment: req.body.Payment,
        Working: req.body.Working,
        Cost:req.body.Cost,
        Available:req.body.Available

    }, {
        where: {
            employeeId: req.params.eid
        }
    })
        .then(function(result) {
            // console.log(result)
            res.status(201);
            res.send({
                "message": "Employee Work Detail Updated successfully"
            })
        })
        .catch(function(err) {

        })
});

myapp.put('/testupdate/:eid',function (req,res) {
    // console.log(req.params.eid);
    employeemodel.Employee.update({
        Skill: req.body.Skill,
        Experiance: req.body.Experiance,
        JobCompleted: req.body.JobCompleted,
        Language: req.body.Language,
        Payment: req.body.Payment,
        Working: req.body.Working,
        Cost:req.body.Cost,
        Available:req.body.Available

    }, {
        where: {
            employeeId: req.params.eid
        }
    })
        .then(function(result) {
            // console.log(result)
            res.status(201);
            res.send({
                "message": "Employee Work Detail Updated successfully"
            })
        })
        .catch(function(err) {

        })
});

myapp.delete('/deleteworkdetail/:employee_id',function (req,res) {
    // console.log(req.params.employee_id);
    employeemodel.Employee.destroy({
        where:{employeeId:req.params.employee_id}

    }).then(function (result) {
        res.status(200)
        res.send({"message":"Work Detail Deleted successfully"})
    }).catch(function (err) {
            next({"status":"500","message":"Error deleting work detail"})
        })

});

myapp.post('/addtofav',favouriteController.favouriteDetail,function(req,res){

    res.status(201);
    res.send({"message":"Added to Favourite"})

});

myapp.get('/favourite/:user_id',function (req,res) {
    // console.log(req.params.user_id);
    favmodel.Favourite.findAll({
        where: {userId: req.params.user_id}
    })
        .then(function (result) {
            // console.log(result);
            res.json(result);
        })
        .catch(function (err) {

        })
});

myapp.delete('/deletefavourite/:fav_id',function (req,res) {
    // console.log(req.params.fav_id);
    favmodel.Favourite.destroy({
        where:{favId:req.params.fav_id}

    }).then(function (result) {
        res.status(200)
        res.send({"message":"Removed from favourite"})
    }).catch(function (err) {
        next({"status":"500","message":"Error deleting  favourited"})
    })

});

myapp.get('/viewemployeedetail/:employee_id',function (req,res) {
    // console.log(req.params.employee_id);
    employeemodel.Employee.findOne({
        where: {employeeId: req.params.employee_id}
    })
        .then(function (result) {
            // console.log(result);
            res.json(result);
        })
        .catch(function (err) {
            // res.send({"message":"Your work profile is empty.. Please register your work profile"})
            // console.log('e');
        })
});

myapp.post('/employeebook',bookController.bookDetail,function(req,res){

    res.status(201);
    res.send({"message":"Successfully Hired"})

});

myapp.get('/book/:user_id',function (req,res) {
    // console.log(req.params.user_id);
    bookmodel.Book.findAll({
        where:
            {hirerid: req.params.user_id}
    })
        .then(function (result) {
            // console.log(result);
            res.json(result);
        })
        .catch(function (err) {

        })
});

myapp.delete('/deletebook/:book_id',function (req,res) {

    bookmodel.Book.destroy({
        where:{bookId:req.params.book_id}

    }).then(function (result) {
        res.status(200)
        res.send({"message":"Removed from favourite"})
    }).catch(function (err) {
        next({"status":"500","message":"Error deleting  favourited"})
    })

});

myapp.get('/employeebookdetail/:user_id',function (req,res) {
    // console.log(req.params.user_id);
    bookmodel.Book.findAll({
        where:
            {userId: req.params.user_id}
    })
        .then(function (result) {
            // console.log(result);
            res.json(result);
        })
        .catch(function (err) {

        })
});

myapp.put('/editbookstatus/:bookid',function (req,res) {
    // console.log(req.params.eid);
    bookmodel.Book.update({
        status:req.body.status,
        Available:req.body.Available,
    }, {
        where: {
            bookId: req.params.bookid
        }
    })
        .then(function(result) {
            // console.log(result)
            res.status(201);
            res.send({
                "message": "Status Updated successfully"
            })
        })
        .catch(function(err) {

        })
});

/*hosting uploads folder */

var publicDir = require('path').join(__filename,'/uploads');
myapp.use(express.static(publicDir));

myapp.use(express.static('public'));

//Serves all the request which includes /images in the url from Images folder
myapp.use('/uploads', express.static(__dirname + '/uploads'));


myapp.get("/uploads",function(req,res,next){
    res.send(publicDir)
});

myapp.post("/uploads",uploads.single('image'),function(req,res,next){
    // res.send(publicDir)
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(req.file)


});

myapp.use(function (err,req,res,next) {
     res.status(err.status);
    res.send({"message":err.message});

    // console.log(err.status);
    // console.log(err.message);

});
myapp.listen(3000);

module.exports=myapp;
