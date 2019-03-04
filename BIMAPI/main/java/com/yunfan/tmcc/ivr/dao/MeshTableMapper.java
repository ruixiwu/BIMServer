package com.yunfan.tmcc.ivr.dao;

import org.apache.ibatis.annotations.Param;
import java.util.List;
import java.util.Map;

public interface MeshTableMapper
{
    List<Map<String, Object>> selectMeshById(final Map<String, Object> p0) throws Exception;
    
    int insertMesh(final Map<String, Object> p0) throws Exception;
    
    int createTable(final String p0) throws Exception;
    
    int insertBatch(@Param("TABLENAME") final String p0, @Param("list") final List<Map<String, Object>> p1) throws Exception;
}
