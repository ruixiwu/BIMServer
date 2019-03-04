package com.yunfan.tmcc.ivr.controller;

import com.yunfan.tmcc.ivr.service.AffixTableService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class AffixTableController
{
    private static final Logger log;
    @Autowired
    private AffixTableService affixTableService;
    
    static {
        log = Logger.getLogger(AffixTableController.class);
    }
    
    public AffixTableController() {
        super();
    }
    
    @RequestMapping(value = { "/AFFIXTABLE/get/{TABLENAME}/{OBJECTID}" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> queryAffixTable(@PathVariable("TABLENAME") final String tableName, @PathVariable("OBJECTID") final long objectId, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        String code = "500";
        boolean success = false;
        List<Map<String, Object>> userList = null;
        try {
            final Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("OBJECTID", objectId);
            paramMap.put("TABLENAME", tableName);
            userList = this.affixTableService.selectAffixTableById(paramMap);
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
    
    @RequestMapping(value = { "/AFFIXTABLE/insert/" }, method = { RequestMethod.POST })
    @ResponseBody
    public Map<String, Object> addAffixTable(@RequestParam(value = "OBJECTID", required = true) final Long objectId, @RequestParam(value = "NAME", required = true) final String name, @RequestParam(value = "TYPE", required = true) final String type, @RequestParam(value = "AFFIXFILEID", required = true) final String affixFileId, @RequestParam(value = "TABLENAME", required = true) final String tableName, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        String code = "500";
        boolean success = false;
        final int id = -1;
        try {
            final Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("OBJECTID", objectId);
            paramMap.put("NAME", name);
            paramMap.put("TYPE", type);
            paramMap.put("AFFIXFILEID", affixFileId);
            paramMap.put("TABLENAME", tableName);
            code = "200";
            success = true;
        }
        catch (Exception e) {
            e.printStackTrace();
            AffixTableController.log.error("API异常", e);
        }
        retMap.put("code", code);
        retMap.put("success", success);
        retMap.put("data", id);
        return retMap;
    }
    
    @RequestMapping(value = { "/AFFIXTABLE/create/{TABLENAME}" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> createAccessorTable(@PathVariable("TABLENAME") final String tableName, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        boolean success = false;
        int nId = -1;
        try {
            nId = this.affixTableService.createTable(tableName);
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
