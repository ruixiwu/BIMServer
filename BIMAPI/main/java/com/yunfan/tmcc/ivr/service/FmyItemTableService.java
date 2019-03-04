package com.yunfan.tmcc.ivr.service;

import com.yunfan.tmcc.ivr.model.FmyModel;
import java.util.List;
import java.util.Map;

public interface FmyItemTableService
{
    List<Map<String, Object>> selectFmyItemById(final Map<String, Object> p0) throws Exception;
    
    int insertFmyItem(final Map<String, Object> p0) throws Exception;
    
    int createTable(final String p0) throws Exception;
    
    int insert(final List<FmyModel> p0, final String p1) throws Exception;
    
    List<Map<String, Object>> selectByFamilyId(final Map<String, Object> p0) throws Exception;
    
    List<Map<String, Object>> selectByField(final Map<String, Object> p0) throws Exception;
    
    List<Map<String, Object>> selectByField2(final Map<String, Object> p0) throws Exception;
    
    List<Map<String, Object>> selectAll(final Map<String, Object> p0) throws Exception;
    
    List<Map<String, Object>> selectFieldEnumByFamilyId(final Map<String, Object> p0) throws Exception;
    
    List<Map<String, Object>> selectAllEnumByFamilyId(final Map<String, Object> p0) throws Exception;
}
