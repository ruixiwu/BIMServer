function ModeBrowerUI(a) {
    function b(a) {
        "rMenu" == a.target.id || 0 < $(a.target).parents("#rMenu").length || c.rMenu.css({visibility: "hidden"})
    }

    this.viewer = a;
    this.instanceTree = this.viewer.model.getData().instanceTree;
    this.nodeIdToNode = {};
    this.zNodeDatas = [];
    this.rMenu = this._curSelTreeNode = null;
    this.clickConfig = {
        click: {onObject: ["isolate"]},
        show: {onObject: ["show"]},
        hide: {onObject: ["hide"]},
        isolate: {onObject: ["isolate"]},
        focus: {onObject: ["focus"]},
        select: {onObject: ["selectOnly"]},
        deselectAll: {onObject: ["deselectAll"]},
        showAll: {onObject: ["showAll"]},
        clickCtrl: {onObject: ["toggleVisibility"]}
    };
    var c = this;
    this.createData();
    this.zTree = $.fn.zTree;
    this.zTree.init($("#tree"), {
        view: {selectedMulti: !1},
        check: {enable: !0},
        data: {simpleData: {enable: !0}},
        edit: {enable: !1},
        callback: {
            beforeCheck: function (a, b) {
                return !0
            }, onRightClick: function (a, e, f) {
                $("#tree").hide();
                f || "button" == a.target.tagName.toLowerCase() || 0 != $(a.target).parents("a").length ? f && !f.noR && (c.treeObj.selectNode(f), e = a.clientX, a = a.clientY, $("#rMenu ul").show(), $("#m_del").show(), $("#m_edit").show(), $("#m_left").show(), $("#m_right").show(), $("#m_up").show(), $("#m_down").show(), $("#m_add").removeClass("mboder"), c.rMenu.css({
                    "z-index": "99999999",
                    top: a + "px",
                    left: e + "px",
                    visibility: "visible"
                }), $("body").bind("mousedown", b), c._curSelTreeNode = f) : c.treeObj.cancelSelectedNode();
                $("#tree").show()
            }, onCheck: function (a, b, f) {
                c.onClick(f, a)
            }
        }
    }, this.zNodeDatas);
    this.rMenu = $("#rMenu");
    this.treeObj = this.zTree.getZTreeObj("tree")
}

