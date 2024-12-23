import { updateSession } from '@/lib/utils/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedPaths = ['/admin', '/profile'];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (protectedPaths.some(prefix => path.startsWith(prefix))) {
    return updateSession(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};