const { AllRoutes } = require("../app/routes/router");
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const morgan = require("morgan");

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
        this.#app.use(this.#express.static(path.join(__dirname, "..", "..", "public")));
        this.#app.use(morgan("dev"));

        this.#app.use("/api", swaggerUI.serve, swaggerUI.setup(swaggerJSDoc({
            definition : {
                info : {
                    title : "Fooball-managment project",
                    version : "1.0.0",
                    description : "a toturial project for me to practice and learn more about nodejs, mongo, express"
                },
                servers : [
                    {
                        url : "http://localhost:9000"
                    }
                ]
            },
            apis : ["./app/routes/*.js"],
        })));
    }

    createServer(port){
        this.#app.listen(port, () => {
            console.log(`The server is running on port ${port}`)
        })
    }

    createRoutes(){
        this.#app.use(AllRoutes);
    }

    handleErrors(){

        this.#app.use((req, res, next) => {
            return res.status(404).json({
                status : 404,
                success : false,
                message : "We couldnt find the page you are looking for!!!"
            })
        })

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