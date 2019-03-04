function controlUI(a) {
	this._divId = a;
	this.treeMgr = this.attrsMgr = this.ToolbarClickLeft = null
}
controlUI.prototype.ToolbarLeftClickFun = function (a) {
	this.ToolbarClickLeft = a
};
controlUI.prototype.getprojectUrl = function (a, d, e) {
	$.ajax({
		type: "get",
		url: a + "/projectaffix/query",
		dataType: "json",
		data: {
			nProjectId: d
		},
		complete: function (a, b) {},
		success: function (a) {
			e && e(a)
		},
		error: function (a, b, c) {}
	})
};
controlUI.prototype.setPath = function (a) {
	a ? this.setLoadUrl(a, -1, !0) : this.setLoadUrl("SSH/3d.svf", -1, !0)
};
controlUI.prototype.setProjectId = function (a, d) {
	var e = this;
	this.getprojectUrl(a, d, function (a) {
		1 == a.success && e.setLoadUrl(a.data, d, !1)
	})
};
controlUI.prototype.setLoadUrl = function (a, d, e) {
	function f() {
		c.getToolbar(!1).setVisible(!1);

        $("#cont").html('<div id="rMenu" class="right_Menu">' +
            '<ul><li id="m_isolate">隔离对象</li>' +
            '<li id="m_select">选中对象</li>' +
            '<li id="m_local">快速定位</li>' +
            '<li id="m_clear">清除选择</li>' +
            '<li id="m_showall">全部显示</li>' +
            '<li id="m_allshop">加入购物车</li></ul>' +
            '</div>' +
            '<div class="tools-bar">' +
            '<div class="tools-bar_group general-menu">' +
            '<a href="javascript:void(0);" class="tool-bar_item" id="_LayerId" title="场景树"><i class="bimicon bim-toolbar-organize"></i></a>' +
            '<a href="javascript:void(0);" class="tool-bar_item" id="_LookId" title="动态观察"><i class="bimicon bim-toolbar-dynamic2"></i></a>' +
            '<a href="javascript:void(0);" class="tool-bar_item" id="_PanId" title="平移"><i class="bimicon bim-toolbar-translation"></i></a>' +
            '<a href="javascript:void(0);" class="tool-bar_item" id="_ProId" title="属性"><i class="bimicon bim-toolbar-attr"></i></a>' +
            '<a href="javascript:void(0);" class="tool-bar_item" id="_FSId" title="全屏"><i class="bimicon bim-toolbar-fullscreen"></i></a>' +
            '</div>' +
            '<div class="tools-bar_group additional-menu">' +
            '<a href="javascript:void(0);" class="tool-bar_item" id="6" title="选购构件"><i class="bimicon bim-toolbar-decomposition-model"></i></a>' +
            '<a href="javascript:void(0);" class="tool-bar_item" id="7" title="构件清单"><i class="bimicon bim-toolbar-length-measurement"></i></a>' +
            '</div>' +
            '</div>' +
            '<div class="slide-bar">' +
            '<div class="slide-bar_LayerId">' +
            '<div class="slide-bar_header">' +
            '<a href="javascript:void(0);" class="slide-bar_headeritem" id="resetID"><i class="bimicon bim-toolbar-reset"></i> 重置</a>' +
            '<a href="javascript:void(0);" class="slide-bar_headeritem" id="emptyID"><i class="bimicon bim-toolbar-empty"></i> 清空       </a>' +
            '<a href="javascript:void(0);" class="slide-bar_headeritem" id="othersID"><i class="fa fa-check-square-o"></i> 查看其他       </a>  ' +
            '<a href="javascript:void(0);" class="slide-bar_headeritem close_slider"><i class="fa fa-times"></i></a>' +
            '</div>\t' +
            '<div class="slide-bar_body">\t\t<ul id="tree" class="ztree" style="width:100%;"></ul>\t</div>' +
            '</div>' +
            '<div class="slide-bar_LookId">\t' +
            '<div class="slide-bar_header">\t\t' +
            '<h2 class="title">动态观察</h2>\t\t' +
            '<a href="javascript:void(0);" class="slide-bar_headeritem close_slider">\t\t\t<i class="fa fa-times"></i>\t\t</a>\t' +
            '</div>\t' +
            '<div class="slide-bar_body">\t\t' +
            '<div id="fun"></div>\t' +
            '</div>' +
            '</div>' +
            '<div class="slide-bar_PanId">\t' +
            '<div class="slide-bar_header">\t\t' +
            '<h2 class="title">平移</h2>\t\t' +
            '<a href="javascript:void(0);" class="slide-bar_headeritem close_slider">\t\t\t<i class="fa fa-times"></i>\t\t</a>\t' +
            '</div>\t' +
            '<div class="slide-bar_body">\t</div>' +
            '</div>' +
            '<div class="slide-bar_ProId">\t' +
            '<div class="slide-bar_header">\t\t<h2 class="title">属性</h2>\t\t<a href="javascript:void(0);" class="slide-bar_headeritem close_slider">\t\t\t<i class="fa fa-times"></i>\t\t</a>\t' +
            '</div>\t' +
            '<div class="slide-bar_body">\t</div>' +
            '</div>' +
            '</div>');

		$(function () {
			var a = $(window).height();
			$(".slide-bar").css("height", a - 88);
			$(".slide-bar .slide-bar_body").css("height", a - 88 - 45);
			var d;
			$(".tools-bar a.tool-bar_item").bind("click", function (a) {
				a = d = $(this).attr("id");
				switch (a) {
				case "_LayerId":
					null == b.treeMgr && (b.treeMgr = new ModeBrowerUI(c));
					$(".slide-bar").addClass("open");
					$(".slide-bar" + a).show();
					$(".slide-bar" + a).siblings().hide();
					break;
				case "_LookId":
					b.getNavigationToolUI(c).setNavigationState("fusion orbit");
					$("#_LookId").toggleClass("selected");
					$("#_LookId").next().removeClass("selected");
					break;
				case "_PanId":
					b.getNavigationToolUI(c).setNavigationState("pan");
					$("#_PanId").toggleClass("selected");
					$("#_PanId").prev().removeClass("selected");
					break;
				case "_ProId":
					$(".slide-bar").addClass("open");
					$(".slide-bar" + a).show();
					$(".slide-bar" + a).siblings().hide();
					null == b.attrsMgr && (b.attrsMgr = new PropertyBrowerUI(c));
					a = c.getSelection();
					b.attrsMgr.getPro(a);
					break;
				case "_FSId":
					$(".slide-bar").addClass("open");
					$(".slide-bar_ProId").show();
					$(".slide-bar_ProId").siblings().hide();
					c.setScreenMode(2);
					break;
				case "6":
					null != b.ToolbarClickLeft && b.ToolbarClickLeft("6");
					break;
				case "7":
					null != b.ToolbarClickLeft && b.ToolbarClickLeft("7");
					break;
				default:
					null != b.ToolbarClickLeft && b.ToolbarClickLeft(a)
				}
			});
			$(".slide-bar a.close_slider").bind("click", function () {
				$(this).parent().parent().hide();
				$(".slide-bar").removeClass("open")
			});
			$("#m_isolate").bind("click", function () {
				b.treeMgr.onIsolate()
			});
			$("#m_select").bind("click", function () {
				b.treeMgr.onSelect()
			});
			$("#m_local").bind("click", function () {
				b.treeMgr.onLocal()
			});
			$("#m_clear").bind("click", function () {
				b.treeMgr.onClear()
			});
			$("#m_showall").bind("click", function () {
				b.treeMgr.onShowall()
			});
			$("#m_allshop").bind("click", function () {
				null != b.ToolbarClickLeft && b.ToolbarClickLeft("tree-shop")
			});
			$("#resetID").bind("click", function () {
				b.treeMgr.selectAll(!0)
			});
			$("#emptyID").bind("click", function () {
				b.treeMgr.selectAll(!1)
			});
			$("#othersID").bind("click", function () {
				b.treeMgr.setReverseSelection(!0)
			})
		})
	}
	var b = this,
	c = this.viewer = new BimFish.Viewing.Private.GuiViewer3D(document.getElementById(this._divId), this.config);
	BimFish.Viewing.Initializer(this.options, function () {
		c.initialize();
		c.load(a, null, f)
	})
};
controlUI.prototype.getNavigationToolUI = function (a) {
	null == this.navigationMgr && (this.navigationMgr = new NavigationToolUI(a));
	return this.navigationMgr
};
controlUI.prototype.getCurTreeSelectId = function () {
	if (this.treeMgr)
		return this.treeMgr.getCurSelNodeIds();
	alert("\u6a21\u578b\u6811\u672a\u663e\u793a!");
	return null
};
controlUI.prototype.getCurSceneSelectId = function () {
	return this.viewer.getSelection()
};
controlUI.prototype.fitToView = function (a) {
	this.viewer && this.viewer.fitToView(a)
};
controlUI.prototype.getObjectGuid = function (a, d) {
	this.viewer.getProperties(a, function (a) {
		d(a.externalId)
	})
};
