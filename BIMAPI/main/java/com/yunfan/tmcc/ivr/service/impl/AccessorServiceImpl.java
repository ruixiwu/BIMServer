package com.yunfan.tmcc.ivr.service.impl;

import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import com.yunfan.tmcc.ivr.dao.AccessorTable;
import org.springframework.stereotype.Service;
import com.yunfan.tmcc.ivr.service.AccessorService;

@Service
public class AccessorServiceImpl implements AccessorService
{
    @Autowired
    private AccessorTable accessorMapper;
    
    public AccessorServiceImpl() {
        super();
    }
    
    @Override
    public Map<String, Object> selectAccessorById(final Map<String, Object> paramMap) throws Exception {
        return this.accessorMapper.selectAccessorById(paramMap);
    }
    
    @Override
    public int insertAccessorTable(final Map<String, Object> paramMap) throws Exception {
        return this.accessorMapper.insertAccessorTable(paramMap);
    }
    
    @Override
    public int createTable(final String strTableName) throws Exception {
        return this.accessorMapper.createTable(strTableName);
    }
}
