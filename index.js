require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const session = require("express-session");

const Office = require("./models/Office");
const Agent = require("./models/Agent");
const Buyer = require("./models/Buyer");
const Seller = require("./models/Seller");
const Property = require("./models/Property");
const Transaction = require("./models/Transaction");
const Admin = require("./models/Admin");
const AgentLogin = require("./models/AgentLogin");
const OfficeLogin = require("./models/OfficeLogin");
const ContactInfo = require("./models/ContactInfo");
const Counter = require("./models/Counter");
const AgentApplication = require("./models/AgentApplication");

const app = express();
mongoose.connect(process.env.MONGO_URI).then(() => console.log("Connected to MongoDB")).catch(err => console.error(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + Math.round(Math.random()*1e9) + path.extname(file.originalname)),
});
const upload = multer({ storage, limits: { fileSize: 5*1024*1024 }, fileFilter: (req,file,cb) => { const ok = /jpeg|jpg|png|webp/.test(file.mimetype); cb(ok ? null : new Error("Images only"), ok); }});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(session({ secret: "mydreamhome2024secret", resave: false, saveUninitialized: false, cookie: { maxAge: 24*60*60*1000 }}));

// Middleware to pass session to all views
app.use((req, res, next) => { res.locals.user = req.session.user || null; next(); });

// Auth middleware
function requireLogin(role) {
  return (req, res, next) => {
    if (!req.session.user) return res.redirect("/login");
    if (role && req.session.user.role !== role) return res.redirect("/login");
    next();
  };
}

// ===== PUBLIC PAGES =====
app.get("/", async (req, res) => {
  try {
    const [featuredProperties, propertyCount, agentCount] = await Promise.all([
      Property.find({ approved: true, status: { $nin: ["sold"] } }).sort({ createdAt: -1 }).limit(6).lean(),
      Property.countDocuments({ approved: true }),
      Agent.countDocuments(),
    ]);
    const cities = await Property.distinct("city", { approved: true });
    res.render("index", { featuredProperties, propertyCount, agentCount, cityCount: cities.length });
  } catch (err) { res.render("index", { featuredProperties: [], propertyCount: 0, agentCount: 0, cityCount: 0 }); }
});

app.get("/properties", async (req, res) => {
  try {
    const filter = { approved: true, status: { $nin: ["sold"] } };
    if (req.query.type) filter.listing_type = req.query.type;
    if (req.query.ptype) filter.property_type = req.query.ptype;
    if (req.query.city) filter.city = req.query.city;
    if (req.query.bedrooms) filter.number_of_bedroom = parseInt(req.query.bedrooms);
    if (req.query.bachelor === "true") filter.bachelor_allowed = true;
    const properties = await Property.find(filter).sort({ createdAt: -1 }).lean();
    const cities = await Property.distinct("city", { approved: true });
    res.render("properties", { properties, cities, query: req.query });
  } catch (err) { res.render("properties", { properties: [], cities: [], query: req.query }); }
});

app.get("/property/:pid", async (req, res) => {
  try {
    const property = await Property.findOne({ pid: parseInt(req.params.pid), approved: true }).lean();
    if (!property) return res.render("confermation", { message3: "Property not found" });
    const agent = await Agent.findOne({ agent_id: property.agent_id }).lean();
    const seller = await Seller.findOne({ seller_id: property.seller_id }).lean();
    res.render("property_detail", { property, agent, seller });
  } catch (err) { res.render("confermation", { message3: "Error: " + err.message }); }
});

app.get("/about", (req, res) => res.render("about"));
app.get("/contact", (req, res) => res.render("contact"));
app.post("/contact", async (req, res) => {
  try { await new ContactInfo({ name: req.body.name, email: req.body.email, phoneno: req.body.phone, message: req.body.message }).save(); res.render("confermation", { message3: "Thank you! We'll get back to you soon." }); }
  catch (err) { res.render("confermation", { message3: "Thank you for contacting us!" }); }
});

// ===== AUTH =====
app.get("/login", (req, res) => res.render("login", { error: null }));
app.get("/register", (req, res) => res.render("register", { error: null, success: null }));

