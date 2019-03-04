package com.yunfan.tmcc.ivr.service;

import com.yunfan.tmcc.ivr.model.ModelPrp;
import java.util.List;
import java.util.Map;

public interface ProTableService
{
    List<Map<String, Object>> selectProTableById(final Map<String, Object> p0) throws Exception;
    
    int insertProTable(final Map<String, Object> p0) throws Exception;
    
    int createTable(final String p0) throws Exception;
    
    int insert(final ModelPrp p0, final String p1) throws Exception;
    
    List<Map<String, Object>> selectProTableByValue(final Map<String, Object> p0) throws Exception;
    
    Map<String, Object> selectProByGeoID(final int p0, final int p1) throws Exception;
    
    List<Map<String, Object>> selectByParam(final Map<String, Object> p0) throws Exception;
}
