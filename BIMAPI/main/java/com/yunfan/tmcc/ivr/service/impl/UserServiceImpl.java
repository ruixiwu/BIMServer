package com.yunfan.tmcc.ivr.service.impl;

import com.yunfan.tmcc.ivr.dao.UserMapper;
import com.yunfan.tmcc.ivr.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService
{
    @Autowired
    private UserMapper userMapper;
    
    public UserServiceImpl() {
        super();
    }
    
    public List<Map<String, Object>> selectUserById(final long userId) throws Exception {
        return this.userMapper.selectUserById(userId);
    }

    public List<Map<String, Object>> selectUserByName(String userName) throws Exception {
        return this.userMapper.selectUserByName(userName);
    }
    
    public int insertUser(final Map<String, Object> paramMap) throws Exception {
        return this.userMapper.insertUser(paramMap);
    }
}
