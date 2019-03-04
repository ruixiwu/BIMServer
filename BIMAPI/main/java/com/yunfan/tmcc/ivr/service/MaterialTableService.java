package com.yunfan.tmcc.ivr.service;

import com.yunfan.tmcc.ivr.model.MaterialtableParaModel;
import java.util.List;
import java.util.Map;

public interface MaterialTableService
{
    List<Map<String, Object>> selectMaterialById(final Map<String, Object> p0) throws Exception;
    
    int insertMaterial(final Map<String, Object> p0) throws Exception;
    
    int createTable(final String p0) throws Exception;
    
    int insert(final MaterialtableParaModel p0, final String p1) throws Exception;
}
