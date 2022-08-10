const mongoose = require("mongoose");
 
mongoose.connect(
    "mongodb+srv://" + process.env.DB_USER_PASS+  "@groupomaniacluster.c9ipcfg.mongodb.net/test",
    {
        // useCreateIndex: true, 
         //useFindAndModify: false, 
         useNewUrlParser: true, 
         useUnifiedTopology: true 
     }
)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log("Failed to connect to mongo db" ,err));