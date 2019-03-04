package com.yunfan.tmcc.ivr.dao;

import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface WorkspaceMapper
{
    Map<String, Object> selectWorkspaceById(final Map<String, Object> p0) throws Exception;

    Map<String, Object> selectWorkspaceByUser(final Map<String, Object> p0) throws Exception;

    int insertWorkspace(final Map<String, Object> p0) throws Exception;

    int UpdateByCode(final Map<String, Object> p0) throws Exception;

    int initTables(final int p0) throws Exception;

    int insertSequenceTable() throws Exception;

    int createTable(final String p0) throws Exception;

    List<Map<String, Object>> query(final Map<String, Object> p0) throws Exception;
    
    List<Map<String, Object>> queryWithPROJECT(final Map<String, Object> p0) throws Exception;

    int insertBatch(@Param("TABLENAME") final String p0, @Param("list") final List<Map<String, Object>> p1) throws Exception;
}
