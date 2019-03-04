package com.yunfan.tmcc.ivr.controller;

import com.yunfan.tmcc.ivr.service.GeoBlockService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@Controller
public class GeoBlockController
{
    private static final Logger log;
    @Autowired
    private GeoBlockService geoBlockService;
    
    static {
        log = Logger.getLogger(GeoBlockController.class);
    }
    
    public GeoBlockController() {
        super();
    }
    
    @RequestMapping(value = { "/block/query" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> queryUser(@RequestParam(value = "Prefixion", required = true) final String tableNameFix, @RequestParam(value = "blockId", required = true) final long objectId, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        final String tableName = "GEOBLOCK" + tableNameFix;
        String code = "500";
        boolean success = false;
        Map<String, Object> userList = null;
        try {
            final Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("TABLENAME", tableName);
            paramMap.put("OBJECTID", objectId);
            userList = this.geoBlockService.selectGeoBlockById(paramMap);
            code = "200";
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
    
    @RequestMapping(value = { "/block/add" }, method = { RequestMethod.POST }, produces = { "application/json;charset=UTF-8" })
    @ResponseBody
    public Map<String, Object> addUser(@RequestParam(value = "Prefixion", required = true) final String tableNameFix, @RequestBody final Map<String, Object> map, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        final String tableName = "GEOBLOCK" + tableNameFix;
        String code = "500";
        boolean success = false;
        int id = -1;
        try {
            final Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("NAME", map.get("sName").toString());
            paramMap.put("DESCRIBE", map.get("sDesc").toString());
            paramMap.put("MESHIDS", map.get("sMeshIds").toString());
            paramMap.put("TABLENAME", tableName);
            id = this.geoBlockService.insertGeoBlock(paramMap);
            id = Integer.parseInt(paramMap.get("OBJECTID").toString());
            code = "200";
            success = true;
        }
        catch (Exception e) {
            e.printStackTrace();
            GeoBlockController.log.error("API异常", e);
        }
        retMap.put("code", code);
        retMap.put("success", success);
        retMap.put("BlockId", id);
        return retMap;
    }
    
    @RequestMapping(value = { "/GEOBLOCK/create/{TABLENAME}" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> createAccessorTable(@PathVariable("TABLENAME") final String tableName, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        boolean success = false;
        int nId = -1;
        try {
            nId = this.geoBlockService.createTable(tableName);
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
