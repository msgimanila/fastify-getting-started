import Fastify from 'fastify';
import pointOfView from '@fastify/view';
import ejs from 'ejs';

// Initialize Fastify
const app = Fastify();

// Register the view plugin with EJS
app.register(pointOfView, {
  engine: { ejs },
  root: './views', // Path to EJS templates
});

// Define the homepage route
app.get('/', async (request, reply) => {
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ];

  // Render the EJS template with user data
  return reply.view('index.ejs', { data: users });
});

// Start the server
app.listen(8080, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is running at ${address}`);
});
