package com.yunfan.tmcc.ivr.util;

import java.io.OutputStream;
import java.io.FileOutputStream;
import java.io.File;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.io.InputStream;
import java.net.URI;
import java.util.Properties;

public class PropertiesUtil
{
    private Properties props;
    private URI uri;
    
    public PropertiesUtil(final String fileName) {
        super();
        this.readProperties(fileName);
    }
    
    private void readProperties(final String fileName) {
        try {
            this.props = new Properties();
            final InputStream fis = this.getClass().getResourceAsStream(fileName);
            this.props.load(fis);
            this.uri = this.getClass().getResource("/jdbc.properties").toURI();
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    public String getProperty(final String key) {
        return this.props.getProperty(key);
    }
    
    public Map getAllProperty() {
        final Map map = new HashMap();
        final Enumeration enu = this.props.propertyNames();
        while (enu.hasMoreElements()) {
            final String key = (String)enu.nextElement();
            final String value = this.props.getProperty(key);
            map.put(key, value);
        }
        return map;
    }
    
    public void printProperties() {
        this.props.list(System.out);
    }
    
    public void writeProperties(final String key, final String value) {
        try {
            final OutputStream fos = new FileOutputStream(new File(this.uri));
            this.props.setProperty(key, value);
            this.props.store(fos, "『comments』Update key：" + key);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    public static void main(final String[] args) {
        final PropertiesUtil util = new PropertiesUtil("/app.properties");
        util.printProperties();
        System.out.println(util.getProperty("project_no"));
        final int project_no = Integer.parseInt(util.getProperty("project_no"));
        util.writeProperties("project_no", String.valueOf(project_no + 1));
        System.out.println(util.getProperty("project_no"));
    }
}
