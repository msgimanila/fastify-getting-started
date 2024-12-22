import Fastify from 'fastify';
import serverless from "serverless-http";

const app = Fastify();

app.get('/', (request, reply) => {
  reply.send('Hello World from Fastify!');
});

app.get('/users', (request, reply) => {
  reply.send([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ]);
});


if (process.env.NODE_ENV === "dev") {
  app.listen(8080, () => {
    console.log(
      "Server is running on port 8080. Check the app on http://localhost:8080"
    );
  });
}


export const handler = serverless(app);