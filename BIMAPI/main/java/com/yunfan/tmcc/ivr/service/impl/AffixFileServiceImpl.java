package com.yunfan.tmcc.ivr.service.impl;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import com.yunfan.tmcc.ivr.dao.AffixFileMapper;
import org.springframework.stereotype.Service;
import com.yunfan.tmcc.ivr.service.AffixFileService;

@Service
public class AffixFileServiceImpl implements AffixFileService
{
    @Autowired
    private AffixFileMapper affixFileMapper;
    
    public AffixFileServiceImpl() {
        super();
    }
    
    @Override
    public List<Map<String, Object>> selectAffixFileById(final Map<String, Object> paramMap) throws Exception {
        return this.affixFileMapper.selectAffixFileById(paramMap);
    }
    
    @Override
    public int insertAffixFile(final Map<String, Object> paramMap) throws Exception {
        return this.affixFileMapper.insertAffixFile(paramMap);
    }
    
    @Override
    public int createTable(final String strTableName) throws Exception {
        return this.affixFileMapper.createTable(strTableName);
    }
    
    @Override
    public List<Map<String, Object>> selectByObjguid(final Map<String, Object> paramMap) throws Exception {
        return this.affixFileMapper.selectByObjguid(paramMap);
    }
}
