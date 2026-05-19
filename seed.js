require("dotenv").config();
const mongoose = require("mongoose");
const Office = require("./models/Office");
const Agent = require("./models/Agent");
const Buyer = require("./models/Buyer");
const Seller = require("./models/Seller");
const Property = require("./models/Property");
const Admin = require("./models/Admin");
const AgentLogin = require("./models/AgentLogin");
const OfficeLogin = require("./models/OfficeLogin");
const Counter = require("./models/Counter");
const AgentApplication = require("./models/AgentApplication");

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  // Clear all collections
  await Promise.all([Office.deleteMany(), Agent.deleteMany(), Buyer.deleteMany(), Seller.deleteMany(), Property.deleteMany(), Admin.deleteMany(), AgentLogin.deleteMany(), OfficeLogin.deleteMany(), Counter.deleteMany(), AgentApplication.deleteMany()]);

  await Office.create({ office_id: 125, state: "Uttar Pradesh", city: "Dhanghata", zip: "272162", phone: "9219131849", email: "tusharagrahari10@gmail.com", website: "www.mydreamhome.com" });

  // Agents
  const agentData = [
    [1,"Amit","Sharma","amit.sharma@gmail.com","91-9876543210","Mumbai","Andheri East","400069"],
    [2,"Neha","Gupta","neha.gupta@hotmail.com","91-9765432109","Delhi","Connaught Place","110001"],
    [3,"Rajesh","Patel","rajesh.patel@yahoo.com","91-9554321098","Bangalore","Indiranagar","560038"],
    [4,"Priya","Singh","priya.singh@gmail.com","91-9712345678","Chennai","Adyar","600020"],
    [5,"Ravi","Kumar","ravi.kumar@yahoo.com","91-9898765432","Hyderabad","Banjara Hills","500034"],
    [6,"Anjali","Joshi","anjali.joshi@gmail.com","91-9823456789","Pune","Koregaon Park","411001"],
    [7,"Sanjay","Chauhan","sanjay.chauhan@hotmail.com","91-9876543210","Kolkata","Park Street","700016"],
    [8,"Smita","Desai","smita.desai@yahoo.com","91-9765432109","Ahmedabad","Navrangpura","380009"],
    [9,"Vivek","Shah","vivek.shah@gmail.com","91-9554321098","Bangalore","Jayanagar","560011"],
    [10,"Kavita","Reddy","kavita.reddy@gmail.com","91-9712345678","Hyderabad","Gachibowli","500032"],
    [11,"Amar","Singh","amar.singh@yahoo.com","91-9876543210","Lucknow","Hazratganj","226001"],
    [12,"Sarika","Choudhary","sarika.choudhary@gmail.com","91-9765432109","Jaipur","Jawahar Nagar","302004"],
    [13,"Rahul","Goyal","rahul.goyal@hotmail.com","91-9554321098","Chandigarh","Sector 17","160017"],
    [14,"Mohan","Gupta","mohan.gupta@gmail.com","91-9876543210","Delhi","Nehru Place","110019"],
    [15,"Sneha","Verma","sneha.verma@hotmail.com","91-9765432109","Mumbai","Bandra","400050"],
    [16,"Anil","Shukla","anil.shukla@yahoo.com","91-9554321098","Chennai","T Nagar","600017"],
    [17,"Nisha","Pandey","nisha.pandey@gmail.com","91-9712345678","Bangalore","Koramangala","560034"],
    [18,"Rohan","Nair","rohan.nair@yahoo.com","91-9898765432","Hyderabad","Hitech City","500081"],
    [19,"Kavita","Sharma","kavita.sharma@gmail.com","91-9823456789","Mumbai","Dadar","400014"],
    [20,"Raj","Kapoor","raj.kapoor@hotmail.com","91-9876543210","Kolkata","Salt Lake","700091"]
  ];
  await Agent.insertMany(agentData.map(a => ({ agent_id:a[0],fname:a[1],lname:a[2],email:a[3],phoneno:a[4],city:a[5],street:a[6],postalcode:a[7],commision:0.50,NOP_sale:0,total_saleAmount:0,office_id:125 })));

  // Buyers
  const buyerData = [
    [1,"Aryan","Sharma","+91-9876543210","aryan.sharma@example.com",5],
    [2,"Aditi","Singh","+91-8765432109","aditi.singh@example.com",8],
    [3,"Vikas","Patil","+91-7654321098","vikas.patil@example.com",11],
    [4,"Kavya","Gupta","+91-6543210987","kavya.gupta@example.com",3],
    [5,"Nikhil","Rao","+91-5432109876","nikhil.rao@example.com",15],
    [6,"Riya","Nair","+91-4321098765","riya.nair@example.com",19],
    [7,"Aman","Deshpande","+91-3210987654","aman.deshpande@example.com",4],
    [8,"Sana","Khan","+91-2109876543","sana.khan@example.com",10],
    [9,"Amit","Shukla","+91-1098765432","amit.shukla@example.com",7],
    [10,"Kriti","Mishra","+91-0987654321","kriti.mishra@example.com",12],
    [11,"Hitesh","Singhal","+91-9876543211","hitesh.singhal@example.com",2],
    [12,"Nidhi","Kumar","+91-8765432110","nidhi.kumar@example.com",1],
    [13,"Vivek","Thakur","+91-7654321099","vivek.thakur@example.com",6],
    [14,"Jaya","Pandey","+91-6543210988","jaya.pandey@example.com",18],
    [15,"Rahul","Shah","+91-5432109877","rahul.shah@example.com",16],
    [16,"Anjali","Verma","+91-4321098766","anjali.verma@example.com",20],
    [17,"Aryan","Naidu","+91-3210987655","aryan.naidu@example.com",9],
    [18,"Neha","Raj","+91-2109876544","neha.raj@example.com",17],
    [19,"Rohan","Goyal","+91-1098765433","rohan.goyal@example.com",13],
    [20,"Isha","Chopra","+91-0987654322","isha.chopra@example.com",14]
  ];
  await Buyer.insertMany(buyerData.map(b => ({ buyer_id:b[0],fname:b[1],lname:b[2],phoneno:b[3],email:b[4],agent_id:b[5],password:"pass123" })));

  // Sellers
  const sellerData = [
    [1,"Vikram","Sinha","+91-9876543210","vikram.sinha@example.com",7,"vikram.sinha@okhdfcbank"],
    [2,"Priya","Gupta","+91-8765432109","priya.gupta@example.com",19,"priya.gupta@icici"],
    [3,"Aman","Chopra","+91-7654321098","aman.chopra@example.com",4,"aman.chopra@ybl"],
    [4,"Sneha","Sharma","+91-6543210987","sneha.sharma@example.com",12,"sneha.sharma@axisbank"],
    [5,"Rohan","Verma","+91-5432109876","rohan.verma@example.com",9,"rohan.verma@sbi"],
    [6,"Nisha","Reddy","+91-4321098765","nisha.reddy@example.com",1,"nisha.reddy@ybl"],
    [7,"Varun","Mehra","+91-3210987654","varun.mehra@example.com",15,"varun.mehra@okicici"],
    [8,"Amit","Saxena","+91-2109876543","amit.saxena@example.com",5,"amit.saxena@pnb"],
    [9,"Ayesha","Singh","+91-1098765432","ayesha.singh@example.com",20,"ayesha.singh@hdfcbank"],
    [10,"Ankit","Patel","+91-0987654321","ankit.patel@example.com",14,"ankit.patel@kotak"],
    [11,"Divya","Kumar","+91-9876543211","divya.kumar@example.com",17,"divya.kumar@ybl"],
    [12,"Rajesh","Yadav","+91-8765432110","rajesh.yadav@example.com",11,"rajesh.yadav@yesbank"],
    [13,"Rhea","Shah","+91-7654321099","rhea.shah@example.com",8,"rhea.shah@okaxisbank"],
    [14,"Karan","Malhotra","+91-6543210988","karan.malhotra@example.com",6,"karan.malhotra@idbi"],
    [15,"Sarika","Nair","+91-5432109877","sarika.nair@example.com",18,"sarika.nair@icicibank"],
    [16,"Tushar","Jain","+91-4321098766","tushar.jain@example.com",16,"tushar.jain@ybl"],
    [17,"Mehak","Garg","+91-3210987655","mehak.garg@example.com",3,"mehak.garg@okhdfcbank"],
    [18,"Aryan","Singhal","+91-2109876544","aryan.singhal@example.com",10,"aryan.singhal@rblbank"],
    [19,"Ishika","Mishra","+91-1098765433","ishika.mishra@example.com",2,"ishika.mishra@ybl"],
    [20,"Sujata","Das","+91-0987654322","sujata.das@example.com",13,"sujata.das@icici"]
  ];
  await Seller.insertMany(sellerData.map(s => ({ seller_id:s[0],fname:s[1],lname:s[2],phoneno:s[3],email:s[4],agent_id:s[5],UPI_ID:s[6],password:"pass123" })));

  // Properties with new fields
  const titles = ["Modern Apartment","Luxury Villa","Cozy Studio","Spacious Flat","Premium House","Student Hostel","Comfortable PG","Garden Villa","City Apartment","Sky Residence"];
  const types = ["apartment","house","villa","flat","apartment","hostel","pg","villa","apartment","flat"];
  const furnish = ["furnished","semi-furnished","unfurnished"];
  const propData = [
    [1,5000000,"sell","buy","apartment",2,true,"furnished",1200,4,2010,"Mumbai","Sion-Trombay Road","400071",1],
    [2,20000,"rent","rent","apartment",1,true,"semi-furnished",650,6,2021,"Bangalore","Indira Nagar","560038",3],
    [3,7500000,"sell","buy","villa",3,true,"furnished",2200,5,2005,"Delhi","Vasant Kunj","110070",2],
    [4,30000,"rent","rent","flat",2,false,"furnished",900,7,2015,"Chennai","T Nagar","600017",4],
    [5,4500000,"sell","buy","house",1,true,"unfurnished",1000,10,2022,"Pune","Kothrud","411038",6],
    [6,18000,"rent","rent","apartment",1,true,"semi-furnished",500,8,2016,"Mumbai","Malad West","400064",15],
    [7,9000000,"sell","buy","villa",3,true,"furnished",3000,3,2008,"Hyderabad","Banjara Hills","500034",17],
    [8,8000,"rent","rent","hostel",1,true,"furnished",200,15,2019,"Bangalore","HSR Layout","560102",9],
    [9,6000,"rent","rent","pg",1,true,"furnished",150,9,2021,"Delhi","Rajouri Garden","110027",2],
    [10,13000,"rent","rent","apartment",1,false,"unfurnished",550,1,2020,"Mumbai","Powai","400076",19],
    [11,4200000,"sell","buy","flat",2,true,"semi-furnished",1100,18,2013,"Bangalore","Whitefield","560066",17],
    [12,28000,"rent","rent","apartment",2,true,"furnished",850,13,2019,"Hyderabad","Gachibowli","500032",5],
    [13,8500000,"sell","buy","villa",3,false,"furnished",2500,20,2011,"Pune","Viman Nagar","411014",6],
    [14,32000,"rent","rent","flat",2,true,"semi-furnished",950,19,2017,"Chennai","Anna Nagar","600040",16],
    [15,5500000,"sell","buy","house",2,true,"unfurnished",1400,11,2009,"Delhi","Saket","110017",14],
    [16,7000,"rent","rent","pg",1,true,"furnished",120,2,2022,"Mumbai","Andheri West","400053",19],
    [17,7000000,"sell","buy","villa",3,false,"furnished",2800,12,2007,"Bangalore","Koramangala","560095",17],
    [18,12000,"rent","rent","hostel",1,true,"furnished",180,13,2020,"Mumbai","Dadar","400014",15],
    [19,7000,"rent","rent","pg",1,true,"furnished",100,7,2021,"Delhi","Gandhi Nagar","110001",14],
    [20,11000,"rent","rent","apartment",3,true,"semi-furnished",1300,20,2020,"Bangalore","MG Road","560001",9],
    [21,9500000,"sell","buy","villa",2,false,"furnished",1800,2,2005,"Mumbai","Juhu Road","400049",1],
    [22,15000,"rent","rent","flat",1,true,"unfurnished",600,5,2010,"Delhi","Rajouri Garden","110027",2],
    [23,10000000,"sell","buy","house",3,true,"furnished",2400,3,2009,"Pune","Kothrud","411038",6],
    [24,25000,"rent","rent","apartment",2,false,"semi-furnished",900,2,2018,"Chennai","Adyar","600020",4],
    [25,7500000,"sell","buy","villa",3,true,"furnished",2000,1,2003,"Bangalore","Indiranagar","560038",9],
    [26,6500,"rent","rent","pg",1,true,"furnished",130,4,2022,"Mumbai","Dadar","400014",15],
    [27,6000000,"sell","buy","flat",2,true,"unfurnished",1100,6,2010,"Delhi","Janakpuri","110058",14],
    [28,9000,"rent","rent","hostel",1,true,"furnished",200,3,2020,"Pune","Kalyani Nagar","411006",6],
    [29,5000000,"sell","buy","house",1,true,"semi-furnished",900,5,2005,"Chennai","Velachery","600042",16],
    [30,18000,"rent","rent","apartment",2,true,"furnished",750,1,2012,"Bangalore","HSR Layout","560102",17],
  ];
  await Property.insertMany(propData.map((p, i) => ({
    pid:p[0], price:p[1], status:"available", listing_type:p[3], property_type:p[4], number_of_bedroom:p[5],
    bachelor_allowed:p[6], furnished:p[7], area_sqft:p[8], seller_id:p[9], yoc:p[10],
    city:p[11], street:p[12], postalcode:p[13], agent_id:p[14],
    title: `${p[7].charAt(0).toUpperCase()+p[7].slice(1)} ${p[5]} BHK ${p[4].charAt(0).toUpperCase()+p[4].slice(1)} in ${p[12]}`,
    description: `Beautiful ${p[5]} BHK ${p[4]} available for ${p[3]} in ${p[11]}. ${p[7].charAt(0).toUpperCase()+p[7].slice(1)}, ${p[8]} sqft. ${p[6] ? 'Bachelor friendly.' : 'Families only.'} Built in ${p[10]}.`,
    year_of_listing: 2024, approved: true,
  })));

  // Admin & Login credentials
  await Admin.insertMany([
    { username:"@tushar1", password:"2101072" },
    { username:"@tushar2", password:"2101073" },
    { username:"@kkr", password:"2101100" },
    { username:"@aps", password:"2101028" }
  ]);
  await OfficeLogin.create({ username:"@tushar1", password:"2101073" });

  const agentLogins = [
    ["@Amit","Amit01",1],["@Neha","Neha02",2],["@Rajesh","Rajesh03",3],["@Priya","Priya04",4],
    ["@Ravi","Ravi05",5],["@Anjali","Anjali06",6],["@Sanjay","Sanjay07",7],["@Smita","Smita08",8],
    ["@Vivek","Vivek09",9],["@Kavita1","Kavita10",10],["@Amar","Amar11",11],["@Sarika","Sarika12",12],
    ["@Rahul","Rahul13",13],["@Mohan","Mohan14",14],["@Sneha","Sneha15",15],["@Anil","Anil16",16],
    ["@Nisha","Nisha17",17],["@Rohan","Rohan18",18],["@Kavita2","Kavita19",19],["@Raj","Raj20",20]
  ];
  await AgentLogin.insertMany(agentLogins.map(a => ({ username:a[0], password:a[1], agent_id:a[2] })));

  // Set counters to current max values
  await Counter.create([
    { _id: "buyer_id", seq: 20 },
    { _id: "seller_id", seq: 20 },
    { _id: "agent_id", seq: 20 },
    { _id: "property_id", seq: 30 },
    { _id: "transaction_id", seq: 0 },
  ]);

  console.log("Database seeded successfully with enhanced data!");
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
