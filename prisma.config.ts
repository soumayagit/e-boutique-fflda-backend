// prisma.config.ts
import path from 'path';
import { defineConfig } from 'prisma/config';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '.env') }); // ← chemin explicite

export default defineConfig({
  schema: './prisma/schema.prisma',
});