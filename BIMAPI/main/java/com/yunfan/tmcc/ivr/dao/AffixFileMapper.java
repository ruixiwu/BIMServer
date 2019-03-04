package com.yunfan.tmcc.ivr.dao;

import org.apache.ibatis.annotations.Param;
import java.util.List;
import java.util.Map;

public interface AffixFileMapper
{
    List<Map<String, Object>> selectAffixFileById(final Map<String, Object> p0) throws Exception;
    
    int insertAffixFile(final Map<String, Object> p0) throws Exception;
    
    int createTable(final String p0) throws Exception;
    
    List<Map<String, Object>> selectByObjguid(final Map<String, Object> p0) throws Exception;
    
    int insertBatch(@Param("TABLENAME") final String p0, @Param("list") final List<Map<String, Object>> p1) throws Exception;
}
