package com.yunfan.tmcc.ivr.service;

import com.yunfan.tmcc.ivr.model.AffixTableModel;
import java.util.List;
import java.util.Map;

public interface ProjectService
{
    Map<String, Object> selectProjectById(final Map<String, Object> p0) throws Exception;
    
    int insertProject(final Map<String, Object> p0) throws Exception;
    
    int createTable(final String p0) throws Exception;
    
    int UpdateByPrefixion(final Map<String, Object> p0) throws Exception;
    
    int insertSequenceTable() throws Exception;
    
    int initTables(final int p0) throws Exception;
    
    int initCommonTables() throws Exception;
    
    List<Map<String, Object>> query(final Map<String, Object> p0) throws Exception;
    
    List<Map<String, Object>> queryWithAFFIXTABLE(final Map<String, Object> p0) throws Exception;
    
    int addProject(final Map<String, Object> p0, final AffixTableModel p1) throws Exception;
    
    Integer selectMaxPrefixion() throws Exception;
    
    String getPrefixionByProjectId(final Integer p0) throws Exception;
}
