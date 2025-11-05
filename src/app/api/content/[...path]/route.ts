import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    // Await the params and join the path segments
    const { path: pathSegments } = await params;
    const filePath = pathSegments.join('/');
    
    // Construct the full path to the content file
    const fullPath = path.join(process.cwd(), 'src', 'content', filePath);
    
    // Check if file exists and is within the content directory
    if (!fs.existsSync(fullPath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
    
    // Read the file
    const content = fs.readFileSync(fullPath, 'utf8');
    const stats = fs.statSync(fullPath);
    
    // Determine content type based on file extension
    const ext = path.extname(filePath).toLowerCase();
    let contentType = 'text/plain';
    
    if (ext === '.html') {
      contentType = 'text/html';
    } else if (ext === '.md') {
      contentType = 'text/markdown';
    }
    
    return new NextResponse(content, {
      headers: {
        'Content-Type': contentType,
        'Last-Modified': stats.mtime.toUTCString(),
        // Disable caching in development
        ...(process.env.NODE_ENV === 'development' && {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        })
      },
    });
  } catch (error) {
    console.error('Error serving content:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
