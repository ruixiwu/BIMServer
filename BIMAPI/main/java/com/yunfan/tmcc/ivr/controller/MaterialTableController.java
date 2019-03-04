package com.yunfan.tmcc.ivr.controller;

import com.yunfan.tmcc.ivr.model.MaterialtableParaModel;
import com.yunfan.tmcc.ivr.service.MaterialTableService;
import com.yunfan.tmcc.ivr.service.TexturesService;
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
public class MaterialTableController
{
    private static final Logger log;
    @Autowired
    private MaterialTableService materialTableService;
    @Autowired(required = false)
    private TexturesService texturesService;
    
    static {
        log = Logger.getLogger(MaterialTableController.class);
    }
    
    public MaterialTableController() {
        super();
    }
    
    @RequestMapping(value = { "/MATERIALTABLE/get/{TABLENAME}/{OBJECTID}" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> queryUser(@PathVariable("OBJECTID") final long objectId, @PathVariable("TABLENAME") final String tableName, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        String code = "500";
        boolean success = false;
        List<Map<String, Object>> userList = null;
        try {
            final Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("TABLENAME", tableName);
            paramMap.put("OBJECTID", objectId);
            userList = this.materialTableService.selectMaterialById(paramMap);
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
    
    @RequestMapping(value = { "/MATERIALTABLE/insert/" }, method = { RequestMethod.POST })
    @ResponseBody
    public Map<String, Object> addUser(@RequestParam(value = "OBJECTID", required = true) final Long objectId, @RequestParam(value = "NAME", required = true) final String name, @RequestParam(value = "TECHDES", required = true) final String techdes, @RequestParam(value = "AMBIENT", required = true) final String ambient, @RequestParam(value = "EMISSION", required = true) final String emission, @RequestParam(value = "SHININESS", required = true) final String shininess, @RequestParam(value = "SPECULAR", required = true) final String specular, @RequestParam(value = "DIFFUSE", required = true) final String diffuse, @RequestParam(value = "TEXTURE_1", required = true) final Long texture_1, @RequestParam(value = "TEXTURE_2", required = true) final Long texture_2, @RequestParam(value = "TEXTURE_3", required = true) final Long texture_3, @RequestParam(value = "TEXTURE_4", required = true) final Long texture_4, @RequestParam(value = "TABLENAME", required = true) final String tableName, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        String code = "500";
        boolean success = false;
        int id = -1;
        try {
            final Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("OBJECTID", objectId);
            paramMap.put("NAME", name);
            paramMap.put("TECHDES", techdes);
            paramMap.put("AMBIENT", ambient);
            paramMap.put("EMISSION", emission);
            paramMap.put("SHININESS", shininess);
            paramMap.put("SPECULAR", specular);
            paramMap.put("DIFFUSE", diffuse);
            paramMap.put("TEXTURE_1", texture_1);
            paramMap.put("TEXTURE_2", texture_2);
            paramMap.put("TEXTURE_3", texture_3);
            paramMap.put("TEXTURE_4", texture_4);
            paramMap.put("TABLENAME", tableName);
            id = this.materialTableService.insertMaterial(paramMap);
            code = "200";
            success = true;
        }
        catch (Exception e) {
            e.printStackTrace();
            MaterialTableController.log.error("API异常", e);
        }
        retMap.put("code", code);
        retMap.put("success", success);
        retMap.put("data", id);
        return retMap;
    }
    
    @RequestMapping(value = { "/MATERIALTABLE/create/{TABLENAME}" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> createAccessorTable(@PathVariable("TABLENAME") final String tableName, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        boolean success = false;
        int nId = -1;
        try {
            nId = this.materialTableService.createTable(tableName);
            success = true;
        }
        catch (Exception ex) {
            ex.printStackTrace();
        }
        retMap.put("success", success);
        retMap.put("data", nId);
        return retMap;
    }
    
    @RequestMapping(value = { "/material/add" }, method = { RequestMethod.POST }, produces = { "application/json;charset=UTF-8" })
    @ResponseBody
    public Map<String, Object> add(@RequestParam(value = "Prefixion", required = true) final String Prefixion, @RequestBody final MaterialtableParaModel paraModel, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        final Map<String, Object> dataMap = new HashMap<String, Object>();
        String code = "500";
        boolean success = false;
        int id = -1;
        try {
            id = this.materialTableService.insert(paraModel, Prefixion);
            dataMap.put("MatrerialId", id);
            code = "200";
            success = true;
        }
        catch (Exception e) {
            e.printStackTrace();
            MaterialTableController.log.error("添加材质", e);
        }
        retMap.put("code", code);
        retMap.put("success", success);
        retMap.put("data", dataMap);
        return retMap;
    }
    
    @RequestMapping(value = { "/material/query" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> query(@RequestParam(value = "Prefixion", required = true) final String Prefixion, @RequestParam(value = "MatrerialId", required = true) final String MatrerialId, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        final Map<String, Object> dataMap = new HashMap<String, Object>();
        String code = "500";
        boolean success = false;
        try {
            final Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("TABLENAME", "MATERIALTABLE" + Prefixion);
            paramMap.put("OBJECTID", MatrerialId);
            final List<Map<String, Object>> list = this.materialTableService.selectMaterialById(paramMap);
            if (list != null && list.size() > 0) {
                final Map<String, Object> frist = list.get(0);
                dataMap.put("NAME", frist.get("NAME"));
                dataMap.put("TECHDES", frist.get("TECHDES"));
                dataMap.put("AMBIENT", frist.get("AMBIENT"));
                dataMap.put("EMISSION", frist.get("EMISSION"));
                dataMap.put("SHININESS", frist.get("SHININESS"));
                dataMap.put("SPECULAR", frist.get("SPECULAR"));
                dataMap.put("DIFFUSE", frist.get("DIFFUSE"));
                final List<Map<String, Object>> TEXTUREList = new ArrayList<Map<String, Object>>();
                final String TEXTURE_1 = frist.get("TEXTURE_1").toString();
                if (!StringUtils.isBlank(TEXTURE_1) && !"-1".equals(TEXTURE_1)) {
                    paramMap.clear();
                    paramMap.put("TABLENAME", "TEXTURES" + Prefixion);
                    paramMap.put("OBJECTID", TEXTURE_1);
                    final Map<String, Object> TEXTURE_1Map = this.texturesService.selectTexturesById(paramMap);
                    TEXTURE_1Map.remove("OBJECTID");
                    TEXTUREList.add(TEXTURE_1Map);
                }
                if (frist.get("TEXTURE_2") != null) {
                    final String TEXTURE_2 = frist.get("TEXTURE_2").toString();
                    paramMap.clear();
                    paramMap.put("TABLENAME", "TEXTURES" + Prefixion);
                    paramMap.put("OBJECTID", TEXTURE_2);
                    final Map<String, Object> TEXTURE_2Map = this.texturesService.selectTexturesById(paramMap);
                    TEXTURE_2Map.remove("OBJECTID");
                    TEXTUREList.add(TEXTURE_2Map);
                }
                if (frist.get("TEXTURE_3") != null) {
                    final String TEXTURE_3 = frist.get("TEXTURE_3").toString();
                    paramMap.clear();
                    paramMap.put("TABLENAME", "TEXTURES" + Prefixion);
                    paramMap.put("OBJECTID", TEXTURE_3);
                    final Map<String, Object> TEXTURE_3Map = this.texturesService.selectTexturesById(paramMap);
                    TEXTURE_3Map.remove("OBJECTID");
                    TEXTUREList.add(TEXTURE_3Map);
                }
                if (frist.get("TEXTURE_4") != null) {
                    final String TEXTURE_4 = frist.get("TEXTURE_4").toString();
                    paramMap.clear();
                    paramMap.put("TABLENAME", "TEXTURES" + Prefixion);
                    paramMap.put("OBJECTID", TEXTURE_4);
                    final Map<String, Object> TEXTURE_4Map = this.texturesService.selectTexturesById(paramMap);
                    TEXTURE_4Map.remove("OBJECTID");
                    TEXTUREList.add(TEXTURE_4Map);
                }
                dataMap.put("texList", TEXTUREList);
            }
            code = "200";
            success = true;
        }
        catch (Exception e) {
            e.printStackTrace();
            MaterialTableController.log.error("查询材质", e);
        }
        retMap.put("code", code);
        retMap.put("success", success);
        retMap.put("data", dataMap);
        return retMap;
    }
}
