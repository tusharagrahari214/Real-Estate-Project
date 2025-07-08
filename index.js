// Import dependencies
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

// Create an Express app
const app = express();

// Configure MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1912118122@1w",
  database: "my_dream_home",
  insecureAuth: true,
});
// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: ", err);
    return;
  }
  console.log("Connected to MySQL");
});

// Set the view engine to EJS
app.set("view engine", "ejs");

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static("public"));

// Define a GET route
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});

//get request from home
app.get("/adminlogin", (req, res) => {
  const error = "An error occurred";
  res.render("adminlogin", { error });
});
app.get("/agentlogin", (req, res) => {
  const error = "An error occurred";
  res.render("agentlogin", { error });
});
app.get("/officelogin", (req, res) => {
  const error = "An error occurred";
  res.render("officelogin", { error });
});
app.get("/back", (req, res) => {
  const error = "An error occurred";
  res.render("adminpannel", { message: " " });
});
app.get("/add_buyer", (req, res) => {
  const error = "An error occurred";
  res.render("addbuyer", { message: " " });
});
app.get("/add_seller", (req, res) => {
  const error = "An error occurred";
  res.render("addseller", { message: " " });
});
app.get("/add_prop", (req, res) => {
  const error = "An error occurred";
  res.render("addproperties", { error });
});

app.get("/upt_tran", (req, res) => {
  const error = "An error occurred";
  res.render("updatetransaction", { error });
});
app.get("/dream", (req, res) => {
  const error = "An error occurred";
  res.render("runquery", { error });
});
app.get("/find", (req, res) => {
  const error = "An error occurred";
  res.render("findagent", { error });
});
app.get("/showagent", (req, res) => {
  const error = "An error occurred";
  const query = "SELECT * FROM agent";
  connection.query(query, (error, results) => {
    if (error) {
      res.send(`Error: ${error.message}`);
    } else {
      const fields = Object.keys(results[0]);
      const rows = results.map((result) => Object.values(result));
      res.render("showdata", { fields: fields, rows: rows });
    }
  });
});
app.get("/showproperties", (req, res) => {
  const error = "An error occurred";
  const query = "SELECT * FROM properties";
  connection.query(query, (error, results) => {
    if (error) {
      res.send(`Error: ${error.message}`);
    } else {
      const fields = Object.keys(results[0]);
      const rows = results.map((result) => Object.values(result));
      res.render("showdata", { fields: fields, rows: rows });
    }
  });
});
app.get("/showseller", (req, res) => {
  const error = "An error occurred";
  const query = "SELECT * FROM sellers";
  connection.query(query, (error, results) => {
    if (error) {
      res.send(`Error: ${error.message}`);
    } else {
      const fields = Object.keys(results[0]);
      const rows = results.map((result) => Object.values(result));
      res.render("showdata", { fields: fields, rows: rows });
    }
  });
});
app.get("/showbuyer", (req, res) => {
  const error = "An error occurred";
  const query = "SELECT * FROM buyers";
  connection.query(query, (error, results) => {
    if (error) {
      res.reder("office1", {});
    } else {
      const fields = Object.keys(results[0]);
      const rows = results.map((result) => Object.values(result));
      res.render("showdata", { fields: fields, rows: rows });
    }
  });
});

app.get("/showtransaction", (req, res) => {
  const error = "An error occurred";
  const query = "SELECT * FROM transaction";
  connection.query(query, (error, results) => {
    if (error) {
      res.redirect("office1");
    } else {
      const fields = Object.keys(results[0]);
      const rows = results.map((result) => Object.values(result));
      res.render("showdata", { fields: fields, rows: rows });
    }
  });
});

