package com.yunfan.tmcc.ivr.controller;

import com.yunfan.tmcc.ivr.service.BFileTableService;
import com.yunfan.tmcc.ivr.service.ProjectService;
import com.yunfan.tmcc.ivr.util.ObjectAndByte;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
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
public class BFileTableController
{
    private static final Logger log;
    @Autowired
    private BFileTableService bFileTableService;
    @Autowired
    private ProjectService projectService;
    
    static {
        log = Logger.getLogger(TestController.class);
    }
    
    public BFileTableController() {
        super();
    }
    
    @RequestMapping(value = { "/BFileTable/insert/" }, method = { RequestMethod.POST })
    @ResponseBody
    public Map<String, Object> addBFileTable(@RequestParam(value = "OBJECTID", required = true) final String objectId, @RequestParam(value = "CONTENT", required = true) final String content, @RequestParam(value = "TABLENAME", required = true) final String tableName, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        String code = "500";
        boolean success = false;
        int id = -1;
        try {
            final Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("OBJECTID", objectId);
            paramMap.put("CONTENT", content);
            paramMap.put("TABLENAME", tableName);
            id = this.bFileTableService.insertBFile(paramMap);
            code = "200";
            success = true;
        }
        catch (Exception e) {
            e.printStackTrace();
            BFileTableController.log.error("API异常", e);
        }
        retMap.put("code", code);
        retMap.put("success", success);
        retMap.put("data", id);
        return retMap;
    }
    
    @RequestMapping(value = { "/geobinary/add" }, method = { RequestMethod.POST })
    @ResponseBody
    public Map<String, Object> upload(@RequestParam(value = "Prefixion", required = true) final String Prefixion, @RequestParam(value = "GeoKey", required = true) final String GeoKey, final HttpServletRequest request, final HttpServletResponse response) throws Exception {
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
                    paramMap.put("TABLENAME", "BFILETABLE" + Prefixion);
                    paramMap.put("OBJGUID", GeoKey);
                    this.bFileTableService.insertBFile(paramMap);
                }
            }
            success = true;
            code = "200";
            msg = "操作成功";
        }
        catch (Exception e) {
            e.printStackTrace();
            BFileTableController.log.error("API异常", e);
        }
        retMap.put("code", code);
        retMap.put("success", success);
        retMap.put("data", msg);
        return retMap;
    }
    
    @RequestMapping(value = { "/geobinary/query" }, method = { RequestMethod.GET })
    public ResponseEntity<byte[]> geobinaryDown(@RequestParam(value = "Prefixion", required = true) final String Prefixion, @RequestParam(value = "GeoKey", required = true) final String GeoKey, final HttpServletRequest request, final HttpServletResponse response) throws Exception {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        String code = "500";
        boolean success = false;
        String msg = "操作失败";
        try {
            final Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("TABLENAME", "BFILETABLE" + Prefixion);
            paramMap.put("OBJGUID", GeoKey);
            final List<Map<String, Object>> data = this.bFileTableService.selectByObjguid(paramMap);
            if (data == null || data.size() <= 0) {
                retMap.put("code", code);
                retMap.put("success", success);
                retMap.put("data", "未找到数据");
                return null;
            }
            final Map<String, Object> fileMap = data.get(0);
           // final byte[] file = fileMap.get("CONTENT");
            ObjectAndByte oa = new ObjectAndByte();
            final byte[] file = oa.toByteArray(fileMap.get("CONTENT"));

            if (file != null && file.length > 0) {
                final String fileName = new StringBuilder(String.valueOf(System.currentTimeMillis())).toString();
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
            BFileTableController.log.error("获取图形二进制数据", e);
            msg = "操作失败";
        }
        retMap.put("code", code);
        retMap.put("success", success);
        retMap.put("data", msg);
        return null;
    }
}
