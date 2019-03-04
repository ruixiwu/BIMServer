package com.yunfan.tmcc.ivr.dao;

import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface AccessorTable
{
    Map<String, Object> selectAccessorById(final Map<String, Object> p0) throws Exception;
    
    int insertAccessorTable(final Map<String, Object> p0) throws Exception;
    
    int createTable(final String p0) throws Exception;
    
    int insertBatch(@Param("TABLENAME") final String p0, @Param("list") final List<Map<String, Object>> p1) throws Exception;
}
