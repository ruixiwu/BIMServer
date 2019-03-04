package com.yunfan.tmcc.ivr.model;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.github.kevinsawicki.http.HttpRequest;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

public class APITest
{
    public APITest() {
        super();
    }
    
    public static void gettest() {
        final Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("Prefixion", "_2");
        final String response = HttpRequest.get("http://localhost:8080/demo/project/query", paramMap, true).body();
        final JSONObject jObject = JSONObject.parseObject(response);
        System.out.println("resultJSON:" + jObject);
        final boolean flag = jObject.getBoolean("success");
        if (flag) {
            final JSONObject data = jObject.getJSONObject("data");
            System.out.println(data.getString("strDesc"));
        }
    }
    
    public static void gettest1() {
        final Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("parent_no", "2");
        final String response = HttpRequest.get("http://47.94.91.246/Liems/webservice/getComTypeCodeTree", paramMap, true).body();
        final JSONArray jObject = JSONArray.parseArray(response);
        System.out.println("resultJSON:" + jObject);
    }
    
    public static void posttest() {
        final Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("Prefixion", "_2");
        paramMap.put("sProjectName", "项目1");
        paramMap.put("sAffixName", "名称2");
        paramMap.put("sAffixType", "jpg");
        paramMap.put("sAffixKeyID", "dsfdsfsdfasdf2");
        paramMap.put("strDesc", "true2");
        final HttpRequest mRequest = HttpRequest.post("http://localhost:8080/demo/project/add", null, true);
        final String response = mRequest.form(paramMap).body();
        final JSONObject jObject = JSONObject.parseObject(response);
        System.out.println("resultJSON:" + jObject);
        final boolean flag = jObject.getBoolean("success");
        if (flag) {
            final JSONObject data = jObject.getJSONObject("data");
            System.out.println(data);
        }
    }
    
    public static void posttest2() {
        final Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("Prefixion", "_2");
        final HttpRequest mRequest = HttpRequest.post("http://localhost:8080/demo/project/add", null, true);
        final JSONObject paramJson = new JSONObject();
        paramJson.put("sProjectName", "rac_basic_sample");
        paramJson.put("sAffixName", "rac_basic_sample_project-huqiang");
        paramJson.put("sAffixType", ".rvt");
        paramJson.put("sAffixKeyID", "4dc1c8b4-8b29-46e4-9953-d975b4d172d2");
        paramJson.put("strDesc", "default");
        final String response = mRequest.contentType("application/json").send(paramJson.toJSONString()).form(paramMap).body();
        final JSONObject jObject = JSONObject.parseObject(response);
        System.out.println("resultJSON:" + jObject);
        final boolean flag = jObject.getBoolean("success");
        if (flag) {
            final JSONObject data = jObject.getJSONObject("data");
            System.out.println(data);
        }
    }
    
    public static void posttest3() throws IOException {
        final Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("Prefixion", "_2");
        final JSONObject paramJson = new JSONObject();
        paramJson.put("sProjectName", "rac_basic_sample");
        paramJson.put("sAffixName", "rac_basic_sample_project-huqiang");
        paramJson.put("sAffixType", ".rvt");
        paramJson.put("sAffixKeyID", "4dc1c8b4-8b29-46e4-9953-d975b4d172d2");
        paramJson.put("strDesc", "default");
        final URL url = new URL("http://localhost:8080/demo/project/add");
        final HttpURLConnection conn = (HttpURLConnection)url.openConnection();
        conn.setDoOutput(true);
        conn.setDoInput(true);
        conn.setUseCaches(false);
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Connection", "Keep-Alive");
        conn.setRequestProperty("Charset", "UTF-8");
        final byte[] data = paramJson.toJSONString().getBytes();
        conn.setRequestProperty("Content-Length", String.valueOf(data.length));
        conn.setRequestProperty("contentType", "application/json");
        conn.connect();
        final OutputStream out = conn.getOutputStream();
        out.write(paramJson.toJSONString().getBytes());
        out.flush();
        out.close();
        System.out.println(conn.getResponseCode());
        if (conn.getResponseCode() == 200) {
            System.out.println("连接成功");
            final InputStream in = conn.getInputStream();
            String a = null;
            try {
                final byte[] data2 = new byte[in.available()];
                in.read(data2);
                a = new String(data2);
                System.out.println(a);
            }
            catch (Exception e1) {
                e1.printStackTrace();
            }
        }
        else {
            System.out.println("no++");
        }
    }
    
    public static void main(final String[] args) {
        final Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("parent_no", null);
        final String response = HttpRequest.get("http://47.94.91.246/Liems/webservice/getComTypeTree", paramMap, true).body();
        System.out.println(response);
        final JSONArray jObject = JSONArray.parseArray(response);
        System.out.println("resultJSON:" + jObject);
    }
}
