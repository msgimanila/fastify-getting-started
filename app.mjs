import Fastify from 'fastify';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

const app = Fastify();

// Define a simple route
app.get('/', async (request, reply) => {
  return { message: 'Hello, World!' };
});

// Define another route
app.get('/info', async (request, reply) => {
  return { app: 'Fastify Basic App', version: '1.0.0' };
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
