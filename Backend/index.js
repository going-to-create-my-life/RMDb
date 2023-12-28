const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const exhbs = require('express-handlebars');
const cookieParser = require("cookie-parser");
const port = 3000;
const auth = require('./auth.js');
var helpers = require('handlebars-helpers')();
// const gcookie = require('./cookie.js');
const sqlite3 = require('sqlite3').verbose();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const multer = require('multer');
let sql;
var gemail;
var error;
require('./google');
const login = `<li class="loginLink"><a href="#">LOG In</a></li>`;
const logout = ` <form method="post" action="/logout"><button class="btn" type="submit" style=" border: none;
background-color: inherit;
font-size: 16px;
cursor: pointer;
color: white;
padding: 0px 2vh;
display: inline-block;
margin: 0vh -2vh;
font-weight: inherit;">Logout</button></form>`;
const profile = `<li class="btn"><a href='/dashboard'>Profile</a></li>`;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'../Frontend/public/images/profilepic'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    console.log(file);
    cb(null, `${uniqueSuffix}.png`);
  }
})

const upload = multer({ storage: storage })

function getAllPromise(query, params) {
  return new Promise((resolve, reject) => {

      db.all(query, params, (err, rows) => {

          if(err) {
            console.log(err);
            res.redirect('/dashboard')
          }

          // "return" the result when the action finish
          resolve(rows);
      })
  })
}

app.use(cookieParser());
// connect to db
const db = new sqlite3.Database("/home/sourav/Documents/RMdb/Backend/index.db", sqlite3.OPEN_READWRITE,(err)=>{
    if(err) return console.error(err.message);
});


const authd = async (req,res,next) =>{
try {  console.log(error);
console.log("ENTER");
console.log(req.cookies.jwt);
  if(!(req.cookies.jwt)){
    //for google oauth
    var myjwt = jwt.sign({
      email : gemail.email
    }, 'RMDb', { expiresIn: '1d' });
    let minute = 24 * 60 * 60 * 1000;
    res.cookie("jwt",myjwt, { maxAge: minute });
    let decoded =  jwt.verify(myjwt,"RMDb");
    gemail = "";
    sql = `SELECT * FROM users WHERE email= ? `;
    let row = await getAllPromise(sql,[decoded.email]);
    row = row[0];
      console.log(row);
      return res.render('userprofile',{
        Profile : profile,
        Logout : logout,
        Email: decoded.email,
        Pic : row.pic,
        Username : row.username,
        Country: row.Country,
        State: row.State,
        OldPass : "google",
        erro : error
      });
  }

  else{
    //for login option
    let cookie = req.cookies.jwt;
    let decoded =  jwt.verify(cookie,"RMDb")
  if(decoded.email){
    sql = `SELECT * FROM users WHERE email= ? `;
    let row = await getAllPromise(sql,[decoded.email]);
    row = row[0];
      console.log(row);
      return res.render('userprofile',{
        Profile : profile,
        Logout : logout,
        Email: decoded.email,
        Pic : row.pic,
        Username : row.username,
        Country: row.Country,
        State: row.State,
        OldPass : "google",
        erro : error
      });
  }
  error="";
  }
  }
catch (err) {
  return console.error(err.message);
}
};

// setup hbs START
app.engine('hbs',exhbs.engine({
  extname:'.hbs',
  defaultLayout:'main',
  layoutsDir: path.join(__dirname,'/../Frontend/views/template')
}))
app.set('view engine','hbs');
//setup hbs END

//setup CSS And JS START
app.use(express.static(__dirname + '/../Frontend/public'));
//setup CSS And JS END

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded


app.get('/',auth, (req, res) => { 
  res.render('index',{
    Profile : profile,
    Logout : logout
  });
});

