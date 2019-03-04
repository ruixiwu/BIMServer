package com.yunfan.tmcc.ivr.model;

import java.util.List;

public class MaterialtableParaModel
{
    private String sName;
    private String sTechdes;
    private String sAmbient;
    private String sEmission;
    private String sShininess;
    private String sSpecular;
    private String sDiffuse;
    private List<TexturesParaModel> texList;
    
    public MaterialtableParaModel() {
        super();
    }
    
    public String getsName() {
        return this.sName;
    }
    
    public void setsName(final String sName) {
        this.sName = sName;
    }
    
    public String getsTechdes() {
        return this.sTechdes;
    }
    
    public void setsTechdes(final String sTechdes) {
        this.sTechdes = sTechdes;
    }
    
    public String getsAmbient() {
        return this.sAmbient;
    }
    
    public void setsAmbient(final String sAmbient) {
        this.sAmbient = sAmbient;
    }
    
    public String getsEmission() {
        return this.sEmission;
    }
    
    public void setsEmission(final String sEmission) {
        this.sEmission = sEmission;
    }
    
    public String getsShininess() {
        return this.sShininess;
    }
    
    public void setsShininess(final String sShininess) {
        this.sShininess = sShininess;
    }
    
    public String getsSpecular() {
        return this.sSpecular;
    }
    
    public void setsSpecular(final String sSpecular) {
        this.sSpecular = sSpecular;
    }
    
    public String getsDiffuse() {
        return this.sDiffuse;
    }
    
    public void setsDiffuse(final String sDiffuse) {
        this.sDiffuse = sDiffuse;
    }
    
    public List<TexturesParaModel> getTexList() {
        return this.texList;
    }
    
    public void setTexList(final List<TexturesParaModel> texList) {
        this.texList = texList;
    }
}
