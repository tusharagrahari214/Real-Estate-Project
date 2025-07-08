CREATE DATABASE my_dream_home;
USE my_dream_home;

CREATE TABLE office (
  office_id INT PRIMARY KEY,
  state VARCHAR(50),
  city VARCHAR(50),
  zip VARCHAR(20),
  phone VARCHAR(20),
  email VARCHAR(50),
  website VARCHAR(255)
);

CREATE TABLE agent (
  agent_id INT PRIMARY KEY,
  fname VARCHAR(50) NOT NULL,
  lname VARCHAR(50),
  email VARCHAR(50),
  phoneno VARCHAR(20) NOT NULL,
  city VARCHAR(50),
  street VARCHAR(50),
  postalcode VARCHAR(10),
  commision DECIMAL(5,2),
  NOP_sale INT,
  total_saleAmount DECIMAL(10,2),
  office_id INT,
  FOREIGN KEY (office_id) REFERENCES office(office_id)
);

CREATE TABLE buyers (
  buyer_id INT PRIMARY KEY,
  fname VARCHAR(50) NOT NULL,
  lname VARCHAR(50),
  phoneno VARCHAR(20) NOT NULL,
  email VARCHAR(100),
  agent_id INT,
  FOREIGN KEY (agent_id) REFERENCES agent(agent_id)
);

CREATE TABLE sellers (
  seller_id INT PRIMARY KEY NOT NULL,
  fname VARCHAR(50),
  lname VARCHAR(50),
  phoneno VARCHAR(20) NOT NULL,
  email VARCHAR(100),
  agent_id INT,
  UPI_ID VARCHAR(50),
  FOREIGN KEY (agent_id) REFERENCES agent(agent_id)
);

CREATE TABLE properties (
  pid INT PRIMARY KEY,
  price DECIMAL(10,2),
  status VARCHAR(20),
  number_of_bedroom INT,
  seller_id INT,
  yoc INT,
  city VARCHAR(50),
  street VARCHAR(50),
  postalcode VARCHAR(10),
  agent_id INT,
  FOREIGN KEY (seller_id) REFERENCES sellers(seller_id),
  FOREIGN KEY (agent_id) REFERENCES agent(agent_id)
);

CREATE TABLE transaction (
  transaction_id INT PRIMARY KEY,
  pid INT,
  seller_id INT,
  buyer_id INT,
  transaction_date DATE,
  transaction_amount DECIMAL(10,2),
  commission DECIMAL(10,2),
  agent_id INT,
  FOREIGN KEY (pid) REFERENCES properties(pid),
  FOREIGN KEY (seller_id) REFERENCES sellers(seller_id),
  FOREIGN KEY (buyer_id) REFERENCES buyers(buyer_id),
  FOREIGN KEY (agent_id) REFERENCES agent(agent_id)
);

CREATE TABLE agentlogin(
  username VARCHAR(50) NOT NULL,
  password VARCHAR(20) PRIMARY KEY
);

CREATE TABLE Admin(
  username VARCHAR(20) PRIMARY KEY,
  password VARCHAR(20)
);

CREATE TABLE officelogin(
  username VARCHAR(20),
  password VARCHAR(10)
);

INSERT INTO officelogin VALUES('@gaurav2','2101073');

INSERT INTO Admin (username,password) VALUES('@gaurav1','2101072'),('@gaurav2','2101073'),('@kkr','2101100'),('@aps','2101028');

INSERT INTO office VALUES(125,'Uttar Pradesh','Dhanghata','272162','9219131849','gauravkumar1w@gmail.com','www.propertylele.com');