app.post("/login", async (req, res) => {
  const { role, username, email, password } = req.body;
  try {
    let user = null;
    if (role === "admin") {
      user = await Admin.findOne({ username, password });
      if (user) { req.session.user = { id: username, role: "admin", name: "Admin" }; return res.redirect("/admin-dashboard"); }
    } else if (role === "office") {
      user = await OfficeLogin.findOne({ username, password });
      if (user) { req.session.user = { id: username, role: "office", name: "Office" }; return res.redirect("/office-dashboard"); }
    } else if (role === "agent") {
      user = await AgentLogin.findOne({ username, password });
      if (user) { const ag = await Agent.findOne({ agent_id: user.agent_id }); req.session.user = { id: username, role: "agent", name: ag ? ag.fname : "Agent", agent_id: user.agent_id, city: ag ? ag.city : "" }; return res.redirect("/agent-dashboard"); }
    } else if (role === "seller") {
      user = await Seller.findOne({ email, password });
      if (user) { req.session.user = { id: user.seller_id, role: "seller", name: user.fname }; return res.redirect("/seller-dashboard"); }
    } else if (role === "buyer") {
      user = await Buyer.findOne({ email, password });
      if (user) { req.session.user = { id: user.buyer_id, role: "buyer", name: user.fname }; return res.redirect("/buyer-dashboard"); }
    }
    res.render("login", { error: "Invalid credentials. Please check and try again." });
  } catch (err) { res.render("login", { error: "An error occurred" }); }
});

app.post("/register", async (req, res) => {
  try {
    const { role, fname, lname, email, phoneno, password, upi_id } = req.body;
    if (role === "buyer") {
      if (await Buyer.findOne({ email })) return res.render("register", { error: "Email already registered as buyer", success: null });
      const buyer_id = await Counter.getNextSequence("buyer_id");
      await new Buyer({ buyer_id, fname, lname, email, phoneno, password }).save();
      res.render("register", { success: `Account created! Your Buyer ID is #${buyer_id}. You can now login with your email & password.`, error: null });
    } else {
      if (await Seller.findOne({ email })) return res.render("register", { error: "Email already registered as seller", success: null });
      const seller_id = await Counter.getNextSequence("seller_id");
      await new Seller({ seller_id, fname, lname, email, phoneno, password, UPI_ID: upi_id }).save();
      res.render("register", { success: `Account created! Your Seller ID is #${seller_id}. You can now login with your email & password.`, error: null });
    }
  } catch (err) { res.render("register", { error: "Registration failed: " + err.message, success: null }); }
});

app.get("/logout", (req, res) => { req.session.destroy(); res.redirect("/"); });

app.get("/change-password", (req, res) => { if (!req.session.user) return res.redirect("/login"); res.render("change_password", { error: null, success: null }); });
app.post("/change-password", async (req, res) => {
  if (!req.session.user) return res.redirect("/login");
  const { old_password, new_password } = req.body;
  const u = req.session.user;
  try {
    let updated = false;
    if (u.role === "admin") { updated = !!(await Admin.findOneAndUpdate({ username: u.id, password: old_password }, { password: new_password })); }
    else if (u.role === "office") { updated = !!(await OfficeLogin.findOneAndUpdate({ username: u.id, password: old_password }, { password: new_password })); }
    else if (u.role === "agent") { updated = !!(await AgentLogin.findOneAndUpdate({ username: u.id, password: old_password }, { password: new_password })); }
    else if (u.role === "seller") { updated = !!(await Seller.findOneAndUpdate({ seller_id: u.id, password: old_password }, { password: new_password })); }
    else if (u.role === "buyer") { updated = !!(await Buyer.findOneAndUpdate({ buyer_id: u.id, password: old_password }, { password: new_password })); }
    if (updated) res.render("change_password", { success: "Password changed successfully!", error: null });
    else res.render("change_password", { error: "Old password is incorrect", success: null });
  } catch (err) { res.render("change_password", { error: "Error: " + err.message, success: null }); }
});

