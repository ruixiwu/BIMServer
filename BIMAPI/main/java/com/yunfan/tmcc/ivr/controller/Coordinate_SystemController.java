package com.yunfan.tmcc.ivr.controller;

import com.yunfan.tmcc.ivr.service.Coordinate_SystemService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class Coordinate_SystemController
{
    private static final Logger log;
    @Autowired
    private Coordinate_SystemService coordService;
    
    static {
        log = Logger.getLogger(Coordinate_SystemController.class);
    }
    
    public Coordinate_SystemController() {
        super();
    }
    
    @RequestMapping(value = { "/COORDINATE_SYSTEM/get/{TABLENAME}/{OBJECTID}" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> queryCoordinate(@PathVariable("TABLENAME") final String tableName, @PathVariable("OBJECTID") final Long objectId, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        String code = "500";
        boolean success = false;
        List<Map<String, Object>> userList = null;
        try {
            final Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("TABLENAME", tableName);
            paramMap.put("OBJECTID", objectId);
            userList = this.coordService.selectCoordinateById(paramMap);
            code = "500";
            success = true;
        }
        catch (Exception ex) {
            ex.printStackTrace();
        }
        retMap.put("code", code);
        retMap.put("success", success);
        retMap.put("data", userList);
        return retMap;
    }
    
    @RequestMapping(value = { "/COORDINATE_SYSTEM/insert/" }, method = { RequestMethod.POST })
    @ResponseBody
    public Map<String, Object> addCoordinate(@RequestParam(value = "OBJECTID", required = true) final Long objectId, @RequestParam(value = "NAME", required = true) final String name, @RequestParam(value = "SEMIMAJORAXIS", required = true) final Float semimajoraxis, @RequestParam(value = "INVERSEFLATTENING", required = true) final Float inverseFlattening, @RequestParam(value = "SCALEFACTOR", required = true) final Float scaleFactor, @RequestParam(value = "FALSE_EASTING", required = true) final Float easting, @RequestParam(value = "FALSE_NORTHING", required = true) final Float northing, @RequestParam(value = "CENTRALMERIDIAN", required = true) final Float centralmeridian, @RequestParam(value = "TABLENAME", required = true) final String tableName, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        String code = "500";
        boolean success = false;
        int id = -1;
        try {
            final Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("OBJECTID", objectId);
            paramMap.put("NAME", name);
            paramMap.put("SEMIMAJORAXIS", semimajoraxis);
            paramMap.put("INVERSEFLATTENING", inverseFlattening);
            paramMap.put("SCALEFACTOR", scaleFactor);
            paramMap.put("FALSE_EASTING", easting);
            paramMap.put("FALSE_NORTHING", northing);
            paramMap.put("CENTRALMERIDIAN", centralmeridian);
            paramMap.put("TABLENAME", tableName);
            id = this.coordService.insertCoordinate(paramMap);
            code = "200";
            success = true;
        }
        catch (Exception e) {
            e.printStackTrace();
            Coordinate_SystemController.log.error("API异常", e);
        }
        retMap.put("code", code);
        retMap.put("success", success);
        retMap.put("data", id);
        return retMap;
    }
    
    @RequestMapping(value = { "/COORDINATE_SYSTEM/create/{TABLENAME}" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> createAccessorTable(@PathVariable("TABLENAME") final String tableName, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        boolean success = false;
        int nId = -1;
        try {
            nId = this.coordService.createTable(tableName);
            success = true;
        }
        catch (Exception ex) {
            ex.printStackTrace();
        }
        retMap.put("success", success);
        retMap.put("data", nId);
        return retMap;
    }
}
