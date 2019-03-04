package com.yunfan.tmcc.ivr.util;

import com.yunfan.tmcc.ivr.model.Tree;
import com.yunfan.tmcc.ivr.model.TreeNode;
import com.yunfan.tmcc.ivr.model.TreeNodeModel;
import org.apache.commons.lang3.StringUtils;

import java.util.*;

public class TreeUtil<T>
{
    public List<TreeNode> leafTreeNodes;
    public List<Tree<T>> list;
    
    public TreeUtil() {
        super();
        this.leafTreeNodes = new ArrayList<TreeNode>();
        this.list = new ArrayList<Tree<T>>();
    }
    
    public static <T> List<Tree<T>> intersection(final List<Tree<T>> treeNode, final List<Tree<T>> treeNode2) {
        if (treeNode == null || treeNode2 == null) {
            return null;
        }
        final List<Tree<T>> leafNodes =searchLeaf(treeNode);
        if (leafNodes == null || leafNodes.size() == 0) {
            return null;
        }
        final List<Tree<T>> leafNodes2 = searchLeaf(treeNode2);
        if (leafNodes2 == null || leafNodes2.size() == 0) {
            return null;
        }
        final List<Tree<T>> leafNodesSome = new ArrayList<Tree<T>>();
        for (final Tree<T> node : leafNodes) {
            final String nodeName = node.getText();
            for (final Tree<T> node2 : leafNodes2) {
                final String nodeName2 = node2.getText();
                if (nodeName.equals(nodeName2)) {
                    leafNodesSome.add(node);
                }
            }
        }
        return leafNodesSome;
    }
    
    public static <T> List<Tree<T>> getSomeList(final List<Tree<T>> treeNode, final List<Tree<T>> treeNode2) {
        if (treeNode == null || treeNode2 == null) {
            return null;
        }
        final List<Tree<T>> result = new ArrayList<Tree<T>>();
        final Map<String, Tree<T>> dtoMap = toMap(treeNode);
        System.out.println(dtoMap);
        final List<Tree<T>> someNodes = intersection(treeNode,treeNode2);
        if (someNodes == null) {
            return result;
        }
        for (final Tree<T> node : someNodes) {
            getParentList(result, dtoMap, node.getId());
        }
        final HashSet set = new HashSet(result);
        result.clear();
        result.addAll(set);
        result.addAll(someNodes);
        return result;
    }
    
    public static <T> void getParentList(final List<Tree<T>> result, final Map<String, Tree<T>> dtoMap, final String nodeId) {
        if (dtoMap == null) {
            return;
        }
        final Tree<T> nodeT = dtoMap.get(nodeId);
        final String pid = nodeT.getParentId();
        final Tree<T> nodeP = dtoMap.get(pid);
        if (nodeP != null) {
            result.add(nodeP);
            getParentList(result, dtoMap, nodeP.getId());
        }
    }
    
    public static <T> void getParentAndChildList(final List<Tree<T>> result, final List<Tree<T>> nodes, final Tree<T> node) {
        if (nodes == null) {
            return;
        }
        final String pid = node.getParentId();
        for (final Tree<T> tree : nodes) {
            final String id = tree.getId();
            if (pid.equals(id) || tree.getParentId().equals(node.getId())) {
                result.add(tree);
            }
        }
    }
    
    public static <T> void getListByName(List<Tree<T>> result, final List<Tree<T>> nodes, String name) {
        if (nodes == null) {
            return;
        }
        if (StringUtils.isBlank(name)) {
            result = nodes;
            return;
        }
        name = StringUtils.trim(name);
        for (final Tree<T> node : nodes) {
            if (StringUtils.containsIgnoreCase(node.getText(), name)) {
                result.add(node);
                getParentAndChildList(result, nodes, node);
            }
        }
    }
    
    public static <T> Map<String, Tree<T>> toMap(final List<Tree<T>> nodes) {
        if (nodes == null) {
            return null;
        }
        final Map<String, Tree<T>> dtoMap = new HashMap<String, Tree<T>>();
        for (final Tree<T> node : nodes) {
            dtoMap.put(node.getId(), node);
        }
        return dtoMap;
    }
    
    public static <T> List<Tree<T>> build(final List<Tree<T>> nodes) {
        if (nodes == null) {
            return null;
        }
        final Map<String, Tree<T>> dtoMap = new HashMap<String, Tree<T>>();
        for (final Tree<T> node : nodes) {
            dtoMap.put(node.getId(), node);
        }
        final List<Tree<T>> result = new ArrayList<Tree<T>>();
        for (final Map.Entry<String, Tree<T>> entry : dtoMap.entrySet()) {
            final Tree<T> node2 = entry.getValue();
            final String pid = node2.getParentId();
            if (pid == null || "".equals(pid) || "0".equals(pid) || "-1".equals(pid)) {
                node2.setChildren(true);
                node2.setParent(true);
                result.add(node2);
            }
            else {
                final Tree<T> nodeP = dtoMap.get(pid);
                if (nodeP == null) {
                    continue;
                }
                nodeP.setChildren(true);
                nodeP.setParent(true);
                nodeP.addChild(node2);
            }
        }
        return result;
    }
    