// ===== APPLY AS AGENT =====
app.get("/apply-agent", (req, res) => res.render("apply_agent", { success: null }));
app.post("/apply-agent", async (req, res) => {
  try { await new AgentApplication(req.body).save(); res.render("apply_agent", { success: "Application submitted! Our office team will contact you soon." }); }
  catch (err) { res.render("apply_agent", { success: null }); }
});

// ===== BUYER DASHBOARD =====
app.get("/buyer-dashboard", requireLogin("buyer"), async (req, res) => {
  const transactions = await Transaction.find({ buyer_id: req.session.user.id }).lean();
  const locked = await Property.find({ locked_by: req.session.user.id, status: "locked" }).lean();
  res.render("buyer_dashboard", { transactions, locked });
});

app.post("/lock-property", requireLogin("buyer"), async (req, res) => {
  try {
    const prop = await Property.findOne({ pid: parseInt(req.body.pid), approved: true, status: { $nin: ["sold", "locked"] } });
    if (!prop) return res.render("confermation", { message3: "Property not available for locking" });
    prop.status = "locked"; prop.locked_by = req.session.user.id; prop.locked_at = new Date();
    await prop.save();
    res.render("confermation", { message3: `Property #${prop.pid} locked! The assigned agent will contact you soon.` });
  } catch (err) { res.render("confermation", { message3: "Error: " + err.message }); }
});

// ===== SELLER DASHBOARD =====
app.get("/seller-dashboard", requireLogin("seller"), async (req, res) => {
  const properties = await Property.find({ seller_id: req.session.user.id }).lean();
  const transactions = await Transaction.find({ seller_id: req.session.user.id }).lean();
  res.render("seller_dashboard", { properties, transactions });
});

app.get("/seller-add-property", requireLogin("seller"), (req, res) => res.render("seller_add_property"));
app.post("/seller-add-property", requireLogin("seller"), upload.array("images", 5), async (req, res) => {
  try {
    const pid = await Counter.getNextSequence("property_id");
    const imgs = req.files ? req.files.map(f => f.filename) : [];
    await new Property({
      pid, title: req.body.title, description: req.body.description, price: req.body.price,
      status: "available", listing_type: req.body.listing_type, property_type: req.body.property_type,
      number_of_bedroom: req.body.bedrooms, bachelor_allowed: req.body.bachelor_allowed === "true",
      furnished: req.body.furnished, area_sqft: req.body.area_sqft || undefined,
      seller_id: req.session.user.id, yoc: req.body.yoc || undefined,
      city: req.body.city, street: req.body.street, postalcode: req.body.postalcode,
      images: imgs, approved: false,
    }).save();
    res.render("confermation", { message3: `Property #${pid} submitted for review! Office will verify and list it.` });
  } catch (err) { res.render("confermation", { message3: "Error: " + err.message }); }
});

// ===== AGENT DASHBOARD =====
app.get("/agent-dashboard", requireLogin("agent"), async (req, res) => {
  const u = req.session.user;
  const agent = await Agent.findOne({ agent_id: u.agent_id }).lean();
  const properties = await Property.find({ agent_id: u.agent_id, approved: true }).lean();
  const cityProperties = await Property.find({ city: u.city, approved: true }).lean();
  const buyers = await Buyer.find().lean();
  const sellers = await Seller.find().lean();
  const transactions = await Transaction.find({ agent_id: u.agent_id }).lean();
  const locked = await Property.find({ agent_id: u.agent_id, status: "locked" }).lean();
  res.render("agent_dashboard", { agent, properties, cityProperties, buyers, sellers, transactions, locked });
});

app.post("/agent-mark-sold", requireLogin("agent"), async (req, res) => {
  try {
    const prop = await Property.findOne({ pid: parseInt(req.body.pid) });
    if (!prop) return res.render("confermation", { message3: "Property not found" });
    const tid = await Counter.getNextSequence("transaction_id");
    await new Transaction({
      transaction_id: tid, pid: prop.pid, seller_id: prop.seller_id,
      buyer_id: prop.locked_by || parseInt(req.body.buyer_id),
      transaction_date: new Date(), transaction_amount: prop.price,
      commission: prop.price * 0.02, agent_id: req.session.user.agent_id,
    }).save();
    prop.status = "sold"; prop.year_of_sale = new Date().getFullYear(); await prop.save();
    await Agent.updateOne({ agent_id: req.session.user.agent_id }, { $inc: { NOP_sale: 1, total_saleAmount: prop.price } });
    res.render("confermation", { message3: `Property #${prop.pid} marked as sold! Transaction #${tid} created.` });
  } catch (err) { res.render("confermation", { message3: "Error: " + err.message }); }
});