ModeBrowerUI.prototype.createData = function () {
    var a = this, b = a.instanceTree;
    if (b) {
        a.selectedNodes = [];
        if (a.treeObj) {
            var c = a.treeObj.getNodeByTId("1");
            a.treeObj.removeNode(c)
        }
        b = b.getRootId();
        this.myDelegate = function () {
            var b = new avu.TreeDelegate;
            b.getTreeNodeId = function (a) {
                return "object" == typeof a ? (avp.logger.warn("Object used instead of dbId. Fix it."), a.dbId) : a
            };
            b.getTreeNodeLabel = function (b) {
                b = this.getTreeNodeId(b);
                return a.instanceTree.getNodeName(b) || "Object " + b
            };
            b.getTreeNodeClass = function (b) {
                return a.getNodeClass(b)
            };
            b.isTreeNodeGroup = function (b) {
                return a.isGroupNode(b)
            };
            b.shouldCreateTreeNode = function (b) {
                return a.shouldInclude(b)
            };
            b.onTreeNodeClick = function (b, c, d) {
                a.onClick(c, d)
            };
            b.onTreeNodeRightClick = function (b, c, d) {
                a.onRightClick(c, d)
            };
            b.onTreeNodeDoubleClick = function (b, c, d) {
                a.onDoubleClick(c, d)
            };
            b.onTreeNodeIconClick = function (b, c, d) {
                a.onIconClick(c, d)
            };
            b.forEachChild = function (b, c) {
                var d = this.getTreeNodeId(b);
                a.instanceTree.enumNodeChildren(d, c)
            };
            b.onTreeNodeHover = function (b, c, d) {
                a.onHover(c, d)
            };
            return b
        }();
        this.createData_(b, 0, 0)
    }
};
ModeBrowerUI.prototype.createData_ = function (a, b, c) {
    if (!a || !this.myDelegate.shouldCreateTreeNode(a)) return null;
    var d = this;
    b = function (a, b, c) {
        var f = d.myDelegate.getTreeNodeId(b);
        b = d.getNodeLabel(b);
        var e = !0;
        1 <= c && (e = !1);
        return {id: f, pId: a, name: b, open: e, checked: !0}
    }(b, a, c);
    this.zNodeDatas.push(b);
    var e = d.myDelegate.getTreeNodeId(a);
    d.myDelegate.isTreeNodeGroup(a) && d.myDelegate.forEachChild(a, function (a) {
        d.createData_(a, e, c + 1)
    });
    return b
};
ModeBrowerUI.prototype.getNodeLabel = function (a) {
    return this.myDelegate.getTreeNodeLabel(a)
};
ModeBrowerUI.prototype.getNodeClass = function (a) {
    return ""
};
ModeBrowerUI.prototype.isGroupNode = function (a) {
    a = this.myDelegate.getTreeNodeId(a);
    return this.instanceTree.getChildCount(a)
};
ModeBrowerUI.prototype.shouldInclude = function (a) {
    return !0
};
ModeBrowerUI.prototype.onClick = function (a, b) {
    var c = a.id, d;
    d = a.checked ? "show" : "hide";
    this.clickConfig && this.clickConfig[d] ? this.handleAction(this.clickConfig[d].onObject, c) : this.viewer.select(c)
};
ModeBrowerUI.prototype.onDoubleClick = function (a, b) {
};
ModeBrowerUI.prototype.handleAction = function (a, b) {
    for (var c in a) switch (a[c]) {
        case "selectOnly":
            this.viewer.select(b);
            break;
        case "deselectAll":
            this.viewer.select([]);
            break;
        case "selectToggle":
            this.viewer.toggleSelect(b);
            break;
        case "isolate":
            this.viewer.isolate(b);
            break;
        case "showAll":
            this.selectAll(!0);
            break;
        case "focus":
            this.viewer.fitToView([b]);
            break;
        case "hide":
            this.viewer.hide(b);
            break;
        case "show":
            this.viewer.show(b);
            break;
        case "toggleVisibility":
            this.viewer.toggleVisibility(b)
    }
    this._curSelTreeNode = null
};
ModeBrowerUI.prototype.onIconClick = function (a, b) {
    this.setGroupCollapsed(a, !this.isGroupCollapsed(a))
};
ModeBrowerUI.prototype.setGroupCollapsed = function (a, b) {
    this.tree.delegate().isTreeNodeGroup(a) && (this.tree.setCollapsed(a, b), this.resizeToContent())
};
ModeBrowerUI.prototype.isGroupCollapsed = function (a) {
    return this.tree.delegate().isTreeNodeGroup(a) ? this.tree.isCollapsed(a) : !1
};
ModeBrowerUI.prototype.onRightClick = function (a, b) {
};
ModeBrowerUI.prototype.onTitleClick = function (a) {
};
ModeBrowerUI.prototype.onTitleDoubleClick = function (a) {
};
ModeBrowerUI.prototype.onHover = function (a, b) {
};
ModeBrowerUI.prototype.getLeftNodes = function (a, b, c) {
    if (a) if (void 0 == a.children || 0 == a.children.length) 1 == a.checked ? b.push(a) : c.push(a); else for (var d = 0; d < a.children.length; ++d) this.getLeftNodes(a.children[d], b, c)
};
ModeBrowerUI.prototype.setReverseSelection = function () {
    if (this.treeObj) {
        for (var a = this.treeObj.getNodes(), b = [], c = [], d = 0; d < a.length; ++d) {
            var e = a[d];
            this.getLeftNodes(e, b, c)
        }
        a = [];
        for (d = 0; d < c.length; ++d) e = c[d], a.push(e.id);
        this.selectAll(!1);
        for (d = 0; d < c.length; ++d) this.treeObj.checkNode(c[d], !0, !0);
        this.viewer.show(a)
    }
};
ModeBrowerUI.prototype.getContentSize = function () {
    var a = this.tree;
    return a && (a = a.getRootContainer()) ? {
        height: a.clientHeight + this.options.heightAdjustment + 35,
        width: a.clientWidth
    } : {height: 0, width: 0}
};
ModeBrowerUI.prototype.isolateSelection = function (a) {
    null != this._curSelTreeNode && (a = this._curSelTreeNode.id, this.treeObj.checkAllNodes(!1), this.treeObj.checkNode(this._curSelTreeNode, !0, !0), this.viewer.isolate(a), this.viewer.fitToView(a), this.rMenu && this.rMenu.css({visibility: "hidden"}))
};
ModeBrowerUI.prototype.selectAll = function (a) {
    1 == a ? (this.treeObj.checkAllNodes(!0), a = this.instanceTree.getRootId(), this.handleAction(this.clickConfig.show.onObject, a)) : (this.treeObj.checkAllNodes(!1), a = this.instanceTree.getRootId(), this.handleAction(this.clickConfig.hide.onObject, a))
};
ModeBrowerUI.prototype.removeClass = function (a, b) {
    return null !== this.tree && this.tree.removeClass(a, b)
};
ModeBrowerUI.prototype.onMakeFun = function (a) {
    if (null != this._curSelTreeNode) {
        var b = this._curSelTreeNode.id;
        this.clickConfig && this.clickConfig[a] && this.handleAction(this.clickConfig[a].onObject, b);
        this.rMenu && this.rMenu.css({visibility: "hidden"})
    }
};
ModeBrowerUI.prototype.onIsolate = function () {
    this.isolateSelection()
};
ModeBrowerUI.prototype.onSelect = function () {
    this.onMakeFun("select")
};
ModeBrowerUI.prototype.onLocal = function () {
    this.onMakeFun("focus")
};
ModeBrowerUI.prototype.onClear = function () {
    this.onMakeFun("deselectAll")
};
ModeBrowerUI.prototype.onShowall = function () {
    this.onMakeFun("showAll")
};
ModeBrowerUI.prototype.onAllshop = function () {
    alert("加入购物车")
};
ModeBrowerUI.prototype.getCurSelNodeIds = function (a) {
    a = this.treeObj.getSelectedNodes();
    if (0 != a.length) {
        var b = a[0];
        a = [];
        var c = [];
        b && this.getLeftNodes(b, a, c);
        for (b = 0; b < c.length; ++b) a.push(c[b]);
        c = [];
        for (b = 0; b < a.length; ++b) c.push(a[b].id);
        return c
    }
};