INSERT INTO agent (agent_id, fname,lname,email,phoneno,city,street,postalcode, commision, NOP_sale, total_saleAmount,office_id)
    -> VALUES
    -> (1, 'Amit', 'Sharma', 'amit.sharma@gmail.com', '91-9876543210', 'Mumbai', 'Andheri East', '400069', 0.50, 0,0.00,125),
    -> (2, 'Neha', 'Gupta', 'neha.gupta@hotmail.com', '91-9765432109', 'Delhi', 'Connaught Place', '110001', 0.50, 0,0.00,125),
    -> (3, 'Rajesh', 'Patel', 'rajesh.patel@yahoo.com', '91-9554321098', 'Bangalore', 'Indiranagar', '560038', 0.50, 0,0.00,125),
    -> (4, 'Priya', 'Singh', 'priya.singh@gmail.com', '91-9712345678', 'Chennai', 'Adyar', '600020', 0.50,0,0.00,125),
    -> (5, 'Ravi', 'Kumar', 'ravi.kumar@yahoo.com', '91-9898765432', 'Hyderabad', 'Banjara Hills', '500034', 0.50,0,0.00,125),
    -> (6, 'Anjali', 'Joshi', 'anjali.joshi@gmail.com', '91-9823456789', 'Pune', 'Koregaon Park', '411001', 0.50,0,0.00,125),
    -> (7, 'Sanjay', 'Chauhan', 'sanjay.chauhan@hotmail.com', '91-9876543210', 'Kolkata', 'Park Street', '700016',0.50,0,0.00,125),
    -> (8, 'Smita', 'Desai', 'smita.desai@yahoo.com', '91-9765432109', 'Ahmedabad', 'Navrangpura', '380009', 0.50,0,0.00,125),
    -> (9, 'Vivek', 'Shah', 'vivek.shah@gmail.com', '91-9554321098', 'Bangalore', 'Jayanagar', '560011', 0.50,0,0.00,125),
    -> (10, 'Kavita', 'Reddy', 'kavita.reddy@gmail.com', '91-9712345678', 'Hyderabad', 'Gachibowli', '500032', 0.50,0,0.00,125),
    -> (11, 'Amar', 'Singh', 'amar.singh@yahoo.com', '91-9876543210', 'Lucknow', 'Hazratganj', '226001', 0.50,0,0.00,125),
    -> (12, 'Sarika', 'Choudhary', 'sarika.choudhary@gmail.com', '91-9765432109', 'Jaipur', 'Jawahar Nagar', '302004', 0.50,0,0.00,125),
    -> (13, 'Rahul', 'Goyal', 'rahul.goyal@hotmail.com', '91-9554321098', 'Chandigarh', 'Sector 17', '160017',0.50,0,0.00,125),
    -> (14, 'Mohan', 'Gupta', 'mohan.gupta@gmail.com', '91-9876543210', 'Delhi', 'Nehru Place', '110019', 0.50,0,0.00,125),
    -> (15, 'Sneha', 'Verma', 'sneha.verma@hotmail.com', '91-9765432109', 'Mumbai', 'Bandra', '400050', 0.50, 0,0.00,125),
    -> (16, 'Anil', 'Shukla', 'anil.shukla@yahoo.com', '91-9554321098', 'Chennai', 'T Nagar', '600017',0.50,0,0.00,125),
    -> (17, 'Nisha', 'Pandey', 'nisha.pandey@gmail.com', '91-9712345678', 'Bangalore', 'Koramangala', '560034', 0.50,0,0.00,125),
    -> (18, 'Rohan', 'Nair', 'rohan.nair@yahoo.com', '91-9898765432', 'Hyderabad', 'Hitech City', '500081',0.50, 0,0.00,125),
    -> (19, 'Kavita', 'Sharma', 'kavita.sharma@gmail.com', '91-9823456789', 'Mumbai', 'Dadar', '400014',0.50,0,0.00,125),
    -> (20, 'Raj', 'Kapoor', 'raj.kapoor@hotmail.com', '91-9876543210', 'Kolkata', 'Salt Lake', '700091',0.50,0,0.00,125);
