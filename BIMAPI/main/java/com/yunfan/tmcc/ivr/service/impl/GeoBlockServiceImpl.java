package com.yunfan.tmcc.ivr.service.impl;

import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import com.yunfan.tmcc.ivr.dao.GeoBlockMapper;
import org.springframework.stereotype.Service;
import com.yunfan.tmcc.ivr.service.GeoBlockService;

@Service
public class GeoBlockServiceImpl implements GeoBlockService
{
    @Autowired
    private GeoBlockMapper geoBlockMapper;
    
    public GeoBlockServiceImpl() {
        super();
    }
    
    @Override
    public Map<String, Object> selectGeoBlockById(final Map<String, Object> paramMap) throws Exception {
        return this.geoBlockMapper.selectGeoBlockById(paramMap);
    }
    
    @Override
    public int insertGeoBlock(final Map<String, Object> paramMap) throws Exception {
        return this.geoBlockMapper.insertGeoBlock(paramMap);
    }
    
    @Override
    public int createTable(final String strTableName) throws Exception {
        return this.geoBlockMapper.createTable(strTableName);
    }
}
