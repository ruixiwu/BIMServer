package com.yunfan.tmcc.ivr.controller;

import com.yunfan.tmcc.ivr.exception.OutputJson;
import com.yunfan.tmcc.ivr.exception.ReturnFormat;

public class BaseController
{
    public BaseController() {
        super();
    }
    
    protected String retContent(final int status, final Object data) {
        return ReturnFormat.retParam(status, data);
    }
    
    protected OutputJson returnErrorJson(final int status, final String message, final Object data) {
        return ReturnFormat.returnErrorJson(status, message, data);
    }
    
    protected OutputJson returnErrorJson(final int status, final String message) {
        return ReturnFormat.returnErrorJson(status, message, null);
    }
    
    protected OutputJson returnSuccessJson(final String message, final Object data) {
        return ReturnFormat.returnSuccessJson(message, data);
    }
    
    protected OutputJson returnSuccessJson() {
        return ReturnFormat.returnSuccessJson("操作成功", null);
    }
}
