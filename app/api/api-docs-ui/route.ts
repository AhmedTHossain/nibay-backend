import { NextRequest, NextResponse } from "next/server";
import swaggerSpec from "@/swagger-config";

export async function GET(req: NextRequest) {
  // Manually construct the Swagger UI HTML to include static assets
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="/swagger-ui/swagger-ui.css" />
        <title>Swagger UI</title>
      </head>
      <body>
        <div id="swagger-ui"></div>
        <script src="/swagger-ui/swagger-ui-bundle.js"></script>
        <script src="/swagger-ui/swagger-ui-standalone-preset.js"></script>
        <script>
          const ui = SwaggerUIBundle({
            spec: ${JSON.stringify(swaggerSpec)},
            dom_id: '#swagger-ui',
          });
        </script>
      </body>
    </html>
  `;

  return new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html" },
  });
}