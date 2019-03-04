package com.yunfan.tmcc.ivr.service;

import java.util.Map;

public interface AccessorService
{
    Map<String, Object> selectAccessorById(final Map<String, Object> p0) throws Exception;
    
    int insertAccessorTable(final Map<String, Object> p0) throws Exception;
    
    int createTable(final String p0) throws Exception;
}
