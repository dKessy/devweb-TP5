import express from "express";
import morgan from "morgan";

const host = "localhost";
const port = 8000;

const app = express();
app.use(express.static("static"));
app.get(["/", "/index.html"],async function (request, response, next) {

  response.sendFile("index.html", { root: "./" });
});

app.get("/random/:nb", async function (request, response, next) {
    
  const length = request.params.nb;
  const contents = Array.from({ length })
    .map((_) => `<li>${Math.floor(100 * Math.random())}</li>`)
    .join("\n");
  return response.send(`<html><ul>${contents}</ul></html>`);
});

const server = app.listen(port, host);

server.on("listening", () =>
    {if (app.get("env") === "development") app.use(morgan("dev"));
    
  console.info(
    `HTTP listening on http://localhost:${server.address().port} with mode '${process.env.NODE_ENV}'`,
  )}
);
/*Note: j'ai remplacer ${server.address().address} car != de localhost*/

console.info(`File ${import.meta.url} executed.`);