INSERT INTO buyers (buyer_id, fname,lname,phoneno,email, agent_id)
    -> VALUES
    -> (1, 'Aryan', 'Sharma', '+91-9876543210', 'aryan.sharma@example.com', 5),
    -> (2, 'Aditi', 'Singh', '+91-8765432109', 'aditi.singh@example.com', 8),
    -> (3, 'Vikas', 'Patil', '+91-7654321098', 'vikas.patil@example.com', 11),
    -> (4, 'Kavya', 'Gupta', '+91-6543210987', 'kavya.gupta@example.com', 3),
    -> (5,'Nikhil', 'Rao', '+91-5432109876', 'nikhil.rao@example.com', 15),
    -> (6, 'Riya', 'Nair', '+91-4321098765', 'riya.nair@example.com', 19),
    -> (7, 'Aman', 'Deshpande', '+91-3210987654', 'aman.deshpande@example.com', 4),
    -> (8, 'Sana', 'Khan', '+91-2109876543', 'sana.khan@example.com', 10),
    -> (9, 'Amit', 'Shukla', '+91-1098765432', 'amit.shukla@example.com', 7),
    -> (10, 'Kriti', 'Mishra', '+91-0987654321', 'kriti.mishra@example.com', 12),
    -> (11, 'Hitesh', 'Singhal', '+91-9876543210', 'hitesh.singhal@example.com', 2),
    -> (12, 'Nidhi', 'Kumar', '+91-8765432109', 'nidhi.kumar@example.com', 1),
    -> (13, 'Vivek', 'Thakur', '+91-7654321098', 'vivek.thakur@example.com', 6),
    -> (14, 'Jaya', 'Pandey', '+91-6543210987', 'jaya.pandey@example.com', 18),
    -> (15 ,'Rahul', 'Shah', '+91-5432109876', 'rahul.shah@example.com', 16),
    -> (16, 'Anjali', 'Verma', '+91-4321098765', 'anjali.verma@example.com', 20),
    -> (17, 'Aryan', 'Naidu', '+91-3210987654', 'aryan.naidu@example.com', 9),
    -> (18, 'Neha', 'Raj', '+91-2109876543', 'neha.raj@example.com', 17),
    -> (19, 'Rohan', 'Goyal', '+91-1098765432', 'rohan.goyal@example.com', 13),
    -> (20, 'Isha', 'Chopra', '+91-0987654321', 'isha.chopra@example.com', 14);
INSERT INTO sellers (seller_id,fname,lname,phoneNo,email, agent_id)
    -> VALUES
    -> (1, 'Vikram', 'Sinha', '+91-9876543210', 'vikram.sinha@example.com', 7),
    -> (2, 'Priya', 'Gupta', '+91-8765432109', 'priya.gupta@example.com', 19),
    -> (3, 'Aman', 'Chopra', '+91-7654321098', 'aman.chopra@example.com', 4),
    -> (4, 'Sneha', 'Sharma', '+91-6543210987', 'sneha.sharma@example.com', 12),
    -> (5,'Rohan', 'Verma', '+91-5432109876', 'rohan.verma@example.com', 9),
    -> (6, 'Nisha', 'Reddy', '+91-4321098765', 'nisha.reddy@example.com', 1),
    -> (7, 'Varun', 'Mehra', '+91-3210987654', 'varun.mehra@example.com', 15),
    -> (8, 'Amit', 'Saxena', '+91-2109876543', 'amit.saxena@example.com', 5),
    -> (9, 'Ayesha', 'Singh', '+91-1098765432', 'ayesha.singh@example.com', 20),
    -> (10, 'Ankit', 'Patel', '+91-0987654321', 'ankit.patel@example.com', 14),
    -> (11, 'Divya', 'Kumar', '+91-9876543210', 'divya.kumar@example.com', 17),
    -> (12, 'Rajesh', 'Yadav', '+91-8765432109', 'rajesh.yadav@example.com', 11),
    -> (13, 'Rhea', 'Shah', '+91-7654321098', 'rhea.shah@example.com', 8),
    -> (14, 'Karan', 'Malhotra', '+91-6543210987', 'karan.malhotra@example.com', 6),
    -> (15 ,'Sarika', 'Nair', '+91-5432109876', 'sarika.nair@example.com', 18),
    -> (16, 'Gaurav', 'Jain', '+91-4321098765', 'gaurav.jain@example.com', 16),
    -> (17, 'Mehak', 'Garg', '+91-3210987654', 'mehak.garg@example.com', 3),
    -> (18, 'Aryan', 'Singhal', '+91-2109876543', 'aryan.singhal@example.com', 10),
    -> (19, 'Ishika', 'Mishra', '+91-1098765432', 'ishika.mishra@example.com', 2),
    -> (20, 'Sujata', 'Das', '+91-0987654321', 'sujata.das@example.com', 13);
