

const users = [];

 const requestHandroutesler = (request, response) => {
  const url = request.url;
  const method = request.method;

  

  if(url === '/') {
    response.write('<html>');
    response.write('<head><title>Hello Users</title></head>');
    response.write('<h1>Welcome Admin!</h1>');
    response.write('</html>')

    response.end();

  }
  
  if(url === '/create-user' && method === 'POST') {
    const body = [];
    request.on('data', (chunk) => {
      body.push(chunk);
  
    })
  
    return request.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const user = parsedBody.split('=')[1];
   
      users.push(user);
   
      response.statusCode = 302;
      response.setHeader('Location', '/users');

      response.end();

    });   
  }

  if(url === '/users') {
    console.log(users);
    response.write('<html>');
    response.write('<head><title>Users</title></head>');
    response.write('<h1>List of Users</h1>');
    
    response.write('<ul>');  
    users?.map((user) => {
      return response.write(`<li>${user}</li>`)
    }) 
    response.write('</ul>');

    if(users.length === 0) {
      response.write('<p>Add new users.</p>');
    }

    response.write('<body><form action="/create-user" method="POST"><input type="text" name="username" placeholder="Username"/> <button type="submit">Send</button></form></body>');
    response.write('</html>')
   
    return response.end();

  }
}

module.exports = {
  handler: requestHandroutesler,
  someText: 'Some text'
};


