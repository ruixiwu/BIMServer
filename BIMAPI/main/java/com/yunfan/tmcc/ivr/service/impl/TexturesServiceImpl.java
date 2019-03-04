package com.yunfan.tmcc.ivr.service.impl;

import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import com.yunfan.tmcc.ivr.dao.TexturesMapper;
import org.springframework.stereotype.Service;
import com.yunfan.tmcc.ivr.service.TexturesService;

@Service
public class TexturesServiceImpl implements TexturesService
{
    @Autowired
    private TexturesMapper texturesMapper;
    
    public TexturesServiceImpl() {
        super();
    }
    
    public Map<String, Object> selectTexturesById(final Map<String, Object> paramMap) throws Exception {
        return this.texturesMapper.selectTexturesById(paramMap);
    }
    
    public int insertTextures(final Map<String, Object> paramMap) throws Exception {
        return this.texturesMapper.insertTextures(paramMap);
    }
    
    public int createTable(final String strTableName) throws Exception {
        return this.texturesMapper.createTable(strTableName);
    }
}
