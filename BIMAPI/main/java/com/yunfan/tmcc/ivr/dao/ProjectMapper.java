package com.yunfan.tmcc.ivr.dao;

import org.apache.ibatis.annotations.Param;
import java.util.List;
import java.util.Map;

public interface ProjectMapper
{
    Map<String, Object> selectProjectById(final Map<String, Object> p0) throws Exception;
    
    int insertProject(final Map<String, Object> p0) throws Exception;
    
    int createTable(final String p0) throws Exception;
    
    int UpdateByPrefixion(final Map<String, Object> p0) throws Exception;
    
    int insertSequenceTable() throws Exception;
    
    int initTables(final int p0) throws Exception;
    
    int initCommonTables() throws Exception;
    
    List<Map<String, Object>> query(final Map<String, Object> p0) throws Exception;
    
    List<Map<String, Object>> queryWithAFFIXTABLE(final Map<String, Object> p0) throws Exception;
    
    Integer selectMaxPrefixion() throws Exception;
    
    String getPrefixionByProjectId(final Integer p0) throws Exception;
    
    int insertBatch(@Param("TABLENAME") final String p0, @Param("list") final List<Map<String, Object>> p1) throws Exception;
}
