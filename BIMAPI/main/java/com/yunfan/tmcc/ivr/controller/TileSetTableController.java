package com.yunfan.tmcc.ivr.controller;

import com.yunfan.tmcc.ivr.service.TileSetTableService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class TileSetTableController
{
    private static final Logger log;
    @Autowired
    private TileSetTableService tileSetTableService;
    
    static {
        log = Logger.getLogger(TileSetTableController.class);
    }
    
    public TileSetTableController() {
        super();
    }
    
    @RequestMapping(value = { "/TILESETTABLE/get/{TABLENAME}/{OBJECTID}" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> queryTileSet(@PathVariable("OBJECTID") final long objectId, @PathVariable("TABLENAME") final String tableName, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        String code = "500";
        boolean success = false;
        List<Map<String, Object>> userList = null;
        try {
            final Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("OBJECTID", objectId);
            paramMap.put("TABLENAME", tableName);
            userList = this.tileSetTableService.selectTileSetById(paramMap);
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
    
    @RequestMapping(value = { "/TILESETTABLE/insert/" }, method = { RequestMethod.POST })
    @ResponseBody
    public Map<String, Object> addTileSet(@RequestParam(value = "OBJECTID", required = true) final Long objectId, @RequestParam(value = "PARENT", required = true) final Long parent, @RequestParam(value = "MINX", required = true) final Float minx, @RequestParam(value = "MINY", required = true) final Float miny, @RequestParam(value = "MINZ", required = true) final Float minz, @RequestParam(value = "MAXX", required = true) final Float maxx, @RequestParam(value = "MAXY", required = true) final Float maxy, @RequestParam(value = "MAXZ", required = true) final Float maxz, @RequestParam(value = "CENTER", required = true) final String center, @RequestParam(value = "LASTUPDATETIME", required = true) final String lastUpdateTime, @RequestParam(value = "TABLENAME", required = true) final String tableName, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        String code = "500";
        boolean success = false;
        int id = -1;
        try {
            final Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("OBJECTID", objectId);
            paramMap.put("PARENT", parent);
            paramMap.put("MINX", minx);
            paramMap.put("MINY", miny);
            paramMap.put("MINZ", minz);
            paramMap.put("MAXX", maxx);
            paramMap.put("MAXY", maxy);
            paramMap.put("MAXZ", maxz);
            paramMap.put("CENTER", center);
            paramMap.put("LASTUPDATETIME", lastUpdateTime);
            paramMap.put("TABLENAME", tableName);
            id = this.tileSetTableService.insertTileSet(paramMap);
            code = "200";
            success = true;
        }
        catch (Exception e) {
            e.printStackTrace();
            TileSetTableController.log.error("API异常", e);
        }
        retMap.put("code", code);
        retMap.put("success", success);
        retMap.put("data", id);
        return retMap;
    }
    
    @RequestMapping(value = { "/TILESETTABLE/create/{TABLENAME}" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> createAccessorTable(@PathVariable("TABLENAME") final String tableName, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        boolean success = false;
        int nId = -1;
        try {
            nId = this.tileSetTableService.createTable(tableName);
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
