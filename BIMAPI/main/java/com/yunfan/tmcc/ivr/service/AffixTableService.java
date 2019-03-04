package com.yunfan.tmcc.ivr.service;

import com.yunfan.tmcc.ivr.model.AffixTableModel;
import java.util.List;
import java.util.Map;

public interface AffixTableService
{
    List<Map<String, Object>> selectAffixTableById(final Map<String, Object> p0) throws Exception;
    
    int insertAffixTable(final AffixTableModel p0) throws Exception;
    
    int createTable(final String p0) throws Exception;
}