//post request from login page
app.post("/insert_buyer", function (req, res) {
  const buyer_id = req.body.buyer_id;
  const fname = req.body.fname;
  const lname = req.body.lname;
  const phoneno = req.body.phoneno;
  const email = req.body.email;
  const agent_id = req.body.agent_id;
  const message = " ";
  // Query the database for the user with the given email and password
  const query = `INSERT INTO buyers (buyer_id,fname,lname,phoneno, email,agent_id) VALUES (?, ?,?,?,?,?)`;
  connection.query(
    query,
    [buyer_id, fname, lname, phoneno, email, agent_id],
    (err, result) => {
      if (err) {
        console.error("Error inserting data into MySQL: ", err);
        return;
      }
      console.log("Data inserted into MySQL");
    }
  );

  res.render("confermation", {
    message3: "Buyer Details Inserted Sucessfully",
  });
});
app.post("/insert_property", function (req, res) {
  const pid = req.body.pid;
  const price = req.body.price;
  const status = req.body.status;
  const type = req.body.type;
  const seller = req.body.seller_id;
  const yoc = req.body.yoc;
  const city = req.body.city;
  const street = req.body.street;
  const postalcode = req.body.postalcode;
  const agent_id = req.body.agent_id;
  const message = " ";
  // Query the database for the user with the given email and password
  const query = `INSERT INTO properties (pid,price,status,number_of_bedroom,seller_id,yoc,city,street,postalcode,agent_id) VALUES (?, ?,?,?,?,?,?,?,?,?)`;
  connection.query(
    query,
    [pid, price, status, type, seller, yoc, city, street, postalcode, agent_id],
    (err, result) => {
      if (err) {
        console.error("Error inserting data into MySQL: ", err);
        return;
      }
      console.log("Data inserted into MySQL");
      res.render("confermation", {
        message3: "Property Details Inserted Sucessfully",
      });
    }
  );
});
app.post("/insert_seller", function (req, res) {
  const seller_id = req.body.buyer_id;
  const fname = req.body.fname;
  const lname = req.body.lname;
  const phoneno = req.body.phoneno;
  const email = req.body.email;
  const agent_id = req.body.agent_id;
  const message = " ";
  // Query the database for the user with the given email and password
  const query = `INSERT INTO buyers (seller_id,fname,lname,phoneno, email,agent_id) VALUES (?, ?,?,?,?,?)`;
  connection.query(
    query,
    [seller_id, fname, lname, phoneno, email, agent_id],
    (err, result) => {
      if (err) {
        console.error("Error inserting data into MySQL: ", err);
        return;
      }
      console.log("Data inserted into MySQL");
    }
  );

  res.render("confermation", {
    message3: " Seller Details Inserted Sucessfully",
  });
});
app.post("/insertransaction", function (req, res) {
  const transaction_id = req.body.transaction_id;
  const pid = req.body.pid;
  const seller_id = req.body.seller_id;
  const buyer_id = req.body.buyer_id;
  const transaction_date = req.body.transaction_date;
  const transaction_amount = req.body.transaction_amount;
  const commission = req.body.commission;
  const agent_id = req.body.agent_id;
  const message = " ";
  // Query the database for the user with the given email and password
  const query = `INSERT INTO transaction (transaction_id,pid,seller_id,buyer_id,transaction_date,transaction_amount,commission,agent_id) VALUES (?, ?,?,?,?,?,?,?)`;
  connection.query(
    query,
    [
      transaction_id,
      pid,
      seller_id,
      buyer_id,
      transaction_date,
      transaction_amount,
      commission,
      agent_id,
    ],
    (err, result) => {
      console.log(query);
      if (err) {
        console.error("Error inserting data into MySQL: ", err);
        return;
      }
      console.log("Data inserted into MySQL");
    }
  );

  res.render("confermation", {
    message3: " Transaction Details Inserted Sucessfully",
  });
});
app.post("/addagent", function (req, res) {
  const agent_id = req.body.buyer_id;
  const fname = req.body.fname;
  const lname = req.body.lname;
  const city = req.body.email;
  const street = req.body.street;
  const postalcode = req.body.postalcode;
  const phoneno = req.body.phoneno;
  const email = req.body.email;

  const message = " ";
  // Query the database for the user with the given email and password
  const query = `INSERT INTO agent (agent_id,fname,lname,city,street,postalcode,phoneno, email) VALUES (?, ?,?,?,?,?,?,?)`;
  connection.query(
    query,
    [agent_id, fname, lname, city, street, postalcode, phoneno, email],
    (err, result) => {
      if (err) {
        console.error("Error inserting data into MySQL: ", err);
        return;
      }
      console.log("Data inserted into MySQL");
    }
  );

  res.render("office1", {
    message1: "Agent Added  Sucessfully",
    message2: " ",
    message3: " ",
  });
});
app.post("/deleteagent", function (req, res) {
  const agent_id = req.body.agentid;

  const message = " ";
  // Query the database for the user with the given email and password
  const query = "DELETE FROM agent WHERE agent_id=id";
  connection.query(query, (err, result) => {
    if (err) {
      console.error("Error inserting data into MySQL: ", err);
      return;
    }
    console.log("Data inserted into MySQL");
  });

  res.render("office1", {
    message1: " ",
    message2: "Agent Deleted Sucessfully",
    message3: " ",
  });
});
app.post("/credential", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const message = " ";
  // Query the database for the user with the given email and password
  const query = `INSERT INTO agentlogin (username,password) VALUES (?, ?)`;
  connection.query(query, [username, password], (err, result) => {
    if (err) {
      console.error("Error inserting data into MySQL: ", err);
      return;
    }
    console.log("Data inserted into MySQL");
  });
  res.render("office1", {
    message3: "Agent Credentials Added  Sucessfully",
    message1: " ",
    message2: " ",
  });
});
app.post("/adminlogin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  // Query the database for the user with the given email and password
  const sql = "SELECT * FROM Admin WHERE username = ? AND password = ?";
  connection.query(
    sql,
    [username, password],
    function (error, results, fields) {
      // if (error) throw error;
      if (results.length > 0) {
        // User exists, redirect to the dashboard page
        res.render("adminpannel", { message: " " });
      } else {
        // User does not exist or password is incorrect, render the login page with an error message
        res.render("adminlogin", { error: "Invalid username or password" });
      }
    }
  );
});

