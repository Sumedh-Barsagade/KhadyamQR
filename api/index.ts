import type { VercelRequest, VercelResponse } from '@vercel/node';
import serverless from 'serverless-http';
import { createServer } from '../server/index';

// Create Express app instance (this will be reused across invocations)
let app: any = null;
let handler: any = null;

function getApp() {
  if (!app) {
    app = createServer();
    handler = serverless(app, {
      binary: ['image/*', 'application/pdf'],
    });
  }
  return handler;
}

export default async function(req: VercelRequest, res: VercelResponse) {
  const handler = getApp();
  
  // Get the path - Vercel API routes receive the full path (e.g., /api/ping)
  // Express routes are defined with /api prefix, so we keep the path as-is
  const path = req.url || '/';
  
  // Convert Vercel request to serverless-http format
  const event = {
    httpMethod: req.method || 'GET',
    path: path,
    pathParameters: null,
    queryStringParameters: req.query as Record<string, string> | undefined,
    headers: req.headers as Record<string, string>,
    body: req.body ? (typeof req.body === 'string' ? req.body : JSON.stringify(req.body)) : null,
    isBase64Encoded: false,
    requestContext: {
      requestId: req.headers['x-vercel-id'] || req.headers['x-request-id'] || 'unknown',
      stage: 'production',
      httpMethod: req.method || 'GET',
      path: path,
      protocol: 'https',
    },
  };

  const context = {
    callbackWaitsForEmptyEventLoop: false,
  };

  try {
    const result = await handler(event as any, context as any);
    
    // Set response status
    res.status(result.statusCode || 200);
    
    // Set response headers
    if (result.headers) {
      Object.keys(result.headers).forEach(key => {
        const value = result.headers[key];
        if (value) {
          res.setHeader(key, value as string);
        }
      });
    }
    
    // Handle response body
    if (result.body) {
      const contentType = result.headers?.['content-type'] || result.headers?.['Content-Type'] || '';
      
      if (contentType.includes('application/json')) {
        try {
          const parsedBody = typeof result.body === 'string' ? JSON.parse(result.body) : result.body;
          res.json(parsedBody);
        } catch {
          res.send(result.body);
        }
      } else if (result.isBase64Encoded) {
        res.send(Buffer.from(result.body, 'base64'));
      } else {
        res.send(result.body);
      }
    } else {
      res.end();
    }
  } catch (error) {
    console.error('Vercel API handler error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

