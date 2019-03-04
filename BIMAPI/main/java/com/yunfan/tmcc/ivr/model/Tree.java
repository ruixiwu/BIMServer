package com.yunfan.tmcc.ivr.model;

import com.alibaba.fastjson.JSON;
import java.util.ArrayList;
import java.util.Map;
import java.util.List;
import com.alibaba.fastjson.annotation.JSONField;

public class Tree<T>
{
    private String id;
    private String text;
    private String parentId;
    private String idText;
    @JSONField(serialize = false)
    private String state;
    @JSONField(serialize = false)
    private boolean checked;
    private List<Map<String, Object>> attributes;
    private List<Tree<T>> children;
    private boolean isParent;
    private boolean isChildren;
    
    public String getId() {
        return this.id;
    }
    
    public void setId(final String id) {
        this.id = id;
    }
    
    public String getText() {
        return this.text;
    }
    
    public void setText(final String text) {
        this.text = text;
    }
    
    public String getState() {
        return this.state;
    }
    
    public void setState(final String state) {
        this.state = state;
    }
    
    public boolean isChecked() {
        return this.checked;
    }
    
    public void setChecked(final boolean checked) {
        this.checked = checked;
    }
    
    public List<Map<String, Object>> getAttributes() {
        return this.attributes;
    }
    
    public void setAttributes(final List<Map<String, Object>> attributes) {
        this.attributes = attributes;
    }
    
    public List<Tree<T>> getChildren() {
        return this.children;
    }
    
    public void setChildren(final List<Tree<T>> children) {
        this.children = children;
    }
    
    public boolean isParent() {
        return this.isParent;
    }
    
    public void setParent(final boolean isParent) {
        this.isParent = isParent;
    }
    
    public boolean isChildren() {
        return this.isChildren;
    }
    
    public void setChildren(final boolean isChildren) {
        this.isChildren = isChildren;
    }
    
    public String getParentId() {
        return this.parentId;
    }
    
    public void setParentId(final String parentId) {
        this.parentId = parentId;
    }
    
    public String getIdText() {
        return this.idText;
    }
    
    public void setIdText(final String idText) {
        this.idText = idText;
    }
    
    public Tree(final String id, final String text, final String state, final boolean checked, final List<Map<String, Object>> attributes, final List<Tree<T>> children, final boolean isParent, final boolean isChildren, final String parentID) {
        super();
        this.state = "open";
        this.checked = false;
        this.children = new ArrayList<Tree<T>>();
        this.isParent = false;
        this.isChildren = false;
        this.id = id;
        this.text = text;
        this.state = state;
        this.checked = checked;
        this.attributes = attributes;
        this.children = children;
        this.isParent = isParent;
        this.isChildren = isChildren;
        this.parentId = parentID;
    }
    
    public Tree() {
        super();
        this.state = "open";
        this.checked = false;
        this.children = new ArrayList<Tree<T>>();
        this.isParent = false;
        this.isChildren = false;
    }
    
    public void addChild(final Tree<T> node) {
        this.children.add(node);
    }
    
    @Override
    public String toString() {
        return JSON.toJSONString(this);
    }
}