app.post("/agentlogin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  // Query the database for the user with the given email and password
  const sql = "SELECT * FROM agentlogin WHERE  username= ? AND password = ?";
  connection.query(
    sql,
    [username, password],
    function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        // User exists, redirect to the dashboard page
        console.log("hi");
        res.render("agent1");
      } else {
        // User does not exist or password is incorrect, render the login page with an error message
        res.render("agentlogin", { error: "Invalid username password" });
      }
    }
  );
});
app.post("/office", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  // Query the database for the user with the given email and password
  const sql = "SELECT * FROM officelogin WHERE username= ? AND password= ?";
  connection.query(
    sql,
    [username, password],
    function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        // User exists, redirect to the dashboard page
        res.render("office1", { message1: " ", message2: " ", message3: " " });
      } else {
        // User does not exist or password is incorrect, render the login page with an error message
        res.render("officelogin", { error: "Invalid email or password" });
      }
    }
  );
});

// Define a POST route for running queries
app.post("/query", (req, res) => {
  const query = req.body.query;
  connection.query(query, (error, results) => {
    if (error) {
      res.send(`Error: ${error.message}`);
    } else if (results.length === 0) {
      res.render("confermation", { message3: "Record not found..." });
    } else {
      if (
        query.startsWith("SELECT") ||
        query.startsWith("select") ||
        query.startsWith("Select")
      ) {
        const fields = Object.keys(results[0]);
        const rows = results.map((result) => Object.values(result));
        res.render("result", { fields: fields, rows: rows });
      } else if (
        query.startsWith("INSERT") ||
        query.startsWith("insert") ||
        query.startsWith("Insert")
      ) {
        res.render("adminpannel", { message: "DATA INSERTED" });
      } else if (
        query.startsWith("UPDATE") ||
        query.startsWith("Update") ||
        query.startsWith("update")
      ) {
        res.render("adminpannel", { message: "Updated successfully" });
      } else if (
        query.startsWith("DELETE") ||
        query.startsWith("delete") ||
        query.startsWith("Delete")
      ) {
        res.render("adminpannel", { message: "Deleted successfully" });
      } else if (
        query.startsWith("Create") ||
        query.startsWith("CREATE") ||
        query.startsWith("create")
      ) {
        res.render("adminpannel", { message: "CREATED" });
      } else {
        res.send("Unknown query type");
      }
    }
  });
});
app.post("/runquery", function (req, res) {
  const topic = req.body.topic;

  let query;
  switch (topic) {
    case "q1":
      query =
        "SELECT * FROM properties WHERE city = 'Delhi' AND yoc> 2020 AND status='rent'";
      break;
    case "q2":
      query =
        "SELECT city,street,postalcode FROM properties WHERE price BETWEEN 3000000 AND 5000000 AND city='Bangalore'";
      break;
    case "q3":
      query =
        "SELECT * FROM properties WHERE street= 'MG Road' AND number_of_bedroom>=2 AND price <35000 and status='rent' ";
      break;
    case "q4":
      query =
        "SELECT ag.fname, ag.lname FROM agent ag INNER JOIN transaction tr ON ag.agent_id = tr.agent_id INNER JOIN properties pr ON tr.pid = pr.pid WHERE YEAR(tr.transaction_date) = 2023 GROUP BY ag.agent_id ORDER BY SUM(tr.transaction_amount) DESC LIMIT 1";
      break;
    case "q5":
      query =
        "SELECT agent.agent_id, agent.fname, agent.lname, AVG(properties.price) AS avg_price_2022, AVG(YEAR(NOW()) - properties.year_of_listing) AS avg_years_on_market FROM properties JOIN agent ON properties.agent_id = agent.agent_id WHERE  properties.year_of_listing = 2022 GROUP BY agent.agent_id";
      break;
    case "q6":
      query =
        "SELECT * FROM properties WHERE status='sell' ORDER BY price DESC LIMIT 1";
      break;
    case "q7":
      query =
        "SELECT * FROM properties WHERE status='rent' ORDER BY price DESC LIMIT 1";
      break;
    default:
      res.send("Invalid topic");
      return;
  }

  // execute the SQL query
  connection.query(query, (error, results) => {
    if (error) {
      res.send(`Error: ${error.message}`);
    }
    if (results.length === 0) {
      res.redirect(runquery);
    } else {
      if (results.length === 0) {
        res.render("runquery");
      } else {
        const fields = Object.keys(results[0]);
        const rows = results.map((result) => Object.values(result));
        res.render("result1", { fields: fields, rows: rows });
      }
    }
  });
});

