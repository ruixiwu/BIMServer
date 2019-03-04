package com.yunfan.tmcc.ivr.service.impl;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import com.yunfan.tmcc.ivr.dao.BFileTableMapper;
import org.springframework.stereotype.Service;
import com.yunfan.tmcc.ivr.service.BFileTableService;

@Service
public class BFileTableServiceImpl implements BFileTableService
{
    @Autowired
    private BFileTableMapper bfileTableMapper;
    
    public BFileTableServiceImpl() {
        super();
    }
    
    @Override
    public List<Map<String, Object>> selectBFileById(final Map<String, Object> paramMap) throws Exception {
        return this.bfileTableMapper.selectBFileById(paramMap);
    }
    
    @Override
    public int insertBFile(final Map<String, Object> paramMap) throws Exception {
        return this.bfileTableMapper.insertBFile(paramMap);
    }
    
    @Override
    public List<Map<String, Object>> selectByObjguid(final Map<String, Object> paramMap) throws Exception {
        return this.bfileTableMapper.selectByObjguid(paramMap);
    }
}
