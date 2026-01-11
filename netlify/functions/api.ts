import serverless from "serverless-http";

import { createServer } from "../../server/index";

// Load environment variables for Netlify functions
import { config } from "dotenv";
config();

export const handler = serverless(createServer());
