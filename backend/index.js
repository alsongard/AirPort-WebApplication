const mongoose = require("mongoose");
const app = require("./server");

const mongo_url = process.env.MONGO_URL;
// console.log(mongo_url) //testing:working
const port = process.env.PORT_NUMBER;

async function ConnectDB()
{
    try
    {
        await mongoose.connect(mongo_url);
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
    }
}

ConnectDB();