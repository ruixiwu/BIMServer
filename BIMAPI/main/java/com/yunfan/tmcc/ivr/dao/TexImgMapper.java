package com.yunfan.tmcc.ivr.dao;

import org.apache.ibatis.annotations.Param;
import java.util.List;
import java.util.Map;

public interface TexImgMapper
{
    List<Map<String, Object>> selectTexImgById(final Map<String, Object> p0) throws Exception;
    
    int insertTexImg(final Map<String, Object> p0) throws Exception;
    
    List<Map<String, Object>> selectByObjguid(final Map<String, Object> p0) throws Exception;
    
    int insertBatch(@Param("TABLENAME") final String p0, @Param("list") final List<Map<String, Object>> p1) throws Exception;
}
