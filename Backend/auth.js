const jwt = require('jsonwebtoken');

const auth = (req,res,next) => {
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
        return res.render('index',{
            error : "Sorry you have to login to check RMDb",
            Login: `<li class="loginLink"><a href="#">LOG In</a></li>`,
            Signup : `<li class="btn"><a href="/auth/google">Signup via Google</a></li>`
        })
    }
};


module.exports = auth;