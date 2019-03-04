package com.yunfan.tmcc.ivr.exception;

public class CustomException extends Exception
{
    public String message;
    public String url;
    
    public CustomException(final String url, final String message) {
        super(message);
        this.message = message;
        this.url = url;
    }
    
    @Override
    public String getMessage() {
        return this.message;
    }
    
    public void setMessage(final String message) {
        this.message = message;
    }
    
    public String getUrl() {
        return this.url;
    }
    
    public void setUrl(final String url) {
        this.url = url;
    }
}
