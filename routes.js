const fs = require("fs");

const requestHander = (request, response) => {
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

  if (url === "/message" && method == "POST") {
    const body = [];

    request.on("data", (chunk) => {
      console.log(`Received ${chunk.length} bytes of data. chuck`);
      console.log(chunk);
      body.push(chunk);
      console.log(chunk);
    });

    return request.on("end", () => {
      console.log("End event recieved");
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=");
      fs.writeFile("greet.txt", message[1], (error) => {
        console.log("File write completed");
        response.setHeader("Location", "/");
        response.statusCode = 302;
        return response.end();
      });
      console.log(parsedBody);
      // fs.writeFileSync('greet.txt', 'Sample Text');
    });
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
};


module.exports = {
    handler: requestHander, 
    someText: 'Printing some text'
};

// exports.handler = requestHander;
// exports.someText = 'Printing some text';

// module.exports.handler = requestHander;

// module.exports.someText = 'Printing some text';
