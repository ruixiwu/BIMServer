package com.yunfan.tmcc.ivr.dao;

import org.apache.ibatis.annotations.Param;
import java.util.List;
import java.util.Map;

public interface BFileTableMapper
{
    List<Map<String, Object>> selectBFileById(final Map<String, Object> p0) throws Exception;
    
    int insertBFile(final Map<String, Object> p0) throws Exception;
    
    List<Map<String, Object>> selectByObjguid(final Map<String, Object> p0) throws Exception;
    
    int insertBatch(@Param("TABLENAME") final String p0, @Param("list") final List<Map<String, Object>> p1) throws Exception;
}
