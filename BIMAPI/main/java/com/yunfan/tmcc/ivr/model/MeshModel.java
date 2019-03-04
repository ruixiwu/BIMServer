package com.yunfan.tmcc.ivr.model;

import java.util.List;

public class MeshModel
{
    private String sName;
    private int sMaterialId;
    private List<AccessorModel> accList;
    
    public MeshModel() {
        super();
    }
    
    public String getsName() {
        return this.sName;
    }
    
    public void setsName(final String sName) {
        this.sName = sName;
    }
    
    public int getsMaterialId() {
        return this.sMaterialId;
    }
    
    public void setsMaterialId(final int sMaterialId) {
        this.sMaterialId = sMaterialId;
    }
    
    public List<AccessorModel> getAccList() {
        return this.accList;
    }
    
    public void setAccList(final List<AccessorModel> accList) {
        this.accList = accList;
    }
}
