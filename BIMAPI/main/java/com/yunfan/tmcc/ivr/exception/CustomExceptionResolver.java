package com.yunfan.tmcc.ivr.exception;

import com.alibaba.fastjson.JSON;
import org.apache.log4j.Logger;
import org.springframework.beans.TypeMismatchException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

public class CustomExceptionResolver implements HandlerExceptionResolver
{
    private static final Logger log;
    
    static {
        log = Logger.getLogger(CustomExceptionResolver.class);
    }
    
    public CustomExceptionResolver() {
        super();
    }
    
    public ModelAndView resolveException(final HttpServletRequest request, final HttpServletResponse response, final Object handler, final Exception ex) {
        String msg = "";
        if (ex instanceof NullPointerException) {
            msg = "空指针异常";
        }
        else if (ex instanceof IOException) {
            msg = "文件读写异常";
        }
        else if (ex instanceof TypeMismatchException) {
            msg = "参数类型有误";
        }
        else if (ex instanceof MissingServletRequestParameterException) {
            msg = "参数有误";
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
        return null;
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
        CustomExceptionResolver.log.error(msg, ex);
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
