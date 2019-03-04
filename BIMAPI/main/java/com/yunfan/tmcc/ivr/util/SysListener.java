package com.yunfan.tmcc.ivr.util;

import java.io.File;
import jodd.props.Props;
import org.apache.commons.lang3.StringUtils;
import java.util.ResourceBundle;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.http.HttpServlet;

public class SysListener extends HttpServlet implements ServletContextListener
{
    private static final long serialVersionUID = 5359781420901707616L;
    
    public SysListener() {
        super();
    }
    
    public void contextInitialized(final ServletContextEvent sce) {
        final ResourceBundle res = ResourceBundle.getBundle("app");
        try {
            final String applicationPath = String.valueOf(StringUtils.trim(res.getString("properties_path"))) + "/application.properties";
            final Props p = new Props();
            p.load(new File(applicationPath));
            Constant.PTTYPE = new String(p.getValue("pttype").getBytes("ISO-8859-1"), "UTF-8");
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    public void contextDestroyed(final ServletContextEvent sce) {
    }
}