    public static <T> List<Tree<T>> searchLeaf(final List<Tree<T>> nodes) {
        if (nodes == null) {
            return null;
        }
        final Map<String, Tree<T>> dtoMap = new HashMap<String, Tree<T>>();
        for (final Tree<T> node : nodes) {
            dtoMap.put(node.getId(), node);
        }
        for (final Map.Entry<String, Tree<T>> entry : dtoMap.entrySet()) {
            final Tree<T> node2 = entry.getValue();
            final String pid = node2.getParentId();
            if (pid == null || "".equals(pid) || "0".equals(pid) || "-1".equals(pid)) {
                nodes.remove(node2);
            }
            else {
                final Tree<T> nodeP = dtoMap.get(pid);
                if (nodeP == null) {
                    continue;
                }
                nodes.remove(nodeP);
            }
        }
        return nodes;
    }
    
    public static void main(final String[] args) {
        final List<Tree<TreeNodeModel>> trees = new ArrayList<Tree<TreeNodeModel>>();
        final List<TreeNodeModel> TreeNodeModels = new ArrayList<TreeNodeModel>();
        TreeNodeModels.add(new TreeNodeModel("0", "", "关于本人"));
        TreeNodeModels.add(new TreeNodeModel("1", "0", "技术学习"));
        TreeNodeModels.add(new TreeNodeModel("2", "0", "兴趣"));
        TreeNodeModels.add(new TreeNodeModel("3", "1", "JAVA"));
        TreeNodeModels.add(new TreeNodeModel("4", "1", "oracle"));
        TreeNodeModels.add(new TreeNodeModel("5", "1", "spring"));
        TreeNodeModels.add(new TreeNodeModel("6", "1", "springmvc"));
        TreeNodeModels.add(new TreeNodeModel("7", "1", "fastdfs"));
        TreeNodeModels.add(new TreeNodeModel("8", "1", "linux"));
        TreeNodeModels.add(new TreeNodeModel("9", "2", "骑行"));
        TreeNodeModels.add(new TreeNodeModel("10", "2", "吃喝玩乐"));
        TreeNodeModels.add(new TreeNodeModel("11", "2", "学习"));
        TreeNodeModels.add(new TreeNodeModel("12", "3", "String"));
        TreeNodeModels.add(new TreeNodeModel("13", "4", "sql"));
        TreeNodeModels.add(new TreeNodeModel("14", "5", "ioc"));
        TreeNodeModels.add(new TreeNodeModel("15", "5", "aop"));
        TreeNodeModels.add(new TreeNodeModel("16", "1", "等等"));
        TreeNodeModels.add(new TreeNodeModel("17", "2", "等等"));
        TreeNodeModels.add(new TreeNodeModel("18", "3", "等等"));
        TreeNodeModels.add(new TreeNodeModel("19", "4", "等等"));
        TreeNodeModels.add(new TreeNodeModel("20", "5", "等等"));
        for (final TreeNodeModel TreeNodeModel : TreeNodeModels) {
            final Tree<TreeNodeModel> tree = new Tree<TreeNodeModel>();
            tree.setId(TreeNodeModel.getId());
            tree.setParentId(TreeNodeModel.getPid());
            tree.setText(TreeNodeModel.getText());
            trees.add(tree);
        }
        final List<Tree<TreeNodeModel>> trees2 = new ArrayList<Tree<TreeNodeModel>>();
        final List<TreeNodeModel> TreeNodeModels2 = new ArrayList<TreeNodeModel>();
        TreeNodeModels2.add(new TreeNodeModel("0", "", "关于本人"));
        TreeNodeModels2.add(new TreeNodeModel("1", "0", "技术学习"));
        TreeNodeModels2.add(new TreeNodeModel("2", "0", "兴趣"));
        TreeNodeModels2.add(new TreeNodeModel("3", "1", "JAVA"));
        TreeNodeModels2.add(new TreeNodeModel("4", "1", "oracle"));
        TreeNodeModels2.add(new TreeNodeModel("5", "1", "spring"));
        TreeNodeModels2.add(new TreeNodeModel("6", "1", "springmvc"));
        TreeNodeModels2.add(new TreeNodeModel("7", "1", "fastdfs"));
        for (final TreeNodeModel TreeNodeModel2 : TreeNodeModels2) {
            final Tree<TreeNodeModel> tree2 = new Tree<TreeNodeModel>();
            tree2.setId(TreeNodeModel2.getId());
            tree2.setParentId(TreeNodeModel2.getPid());
            tree2.setText(TreeNodeModel2.getText());
            trees2.add(tree2);
        }
        final List<Tree<TreeNodeModel>> t4 = TreeUtil.<TreeNodeModel>getSomeList(trees, trees2);
        System.out.println(t4);
    }
}
