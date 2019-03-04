package com.yunfan.tmcc.ivr.service.impl;

import org.springframework.transaction.annotation.Transactional;
import java.util.Iterator;
import java.util.HashMap;
import com.yunfan.tmcc.ivr.model.TexturesParaModel;
import java.util.ArrayList;
import com.yunfan.tmcc.ivr.model.MaterialtableParaModel;
import java.util.List;
import java.util.Map;
import com.yunfan.tmcc.ivr.dao.TexturesMapper;
import org.springframework.beans.factory.annotation.Autowired;
import com.yunfan.tmcc.ivr.dao.MaterialTableMapper;
import org.springframework.stereotype.Service;
import com.yunfan.tmcc.ivr.service.MaterialTableService;

@Service
public class MaterialTableServiceImpl implements MaterialTableService
{
    @Autowired
    private MaterialTableMapper materialTableMapper;
    @Autowired(required = false)
    private TexturesMapper texturesMapper;
    
    public MaterialTableServiceImpl() {
        super();
    }
    
    public List<Map<String, Object>> selectMaterialById(final Map<String, Object> paramMap) throws Exception {
        return this.materialTableMapper.selectMaterialById(paramMap);
    }
    
    public int insertMaterial(final Map<String, Object> paramMap) throws Exception {
        return this.materialTableMapper.insertMaterial(paramMap);
    }
    
    public int createTable(final String strTableName) throws Exception {
        return this.materialTableMapper.createTable(strTableName);
    }
    
    @Transactional
    public int insert(final MaterialtableParaModel paraModel, final String Prefixion) throws Exception {
        final List<Integer> texturesIds = new ArrayList<Integer>();
        for (final TexturesParaModel item : paraModel.getTexList()) {
            final Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("NAME", item.getsName());
            paramMap.put("FORMAT", item.getsFormat());
            paramMap.put("MAGFILTER", item.getsMagfilter());
            paramMap.put("MINFILTER", item.getsMinfilter());
            paramMap.put("WRAPS", item.getsWraps());
            paramMap.put("WRAPT", item.getsWrapt());
            paramMap.put("IMAGENAME", item.getsImagename());
            paramMap.put("TEXIMGID", item.getsImageKeyId());
            paramMap.put("TABLENAME", "TEXTURES" + Prefixion);
            this.texturesMapper.insertTextures(paramMap);
            texturesIds.add(Integer.parseInt(paramMap.get("OBJECTID").toString()));
        }
        final Map<String, Object> paramMap2 = new HashMap<String, Object>();
        paramMap2.put("NAME", paraModel.getsName());
        paramMap2.put("TECHDES", paraModel.getsTechdes());
        paramMap2.put("AMBIENT", paraModel.getsAmbient());
        paramMap2.put("EMISSION", paraModel.getsEmission());
        paramMap2.put("SHININESS", paraModel.getsShininess());
        paramMap2.put("SPECULAR", paraModel.getsSpecular());
        paramMap2.put("DIFFUSE", paraModel.getsDiffuse());
        paramMap2.put("TEXTURE_1", (texturesIds.size() > 0) ? texturesIds.get(0) : -1);
        paramMap2.put("TEXTURE_2", (texturesIds.size() > 1) ? texturesIds.get(1) : -1);
        paramMap2.put("TEXTURE_3", (texturesIds.size() > 2) ? texturesIds.get(2) : -1);
        paramMap2.put("TEXTURE_4", (texturesIds.size() > 3) ? texturesIds.get(3) : -1);
        paramMap2.put("TABLENAME", "MATERIALTABLE" + Prefixion);
        this.materialTableMapper.insertMaterial(paramMap2);
        return Integer.parseInt(paramMap2.get("OBJECTID").toString());
    }
}
