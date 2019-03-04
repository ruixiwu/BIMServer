package com.yunfan.tmcc.ivr.service.impl;

import com.yunfan.tmcc.ivr.model.AffixTableModel;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import com.yunfan.tmcc.ivr.dao.AffixTableMapper;
import org.springframework.stereotype.Service;
import com.yunfan.tmcc.ivr.service.AffixTableService;

@Service
public class AffixTableServiceImpl implements AffixTableService
{
    @Autowired
    private AffixTableMapper affixTableMapper;
    
    public AffixTableServiceImpl() {
        super();
    }
    
    @Override
    public List<Map<String, Object>> selectAffixTableById(final Map<String, Object> paramMap) throws Exception {
        return this.affixTableMapper.selectAffixTableById(paramMap);
    }
    
    @Override
    public int insertAffixTable(final AffixTableModel model) throws Exception {
        return this.affixTableMapper.insertAffixTable(model);
    }
    
    @Override
    public int createTable(final String strTableName) throws Exception {
        return this.affixTableMapper.createTable(strTableName);
    }
}