app.all('/moviegrid',auth, async (req, res) => {
  let name = req.body.moviename || '';
  let genres = req.body.genres || '';
  let ott = req.body.ott || '';
  let erro = 'Result for name = '+name+' , genres = '+genres+' , ott = '+ott;
  let inputpage = req.query.page || 1;
  let number = req.query.number || 12;
  if(name!= '' || genres!='' || ott!=''){
    number= 100;
  }else{
    erro = '';
  }
  let sort = req.query.sort || 'name';
  let page = ((parseInt(inputpage)-1)*number);
  if(page<0){
    res.render('404',{
      layout : "extra"
    })
  }
  else{
    let row = await getAllPromise(`SELECT * FROM allmovies WHERE name LIKE '%${name}%' AND genres LIKE '%${genres}%' AND ott LIKE '%${ott}%' ORDER BY ${sort} LIMIT ${page},${number}`);
    res.render('moviegrid',{
      Profile : profile,
      Logout : logout,
      erro: erro,
      row: row,
      page : inputpage,
      number: number,
      sor: sort,
      name: name,
      genres: genres
    });
  }
});

app.all('/movielist',auth, async (req, res) => {
  let name = req.body.moviename || '';
  let genres = req.body.genres || '';
  let ott = req.body.ott || '';
  let erro = 'Result for name = '+name+' , genres = '+genres+' , ott = '+ott;
  let inputpage = req.query.page || 1;
  let number = req.query.number || 5;
  if(name!= '' || genres!='' || ott!=''){
    number= 100;
  }else{
    erro = '';
  }
  let sort = req.query.sort || 'name';
  let page = ((parseInt(inputpage)-1)*number);
  if(page<0 ){
    res.render('404',{
      layout : "extra"
    })
  }
  else{
    let row = await getAllPromise(`SELECT * FROM allmovies WHERE name LIKE '%${name}%' AND genres LIKE '%${genres}%' AND ott LIKE '%${ott}%' ORDER BY ${sort} LIMIT ${page},${number}`);
    res.render('movielist',{
      Profile : profile,
      Logout : logout,
      erro : erro,
      row: row,
      page : inputpage,
      number: number,
      sor: sort,
      name: name,
      genres: genres
    });
  }
});

app.get('/movies',auth, async (req, res) => {
  console.log(req.query);
  let row = await getAllPromise('SELECT * FROM allmovies WHERE name = ? ',[req.query.movie.replaceAll('%20',' ')]);
  let inputpage = req.query.page || 1;
  let page = ((parseInt(inputpage)-1)*4);
  if(req.url.replaceAll('/movies','').replaceAll('?','').replaceAll('%20','')=='' || row[0] == undefined || page<0){
    res.render('404',{
    layout : "extra"
    })
  }
  else{
    console.log(page);
    let review = await getAllPromise(`SELECT * FROM ${req.query.movie.replaceAll(' ','').replaceAll('-','').replaceAll(':','').replaceAll('.','') + "reviews"} LIMIT ${page},4 `,[]);
    let crew = await getAllPromise(`SELECT * FROM ${req.query.movie.replaceAll(' ','').replaceAll('-','').replaceAll(':','').replaceAll('.','') + "crew"}`,[]);
    let photos = await getAllPromise(`SELECT Jawanp FROM photos`,[]);
    let videos = await getAllPromise(`SELECT Jawanv FROM videos`,[]);
    console.log(row);
  row = row[0];
  res.render('moviesingle',{
    Profile : profile,
    Logout : logout,
    name: row.name,
    rating: row.rating,
    overview: row.overview,
    img: row.img,
    time: row.time,
    release: row.release,
    director: row.director,
    writer: row.writer,
    stars: row.stars,
    genres: row.genres,
    trailer: row.trailer,
    ott: row.ott,
    review: review,
    crew: crew,
    photos: photos,
    videos: videos,
    page: inputpage
  })
  }
});

app.get('/celebrity',auth, (req, res) => {
  res.render('celebritygrid',{
    Profile : profile,
    Logout : logout
  })
});

app.get('/celebritysingle',auth, (req, res) => {
  res.render('celebritysingle',{
    Profile : profile,
    Logout : logout
  })
});

app.get('/dashboard',authd,(req, res) => { 
  res.render('userprofile',{
    Profile : profile,
    Logout : logout,
  });
});

app.get('/404', (req, res) => {
  res.render('404', {layout : 'extra'});
});

app.get('/comingsoon', (req, res) => {
  res.render('comingsoon', {layout : 'extra'});
});

