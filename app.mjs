import Fastify from 'fastify';
import pointOfView from '@fastify/view';
import ejs from 'ejs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = Fastify();

// Register the view plugin with EJS
app.register(pointOfView, {
  engine: { ejs },
  root: './views',
});

// Define the homepage route
app.get('/', async (request, reply) => {
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ];
  return reply.view('index.ejs', { data: users });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is running at ${address}`);
});
