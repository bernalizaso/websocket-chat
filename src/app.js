import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";

import __dirname from "./utils.js";
import viewsRouter from "./routes/views.router.js";

const app = express();

//motor de plantillas

app.engine("handlebars", handlebars.engine());

//establecemos la ruta de las vistas

app.set("views", `${__dirname}/views`);

//escablecer motor de renderizado

app.set("view engine", "handlebars");

//establecer el servidor estatico de archivos

app.use(express.static(`${__dirname}/public`));

//utilizar ruta base de mi grupo views routes

app.use("/", viewsRouter);

//inicio mi servidor y lo almaceno en una constante

const PORT = 8080;
const HOST = "127.0.0.1";
const httpserver = app.listen(PORT, HOST, () => {
  console.log(`Server andando en http://${HOST}:${PORT} `);
});

//inicio mi servidor websocker

const io = new Server(httpserver);

const messages = [];

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado: ", socket.id);

  socket.on("message", (data) => {
    //console.log(`Mensaje: ${data.message}`);
    messages.push(data);
    io.emit("messagesLog", messages);
  });
  socket.on("userConnect", (data) => {
    socket.emit("messagesLog", messages);
    socket.broadcast.emit("newUser", data);
  });
});
