package com.yunfan.tmcc.ivr.web;

import javax.servlet.ServletException;
import com.yunfan.tmcc.ivr.util.FileListenerThread;
import javax.servlet.ServletConfig;
import org.apache.log4j.Logger;
import javax.servlet.http.HttpServlet;

public class AutoLoadServlet extends HttpServlet
{
    private static final long serialVersionUID = 1L;
    private static final Logger log;
    
    static {
        log = Logger.getLogger(AutoLoadServlet.class);
    }
    
    public AutoLoadServlet() {
        super();
    }
    
    public void init(final ServletConfig config) throws ServletException {
        final String unzipPath = String.valueOf(config.getServletContext().getRealPath("/")) + "unzip";
        new Thread(new FileListenerThread(unzipPath)).start();
    }
}
