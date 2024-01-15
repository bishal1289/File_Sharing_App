const mongoose = require('mongoose');

const connect = async() => {
    await mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("DB connection established");
}).catch((err) => {
    console.log(err)
})
}

module.exports = connect;