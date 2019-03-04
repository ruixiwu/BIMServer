package com.yunfan.tmcc.ivr.service.impl;

import java.util.HashMap;
import com.yunfan.tmcc.ivr.model.FmyModel;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import com.yunfan.tmcc.ivr.dao.FmyItemTableMapper;
import org.springframework.stereotype.Service;
import com.yunfan.tmcc.ivr.service.FmyItemTableService;

@Service
public class FmyItemTableServiceImpl implements FmyItemTableService
{
    @Autowired
    private FmyItemTableMapper fmyItemTableMapper;
    
    public FmyItemTableServiceImpl() {
        super();
    }
    
    @Override
    public List<Map<String, Object>> selectFmyItemById(final Map<String, Object> paramMap) throws Exception {
        return this.fmyItemTableMapper.selectFmyItemById(paramMap);
    }
    
    @Override
    public int insertFmyItem(final Map<String, Object> paramMap) throws Exception {
        return this.fmyItemTableMapper.insertFmyItem(paramMap);
    }
    
    @Override
    public int createTable(final String strTableName) throws Exception {
        return this.fmyItemTableMapper.createTable(strTableName);
    }
    
    @Override
    public int insert(final List<FmyModel> ListFmyModel, final String Prefixion) throws Exception {
        final String strTableName = "FMYITEMTABLE" + Prefixion;
        for (int i = 0; i < ListFmyModel.size(); ++i) {
            final FmyModel fmyModel = ListFmyModel.get(i);
            final Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("SECTION", fmyModel.getsSection());
            paramMap.put("NAME", fmyModel.getsName());
            paramMap.put("VALUE", fmyModel.getsValue());
            paramMap.put("UNIT", fmyModel.getsUnit());
            paramMap.put("TYPE", Integer.valueOf(fmyModel.getsType()));
            paramMap.put("FAMILYID", Integer.valueOf(fmyModel.getsMainId()));
            paramMap.put("TABLENAME", strTableName);
            this.fmyItemTableMapper.insertFmyItem(paramMap);
        }
        return ListFmyModel.size();
    }
    
    @Override
    public List<Map<String, Object>> selectByFamilyId(final Map<String, Object> paramMap) throws Exception {
        return this.fmyItemTableMapper.selectByFamilyId(paramMap);
    }
    
    @Override
    public List<Map<String, Object>> selectByField(final Map<String, Object> paramMap) throws Exception {
        return this.fmyItemTableMapper.selectByField(paramMap);
    }
    
    @Override
    public List<Map<String, Object>> selectAll(final Map<String, Object> paramMap) throws Exception {
        return this.fmyItemTableMapper.selectAll(paramMap);
    }
    
    @Override
    public List<Map<String, Object>> selectFieldEnumByFamilyId(final Map<String, Object> paramMap) throws Exception {
        return this.fmyItemTableMapper.selectFieldEnumByFamilyId(paramMap);
    }
    
    @Override
    public List<Map<String, Object>> selectAllEnumByFamilyId(final Map<String, Object> paramMap) throws Exception {
        return this.fmyItemTableMapper.selectAllEnumByFamilyId(paramMap);
    }
    
    @Override
    public List<Map<String, Object>> selectByField2(final Map<String, Object> paramMap) throws Exception {
        return this.fmyItemTableMapper.selectByField2(paramMap);
    }
}
