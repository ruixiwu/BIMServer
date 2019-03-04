package com.yunfan.tmcc.ivr.dao;

import org.apache.ibatis.annotations.Param;
import java.util.List;
import java.util.Map;

public interface ProTableMapper
{
    List<Map<String, Object>> selectProTableById(final Map<String, Object> p0) throws Exception;
    
    int insertProTable(final Map<String, Object> p0) throws Exception;
    
    int createTable(final String p0) throws Exception;
    
    List<Map<String, Object>> selectProTableByValue(final Map<String, Object> p0) throws Exception;
    
    List<Map<String, Object>> selectByParam(final Map<String, Object> p0) throws Exception;
    
    int insertBatch(@Param("TABLENAME") final String p0, @Param("list") final List<Map<String, Object>> p1) throws Exception;
}
