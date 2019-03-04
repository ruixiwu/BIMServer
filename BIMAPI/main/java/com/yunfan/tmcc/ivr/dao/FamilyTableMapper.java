package com.yunfan.tmcc.ivr.dao;

import org.apache.ibatis.annotations.Param;
import java.util.List;
import java.util.Map;

public interface FamilyTableMapper
{
    List<Map<String, Object>> selectFamilyById(final Map<String, Object> p0) throws Exception;
    
    List<Map<String, Object>> selectFamilyByParentId(final Map<String, Object> p0) throws Exception;
    
    Map<String, Object> selectParentFamilyById(final Map<String, Object> p0) throws Exception;
    
    Map<String, Object> selectFamilyByIdAndPname(final Map<String, Object> p0) throws Exception;
    
    List<Map<String, Object>> selectFamilyByName(final Map<String, Object> p0) throws Exception;
    
    int insertFamily(final Map<String, Object> p0) throws Exception;
    
    int createTable(final String p0) throws Exception;
    
    List<Map<String, Object>> selectByParam(final Map<String, Object> p0) throws Exception;
    
    List<Map<String, Object>> selectByField(final Map<String, Object> p0) throws Exception;
    
    List<Map<String, Object>> selectByField2(final Map<String, Object> p0) throws Exception;
    
    List<Map<String, Object>> selectAll(final Map<String, Object> p0) throws Exception;
    
    List<Map<String, Object>> selectAllFamily(final Map<String, Object> p0) throws Exception;
    
    List<Map<String, Object>> fuzzyQueryByName(final Map<String, Object> p0) throws Exception;
    
    int insertBatch(@Param("TABLENAME") final String p0, @Param("list") final List<Map<String, Object>> p1) throws Exception;
}