// ===== OFFICE DASHBOARD =====
app.get("/office-dashboard", requireLogin("office"), async (req, res) => {
  const agents = await Agent.find().lean();
  const pending = await Property.find({ approved: false }).lean();
  const applications = await AgentApplication.find({ status: "pending" }).lean();
  res.render("office_dashboard", { agents, pending, applications, msg: req.query.msg || null });
});

app.post("/office-add-agent", requireLogin("office"), async (req, res) => {
  try {
    const agent_id = await Counter.getNextSequence("agent_id");
    await new Agent({ agent_id, fname: req.body.fname, lname: req.body.lname, city: req.body.city, street: req.body.street, postalcode: req.body.postalcode, phoneno: req.body.phoneno, email: req.body.email, office_id: 125 }).save();
    await new AgentLogin({ username: req.body.username, password: req.body.password, agent_id }).save();
    res.redirect("/office-dashboard?msg=Agent added! ID: " + agent_id + " | Login: " + req.body.username);
  } catch (err) { res.redirect("/office-dashboard?msg=Error: " + err.message); }
});

app.post("/office-delete-agent", requireLogin("office"), async (req, res) => {
  await Agent.deleteOne({ agent_id: parseInt(req.body.agent_id) });
  res.redirect("/office-dashboard?msg=Agent deleted");
});

app.post("/office-approve-property", requireLogin("office"), async (req, res) => {
  await Property.updateOne({ pid: parseInt(req.body.pid) }, { approved: true, agent_id: parseInt(req.body.agent_id) || undefined });
  res.redirect("/office-dashboard?msg=Property #" + req.body.pid + " approved!");
});

app.post("/office-reject-property", requireLogin("office"), async (req, res) => {
  await Property.deleteOne({ pid: parseInt(req.body.pid) });
  res.redirect("/office-dashboard?msg=Property rejected and removed");
});

app.post("/office-approve-application", requireLogin("office"), async (req, res) => {
  await AgentApplication.updateOne({ _id: req.body.app_id }, { status: "approved" });
  res.redirect("/office-dashboard?msg=Application approved. Add them as agent using the form.");
});

app.get("/office-view/:collection", requireLogin("office"), async (req, res) => {
  const c = req.params.collection;
  let results, fields;
  if (c === "agents") { results = await Agent.find().lean(); fields = ["agent_id","fname","lname","email","phoneno","city","NOP_sale","total_saleAmount"]; }
  else if (c === "properties") { results = await Property.find().lean(); fields = ["pid","title","price","listing_type","property_type","status","approved","city"]; }
  else if (c === "buyers") { results = await Buyer.find().lean(); fields = ["buyer_id","fname","lname","phoneno","email"]; }
  else if (c === "sellers") { results = await Seller.find().lean(); fields = ["seller_id","fname","lname","phoneno","email","UPI_ID"]; }
  else if (c === "transactions") { results = await Transaction.find().lean(); fields = ["transaction_id","pid","seller_id","buyer_id","transaction_amount","agent_id"]; }
  else return res.redirect("/office-dashboard");
  const rows = results.map(r => fields.map(f => r[f] !== undefined ? r[f] : ""));
  res.render("showdata", { fields, rows, backUrl: "/office-dashboard" });
});

// ===== ADMIN DASHBOARD =====
app.get("/admin-dashboard", requireLogin("admin"), async (req, res) => {
  const counts = {
    agents: await Agent.countDocuments(), properties: await Property.countDocuments({ approved: true }),
    buyers: await Buyer.countDocuments(), sellers: await Seller.countDocuments(),
    transactions: await Transaction.countDocuments(), pending: await Property.countDocuments({ approved: false }),
  };
  res.render("admin_dashboard", { counts, msg: req.query.msg || null });
});

