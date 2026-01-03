import { createServer, app } from './server/index';

export { createServer, app };

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  // server running
});
