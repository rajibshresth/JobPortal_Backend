const chai=require('chai');
const chaiHttp=require('chai-http');
const should=chai.should();
const chaiLike=require('chai-like');
const chaiThings=require('chai-things');

const server=require('../index');
var serverRun;
// console.log(dayjobapp);
chai.use(chaiHttp);
chai.use(chaiLike);
chai.use(chaiThings);

// before(function (done) {
//     serverRun=server.listen(3000,done);
// });
//
// after(function (done) {
//     serverRun.close(done)
// });
before(done => {
    serverRun=server.listen(3001,done);
});

after(done => {
    serverRun.close(done);
});


//get favourite

describe('Favourite',function () {
    describe('Get value of favourite for hirer',function(){

        var user_id=4;
        it('it should get value all the favourite of particular user',function (done) {
            chai.request(server)
                .get('/favourite/'+user_id)
                .send()

                .end(function (err,res) {
                    res.should.have.status(200);
                    should.exist(res.body);
                    res.body.should.be.a('array');
                    done();
                });

        })

    })
})

//get Employeebookdetail

describe('BookEmployee',function () {
    describe('Get value of employeebookdetail for Employee',function(){

        var user_id=4;
        it('it should get value all the book detail done by hirer for that particular user',function (done) {
            chai.request(server)
                .get('/employeebookdetail/'+user_id)
                .send()

                .end(function (err,res) {
                    res.should.have.status(200);
                    should.exist(res.body);
                    res.body.should.be.a('array');
                    done();
                });

        })

    })
})

//get Employeebookdetail

describe('Employee',function () {
    describe('Get value of employee detail',function(){

        it('it should get value all the Employee detail  ',function (done) {
            chai.request(server)
                .get('/usersdetail')
                .send()

                .end(function (err,res) {
                    res.should.have.status(200);
                    should.exist(res.body);
                    res.body.should.be.a('array');
                    done();
                });

        })

    })
})

describe('EmployeeBook',function () {
    describe('Get value of Book detail',function(){
    var userid="1"
        it('it should get value all the Book detail  for particular user',function (done) {
            chai.request(server)
                .get('/book/'+userid)
                .send()

                .end(function (err,res) {
                    res.should.have.status(200);
                    should.exist(res.body);
                    res.body.should.be.a('array');
                    done();
                });

        })

    })
})

describe('Users',function () {
    describe('Get value of user detail for single usesr',function(){
        var userid="8";
        it('it should get value all the user detail  for particular user',function (done) {
            chai.request(server)
                .get('/vieweachusers/'+userid)
                .send()

                .end(function (err,res) {
                    res.should.have.status(200);
                    should.exist(res.body);
                    res.body.should.be.a('object');
                    done();
                });

        })

    })
});


//for hirer
describe('Employee',function () {
    describe('Get value of Employee detail for single usesr',function(){
        var userid="7";
        it('it should get value all the employe work detail  for particular user',function (done) {
            chai.request(server)
                .get('/viewoneemployee/'+userid)
                .send()

                .end(function (err,res) {
                    res.should.have.status(200);
                    should.exist(res.body);
                    res.body.should.be.a('object');
                    done();
                });

        })

    })
});

//for employee
describe('Employee',function () {
    describe('Get value of Employee detail for single employeeid',function(){
        var eid="5";
        it('it should get value all the employe work detail  for particular employdid',function (done) {
            chai.request(server)
                .get('/viewemployeedetail/'+eid)
                .send()

                .end(function (err,res) {
                    res.should.have.status(200);
                    should.exist(res.body);
                    res.body.should.be.a('object');
                    done();
                });

        })

    })
});

//deletetest

describe('Employee',function () {
    describe('Delete work detail by Employee',function(){

        var employeeId=7;
        it('it should delete work profil',function (done) {
            chai.request(server)
                .delete('/deleteworkdetail/'+employeeId)
                .send()

                .end(function (err,res) {
                    res.should.have.status(200);
                    // res.body.should.be.an('message');
                    done();
                });

        })

    })
})


//delete favourite

describe('Favourite',function () {
    describe('Delete Favourite detail by hirer',function(){

        var favId=1;
        it('it should delete favourite ',function (done) {
            chai.request(server)
                .delete('/deletefavourite/'+favId)
                .send()

                .end(function (err,res) {
                    res.should.have.status(200);
                    // res.body.should.be.an('message');
                    done();
                });

        })

    })
})


