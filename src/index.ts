import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { bearerAuth } from 'hono/bearer-auth';

const token = 'abbas';

const app = new Hono();
app.get('/', c => c.text('Hello Hono!'));

app.use('/api/*', bearerAuth({ token }));

app.get('/api/page', c => {
  return c.json({ message: 'You are authorized' });
});

app.post('/api/add-message', async c => {
  const { userId } = await c.req.json();

  console.log({
    message: 'Your user id is ' + userId,
  });

  return c.json({
    message: 'Your user id is ',
  });
});

serve(
  {
    fetch: app.fetch,
    port: 8989,
  },
  ({ address, port }) => {
    console.log(`Server started at ${address} port ${port}`);
  },
);
