import { connection } from "../index.js";
import pkg1 from 'bcrypt';
const { compare, genSalt, hash: _hash } = pkg1;
import { parseRowDataPacket } from "./parsingService.js";

class UserService {
    signUp = async (user) => {
        try{
          const {
            id,
            email,
            fname,
            lname,
            role, 
            password,
            role_id
          } = user;
          let getUserByIdQuery = `SELECT * FROM user WHERE id = ${id}`;
          const getLastInerstedIdQuery = `SELECT LAST_INSERT_ID();`;
      
          let sql_findEmail = `SELECT * FROM user WHERE email = '${email}'`;
          
          async function hashPassword(password) {
            const salt = await genSalt(10);
            const hash = await _hash(password, salt);
            return hash;
          }
          const checkEmailResponse = await connection.query(sql_findEmail);
          if(parseRowDataPacket(checkEmailResponse).length > 0){
            return {
              success: false,
              message: 'Email Already exists'
            };
          }
      
          let finalObj;
          finalObj = hashPassword(password).then(async (customerPassword) => {
      
            let sql_insert = `INSERT INTO user 
            (id, 
            email, 
            fname, 
            lname, 
            password, 
            role, role_id) VALUES (${null}, '${email}', '${fname}', '${lname}', '${customerPassword}', '${role}', '${role_id}')`;
      
            const response = await connection.query(sql_insert);
            getUserByIdQuery = `SELECT * FROM user WHERE id = ${response.insertId}`;
            const insertedObject = await connection.query(getUserByIdQuery);
            const result = parseRowDataPacket(insertedObject);
            return {
                success: true,
                data: result[0]
            }
          });
          return finalObj;
        }
        catch(e){
          console.log(e);
          return{
            success: false,
            message: e.message
          }
        }
    }

    signIn = async (credentials) => {
        const {email, password} = credentials;
        let sql_findEmail = `SELECT * FROM user where email = '${email}'`;
        try{
          const response = await connection.query(sql_findEmail);
          const parsedResponse = parseRowDataPacket(response);
          if(parsedResponse.length > 0){
            const match = await pkg1.compareSync(password, parsedResponse[0].password.toString());
            if(match){
              return {
                success: true,
                data: parsedResponse[0]
              }
            }
            else{
              return {
                success: false,
                message: 'Incorrect Credentials'
              }
            }
            
          }
          else{
            return {
              success: false,
              message: 'User Not Present'
            }
          }
      
        }
        catch(err){
          return{
            success: false,
            message: err.message,
          }
        }
        
    } 
}

export default new UserService();