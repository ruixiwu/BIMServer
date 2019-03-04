package com.yunfan.tmcc.ivr.model;

public class ModelPrp extends BaseModel
{
    private String sSection;
    private String sName;
    private String sValue;
    private String sUnit;
    private Long lType;
    private Long lGeoId;
    
    public ModelPrp() {
        super();
    }
    
    public String getSection() {
        return this.sSection;
    }
    
    public void setSection(final String sSection) {
        this.sSection = sSection;
    }
    
    public String getName() {
        return this.sName;
    }
    
    public void setName(final String sName) {
        this.sName = sName;
    }
    
    public String getValue() {
        return this.sValue;
    }
    
    public void setValue(final String sValue) {
        this.sValue = sValue;
    }
    
    public String getUnit() {
        return this.sUnit;
    }
    
    public void setsUnit(final String sUnit) {
        this.sUnit = sUnit;
    }
    
    public Long getType() {
        return this.lType;
    }
    
    public void setType(final Long lType) {
        this.lType = lType;
    }
    
    public Long getGeoId() {
        return this.lGeoId;
    }
    
    public void setGeoId(final Long lGeoId) {
        this.lGeoId = lGeoId;
    }
}
