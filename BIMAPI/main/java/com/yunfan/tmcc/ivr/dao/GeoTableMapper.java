package com.yunfan.tmcc.ivr.dao;

import org.apache.ibatis.annotations.Param;
import java.util.List;
import java.util.Map;

public interface GeoTableMapper
{
    Map<String, Object> selectGeoTableById(final Map<String, Object> p0) throws Exception;
    
    int insertGeoTable(final Map<String, Object> p0) throws Exception;
    
    int createTable(final String p0) throws Exception;
    
    List<Map<String, Object>> selectByParam(final Map<String, Object> p0) throws Exception;
    
    List<Map<String, Object>> selectByFamilyId(final Map<String, Object> p0) throws Exception;
    
    int insertBatch(@Param("TABLENAME") final String p0, @Param("list") final List<Map<String, Object>> p1) throws Exception;
    
    List<Map<String, Object>> selectGeoCount(final Map<String, Object> p0) throws Exception;
}
