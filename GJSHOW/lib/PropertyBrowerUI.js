function PropertyBrowerUI(a) {
    this.viewer = a;
    var h = this;
    this.attrsPanel = new attrs({
        tool_attr: [{
            FieldName: "\u5176\u5b83",
            value: [{name: "\u65e0\u5c5e\u6027", FieldValue: "", IsAmend: !1}]
        }]
    });
    this.attrsPanel.init();
    h.viewer.addEventListener(BimFish.Viewing.SELECTION_CHANGED_EVENT, function (b) {
        b && 1 == b.dbIdArray.length && h.getPro(b.dbIdArray)
    })
}

PropertyBrowerUI.prototype.getNodeLabel = function (a) {
    return this.myDelegate.getTreeNodeLabel(a)
};
PropertyBrowerUI.prototype.getNodeClass = function (a) {
    return ""
};
PropertyBrowerUI.prototype.isGroupNode = function (a) {
    this.myDelegate.getTreeNodeId(a)
};
PropertyBrowerUI.prototype.shouldInclude = function (a) {
    return !0
};
PropertyBrowerUI.prototype.onClick = function (a, h) {
    var b = a.id, l;
    l = a.checked ? "show" : "hide";
    this.clickConfig && this.clickConfig[l] ? this.handleAction(this.clickConfig[l].onObject, b) : this.viewer.select(b)
};
PropertyBrowerUI.prototype.setGroupCollapsed = function () {
};
PropertyBrowerUI.prototype.isGroupCollapsed = function (a) {
    return !1
};
PropertyBrowerUI.prototype.getPro = function (a) {
    var h = this;
    this.viewer.getProperties(a[0], function (b) {
        b = b.properties;
        for (var a = [], e = 0; e < b.length; e++) {
            var c = b[e];
            if (!c.hidden) {
                var d = b[e].displayCategory;
                d && "string" === typeof d && "" !== d || (d = "\u5176\u5b83");
                for (var c = !1, g = 0; g < a.length; g++) if (a[g] == d) {
                    c = !0;
                    break
                }
                0 == c && a.push(d)
            }
        }
        g = [];
        for (e = 0; e < a.length; e++) {
            for (var d = a[e], m = {FieldName: d, value: []}, k = 0; k < b.length; k++) {
                var c = b[k], f = b[k].displayCategory;
                f && "string" === typeof f && "" !== f || (f = "\u5176\u5b83");
                f == d && (f = BimFish.Viewing.Private.formatValueWithUnits(c.displayValue, c.units, c.type), m.value.push({
                    name: c.displayName,
                    FieldValue: f,
                    IsAmend: !0
                }))
            }
            g.push(m)
        }
        h.attrsPanel.ToolAttr.AddSectionData(g)
    })
};