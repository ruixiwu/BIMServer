package com.yunfan.tmcc.ivr.service;

import java.util.List;
import java.util.Map;

public interface WorkspaceService
{
    Map<String, Object> selectWorkspaceById(final Map<String, Object> p0) throws Exception;

    Map<String, Object> selectProjectByUserId(final Map<String, Object> p0) throws Exception;

    int insertWorkspace(final Map<String, Object> p0) throws Exception;
    
    int createTable(final String p0) throws Exception;
    
    int UpdateByCode(final Map<String, Object> p0) throws Exception;
    
    int insertSequenceTable() throws Exception;
    
    int initTables(final int p0) throws Exception;
    
    List<Map<String, Object>> query(final Map<String, Object> p0) throws Exception;
    
    List<Map<String, Object>> queryWithPROJECT(final Map<String, Object> p0) throws Exception;

}
