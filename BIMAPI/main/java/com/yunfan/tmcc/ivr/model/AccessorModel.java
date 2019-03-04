package com.yunfan.tmcc.ivr.model;

public class AccessorModel
{
    private String sType;
    private int sByteOffSet;
    private int sByteStride;
    private int sComponentType;
    private int sCount;
    private String sBFileId;
    private String sAccType;
    
    public AccessorModel() {
        super();
    }
    
    public String getsType() {
        return this.sType;
    }
    
    public void setsType(final String sType) {
        this.sType = sType;
    }
    
    public int getsByteOffSet() {
        return this.sByteOffSet;
    }
    
    public void setsByteOffSet(final int sByteOffSet) {
        this.sByteOffSet = sByteOffSet;
    }
    
    public int getsByteStride() {
        return this.sByteStride;
    }
    
    public void setsByteStride(final int sByteStride) {
        this.sByteStride = sByteStride;
    }
    
    public int getsComponentType() {
        return this.sComponentType;
    }
    
    public void setsComponentType(final int sComponentType) {
        this.sComponentType = sComponentType;
    }
    
    public int getsCount() {
        return this.sCount;
    }
    
    public void setsCount(final int sCount) {
        this.sCount = sCount;
    }
    
    public String getsBFileId() {
        return this.sBFileId;
    }
    
    public void setsBFileId(final String sBFileId) {
        this.sBFileId = sBFileId;
    }
    
    public String getsAccType() {
        return this.sAccType;
    }
    
    public void setsAccType(final String sAccType) {
        this.sAccType = sAccType;
    }
}
