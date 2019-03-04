package com.yunfan.tmcc.ivr.service.impl;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import com.yunfan.tmcc.ivr.dao.TexImgMapper;
import org.springframework.stereotype.Service;
import com.yunfan.tmcc.ivr.service.TexImgService;

@Service
public class TexImgServiceImpl implements TexImgService
{
    @Autowired
    private TexImgMapper texImgMapper;
    
    public TexImgServiceImpl() {
        super();
    }
    
    public List<Map<String, Object>> selectTexImgById(final Map<String, Object> paramMap) throws Exception {
        return this.texImgMapper.selectTexImgById(paramMap);
    }
    
    public int insertTexImg(final Map<String, Object> paramMap) throws Exception {
        return this.texImgMapper.insertTexImg(paramMap);
    }
    
    public List<Map<String, Object>> selectByObjguid(final Map<String, Object> paramMap) throws Exception {
        return this.texImgMapper.selectByObjguid(paramMap);
    }
}
