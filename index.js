require("dotenv").config();
const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT || 9000
const server = require('./api/server.js');
server.use(express.json())
server.use(cors())




server.use((err, req,res,next)=>{ // eslint-disable-line
  res.status(500).json({
      message: err.message,
      stack: err.stack
  })
})
server.listen(PORT, () => {
  console.log(`\n*** Server Running on http://localhost:${PORT} ***\n`);
});