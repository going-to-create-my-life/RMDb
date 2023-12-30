const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("/opt/render/project/src/Backend/index.db", sqlite3.OPEN_READWRITE,(err)=>{
    if(err) return console.error(err.message);
});
const jwt = require('jsonwebtoken');
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

const auth = async (req,res,next) => {
    let cookie = req.cookies.jwt;
    if(cookie){
        var deco =  jwt.verify(cookie,"RMDb", function(err, decode) {
            if (err) {
              console.log(err);
              return res.render('index',{
                error : "Don't be oversmart by changing jwt token",
                Login: `<li class="loginLink"><a href="#">LOG In</a></li>`,
                Signup : `<li class="btn signupLink"><a href="/auth/google">Signup via Google</a></li>`
            })
            }
            else if(decode.email) return next();
          });
    }
    else{
        let netflix = await getAllPromise(`SELECT * FROM allmovies WHERE ott LIKE '%Net%'`);
        let prime = await getAllPromise(`SELECT * FROM allmovies WHERE ott LIKE '%Amazon%'`);
        let hotstar = await getAllPromise(`SELECT * FROM allmovies WHERE ott LIKE '%Hotstar%'`);
        let theature = await getAllPromise(`SELECT * FROM allmovies WHERE ott LIKE '%Theature%'`);
        let celebrity = await getAllPromise(`SELECT * FROM allcelebrities`);
        let movie = await getAllPromise(`SELECT * FROM allmovies`);
        return res.render('index',{
            erro : "Sorry you have to login to check RMDb",
            Login: `<li class="loginLink"><a href="#">LOG In</a></li>`,
            Signup : `<li class="btn"><a href="/auth/google">Signup via Google</a></li>`,
            netflix: netflix,
            prime: prime,
            hotstar: hotstar,
            theature: theature,
            celebrity: celebrity,
            movie: movie
        })
    }
};


module.exports = auth;
