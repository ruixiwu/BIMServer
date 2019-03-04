package com.yunfan.tmcc.ivr.service.impl;

import java.util.HashMap;
import com.yunfan.tmcc.ivr.model.FamilyModel;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import com.yunfan.tmcc.ivr.dao.FamilyTableMapper;
import org.springframework.stereotype.Service;
import com.yunfan.tmcc.ivr.service.FamilyTableService;

@Service
public class FamilyTableServiceImpl implements FamilyTableService
{
    @Autowired
    private FamilyTableMapper familyTableMapper;
    
    public FamilyTableServiceImpl() {
        super();
    }
    
    @Override
    public List<Map<String, Object>> selectFamilyById(final Map<String, Object> paramMap) throws Exception {
        return this.familyTableMapper.selectFamilyById(paramMap);
    }
    
    @Override
    public List<Map<String, Object>> selectFamilyByParentId(final Map<String, Object> paramMap) throws Exception {
        return this.familyTableMapper.selectFamilyByParentId(paramMap);
    }
    
    @Override
    public List<Map<String, Object>> selectFamilyByName(final Map<String, Object> paramMap) throws Exception {
        return this.familyTableMapper.selectFamilyByName(paramMap);
    }
    
    @Override
    public int insertFamily(final Map<String, Object> paramMap) throws Exception {
        return this.familyTableMapper.insertFamily(paramMap);
    }
    
    @Override
    public int createTable(final String strTableName) throws Exception {
        return this.familyTableMapper.createTable(strTableName);
    }
    
    @Override
    public List<Map<String, Object>> selectAllFamily(final Map<String, Object> paramMap) throws Exception {
        return this.familyTableMapper.selectAllFamily(paramMap);
    }
    
    @Override
    public int insert(final FamilyModel paraModel, final String Prefixion) throws Exception {
        int nRetId = -1;
        final String tableName = "FAMILYTABLE" + Prefixion;
        List<Map<String, Object>> familyList = null;
        final Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("NAME", paraModel.getsCategory());
        paramMap.put("TABLENAME", tableName);
        familyList = this.familyTableMapper.selectFamilyByName(paramMap);
        int nParentID = -1;
        if (familyList.isEmpty()) {
            paramMap.put("PARENTID", -1);
            paramMap.put("DESCRIBE", paraModel.getsDescribe());
            this.familyTableMapper.insertFamily(paramMap);
            nParentID = Integer.parseInt(paramMap.get("OBJECTID").toString());
        }
        else {
            nParentID = Integer.parseInt(familyList.get(0).get("OBJECTID").toString());
            familyList.clear();
        }
        paramMap.clear();
        paramMap.put("NAME", paraModel.getsFamilyName());
        paramMap.put("TABLENAME", tableName);
        familyList = this.familyTableMapper.selectFamilyByName(paramMap);
        int nFamilyId = -1;
        if (familyList.isEmpty()) {
            paramMap.put("PARENTID", nParentID);
            paramMap.put("DESCRIBE", paraModel.getsDescribe());
            this.familyTableMapper.insertFamily(paramMap);
            nFamilyId = Integer.parseInt(paramMap.get("OBJECTID").toString());
        }
        else {
            nFamilyId = Integer.parseInt(familyList.get(0).get("OBJECTID").toString());
            familyList.clear();
        }
        paramMap.clear();
        paramMap.put("NAME", paraModel.getsName());
        paramMap.put("TABLENAME", tableName);
        familyList = this.familyTableMapper.selectFamilyByName(paramMap);
        if (familyList.isEmpty()) {
            paramMap.put("PARENTID", nFamilyId);
            paramMap.put("DESCRIBE", paraModel.getsDescribe());
            this.familyTableMapper.insertFamily(paramMap);
            nRetId = Integer.parseInt(paramMap.get("OBJECTID").toString());
        }
        else {
            nRetId = Integer.parseInt(familyList.get(0).get("OBJECTID").toString());
            familyList.clear();
        }
        return nRetId;
    }
    
    @Override
    public List<Map<String, Object>> selectByParam(final Map<String, Object> paramMap) throws Exception {
        return this.familyTableMapper.selectByParam(paramMap);
    }
    
    @Override
    public List<Map<String, Object>> selectByField(final Map<String, Object> paramMap) throws Exception {
        return this.familyTableMapper.selectByField(paramMap);
    }
    
    @Override
    public List<Map<String, Object>> selectAll(final Map<String, Object> paramMap) throws Exception {
        return this.familyTableMapper.selectAll(paramMap);
    }
    
    @Override
    public List<Map<String, Object>> fuzzyQueryByName(final Map<String, Object> paramMap) throws Exception {
        return this.familyTableMapper.fuzzyQueryByName(paramMap);
    }
    
    @Override
    public List<Map<String, Object>> selectByField2(final Map<String, Object> paramMap) throws Exception {
        return this.familyTableMapper.selectByField2(paramMap);
    }
    
    @Override
    public Map<String, Object> selectParentFamilyById(final Map<String, Object> paramMap) throws Exception {
        return this.familyTableMapper.selectParentFamilyById(paramMap);
    }
    
    @Override
    public Map<String, Object> selectFamilyByIdAndPname(final Map<String, Object> paramMap) throws Exception {
        return this.familyTableMapper.selectFamilyByIdAndPname(paramMap);
    }
}
