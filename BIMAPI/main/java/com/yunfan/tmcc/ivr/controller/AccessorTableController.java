package com.yunfan.tmcc.ivr.controller;

import com.yunfan.tmcc.ivr.service.AccessorService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@Controller
public class AccessorTableController
{
    private static final Logger log;
    @Autowired
    private AccessorService accessorService;
    
    static {
        log = Logger.getLogger(AccessorTableController.class);
    }
    
    public AccessorTableController() {
        super();
    }
    
    @RequestMapping(value = { "/accessortable/get/{TABLENAME}/{OBJECTID}" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> queryAccessorTable(@PathVariable("TABLENAME") final String tableName, @PathVariable("OBJECTID") final Long objectId, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        boolean success = false;
        Map<String, Object> accessorList = null;
        try {
            final Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("TABLENAME", tableName);
            paramMap.put("OBJECTID", objectId);
            accessorList = this.accessorService.selectAccessorById(paramMap);
            success = true;
        }
        catch (Exception ex) {
            ex.printStackTrace();
        }
        retMap.put("success", success);
        retMap.put("data", accessorList);
        return retMap;
    }
    
    @RequestMapping(value = { "/accessortable/create/{TABLENAME}" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> createAccessorTable(@PathVariable("TABLENAME") final String tableName, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        boolean success = false;
        int nId = -1;
        try {
            nId = this.accessorService.createTable(tableName);
            success = true;
        }
        catch (Exception ex) {
            ex.printStackTrace();
        }
        retMap.put("success", success);
        retMap.put("data", nId);
        return retMap;
    }
    
    @RequestMapping(value = { "/accessortable/insert/" }, method = { RequestMethod.POST })
    @ResponseBody
    public Map<String, Object> addAccessor(@RequestParam(value = "TYPE", required = true) final String type, @RequestParam(value = "BYTEOFFSET", required = true) final Long byteOffset, @RequestParam(value = "BYTESTRIDE", required = true) final Long byteStride, @RequestParam(value = "COMPONENTTYPE", required = true) final Long componentType, @RequestParam(value = "NCOUNT", required = true) final Long count, @RequestParam(value = "BFILEID", required = true) final String bFileId, @RequestParam(value = "TABLENAME", required = true) final String tableName, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        boolean success = false;
        int id = -1;
        try {
            final Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("TYPE", type);
            paramMap.put("BYTEOFFSET", byteOffset);
            paramMap.put("BYTESTRIDE", byteStride);
            paramMap.put("COMPONENTTYPE", componentType);
            paramMap.put("NCOUNT", count);
            paramMap.put("BFILEID", bFileId);
            paramMap.put("TABLENAME", tableName);
            id = this.accessorService.insertAccessorTable(paramMap);
            success = true;
        }
        catch (Exception e) {
            e.printStackTrace();
            AccessorTableController.log.error("API异常", e);
        }
        retMap.put("success", success);
        retMap.put("data", id);
        return retMap;
    }
}
