package com.yunfan.tmcc.ivr.model;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TreeNode
{
    public Map<String, Object> mapFieldValue;
    public List<TreeNode> children;
    
    public TreeNode() {
        super();
        this.mapFieldValue = new HashMap<String, Object>();
        this.children = null;
    }
}
