import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Database } from '../supabase/types';

export async function updateSession(request: NextRequest) {
  try {
    const supabase = createMiddlewareClient<Database>({ req: request });
    await supabase.auth.getSession();
    return NextResponse.next();
  } catch (e) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }
}