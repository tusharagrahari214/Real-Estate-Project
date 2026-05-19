# 🏡 My Dream Home — Real Estate Management System

A full-stack real estate platform for buying, renting, and managing properties across India. Built with **Node.js**, **Express**, **MongoDB Atlas**, and **EJS** — inspired by platforms like MagicBricks and NoBroker.

> **Live Demo:** Run locally at `http://localhost:3000`

---

## ✨ Features

### For Everyone (Public)
- 🏠 Browse properties with advanced filters (city, type, BHK, bachelor-friendly)
- 🔍 Click any property to view full details + assigned agent contact info
- 📋 Register as a Buyer or Seller with auto-generated IDs
- 📝 Apply to become an Agent
- 📞 Contact form with office details

### For Buyers
- 🔐 Login with email & password
- 🔒 Lock a property (reserves it, notifies the agent)
- 📊 View transaction history and locked properties

### For Sellers
- 🔐 Login with email & password
- 📝 List new properties with images (submitted for office review)
- 📈 Track property status (Pending Review → Approved → Sold)
- 💰 UPI ID stored for payment reference

### For Agents
- 🔐 Login with credentials assigned by office
- 🏙️ View all properties in their city
- 🔔 See locked properties with "Mark as Sold" action
- 👥 Access all buyers & sellers lists
- 📊 Transaction history & performance stats

### For Office
- 👤 Add new agents with login credentials (single form)
- ✅ Approve or reject seller-submitted properties
- 🎯 Assign agents to properties during approval
- 📋 Review agent applications
- 📊 View all database tables

### For Admin
- 📊 Dashboard with real-time stats (agents, properties, buyers, sellers, transactions)
- ➕ Add any record (buyers, sellers, properties, transactions)
- 🗑️ Delete any record from any collection
- 📈 Run 7 pre-built analytical queries
- 🔄 Full CRUD access to all data

### System Features
- 🔢 **Auto-generated IDs** for buyers, sellers, agents, properties, transactions
- 📸 **Image upload** for property listings (via Multer)
- 🔐 **Session-based authentication** with role-based access control
- 🔑 **Change password** for all roles
- 🏷️ **Property categories**: Apartment, House, Villa, Flat, Hostel, PG
- 👨‍🎓 **Bachelor-friendly filter** for student accommodations
- 📱 **Responsive design** with hamburger menu for mobile

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Backend** | Node.js, Express.js |
| **Frontend** | EJS (Embedded JavaScript Templates) |
| **Database** | MongoDB Atlas (Mongoose ODM) |
| **Styling** | Custom CSS Design System (Nike/Coca-Cola inspired) |
| **Auth** | Express-Session |
| **File Upload** | Multer |
| **Icons** | Font Awesome 6 |
| **Font** | Inter (Google Fonts) |

---

## 📁 Project Structure

```
Real-Estate-project-main/
├── index.js                    # Main server file (all routes)
├── seed.js                     # Database seeding script
├── package.json                # Dependencies
├── .env                        # Environment variables (MongoDB URI)
├── my_dream_home.sql           # Original SQL schema (reference only)
│
├── models/                     # Mongoose schemas
│   ├── Admin.js                # Admin credentials
│   ├── Agent.js                # Agent profiles
│   ├── AgentLogin.js           # Agent login credentials (with agent_id)
│   ├── AgentApplication.js     # Agent application submissions
│   ├── Buyer.js                # Buyer profiles
│   ├── Seller.js               # Seller profiles (with UPI ID)
│   ├── Property.js             # Property listings
│   ├── Transaction.js          # Sale/rent transactions
│   ├── Office.js               # Office details
│   ├── OfficeLogin.js          # Office login credentials
│   ├── ContactInfo.js          # Contact form submissions
│   └── Counter.js              # Auto-increment ID generator
│
├── views/                      # EJS templates
│   ├── index.ejs               # Homepage
│   ├── properties.ejs          # Property listings with filters
│   ├── property_detail.ejs     # Single property detail + agent card
│   ├── login.ejs               # Unified login (5 roles)
│   ├── register.ejs            # Buyer/Seller registration
│   ├── apply_agent.ejs         # Agent application form
│   ├── change_password.ejs     # Password change form
│   ├── buyer_dashboard.ejs     # Buyer dashboard
│   ├── seller_dashboard.ejs    # Seller dashboard
│   ├── seller_add_property.ejs # Seller property listing form
│   ├── agent_dashboard.ejs     # Agent dashboard
│   ├── office_dashboard.ejs    # Office management panel
│   ├── admin_dashboard.ejs     # Admin dashboard
│   ├── admin_view_data.ejs     # Admin data table with delete
│   ├── admin_add.ejs           # Admin add record forms
│   ├── admin_queries.ejs       # Admin query selector
│   ├── query_results.ejs       # Query results table
│   ├── about.ejs               # About page
│   ├── contact.ejs             # Contact page
│   ├── findagent.ejs           # Find agent by criteria
│   ├── confermation.ejs        # Confirmation/message page
│   └── showdata.ejs            # Generic data table
│
├── public/                     # Static assets
│   ├── css/global.css          # Design system
│   ├── images/                 # Static images
│   └── uploads/                # User-uploaded property images
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB Atlas** account (free tier works)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/Real-Estate-project-main.git
cd Real-Estate-project-main

# 2. Install dependencies
npm install

# 3. Create .env file
echo "MONGO_URI=your_mongodb_atlas_connection_string" > .env

# 4. Seed the database with sample data
node seed.js

# 5. Start the server
npm start
```

