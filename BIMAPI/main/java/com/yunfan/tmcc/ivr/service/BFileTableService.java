package com.yunfan.tmcc.ivr.service;

import java.util.List;
import java.util.Map;

public interface BFileTableService
{
    List<Map<String, Object>> selectBFileById(final Map<String, Object> p0) throws Exception;
    
    int insertBFile(final Map<String, Object> p0) throws Exception;
    
    List<Map<String, Object>> selectByObjguid(final Map<String, Object> p0) throws Exception;
}