INSERT INTO properties (pid, price, status,number_of_bedroom, seller_id, yoc,city,street,postalcode, agent_id)
    -> VALUES
    -> (1, 5000000.00, 'sell', 2, 4, 2010, 'Mumbai', 'Sion-Trombay Road', '400071', 1),
    -> (2, 20000.00, 'rent', 1, 6, 2021, 'Bangalore', 'Indira Nagar', '560038', 3),
    -> (3, 7500000.00, 'sell', 3, 5, 2005, 'Delhi', 'Vasant Kunj', '110070', 2),
    -> (4, 30000.00, 'rent', 2, 7, 2015, 'Chennai', 'T Nagar', '600017', 4),
    -> (5, 4500000.00, 'sell', 1, 10, 2022, 'Pune', 'Kothrud', '411038', 6),
    -> (6, 18000.00, 'rent', 1, 8, 2016, 'Mumbai', 'Malad West', '400064', 15),
    -> (7, 9000000.00, 'sell',3, 3, 2008, 'Hyderabad', 'Banjara Hills', '500034', 17),
    -> (8, 35000.00, 'rent',2, 15, 2014, 'Bangalore', 'HSR Layout', '560102', 9),
    -> (9, 65000.00, 'rent',3, 9, 2023, 'Delhi', 'Rajouri Garden', '110027', 2),
    -> (10, 13000.00, 'rent',1, 1, 2020, 'Mumbai', 'Powai', '400076', 19),
    -> (11, 4200000.00, 'sell',2, 18, 2013, 'Bangalore', 'Whitefield', '560066', 17),
    -> (12, 28000.00, 'rent',2, 13, 2019, 'Hyderabad', 'Gachibowli', '500032', 5),
    -> (13, 8500000.00, 'sell',3, 20, 2011, 'Pune', 'Viman Nagar', '411014', 6),
    -> (14, 32000.00, 'rent',2, 19, 2017, 'Chennai', 'Anna Nagar', '600040', 16),
    -> (15, 5500000.00, 'sell',2, 11, 2009, 'Delhi', 'Saket', '110017', 14),
    -> (16, 20000.00, 'rent',1, 2, 2021, 'Mumbai', 'Andheri West', '400053', 19),
    -> (17, 7000000.00, 'sell',3, 12, 2007, 'Bangalore', 'Koramangala', '560095', 17),
    -> (18, 1250000.00, 'sell',2, 13, 2018, 'Mumbai', 'Main Road', '400001', 15),
    -> (19, 7000.00, 'rent',1, 7, 2015, 'Delhi', 'Gandhi Nagar', '110001', 14),
    -> (20, 11000.00, 'rent',3, 20, 2020, 'Bangalore', 'MG Road', '560001', 9);
INSERT INTO properties (pid, price, status,number_of_bedroom, seller_id, yoc,city,street,postalcode, agent_id)
    -> VALUES
    -> (21, 950000, 'sell', 2, 2, 2005, 'Mumbai', 'Juhu Road', '400049', 1),
    -> (22, 15000, 'rent', 1, 5, 2010, 'Delhi', 'Rajouri Garden', '110027', 2),
    -> (23, 1000000, 'sell', 3, 3, 2009, 'Pune', 'Kothrud', '411038', 6),
    -> (24, 25000, 'rent', 2, 2, 2018, 'Chennai', 'Adyar', '600020', 4),
    -> (25, 750000, 'sell', 3, 1, 2003, 'Banglore', 'Indiranagar', '560038', 9),
    -> (26, 20000, 'rent', 1, 4, 2015, 'Mumbai', 'Dadar', '400014', 15),
    -> (27, 600000, 'sell', 2, 6, 2010, 'Delhi', 'Janakpuri', '110058', 14),
    -> (28, 30000, 'rent', 3, 3, 2016, 'Pune', 'Kalyani Nagar', '411006', 6),
    -> (29, 500000, 'sell', 1, 5, 2005, 'Chennai', 'Velachery', '600042', 16),
    -> (30, 18000, 'rent', 2, 1, 2012, 'Banglore', 'HSR Layout', '560102', 17),
    -> (31, 800000, 'sell', 3, 4, 2008, 'Mumbai', 'Bandra', '400050', 19),
    -> (32, 35000, 'rent', 1, 6, 2019, 'Delhi', 'Vasant Kunj', '110070', 14),
    -> (33, 1200000, 'sell', 4, 2, 2010, 'Pune', 'Wakad', '411057', 6),
    -> (34, 40000, 'rent', 3, 3, 2014, 'Chennai', 'Mylapore', '600004', 4),
    -> (35, 650000, 'sell', 2, 1, 2004, 'Banglore', 'Koramangala', '560034', 17),
    -> (36, 22000, 'rent', 1, 5, 2017, 'Mumbai', 'Andheri', '400069', 1),
    -> (37, 900000, 'sell', 3, 6, 2011, 'Delhi', 'Lajpat Nagar', '110024', 14),
    -> (38, 40000, 'rent', 2, 4, 2015, 'Pune', 'Viman Nagar', '411014', 6),
    -> (39, 550000, 'sell', 2, 2, 2007, 'Chennai', 'T Nagar', '600017', 16),
    -> (40, 20000, 'rent', 1, 1, 2013, 'Banglore', 'Marathahalli', '560037', 3);
