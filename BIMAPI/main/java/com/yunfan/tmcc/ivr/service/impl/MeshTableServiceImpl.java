package com.yunfan.tmcc.ivr.service.impl;

import java.util.Iterator;
import com.yunfan.tmcc.ivr.model.AccessorModel;
import java.util.HashMap;
import com.yunfan.tmcc.ivr.model.MeshModel;
import java.util.List;
import java.util.Map;
import com.yunfan.tmcc.ivr.dao.AccessorTable;
import org.springframework.beans.factory.annotation.Autowired;
import com.yunfan.tmcc.ivr.dao.MeshTableMapper;
import org.springframework.stereotype.Service;
import com.yunfan.tmcc.ivr.service.MeshTableService;

@Service
public class MeshTableServiceImpl implements MeshTableService
{
    @Autowired
    private MeshTableMapper meshTableMapper;
    @Autowired(required = false)
    private AccessorTable accessorTable;
    
    public MeshTableServiceImpl() {
        super();
    }
    
    public List<Map<String, Object>> selectMeshById(final Map<String, Object> paramMap) throws Exception {
        return this.meshTableMapper.selectMeshById(paramMap);
    }
    
    public int insertMesh(final Map<String, Object> paramMap) throws Exception {
        return this.meshTableMapper.insertMesh(paramMap);
    }
    
    public int createTable(final String strTableName) throws Exception {
        return this.meshTableMapper.createTable(strTableName);
    }
    
    public int insert(final MeshModel paraModel, final String Prefixion) throws Exception {
        final Map<String, Integer> AccTypeMap = new HashMap<String, Integer>();
        for (final AccessorModel item : paraModel.getAccList()) {
            final Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("TYPE", item.getsType());
            paramMap.put("BYTEOFFSET", item.getsByteOffSet());
            paramMap.put("BYTESTRIDE", item.getsByteStride());
            paramMap.put("COMPONENTTYPE", item.getsComponentType());
            paramMap.put("NCOUNT", item.getsCount());
            paramMap.put("BFILEID", item.getsBFileId());
            paramMap.put("TABLENAME", "ACCESSORTABLE" + Prefixion);
            this.accessorTable.insertAccessorTable(paramMap);
            AccTypeMap.put(item.getsAccType(), Integer.parseInt(paramMap.get("OBJECTID").toString()));
        }
        final Map<String, Object> paramMap2 = new HashMap<String, Object>();
        paramMap2.put("NAME", paraModel.getsName());
        paramMap2.put("MATERIALID", paraModel.getsMaterialId());
        paramMap2.put("ACCESSOR_POSTION", AccTypeMap.get("Vertex"));
        paramMap2.put("ACCESSOR_INDEX", AccTypeMap.get("Index"));
        paramMap2.put("ACCESSOR_NORMAL", AccTypeMap.get("Normal"));
        paramMap2.put("ACCESSOR_TEXCOORD_0", AccTypeMap.get("UV"));
        paramMap2.put("TABLENAME", "MESHTABLE" + Prefixion);
        this.meshTableMapper.insertMesh(paramMap2);
        return Integer.parseInt(paramMap2.get("OBJECTID").toString());
    }
}
