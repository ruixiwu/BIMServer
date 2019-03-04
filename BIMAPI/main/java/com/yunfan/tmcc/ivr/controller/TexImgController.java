package com.yunfan.tmcc.ivr.controller;

import com.yunfan.tmcc.ivr.service.ProjectService;
import com.yunfan.tmcc.ivr.service.TexImgService;
import com.yunfan.tmcc.ivr.util.ObjectAndByte;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

@Controller
public class TexImgController
{
    private static final Logger log;
    @Autowired
    private TexImgService texImgService;
    @Autowired
    private ProjectService projectService;
    
    static {
        log = Logger.getLogger(TexImgController.class);
    }
    
    public TexImgController() {
        super();
    }
    
    @RequestMapping(value = { "/TEXIMG/get/{TABLENAME}/{OBJECTID}" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> queryUser(@PathVariable("OBJECTID") final Long objectId, @PathVariable("TABLENAME") final String tableName, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        String code = "500";
        boolean success = false;
        List<Map<String, Object>> userList = null;
        try {
            final Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("TABLENAME", tableName);
            paramMap.put("OBJECTID", objectId);
            userList = this.texImgService.selectTexImgById(paramMap);
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
    
    @RequestMapping(value = { "/TEXIMG/insert/" }, method = { RequestMethod.POST })
    @ResponseBody
    public Map<String, Object> addUser(@RequestParam(value = "OBJECTID", required = true) final Long objectId, @RequestParam(value = "CONTENT", required = true) final String content, @RequestParam(value = "TABLENAME", required = true) final String tableName, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        String code = "500";
        boolean success = false;
        int id = -1;
        try {
            final Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("OBJECTID", objectId);
            paramMap.put("CONTENT", content);
            paramMap.put("TABLENAME", tableName);
            id = this.texImgService.insertTexImg(paramMap);
            code = "200";
            success = true;
        }
        catch (Exception e) {
            e.printStackTrace();
            TexImgController.log.error("API异常", e);
        }
        retMap.put("code", code);
        retMap.put("success", success);
        retMap.put("data", id);
        return retMap;
    }
    
    @RequestMapping(value = { "/teximg/add" }, method = { RequestMethod.POST })
    @ResponseBody
    public Map<String, Object> upload(@RequestParam(value = "Prefixion", required = true) final String Prefixion, @RequestParam(value = "ImgKey", required = true) final String ImgKey, final HttpServletRequest request, final HttpServletResponse response) throws Exception {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        String code = "500";
        boolean success = false;
        String msg = "操作失败";
        try {
            final CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(request.getServletContext());
            if (!multipartResolver.isMultipart(request)) {
                msg = "请上传文件";
                retMap.put("code", code);
                retMap.put("success", success);
                retMap.put("data", msg);
                return retMap;
            }
            final MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest)request;
            final Iterator<String> iter = (Iterator<String>)multiRequest.getFileNames();
            while (iter.hasNext()) {
                final MultipartFile file = multiRequest.getFile((String)iter.next());
                if (file != null) {
                    final Map<String, Object> paramMap = new HashMap<String, Object>();
                    paramMap.put("CONTENT", file.getBytes());
                    paramMap.put("TABLENAME", "TEXIMG" + Prefixion);
                    paramMap.put("OBJGUID", ImgKey);
                    this.texImgService.insertTexImg(paramMap);
                }
            }
            success = true;
            code = "200";
            msg = "操作成功";
        }
        catch (Exception e) {
            e.printStackTrace();
            TexImgController.log.error("API异常", e);
        }
        retMap.put("code", code);
        retMap.put("success", success);
        retMap.put("data", msg);
        return retMap;
    }
    
    @RequestMapping(value = { "/teximg/query" }, method = { RequestMethod.GET })
    public ResponseEntity<byte[]> unZip(@RequestParam(value = "Prefixion", required = true) final String Prefixion, @RequestParam(value = "GeoKey", required = true) final String GeoKey, final HttpServletRequest request, final HttpServletResponse response) throws Exception {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        String code = "500";
        boolean success = false;
        String msg = "操作失败";
        try {
            final Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("TABLENAME", "TEXIMG" + Prefixion);
            paramMap.put("OBJGUID", GeoKey);
            final List<Map<String, Object>> data = this.texImgService.selectByObjguid(paramMap);
            if (data == null || data.size() <= 0) {
                retMap.put("code", code);
                retMap.put("success", success);
                retMap.put("data", "未找到数据");
                return null;
            }
            final String fileName = new StringBuilder(String.valueOf(System.currentTimeMillis())).toString();
            final Map<String, Object> fileMap = data.get(0);

           // final byte[] file = fileMap.get("CONTENT");
            ObjectAndByte oa = new ObjectAndByte();
            final byte[] file= oa.toByteArray(fileMap.get("CONTENT"));
            if (file != null && file.length > 0) {
                final HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
                headers.setContentDispositionFormData("attachment", fileName);
                return (ResponseEntity<byte[]>)new ResponseEntity(file, (MultiValueMap)headers, HttpStatus.CREATED);
            }
            success = true;
            code = "200";
        }
        catch (Exception e) {
            e.printStackTrace();
            TexImgController.log.error("API异常", e);
            msg = "操作失败";
        }
        retMap.put("code", code);
        retMap.put("success", success);
        retMap.put("data", msg);
        return null;
    }
}
