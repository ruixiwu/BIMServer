package com.yunfan.tmcc.ivr.dao;

import org.apache.ibatis.annotations.Param;
import java.util.Map;
import java.util.List;

public interface UserMapper
{
    List<Map<String, Object>> selectUserById(final long p0) throws Exception;
    List<Map<String, Object>> selectUserByName(final String p0) throws Exception;
    int insertUser(final Map<String, Object> p0) throws Exception;
    
    int insertBatch(@Param("TABLENAME") final String p0, @Param("list") final List<Map<String, Object>> p1) throws Exception;
}
