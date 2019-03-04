package com.yunfan.tmcc.ivr.model;

public class TreeNodeLKApiModel
{
    private String no;
    private String parent_no;
    private String name;
    private String id;
    
    public TreeNodeLKApiModel() {
        super();
    }
    
    public String getNo() {
        return this.no;
    }
    
    public void setNo(final String no) {
        this.no = no;
    }
    
    public String getParent_no() {
        return this.parent_no;
    }
    
    public void setParent_no(final String parent_no) {
        this.parent_no = parent_no;
    }
    
    public String getName() {
        return this.name;
    }
    
    public void setName(final String name) {
        this.name = name;
    }
    
    public String getId() {
        return this.id;
    }
    
    public void setId(final String id) {
        this.id = id;
    }
}
