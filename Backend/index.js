const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const exhbs = require('express-handlebars');
const cookieParser = require("cookie-parser");
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
  // let data = await getAllPromise(`SELECT * FROM users WHERE email="souravsingla335@gmail.com"`);
  // let b = await getAllPromise(`SELECT * FROM allmovies`);
  // let a = {};
  // let n=0;
  // for(let i=6; i<Object.keys(data[0]).length;i++){
  //   if(Object.values(data[0])[i]=="YES"){a[n++]=Object.keys(data[0])[i]}
  // }
  // for(let i=0;i<n;i++){
  //     for(let j=0;j<b.length;j++){
  //       if(a[i]==b[j].name.replaceAll('-','').replaceAll(':','').replaceAll('.','').replaceAll(' ','')){a[i]=b[j];}
  //     }
  // }
  let inputpage = req.query.page || 1;
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
      let b = await getAllPromise(`SELECT * FROM allmovies`);
      let a = {};
      let n=0;
      for(let i=6; i<Object.keys(row).length;i++){
        if(Object.values(row)[i]=="YES"){a[n++]=Object.keys(row)[i]}
      }
      let all= {};
      n = 0;
      for(let i=(parseInt(inputpage)-1)*5;i<(parseInt(inputpage))*5;i++){
          for(let j=0;j<b.length;j++){
            if(a[i]==b[j].name.replaceAll('-','').replaceAll(':','').replaceAll('.','').replaceAll(' ','')){all[n++]=b[j];}
          }
      }
      console.log(all);
      return res.render('userprofile',{
        Profile : profile,
        Logout : logout,
        Email: decoded.email,
        Pic : row.pic,
        Username : row.username,
        Country: row.Country,
        State: row.State,
        OldPass : "google",
        erro : error,
        fav: all,
        page : inputpage
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
      let b = await getAllPromise(`SELECT * FROM allmovies`);
      let a = {};
      let n=0;
      for(let i=6; i<Object.keys(row).length;i++){
        if(Object.values(row)[i]=="YES"){a[n++]=Object.keys(row)[i]}
      }
      let all = {};
      n = 0;
      for(let i=(parseInt(inputpage)-1)*5;i<(parseInt(inputpage))*5;i++){
          for(let j=0;j<b.length;j++){
            if(a[i]==b[j].name.replaceAll('-','').replaceAll(':','').replaceAll('.','').replaceAll(' ','')){all[n++]=b[j];}
          }
      }
      console.log(all);
      return res.render('userprofile',{
        Profile : profile,
        Logout : logout,
        Email: decoded.email,
        Pic : row.pic,
        Username : row.username,
        Country: row.Country,
        State: row.State,
        OldPass : "google",
        erro : error,
        fav: all,
        page : inputpage
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

//rendering start
app.get('/',auth, async (req, res) => { 
  let netflix = await getAllPromise(`SELECT * FROM allmovies WHERE ott LIKE '%Net%'`);
  let prime = await getAllPromise(`SELECT * FROM allmovies WHERE ott LIKE '%Amazon%'`);
  let hotstar = await getAllPromise(`SELECT * FROM allmovies WHERE ott LIKE '%Hotstar%'`);
  let theature = await getAllPromise(`SELECT * FROM allmovies WHERE ott LIKE '%Theature%'`);
  let celebrity = await getAllPromise(`SELECT * FROM allcelebrities`);
  let movie = await getAllPromise(`SELECT * FROM allmovies`);
  res.render('index',{
    Profile : profile,
    Logout : logout,
    netflix: netflix,
    prime: prime,
    hotstar: hotstar,
    theature: theature,
    celebrity: celebrity,
    movie: movie
  });
});

app.all('/moviegrid',auth, async (req, res) => {
  let name = req.body.moviename || '';
  if(req.query.name != undefined){name = req.query.name};
  let genres = req.body.genres || '';
  let ott = req.body.ott || '';
  let erro = 'Result for name = '+name+' & genres = '+genres+' & ott = '+ott;
  let inputpage = req.query.page || 1;
  let number = req.query.number || 12;
  if(name!= '' || genres!='' || ott!=''){
    number= 100;
  }else{
    erro = '';
    number==100? number=12:number=number;
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
  let erro = 'Result for name = '+name+' & genres = '+genres+' & ott = '+ott;
  let inputpage = req.query.page || 1;
  let number = req.query.number || 5;
  if(name!= '' || genres!='' || ott!=''){
    number= 100;
  }else{
    erro = '';
    number==100? number=5:number=number;
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
  let inputpage = req.query.page || 1;
  let page = ((parseInt(inputpage)-1)*4);
  if(req.url.replaceAll('/movies','').replaceAll('?','').replaceAll('%20','')==''|| page<0 || req.query.movie==''){
    res.render('404',{
      layout : "extra"
    })
  }
  else{
    let row = await getAllPromise('SELECT * FROM allmovies WHERE name = ? ',[req.query.movie.replaceAll('%20',' ')]);
    if(row[0]==undefined){res.render('404',{
      layout : "extra"
    })}
    else{
    let fav = await getAllPromise(`SELECT ${req.query.movie.replaceAll(' ','').replaceAll('-','').replaceAll(':','').replaceAll('.','')} FROM users WHERE email="${jwt.verify(req.cookies.jwt,"RMDb").email}"`)
    if(fav==undefined){fav="NO"}
    else{ fav = Object.values(fav[0])[0];}
    console.log(fav);
    let review = await getAllPromise(`SELECT * FROM ${req.query.movie.replaceAll(' ','').replaceAll('-','').replaceAll(':','').replaceAll('.','') + "reviews"} LIMIT ${page},4 `,[]);
    let crew = await getAllPromise(`SELECT * FROM ${req.query.movie.replaceAll(' ','').replaceAll('-','').replaceAll(':','').replaceAll('.','') + "crew"}`,[]);
    let photos = await getAllPromise(`SELECT Jawanp FROM photos`,[]);
    let videos = await getAllPromise(`SELECT Jawanv FROM videos`,[]);
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
    page: inputpage,
    fav : fav
  })}
  }
});

app.all('/celebrity',auth, async (req, res) => {
  let name = req.body.cname || '';
  if(req.query.name != undefined){name = req.query.name};
  let profesion = req.body.profesion || '';
  let erro = 'Result for name = '+name+' & profesion = '+profesion;
  let inputpage = req.query.page || 1;
  let number = req.query.number || 9;
  if(name!= '' || profesion!=''){
    number= 100;
  }else{
    erro = '';
    number==100? number=9:number=number;
  }
  let sort = req.query.sort || 'name';
  let page = ((parseInt(inputpage)-1)*number);
  if(page<0){
    res.render('404',{
      layout : "extra"
    })
  }
  else{
    let row = await getAllPromise(`SELECT * FROM allcelebrities WHERE name LIKE '%${name}%' AND profesion LIKE '%${profesion}%' ORDER BY ${sort} LIMIT ${page},${number}`);
    res.render('celebritygrid',{
      Profile : profile,
      Logout : logout,
      erro: erro,
      row: row,
      page : inputpage,
      number: number,
      sor: sort,
      name: name,
      profesion: profesion
    });
  }
});

app.get('/celebrities',auth,async (req, res) => {
  if(req.url.replaceAll('/celebrities','').replaceAll('celebrity','').replaceAll('=','').replaceAll('?','').replaceAll('%20','')==''){
    res.render('404',{
      layout : "extra"
    })
  }
  else{
    let row = await getAllPromise('SELECT * FROM allcelebrities WHERE name = ? ',[req.query.celebrity.replaceAll('%20',' ')]);
    if(row[0]==undefined){res.render('404',{
      layout : "extra"
    })}
    else{
      let main = await getAllPromise(`SELECT * FROM ${req.query.celebrity.replaceAll(' ','').replaceAll('-','').replaceAll(':','').replaceAll('.','')}`,[]);
  row = row[0];
  res.render('celebritysingle',{
    Profile : profile,
    Logout : logout,
    name: row.name,
    img: row.img,
    profesion : row.profesion,
    Country: row.Country,
    bio: row.bio,
    dob: row.dob,
    height: row.height,
    main: main
  })
    }
  }
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

app.post('/search',auth, async (req,res)=>{
  let name = req.body.name;
  let m = req.body.m;
  console.log(name,m,req.body);
  if(m=="movie"){res.redirect('/moviegrid?name=' + name);}
  else{res.redirect('/celebrity?name=' + name);}
});

app.get('/fav',auth,async (req,res)=>{
 let name = req.headers.referer.replaceAll('http://localhost:5000/movies?movie=','').replaceAll('https://rmdb-y1yl.onrender.com/movies?movie=','').replaceAll('%20','').replaceAll(':','').replaceAll('-','').replaceAll('.','');
 let decoded =  jwt.verify(req.cookies.jwt,"RMDb");
  let row = await getAllPromise(`SELECT ${name} FROM users WHERE email = "${decoded.email}"`);
  console.log(row);
  if(row==undefined){ await getAllPromise(`ALTER TABLE users ADD COLUMN ${name}`); console.log("111");await getAllPromise(`UPDATE users SET ${name}="YES" WHERE email="${decoded.email}"`)}
  else if(Object.values(row[0])[0]=="NO"){await getAllPromise(`UPDATE users SET ${name}="YES" WHERE email="${decoded.email}"`)}
  else if(Object.values(row[0])[0]=="YES"){await getAllPromise(`UPDATE users SET ${name}="NO" WHERE email="${decoded.email}"`)};
  console.log("DONE");
  res.redirect(req.headers.referer);
});

app.post('/logout',(req,res)=>{
  res.clearCookie("jwt");
  res.redirect('/');
});


app.listen(process.env.PORT || 5000, () => {
})