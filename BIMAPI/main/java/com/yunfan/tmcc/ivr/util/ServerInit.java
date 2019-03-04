package com.yunfan.tmcc.ivr.util;

import com.yunfan.tmcc.ivr.service.ProjectService;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

public class ServerInit extends HttpServlet
{
    private static final long serialVersionUID = 1L;
    
    public ServerInit() {
        super();
    }
    
    public void init() throws ServletException {
        try {
            final ProjectService projectService = (ProjectService)SpringContextHelper.getBean("projectServiceImpl");
            projectService.initCommonTables();
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
}
