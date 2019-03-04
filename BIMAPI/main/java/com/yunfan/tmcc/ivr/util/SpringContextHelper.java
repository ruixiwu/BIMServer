package com.yunfan.tmcc.ivr.util;

import org.springframework.beans.BeansException;
import java.util.Arrays;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;
import org.springframework.context.ApplicationContextAware;

@Component
public class SpringContextHelper implements ApplicationContextAware
{
    private static ApplicationContext context;
    
    public SpringContextHelper() {
        super();
    }
    
    public void setApplicationContext(final ApplicationContext context) throws BeansException {
        SpringContextHelper.context = context;
        final String[] names = context.getBeanDefinitionNames();
        System.out.println(Arrays.toString(names));
    }
    
    public static Object getBean(final String beanId) {
        return SpringContextHelper.context.getBean(beanId);
    }
}
