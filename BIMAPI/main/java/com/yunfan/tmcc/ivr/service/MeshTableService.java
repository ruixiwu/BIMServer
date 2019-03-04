package com.yunfan.tmcc.ivr.service;

import com.yunfan.tmcc.ivr.model.MeshModel;
import java.util.List;
import java.util.Map;

public interface MeshTableService
{
    List<Map<String, Object>> selectMeshById(final Map<String, Object> p0) throws Exception;
    
    int insertMesh(final Map<String, Object> p0) throws Exception;
    
    int createTable(final String p0) throws Exception;
    
    int insert(final MeshModel p0, final String p1) throws Exception;
}