INSERT INTO properties (pid, price, status, number_of_bedroom, seller_id, yoc, city, street, postalcode, agent_id)
    -> VALUES
    -> (41, 235000.00, 'sell', 2, 6, 2015, 'Delhi', 'Sector 14, Dwarka', '110078', 14),
    -> (42, 1250.00, 'rent', 1, 3, 2019, 'Mumbai', 'Santacruz East', '400055', 19),
    -> (43, 510000.00, 'sell', 4, 8, 2010, 'Pune', 'Baner Road', '411045', 6),
    -> (44, 1500.00, 'rent', 2, 5, 2018, 'Chennai', 'Velachery', '600042', 16),
    -> (45, 180000.00, 'sell', 3, 10, 2017, 'Banglore', 'Indiranagar', '560038', 9),
    -> (46, 1700.00, 'rent', 1, 1, 2019, 'Mumbai', 'Andheri West', '400053', 1),
    -> (47, 300000.00, 'sell', 5, 9, 2016, 'Delhi', 'Hauz Khas', '110016', 2),
    -> (48, 1200.00, 'rent', 2, 4, 2020, 'Pune', 'Koregaon Park', '411001', 6),
    -> (49, 250000.00, 'sell', 3, 7, 2013, 'Chennai', 'Adyar', '600020', 4),
    -> (50, 1900.00, 'rent', 1, 2, 2021, 'Banglore', 'Koramangala', '560034', 3),
    -> (51, 410000.00, 'sell', 4, 5, 2015, 'Delhi', 'Vasant Vihar', '110057', 14),
    -> (52, 1300.00, 'rent', 1, 1, 2022, 'Mumbai', 'Bandra West', '400050', 19),
    -> (53, 550000.00, 'sell', 5, 10, 2012, 'Pune', 'Kothrud', '411029', 6),
    -> (54, 1600.00, 'rent', 2, 6, 2017, 'Chennai', 'Nungambakkam', '600006', 16),
    -> (55, 270000.00, 'sell', 3, 8, 2014, 'Banglore', 'Jayanagar', '560011', 17),
    -> (56, 2000.00, 'rent', 1, 3, 2020, 'Mumbai', 'Powai', '400076', 1),
    -> (57, 350000.00, 'sell', 4, 9, 2011, 'Delhi', 'Saket', '110017', 2),
    -> (58, 1100.00, 'rent', 2, 4, 2021, 'Pune', 'Hadapsar', '411028', 6);
ALTER TABLE sellers ADD UPI_ID VARCHAR(50);
INSERT INTO agentlogin (username, password)
    -> VALUES
    ->     ('@Amit', 'Amit01'),
    ->     ('@Neha', 'Neha02'),
    ->     ('@Rajesh', 'Rajesh03'),
    ->     ('@Priya', 'Priya04'),
    ->     ('@Ravi', 'Ravi05'),
    ->     ('@Anjali', 'Anjali06'),
    ->     ('@Sanjay', 'Sanjay07'),
    ->     ('@Smita', 'Smita08'),
    ->     ('@Vivek', 'Vivek09'),
    ->     ('@Kavita1', 'Kavita10'),
    ->     ('@Amar', 'Amar11'),
    ->     ('@Sarika', 'Sarika12'),
    ->     ('@Rahul', 'Rahul13'),
    ->     ('@Mohan', 'Mohan14'),
    ->     ('@Sneha', 'Sneha15'),
    ->     ('@Anil', 'Anil16'),
    ->     ('@Nisha', 'Nisha17'),
    ->     ('@Rohan', 'Rohan18'),
    ->     ('@Kavita2', 'Kavita19'),
    ->     ('@Raj', 'Raj20');
