package com.yunfan.tmcc.ivr.service;

import java.util.List;
import java.util.Map;

public interface AffixFileService
{
    List<Map<String, Object>> selectAffixFileById(final Map<String, Object> p0) throws Exception;
    
    int insertAffixFile(final Map<String, Object> p0) throws Exception;
    
    int createTable(final String p0) throws Exception;
    
    List<Map<String, Object>> selectByObjguid(final Map<String, Object> p0) throws Exception;
}
