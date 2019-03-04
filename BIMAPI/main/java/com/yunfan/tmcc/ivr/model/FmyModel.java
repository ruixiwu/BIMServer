package com.yunfan.tmcc.ivr.model;

public class FmyModel extends BaseModel
{
    private String sSection;
    private String sName;
    private String sValue;
    private String sUnit;
    private String sType;
    private String sMainId;
    
    public FmyModel() {
        super();
    }
    
    public String getsSection() {
        return this.sSection;
    }
    
    public void setsSection(final String sSection) {
        this.sSection = sSection;
    }
    
    public String getsName() {
        return this.sName;
    }
    
    public void setsName(final String sName) {
        this.sName = sName;
    }
    
    public String getsValue() {
        return this.sValue;
    }
    
    public void setsValue(final String sValue) {
        this.sValue = sValue;
    }
    
    public String getsUnit() {
        return this.sUnit;
    }
    
    public void setsUnit(final String sUnit) {
        this.sUnit = sUnit;
    }
    
    public String getsType() {
        return this.sType;
    }
    
    public void setsType(final String sType) {
        this.sType = sType;
    }
    
    public String getsMainId() {
        return this.sMainId;
    }
    
    public void setsMainId(final String sMainId) {
        this.sMainId = sMainId;
    }
}
