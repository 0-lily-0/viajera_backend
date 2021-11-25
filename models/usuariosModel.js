var pool = require('./bd'); // Llamado datos BD
var md5 = require('md5');

async function getUserByUsernameAndPassword(user,password) {
    try {
        var query = 'select * from usuarios where usuario = ? and password = ? limit 1';
        var rows = await pool.query(query, [user, md5(password)]);
        return rows[0];
    } catch (error) {
        console.log(error);
    }
}

async function existeUsuario(user) {
    try {
        var query = 'select * from usuarios where usuario = ? ';
        var rows = await pool.query(query, [user]);
        return rows[0];
    } catch (error) {
        console.log(error);
    }
}

async function insertUsuario(user,password) {
    try {
        var query = 'insert into usuarios set usuario = ?, password = ?  ';
        var rows = await pool.query(query, [user,  md5(password)]);
        return rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    }

}

module.exports = { getUserByUsernameAndPassword, existeUsuario, insertUsuario }