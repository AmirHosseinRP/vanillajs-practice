const http = require("http");
const PORT = process.env.PORT || 4000;
const todos = require("./todos");
const getRequestData = require("./utils");
const server = http.createServer(async (request, response) => {
  if (request.url === "/api/v1/todos" && request.method === "GET") {
    response.writeHead(200, {
      "content-type": "application/json",
    });
    response.end(JSON.stringify(todos));
  } else if (request.url === "/api/v1/todos" && request.method === "POST") {
    let req_body = await getRequestData(request);
    todos.push(JSON.parse(req_body));
    response.writeHead(201, {
      "content-type": "application/json",
    });
    response.end(JSON.stringify(JSON.parse(req_body)));
  }
});
server.listen(PORT, () => {
  console.log("listening", PORT);
});
server.on("error", (error) => {
  if (error.code === "EADRINUSE") {
    console.log("in use");
  }
});
