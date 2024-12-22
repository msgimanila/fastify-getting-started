import Fastify from 'fastify';
import serverless from "serverless-http";
import pointOfView from '@fastify/view';
import ejs from 'ejs';

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
      background: url('https://images.ctfassets.net/aq13lwl6616q/7cS8gBoWulxkWNWEm0FspJ/c7eb42dd82e27279307f8b9fc9b136fa/nodejs_cover_photo_smaller_size.png') no-repeat center center/cover;
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
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    table, th, td {
      border: 1px solid #ddd;
    }
    th, td {
      padding: 12px;
      text-align: left;
    }
    th {
      background-color: #f4f4f4;
      cursor: pointer;
    }
    th:hover {
      background-color: #ddd;
    }
    tr:nth-child(even) {
      background-color: #f9f9f9;
    }
    tr:hover {
      background-color: #f1f1f1;
    }
  </style>
  <script>
    function sortTable(n) {
      const table = document.getElementById("sortableTable");
      let rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
      switching = true;
      dir = "asc";
      while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
          shouldSwitch = false;
          x = rows[i].getElementsByTagName("TD")[n];
          y = rows[i + 1].getElementsByTagName("TD")[n];
          if (dir == "asc") {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              shouldSwitch = true;
              break;
            }
          } else if (dir == "desc") {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              shouldSwitch = true;
              break;
            }
          }
        }
        if (shouldSwitch) {
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
          switchcount++;
        } else {
          if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = true;
          }
        }
      }
    }
  </script>
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
    { id: 3, name: 'Charlie' },
  ];
  const userTable = `
    <div style="padding: 20px;">
      <h2>Users</h2>
      <table id="sortableTable">
        <thead>
          <tr>
            <th onclick="sortTable(0)">ID</th>
            <th onclick="sortTable(1)">Name</th>
          </tr>
        </thead>
        <tbody>
          ${users.map(user => `<tr><td>${user.id}</td><td>${user.name}</td></tr>`).join('')}
        </tbody>
      </table>
    </div>
  `;
  reply.type('text/html').send(htmlTemplate('Users', userTable));
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