app.post('/login' , (req,res)=>{
  sql = ` SELECT pic FROM users WHERE email = ? AND password = ?`;
    db.get(sql, [req.body.username,req.body.password], (err,row) =>{
        if(err) return console.error(err.message);
        else{
           if(row != undefined){
            var loginjwt = jwt.sign({
              email : req.body.username
            }, 'RMDb', { expiresIn: '1d' });
            let minute = 24 * 60 * 60 * 1000;
            res.cookie("jwt",loginjwt, { maxAge: minute });
            res.redirect('/dashboard');
           }
           else{
            res.render('index',{
                erro : "Either username or password is Wrong",
                Login: `<li class="loginLink"><a href="#">LOG In</a></li>`,
                Signup : `<li class="btn signupLink"><a href="/auth/google">Signup via Google</a></li>`,
            })
           }
        }
    });
});

// GOOGLE AUTH START

app.use(passport.initialize());
// app.use(passport.session());


app.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
  passport.authenticate( 'google', {
    failureRedirect: '/auth/google/failure'
  }),
  function(req, res) {
    // Successful authentication, redirect home.
    gemail = req._user;
    res.redirect('/dashboard');
  }
);
// GOOGLE AUTH END

app.post('/update',auth,(req,res)=>{
  let updatecookie =  jwt.verify(req.cookies.jwt,"RMDb")
    sql= ` UPDATE users SET Country="${req.body.Country}" WHERE email="${updatecookie.email}"`;
    db.run(sql);
    sql= ` UPDATE users SET State="${req.body.State}" WHERE email="${updatecookie.email}"`;
    db.run(sql);
    sql= ` UPDATE users SET username="${req.body.username}" WHERE email="${updatecookie.email}"`;
    db.run(sql);
    console.log("DONE DONE");
    error = "Your information is successfully updated!!"
    res.redirect('/dashboard')
});

app.post('/updatepass',auth,async (req,res)=>{
    let updatecookie =  jwt.verify(req.cookies.jwt,"RMDb");
    let row = await getAllPromise(`SELECT password FROM users WHERE email="${updatecookie.email}"`,[])
    if(req.body.newpass==req.body.renewpass && row[0].password==req.body.oldpass){
        
        sql = `UPDATE users SET password="${req.body.newpass}" WHERE email="${updatecookie.email}"`;
        await getAllPromise(sql,[]);

        if(error!="Something is wrong in provided passwords"){
          console.log("dd");
          error = "Password Changed Successfully"
          res.redirect('/dashboard')
        }
    }
    else{ console.log("de"); error="Something is wrong in provided passwords"
      res.redirect('/dashboard') 
    }
    
});

app.post('/updateavatar', upload.single('avatar'), async function (req, res, next) {
  let decoded = jwt.verify(req.cookies.jwt,"RMDb");
  if(req.file != undefined){
  let row = await getAllPromise("UPDATE users SET pic = ? WHERE email = ? ",["/images/profilepic/"+req.file.filename,decoded.email])
}
  return res.redirect('/dashboard');
});

app.get('/searchmovie',auth, async (req,res)=>{
  let name = req.body.moviename;
  let genres = req.body.genres;
  let ott = req.body.ott;
  if(req.rawHeaders[13].replaceAll('http://localhost:3000/','') == 'moviegrid'){
    let inputpage = req.query.page || 1;
    let number = req.query.number || 12;
    let sort = req.query.sort || 'name';
    let page = ((parseInt(inputpage)-1)*number);
    if(page<0){
      res.render('404',{
        layout : "extra"
      })
    }
    else{
      if(name == '' && genres == '' && ott == 'de'){
      let row = await getAllPromise(`SELECT * FROM allmovies ORDER BY ${sort} LIMIT ${page},${number}`);
      }
      let row = await getAllPromise(`SELECT * FROM allmovies WHERE name LIKE '%${name}%' ORDER BY ${sort} LIMIT ${page},${number}`);
      res.render('moviegrid',{
        Profile : profile,
        Logout : logout,
        row: row,
        page : inputpage,
        number: number,
        sor: sort
      });
    }
  }
  else{

    
  }

});

app.post('/logout',(req,res)=>{
  res.clearCookie("jwt");
  res.redirect('/');
});


app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port ${port}`);
})