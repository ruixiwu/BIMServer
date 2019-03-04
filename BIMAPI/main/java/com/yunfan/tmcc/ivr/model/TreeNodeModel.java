package com.yunfan.tmcc.ivr.model;

public class TreeNodeModel
{
    private String id;
    private String pid;
    private String text;
    
    public String getId() {
        return this.id;
    }
    
    public void setId(final String id) {
        this.id = id;
    }
    
    public String getPid() {
        return this.pid;
    }
    
    public void setPid(final String pid) {
        this.pid = pid;
    }
    
    public String getText() {
        return this.text;
    }
    
    public void setText(final String text) {
        this.text = text;
    }
    
    public TreeNodeModel(final String id, final String pid, final String text) {
        super();
        this.id = id;
        this.pid = pid;
        this.text = text;
    }
    
    public TreeNodeModel() {
        super();
    }
    
    @Override
    public String toString() {
        return "Test [id=" + this.id + ", pid=" + this.pid + ", text=" + this.text + "]";
    }
}
