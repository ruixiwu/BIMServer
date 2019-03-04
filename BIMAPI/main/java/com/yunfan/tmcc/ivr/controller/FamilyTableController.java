package com.yunfan.tmcc.ivr.controller;

import com.yunfan.tmcc.ivr.model.FamilyModel;
import com.yunfan.tmcc.ivr.model.TreeNode;
import com.yunfan.tmcc.ivr.service.FamilyTableService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class FamilyTableController
{
    private static final Logger log;
    @Autowired
    private FamilyTableService familyTableService;
    
    static {
        log = Logger.getLogger(FamilyTableController.class);
    }
    
    public FamilyTableController() {
        super();
    }
    
    @RequestMapping(value = { "/family/get" }, method = { RequestMethod.GET })
    @ResponseBody
    public List<Map<String, Object>> queryFamilyTable(@RequestParam(value = "Prefixion", required = true) final String prefixion, @RequestParam(value = "FamilyId", required = true) final String familyId, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        String msg = "操作成功";
        final String tableName = "FAMILYTABLE" + prefixion;
        boolean success = false;
        List<Map<String, Object>> userList = null;
        try {
            final Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("TABLENAME", tableName);
            paramMap.put("OBJECTID", familyId);
            userList = this.familyTableService.selectFamilyById(paramMap);
            success = true;
        }
        catch (Exception ex) {
            ex.printStackTrace();
            msg = ex.getMessage();
            FamilyTableController.log.error("API异常", ex);
        }
        retMap.put("msg", msg);
        retMap.put("success", success);
        retMap.put("data", userList);
        return userList;
    }
    
    @RequestMapping(value = { "/family/insert/" }, method = { RequestMethod.POST })
    @ResponseBody
    public Map<String, Object> addFamilyTable(@RequestParam(value = "OBJECTID", required = true) final Long objectId, @RequestParam(value = "NAME", required = true) final String name, @RequestParam(value = "PARENTID", required = true) final Long parentId, @RequestParam(value = "DESCRIBE", required = true) final String describe, @RequestParam(value = "TABLENAME", required = true) final String tableName, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        String code = "500";
        boolean success = false;
        int id = -1;
        try {
            final Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("NAME", name);
            paramMap.put("PARENTID", parentId);
            paramMap.put("DESCRIBE", describe);
            paramMap.put("TABLENAME", tableName);
            id = this.familyTableService.insertFamily(paramMap);
            code = "200";
            success = true;
        }
        catch (Exception e) {
            e.printStackTrace();
            FamilyTableController.log.error("API异常", e);
        }
        retMap.put("code", code);
        retMap.put("success", success);
        retMap.put("data", id);
        return retMap;
    }
    
    @RequestMapping(value = { "/family/add" }, method = { RequestMethod.POST })
    @ResponseBody
    public Map<String, Object> addFamilyTable(@RequestParam(value = "Prefixion", required = true) final String prefixion, @RequestBody final FamilyModel paraModel, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        String msg = "操作成功";
        boolean success = false;
        final String tableName = "FAMILYTABLE" + prefixion;
        int nRetId = -1;
        try {
            final List<Map<String, Object>> familyList = null;
            nRetId = this.familyTableService.insert(paraModel, prefixion);
            success = true;
        }
        catch (Exception e) {
            e.printStackTrace();
            FamilyTableController.log.error("API异常", e);
            msg = e.getMessage();
        }
        retMap.put("success", success);
        retMap.put("msg", msg);
        retMap.put("FamilyId", nRetId);
        return retMap;
    }
    
    @RequestMapping(value = { "/family/create/{TABLENAME}" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> createAccessorTable(@PathVariable("TABLENAME") final String tableName, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        boolean success = false;
        int nId = -1;
        try {
            nId = this.familyTableService.createTable(tableName);
            success = true;
        }
        catch (Exception ex) {
            ex.printStackTrace();
        }
        retMap.put("success", success);
        retMap.put("data", nId);
        return retMap;
    }
    
    @RequestMapping(value = { "/family/query" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> queryFamilyTable(@RequestParam("Prefixion") final String Prefixion, @RequestParam("FamilyId") final Long FamilyId, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        final String tableName = "FAMILYTABLE" + Prefixion;
        boolean success = false;
        List<Map<String, Object>> userList = null;
        try {
            final Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("TABLENAME", tableName);
            paramMap.put("OBJECTID", FamilyId);
            userList = this.familyTableService.selectFamilyById(paramMap);
            success = true;
        }
        catch (Exception ex) {
            ex.printStackTrace();
            FamilyTableController.log.error("API异常", ex);
        }
        retMap.put("success", success);
        retMap.put("data", userList);
        return retMap;
    }
    
    private TreeNode getFamilyTree(final String Prefixion, final int objectId, final String tableName) {
        final TreeNode treeNode = new TreeNode();
        try {
            final Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("TABLENAME", tableName);
            paramMap.put("PARENTID", objectId);
            List<Map<String, Object>> tempList = null;
            tempList = this.familyTableService.selectFamilyByParentId(paramMap);
            for (int nSize = tempList.size(), i = 0; i < nSize; ++i) {
                treeNode.mapFieldValue = tempList.get(i);
                final int nObjectId = Integer.parseInt(tempList.get(i).get("OBJECTID").toString());
                treeNode.children.add(this.getFamilyTree(Prefixion, nObjectId, tableName));
            }
        }
        catch (Exception ex) {
            ex.printStackTrace();
            FamilyTableController.log.error("API异常", ex);
        }
        return treeNode;
    }
    
    @RequestMapping(value = { "/family/queryall" }, method = { RequestMethod.GET })
    @ResponseBody
    public List<TreeNode> queryFamilyTable(@RequestParam(value = "Prefixion", required = true) final String prefixion, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        final String tableName = "FAMILYTABLE" + prefixion;
        boolean success = false;
        final TreeNode treeNode = new TreeNode();
        try {
            treeNode.children.add(this.getFamilyTree(prefixion, -1, tableName));
            success = true;
        }
        catch (Exception ex) {
            ex.printStackTrace();
            FamilyTableController.log.error("API异常", ex);
        }
        return (List<TreeNode>)treeNode.children;
    }
}
