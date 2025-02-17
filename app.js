const http = require("http");
const routes = require('./routes.js');

//               incoming msg
// function rqListener(request, response) {
//    console.log(request);
// }

console.log(routes.someText);


const server = http.createServer(routes.handler);

server.listen(3000);

// username 
// email
// password
// submit 
