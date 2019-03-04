package com.yunfan.tmcc.ivr.interceptor;

import javax.servlet.http.HttpSession;
import org.springframework.web.servlet.ModelAndView;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletRequest;
import org.springframework.web.servlet.HandlerInterceptor;

public class LoginInterceptor implements HandlerInterceptor
{
    public LoginInterceptor() {
        super();
    }
    
    public void afterCompletion(final HttpServletRequest request, final HttpServletResponse response, final Object arg2, final Exception arg3) throws Exception {
    }
    
    public void postHandle(final HttpServletRequest request, final HttpServletResponse response, final Object arg2, final ModelAndView arg3) throws Exception {
    }
    
    public boolean preHandle(final HttpServletRequest request, final HttpServletResponse response, final Object arg2) throws Exception {
        final String url = request.getRequestURI();
        if (url.contains("login") || url.contains("mobile_login") || url.contains("error") || url.contains("logout") || url.endsWith(".js") || url.endsWith(".css") || url.contains("woff") || url.endsWith(".eot") || url.endsWith(".ttf") || url.endsWith(".jpg") || url.endsWith(".gif") || url.endsWith(".bmp") || url.endsWith(".png")) {
            return true;
        }
        final HttpSession session = request.getSession();
        return true;
    }
}
