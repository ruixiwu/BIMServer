package com.yunfan.tmcc.ivr.exception;

import org.apache.log4j.Logger;
import org.springframework.beans.ConversionNotSupportedException;
import org.springframework.beans.TypeMismatchException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.http.converter.HttpMessageNotWritableException;
import org.springframework.web.HttpMediaTypeNotAcceptableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@ControllerAdvice
public class RestExceptionHandler
{
    private static final Logger log;
    
    static {
        log = Logger.getLogger(RestExceptionHandler.class);
    }
    
    public RestExceptionHandler() {
        super();
    }
    
    @ExceptionHandler({ RuntimeException.class })
    @ResponseBody
    public OutputJson runtimeExceptionHandler(final RuntimeException ex) {
        RestExceptionHandler.log.error("运行时异常", ex);
        return ReturnFormat.returnErrorJson(1000, (String)null);
    }
    
    @ExceptionHandler({ NullPointerException.class })
    @ResponseBody
    public OutputJson nullPointerExceptionHandler(final NullPointerException ex) {
        RestExceptionHandler.log.error((Object)"空指针异常", ex);
        return ReturnFormat.returnErrorJson(1001, (String)null);
    }
    
    @ExceptionHandler({ ClassCastException.class })
    @ResponseBody
    public OutputJson classCastExceptionHandler(final ClassCastException ex) {
        RestExceptionHandler.log.error((Object)"类型转换异常", ex);
        return ReturnFormat.returnErrorJson(1002, (String)null);
    }
    
    @ExceptionHandler({ IOException.class })
    @ResponseBody
    public OutputJson iOExceptionHandler(final IOException ex) {
        ex.printStackTrace();
        RestExceptionHandler.log.error((Object)"IO异常", ex);
        return ReturnFormat.returnErrorJson(1003, (String)null);
    }
    
    @ExceptionHandler({ NoSuchMethodException.class })
    @ResponseBody
    public OutputJson noSuchMethodExceptionHandler(final NoSuchMethodException ex) {
        ex.printStackTrace();
        RestExceptionHandler.log.error((Object)"未知方法异常", ex);
        return ReturnFormat.returnErrorJson(1004, (String)null);
    }
    
    @ExceptionHandler({ IndexOutOfBoundsException.class })
    @ResponseBody
    public OutputJson indexOutOfBoundsExceptionHandler(final IndexOutOfBoundsException ex) {
        ex.printStackTrace();
        RestExceptionHandler.log.error((Object)"数组越界异常", ex);
        return ReturnFormat.returnErrorJson(1005, (String)null);
    }
    
    @ExceptionHandler({ HttpMessageNotReadableException.class })
    @ResponseBody
    public OutputJson requestNotReadable(final HttpMessageNotReadableException ex) {
        System.out.println("400..requestNotReadable");
        ex.printStackTrace();
        RestExceptionHandler.log.error((Object)"400错误", ex);
        return ReturnFormat.returnErrorJson(400, (String)null);
    }
    
    @ExceptionHandler({ TypeMismatchException.class })
    @ResponseBody
    public OutputJson requestTypeMismatch(final TypeMismatchException ex) {
        ex.printStackTrace();
        RestExceptionHandler.log.error((Object)"参数类型不匹配", ex);
        return ReturnFormat.returnErrorJson(400, "参数类型不匹配,参数" + ex.getPropertyName() + "类型应该为" + ex.getRequiredType());
    }
    
    @ExceptionHandler({ MissingServletRequestParameterException.class })
    @ResponseBody
    public OutputJson requestMissingServletRequest(final MissingServletRequestParameterException ex) {
        ex.printStackTrace();
        RestExceptionHandler.log.error((Object)"缺少参数异常", ex);
        return ReturnFormat.returnErrorJson(400, "缺少必要参数,参数名称为" + ex.getParameterName());
    }
    
    @ExceptionHandler({ HttpRequestMethodNotSupportedException.class })
    @ResponseBody
    public OutputJson request405() {
        System.out.println("405...");
        RestExceptionHandler.log.error((Object)"405错误");
        return ReturnFormat.returnErrorJson(405, (String)null);
    }
    
    @ExceptionHandler({ HttpMediaTypeNotAcceptableException.class })
    @ResponseBody
    public OutputJson request406() {
        RestExceptionHandler.log.error((Object)"406错误");
        return ReturnFormat.returnErrorJson(406, (String)null);
    }
    
    @ExceptionHandler({ ConversionNotSupportedException.class, HttpMessageNotWritableException.class })
    @ResponseBody
    public OutputJson server500(final RuntimeException ex) {
        RestExceptionHandler.log.error((Object)"500错误", ex);
        return ReturnFormat.returnErrorJson(406, (String)null);
    }
    
    @ExceptionHandler({ Exception.class })
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<String> handleException(final Exception exception, final HttpServletRequest request) {
        RestExceptionHandler.log.error((Object)"系统异常!", exception);
        return (ResponseEntity<String>)new ResponseEntity((Object)"操作失败，请联系管理员！", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
