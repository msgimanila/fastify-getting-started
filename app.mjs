import Fastify from 'fastify';
import pointOfView from '@fastify/view';
import ejs from 'ejs';

const app = Fastify();

// Register the view plugin
app.register(pointOfView, {
  engine: {
    ejs,
  },
  root: './views', // Directory for EJS files
});

// Route for the home page
app.get('/', (request, reply) => {
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ];
  reply.view('index.ejs', { data: users }); // Pass data to the template
});

app.listen(8080, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running at ${address}`);
});
