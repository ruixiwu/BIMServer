package com.yunfan.tmcc.ivr.controller;

import com.yunfan.tmcc.ivr.model.MeshModel;
import com.yunfan.tmcc.ivr.service.AccessorService;
import com.yunfan.tmcc.ivr.service.MeshTableService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class MeshTableController
{
    private static final Logger log;
    @Autowired
    private MeshTableService userService;
    @Autowired
    private AccessorService accessorService;
    
    static {
        log = Logger.getLogger(MeshTableController.class);
    }
    
    public MeshTableController() {
        super();
    }
    
    @RequestMapping(value = { "/MESHTABLE/get/{TABLENAME}/{OBJECTID}" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> queryMeshTable(@PathVariable("OBJECTID") final long objectId, @PathVariable("TABLENAME") final String tableName, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        String code = "500";
        boolean success = false;
        List<Map<String, Object>> userList = null;
        try {
            final Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("TABLENAME", tableName);
            paramMap.put("OBJECTID", objectId);
            userList = this.userService.selectMeshById(paramMap);
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
    
    @RequestMapping(value = { "/mesh/add" }, method = { RequestMethod.POST }, produces = { "application/json;charset=UTF-8" })
    @ResponseBody
    public Map<String, Object> addMeshTable(@RequestParam(value = "Prefixion", required = true) final String Prefixion, @RequestBody final MeshModel paraModel, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        final Map<String, Object> dataMap = new HashMap<String, Object>();
        String code = "500";
        boolean success = false;
        int id = -1;
        try {
            id = this.userService.insert(paraModel, Prefixion);
            dataMap.put("MeshId", id);
            code = "200";
            success = true;
        }
        catch (Exception e) {
            e.printStackTrace();
            MeshTableController.log.error("API异常", e);
        }
        retMap.put("code", code);
        retMap.put("success", success);
        retMap.put("data", dataMap);
        return retMap;
    }
    
    @RequestMapping(value = { "/mesh/query" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> query(@RequestParam(value = "Prefixion", required = true) final String Prefixion, @RequestParam(value = "MeshId", required = true) final String sMeshId, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        final Map<String, Object> dataMap = new HashMap<String, Object>();
        String code = "500";
        boolean success = false;
        try {
            final Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("TABLENAME", "MESHTABLE" + Prefixion);
            paramMap.put("OBJECTID", sMeshId);
            final List<Map<String, Object>> list = this.userService.selectMeshById(paramMap);
            if (list != null && list.size() > 0) {
                final Map<String, Object> frist = list.get(0);
                dataMap.put("NAME", frist.get("NAME"));
                dataMap.put("MATERIALID", frist.get("MATERIALID"));
                final List<Map<String, Object>> TEXTUREList = new ArrayList<Map<String, Object>>();
                final String TEXTURE_1 = frist.get("ACCESSOR_POSTION").toString();
                paramMap.clear();
                paramMap.put("TABLENAME", "ACCESSORTABLE" + Prefixion);
                paramMap.put("OBJECTID", TEXTURE_1);
                final Map<String, Object> TEXTURE_1Map = this.accessorService.selectAccessorById(paramMap);
                TEXTURE_1Map.remove("OBJECTID");
                TEXTUREList.add(TEXTURE_1Map);
                final String TEXTURE_2 = frist.get("ACCESSOR_INDEX").toString();
                paramMap.clear();
                paramMap.put("TABLENAME", "ACCESSORTABLE" + Prefixion);
                paramMap.put("OBJECTID", TEXTURE_2);
                final Map<String, Object> TEXTURE_2Map = this.accessorService.selectAccessorById(paramMap);
                TEXTURE_2Map.remove("OBJECTID");
                TEXTUREList.add(TEXTURE_2Map);
                final String TEXTURE_3 = frist.get("ACCESSOR_NORMAL").toString();
                paramMap.clear();
                paramMap.put("TABLENAME", "ACCESSORTABLE" + Prefixion);
                paramMap.put("OBJECTID", TEXTURE_3);
                final Map<String, Object> TEXTURE_3Map = this.accessorService.selectAccessorById(paramMap);
                TEXTURE_3Map.remove("OBJECTID");
                TEXTUREList.add(TEXTURE_3Map);
                final String TEXTURE_4 = frist.get("ACCESSOR_TEXCOORD_0").toString();
                paramMap.clear();
                paramMap.put("TABLENAME", "ACCESSORTABLE" + Prefixion);
                paramMap.put("OBJECTID", TEXTURE_4);
                final Map<String, Object> TEXTURE_4Map = this.accessorService.selectAccessorById(paramMap);
                TEXTURE_4Map.remove("OBJECTID");
                TEXTUREList.add(TEXTURE_4Map);
                dataMap.put("texList", TEXTUREList);
            }
            code = "200";
            success = true;
        }
        catch (Exception e) {
            e.printStackTrace();
            MeshTableController.log.error("API异常", e);
        }
        retMap.put("code", code);
        retMap.put("success", success);
        retMap.put("data", dataMap);
        return retMap;
    }
    
    @RequestMapping(value = { "/MESHTABLE/create/{TABLENAME}" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> createAccessorTable(@PathVariable("TABLENAME") final String tableName, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        boolean success = false;
        int nId = -1;
        try {
            nId = this.userService.createTable(tableName);
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
