const moment = require('moment');
const connection = require('../../models/db');
require('dotenv').config();

function formatMessage(username, text) {
    return {
        username,
        text,
        time : moment().format('h:mm a')
    }
}

const addMessageToDb = (userID, username, chatRoomID, message, callback) => {
    const sql = `insert into chat_rooms_messages (userID, username, chatRoomID, message) values ('${userID}', '${username}', '${chatRoomID}', '${message}')`
    connection.query(sql, (error, results, fields) => {
        if (error) throw error
        return callback(results.insertId);
    });
};

const sendChatMessage = (id, callback) => {
    const sql = 'SELECT * FROM chat_rooms_messages WHERE ID = ?'
    connection.query(sql, [id], (error, results, fields) => {
        if (error) throw error
        return callback(results[0]);
    });
};

const addchatRoomAttachmentToDb = (userID, username, chatRoomID, link, fileName) => {
    const message = "Attachment";
    const attachment = `${process.env.BASE_URL}/${link}`
    const filePath = `${process.env.BASE_URL}/attachment/${fileName}`
    console.log(filePath)
    const sql = `insert into chat_rooms_messages (userID, username, chatRoomID, message, attachment, isMessage, fileName, filePath) values ('${userID}', '${username}', '${chatRoomID}', '${message}', '${attachment}', '0', '${fileName}', '${filePath}')`
    connection.query(sql, (err, response) => {
        if (err) throw err
        console.log('message saved to db')
    });
};

// function getData (id) {
//         sql = `SELECT * from chat_rooms_members WHERE socketID = '${id}'`
//         let response = connection.query(sql,  async (err, response) => {
//             if (err) return err.sqlMessage
//             result = await response[0];
//             console.log(result);
//             return result;
//         })
//         return response
// }

module.exports = {
    formatMessage,
    addMessageToDb,
    addchatRoomAttachmentToDb,
    sendChatMessage
};
