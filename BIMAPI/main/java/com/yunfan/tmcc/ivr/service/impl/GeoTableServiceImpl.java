package com.yunfan.tmcc.ivr.service.impl;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import com.yunfan.tmcc.ivr.dao.GeoTableMapper;
import org.springframework.stereotype.Service;
import com.yunfan.tmcc.ivr.service.GeoTableService;

@Service
public class GeoTableServiceImpl implements GeoTableService
{
    @Autowired
    private GeoTableMapper geoTableMapper;
    
    public GeoTableServiceImpl() {
        super();
    }
    
    @Override
    public Map<String, Object> selectGeoTableById(final Map<String, Object> paramMap) throws Exception {
        return this.geoTableMapper.selectGeoTableById(paramMap);
    }
    
    @Override
    public int insertGeoTable(final Map<String, Object> paramMap) throws Exception {
        return this.geoTableMapper.insertGeoTable(paramMap);
    }
    
    @Override
    public int createTable(final String strTableName) throws Exception {
        return this.geoTableMapper.createTable(strTableName);
    }
    
    @Override
    public List<Map<String, Object>> selectByParam(final Map<String, Object> paramMap) throws Exception {
        return this.geoTableMapper.selectByParam(paramMap);
    }
    
    @Override
    public List<Map<String, Object>> selectByFamilyId(final Map<String, Object> paramMap) throws Exception {
        return this.geoTableMapper.selectByFamilyId(paramMap);
    }
    
    @Override
    public List<Map<String, Object>> selectGeoCount(final Map<String, Object> paramMap) throws Exception {
        return this.geoTableMapper.selectGeoCount(paramMap);
    }
}
