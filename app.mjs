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
    ### **What is Fastify?**

    Fastify is a high-performance web framework for Node.js, designed to build modern web applications and APIs. It focuses on speed, extensibility, and developer experience, making it a popular choice for developers looking for a fast and lightweight framework.
    
    ---
    
    ### **Key Features of Fastify**
    
    1. **High Performance:**
       - One of the fastest Node.js frameworks, with low overhead and optimized request/response handling.
    
    2. **Extensibility:**
       - A modular plugin architecture makes it easy to add or share functionality. Plugins can be loaded in an encapsulated manner, preventing conflicts.
    
    3. **Schema Validation:**
       - Built-in schema-based request validation and response serialization using JSON Schema, ensuring data correctness and improving performance.
    
    4. **Asynchronous Nature:**
       - Fully asynchronous with `async/await` support, allowing for cleaner, more readable code.
    
    5. **TypeScript Support:**
       - Out-of-the-box TypeScript support for type safety and improved developer productivity.
    
    6. **Built-in Logging:**
       - Integrates with `pino`, a fast and powerful logging library, to provide detailed and efficient logs.
    
    7. **Security and Stability:**
       - Provides security features like request validation, secure headers, and built-in protection against common vulnerabilities.
    
    8. **Scalability:**
       - Designed to scale efficiently with high-concurrency applications and microservices.
    
    ---
    
    ### **Why Use Fastify?**
    
    - **Speed:** Built with performance in mind, it outperforms many traditional Node.js frameworks in benchmarks.
    - **Developer-Friendly:** Offers clean APIs, well-organized documentation, and minimal boilerplate code.
    - **Scalability:** Suitable for projects ranging from small startups to enterprise-scale applications.
    - **Community and Ecosystem:** A growing ecosystem of plugins and active community support.
    
    ---
    
    ### **Use Cases**
    
    1. **RESTful APIs:**
       - Ideal for building APIs for web and mobile applications.
    
    2. **Microservices:**
       - Encapsulation and plugin architecture make it a great choice for microservices.
    
    3. **Real-Time Applications:**
       - Works well with WebSockets and other real-time communication technologies.
    
    4. **Serverless Applications:**
       - Can be deployed in serverless environments with minimal adjustments.
    
    ---
    
    ### **How Does Fastify Work?**
    
    Fastify works by creating a server instance where you can define routes, plugins, and middleware. Here's an example:
    
    ```javascript
    import Fastify from 'fastify';
    
    const app = Fastify();
    
    // Define a route
    app.get('/', async (request, reply) => {
      return { message: 'Hello, Fastify!' };
    });
    
    // Start the server
    app.listen(3000, (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`Server is running at ${address}`);
    });
    ```
    
    ---
    
    ### **Comparison with Other Frameworks**
    
    | Feature            | Fastify      | Express       | Koa           |
    |--------------------|--------------|---------------|---------------|
    | **Performance**    | High         | Medium        | High          |
    | **TypeScript**     | Built-in     | Partial       | Partial       |
    | **Plugins**        | Encapsulated | Middleware    | Middleware    |
    | **Validation**     | JSON Schema  | Manual        | Manual        |
    
    ---
    
    ### **Advantages of Fastify**
    
    - High throughput and low latency.
    - Schema-based validation improves reliability.
    - Easy to use and extend.
    - Strong TypeScript support for modern development.
    
    ---
    
    ### **Disadvantages**
    
    - Smaller ecosystem compared to older frameworks like Express.
    - Requires understanding JSON Schema for advanced validation.
    
    ---
    
    ### **Conclusion**
    
    Fastify is an excellent choice for developers prioritizing speed, scalability, and modern web development practices. Whether you're building a small API or a large-scale application, its flexibility, performance, and developer-friendly features make it a top-tier framework.
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
