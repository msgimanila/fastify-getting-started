import Fastify from 'fastify';
import serverless from "serverless-http";

const app = Fastify();

// HTML Template with Menus, Hero Section, Footer, and Images
const htmlTemplate = (title, bodyContent) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }
    header {
      background: #007bff;
      color: white;
      padding: 15px;
      text-align: center;
    }
    nav {
      background: #333;
      color: white;
      padding: 10px;
      text-align: center;
    }
    nav a {
      color: white;
      margin: 0 10px;
      text-decoration: none;
    }
    nav a:hover {
      text-decoration: underline;
    }
    .hero {
      background: url('https://via.placeholder.com/1200x400') no-repeat center center/cover;
      color: white;
      text-align: center;
      padding: 100px 20px;
    }
    .hero h1 {
      font-size: 3em;
    }
    .hero p {
      font-size: 1.5em;
    }
    footer {
      background: #333;
      color: white;
      text-align: center;
      padding: 10px;
      position: fixed;
      width: 100%;
      bottom: 0;
    }
  </style>
</head>
<body>
  <header>
    <h1>Welcome to Fastify App</h1>
  </header>
  <nav>
    <a href="/">Home</a>
    <a href="/users">Users</a>
    <a href="/about">About</a>
  </nav>
  ${bodyContent}
  <footer>
    <p>&copy; 2024 Fastify App. All Rights Reserved.</p>
  </footer>
</body>
</html>
`;

// Routes
app.get('/', (request, reply) => {
  const bodyContent = `
    <div class="hero">
      <h1>Fastify App</h1>
      <p>Fast and lightweight web framework</p>
    </div>
  `;
  reply.type('text/html').send(htmlTemplate('Home', bodyContent));
});

app.get('/users', (request, reply) => {
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ];
  const userList = users.map(user => `<li>${user.name} (ID: ${user.id})</li>`).join('');
  const bodyContent = `
    <div style="padding: 20px;">
      <h2>Users</h2>
      <ul>${userList}</ul>
    </div>
  `;
  reply.type('text/html').send(htmlTemplate('Users', bodyContent));
});

app.get('/about', (request, reply) => {
  const bodyContent = `
    <div style="padding: 20px;">
      <h2>About Us</h2>
      <p>This app demonstrates a Fastify server with a polished UI including menus, hero section, footer, and images.</p>
    </div>
  `;
  reply.type('text/html').send(htmlTemplate('About', bodyContent));
});

// Server setup
if (process.env.NODE_ENV === "dev") {
  app.listen(8080, () => {
    console.log(
      "Server is running on port 8080. Check the app on http://localhost:8080"
    );
  });
}

export const handler = serverless(app);
