package com.yunfan.tmcc.ivr.model;

public class FamilyModel
{
    private String sCategory;
    private String sFamilyName;
    private String sName;
    private String sDescribe;
    
    public FamilyModel() {
        super();
    }
    
    public String getsCategory() {
        return this.sCategory;
    }
    
    public void setsCategory(final String sCategory) {
        this.sCategory = sCategory;
    }
    
    public String getsFamilyName() {
        return this.sFamilyName;
    }
    
    public void setsFamilyName(final String sFamilyName) {
        this.sFamilyName = sFamilyName;
    }
    
    public String getsName() {
        return this.sName;
    }
    
    public void setsName(final String sName) {
        this.sName = sName;
    }
    
    public String getsDescribe() {
        return this.sDescribe;
    }
    
    public void setsDescribe(final String sDescribe) {
        this.sDescribe = sDescribe;
    }
}
