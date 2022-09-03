class Application {
    #express = require("express");
    #app = this.#express()

    constructor(PORT, DB_URL){
        this.configDatabase(DB_URL);
        this.configApplication();
        this.createRoutes();
        this.handleErrors();
        this.createServer(PORT);
    }

    async configDatabase(db_url){
        const mongoose = require("mongoose");
        try{
            const DBconnection = await mongoose.connect(db_url);
            console.log(`Mongo connected : ${DBconnection.connection.host}`)
        }catch(err){
            console.log(err);
            process.exit(1)
        }
    }

    configApplication(){
        const path = require("path");

        this.#app.use(this.#express.json({  }));
        this.#app.use(this.#express.urlencoded({ extended : false }));
        this.#app.use(this.#express.static(path.join(__dirname, "..", "..", "public")))
    }

    createServer(port){
        this.#app.listen(port, () => {
            console.log(`The server is running on port ${port}`)
        })
    }

    createRoutes(){
        this.#app.use("/auth", require("../app/routes/authRoute"));
    }

    handleErrors(){

        this.#app.use((error, req, res, next) => {
            const status = error?.status || 500;
            const message = error?.message || "InternalErrorServer";

            return res.status(status).json({
                status,
                success : false,
                message
            })
        })
    }
}

module.exports = Application