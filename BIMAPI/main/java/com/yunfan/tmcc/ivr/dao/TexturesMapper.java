package com.yunfan.tmcc.ivr.dao;

import java.util.List;
import org.apache.ibatis.annotations.Param;
import java.util.Map;

public interface TexturesMapper
{
    Map<String, Object> selectTexturesById(final Map<String, Object> p0) throws Exception;
    
    int insertTextures(final Map<String, Object> p0) throws Exception;
    
    int createTable(final String p0) throws Exception;
    
    int insertBatch(@Param("TABLENAME") final String p0, @Param("list") final List<Map<String, Object>> p1) throws Exception;
}
