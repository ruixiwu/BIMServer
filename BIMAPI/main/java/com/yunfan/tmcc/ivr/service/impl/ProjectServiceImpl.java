package com.yunfan.tmcc.ivr.service.impl;

import com.yunfan.tmcc.ivr.dao.AffixTableMapper;
import com.yunfan.tmcc.ivr.dao.ProjectMapper;
import com.yunfan.tmcc.ivr.model.AffixTableModel;
import com.yunfan.tmcc.ivr.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProjectServiceImpl implements ProjectService
{
    @Autowired
    private ProjectMapper projectMapper;
    @Autowired(required = false)
    private AffixTableMapper affixTableMapper;
    
    public ProjectServiceImpl() {
        super();
    }
    
    public Map<String, Object> selectProjectById(final Map<String, Object> paramMap) throws Exception {
        return this.projectMapper.selectProjectById(paramMap);
    }
    
    public int insertProject(final Map<String, Object> paramMap) throws Exception {
        return this.projectMapper.insertProject(paramMap);
    }
    
    public int createTable(final String strTableName) throws Exception {
        return this.projectMapper.createTable(strTableName);
    }
    
    public int insertSequenceTable() throws Exception {
        return this.projectMapper.insertSequenceTable();
    }
    
    @Transactional
    public int initTables(final int num) throws Exception {
        final int count = this.projectMapper.initTables(num);
        return count;
    }
    
    @Transactional
    public int initCommonTables() throws Exception {
        final int count = this.projectMapper.initCommonTables();
        return count;
    }
    
    public List<Map<String, Object>> query(final Map<String, Object> paramMap) throws Exception {
        return this.projectMapper.query(paramMap);
    }
    
    public List<Map<String, Object>> queryWithAFFIXTABLE(final Map<String, Object> paramMap) throws Exception {
        return this.projectMapper.queryWithAFFIXTABLE(paramMap);
    }
    
    @Transactional
    public int addProject(final Map<String, Object> paramMap, final AffixTableModel affixTableModel) throws Exception {
        this.affixTableMapper.insertAffixTable(affixTableModel);
        paramMap.put("SOURCEID", affixTableModel.getOBJECTID());
        this.projectMapper.insertProject(paramMap);
        return Integer.parseInt(paramMap.get("OBJECTID").toString());
    }
    
    public Integer selectMaxPrefixion() throws Exception {
        return this.projectMapper.selectMaxPrefixion();
    }
    
    public String getPrefixionByProjectId(final Integer nProjectId) throws Exception {
        String prefixion = "-1";
        final Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("TABLENAME", "PROJECT");
        paramMap.put("PREFIXION", nProjectId);
        final List<Map<String, Object>> projectList = this.projectMapper.query(paramMap);
        if (projectList != null && projectList.size() > 0) {
            final Map<String, Object> projectMap = projectList.get(0);
            prefixion = projectMap.get("PREFIXION").toString();
        }
        return prefixion;
    }
    
    public int UpdateByPrefixion(final Map<String, Object> paramMap) throws Exception {
        return this.projectMapper.UpdateByPrefixion(paramMap);
    }
}
