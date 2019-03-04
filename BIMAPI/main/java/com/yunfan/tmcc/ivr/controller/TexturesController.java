package com.yunfan.tmcc.ivr.controller;

import com.yunfan.tmcc.ivr.service.TexturesService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@Controller
public class TexturesController
{
    private static final Logger log;
    @Autowired
    private TexturesService texturesService;
    
    static {
        log = Logger.getLogger(TexturesController.class);
    }
    
    public TexturesController() {
        super();
    }
    
    @RequestMapping(value = { "/TEXTURES/get/{TABLENAME}/{OBJECTID}" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> queryTextures(@PathVariable("OBJECTID") final Long objectId, @PathVariable("TABLENAME") final String tableName, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        String code = "500";
        boolean success = false;
        Map<String, Object> userList = null;
        try {
            final Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("TABLENAME", tableName);
            paramMap.put("OBJECTID", objectId);
            userList = this.texturesService.selectTexturesById(paramMap);
            code = "500";
            success = true;
        }
        catch (Exception ex) {
            ex.printStackTrace();
            TexturesController.log.error("API异常", ex);
        }
        retMap.put("code", code);
        retMap.put("success", success);
        retMap.put("data", userList);
        return retMap;
    }
    
    @RequestMapping(value = { "/TEXTURES/insert/" }, method = { RequestMethod.POST })
    @ResponseBody
    public Map<String, Object> addTextures(@RequestParam(value = "OBJECTID", required = true) final Long objectId, @RequestParam(value = "NAME", required = true) final String name, @RequestParam(value = "FORMAT", required = true) final Long format, @RequestParam(value = "MAGFILTER", required = true) final Long magFilter, @RequestParam(value = "MINFILTER", required = true) final Long minFilter, @RequestParam(value = "WRAPS", required = true) final Long wraps, @RequestParam(value = "WRAPT", required = true) final Long wrapt, @RequestParam(value = "IMAGENAME", required = true) final String imageName, @RequestParam(value = "TEXIMGID", required = true) final String texImgId, @RequestParam(value = "TABLENAME", required = true) final String tableName, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        String code = "500";
        boolean success = false;
        int id = -1;
        try {
            final Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("OBJECTID", objectId);
            paramMap.put("NAME", name);
            paramMap.put("FORMAT", format);
            paramMap.put("MAGFILTER", magFilter);
            paramMap.put("MINFILTER", minFilter);
            paramMap.put("WRAPS", wraps);
            paramMap.put("WRAPT", wrapt);
            paramMap.put("IMAGENAME", imageName);
            paramMap.put("TEXIMGID", texImgId);
            paramMap.put("TABLENAME", tableName);
            id = this.texturesService.insertTextures(paramMap);
            code = "200";
            success = true;
        }
        catch (Exception e) {
            e.printStackTrace();
            TexturesController.log.error("API异常", e);
        }
        retMap.put("code", code);
        retMap.put("success", success);
        retMap.put("data", id);
        return retMap;
    }
    
    @RequestMapping(value = { "/TEXTURES/create/{TABLENAME}" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> createAccessorTable(@PathVariable("TABLENAME") final String tableName, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        boolean success = false;
        int nId = -1;
        try {
            nId = this.texturesService.createTable(tableName);
            success = true;
        }
        catch (Exception ex) {
            ex.printStackTrace();
            TexturesController.log.error("API异常", ex);
        }
        retMap.put("success", success);
        retMap.put("data", nId);
        return retMap;
    }
}
