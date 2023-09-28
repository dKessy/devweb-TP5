import http from "node:http";
import fs from "node:fs/promises";
import { Console } from "node:console";
const host = "localhost";
const port = 8000;

async function requestListener(request, response) {
  let tab =request.url.split("/:")
  let nb_str= tab[1]
  let nb= parseInt(nb_str,10)
  let rq_url = tab[0]
  response.setHeader("Content-Type", "text/html");
  try {
    const contents = await fs.readFile("index.html", "utf8");
    switch (rq_url) {
      case "/index.html":
        response.writeHead(200);
        return response.end(contents);
      case "/random.html":
        response.writeHead(200);
        for(let i=0;i++;i<=nb){
          response.end(`<html><p>${Math.floor(100 * Math.random())}</p></html>`);
        }
      break
      default:
        response.writeHead(404);
        return response.end(`<html><p>404: NOT FOUND</p></html>`);
    }
  } catch (error) {
    console.error(error);
    response.writeHead(500);
    return response.end(`<html><p>500: INTERNAL SERVER ERROR</p></html>`);
  }
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
console.log("NODE_ENV =", process.env.NODE_ENV);

