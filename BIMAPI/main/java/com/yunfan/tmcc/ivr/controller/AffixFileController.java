package com.yunfan.tmcc.ivr.controller;

import com.yunfan.tmcc.ivr.service.AffixFileService;
import com.yunfan.tmcc.ivr.service.ProjectService;
import com.yunfan.tmcc.ivr.util.Constant;
import com.yunfan.tmcc.ivr.util.FileUtil;
import com.yunfan.tmcc.ivr.util.ZipUtil;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

@Controller
public class AffixFileController
{
    private static final Logger log;
    @Autowired
    private AffixFileService affixFileService;
    @Autowired
    private ProjectService projectService;
    
    static {
        log = Logger.getLogger(AffixFileController.class);
    }
    
    public AffixFileController() {
        super();
    }
    //从affixFileService中进行插入压缩文件的操作
    @RequestMapping(value = { "/projectaffix/add" }, method = { RequestMethod.POST })
    @ResponseBody
    public Map<String, Object> upload(@RequestParam(value = "Prefixion", required = true) final String Prefixion, @RequestParam(value = "AffixKey", required = true) final String AffixKey, final HttpServletRequest request, final HttpServletResponse response) throws Exception {
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
                    paramMap.put("TABLENAME", "AFFIXFILE" + Prefixion);
                    paramMap.put("OBJGUID", AffixKey);
                    this.affixFileService.insertAffixFile(paramMap);
                }
            }
            success = true;
            code = "200";
            msg = "操作成功";
        }
        catch (Exception e) {
            e.printStackTrace();
            AffixFileController.log.error("添加项目附件", e);
        }
        retMap.put("code", code);
        retMap.put("success", success);
        retMap.put("data", msg);
        return retMap;
    }
