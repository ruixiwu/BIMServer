package com.yunfan.tmcc.ivr.controller;

import com.alibaba.fastjson.JSON;
import com.github.kevinsawicki.http.HttpRequest;
import com.yunfan.tmcc.ivr.model.Tree;
import com.yunfan.tmcc.ivr.model.TreeNodeModel;
import com.yunfan.tmcc.ivr.service.FamilyTableService;
import com.yunfan.tmcc.ivr.service.ProjectService;
import com.yunfan.tmcc.ivr.util.Constant;
import com.yunfan.tmcc.ivr.util.TreeUtil;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.yunfan.tmcc.ivr.util.TreeUtil.getSomeList;

@Controller
public class ProjectKindController
{
    private static final Logger log;
    @Autowired
    private ProjectService projectService;
    @Autowired
    private FamilyTableService familyTableService;
    
    static {
        log = Logger.getLogger(ProjectKindController.class);
    }
    
    public ProjectKindController() {
        super();
    }
    
    @RequestMapping(value = { "/getProjectAllKind" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> queryProject(@RequestParam(value = "nProjectId", required = true) final int nProjectId) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        final List<Map<String, Object>> data = new ArrayList<Map<String, Object>>();
        String code = "500";
        boolean success = false;
        try {
            final String sSchemeId = this.projectService.getPrefixionByProjectId(Integer.valueOf(nProjectId));
            if ("-1".equals(sSchemeId) || StringUtils.isEmpty(sSchemeId)) {
                retMap.put("code", code);
                retMap.put("success", success);
                retMap.put("data", "项目有误");
                return retMap;
            }
            final int prefixion = Integer.valueOf(sSchemeId);
            final Map<String, Object> paramMap2 = new HashMap<String, Object>();
            paramMap2.put("TABLENAME", "FAMILYTABLE_" + prefixion);
            final List<Map<String, Object>> result = this.familyTableService.selectAllFamily(paramMap2);
            final List<Tree<TreeNodeModel>> treeNodes2 = new ArrayList<Tree<TreeNodeModel>>();
            for (final Map<String, Object> map : result) {
                final Tree<TreeNodeModel> tree = (Tree<TreeNodeModel>)new Tree();
                tree.setId(map.get("OBJECTID").toString());
                tree.setParentId(map.get("sParentId").toString());
                tree.setText(map.get("sName").toString());
                tree.setIdText("");
                treeNodes2.add(tree);
            }
            final Map<String, Object> apiParamMap = new HashMap<String, Object>();
            apiParamMap.put("parent_no", null);
            final String apiResponseStr = HttpRequest.get((String.valueOf(Constant.LKAPIURL) + "/getComTypeTree"), apiParamMap, true).body();
            final List<HashMap> list = JSON.parseArray(apiResponseStr, HashMap.class);
            final List<Tree<TreeNodeModel>> treeNodes3 = new ArrayList<Tree<TreeNodeModel>>();
            for (final HashMap map2 : list) {
                final Tree<TreeNodeModel> tree2 = (Tree<TreeNodeModel>)new Tree();
                tree2.setId(map2.get("no").toString());
                tree2.setParentId(map2.get("parent_no").toString());
                tree2.setText(map2.get("name").toString());
                tree2.setIdText(map2.get("id").toString());
                treeNodes3.add(tree2);
            }
            final List<Tree<TreeNodeModel>> t4 = getSomeList(treeNodes3, treeNodes2);
            for (final Tree<TreeNodeModel> node : t4) {
                final Map<String, Object> map3 = new HashMap<String, Object>();
                map3.put("no", node.getId());
                map3.put("parent_no", node.getParentId());
                map3.put("name", node.getText());
                map3.put("id", node.getIdText());
                data.add(map3);
            }
            code = "200";
            success = true;
        }
        catch (Exception e) {
            e.printStackTrace();
            ProjectKindController.log.error("API异常", e);
        }
        retMap.put("code", code);
        retMap.put("success", success);
        retMap.put("data", data);
        return retMap;
    }
    
    @RequestMapping(value = { "/getProjectKindById" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> getProjectKindById(@RequestParam(value = "nProjectId", required = true) final int nProjectId, @RequestParam(value = "nkindId", required = true) final String nkindId) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        final List<Map<String, Object>> data = new ArrayList<Map<String, Object>>();
        String code = "500";
        boolean success = false;
        try {
            final String sSchemeId = this.projectService.getPrefixionByProjectId(Integer.valueOf(nProjectId));
            if ("-1".equals(sSchemeId) || StringUtils.isEmpty(sSchemeId)) {
                retMap.put("code", code);
                retMap.put("success", success);
                retMap.put("data", "项目有误");
                return retMap;
            }
            final int prefixion = Integer.valueOf(sSchemeId);
            final Map<String, Object> paramMap2 = new HashMap<String, Object>();
            paramMap2.put("TABLENAME", "FAMILYTABLE_" + prefixion);
            final List<Map<String, Object>> result = this.familyTableService.selectAllFamily(paramMap2);
            final List<Tree<TreeNodeModel>> treeNodes2 = new ArrayList<Tree<TreeNodeModel>>();
            for (final Map<String, Object> map : result) {
                final Tree<TreeNodeModel> tree = (Tree<TreeNodeModel>)new Tree();
                tree.setId(map.get("OBJECTID").toString());
                tree.setParentId(map.get("sParentId").toString());
                tree.setText(map.get("sName").toString());
                tree.setIdText("");
                treeNodes2.add(tree);
            }
            final Map<String, Object> apiParamMap = new HashMap();
            apiParamMap.put("parent_no", nkindId);
            final String apiResponseStr = HttpRequest.get((String.valueOf(Constant.LKAPIURL) + "/getComTypeTree"), apiParamMap, true).body();
            final List<HashMap> list = JSON.parseArray(apiResponseStr, HashMap.class);
            final List<Tree<TreeNodeModel>> treeNodes3 = new ArrayList<Tree<TreeNodeModel>>();
            for (final HashMap map2 : list) {
                final Tree<TreeNodeModel> tree2 = (Tree<TreeNodeModel>)new Tree();
                tree2.setId(map2.get("no").toString());
                tree2.setParentId(map2.get("parent_no").toString());
                tree2.setText(map2.get("name").toString());
                tree2.setIdText(map2.get("id").toString());
                treeNodes3.add(tree2);
            }
            final List<Tree<TreeNodeModel>> t4 = getSomeList(treeNodes3, treeNodes2);
            for (final Tree<TreeNodeModel> node : t4) {
                final Map<String, Object> map3 = new HashMap<String, Object>();
                map3.put("no", node.getId());
                map3.put("parent_no", node.getParentId());
                map3.put("name", node.getText());
                map3.put("id", node.getIdText());
                data.add(map3);
            }
            code = "200";
            success = true;
        }
        catch (Exception e) {
            e.printStackTrace();
            ProjectKindController.log.error("API异常", e);
        }
        retMap.put("code", code);
        retMap.put("success", success);
        retMap.put("data", data);
        return retMap;
    }
    
    @RequestMapping(value = { "/getProjectKindByName" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> getProjectKindByName(@RequestParam(value = "nProjectId", required = true) final int nProjectId, @RequestParam(value = "sKindName", required = true) final String sKindName) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        final List<Map<String, Object>> data = new ArrayList<Map<String, Object>>();
        String code = "500";
        boolean success = false;
        try {
            final String sSchemeId = this.projectService.getPrefixionByProjectId(Integer.valueOf(nProjectId));
            if ("-1".equals(sSchemeId) || StringUtils.isEmpty(sSchemeId)) {
                retMap.put("code", code);
                retMap.put("success", success);
                retMap.put("data", "项目有误");
                return retMap;
            }
            final int prefixion = Integer.valueOf(sSchemeId);
            final Map<String, Object> paramMap2 = new HashMap<String, Object>();
            paramMap2.put("TABLENAME", "FAMILYTABLE_" + prefixion);
            final List<Map<String, Object>> result = this.familyTableService.selectAllFamily(paramMap2);
            final List<Tree<TreeNodeModel>> treeNodes2 = new ArrayList<Tree<TreeNodeModel>>();
            for (final Map<String, Object> map : result) {
                final Tree<TreeNodeModel> tree = (Tree<TreeNodeModel>)new Tree();
                tree.setId(map.get("OBJECTID").toString());
                tree.setParentId(map.get("sParentId").toString());
                tree.setText(map.get("sName").toString());
                tree.setIdText("");
                treeNodes2.add(tree);
            }
            final Map<String, Object> apiParamMap = new HashMap<String, Object>();
            apiParamMap.put("parent_no", null);
            final String apiResponseStr = HttpRequest.get((String.valueOf(Constant.LKAPIURL) + "/getComTypeTree"), apiParamMap, true).body();
            final List<HashMap> list = JSON.parseArray(apiResponseStr, HashMap.class);
            final List<Tree<TreeNodeModel>> treeNodes3 = new ArrayList<Tree<TreeNodeModel>>();
            for (final HashMap map2 : list) {
                final Tree<TreeNodeModel> tree2 = (Tree<TreeNodeModel>)new Tree();
                tree2.setId(map2.get("no").toString());
                tree2.setParentId(map2.get("parent_no").toString());
                tree2.setText(map2.get("name").toString());
                tree2.setIdText(map2.get("id").toString());
                treeNodes3.add(tree2);
            }
            final List<Tree<TreeNodeModel>> treeNodesByName = new ArrayList<Tree<TreeNodeModel>>();
            TreeUtil.getListByName(treeNodesByName, treeNodes3, sKindName);
            final List<Tree<TreeNodeModel>> t4 = getSomeList(treeNodesByName, treeNodes2);
            for (final Tree<TreeNodeModel> node : t4) {
                final Map<String, Object> map3 = new HashMap<String, Object>();
                map3.put("no", node.getId());
                map3.put("parent_no", node.getParentId());
                map3.put("name", node.getText());
                map3.put("id", node.getIdText());
                data.add(map3);
            }
            code = "200";
            success = true;
        }
        catch (Exception e) {
            e.printStackTrace();
            ProjectKindController.log.error("API异常", e);
        }
        retMap.put("code", code);
        retMap.put("success", success);
        retMap.put("data", data);
        return retMap;
    }
}
