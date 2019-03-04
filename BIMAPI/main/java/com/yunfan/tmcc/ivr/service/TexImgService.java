package com.yunfan.tmcc.ivr.service;

import java.util.List;
import java.util.Map;

public interface TexImgService
{
    List<Map<String, Object>> selectTexImgById(final Map<String, Object> p0) throws Exception;
    
    int insertTexImg(final Map<String, Object> p0) throws Exception;
    
    List<Map<String, Object>> selectByObjguid(final Map<String, Object> p0) throws Exception;
}
