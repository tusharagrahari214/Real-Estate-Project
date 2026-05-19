const mongoose = require("mongoose");

const agentLoginSchema = new mongoose.Schema({
  username: { type: String, required: true, maxlength: 50 },
  password: { type: String, required: true, maxlength: 20 },
  agent_id: { type: Number },
});

module.exports = mongoose.model("AgentLogin", agentLoginSchema);
