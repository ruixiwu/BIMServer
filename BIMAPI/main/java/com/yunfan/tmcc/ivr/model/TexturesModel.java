package com.yunfan.tmcc.ivr.model;

public class TexturesModel extends BaseModel
{
    private String Name;
    private int Format;
    private int Magfilter;
    private int Minfilter;
    private int Wraps;
    private int Wrapt;
    private String Imagename;
    private String ImageKeyId;
    
    public TexturesModel() {
        super();
    }
    
    public String getName() {
        return this.Name;
    }
    
    public void setName(final String name) {
        this.Name = name;
    }
    
    public int getFormat() {
        return this.Format;
    }
    
    public void setFormat(final int format) {
        this.Format = format;
    }
    
    public int getMagfilter() {
        return this.Magfilter;
    }
    
    public void setMagfilter(final int magfilter) {
        this.Magfilter = magfilter;
    }
    
    public int getMinfilter() {
        return this.Minfilter;
    }
    
    public void setMinfilter(final int minfilter) {
        this.Minfilter = minfilter;
    }
    
    public int getWraps() {
        return this.Wraps;
    }
    
    public void setWraps(final int wraps) {
        this.Wraps = wraps;
    }
    
    public int getWrapt() {
        return this.Wrapt;
    }
    
    public void setWrapt(final int wrapt) {
        this.Wrapt = wrapt;
    }
    
    public String getImagename() {
        return this.Imagename;
    }
    
    public void setImagename(final String imagename) {
        this.Imagename = imagename;
    }
    
    public String getImageKeyId() {
        return this.ImageKeyId;
    }
    
    public void setImageKeyId(final String imageKeyId) {
        this.ImageKeyId = imageKeyId;
    }
}
