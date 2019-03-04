package com.yunfan.tmcc.ivr.interceptor;

import com.alibaba.fastjson.JSON;
import org.apache.log4j.Logger;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

public class ExceptionInterceptor extends HandlerInterceptorAdapter
{
    private static final Logger log;
    
    static {
        log = Logger.getLogger(ExceptionInterceptor.class);
    }
    
    public ExceptionInterceptor() {
        super();
    }
    
    public void afterCompletion(final HttpServletRequest request, final HttpServletResponse response, final Object handler, final Exception ex) throws Exception {
        if (ex != null) {
            String msg = "";
            if (ex instanceof NullPointerException) {
                msg = "空指针异常";
            }
            else if (ex instanceof IOException) {
                msg = "文件读写异常";
            }
            else {
                msg = ex.toString();
            }
            this.logger(request, handler, ex);
            response.setStatus(503);
            final Map<String, Object> result = new HashMap<String, Object>();
            result.put("success", false);
            result.put("msg", msg);
            try {
                response.setContentType("application/json");
                writer(response, JSON.toJSONString(result));
            }
            catch (Exception e) {
                e.printStackTrace();
            }
        }
        else {
            super.afterCompletion(request, response, handler, ex);
        }
    }
    
    public void logger(final HttpServletRequest request, final Object handler, final Exception ex) {
        final StringBuffer msg = new StringBuffer();
        msg.append("异常拦截日志");
        msg.append("[uri＝").append(request.getRequestURI()).append("]");
        final Enumeration<String> enumer = (Enumeration<String>)request.getParameterNames();
        while (enumer.hasMoreElements()) {
            final String name = enumer.nextElement();
            final String[] values = request.getParameterValues(name);
            msg.append("[").append(name).append("=");
            if (values != null) {
                int i = 0;
                String[] array;
                for (int length = (array = values).length, j = 0; j < length; ++j) {
                    final String value = array[j];
                    ++i;
                    msg.append(value);
                    if (i < values.length) {
                        msg.append("｜");
                    }
                }
            }
            msg.append("]");
        }
        ExceptionInterceptor.log.error(msg, ex);
    }
    
    private static void writer(final HttpServletResponse response, final String str) {
        try {
            response.setHeader("Pragma", "No-cache");
            response.setHeader("Cache-Control", "no-cache");
            response.setCharacterEncoding("UTF-8");
            PrintWriter out = null;
            out = response.getWriter();
            out.print(str);
            out.flush();
            out.close();
        }
        catch (IOException e) {
            e.printStackTrace();
        }
    }
}
