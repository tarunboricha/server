import express from "express";
import mysql from "mysql";
import cors from "cors";
import http from "http";
import bodyParser from "body-parser"

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({extended:true}));

app.use(cors({
  credentials : true,
  origin : "*"
}));

app.use(express.json());

const connection = mysql.createConnection({
  host : "db4free.net",
  user : "vcentry",
  password : "test@123",
  database : "travelix",
  port : 3306
});

connection.connect((error) => {
  if(error){
    throw error;
  }
  else{
    console.log("Node js server is connected to Online MySQL server");
  }
});

// URL : http://localhost:5000/api/user-list
// Method : GET
app.get("/api/user-list", (request, response) => {
  const sql_query = "SELECT * FROM tarun_table;"

  connection.query(sql_query, (error, result) => {
    if(error){
      response.status(500).send(error);
    }
    else{
      response.status(200).send(result);
    }
  })
})


// URL : http://localhost:5000/api/user-list
// Method : POST
app.post("/api/user-list", (request, response) => {
  const sql_query = "INSERT INTO tarun_table VALUES ('" + request.body.name + "', '" + request.body.email + "', '" + request.body.contact +  "', '" + request.body.message + "');"

  connection.query(sql_query, (error, result) => {
    if(error){
      response.status(500).send(error);
    }
    else{
      response.status(200).send(result);
    }
  })
})


const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log("Node js server is running");
});