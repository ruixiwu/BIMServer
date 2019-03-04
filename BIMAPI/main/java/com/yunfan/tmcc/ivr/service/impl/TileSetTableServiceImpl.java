package com.yunfan.tmcc.ivr.service.impl;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import com.yunfan.tmcc.ivr.dao.TileSetTableMapper;
import org.springframework.stereotype.Service;
import com.yunfan.tmcc.ivr.service.TileSetTableService;

@Service
public class TileSetTableServiceImpl implements TileSetTableService
{
    @Autowired
    private TileSetTableMapper tileSetTableMapper;
    
    public TileSetTableServiceImpl() {
        super();
    }
    
    public List<Map<String, Object>> selectTileSetById(final Map<String, Object> paramMap) throws Exception {
        return this.tileSetTableMapper.selectTileSetById(paramMap);
    }
    
    public int insertTileSet(final Map<String, Object> paramMap) throws Exception {
        return this.tileSetTableMapper.insertTileSet(paramMap);
    }
    
    public int createTable(final String strTableName) throws Exception {
        return this.tileSetTableMapper.createTable(strTableName);
    }
}
