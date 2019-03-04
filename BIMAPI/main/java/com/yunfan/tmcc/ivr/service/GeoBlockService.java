package com.yunfan.tmcc.ivr.service;

import java.util.Map;

public interface GeoBlockService
{
    Map<String, Object> selectGeoBlockById(final Map<String, Object> p0) throws Exception;
    
    int insertGeoBlock(final Map<String, Object> p0) throws Exception;
    
    int createTable(final String p0) throws Exception;
}
