const sqlite3 = require('sqlite3').verbose();
let sql;
// connect to db
const db = new sqlite3.Database("/opt/render/project/src/Backend/index.db", sqlite3.OPEN_READWRITE,(err)=>{
    if(err) return console.error(err.message);
});
const jwt = require('jsonwebtoken');



const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID = "503045921384-eqtstg92ehku816atthen5ngctn2976h.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

passport.use(new GoogleStrategy({
  clientID: "503045921384-eqtstg92ehku816atthen5ngctn2976h.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "https://rmdb-y1yl.onrender.com/auth/google/callback",
  passReqToCallback: true,
},






function a(req, accessToken, refreshToken, profile, done) {

    sql = `SELECT password FROM users WHERE email = ?`;
    db.all(sql,[profile.email],(err,row)=>{
        if (err) {
            return console.error(err.message);
        }
        else{
          if(row[0] == undefined || row[0]==''){
                  console.log(row);
                sql = `INSERT INTO users(username,email,password,pic) VALUES (?,?,?,?)`
                db.run(sql,[profile.displayName,profile.email,"google",profile.picture],(err)=>{
                if(err) return console.error(err.message);
                });
                }
        }
    });

        req._user = profile;
        console.log("done");
  return done(null, profile);
}));








passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
