package com.yunfan.tmcc.ivr.exception;

import java.util.HashMap;
import java.util.Map;

public class ReturnFormat
{
    private static Map<String, String> messageMap;
    
    static {
        (ReturnFormat.messageMap = new HashMap<String, String>()).put("0", "");
        ReturnFormat.messageMap.put("400", "Bad Request!");
        ReturnFormat.messageMap.put("401", "NotAuthorization");
        ReturnFormat.messageMap.put("405", "Method Not Allowed");
        ReturnFormat.messageMap.put("406", "Not Acceptable");
        ReturnFormat.messageMap.put("500", "Internal Server Error");
        ReturnFormat.messageMap.put("1000", "[服务器]运行时异常");
        ReturnFormat.messageMap.put("1001", "[服务器]空值异常");
        ReturnFormat.messageMap.put("1002", "[服务器]数据类型转换异常");
        ReturnFormat.messageMap.put("1003", "[服务器]IO异常");
        ReturnFormat.messageMap.put("1004", "[服务器]未知方法异常");
        ReturnFormat.messageMap.put("1005", "[服务器]数组越界异常");
        ReturnFormat.messageMap.put("1006", "[服务器]网络异常");
        ReturnFormat.messageMap.put("1010", "用户未注册");
        ReturnFormat.messageMap.put("1011", "用户已注册");
        ReturnFormat.messageMap.put("1012", "用户名或密码错误");
        ReturnFormat.messageMap.put("1013", "用户帐号冻结");
        ReturnFormat.messageMap.put("1014", "用户信息编辑失败");
        ReturnFormat.messageMap.put("1015", "用户信息失效，请重新获取");
        ReturnFormat.messageMap.put("1020", "验证码发送失败");
        ReturnFormat.messageMap.put("1021", "验证码失效");
        ReturnFormat.messageMap.put("1022", "验证码错误");
        ReturnFormat.messageMap.put("1023", "验证码不可用");
        ReturnFormat.messageMap.put("1029", "短信平台异常");
        ReturnFormat.messageMap.put("1030", "周边无店铺");
        ReturnFormat.messageMap.put("1031", "店铺添加失败");
        ReturnFormat.messageMap.put("1032", "编辑店铺信息失败");
        ReturnFormat.messageMap.put("1033", "每个用户只能添加一个商铺");
        ReturnFormat.messageMap.put("1034", "店铺不存在");
        ReturnFormat.messageMap.put("1040", "无浏览商品");
        ReturnFormat.messageMap.put("1041", "添加失败,商品种类超出上限");
        ReturnFormat.messageMap.put("1042", "商品不存在");
        ReturnFormat.messageMap.put("1043", "商品删除失败");
        ReturnFormat.messageMap.put("2010", "缺少参数或值为空");
        ReturnFormat.messageMap.put("2029", "参数不合法");
        ReturnFormat.messageMap.put("2020", "无效的Token");
        ReturnFormat.messageMap.put("2021", "无操作权限");
        ReturnFormat.messageMap.put("2022", "RSA解密失败,密文数据已损坏");
        ReturnFormat.messageMap.put("2023", "请重新登录");
    }
    
    public ReturnFormat() {
        super();
    }
    
    public static String retParam(final int status, final Object data) {
        final OutputJson json = new OutputJson(false, status, ReturnFormat.messageMap.get(String.valueOf(status)), data);
        return json.toString();
    }
    
    public static OutputJson returnErrorJson(final int status) {
        final OutputJson json = new OutputJson(false, status, ReturnFormat.messageMap.get(String.valueOf(status)), null);
        return json;
    }
    
    public static OutputJson returnErrorJson(final int status, final Object data) {
        final OutputJson json = new OutputJson(false, status, ReturnFormat.messageMap.get(String.valueOf(status)), data);
        return json;
    }
    
    public static OutputJson returnErrorJson(final int status, final String message) {
        final OutputJson json = new OutputJson(false, status, message, null);
        return json;
    }
    
    public static OutputJson returnErrorJson(final int status, final String message, final Object data) {
        final OutputJson json = new OutputJson(false, status, message, data);
        return json;
    }
    
    public static OutputJson returnSuccessJson(final String message, final Object data) {
        final OutputJson json = new OutputJson(true, 200, message, data);
        return json;
    }
}