app.get("/admin-view/:collection", requireLogin("admin"), async (req, res) => {
  const c = req.params.collection;
  let results, fields;
  if (c === "agents") { results = await Agent.find().lean(); fields = ["agent_id","fname","lname","email","phoneno","city","commision","NOP_sale","total_saleAmount"]; }
  else if (c === "properties") { results = await Property.find().lean(); fields = ["pid","title","price","listing_type","property_type","status","approved","bachelor_allowed","city","agent_id"]; }
  else if (c === "buyers") { results = await Buyer.find().lean(); fields = ["buyer_id","fname","lname","phoneno","email","agent_id"]; }
  else if (c === "sellers") { results = await Seller.find().lean(); fields = ["seller_id","fname","lname","phoneno","email","UPI_ID","agent_id"]; }
  else if (c === "transactions") { results = await Transaction.find().lean(); fields = ["transaction_id","pid","seller_id","buyer_id","transaction_date","transaction_amount","commission","agent_id"]; }
  else if (c === "offices") { results = await Office.find().lean(); fields = ["office_id","state","city","zip","phone","email"]; }
  else return res.redirect("/admin-dashboard");
  const rows = results.map(r => fields.map(f => r[f] !== undefined ? r[f] : ""));
  res.render("admin_view_data", { fields, rows, collection: c });
});

app.get("/admin-add/:collection", requireLogin("admin"), (req, res) => res.render("admin_add", { collection: req.params.collection }));
app.post("/admin-add/buyer", requireLogin("admin"), async (req, res) => {
  const buyer_id = await Counter.getNextSequence("buyer_id");
  await new Buyer({ buyer_id, ...req.body }).save();
  res.redirect("/admin-dashboard?msg=Buyer added! ID: " + buyer_id);
});
app.post("/admin-add/seller", requireLogin("admin"), async (req, res) => {
  const seller_id = await Counter.getNextSequence("seller_id");
  await new Seller({ seller_id, ...req.body, UPI_ID: req.body.upi_id }).save();
  res.redirect("/admin-dashboard?msg=Seller added! ID: " + seller_id);
});
app.post("/admin-add/property", requireLogin("admin"), upload.array("images", 5), async (req, res) => {
  const pid = await Counter.getNextSequence("property_id");
  const imgs = req.files ? req.files.map(f => f.filename) : [];
  await new Property({ pid, ...req.body, images: imgs, approved: true, status: "available", bachelor_allowed: req.body.bachelor_allowed === "true", number_of_bedroom: req.body.bedrooms }).save();
  res.redirect("/admin-dashboard?msg=Property added! ID: " + pid);
});
app.post("/admin-add/transaction", requireLogin("admin"), async (req, res) => {
  const tid = await Counter.getNextSequence("transaction_id");
  await new Transaction({ transaction_id: tid, ...req.body }).save();
  await Property.updateOne({ pid: parseInt(req.body.pid) }, { status: "sold", year_of_sale: new Date().getFullYear() });
  await Agent.updateOne({ agent_id: parseInt(req.body.agent_id) }, { $inc: { NOP_sale: 1, total_saleAmount: parseFloat(req.body.transaction_amount) } });
  res.redirect("/admin-dashboard?msg=Transaction added! ID: " + tid);
});

app.post("/admin-delete/:collection/:id", requireLogin("admin"), async (req, res) => {
  const c = req.params.collection; const id = req.params.id;
  if (c === "agents") await Agent.deleteOne({ agent_id: parseInt(id) });
  else if (c === "properties") await Property.deleteOne({ pid: parseInt(id) });
  else if (c === "buyers") await Buyer.deleteOne({ buyer_id: parseInt(id) });
  else if (c === "sellers") await Seller.deleteOne({ seller_id: parseInt(id) });
  else if (c === "transactions") await Transaction.deleteOne({ transaction_id: parseInt(id) });
  res.redirect("/admin-view/" + c + "?msg=Deleted");
});

