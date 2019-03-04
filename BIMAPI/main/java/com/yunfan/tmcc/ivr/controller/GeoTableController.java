package com.yunfan.tmcc.ivr.controller;

import com.yunfan.tmcc.ivr.service.FamilyTableService;
import com.yunfan.tmcc.ivr.service.FmyItemTableService;
import com.yunfan.tmcc.ivr.service.GeoTableService;
import org.apache.commons.lang3.StringUtils;
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
public class GeoTableController
{
    private static final Logger log;
    @Autowired
    private GeoTableService geoTableService;
    @Autowired
    private FmyItemTableService fmyItemTableService;
    @Autowired
    private FamilyTableService familyTableService;
    
    static {
        log = Logger.getLogger(GeoTableController.class);
    }
    
    public GeoTableController() {
        super();
    }
    
    @RequestMapping(value = { "/GEOTABLE/get/{TABLENAME}/{OBJECTID}" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> queryGeoTable(@PathVariable("OBJECTID") final long objectId, @PathVariable("TABLENAME") final String tableName, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        String code = "500";
        boolean success = false;
        Map<String, Object> userList = null;
        try {
            final Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("TABLENAME", tableName);
            paramMap.put("OBJECTID", objectId);
            userList = this.geoTableService.selectGeoTableById(paramMap);
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
    
    @RequestMapping(value = { "/GEOTABLE/insert/" }, method = { RequestMethod.POST })
    @ResponseBody
    public Map<String, Object> addGeoTable(@RequestParam(value = "OBJECTID", required = true) final Long objectId, @RequestParam(value = "NAME", required = true) final String name, @RequestParam(value = "TILESETID", required = true) final Long tileSetId, @RequestParam(value = "MATRIX", required = true) final String matrix, @RequestParam(value = "MESHIDS", required = true) final String meshId, @RequestParam(value = "BLOCKID", required = true) final Long blockId, @RequestParam(value = "BOX", required = true) final String box, @RequestParam(value = "FAMILYID", required = true) final Long familyId, @RequestParam(value = "TABLENAME", required = true) final String tableName, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        String code = "500";
        boolean success = false;
        int id = -1;
        try {
            final Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("OBJECTID", objectId);
            paramMap.put("NAME", name);
            paramMap.put("TILESETID", tileSetId);
            paramMap.put("MATRIX", matrix);
            paramMap.put("MESHIDS", meshId);
            paramMap.put("BLOCKID", blockId);
            paramMap.put("BOX", box);
            paramMap.put("FAMILYID", familyId);
            paramMap.put("TABLENAME", tableName);
            id = this.geoTableService.insertGeoTable(paramMap);
            code = "200";
            success = true;
        }
        catch (Exception e) {
            e.printStackTrace();
            GeoTableController.log.error("API异常", e);
        }
        retMap.put("code", code);
        retMap.put("success", success);
        retMap.put("data", id);
        return retMap;
    }
    
    @RequestMapping(value = { "/GEOTABLE/create/{TABLENAME}" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> createAccessorTable(@PathVariable("TABLENAME") final String tableName, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        boolean success = false;
        int nId = -1;
        try {
            nId = this.geoTableService.createTable(tableName);
            success = true;
        }
        catch (Exception ex) {
            ex.printStackTrace();
            GeoTableController.log.error("API异常", ex);
        }
        retMap.put("success", success);
        retMap.put("data", nId);
        return retMap;
    }
    
    @RequestMapping(value = { "/geomodel/add" }, method = { RequestMethod.POST })
    @ResponseBody
    public Map<String, Object> addGeoTable(@RequestParam(value = "Prefixion", required = true) final String Prefixion, @RequestBody final Map<String, Object> map, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        final Map<String, Object> paramMap = new HashMap<String, Object>();
        String code = "500";
        String msg = "";
        boolean success = false;
        int id = -1;
        try {
            final String NAME = map.get("sName").toString();
            final String TILESETID = map.get("sTilesetId").toString();
            final String MATRIX = map.get("sMatrix").toString();
            final String MESHIDS = map.get("sMeshIds").toString();
            final String BLOCKID = map.get("sBlockId").toString();
            final String BOX = map.get("sBox").toString();
            final String FAMILYID = map.get("sFamilyID").toString();
            paramMap.put("NAME", NAME);
            paramMap.put("TILESETID", Integer.valueOf(TILESETID));
            paramMap.put("MATRIX", MATRIX);
            paramMap.put("MESHIDS", MESHIDS);
            paramMap.put("BLOCKID", Integer.valueOf(BLOCKID));
            paramMap.put("BOX", BOX);
            paramMap.put("FAMILYID", Integer.valueOf(FAMILYID));
            paramMap.put("TABLENAME", "GEOTABLE" + Prefixion);
            this.geoTableService.insertGeoTable(paramMap);
            id = Integer.parseInt(paramMap.get("OBJECTID").toString());
            code = "200";
            success = true;
        }
        catch (Exception e) {
            e.printStackTrace();
            GeoTableController.log.error("添加模型", e);
            msg = String.valueOf(e.getMessage()) + "---------" + paramMap.toString();
        }
        retMap.put("msg", msg);
        retMap.put("code", code);
        retMap.put("success", success);
        retMap.put("data", id);
        return retMap;
    }
    
    @RequestMapping(value = { "/geomodel/query" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> query(@RequestParam(value = "Prefixion", required = true) final String Prefixion, @RequestParam(value = "Guidname", required = true) final String Guidname, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        Map<String, Object> dataMap = new HashMap<String, Object>();
        String code = "500";
        boolean success = false;
        try {
            final Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("TABLENAME", "GEOTABLE" + Prefixion);
            paramMap.put("NAME", Guidname);
            dataMap = this.geoTableService.selectGeoTableById(paramMap);
            code = "200";
            success = true;
        }
        catch (Exception e) {
            e.printStackTrace();
            GeoTableController.log.error("查询模型", e);
        }
        retMap.put("code", code);
        retMap.put("success", success);
        retMap.put("data", dataMap);
        return retMap;
    }
    
    @RequestMapping(value = { "/geomodel/queryByFmyItemName" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> queryByFmyItemName(@RequestParam(value = "Prefixion", required = true) final String Prefixion, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        final List<Map<String, Object>> dataMap = new ArrayList<Map<String, Object>>();
        Map<String, Object> tempMap = new HashMap<String, Object>();
        final String FmyItemName = "智能构件库分类";
        String code = "500";
        boolean success = false;
        try {
            Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("TABLENAME", "FMYITEMTABLE_" + Prefixion);
            paramMap.put("FIELD", "NAME");
            paramMap.put("FIELDVALUE", FmyItemName);
            final List<Map<String, Object>> fmyItemList = this.fmyItemTableService.selectByField(paramMap);
            for (final Map<String, Object> fmyItem : fmyItemList) {
                if (fmyItem.get("sValue") != null) {
                    if (StringUtils.isBlank(fmyItem.get("sValue").toString())) {
                        continue;
                    }
                    paramMap = new HashMap<String, Object>();
                    paramMap.put("TABLENAME", "GEOTABLE_" + Prefixion);
                    paramMap.put("FAMILYID", Integer.valueOf(fmyItem.get("sMainId").toString()));
                    final List<Map<String, Object>> geoList = this.geoTableService.selectByFamilyId(paramMap);
                    final List<String> guidList = new ArrayList<String>();
                    for (final Map<String, Object> geo : geoList) {
                        guidList.add(geo.get("sName").toString());
                    }
                    tempMap = new HashMap<String, Object>();
                    tempMap.put("ComNo", fmyItem.get("sValue").toString());
                    tempMap.put("GUID", guidList);
                    dataMap.add(tempMap);
                }
            }
            code = "200";
            success = true;
        }
        catch (Exception e) {
            e.printStackTrace();
            GeoTableController.log.error("查询模型", e);
        }
        retMap.put("code", code);
        retMap.put("success", success);
        retMap.put("data", dataMap);
        return retMap;
    }
    
    @RequestMapping(value = { "/geomodel/queryModebByComponent" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> queryByFmyItemName2(@RequestParam(value = "Prefixion", required = true) final String Prefixion, @RequestParam(value = "sComename", required = true) final String pname, @RequestParam(value = "sComtype", required = true) final String name, @RequestParam(value = "sItemName", required = true) final String FmyItemName, @RequestParam(value = "sItemValue", required = true) final String FmyItemValue, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        final List<String> guidList = new ArrayList<String>();
        String code = "500";
        boolean success = false;
        try {
            Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("TABLENAME", "FMYITEMTABLE_" + Prefixion);
            paramMap.put("FIELD", "NAME");
            paramMap.put("FIELDVALUE", FmyItemName);
            paramMap.put("FIELD2", "VALUE");
            paramMap.put("FIELDVALUE2", FmyItemValue);
            final List<Map<String, Object>> fmyItemList = this.fmyItemTableService.selectByField2(paramMap);
            for (final Map<String, Object> fmyItem : fmyItemList) {
                if (fmyItem.get("sValue") != null) {
                    if (StringUtils.isBlank(fmyItem.get("sValue").toString())) {
                        continue;
                    }
                    final int fmyId = Integer.valueOf(fmyItem.get("sMainId").toString());
                    paramMap = new HashMap<String, Object>();
                    paramMap.put("TABLENAME", "FAMILYTABLE_" + Prefixion);
                    paramMap.put("OBJECTID", fmyId);
                    paramMap.put("NAME", name);
                    paramMap.put("PNAME", pname);
                    final Map<String, Object> fmyMap = this.familyTableService.selectFamilyByIdAndPname(paramMap);
                    if (fmyMap == null) {
                        continue;
                    }
                    paramMap = new HashMap<String, Object>();
                    paramMap.put("TABLENAME", "GEOTABLE_" + Prefixion);
                    paramMap.put("FAMILYID", fmyId);
                    final List<Map<String, Object>> geoList = this.geoTableService.selectByFamilyId(paramMap);
                    for (final Map<String, Object> geo : geoList) {
                        guidList.add(geo.get("sName").toString());
                    }
                }
            }
            code = "200";
            success = true;
        }
        catch (Exception e) {
            e.printStackTrace();
            GeoTableController.log.error("查询模型", e);
        }
        retMap.put("code", code);
        retMap.put("success", success);
        retMap.put("data", guidList);
        return retMap;
    }
}
