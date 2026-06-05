// prisma.config.ts
import path from 'path';
import { defineConfig } from 'prisma/config';
import * as dotenv from 'dotenv';

dotenv.config(); // ← charge le .env

export default defineConfig({
  schema: './prisma/schema.prisma',
});
