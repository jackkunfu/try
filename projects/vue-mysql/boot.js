var util = require("util")

function dbOp(sql){
    return new Promise(function(resolve, reject){
        connection.query(sql, function(error, results, fields){
            if(error) reject(error)
            console.log('JSON.stringify(results)');
            // console.log(results);
            // return util.inspect(results, { depth:null })
            resolve(results)
        })
    })

}

module.exports = {
    dbOp
}
