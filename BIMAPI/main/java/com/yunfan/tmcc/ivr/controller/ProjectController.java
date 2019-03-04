package com.yunfan.tmcc.ivr.controller;

import com.yunfan.tmcc.ivr.model.AffixTableModel;
import com.yunfan.tmcc.ivr.service.AffixTableService;
import com.yunfan.tmcc.ivr.service.Coordinate_SystemService;
import com.yunfan.tmcc.ivr.service.ProjectService;
import com.yunfan.tmcc.ivr.service.WorkspaceService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class ProjectController
{
    private static final Logger log;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private WorkspaceService workspaceService;

    @Autowired(required = false)
    private AffixTableService affixTableService;
    @Autowired(required = false)
    private Coordinate_SystemService coordinate_SystemService;
    
    static {
        log = Logger.getLogger(ProjectController.class);
    }
    public ProjectController() {
        super();
    }
    
    @RequestMapping(value = { "/project/add" }, method = { RequestMethod.POST }, consumes = { "application/json" })
    @ResponseBody
    public Map<String, Object> addProjectAndAffixtable(@RequestParam(value = "Prefixion", required = true) final String Prefixion, @RequestBody final Map<String, Object> map, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        String code = "500";
        boolean success = false;
        int id = -1;
        try {
            final String sAffixName = map.get("sAffixName").toString();
            final String sAffixType = map.get("sAffixType").toString();
            final String sAffixKeyID = map.get("sAffixKeyID").toString();
            final String sProjectName = map.get("sProjectName").toString();
            final String sZipKey = map.get("sZipKey").toString();
            final String sWorkspaceId = map.get("sWorkspaceId").toString();
            final String sForeignID = map.get("sForeignID").toString();
            final String strDesc = map.get("strDesc").toString();
            final Integer nPrefixion = Integer.valueOf(Prefixion.replace("_", ""));
            if (nPrefixion == null || nPrefixion <= 0) {
                retMap.put("code", code);
                retMap.put("success", success);
                retMap.put("data", "Prefixion参数有误");
            }
            final Map<String, Object> paramMap2 = new HashMap<String, Object>();
            paramMap2.put("NAME", sAffixName);
            paramMap2.put("TYPE", sAffixType);
            paramMap2.put("AFFIXFILEID", sAffixKeyID);
            final AffixTableModel affixTableModel = new AffixTableModel();
            affixTableModel.setNAME(sAffixName);
            affixTableModel.setTYPE(sAffixType);
            affixTableModel.setAFFIXFILEID(sAffixKeyID);
            affixTableModel.setTABLENAME("AFFIXTABLE" + Prefixion);
            final Map<String, Object> paramMap3 = new HashMap<String, Object>();
            paramMap3.put("NAME", sProjectName);
            paramMap3.put("PREFIXION", nPrefixion);
            paramMap3.put("DESCRIBE", strDesc);
            paramMap3.put("FOREIGNID", sForeignID);
            paramMap3.put("ZIPKEY", sZipKey);
            paramMap3.put("WORKSPACEID", sWorkspaceId);//这里指工作空间的对应代码id
            paramMap3.put("TABLENAME", "PROJECT");
            this.projectService.addProject(paramMap3, affixTableModel);
            id = Integer.parseInt(paramMap3.get("OBJECTID").toString());
            code = "200";
            success = true;
        }
        catch (Exception e) {
            e.printStackTrace();
            ProjectController.log.error("API异常/project/add", e);
        }
        retMap.put("code", code);
        retMap.put("success", success);
        retMap.put("data", id);
        return retMap;
    }
    
    @RequestMapping(value = { "/project/query" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> queryProject(@RequestParam(value = "Prefixion", required = true) final String Prefixion, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        final Map<String, Object> dataMap = new HashMap<String, Object>();
        String code = "500";
        boolean success = false;
        try {
            final Map<String, Object> paramMap = new HashMap<String, Object>();
            final Integer nPrefixion = Integer.valueOf(Prefixion.replace("_", ""));
            if (nPrefixion == null || nPrefixion <= 0) {
                retMap.put("code", code);
                retMap.put("success", success);
                retMap.put("data", "Prefixion参数有误");
            }
            paramMap.put("PREFIXION", nPrefixion);
            final List<Map<String, Object>> list = this.projectService.queryWithAFFIXTABLE(paramMap);
            if (list != null && list.size() > 0) {
                final Map<String, Object> frist = list.get(0);
                dataMap.put("sProjectName", frist.get("name"));
                dataMap.put("sAffixName", frist.get("aname"));
                dataMap.put("sAffixType", frist.get("atype"));
                dataMap.put("sAffixKeyID", frist.get("affixfileid"));
                dataMap.put("strDesc", frist.get("describe"));
            }
            code = "200";
            success = true;
        }
        catch (Exception e) {
            e.printStackTrace();
            ProjectController.log.error("API异常/project/query", e);
        }
        retMap.put("code", code);
        retMap.put("success", success);
        retMap.put("data", dataMap);
        return retMap;
    }
    
    @RequestMapping(value = { "/projectprefix/create" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> initTables(final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        final Map<String, Object> dataMap = new HashMap<String, Object>();
        int project_no = 1;
        String code = "500";
        boolean success = false;
        try {
            final Integer maxPrefixion = this.projectService.selectMaxPrefixion();
            if (maxPrefixion == null) {
                project_no = 1;
            }
            else {
                project_no = maxPrefixion + 1;
            }
            final Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("TABLENAME", "PROJECT");
            paramMap.put("NAME", "0");
            paramMap.put("PREFIXION", project_no);
            paramMap.put("DESCRIBE", "0");
            paramMap.put("FOREIGNID", "0");
            paramMap.put("ZIPKEY", "0");
            paramMap.put("ZIPPATH", "0");
            paramMap.put("SOURCEID", 0);
            paramMap.put("WORKSPACEID", 0);
            this.projectService.insertProject(paramMap);
            this.projectService.initTables(project_no);
            dataMap.put("Prefixion", "_" + project_no);
            code = "200";
            success = true;
        }
        catch (Exception e) {
            e.printStackTrace();
            ProjectController.log.error("API异常/projectprefix/create", e);
        }
        retMap.put("code", code);
        retMap.put("success", success);
        retMap.put("data", dataMap);
        return retMap;
    }
    
    @RequestMapping(value = { "/projectprefix/query" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> queryProjectPrefix(@RequestParam("Pojectname") final String Pojectname, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        final Map<String, Object> dataMap = new HashMap<String, Object>();
        String code = "500";
        boolean success = false;
        try {
            final Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("NAME", Pojectname);
            final List<Map<String, Object>> list = this.projectService.query(paramMap);
            if (list != null && list.size() > 0) {
                final Map<String, Object> frist = list.get(0);
                dataMap.put("Prefixion", "_" + frist.get("PREFIXION"));
            }
            code = "200";
            success = true;
        }
        catch (Exception e) {
            e.printStackTrace();
            ProjectController.log.error("API异常/projectprefix/query", e);
        }
        retMap.put("code", code);
        retMap.put("success", success);
        retMap.put("data", dataMap);
        return retMap;
    }
}