describe('Book',function () {
    describe('Delete Book detail by hirer',function(){

        var bookId=1;
        it('it should delete Book ',function (done) {
            chai.request(server)
                .delete('/deletebook/'+4)
                .send()

                .end(function (err,res) {
                    res.should.have.status(200);
                    // res.body.should.be.an('message');
                    done();
                });

        })

    })
})


//book update test
describe('Booking',function () {
    describe('update booking detail by Employee',function(){

        var book_id=6;
        it('it should update available and status',function (done) {
            chai.request(server)
                .put('/editbookstatus/'+book_id)
                .send({'status':'1','Available':'0'})

                .end(function (err,res) {
                    res.should.have.status(201);
                    res.body.should.be.an('object');
                    done();
                });

        })

    })
})


//update work Profile
describe('Employee',function () {
    describe('update employee detail by Employee',function(){

        var empid=4;
        it('it should update Employee work profile ',function (done) {
            chai.request(server)
                .put('/editworkdetail/'+empid)
                .send({'Skill':'Carpentry','Experiance':'5years','JobCompleted':'woodwork',
                    'Language':'Nepali','Payment':'Check','Working':'7 days','Cost':'500','Available':'1'})

                .end(function (err,res) {
                    res.should.have.status(201);
                    res.body.should.be.an('object');
                    done();
                });

        })

    })
})

//user update
describe('User',function () {
    describe('update user detail by Employee',function(){

        var userid=6;
        it('it should update User profile ',function (done) {
            chai.request(server)
                .put('/editmydetail/'+userid)
                .send({'firstName':'hari','lastName':'magar','phone':'9849241522',
                'address':'tokyo','gender':'female'})

                .end(function (err,res) {
                    res.should.have.status(201);
                    res.body.should.be.an('object');
                    done();
                });

        })

    })
})


//post employee
describe('Employee',function () {
    describe('post employee ',function(){
      var test={'userId':'15','Skill':'Carpentry','Experiance':'5 years','JobCompleted':'donething','Language':'Nepali','Payment':'check','Working':'5d','Cost':'5000', 'Available':'1', 'image':'sdfs','firstName':'Sujan', 'lastName':'Maharjan','phone':'9849248922','address':'Sunakothi', 'email':'hello','gender':'Male'}
        it('it should register a Employee work detail',function (done) {
            chai.request(server)
                .post('/emptest')
                .send(test)
                .end(function (err,res) {
                    res.should.have.status(201);
                    res.body.should.be.an('object');
                    done();
                });

        })

    })
})

//post for favourite
describe('Favourite',function () {
    describe('post favourite ',function(){
      var test={'employeeId':'20','userId':'4','Skill':'Carpentry',
          'Experiance':'1 years','JobCompleted':'Many wood works','Language':'Nepali',
          'Payment':'Cash Only','Working':'Week Days Only','Cost':'350','Available':'1',
          'image':'person_2.jpg-1561832818249.jpg','firstName':'Sanam','lastName':'Rai',
          'phone':'984248222','address':'Lagankhel',
          'email':'sanam@gmail.com','gender':'Female'}
        it('it should save favourite Data',function (done) {
            chai.request(server)
                .post('/addtofav')
                .send(test)
                .end(function (err,res) {
                    res.should.have.status(201);
                    res.body.should.be.an('object');
                    done();
                });

        })

    })
})

//post for book
describe('Booking',function () {
    describe('book Employee ',function(){
        var test={'hirerid':'22','hirerfirstName':'sujan','hirerlastName':'maharjan',
            'hirerphone':'98472828',
            'hireraddress':'lalitpur','hireremail':'serenade10','hirerimage':'20190611_145350.jpg-1562501092242.jpg',
            'employeeId':'20','userId':'4','Skill':'Carpentry',
            'Experiance':'1 years','JobCompleted':'Many wood works','Language':'Nepali',
            'Payment':'Cash Only','Working':'Week Days Only','Cost':'350','Available':'1',
            'image':'person_2.jpg-1561832818249.jpg','firstName':'Sanam','lastName':'Rai',
            'phone':'984248222','address':'Lagankhel',
            'email':'sanam@gmail.com','gender':'Female','status':'0'}
        it('it should save Booking Data',function (done) {
            chai.request(server)
                .post('/employeebook')
                .send(test)
                .end(function (err,res) {
                    res.should.have.status(201);
                    res.body.should.be.an('object');
                    done();
                });

        })

    })
})