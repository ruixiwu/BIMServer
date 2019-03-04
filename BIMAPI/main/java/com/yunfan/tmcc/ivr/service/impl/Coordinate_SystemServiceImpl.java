package com.yunfan.tmcc.ivr.service.impl;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import com.yunfan.tmcc.ivr.dao.Coordinate_SystemMapper;
import org.springframework.stereotype.Service;
import com.yunfan.tmcc.ivr.service.Coordinate_SystemService;

@Service
public class Coordinate_SystemServiceImpl implements Coordinate_SystemService
{
    @Autowired
    private Coordinate_SystemMapper coordinateMapper;
    
    public Coordinate_SystemServiceImpl() {
        super();
    }
    
    @Override
    public List<Map<String, Object>> selectCoordinateById(final Map<String, Object> paramMap) throws Exception {
        return this.coordinateMapper.selectCoordinateById(paramMap);
    }
    
    @Override
    public int insertCoordinate(final Map<String, Object> paramMap) throws Exception {
        return this.coordinateMapper.insertCoordinate(paramMap);
    }
    
    @Override
    public int createTable(final String strTableName) throws Exception {
        return this.coordinateMapper.createTable(strTableName);
    }
}