### Open in browser
```
http://localhost:3000
```

---

## 🔑 Default Login Credentials

| Role | Login Field | Username / Email | Password |
|------|------------|-----------------|----------|
| **Admin** | Username | `@tushar1` | `2101072` |
| **Office** | Username | `@tushar1` | `2101073` |
| **Agent** | Username | `@Amit` | `Amit01` |
| **Buyer** | Email | `aryan.sharma@example.com` | `pass123` |
| **Seller** | Email | `vikram.sinha@example.com` | `pass123` |

> All 20 agents have credentials like `@Neha`/`Neha02`, `@Rajesh`/`Rajesh03`, etc.
> All 20 buyers and sellers share the password `pass123`.

---

## 🔄 Application Flow

### Property Listing Flow
```
Seller Registers → Lists Property → Office Reviews → Assigns Agent → Property Goes Live
```

### Property Purchase Flow
```
Buyer Browses → Filters Properties → Views Details → Sees Agent Info → Locks Property → Agent Marks Sold → Transaction Created
```

### Agent Onboarding Flow
```
Applicant Submits Form (or visits office) → Office Reviews → Adds Agent + Credentials → Agent Can Login
```

### Transaction Automation
When a property is marked as sold:
1. ✅ Transaction record auto-created with all details
2. ✅ Property status updated to `sold` (hidden from listings)
3. ✅ Agent's `NOP_sale` (number of properties sold) incremented
4. ✅ Agent's `total_saleAmount` updated

---

## 📊 Database Schema (MongoDB Collections)

| Collection | Purpose | Key Fields |
|-----------|---------|------------|
| `admins` | Admin login | username, password |
| `agents` | Agent profiles | agent_id, name, city, commission, NOP_sale |
| `agentlogins` | Agent credentials | username, password, agent_id |
| `agentapplications` | Agent applications | name, city, phone, status |
| `buyers` | Buyer profiles | buyer_id, name, email, password |
| `sellers` | Seller profiles | seller_id, name, email, UPI_ID, password |
| `properties` | Property listings | pid, title, price, type, approved, images |
| `transactions` | Completed deals | transaction_id, pid, amount, agent_id |
| `offices` | Office info | office_id, city, phone, email |
| `officelogins` | Office credentials | username, password |
| `contactinfos` | Contact submissions | name, email, message |
| `counters` | Auto-increment IDs | _id (field name), seq (current value) |

---

## 📝 Pre-Built Queries (Admin)

| # | Query | Description |
|---|-------|-------------|
| Q1 | Delhi Rentals (post-2020) | Rental properties in Delhi built after 2020 |
| Q2 | Bangalore ₹30L–50L | Properties in Bangalore within budget |
| Q3 | MG Road 2+ BHK < ₹35K | Affordable rentals on MG Road |
| Q4 | Top Agent | Agent with highest total sales |
| Q5 | Avg Price by Agent | Average property price per agent |
| Q6 | Most Expensive (Sale) | Priciest property for buying |
| Q7 | Most Expensive (Rent) | Priciest property for renting |

---

## 📌 About the SQL File

The `my_dream_home.sql` file contains the **original relational database schema** designed during the planning phase. It served as the blueprint for creating MongoDB models. The project uses **MongoDB Atlas** for cloud deployment and schema flexibility, but the SQL file is kept for reference and academic documentation.

---

## 👤 Author

**Tushar Agrahari**
- 📧 Email: tusharagrahari10@gmail.com
- 📱 Phone: +91 9794232900
- 📸 Instagram: [@_tushar_agrahari_214](https://www.instagram.com/_tushar_agrahari_214/)
- 📍 Gorakhpur, Uttar Pradesh

---

## 📄 License

ISC License
