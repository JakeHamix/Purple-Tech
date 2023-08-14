import initializeApp from './bootstrap';

function startServer() {
  try {
    const server = initializeApp();
    console.log('Koa.js server running!');
  } catch (err) {
    console.error('Error starting the server:', err);
  }
}

startServer();
