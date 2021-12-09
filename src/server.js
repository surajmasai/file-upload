const app = require("./index");

const connect = require("./configs/db");


app.listen(5469, async function () {
    await connect();

    console.log("listening on port 5469");
})