app.post("/findagent", function (req, res) {
  const city = req.body.city;
  const price = req.body.price;
  const nunber_of_bedrooms = req.body.bedrooms;
  const status = req.body.status;
  // execute the SQL query
  const query =
    "SELECT properties.price,agent.fname, agent.lname, agent.city, agent.street, agent.postalcode, agent.phoneno, agent.email, agent.NOP_sale FROM agent JOIN properties ON agent.agent_id = properties.agent_id WHERE agent.city = ? AND properties.price BETWEEN ? AND ? AND properties.number_of_bedroom= ? AND properties.status = ?";
  const priceRange = price.split("-");
  const minPrice = parseFloat(priceRange[0]);
  const message3 = " ";
  const maxPrice = priceRange[1] === "+" ? Infinity : parseFloat(priceRange[1]);
  connection.query(
    query,
    [city, minPrice, maxPrice, nunber_of_bedrooms, status],
    (error, results) => {
      if (error) {
        res.send(`Error: ${error.message}`);
      } else {
        if (results.length === 0) {
          res.render("confermation", { message3: "Agent not found.." });
        } else {
          const fields = Object.keys(results[0]);
          const rows = results.map((result) => Object.values(result));
          res.render("result3", { fields: fields, rows: rows });
        }
      }
    }
  );
});
app.post("/contact", function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;

  const message = req.body.message;
  const message3 = "";
  // Query the database for the user with the given email and password
  const query = `INSERT INTO Contactinfo (name,email,phoneno,message) VALUES (?, ?,?,?)`;
  connection.query(query, [name, email, phone, message], (err, result) => {
    if (err) {
      console.error("Error inserting data into MySQL: ", err);
      return;
    }
    console.log("Data inserted into MySQL");
  });
  res.render("confermation", { message3: "Thank you for contacting us..." });
});
app.get("/back1", (req, res) => {
  const error = "An error occurred";
  res.render("runquery", { error });
});
app.get("/back2", (req, res) => {
  const error = "An error occurred";
  res.render("office1", { message1: " ", message2: " ", message3: " " });
});
app.get("/back3", (req, res) => {
  const error = "An error occurred";
  res.render("findagent", { error });
});
// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
