package com.yunfan.tmcc.ivr.service;

import java.util.Map;

public interface TexturesService
{
    Map<String, Object> selectTexturesById(final Map<String, Object> p0) throws Exception;
    
    int insertTextures(final Map<String, Object> p0) throws Exception;
    
    int createTable(final String p0) throws Exception;
}