//    //从AffixFileService服务与AFFIXFILE_xxxx表中解压出svfzip文件， 解压名称是prefixion，这其实是唯一的
//    @RequestMapping(value = { "/projectaffix/query" }, method = { RequestMethod.GET })
//    @ResponseBody
//    public Map<String, Object> unZip(@RequestParam(value = "nProjectId", required = true) final int nProjectId, final HttpServletRequest request, final HttpServletResponse response) throws Exception {
//        final Map<String, Object> retMap = new HashMap<String, Object>();
//        response.setHeader("Access-Control-Allow-Origin", "*");
//        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
//        response.setHeader("Access-Control-Max-Age", "3600");
//        response.setHeader("Access-Control-Allow-Headers", "x-requested-with,Authorization");
//        response.setHeader("Access-Control-Allow-Credentials", "true");
//        String code = "500";
//        boolean success = false;
//        String msg = "操作失败";
//        if (nProjectId <= 0) {
//            retMap.put("code", code);
//            retMap.put("success", success);
//            retMap.put("data", "nProjectId参数有误！");
//            return retMap;
//        }
//        try {
//            Integer prefixion = null;
//            String zipKey = null;
//            Map<String, Object> paramMap = new HashMap<String, Object>();
//            paramMap.put("TABLENAME", "PROJECT");
//            paramMap.put("OBJECTID", nProjectId);
//            final Map<String, Object> projectMap = this.projectService.selectProjectById(paramMap);
//            if (projectMap == null) {
//                retMap.put("code", code);
//                retMap.put("success", success);
//                retMap.put("data", "项目不存在");
//                return retMap;
//            }
//            prefixion = Integer.parseInt(projectMap.get("PREFIXION").toString());
//            zipKey = projectMap.get("ZIPKEY").toString();
//            if (prefixion == null || StringUtils.isBlank(zipKey)) {
//                retMap.put("code", code);
//                retMap.put("success", success);
//                retMap.put("data", "项目有误");
//                return retMap;
//            }
//
//            //这里的路径在linux和windows上可能不一样，linux的路径结尾可能不带/
//            String uploadPath = String.valueOf(request.getSession().getServletContext().getRealPath("")) + "upload/";
//            uploadPath=FileUtil.getRealFilePath(uploadPath);//将路径字符适配到不同的操作系统
//
//            String unzipPath = String.valueOf(request.getSession().getServletContext().getRealPath("")) + "unzip/";
//            unzipPath=FileUtil.getRealFilePath(unzipPath);//将路径字符适配到不同的操作系统
//
//            final String basePath = Constant.BIMAPIURL;
//            final String fileName = new StringBuilder().append(prefixion).toString();
//            final File svfFile = new File(String.valueOf(unzipPath) + fileName + "/3d.svf");
//            if (svfFile != null && svfFile.exists()) {
//                msg = String.valueOf(basePath) + "/unzip/" + fileName + "/3d.svf";
//            }
//            else {
//                paramMap = new HashMap<String, Object>();
//                paramMap.put("TABLENAME", "AFFIXFILE_" + prefixion);
//                paramMap.put("OBJGUID", zipKey);
//                final List<Map<String, Object>> data = this.affixFileService.selectByObjguid(paramMap);
//                if (data == null || data.size() <= 0) {
//                    retMap.put("code", code);
//                    retMap.put("success", success);
//                    retMap.put("data", "未找到数据");
//                    return retMap;
//                }
//                final Map<String, Object> fileMap = data.get(0);
//                //final byte[] file4 = fileMap.get("CONTENT");
//                ObjectAndByte oa = new ObjectAndByte();
//                final byte[] zipFileData = oa.toByteArray(fileMap.get("CONTENT"));
//
//                if (zipFileData != null && zipFileData.length > 0) {
//                    FileUtil.getFile(zipFileData, uploadPath, String.valueOf(fileName) + ".zip");
//                    ZipUtil.upzipFile(String.valueOf(uploadPath) + fileName + ".zip", String.valueOf(unzipPath) + fileName);
//                    msg = String.valueOf(basePath) + "/unzip/" + fileName + "/3d.svf";
//                    final File zipFile = new File(String.valueOf(uploadPath) + fileName + ".zip");
//                    if (zipFile != null && zipFile.exists()) {
//                        zipFile.delete();
//                    }
//                }
//            }
//            success = true;
//            code = "200";
//        }
//        catch (Exception e) {
//            e.printStackTrace();
//            AffixFileController.log.error("获取项目附件", e);
//            msg = "操作失败";
//        }
//        retMap.put("code", code);
//        retMap.put("success", success);
//        retMap.put("data", msg);
//        return retMap;
//    }

    //从project　表中检索解压出svfzip文件， 解压名称是prefixion，这其实是唯一的
    @RequestMapping(value = { "/projectaffix/query" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> unZip(@RequestParam(value = "nProjectId", required = true) final int nProjectId, final HttpServletRequest request, final HttpServletResponse response) throws Exception {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "x-requested-with,Authorization");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        String code = "500";
        boolean success = false;
        String msg = "操作失败";
        if (nProjectId <= 0) {
            retMap.put("code", code);
            retMap.put("success", success);
            retMap.put("data", "nProjectId参数有误！");
            return retMap;
        }
        try {
            Integer prefixion = null;
            String zipPath= null;
            Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("TABLENAME", "PROJECT");
            paramMap.put("OBJECTID", nProjectId);
            final Map<String, Object> projectMap = this.projectService.selectProjectById(paramMap);
            if (projectMap == null) {
                retMap.put("code", code);
                retMap.put("success", success);
                retMap.put("data", "项目不存在");
                return retMap;
            }
            prefixion = Integer.parseInt(projectMap.get("PREFIXION").toString());
            zipPath =projectMap.get("ZIPPATH").toString();
            if (prefixion == null || StringUtils.isBlank(zipPath)) {
                retMap.put("code", code);
                retMap.put("success", success);
                retMap.put("data", "项目有误");
                return retMap;
            }

            //这里的路径在linux和windows上可能不一样，linux的路径结尾可能不带/
            String unzipPath=FileUtil.getRealFilePath(request.getSession().getServletContext().getRealPath("unzip/"));//将路径字符适配到不同的操作系统
            final String basePath = Constant.BIMAPIURL;
            final String fileName = new StringBuilder().append(prefixion).toString();
            final File svfFile = new File(String.valueOf(unzipPath) + fileName + "/3d.svf");
            if (svfFile != null && svfFile.exists()) {//如果文件已经存在就不用解压了
                msg = String.valueOf(basePath) + "/unzip/" + fileName + "/3d.svf";
            }
            else {
                ZipUtil.upzipFile(zipPath + fileName + ".zip", String.valueOf(unzipPath) + fileName);
                msg = String.valueOf(basePath) + "/unzip/" + fileName + "/3d.svf";
            }
            success = true;
            code = "200";
        }
        catch (Exception e) {
            e.printStackTrace();
            AffixFileController.log.error("获取项目附件", e);
            msg = "操作失败";
        }
        retMap.put("code", code);
        retMap.put("success", success);
        retMap.put("data", msg);
        return retMap;
    }
}
