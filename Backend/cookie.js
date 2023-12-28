const sqlite3 = require('sqlite3').verbose();
let sql;
// connect to db
const db = new sqlite3.Database("/home/sourav/Documents/RMdb/Backend/index.db", sqlite3.OPEN_READWRITE,(err)=>{
    if(err) return console.error(err.message);
});

const gcookie = (req,res,next) => {
    sql = ` SELECT jwt FROM users WHERE username = ? AND password = ?`;
    db.get(sql, [req.body.username,req.body.password], (err,row) =>{
        if(err) return console.error(err.message);
        else{
           if(row != undefined){
            let minute = 60 * 1000;
            res.cookie("jwt",row.jwt, { maxAge: minute });
            return next();
           }
           else{
            return res.render(index,{
                error : "Either username or password is Wrong"
            })
           }
        }
    });
    // console.log(req.body)
    // return res.send("I am the boss");
    // return next();
    
};


module.exports = gcookie;