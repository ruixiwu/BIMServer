package com.yunfan.tmcc.ivr.service;

import java.util.List;
import java.util.Map;

public interface Coordinate_SystemService
{
    List<Map<String, Object>> selectCoordinateById(final Map<String, Object> p0) throws Exception;
    
    int insertCoordinate(final Map<String, Object> p0) throws Exception;
    
    int createTable(final String p0) throws Exception;
}
