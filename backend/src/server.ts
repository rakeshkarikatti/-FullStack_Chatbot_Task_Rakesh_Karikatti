import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { testDbConnection } from './config/database';

const PORT = parseInt(process.env.PORT || '5000', 10);

async function startServer() {
  // Test Database Connection
  await testDbConnection();

  app.listen(PORT, () => {
    console.log(`=================================================`);
    console.log(`🚀 DroneTV Backend Server running on port ${PORT}`);
    console.log(`📡 Base API URL: http://localhost:${PORT}/api`);
    console.log(`🩺 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`=================================================`);
  });
}

startServer().catch((err) => {
  console.error('[Server Boot Error]', err);
  process.exit(1);
});
