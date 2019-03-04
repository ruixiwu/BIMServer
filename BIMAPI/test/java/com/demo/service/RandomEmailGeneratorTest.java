package com.demo.service;

import com.yunfan.tmcc.ivr.service.AccessorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.testng.AbstractTestNGSpringContextTests;
import org.testng.annotations.Test;

import java.util.HashMap;
import java.util.Map;

@ContextConfiguration(locations = {"/spring-test-config.xml"})
public class RandomEmailGeneratorTest extends AbstractTestNGSpringContextTests {

    @Autowired
    private EmailGenerator emailGenerator;

    @Autowired
    private AccessorService accessorService;

    @Test
    public void testEmailGenerator( ){
        Map<String, Object> p0 = new HashMap<>();
        p0.put("TABLENAME","accessorTable_1");
        p0.put("OBJECTID","10");
        Map<String, Object> p2 = null;
        try {
            p2 = accessorService.selectAccessorById(p0);
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println(p2);
        /*String email = emailGenerator.generate();
        System.out.println(email);
        Assert.assertNotNull(email);
        Assert.assertEquals(email, "feedback@yiibai.com");*/
    }

    @Test
    public void testGenerate() {
        System.out.println("email");
    }
}