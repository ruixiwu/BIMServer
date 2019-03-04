package com.yunfan.tmcc.ivr.controller;

import com.alibaba.druid.pool.DruidDataSource;
import com.yunfan.tmcc.ivr.dao.*;
import com.yunfan.tmcc.ivr.service.ProjectService;
import com.yunfan.tmcc.ivr.util.FileUtil;
import org.apache.ibatis.session.ExecutorType;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.log4j.Logger;
import org.postgresql.core.BaseConnection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
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
import javax.sql.DataSource;
import java.io.File;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

@Controller
public class CommonController
{
    private static final Logger log;

    @Autowired(required = false)
    private SqlSessionFactory sqlSessionFactory;

    @Autowired(required = false)
    private DruidDataSource dataSource;

    @Autowired(required = false)
    private ProjectService projectService;
    
    static {
        log = Logger.getLogger(CommonController.class);
    }
    
    public CommonController() {
        super();
    }


    @RequestMapping(value = { "/upload" }, method = { RequestMethod.POST })
    @ResponseBody
    public Map<String, Object> uploadFile(@RequestParam(value = "Prefixion", required = true) final String Prefixion,final HttpServletRequest request, final HttpServletResponse response) throws Exception {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        String code = "500";
        boolean success = false;
        String msg = "操作失败";
        int nId = -1;
        int nPrefixion = -1;
        String uploadPath ="";//放在upload的目录下面
        String uploadFile="";
        try {
            nPrefixion = Integer.valueOf(Prefixion.replace("_", ""));
        }
        catch (Exception e) {
            nPrefixion = -1;
            CommonController.log.error("Prefixion参数有误！", e);
        }
        if (nPrefixion <= 0) {
            retMap.put("success", success);
            retMap.put("msg", "Prefixion参数有误！");
            retMap.put("code", nId);
            return retMap;
        }

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
                final MultipartFile mf = multiRequest.getFile((String)iter.next());
                if (mf != null) {
                   // uploadPath = String.valueOf(request.getSession().getServletContext().getRealPath("")) + "upload/"+ mf.getOriginalFilename();
                    uploadPath=FileUtil.getRealFilePath(request.getSession().getServletContext().getRealPath("upload/"));//将路径字符适配到不同的操作系统
                    uploadFile=FileUtil.getRealFilePath(uploadPath+nPrefixion+".zip");//将路径字符适配到不同的操作系统
                    File file = new File(uploadFile);
                    if(!file.exists())
                    {
                        try{
                            file.createNewFile();
                        }catch(Exception e){
                            e.printStackTrace();
                        }
                    }
                    //上传文件
                    mf.transferTo(file);

                    //将表中的字段进行更新
                    final Map<String, Object> projectMap = new HashMap<String ,Object>();
                    projectMap.put("TABLENAME", "PROJECT");
                    projectMap.put("PREFIXION", nPrefixion);
                    projectMap.put("ZIPPATH", uploadPath);
                    this.projectService.UpdateByPrefixion(projectMap);
                }
            }
            success = true;
            code = "200";
            msg = "操作成功";
        }
        catch (Exception e) {
            e.printStackTrace();
        }

        retMap.put("code", code);
        retMap.put("success", success);
        retMap.put("data", msg);
        return retMap;
    }

    //将客户端的*.db数据库文件插入到服务器的表中来
    @RequestMapping(value = { "/insertBatch" }, method = { RequestMethod.POST })
    @ResponseBody
    public Map<String, Object> insertBatch(@RequestParam(value = "Prefixion", required = true) final String Prefixion, final HttpServletRequest request) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        boolean success = false;
        int nId = -1;
        int nPrefixion = -1;
        try {
            nPrefixion = Integer.valueOf(Prefixion.replace("_", ""));
        }
        catch (Exception e) {
            nPrefixion = -1;
            CommonController.log.error("Prefixion参数有误！", e);
        }
        if (nPrefixion <= 0) {
            retMap.put("success", success);
            retMap.put("msg", "Prefixion参数有误！");
            retMap.put("code", nId);
            return retMap;
        }
        final String path = String.valueOf(request.getSession().getServletContext().getRealPath("")) + "upload/";
        final long beginTime = System.currentTimeMillis();//启始时间
        final String dbFilePath = String.valueOf(path) + "database_" + beginTime + ".db";

        File fileDir =new File(path);
        //如果文件夹不存在则创建
        if  (!fileDir .exists()  && !fileDir .isDirectory())
        {
            System.out.println("//不存在");
            fileDir .mkdir();
        } else
        {
            System.out.println("//目录存在");
        }
        SqlSession session = null;
        Connection conn = null;//连接
        BaseConnection baseConn = null;//底层连接
        PreparedStatement prest = null;
        String msg = "操作失败";

        //开始导入数据
        Label_5188: {
            try {
                final CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(request.getServletContext());
                if (!multipartResolver.isMultipart(request)) {
                    msg = "请上传文件";
                    retMap.put("success", success);
                    retMap.put("msg", msg);
                    retMap.put("code",-1);
                    return retMap;
                }
                final MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest)request;
                final Iterator<String> iter = multiRequest.getFileNames();
                while (iter.hasNext()) {
                    final MultipartFile file = multiRequest.getFile(iter.next());//这里只有一个文件
                    if (file != null) {
                        File localFile = new File(dbFilePath);
                        if(!localFile.exists())
                        {
                            try{
                            localFile.createNewFile();
                            }catch(Exception e){
                            e.printStackTrace();
                            }
                        }
                        file.transferTo(localFile);
                    }
                }
                String thisPath = dbFilePath;
                final String str1 = thisPath.substring(0, 1).toLowerCase();
                final String str2 = thisPath.substring(1, thisPath.length());
                thisPath = String.valueOf(str1) + str2;
                final String sqliteUrl = "jdbc:sqlite://" + thisPath.replace('\\', '/');
                final DriverManagerDataSource dataSource2 = new DriverManagerDataSource();
                dataSource2.setDriverClassName("org.sqlite.JDBC");
                dataSource2.setUrl(sqliteUrl);
                final JdbcTemplate jdbcTemplate = new JdbcTemplate((DataSource)dataSource2);

                ////////向"AFFIXFILE_", "AFFIXTABLE_", "TEXTURES_", "TEXIMG_", "TILESETTABLE_", "BFILETABLE_", "MATERIALTABLE_", "FAMILYTABLE_", "COORDINATE_SYSTEM"表中插入同步数据
                int page = 0;
                int pageSize = 100;
                List<Map<String, Object>> list = null;
                session = this.sqlSessionFactory.openSession(ExecutorType.BATCH, false);
                final String[] tableNames = { "AFFIXFILE_", "AFFIXTABLE_", "TEXTURES_", "TEXIMG_", "TILESETTABLE_", "BFILETABLE_", "MATERIALTABLE_", "FAMILYTABLE_", "COORDINATE_SYSTEM" };
                final String sqlStr = "SELECT * FROM PROJECT where PREFIXION=" + nPrefixion;
                list = jdbcTemplate.queryForList(sqlStr);
                final Map<String, Object> projectMap = list.get(0);
                projectMap.put("TABLENAME", "PROJECT");
                this.projectService.UpdateByPrefixion(projectMap);
                for (int i = 0; i < tableNames.length; ++i) {
                    String tableName = tableNames[i];
                    page = 0;
                    final StringBuffer sqlbuBuffer = new StringBuffer("SELECT * FROM ");
                    if (!"PROJECT".equals(tableName) && !"COORDINATE_SYSTEM".equals(tableName)) {
                        tableName = String.valueOf(tableName) + nPrefixion;
                    }
                    sqlbuBuffer.append(tableName);
                    sqlbuBuffer.append(" order by objectid limit " + pageSize + " offset {0}");
                    final String commonSql = sqlbuBuffer.toString();
                    do {
                        final String sql = commonSql.replace("{0}", String.valueOf(page * pageSize));
                        list = jdbcTemplate.queryForList(sql);
                        if (list != null) {
                            if (list.size() == 0) {
                                continue;
                            }
                            switch (i) {
                                case 0:
                                    ((AffixFileMapper)session.getMapper(AffixFileMapper.class)).insertBatch(tableName, list);
                                    break;
                                case 1:
                                    ((AffixTableMapper)session.getMapper(AffixTableMapper.class)).insertBatch(tableName, list);
                                    break;
                                case 2:
                                    ((TexturesMapper)session.getMapper(TexturesMapper.class)).insertBatch(tableName, list);
                                    break;
                                case 3:
                                    ((TexImgMapper)session.getMapper(TexImgMapper.class)).insertBatch(tableName, list);
                                    break;
                                case 4:
                                    ((TileSetTableMapper)session.getMapper(TileSetTableMapper.class)).insertBatch(tableName, list);
                                    break;
                                case 5:
                                    ((BFileTableMapper)session.getMapper(BFileTableMapper.class)).insertBatch(tableName, list);
                                    break;
                                case 6:
                                    ((MaterialTableMapper)session.getMapper(MaterialTableMapper.class)).insertBatch(tableName, list);
                                    break;
                                case 7:
                                    ((FamilyTableMapper)session.getMapper(FamilyTableMapper.class)).insertBatch(tableName, list);
                                    break;
                                case 8:
                                    ((Coordinate_SystemMapper)session.getMapper(Coordinate_SystemMapper.class)).insertBatch(tableName, list);
                                    break;
                            }
                            session.commit();
                            session.clearCache();
                            ++page;
                        }
                    } while (list != null && list.size() >= pageSize);
                }
                session = this.sqlSessionFactory.openSession();

                //向PROTABLE_xx表中插入同步数据
                page = 0;
                pageSize = 200000;
                conn = (Connection)this.dataSource.getConnection();
                baseConn = (BaseConnection)conn.getMetaData().getConnection();
                baseConn.setAutoCommit(false);
                String commonSql2 = "SELECT * FROM PROTABLE_" + nPrefixion + " order by objectid limit " + pageSize + " offset {0}";
                String sqlInsert = "insert into PROTABLE_" + nPrefixion + " (SECTION, NAME,VALUE, UNIT, TYPE,GEOID) VALUES(?,?,?,?,?,?)";
                do {
                    final String sql2 = commonSql2.replace("{0}", String.valueOf(page * pageSize));
                    list = jdbcTemplate.queryForList(sql2);
                    System.out.println(list.size());
                    if (list == null || list.size() == 0) {
                        break;
                    }
                    try {
                        prest = conn.prepareStatement(sqlInsert);
                        int num = 0;
                        for (final Map<String, Object> map : list) {
                            prest.setString(1, String.valueOf(map.get("SECTION")));
                            prest.setString(2, String.valueOf(map.get("NAME")));
                            prest.setString(3, String.valueOf(map.get("VALUE")));
                            prest.setString(4, String.valueOf(map.get("UNIT")));
                            prest.setInt(5, (map.get("TYPE") == null) ? null : Integer.valueOf(map.get("TYPE").toString()));
                            prest.setInt(6, (map.get("GEOID") == null) ? null : Integer.valueOf(map.get("GEOID").toString()));
                            prest.addBatch();
                            if (num >= 50000) {
                                prest.executeBatch();
                                conn.commit();
                                num = 0;
                            }
                        }
                        prest.executeBatch();
                        baseConn.commit();
                    }
                    catch (SQLException ex) {
                        ex.printStackTrace();
                        throw ex;
                    }
                    finally {
                        if (prest != null) {
                            try {
                                prest.close();
                            }
                            catch (SQLException e2) {
                                e2.printStackTrace();
                                CommonController.log.error("API异常", e2);
                            }
                        }
                    }
                    ++page;
                } while (list != null && list.size() >= pageSize);

                //向ACCESSORTABLE__xx表中插入同步数据
                page = 0;
                pageSize = 200000;
                commonSql2 = "SELECT * FROM ACCESSORTABLE_" + nPrefixion + " order by objectid limit " + pageSize + " offset {0}";
                sqlInsert = "insert into ACCESSORTABLE_" + nPrefixion + " (TYPE, BYTEOFFSET, BYTESTRIDE,COMPONENTTYPE,NCOUNT,BFILEID) VALUES(?,?,?,?,?,?)";
                do {
                    final String sql2 = commonSql2.replace("{0}", String.valueOf(page * pageSize));
                    list = jdbcTemplate.queryForList(sql2);
                    System.out.println(list.size());
                    if (list == null || list.size() == 0) {
                        break;
                    }
                    try {
                        prest = conn.prepareStatement(sqlInsert);
                        int num = 0;
                        for (final Map<String, Object> map : list) {
                            prest.setString(1, String.valueOf(map.get("TYPE")));
                            prest.setInt(2, (map.get("BYTEOFFSET") == null) ? null : Integer.valueOf(map.get("BYTEOFFSET").toString()));
                            prest.setInt(3, (map.get("BYTESTRIDE") == null) ? null : Integer.valueOf(map.get("BYTESTRIDE").toString()));
                            prest.setInt(4, (map.get("COMPONENTTYPE") == null) ? null : Integer.valueOf(map.get("COMPONENTTYPE").toString()));
                            prest.setInt(5, (map.get("NCOUNT") == null) ? null : Integer.valueOf(map.get("NCOUNT").toString()));
                            prest.setString(6, String.valueOf(map.get("BFILEID")));
                            prest.addBatch();
                            if (num >= 50000) {
                                prest.executeBatch();
                                conn.commit();
                                num = 0;
                            }
                        }
                        prest.executeBatch();
                        baseConn.commit();
                    }
                    catch (SQLException ex) {
                        ex.printStackTrace();
                        throw ex;
                    }
                    finally {
                        if (prest != null) {
                            try {
                                prest.close();
                            }
                            catch (SQLException e2) {
                                e2.printStackTrace();
                                CommonController.log.error("API异常", e2);
                            }
                        }
                    }
                    ++page;
                } while (list != null && list.size() >= pageSize);

                //向FMYITEMTABLE_xx表中插入同步数据
                page = 0;
                pageSize = 200000;
                commonSql2 = "SELECT * FROM FMYITEMTABLE_" + nPrefixion + " order by objectid limit " + pageSize + " offset {0}";
                sqlInsert = "insert into FMYITEMTABLE_" + nPrefixion + " (SECTION, NAME,VALUE, UNIT, TYPE,FAMILYID) VALUES(?,?,?,?,?,?)";
                do {
                    final String sql2 = commonSql2.replace("{0}", String.valueOf(page * pageSize));
                    list = jdbcTemplate.queryForList(sql2);
                    System.out.println(list.size());
                    if (list == null || list.size() == 0) {
                        break;
                    }
                    try {
                        prest = conn.prepareStatement(sqlInsert);
                        int num = 0;
                        for (final Map<String, Object> map : list) {
                            prest.setString(1, String.valueOf(map.get("SECTION")));
                            prest.setString(2, String.valueOf(map.get("NAME")));
                            prest.setString(3, String.valueOf(map.get("VALUE")));
                            prest.setString(4, String.valueOf(map.get("UNIT")));
                            prest.setInt(5, (map.get("TYPE") == null) ? null : Integer.valueOf(map.get("TYPE").toString()));
                            prest.setInt(6, (map.get("FAMILYID") == null) ? null : Integer.valueOf(map.get("FAMILYID").toString()));
                            prest.addBatch();
                            if (num >= 50000) {
                                prest.executeBatch();
                                conn.commit();
                                num = 0;
                            }
                        }
                        prest.executeBatch();
                        baseConn.commit();
                    }
                    catch (SQLException ex) {
                        ex.printStackTrace();
                        throw ex;
                    }
                    finally {
                        if (prest != null) {
                            try {
                                prest.close();
                            }
                            catch (SQLException e2) {
                                e2.printStackTrace();
                                CommonController.log.error("API异常", e2);
                            }
                        }
                    }
                    ++page;
                } while (list != null && list.size() >= pageSize);

                //向GEOBLOCK__xx表中插入同步数据
                page = 0;
                pageSize = 200000;
                commonSql2 = "SELECT * FROM GEOBLOCK_" + nPrefixion + " order by objectid limit " + pageSize + " offset {0}";
                sqlInsert = "insert into GEOBLOCK_" + nPrefixion + " (NAME, DESCRIBE,MESHIDS) VALUES(?,?,?)";
                do {
                    final String sql2 = commonSql2.replace("{0}", String.valueOf(page * pageSize));
                    list = jdbcTemplate.queryForList(sql2);
                    System.out.println(list.size());
                    if (list == null || list.size() == 0) {
                        break;
                    }
                    try {
                        prest = conn.prepareStatement(sqlInsert);
                        int num = 0;
                        for (final Map<String, Object> map : list) {
                            prest.setString(1, String.valueOf(map.get("NAME")));
                            prest.setString(2, String.valueOf(map.get("DESCRIBE")));
                            prest.setString(3, String.valueOf(map.get("MESHIDS")));
                            prest.addBatch();
                            if (num >= 50000) {
                                prest.executeBatch();
                                conn.commit();
                                num = 0;
                            }
                        }
                        prest.executeBatch();
                        baseConn.commit();
                    }
                    catch (SQLException ex) {
                        ex.printStackTrace();
                        throw ex;
                    }
                    finally {
                        if (prest != null) {
                            try {
                                prest.close();
                            }
                            catch (SQLException e2) {
                                e2.printStackTrace();
                                CommonController.log.error("API异常", e2);
                            }
                        }
                    }
                    ++page;
                } while (list != null && list.size() >= pageSize);

                //向GEOTABLE___xx表中插入同步数据
                page = 0;
                pageSize = 200000;
                commonSql2 = "SELECT * FROM GEOTABLE_" + nPrefixion + " order by objectid limit " + pageSize + " offset {0}";
                sqlInsert = "insert into GEOTABLE_" + nPrefixion + " (NAME, TILESETID, MATRIX, MESHIDS, BLOCKID, BOX, FAMILYID) VALUES(?,?,?,?,?,?,?)";
                do {
                    final String sql2 = commonSql2.replace("{0}", String.valueOf(page * pageSize));
                    list = jdbcTemplate.queryForList(sql2);
                    System.out.println(list.size());
                    if (list == null || list.size() == 0) {
                        break;
                    }
                    try {
                        prest = conn.prepareStatement(sqlInsert);
                        int num = 0;
                        for (final Map<String, Object> map : list) {
                            prest.setString(1, String.valueOf(map.get("NAME")));
                            prest.setInt(2, (map.get("TILESETID") == null) ? null : Integer.valueOf(map.get("TILESETID").toString()));
                            prest.setString(3, String.valueOf(map.get("MATRIX")));
                            prest.setString(4, String.valueOf(map.get("MESHIDS")));
                            prest.setInt(5, (map.get("BLOCKID") == null) ? null : Integer.valueOf(map.get("BLOCKID").toString()));
                            prest.setString(6, String.valueOf(map.get("BOX")));
                            prest.setInt(7, (map.get("FAMILYID") == null) ? null : Integer.valueOf(map.get("FAMILYID").toString()));
                            prest.addBatch();
                            if (num >= 50000) {
                                prest.executeBatch();
                                conn.commit();
                                num = 0;
                            }
                        }
                        prest.executeBatch();
                        baseConn.commit();
                    }
                    catch (SQLException ex) {
                        ex.printStackTrace();
                        throw ex;
                    }
                    finally {
                        if (prest != null) {
                            try {
                                prest.close();
                            }
                            catch (SQLException e2) {
                                e2.printStackTrace();
                                CommonController.log.error("API异常", e2);
                            }
                        }
                    }
                    ++page;
                } while (list != null && list.size() >= pageSize);

                //向MESHTABLE__xx表中插入同步数据
                page = 0;
                pageSize = 200000;
                commonSql2 = "SELECT * FROM MESHTABLE_" + nPrefixion + " order by objectid limit " + pageSize + " offset {0}";
                sqlInsert = "insert into MESHTABLE_" + nPrefixion + " (NAME, MATERIALID, ACCESSOR_POSTION,ACCESSOR_INDEX,ACCESSOR_NORMAL,ACCESSOR_TEXCOORD_0,ACCESSOR_TEXCOORD_1,ACCESSOR_TEXCOORD_2,ACCESSOR_TEXCOORD_3,ACCESSOR_TEXCOORD_4,ACCESSOR_TEXCOORD_5,ACCESSOR_TEXCOORD_6,ACCESSOR_TEXCOORD_7) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)";
                do {
                    final String sql2 = commonSql2.replace("{0}", String.valueOf(page * pageSize));
                    list = jdbcTemplate.queryForList(sql2);
                    System.out.println(list.size());
                    if (list == null || list.size() == 0) {
                        break;
                    }
                    try {
                        prest = conn.prepareStatement(sqlInsert);
                        int num = 0;
                        for (final Map<String, Object> map : list) {
                            prest.setString(1, String.valueOf(map.get("NAME")));
                            prest.setInt(2, (map.get("MATERIALID") == null) ? null : Integer.valueOf(map.get("MATERIALID").toString()));
                            prest.setInt(3, (map.get("ACCESSOR_POSTION") == null) ? null : Integer.valueOf(map.get("ACCESSOR_POSTION").toString()));
                            prest.setInt(4, (map.get("ACCESSOR_INDEX") == null) ? null : Integer.valueOf(map.get("ACCESSOR_INDEX").toString()));
                            prest.setInt(5, (map.get("ACCESSOR_NORMAL") == null) ? null : Integer.valueOf(map.get("ACCESSOR_NORMAL").toString()));
                            prest.setInt(6, (map.get("ACCESSOR_TEXCOORD_0") == null) ? null : Integer.valueOf(map.get("ACCESSOR_TEXCOORD_0").toString()));
                            if (map.get("ACCESSOR_TEXCOORD_1") == null) {
                                prest.setNull(7, 4);
                            }
                            else {
                                prest.setInt(7, Integer.valueOf(map.get("ACCESSOR_TEXCOORD_1").toString()));
                            }
                            if (map.get("ACCESSOR_TEXCOORD_2") == null) {
                                prest.setNull(8, 4);
                            }
                            else {
                                prest.setInt(8, Integer.valueOf(map.get("ACCESSOR_TEXCOORD_2").toString()));
                            }
                            if (map.get("ACCESSOR_TEXCOORD_3") == null) {
                                prest.setNull(9, 4);
                            }
                            else {
                                prest.setInt(9, Integer.valueOf(map.get("ACCESSOR_TEXCOORD_3").toString()));
                            }
                            if (map.get("ACCESSOR_TEXCOORD_4") == null) {
                                prest.setNull(10, 4);
                            }
                            else {
                                prest.setInt(10, Integer.valueOf(map.get("ACCESSOR_TEXCOORD_4").toString()));
                            }
                            if (map.get("ACCESSOR_TEXCOORD_5") == null) {
                                prest.setNull(11, 4);
                            }
                            else {
                                prest.setInt(11, Integer.valueOf(map.get("ACCESSOR_TEXCOORD_5").toString()));
                            }
                            if (map.get("ACCESSOR_TEXCOORD_6") == null) {
                                prest.setNull(12, 4);
                            }
                            else {
                                prest.setInt(12, Integer.valueOf(map.get("ACCESSOR_TEXCOORD_6").toString()));
                            }
                            if (map.get("ACCESSOR_TEXCOORD_7") == null) {
                                prest.setNull(13, 4);
                            }
                            else {
                                prest.setInt(13, Integer.valueOf(map.get("ACCESSOR_TEXCOORD_7").toString()));
                            }
                            prest.addBatch();
                            if (num >= 50000) {
                                prest.executeBatch();
                                conn.commit();
                                num = 0;
                            }
                        }
                        prest.executeBatch();
                        baseConn.commit();
                    }
                    catch (SQLException ex) {
                        ex.printStackTrace();
                        throw ex;
                    }
                    finally {
                        if (prest != null) {
                            try {
                                prest.close();
                            }
                            catch (SQLException e2) {
                                e2.printStackTrace();
                                CommonController.log.error("API异常", e2);
                            }
                        }
                    }
                    ++page;
                } while (list != null && list.size() >= pageSize);

                final long endTime = System.currentTimeMillis();
                System.out.println(String.valueOf(nPrefixion) + "插入完成，耗时 " + (endTime - beginTime) + " 毫秒！");
                success = true;
            }
            catch (Exception ex2) {
                ex2.printStackTrace();
                CommonController.log.error("导入数据异常", ex2);
                break Label_5188;
            }
            finally {
                try {
                    if (baseConn != null && !baseConn.isClosed()) { baseConn.close(); }
                    if (conn != null && !conn.isClosed()) { conn.close();}
                    if (session != null) { session.close(); }
                }
                catch (SQLException e3) {
                    e3.printStackTrace();
                }
            }
        }
        nId=0;
        retMap.put("success", success);
        retMap.put("msg", "数据上传同步到服务器端成功");
        retMap.put("code", nId);
        return retMap;
    }
}
