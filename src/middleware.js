import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();
  let isLogin = request.cookies.get('logged')
  

  if(!isLogin){
    if (url.pathname === '/') {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  
    if (url.pathname === '/create') {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    if(request.nextUrl.pathname.startsWith('/project')){
      return NextResponse.redirect(new URL('/login',request.url))
    }
  }
  if(isLogin){
    if(url.pathname === '/login'){
      url.pathname = "/";
      return NextResponse.redirect(url)
    }
    if(url.pathname === '/signup'){
      url.pathname = "/";
      return NextResponse.redirect(url)
    }
  }
  
}
