import Fastify from 'fastify';
import pointOfView from '@fastify/view';
import ejs from 'ejs';

// Initialize Fastify
const app = Fastify();

// Register the view plugin with EJS
app.register(pointOfView, {
  engine: {
    ejs,
  },
  root: './views', // Path to the EJS templates
});

// Define a route for the homepage
app.get('/', (request, reply) => {
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ];
  reply.view('index.ejs', { data: users }); // Render the EJS template with data
});

// Start the server
app.listen(8080, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is running at ${address}`);
});