app.post("/admin-approve-property", requireLogin("admin"), async (req, res) => {
  await Property.updateOne({ pid: parseInt(req.body.pid) }, { approved: true, agent_id: parseInt(req.body.agent_id) || undefined });
  res.redirect("/admin-dashboard?msg=Property approved!");
});

// Admin queries
app.get("/admin-queries", requireLogin("admin"), (req, res) => res.render("admin_queries"));
app.post("/admin-runquery", requireLogin("admin"), async (req, res) => {
  let results, fields;
  try {
    switch (req.body.topic) {
      case "q1": results = await Property.find({ city:"Delhi", yoc:{$gt:2020}, listing_type:"rent", approved:true }).lean(); fields=["pid","price","number_of_bedroom","city","street"]; break;
      case "q2": results = await Property.find({ price:{$gte:3000000,$lte:5000000}, city:"Bangalore", approved:true }).lean(); fields=["pid","price","city","street","postalcode"]; break;
      case "q3": results = await Property.find({ street:"MG Road", number_of_bedroom:{$gte:2}, price:{$lt:35000}, listing_type:"rent", approved:true }).lean(); fields=["pid","price","number_of_bedroom","city","street"]; break;
      case "q4": results = await Transaction.aggregate([{$group:{_id:"$agent_id",total:{$sum:"$transaction_amount"}}},{$sort:{total:-1}},{$limit:1},{$lookup:{from:"agents",localField:"_id",foreignField:"agent_id",as:"a"}},{$unwind:"$a"},{$project:{fname:"$a.fname",lname:"$a.lname",total:1,_id:0}}]); fields=["fname","lname","total"]; break;
      case "q5": results = await Property.aggregate([{$match:{year_of_listing:2024}},{$group:{_id:"$agent_id",avg:{$avg:"$price"}}},{$lookup:{from:"agents",localField:"_id",foreignField:"agent_id",as:"a"}},{$unwind:"$a"},{$project:{agent_id:"$_id",fname:"$a.fname",avg:{$round:["$avg",2]},_id:0}}]); fields=["agent_id","fname","avg"]; break;
      case "q6": results = await Property.find({ listing_type:"buy", approved:true }).sort({price:-1}).limit(1).lean(); fields=["pid","price","number_of_bedroom","city","street"]; break;
      case "q7": results = await Property.find({ listing_type:"rent", approved:true }).sort({price:-1}).limit(1).lean(); fields=["pid","price","number_of_bedroom","city","street"]; break;
      default: return res.render("confermation", { message3: "Invalid query" });
    }
    if (!results||!results.length) return res.render("confermation", { message3: "No records found" });
    const rows = results.map(r => fields.map(f => r[f]!==undefined?r[f]:""));
    res.render("query_results", { fields, rows });
  } catch (err) { res.render("confermation", { message3: "Error: "+err.message }); }
});

// ===== FIND AGENT (public) =====
app.get("/find", (req, res) => res.render("findagent", { error: null }));
app.post("/findagent", async (req, res) => {
  try {
    const { city, price, bedrooms, status } = req.body;
    const pr = price.split("-"); const min = parseFloat(pr[0]); const max = pr[1]==="+"?Infinity:parseFloat(pr[1]);
    const props = await Property.find({ price:{$gte:min,$lte:max}, number_of_bedroom:parseInt(bedrooms), listing_type: status==="sell"?"buy":status, approved:true }).lean();
    const aids = [...new Set(props.map(p=>p.agent_id))];
    const agents = await Agent.find({ agent_id:{$in:aids}, city }).lean();
    if (!agents.length) return res.render("confermation", { message3: "No agents found. Try different filters." });
    const rows = [];
    for (const a of agents) { for (const p of props.filter(p=>p.agent_id===a.agent_id)) { rows.push([p.price,a.fname,a.lname,a.city,a.phoneno,a.email,a.NOP_sale]); }}
    res.render("query_results", { fields:["price","fname","lname","city","phoneno","email","NOP_sale"], rows });
  } catch (err) { res.render("confermation", { message3: "Error: "+err.message }); }
});

app.listen(3000, () => console.log("Server started on port 3000"));
