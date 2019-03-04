var TreeNodeDelegate = function () {
};
TreeNodeDelegate.prototype.constructor = TreeNodeDelegate;
TreeNodeDelegate.prototype.isTreeNodeGroup = function (a) {
    throw"isTreeNodeGroup is not implemented.";
};
TreeNodeDelegate.prototype.getTreeNodeId = function (a) {
    throw"getTreeNodeId is not implemented.";
};
TreeNodeDelegate.prototype.getTreeNodeLabel = function (a) {
    return a.name
};
TreeNodeDelegate.prototype.shouldCreateTreeNode = function (a) {
    return !0
};
TreeNodeDelegate.prototype.forEachChild = function (a, b) {
    for (var c = a.children ? a.children.length : 0, d = 0; d < c; ++d) b(a.children[d])
};
TreeNodeDelegate.prototype.createTreeNode = function (a, b, c) {
    var d = document.createElement("label");
    b.appendChild(d);
    a = this.getTreeNodeLabel(a);
    c && c.localize && (d.setAttribute("data-i18n", a), a = Autodesk.Viewing.i18n.translate(a));
    d.textContent = a
};
TreeNodeDelegate.prototype.onTreeNodeClick = function (a, b, c) {
};
TreeNodeDelegate.prototype.onTreeNodeIconClick = function (a, b, c) {
    a.delegate().isTreeNodeGroup(b) && a.setCollapsed(b, !a.isCollapsed(b))
};
TreeNodeDelegate.prototype.onTreeNodeDoubleClick = function (a, b, c) {
};
TreeNodeDelegate.prototype.onTreeNodeRightClick = function (a, b, c) {
};
TreeNodeDelegate.prototype.getTreeNodeClass = function (a) {
    return ""
};
TreeNodeDelegate.prototype.onTreeNodeHover = function (a, b, c) {
};