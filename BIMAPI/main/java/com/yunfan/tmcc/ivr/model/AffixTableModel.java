package com.yunfan.tmcc.ivr.model;

public class AffixTableModel
{
    private Integer OBJECTID;
    private String NAME;
    private String TYPE;
    private String AFFIXFILEID;
    private String TABLENAME;
    
    public AffixTableModel() {
        super();
    }
    
    public Integer getOBJECTID() {
        return this.OBJECTID;
    }
    
    public void setOBJECTID(final Integer oBJECTID) {
        this.OBJECTID = oBJECTID;
    }
    
    public String getNAME() {
        return this.NAME;
    }
    
    public void setNAME(final String nAME) {
        this.NAME = nAME;
    }
    
    public String getTYPE() {
        return this.TYPE;
    }
    
    public void setTYPE(final String tYPE) {
        this.TYPE = tYPE;
    }
    
    public String getAFFIXFILEID() {
        return this.AFFIXFILEID;
    }
    
    public void setAFFIXFILEID(final String aFFIXFILEID) {
        this.AFFIXFILEID = aFFIXFILEID;
    }
    
    public String getTABLENAME() {
        return this.TABLENAME;
    }
    
    public void setTABLENAME(final String tABLENAME) {
        this.TABLENAME = tABLENAME;
    }
}
