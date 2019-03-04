package com.yunfan.tmcc.ivr.service;

import java.util.List;
import java.util.Map;

public interface TileSetTableService
{
    List<Map<String, Object>> selectTileSetById(final Map<String, Object> p0) throws Exception;
    
    int insertTileSet(final Map<String, Object> p0) throws Exception;
    
    int createTable(final String p0) throws Exception;
}
