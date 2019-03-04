package com.yunfan.tmcc.ivr.controller;

import com.yunfan.tmcc.ivr.exception.OutputJson;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.stereotype.Controller;

@Controller
@RequestMapping({ "/api" })
public class TestController extends BaseController
{
    private static final Logger log;
    
    static {
        log = Logger.getLogger(TestController.class);
    }
    
    public TestController() {
        super();
    }
    
    @RequestMapping(value = { "/test" }, method = { RequestMethod.GET })
    @ResponseBody
    public String test(@RequestParam(value = "nProjectId", required = true) final int nProjectId) {
        try {
            int i = 0;
            i = 1 / i;
        }
        catch (Exception e) {
            e.printStackTrace();
            TestController.log.error("测试异常", e);
        }
        return "部分";
    }
    
    @RequestMapping(value = { "/test2" }, method = { RequestMethod.GET })
    @ResponseBody
    public String test2(int nProjectId) {
        nProjectId = 1 / nProjectId;
        return "部分";
    }
    
    @RequestMapping(value = { "/test3" }, method = { RequestMethod.GET })
    @ResponseBody
    public String test3(Integer nProjectId) {
        nProjectId = 1 / nProjectId;
        return "部分";
    }
    
    @RequestMapping(value = { "/test4" }, method = { RequestMethod.GET })
    @ResponseBody
    public String test4(@RequestParam(value = "username", required = true) final String username, @RequestParam(value = "forType", required = true) final String forType, @RequestParam(value = "userType", required = true) final String userType) {
        if (username == null || "".equals(username)) {
            return this.retContent(2010, null);
        }
        if (!"user".equals(userType) && !"merchant".equals(userType)) {
            return this.retContent(2029, null);
        }
        if (!"register".equals(forType) && !"backpwd".equals(forType)) {
            return this.retContent(2029, null);
        }
        return "部分";
    }
    
    @RequestMapping(value = { "/test5" }, method = { RequestMethod.GET })
    @ResponseBody
    public OutputJson test5(@RequestParam(value = "username", required = true) final String username, @RequestParam(value = "forType", required = true) final String forType, @RequestParam(value = "userType", required = true) final String userType) {
        if (username == null || "".equals(username)) {
            return this.returnErrorJson(400, "用户名不能为空");
        }
        return this.returnSuccessJson();
    }
}
