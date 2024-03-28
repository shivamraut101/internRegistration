const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const mongooseMongoDB = require("./db")

// CORS
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// })
app.use(cors());

mongooseMongoDB()

// Define routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(express.json())
app.use('/api',require("./infoRouters"))
app.use('/api',require("./Routers Display/displayRoutes"))
app.use('/api',require("./Routers Update/updateRoutes"))

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
