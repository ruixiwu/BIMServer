package com.yunfan.tmcc.ivr.controller;

import com.yunfan.tmcc.ivr.service.WorkspaceService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class WorkspaceController
{
    private static final Logger log;

    @Autowired
    private WorkspaceService workspaceService;

    static {
        log = Logger.getLogger(WorkspaceController.class);
    }

    public WorkspaceController() {
        super();
    }

//查询账户的所有项目信息
    @RequestMapping(value = { "/getWrkInfo" }, method = { RequestMethod.POST})
    @ResponseBody
    public List<Map<String, Object>> queryPrjInfo(@RequestParam("userId") final String userId, final HttpServletResponse res) {
        final List<Map<String, Object>> listRes = new ArrayList<Map<String, Object>>();
        try {
            Map<String, Object> paramMap = new HashMap<String, Object>();
            paramMap.put("USERID", userId);
            List<Map<String, Object>> list = workspaceService.query(paramMap);
            if (list != null && list.size() > 0) {

                for (Map<String,Object> m: list) {
                    final Map<String, Object> retMap = new HashMap<String, Object>();
                    retMap.put("no", m.get("OBJECTID").toString());
                    retMap.put("id",m.get("CODE") );
                    retMap.put("name",m.get("NAME"));
                    listRes.add(retMap);
                }
            }
        }
        catch (Exception e) {
            e.printStackTrace();
            WorkspaceController.log.error("API异常/projectprefix/query", e);
        }
        return listRes;
    }

}
