package com.yunfan.tmcc.ivr.service.impl;

import com.yunfan.tmcc.ivr.dao.WorkspaceMapper;
import com.yunfan.tmcc.ivr.service.WorkspaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
public class WorkspaceServiceImpl implements WorkspaceService
{
    @Autowired
    private WorkspaceMapper workspaceMapper;

    public WorkspaceServiceImpl() {
        super();
    }
    
    public Map<String, Object> selectWorkspaceById(final Map<String, Object> paramMap) throws Exception {
        return this.workspaceMapper.selectWorkspaceById(paramMap);
    }

    public Map<String, Object> selectProjectByUserId(final Map<String, Object> paramMap) throws Exception {
        return this.workspaceMapper.selectWorkspaceById(paramMap);
    }
    
    public int insertWorkspace(final Map<String, Object> paramMap) throws Exception {
        return this.workspaceMapper.insertWorkspace(paramMap);
    }
    
    public int createTable(final String strTableName) throws Exception {
        return this.workspaceMapper.createTable(strTableName);
    }
    
    public int insertSequenceTable() throws Exception {
        return this.workspaceMapper.insertSequenceTable();
    }
    
    @Transactional
    public int initTables(final int num) throws Exception {
        final int count = workspaceMapper.initTables(num);
        return count;
    }

    public List<Map<String, Object>> query(final Map<String, Object> paramMap) throws Exception {
        return workspaceMapper.query(paramMap);
    }
    
    public List<Map<String, Object>> queryWithPROJECT(final Map<String, Object> paramMap) throws Exception {
        return workspaceMapper.queryWithPROJECT(paramMap);
    }

    public int UpdateByCode(final Map<String, Object> paramMap) throws Exception {
        return workspaceMapper.UpdateByCode(paramMap);
    }
}
