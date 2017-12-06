function dbOp(sql){
    return new Promise(function(resolve, reject){
        connection.query(sql, function(error, results, fields){
            if(error) reject(error)
            resolve(results)
        })
    })

}

module.exports = {
    dbOp
}
