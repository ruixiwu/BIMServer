package com.yunfan.tmcc.ivr.dao;

import org.apache.ibatis.annotations.Param;
import com.yunfan.tmcc.ivr.model.AffixTableModel;
import java.util.List;
import java.util.Map;

public interface AffixTableMapper
{
    List<Map<String, Object>> selectAffixTableById(final Map<String, Object> p0) throws Exception;
    
    int insertAffixTable(final AffixTableModel p0) throws Exception;
    
    int createTable(final String p0) throws Exception;
    
    int insertBatch(@Param("TABLENAME") final String p0, @Param("list") final List<Map<String, Object>> p1) throws Exception;
}
