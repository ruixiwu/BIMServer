package com.yunfan.tmcc.ivr.controller;

import com.alibaba.fastjson.JSON;
import com.github.kevinsawicki.http.HttpRequest;
import com.yunfan.tmcc.ivr.service.*;
import com.yunfan.tmcc.ivr.util.Constant;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.net.URLEncoder;
import java.util.*;

@Controller
public class ProTableController
{
    private static final Logger log;
    @Autowired
    private ProTableService proTableService;
    @Autowired
    private FamilyTableService familyTableService;
    @Autowired
    private GeoTableService geoTableService;
    @Autowired
    private FmyItemTableService fmyItemTableService;
    @Autowired
    private ProjectService projectService;
    
    static {
        log = Logger.getLogger(ProTableController.class);
    }
    
    public ProTableController() {
        super();
    }
    
    @RequestMapping(value = { "/modelpro/query" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> queryUser(@RequestParam(value = "Prefixion", required = true) final String tableNameFix, @RequestParam(value = "GeoModelId", required = true) final long objectId, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        final String tableName = "PROTABLE" + tableNameFix;
        String code = "500";
        boolean success = false;
        List<Map<String, Object>> userList = null;
        try {
            final Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("TABLENAME", tableName);
            paramMap.put("GEOID", objectId);
            userList = this.proTableService.selectProTableById(paramMap);
            code = "200";
            success = true;
        }
        catch (Exception ex) {
            ex.printStackTrace();
            ProTableController.log.error("API异常", ex);
        }
        retMap.put("code", code);
        retMap.put("success", success);
        retMap.put("data", userList);
        return retMap;
    }
    
    @RequestMapping(value = { "/modelpro/add" }, method = { RequestMethod.POST }, produces = { "application/json;charset=UTF-8" })
    @ResponseBody
    public Map<String, Object> addUser(@RequestParam(value = "Prefixion", required = true) final String tableNameFix, @RequestBody final List<Map<String, Object>> lmap, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        final String tableName = "PROTABLE" + tableNameFix;
        String code = "500";
        boolean success = false;
        int id = -1;
        try {
            for (final Map<String, Object> itemmap : lmap) {
                final Map<String, Object> paramMap = new HashMap<String, Object>();
                paramMap.put("SECTION", itemmap.get("sSection").toString());
                paramMap.put("NAME", itemmap.get("sName").toString());
                paramMap.put("VALUE", itemmap.get("sValue").toString());
                paramMap.put("UNIT", itemmap.get("sUnit").toString());
                paramMap.put("TYPE", Integer.parseInt(itemmap.get("sType").toString()));
                paramMap.put("GEOID", Integer.parseInt(itemmap.get("sMainId").toString()));
                paramMap.put("TABLENAME", tableName);
                id = this.proTableService.insertProTable(paramMap);
            }
            code = "200";
            success = true;
        }
        catch (Exception e) {
            e.printStackTrace();
            ProTableController.log.error("API异常", e);
        }
        retMap.put("code", code);
        retMap.put("success", success);
        retMap.put("data", id);
        return retMap;
    }
    
    @RequestMapping(value = { "/PROTABLE/create/{TABLENAME}" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> createAccessorTable(@PathVariable("TABLENAME") final String tableName, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        boolean success = false;
        int nId = -1;
        try {
            nId = this.proTableService.createTable(tableName);
            success = true;
        }
        catch (Exception ex) {
            ex.printStackTrace();
            ProTableController.log.error("API异常", ex);
        }
        retMap.put("success", success);
        retMap.put("data", nId);
        return retMap;
    }
    
    @RequestMapping(value = { "/protable/getComQueryAttr" }, method = { RequestMethod.GET })
    @ResponseBody
    public List<Map<String, Object>> getComQueryAttr(@RequestParam(value = "nProjectId", required = true) final int nProjectId, @RequestParam(value = "nComId", required = true) final String nComId, @RequestParam(value = "sTypeName", required = true) final String sTypeName, final HttpServletResponse res) {
        final List<Map<String, Object>> retMap = new ArrayList<Map<String, Object>>();
        final Map<String, Object> apiParamMap = new HashMap<String, Object>();
        final String sField = "智能构件库编码";
        try {
            apiParamMap.put("comtype_id", nComId);
            apiParamMap.put("component_nam", URLEncoder.encode(sTypeName, "GBK"));
            final String apiResponseStr = HttpRequest.get((String.valueOf(Constant.LKAPIURL) + "/getComponetAttrInfo"), apiParamMap, false).body();
            final List<HashMap> LKList = JSON.parseArray(apiResponseStr, HashMap.class);
            if (LKList == null || LKList.size() == 0) {
                return retMap;
            }
            final String sSchemeId = this.projectService.getPrefixionByProjectId(Integer.valueOf(nProjectId));
            if ("-1".equals(sSchemeId)) {
                return retMap;
            }
            final String sPropTable = "FMYITEMTABLE_" + sSchemeId;
            Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("TABLENAME", sPropTable);
            paramMap.put("FIELD", "NAME");
            paramMap.put("FIELDVALUE", sField);
            paramMap.put("FIELD2", "VALUE");
            paramMap.put("FIELDVALUE2", nComId);
            List<Map<String, Object>> retGeoIDList = null;
            retGeoIDList = this.fmyItemTableService.selectByField(paramMap);
            final List<String> idsList = new ArrayList<String>();
            for (final Map<String, Object> map : retGeoIDList) {
                idsList.add(map.get("sMainId").toString());
            }
            final Set<String> fimlyids = new HashSet<String>();
            this.getFimlyIds(fimlyids, idsList, sTypeName, sSchemeId);
            if (fimlyids.size() == 0) {
                return retMap;
            }
            for (final String fimlyid : fimlyids) {
                paramMap = new HashMap<String, Object>();
                paramMap.put("TABLENAME", sPropTable);
                paramMap.put("FAMILYID", fimlyid);
                Map<String, Object> tempmap = new HashMap<String, Object>();
                final List<Map<String, Object>> retGeoIDList2 = this.fmyItemTableService.selectByFamilyId(paramMap);
                for (final Map<String, Object> map2 : retGeoIDList2) {
                    for (final Map<String, Object> lkmap : LKList) {
                        if (map2.get("sName").toString().equals(lkmap.get("name").toString())) {
                            tempmap.put(map2.get("sName").toString(), map2.get("sValue"));
                            tempmap.put("cx_flag", map2.get("cx_flag"));
                        }
                    }
                }
                retMap.add(tempmap);
                tempmap = null;
            }
        }
        catch (Exception ex) {
            ex.printStackTrace();
            ProTableController.log.error("API异常", ex);
        }
        return retMap;
    }
    
    private void getFimlyIds(final Set<String> result, final List<String> list, final String sTypeName, final String sSchemeId) throws Exception {
        final String ids = StringUtils.join(list, ",");
        final String sPropTable = "FAMILYTABLE_" + sSchemeId;
        final Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("TABLENAME", sPropTable);
        paramMap.put("FIELDS", "OBJECTID,NAME,PARENTID");
        paramMap.put("CONDITION", "NAME  ~* '" + sTypeName + "' and OBJECTID in(" + ids + ")");
        final List<Map<String, Object>> retGeoIDList = this.familyTableService.selectByParam(paramMap);
        final List<String> pidlist = new ArrayList<String>();
        boolean flag = false;
        for (final Map<String, Object> map : retGeoIDList) {
            final String strFamilyId = map.get("OBJECTID").toString();
            final String pid = map.get("sParentId").toString();
            if (StringUtils.isNotBlank(strFamilyId) && !result.contains(strFamilyId)) {
                result.add(strFamilyId);
            }
            if ("-1".equals(pid)) {
                flag = true;
            }
            else {
                pidlist.add(pid);
            }
        }
        if (flag) {
            this.getFimlyIds(result, pidlist, sTypeName, sSchemeId);
        }
    }
    
    @RequestMapping(value = { "/protable/getComParamEnumAttr" }, method = { RequestMethod.GET })
    @ResponseBody
    public String getComParamEnumAttr(@RequestParam(value = "nProjectId", required = true) final int nProjectId, @RequestParam(value = "nComId", required = true) final String nComId, @RequestParam(value = "sParam", required = true) final String sParam, final HttpServletResponse res) {
        final List<Map<String, Object>> Retlist = null;
        final boolean success = false;
        final List<String> retList = new ArrayList<String>();
        final String sField = "智能构件库编码";
        final int nId = -1;
        try {
            final String sSchemeId = this.projectService.getPrefixionByProjectId(Integer.valueOf(nProjectId));
            if ("-1".equals(sSchemeId)) {
                return "";
            }
            final String sPropTable = "FMYITEMTABLE_" + sSchemeId;
            final Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("TABLENAME", sPropTable);
            paramMap.put("FIELD", "NAME");
            paramMap.put("FIELDVALUE", sField);
            List<Map<String, Object>> retGeoIDList = null;
            retGeoIDList = this.fmyItemTableService.selectByField(paramMap);
            final HashSet<Integer> setId = new HashSet<Integer>();
            for (int i = 0; i < retGeoIDList.size(); ++i) {
                if (retGeoIDList.get(i).get("sValue") != null) {
                    if (nComId.equals(retGeoIDList.get(i).get("sValue"))) {
                        setId.add(Integer.valueOf(retGeoIDList.get(i).get("sMainId").toString()));
                    }
                }
            }
            final String strCondition = setId.toString();
            strCondition.replace('[', '(');
            strCondition.replace(']', ')');
            paramMap.clear();
            paramMap.put("TABLENAME", sPropTable);
            paramMap.put("FIELD", "NAME");
            paramMap.put("FIELDVALUE", sParam);
            retGeoIDList = this.fmyItemTableService.selectByField(paramMap);
            if (retGeoIDList.size() == 0) {
                return "";
            }
            for (int j = 0; j < retGeoIDList.size(); ++j) {
                if (setId.contains(retGeoIDList.get(j).get("sMainId"))) {
                    retList.add(retGeoIDList.get(j).get("sValue").toString());
                }
            }
            return retList.toString();
        }
        catch (Exception ex) {
            ex.printStackTrace();
            ProTableController.log.error("API异常", ex);
            return retList.toString();
        }
    }
    
    @RequestMapping(value = { "/protable/getComAttrInf" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Map<String, Object>> getComAttrInf(@RequestParam(value = "nProjectId", required = true) final int nProjectId, @RequestParam(value = "sQueryParam", required = true) final String sQueryParam, final HttpServletResponse res) {
        final Map<String, Map<String, Object>> Retlist = new HashMap<String, Map<String, Object>>();
        final boolean success = false;
        final List<String> retList = null;
        final String strId = "智能构件库编码";
        final int nId = -1;
        try {
            final String sSchemeId = this.projectService.getPrefixionByProjectId(Integer.valueOf(nProjectId));
            if ("-1".equals(sSchemeId)) {
                return Retlist;
            }
            String sPropTable = "FAMILYTABLE_" + sSchemeId;
            final Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("TABLENAME", sPropTable);
            paramMap.put("FIELDS", "OBJECTID,NAME,PARENTID");
            paramMap.put("CONDITION", "NAME LIKE'%" + sQueryParam + "%'");
            List<Map<String, Object>> retGeoIDList = null;
            retGeoIDList = this.familyTableService.selectByParam(paramMap);
            if (retGeoIDList.size() == 0) {
                return Retlist;
            }
            final HashSet<Integer> setId = new HashSet<Integer>();
            final Map<String, Object> tempMap = new HashMap<String, Object>();
            for (int i = 0; i < retGeoIDList.size(); ++i) {
                final Integer nParentId = Integer.valueOf(retGeoIDList.get(i).get("sParentId").toString());
                if (nParentId != -1) {
                    setId.add(Integer.valueOf(retGeoIDList.get(i).get("OBJECTID").toString()));
                    tempMap.put(retGeoIDList.get(i).get("OBJECTID").toString(), retGeoIDList.get(i).get("sName"));
                }
            }
            final Map<Integer, Integer> MapIdToParentID = new HashMap<Integer, Integer>();
            for (final int nID : setId) {
                paramMap.clear();
                paramMap.put("TABLENAME", sPropTable);
                paramMap.put("PARENTID", nID);
                List<Map<String, Object>> retFamilyIDList = null;
                retFamilyIDList = this.familyTableService.selectFamilyByParentId(paramMap);
                if (retFamilyIDList == null) {
                    continue;
                }
                final Integer nParentID = new Integer(nID);
                for (int j = 0; j < retFamilyIDList.size(); ++j) {
                    final String sChildrenId = retFamilyIDList.get(j).get("OBJECTID").toString();
                    final Integer nChildrenID = Integer.valueOf(sChildrenId);
                    MapIdToParentID.put(nChildrenID, nParentID);
                    if (!tempMap.containsKey(sChildrenId)) {
                        tempMap.put(sChildrenId, retFamilyIDList.get(j).get("sName"));
                    }
                }
            }
            sPropTable = "FMYITEMTABLE_" + sSchemeId;
            paramMap.clear();
            paramMap.put("TABLENAME", sPropTable);
            paramMap.put("FIELD", "NAME");
            paramMap.put("FIELDVALUE", strId);
            List<Map<String, Object>> retGeoList = null;
            retGeoList = this.fmyItemTableService.selectByField(paramMap);
            for (int k = 0; k < retGeoList.size(); ++k) {
                final String strFamilyId = retGeoList.get(k).get("sMainId").toString();
                if (MapIdToParentID.containsKey(Integer.valueOf(strFamilyId))) {
                    final Integer nParentID = MapIdToParentID.get(Integer.valueOf(strFamilyId));
                    final String strPrentName = tempMap.get(nParentID.toString()).toString();
                    Map<String, Object> mapIdAndName = Retlist.get(strPrentName);
                    if (mapIdAndName == null) {
                        mapIdAndName = new HashMap<String, Object>();
                        Retlist.put(strPrentName, mapIdAndName);
                    }
                    mapIdAndName.put("类型", tempMap.get(strFamilyId));
                    mapIdAndName.put("id", retGeoList.get(k).get("sValue"));
                }
            }
        }
        catch (Exception ex) {
            ex.printStackTrace();
            ProTableController.log.error("API异常", ex);
        }
        return Retlist;
    }
    
    @RequestMapping(value = { "/protable/getAllComAttr" }, method = { RequestMethod.GET })
    @ResponseBody
    public List<Map<String, Object>> getAllComAttr(@RequestParam(value = "nProjectId", required = true) final int nProjectId, final HttpServletResponse res) {
        final Map<String, Map<String, Object>> RetMap = new HashMap<String, Map<String, Object>>();
        final List<Map<String, Object>> Retlist = new ArrayList<Map<String, Object>>();
        final List<String> retList = null;
        final String strId = "智能构件库编码";
        final int nId = -1;
        try {
            final String sSchemeId = this.projectService.getPrefixionByProjectId(Integer.valueOf(nProjectId));
            if ("-1".equals(sSchemeId)) {
                return Retlist;
            }
            String sPropTable = "FMYITEMTABLE_" + sSchemeId;
            List<Map<String, Object>> Fmylist = null;
            Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("TABLENAME", sPropTable);
            Fmylist = this.fmyItemTableService.selectAll(paramMap);
            for (int i = 0; i < Fmylist.size(); ++i) {
                final String sId = Fmylist.get(i).get("sMainId").toString();
                Map<String, Object> TempMap = RetMap.get(sId);
                if (TempMap == null) {
                    TempMap = new HashMap<String, Object>();
                    RetMap.put(sId, TempMap);
                }
                TempMap.put(Fmylist.get(i).get("sName").toString(), Fmylist.get(i).get("sValue"));
                TempMap.put("单位", Fmylist.get(i).get("sUnit"));
            }
            sPropTable = "FAMILYTABLE_" + sSchemeId;
            paramMap.clear();
            paramMap.put("TABLENAME", sPropTable);
            Fmylist = this.familyTableService.selectAll(paramMap);
            for (int i = 0; i < Fmylist.size(); ++i) {
                final String sId = Fmylist.get(i).get("OBJECTID").toString();
                final Map<String, Object> TempMap = RetMap.get(sId);
                if (TempMap != null) {
                    paramMap = new HashMap<String, Object>();
                    paramMap.put("TABLENAME", "FAMILYTABLE_" + sSchemeId);
                    paramMap.put("OBJECTID", sId);
                    final Map<String, Object> parentFmyMap = this.familyTableService.selectParentFamilyById(paramMap);
                    TempMap.put("构件名称", parentFmyMap.get("name"));
                    TempMap.put("NAME", Fmylist.get(i).get("sName"));
                }
            }
            final String geoTable = "GEOTABLE_" + sSchemeId;
            paramMap.clear();
            paramMap.put("TABLENAME", geoTable);
            final List<Map<String, Object>> list = this.geoTableService.selectGeoCount(paramMap);
            for (final String key : RetMap.keySet()) {
                final Map<String, Object> value = RetMap.get(key);
                for (final Map<String, Object> map : list) {
                    final String familyid = map.get("familyid").toString();
                    if (familyid.equals(key)) {
                        value.put("count", map.get("geocount").toString());
                    }
                }
                Retlist.add(value);
            }
            return Retlist;
        }
        catch (Exception ex) {
            ex.printStackTrace();
            ProTableController.log.error("API异常", ex);
            return Retlist;
        }
    }
    
    @RequestMapping(value = { "/protable/getAllComAttrByName" }, method = { RequestMethod.GET })
    @ResponseBody
    public List<Map<String, Object>> getAllComAttrByName(@RequestParam(value = "nProjectId", required = true) final int nProjectId, @RequestParam(value = "sComName", required = true) final String sComName, final HttpServletResponse res) {
        final List<Map<String, Object>> RetMap = new ArrayList<Map<String, Object>>();
        final List<String> retList = null;
        final String strId = "智能构件库编码";
        final int nId = -1;
        try {
            final String sSchemeId = this.projectService.getPrefixionByProjectId(Integer.valueOf(nProjectId));
            if ("-1".equals(sSchemeId)) {
                return RetMap;
            }
            String sPropTable = "FAMILYTABLE_" + sSchemeId;
            final Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("TABLENAME", sPropTable);
            paramMap.put("NAME", sComName);
            List<Map<String, Object>> Fmylist = null;
            Fmylist = this.familyTableService.selectFamilyByName(paramMap);
            if (Fmylist == null || Fmylist.size() == 0) {
                return RetMap;
            }
            final List<Map<String, Object>> Fmylist2 = new ArrayList<Map<String, Object>>();
            this.getChirdFmyIds(Fmylist2, Fmylist, sSchemeId);
            final List<String> fmyIdList = new ArrayList<String>();
            for (final Map<String, Object> map : Fmylist2) {
                final String sID = map.get("OBJECTID").toString();
                final String sPID = map.get("sParentId").toString();
                if (!"-1".equals(sPID)) {
                    if (fmyIdList.contains(sID)) {
                        continue;
                    }
                    fmyIdList.add(sID);
                    final Map<String, Object> itemMap = new HashMap<String, Object>();
                    sPropTable = "FMYITEMTABLE_" + sSchemeId;
                    paramMap.clear();
                    paramMap.put("TABLENAME", sPropTable);
                    paramMap.put("FAMILYID", sID);
                    Fmylist = this.fmyItemTableService.selectByFamilyId(paramMap);
                    if (Fmylist == null) {
                        continue;
                    }
                    if (Fmylist.size() == 0) {
                        continue;
                    }
                    itemMap.put("构件名称", map.get("parentName"));
                    for (final Map<String, Object> map2 : Fmylist) {
                        itemMap.put(map2.get("sName").toString(), map2.get("sValue"));
                        itemMap.put("单位", map2.get("sUnit"));
                    }
                    final String geoTable = "GEOTABLE_" + sSchemeId;
                    paramMap.clear();
                    paramMap.put("TABLENAME", geoTable);
                    final List<Map<String, Object>> list = this.geoTableService.selectGeoCount(paramMap);
                    String countString = "0";
                    for (final Map<String, Object> map3 : list) {
                        final String familyid = map3.get("familyid").toString();
                        if (familyid.equals(sID)) {
                            countString = map3.get("geocount").toString();
                        }
                    }
                    itemMap.put("count", countString);
                    RetMap.add(itemMap);
                }
            }
        }
        catch (Exception ex) {
            ex.printStackTrace();
            ProTableController.log.error("API异常", ex);
            return new ArrayList<Map<String, Object>>();
        }
        return RetMap;
    }
    
    private void getChirdFmyIds(final List<Map<String, Object>> result, final List<Map<String, Object>> Fmylist, final String sSchemeId) throws Exception {
        final String sPropTable = "FAMILYTABLE_" + sSchemeId;
        for (final Map<String, Object> map : Fmylist) {
            List<Map<String, Object>> Fmylist2 = null;
            final String sID = map.get("OBJECTID").toString();
            final Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("TABLENAME", sPropTable);
            paramMap.put("PARENTID", sID);
            Fmylist2 = this.familyTableService.selectFamilyByParentId(paramMap);
            result.add(map);
            if (Fmylist2 != null && Fmylist2.size() > 0) {
                this.getChirdFmyIds(result, Fmylist2, sSchemeId);
                result.addAll(Fmylist2);
            }
        }
    }
    
    @RequestMapping(value = { "/protable/getAllComAttrByKind" }, method = { RequestMethod.GET })
    @ResponseBody
    public List<Map<String, Object>> getAllComAttrByKind(@RequestParam(value = "nProjectId", required = true) final int nProjectId, @RequestParam(value = "sComKind", required = true) final String sComKind, final HttpServletResponse res) {
        final List<Map<String, Object>> Retlist = new ArrayList<Map<String, Object>>();
        final List<String> retList = null;
        final String strId = "智能构件库编码";
        final int nId = -1;
        try {
            final String sSchemeId = this.projectService.getPrefixionByProjectId(Integer.valueOf(nProjectId));
            if ("-1".equals(sSchemeId)) {
                return Retlist;
            }
            String sPropTable = "FAMILYTABLE_" + sSchemeId;
            Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("TABLENAME", sPropTable);
            paramMap.put("NAME", sComKind);
            List<Map<String, Object>> Fmylist = null;
            Fmylist = this.familyTableService.selectFamilyByName(paramMap);
            if (Fmylist == null || Fmylist.size() != 1) {
                return Retlist;
            }
            final String sFamilyId = Fmylist.get(0).get("OBJECTID").toString();
            final String sName = Fmylist.get(0).get("sName").toString();
            paramMap.clear();
            paramMap.put("TABLENAME", sPropTable);
            paramMap.put("PARENTID", sFamilyId);
            Fmylist = this.familyTableService.selectFamilyByParentId(paramMap);
            if (Fmylist.size() == 0) {
                return Retlist;
            }
            final String geoTable = "GEOTABLE_" + sSchemeId;
            paramMap.clear();
            paramMap.put("TABLENAME", geoTable);
            final List<Map<String, Object>> list = this.geoTableService.selectGeoCount(paramMap);
            String countString = "0";
            sPropTable = "FMYITEMTABLE_" + sSchemeId;
            for (int i = 0; i < Fmylist.size(); ++i) {
                paramMap.clear();
                final String familyId = Fmylist.get(i).get("OBJECTID").toString();
                paramMap.put("TABLENAME", sPropTable);
                paramMap.put("FAMILYID", familyId);
                List<Map<String, Object>> templist = new ArrayList<Map<String, Object>>();
                templist = this.fmyItemTableService.selectByFamilyId(paramMap);
                final Map<String, Object> RetMap = new HashMap<String, Object>();
                countString = "0";
                for (final Map<String, Object> map : list) {
                    final String familyid = map.get("familyid").toString();
                    if (familyid.equals(familyId)) {
                        countString = map.get("geocount").toString();
                    }
                }
                RetMap.put("count", countString);
                paramMap = new HashMap<String, Object>();
                paramMap.put("TABLENAME", "FAMILYTABLE_" + sSchemeId);
                paramMap.put("OBJECTID", familyId);
                final Map<String, Object> parentFmyMap = this.familyTableService.selectParentFamilyById(paramMap);
                RetMap.put("构件名称", parentFmyMap.get("name"));
                for (int j = 0; j < templist.size(); ++j) {
                    RetMap.put(templist.get(j).get("sName").toString(), templist.get(j).get("sValue"));
                }
                Retlist.add(RetMap);
            }
        }
        catch (Exception ex) {
            ex.printStackTrace();
            ProTableController.log.error("API异常", ex);
        }
        return Retlist;
    }
    
    @RequestMapping(value = { "/protable/getComAttrAndParam" }, method = { RequestMethod.GET })
    @ResponseBody
    public List<Map<String, Object>> getComAttrAndParam(@RequestParam(value = "nProjectId", required = true) final int nProjectId, @RequestParam(value = "sComKind", required = true) final String sComKind, final HttpServletResponse res) {
        final List<Map<String, Object>> Retlist = new ArrayList<Map<String, Object>>();
        final List<String> retList = null;
        final String strId = "智能构件库编码";
        final int nId = -1;
        try {
            final String sSchemeId = this.projectService.getPrefixionByProjectId(Integer.valueOf(nProjectId));
            if ("-1".equals(sSchemeId)) {
                return Retlist;
            }
            String sPropTable = "FAMILYTABLE_" + sSchemeId;
            final Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("TABLENAME", sPropTable);
            paramMap.put("NAME", sComKind);
            List<Map<String, Object>> Fmylist = null;
            Fmylist = this.familyTableService.selectFamilyByName(paramMap);
            if (Fmylist == null || Fmylist.size() != 1) {
                return Retlist;
            }
            final String sFamilyId = Fmylist.get(0).get("OBJECTID").toString();
            final String sName = Fmylist.get(0).get("sName").toString();
            sPropTable = "FMYITEMTABLE_" + sSchemeId;
            paramMap.put("TABLENAME", sPropTable);
            paramMap.put("FAMILYID", sFamilyId);
            Fmylist = this.fmyItemTableService.selectByFamilyId(paramMap);
            sPropTable = "GEOTABLE_" + sSchemeId;
            paramMap.clear();
            paramMap.put("TABLENAME", sPropTable);
            paramMap.put("FAMILYID", sFamilyId);
            List<Map<String, Object>> Geolist = null;
            Geolist = this.geoTableService.selectByFamilyId(paramMap);
            sPropTable = "PROTABLE_" + sSchemeId;
            for (int j = 0; j < Geolist.size(); ++j) {
                final String sGeoId = Geolist.get(j).get("OBJECTID").toString();
                paramMap.clear();
                paramMap.put("TABLENAME", sPropTable);
                paramMap.put("GEOID", sGeoId);
                List<Map<String, Object>> prolist = null;
                prolist = this.proTableService.selectProTableById(paramMap);
                final Map<String, Object> RetMap = new HashMap<String, Object>();
                RetMap.put("name", sName);
                for (int m = 0; m < Fmylist.size(); ++m) {
                    RetMap.put(Fmylist.get(m).get("sName").toString(), Fmylist.get(m).get("sValue"));
                }
                for (int k = 0; k < prolist.size(); ++k) {
                    RetMap.put(prolist.get(j).get("NAME").toString(), prolist.get(j).get("VALUE"));
                }
                Retlist.add(RetMap);
            }
        }
        catch (Exception ex) {
            ex.printStackTrace();
            ProTableController.log.error("API异常", ex);
        }
        return Retlist;
    }
    
    @RequestMapping(value = { "/protable/getComParam" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> getComParam(@RequestParam(value = "nProjectId", required = true) final int nProjectId, @RequestParam(value = "sComKind", required = true) final String sComKind, @RequestParam(value = "sField", required = true) final String sField, final HttpServletResponse res) {
        final Map<String, Object> RetMap = new HashMap<String, Object>();
        final List<String> retList = null;
        final String strId = "智能构件库分编码";
        final int nId = -1;
        try {
            final String sSchemeId = this.projectService.getPrefixionByProjectId(Integer.valueOf(nProjectId));
            if ("-1".equals(sSchemeId)) {
                return RetMap;
            }
            String sPropTable = "FAMILYTABLE_" + sSchemeId;
            final Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("TABLENAME", sPropTable);
            paramMap.put("NAME", sComKind);
            List<Map<String, Object>> Fmylist = null;
            Fmylist = this.familyTableService.selectFamilyByName(paramMap);
            if (Fmylist == null || Fmylist.size() != 1) {
                return RetMap;
            }
            final String sId = Fmylist.get(0).get("OBJECTID").toString();
            paramMap.clear();
            sPropTable = "FMYITEMTABLE_" + sSchemeId;
            paramMap.put("TABLENAME", sPropTable);
            paramMap.put("FAMILYID", sId);
            Fmylist = this.fmyItemTableService.selectByFamilyId(paramMap);
            if (Fmylist.size() == 0) {
                return RetMap;
            }
            for (int i = 0; i < Fmylist.size(); ++i) {
                if (sField.equals(Fmylist.get(i).get("sName"))) {
                    RetMap.put(sField, Fmylist.get(0).get(sField));
                    break;
                }
            }
        }
        catch (Exception ex) {
            ex.printStackTrace();
            ProTableController.log.error("API异常", ex);
        }
        return RetMap;
    }
    
    @RequestMapping(value = { "/protable/getComEnumAttr" }, method = { RequestMethod.GET })
    @ResponseBody
    public List<Map<String, Object>> getComEnumAttr(@RequestParam(value = "nProjectId", required = true) final int nProjectId, @RequestParam(value = "sQueryParam", required = true) final String sQueryParam, final HttpServletResponse res) {
        final List<Map<String, Object>> Retlist = new ArrayList<Map<String, Object>>();
        final boolean success = false;
        final List<String> retList = null;
        final String strId = "智能构件库编码";
        final int nId = -1;
        try {
            final String sSchemeId = this.projectService.getPrefixionByProjectId(Integer.valueOf(nProjectId));
            if ("-1".equals(sSchemeId)) {
                return Retlist;
            }
            String sPropTable = "FAMILYTABLE_" + sSchemeId;
            final Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("TABLENAME", sPropTable);
            paramMap.put("NAME", sQueryParam);
            List<Map<String, Object>> retFamilyIDList = null;
            retFamilyIDList = this.familyTableService.fuzzyQueryByName(paramMap);
            if (retFamilyIDList == null || retFamilyIDList.size() == 0) {
                return Retlist;
            }
            final Map<String, String> mapIdToName = new HashMap<String, String>();
            for (int i = 0; i < retFamilyIDList.size(); ++i) {
                if (!"-1".equals(retFamilyIDList.get(i).get("sParentId").toString())) {
                    mapIdToName.put(retFamilyIDList.get(i).get("OBJECTID").toString(), retFamilyIDList.get(i).get("sName").toString());
                }
            }
            paramMap.clear();
            paramMap.put("TABLENAME", sPropTable);
            retFamilyIDList = this.familyTableService.selectAll(paramMap);
            final Map<String, Map<String, String>> mapParentIdToChildren = new HashMap<String, Map<String, String>>();
            for (int j = 0; j < retFamilyIDList.size(); ++j) {
                final String strID = retFamilyIDList.get(j).get("OBJECTID").toString();
                final String strParentID = retFamilyIDList.get(j).get("sParentId").toString();
                final String strName = retFamilyIDList.get(j).get("sName").toString();
                Map<String, String> MapChild = mapParentIdToChildren.get(strParentID);
                if (MapChild == null) {
                    MapChild = new HashMap<String, String>();
                    mapParentIdToChildren.put(strParentID, MapChild);
                }
                MapChild.put(strID, strName);
            }
            final Iterator<Map.Entry<String, String>> it = mapIdToName.entrySet().iterator();
            while (it.hasNext()) {
                final Map.Entry<String, String> entry = it.next();
                final String key = entry.getKey();
                if (!mapParentIdToChildren.containsKey(key)) {
                    it.remove();
                }
            }
            final Iterator<Map.Entry<String, String>> iterator = mapIdToName.entrySet().iterator();
            while (iterator.hasNext()) {
                final Map.Entry<String, String> entry = iterator.next();
                final String sFamilyName = entry.getValue();
                final Map<String, String> MapChild = mapParentIdToChildren.get(entry.getKey());
                if (MapChild.size() == 0) {
                    continue;
                }
                String sIdValue = "(";
                final StringBuilder sb = new StringBuilder();
                for (final Map.Entry<String, String> entry2 : MapChild.entrySet()) {
                    final String k = entry2.getKey();
                    sb.append(k);
                    sb.append(',');
                }
                sIdValue = sIdValue.concat(sb.toString());
                sIdValue = sIdValue.substring(0, sIdValue.length() - 1);
                sIdValue = String.valueOf(sIdValue) + ")";
                paramMap.clear();
                sPropTable = "FMYITEMTABLE_" + sSchemeId;
                paramMap.put("TABLENAME", sPropTable);
                paramMap.put("FAMILYIDVALUE", sIdValue);
                retFamilyIDList = this.fmyItemTableService.selectAllEnumByFamilyId(paramMap);
                String strID2 = "";
                final Map<String, HashSet<String>> mapFieldEnum = new HashMap<String, HashSet<String>>();
                for (int l = 0; l < retFamilyIDList.size(); ++l) {
                    final String strFiledName = retFamilyIDList.get(l).get("sName").toString();
                    final String strFiledValue = retFamilyIDList.get(l).get("sValue").toString();
                    if (strId.equals(strFiledName)) {
                        strID2 = strFiledValue;
                    }
                    else {
                        HashSet FiledEnum = mapFieldEnum.get(strFiledName);
                        if (FiledEnum == null) {
                            FiledEnum = new HashSet();
                            mapFieldEnum.put(strFiledName, FiledEnum);
                        }
                        FiledEnum.add(strFiledValue);
                    }
                }
                final Map<String, Object> RetMap = new HashMap<String, Object>();
                RetMap.put("id", strID2);
                RetMap.put("name", sFamilyName);
                RetMap.put("fields", mapFieldEnum);
                Retlist.add(RetMap);
            }
        }
        catch (Exception ex) {
            ex.printStackTrace();
            ProTableController.log.error("API异常", ex);
        }
        return Retlist;
    }
}
