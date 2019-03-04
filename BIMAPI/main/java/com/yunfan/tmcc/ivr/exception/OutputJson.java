package com.yunfan.tmcc.ivr.exception;

import com.alibaba.fastjson.JSON;
import java.io.Serializable;

public class OutputJson implements Serializable
{
    private static final long serialVersionUID = 1L;
    private boolean success;
    private int status;
    private String message;
    private Object data;
    
    public OutputJson(final boolean success, final int status, final String message, final Object data) {
        super();
        this.success = success;
        this.status = status;
        this.message = message;
        this.data = ((data == null) ? new Object() : data);
    }
    
    public boolean isSuccess() {
        return this.success;
    }
    
    public void setSuccess(final boolean success) {
        this.success = success;
    }
    
    public int getStatus() {
        return this.status;
    }
    
    public void setStatus(final int status) {
        this.status = status;
    }
    
    public String getMessage() {
        return this.message;
    }
    
    public void setMessage(final String message) {
        this.message = message;
    }
    
    public Object getData() {
        return this.data;
    }
    
    public void setData(final Object data) {
        this.data = data;
    }
    
    @Override
    public String toString() {
        if (this.data == null) {
            this.setData(new Object());
        }
        return JSON.toJSONString(this);
    }
}
