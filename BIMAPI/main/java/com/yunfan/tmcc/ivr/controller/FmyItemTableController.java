package com.yunfan.tmcc.ivr.controller;

import com.yunfan.tmcc.ivr.model.FmyModel;
import com.yunfan.tmcc.ivr.service.FmyItemTableService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class FmyItemTableController
{
    private static final Logger log;
    @Autowired
    private FmyItemTableService fmyItemTableService;
    
    static {
        log = Logger.getLogger(FmyItemTableController.class);
    }
    
    public FmyItemTableController() {
        super();
    }
    
    @RequestMapping(value = { "/familypro/query" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> queryUser(@RequestParam(value = "Prefixion", required = true) final String prefixion, @RequestParam(value = "FamilyId", required = true) final String familyId, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        String code = "500";
        boolean success = false;
        final String strTableName = "FMYITEMTABLE" + prefixion;
        List<Map<String, Object>> userList = null;
        try {
            final Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("TABLENAME", strTableName);
            paramMap.put("FAMILYID", familyId);
            userList = this.fmyItemTableService.selectByFamilyId(paramMap);
            code = "200";
            success = true;
        }
        catch (Exception ex) {
            ex.printStackTrace();
            FmyItemTableController.log.error("API异常", ex);
        }
        retMap.put("code", code);
        retMap.put("success", success);
        retMap.put("data", userList);
        return retMap;
    }
    
    @RequestMapping(value = { "/familypro/add" }, method = { RequestMethod.POST })
    @ResponseBody
    public Map<String, Object> addUser(@RequestParam(value = "Prefixion", required = true) final String Prefixion, @RequestBody final List<FmyModel> ListparaModel, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        String code = "500";
        boolean success = false;
        int id = -1;
        try {
            id = this.fmyItemTableService.insert(ListparaModel, Prefixion);
            code = "200";
            success = true;
        }
        catch (Exception e) {
            e.printStackTrace();
            FmyItemTableController.log.error("API异常", e);
        }
        retMap.put("code", code);
        retMap.put("success", success);
        retMap.put("data", id);
        return retMap;
    }
    
    @RequestMapping(value = { "/FMYITEMTABLE/create/{TABLENAME}" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> createAccessorTable(@PathVariable("TABLENAME") final String tableName, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        boolean success = false;
        int nId = -1;
        try {
            nId = this.fmyItemTableService.createTable(tableName);
            success = true;
        }
        catch (Exception e) {
            e.printStackTrace();
            FmyItemTableController.log.error("API异常", e);
        }
        retMap.put("success", success);
        retMap.put("data", nId);
        return retMap;
    }
}
