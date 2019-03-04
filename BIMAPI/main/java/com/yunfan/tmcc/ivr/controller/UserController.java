package com.yunfan.tmcc.ivr.controller;

import com.yunfan.tmcc.ivr.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class UserController
{
    @Autowired
    private UserService userService;
    
    public UserController() {
        super();
    }
    
    @RequestMapping(value = { "/user/{userId}" }, method = { RequestMethod.POST })
    @ResponseBody
    public Map<String, Object> queryUserById(@PathVariable("userId") final long userId, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        String code = "500";
        boolean success = false;
         List<Map<String, Object>> userList = null;
        try {
            userList=this.userService.selectUserById(userId);
            code = "200";
            success = true;
        }
        catch (Exception ex) {
            ex.printStackTrace();
        }

        retMap.put("code", code);
        retMap.put("success", success);
        retMap.put("data", userList);
        return retMap;
    }

//    @RequestMapping(value = { "/user/{userName}" }, method = { RequestMethod.POST })
//    @ResponseBody
//    public Map<String, Object> queryUserByName(@PathVariable("userName") final String userName, final HttpServletResponse res) {
//        final Map<String, Object> retMap = new HashMap<String, Object>();
//        String code = "500";
//        boolean success = false;
//        List<Map<String, Object>> userList = null;
//        try {
//            userList=this.userService.selectUserByName(userName);
//            code = "200";
//            success = true;
//        }
//        catch (Exception ex) {
//            ex.printStackTrace();
//        }
//
//        retMap.put("code", code);
//        retMap.put("success", success);
//        retMap.put("data", userList);
//        return retMap;
//    }

    //由用户Phone，获得userId
    @RequestMapping(value = { "/getUsrIdByPhone" }, method = { RequestMethod.POST })
    @ResponseBody
    public Integer queryUserByPhone(@RequestParam(value="phone", required = true) final String userPhone, final HttpServletResponse res) {
        Map<String, Object> retMap = new HashMap<String, Object>();
        List<Map<String, Object>> userList = null;
        try {
            userList=this.userService.selectUserByName(userPhone);
            retMap= userList.get(0);
        }
        catch (Exception ex) {
            ex.printStackTrace();
        }
        Integer userId = (Integer)retMap.get("userId");
        return userId;
    }
    //由userId，md5密码，获得登陆正确与否
    @RequestMapping(value = { "/checkUserLogin" }, method = { RequestMethod.POST })
    @ResponseBody
    public Boolean checkUserLogin(@RequestParam(value="userId", required = true) final String userId, @RequestParam(value="md5Str", required = true) final String md5Str,final HttpServletResponse res) {
        Map<String, Object> retMap = new HashMap<String, Object>();
        List<Map<String, Object>> userList = null;
        try {
            long user_Id=Long.parseLong(userId);
            userList=this.userService.selectUserById(user_Id);
            retMap= userList.get(0);
        }
        catch (Exception ex) {
            ex.printStackTrace();
        }

        String passwd = (String)retMap.get("password");
        return md5Str.equals(passwd);

    }


    //由用户输入的phone(User Name)获得user
    @RequestMapping(value = { "/user" }, method = { RequestMethod.POST })
    @ResponseBody
    public Map<String, Object> queryUserByName(@RequestParam(value="userName", required = true) final String userName, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        String code = "500";
        boolean success = false;
        List<Map<String, Object>> userList = null;
        try {
            userList=this.userService.selectUserByName(userName);
            code = "200";
            success = true;
        }
        catch (Exception ex) {
            ex.printStackTrace();
        }
        retMap.put("code", code);
        retMap.put("success", success);
        retMap.put("data", userList);
        return retMap;
    }

    @RequestMapping(value = { "/users" }, method = { RequestMethod.POST })
    @ResponseBody
    public Map<String, Object> addUser(@RequestParam(value = "userName", required = true) final String userName, @RequestParam(value = "password", required = true) final String password, final HttpServletResponse res) {
        final Map<String, Object> retMap = new HashMap<String, Object>();
        String code = "500";
        boolean success = false;
        int id = -1;
        try {
            final Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("userName", userName);
            paramMap.put("password", password);
            id = this.userService.insertUser(paramMap);
            code = "200";
            success = true;
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        retMap.put("code", code);
        retMap.put("success", success);
        retMap.put("data", id);
        return retMap;
    }
}
