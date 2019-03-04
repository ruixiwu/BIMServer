package com.yunfan.tmcc.ivr.model;

import java.util.List;

public class MaterialtableModel extends BaseModel
{
    private String Name;
    private String Techdes;
    private String Ambient;
    private String Emission;
    private String Shininess;
    private String Specular;
    private String Diffuse;
    private List<TexturesModel> texList;
    
    public MaterialtableModel() {
        super();
    }
    
    public String getName() {
        return this.Name;
    }
    
    public void setName(final String name) {
        this.Name = name;
    }
    
    public String getTechdes() {
        return this.Techdes;
    }
    
    public void setTechdes(final String techdes) {
        this.Techdes = techdes;
    }
    
    public String getAmbient() {
        return this.Ambient;
    }
    
    public void setAmbient(final String ambient) {
        this.Ambient = ambient;
    }
    
    public String getEmission() {
        return this.Emission;
    }
    
    public void setEmission(final String emission) {
        this.Emission = emission;
    }
    
    public String getShininess() {
        return this.Shininess;
    }
    
    public void setShininess(final String shininess) {
        this.Shininess = shininess;
    }
    
    public String getSpecular() {
        return this.Specular;
    }
    
    public void setSpecular(final String specular) {
        this.Specular = specular;
    }
    
    public String getDiffuse() {
        return this.Diffuse;
    }
    
    public void setDiffuse(final String diffuse) {
        this.Diffuse = diffuse;
    }
    
    public List<TexturesModel> getTexList() {
        return this.texList;
    }
    
    public void setTexList(final List<TexturesModel> texList) {
        this.texList = texList;
    }
}
