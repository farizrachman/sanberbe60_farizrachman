// import { Express } from "express";
import express, { Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";
import fs from "fs";
import path from "path";

export default function docs(app: Express) {

    app.use('/swagger-ui', express.static(path.join(__dirname, "../../node_modules/swagger-ui-dist")));

    // app.use("/swagger-ui", express.static(path.join(__dirname, "../../node_modules/swagger-ui-dist")));
    // app.use("/assets", express.static(path.join(__dirname, "public")));
    // app.get('/swagger-ui', (req, res) => {
    //     res.sendFile(path.join(__dirname, "../../node_modules/swagger-ui-dist"));
    // });

    const css = fs.readFileSync(
        path.resolve(
            __dirname,
            "../../node_modules/swagger-ui-dist"
        ),
        "utf-8"
    );

    // app.use(
    //     "/docs",
    //     swaggerUi.serve,
    //     swaggerUi.setup(swaggerOutput, {
    //         customCss: css,
    //     })
    // );

    app.use('/', swaggerUi.serve);
    app.get('/', swaggerUi.setup(swaggerOutput, {
        customCss: css,
    }));
}