ALTER TABLE properties
    -> ADD year_of_sale YEAR;
ALTER TABLE properties
    -> ADD year_of_listing YEAR(4) DEFAULT 2022;
UPDATE properties p
    -> INNER JOIN transaction t ON p.pid = t.pid
    -> SET p.year_of_sale = YEAR(t.transaction_date);
CREATE TRIGGER update_property_status
AFTER INSERT  ON transaction
FOR EACH ROW
BEGIN
  UPDATE properties
  SET status = 'sold'
  WHERE pid = NEW.pid;
END;

CREATE TRIGGER insert_property_status
AFTER UPDATE ON transaction
FOR EACH ROW
BEGIN
  UPDATE properties
  SET status = 'sold'
  WHERE pid = NEW.pid;
END;
CREATE TRIGGER update_agent_stats
AFTER UPDATE ON transaction
FOR EACH ROW
BEGIN
  UPDATE agent
  SET NOP_sale = NOP_sale + 1,
      total_saleAmount = total_saleAmount + NEW.transaction_amount
  WHERE agent_id = NEW.agent_id;
END;

CREATE TRIGGER insert_agent_stats
AFTER INSERT ON transaction
FOR EACH ROW
BEGIN
  UPDATE agent
  SET NOP_sale = NOP_sale + 1,
      total_saleAmount = total_saleAmount + NEW.transaction_amount
  WHERE agent_id = NEW.agent_id;
END;
CREATE TRIGGER update_property_year_of_sale
AFTER UPDATE ON transaction
FOR EACH ROW
BEGIN
  UPDATE properties
  SET year_of_sale = YEAR(NEW.transaction_date)
  WHERE pid = NEW.pid;
END;

CREATE TRIGGER insert_property_year_of_sale
AFTER INSERT ON transaction
FOR EACH ROW
BEGIN
  UPDATE properties
  SET year_of_sale = YEAR(NEW.transaction_date)
  WHERE pid = NEW.pid;
END;

UPDATE sellers SET UPI_ID = 'vikram.sinha@okhdfcbank' WHERE seller_id = 1;
UPDATE sellers SET UPI_ID = 'priya.gupta@icici' WHERE seller_id = 2;
UPDATE sellers SET UPI_ID = 'aman.chopra@ybl' WHERE seller_id = 3;
UPDATE sellers SET UPI_ID = 'sneha.sharma@axisbank' WHERE seller_id = 4;
UPDATE sellers SET UPI_ID = 'rohan.verma@sbi' WHERE seller_id = 5;
UPDATE sellers SET UPI_ID = 'nisha.reddy@ybl' WHERE seller_id = 6;
UPDATE sellers SET UPI_ID = 'varun.mehra@okicici' WHERE seller_id = 7;
UPDATE sellers SET UPI_ID = 'amit.saxena@pnb' WHERE seller_id = 8;
UPDATE sellers SET UPI_ID = 'ayesha.singh@hdfcbank' WHERE seller_id = 9;
UPDATE sellers SET UPI_ID = 'ankit.patel@kotak' WHERE seller_id = 10;
UPDATE sellers SET UPI_ID = 'divya.kumar@ybl' WHERE seller_id = 11;
UPDATE sellers SET UPI_ID = 'rajesh.yadav@yesbank' WHERE seller_id = 12;
UPDATE sellers SET UPI_ID = 'rhea.shah@okaxisbank' WHERE seller_id = 13;
UPDATE sellers SET UPI_ID = 'karan.malhotra@idbi' WHERE seller_id = 14;
UPDATE sellers SET UPI_ID = 'sarika.nair@icicibank' WHERE seller_id = 15;
UPDATE sellers SET UPI_ID = 'gaurav.jain@ybl' WHERE seller_id = 16;
UPDATE sellers SET UPI_ID = 'mehak.garg@okhdfcbank' WHERE seller_id = 17;
UPDATE sellers SET UPI_ID = 'aryan.singhal@rblbank' WHERE seller_id = 18;
UPDATE sellers SET UPI_ID = 'ishika.mishra@ybl' WHERE seller_id = 19;
UPDATE sellers SET UPI_ID = 'sujata.das@icici' WHERE seller_id = 20;

