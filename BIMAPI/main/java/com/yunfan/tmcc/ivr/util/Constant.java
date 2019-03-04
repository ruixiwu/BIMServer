package com.yunfan.tmcc.ivr.util;

import java.util.HashMap;
import java.util.Map;

public class Constant
{
    public static Map<String, Map<String, Object>> map;
    public static PropertiesUtil appPropertiesUtil;
    public static String PTTYPE;
    public static Long ZipMaxSize;
    public static Long ZipNormalSize;
    public static final String LKAPIURL;
    public static final String BIMAPIURL;
    
    static {
        Constant.map = new HashMap<String, Map<String, Object>>();
        Constant.appPropertiesUtil = new PropertiesUtil("/app.properties");
        Constant.ZipMaxSize = 2147483648L;
        Constant.ZipNormalSize = 1073741824L;
        LKAPIURL = Constant.appPropertiesUtil.getProperty("LKAPIURL");
        BIMAPIURL = Constant.appPropertiesUtil.getProperty("BIMAPIURL");
    }
    
    public Constant() {
        super();
    }
    
    public static void main(final String[] args) {
        System.out.println(Constant.LKAPIURL);
    }
}
