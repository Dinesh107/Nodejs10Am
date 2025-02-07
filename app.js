const http = require("http");
const fs = require("fs");

//               incoming msg
// function rqListener(request, response) {
//    console.log(request);
// }

const server = http.createServer((request, response) => {
  const url = request.url;
  const method = request.method;
  if (url === "/") {
    response.setHeader("Content-type", "text/html");
    response.write("<html>");
    response.write("<head><title>Enter Details in form</title></head>");
    response.write(
      "<body><form action='/message' method='POST'><input type='text' name='email'><input type='submit' value='Send'></form></body>"
    );
    response.write("</html>");
    return response.end();
  }

  if (url==='/message' && method == 'POST') {

     request.on('data', (chunk) => {
      console.log(`Received ${chunk.length} bytes of data.`);
      console.log(chunk);
     })


    fs.writeFileSync('hello.txt', 'Sample Text');
    response.setHeader('Location', '/')
    response.statusCode = 302;
    return response.end();
  }

  console.log(request.url);
  console.log(request.method);
  console.log(request.headers);
  response.setHeader("Content-type", "text/html");
  response.write("<html>");
  response.write("<head><title>Hello from node js server</title></head>");
  response.write("<body><h1>Welcome to my Node Js server</h1></body>");
  response.write("</html>");
  response.end();
});

server.listen(3000);

// username 
// email
// password
// submit 
