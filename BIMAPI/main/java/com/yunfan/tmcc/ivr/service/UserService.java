package com.yunfan.tmcc.ivr.service;

import java.util.Map;
import java.util.List;

public interface UserService
{
    List<Map<String, Object>> selectUserById(final long p0) throws Exception;
    List<Map<String, Object>> selectUserByName(String p0) throws Exception;

    int insertUser(final Map<String, Object> p0) throws Exception;
}
