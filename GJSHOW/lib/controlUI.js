function controlUI(containerId) {
	this._divId = containerId;
	this.treeMgr = this.attrsMgr = this.ToolbarClickLeft = null
}
controlUI.prototype.ToolbarLeftClickFun = function (callback) {
	this.ToolbarClickLeft = callback
};
controlUI.prototype.getprojectUrl = function (basePath, modelId, callback) {
	$.ajax({
		type: "get",
		url: basePath + "/projectaffix/query",
		dataType: "json",
		data: {
			nProjectId: modelId
		},
		complete: function (a, b) {},
		success: function (resObj) {//resObj是从服务器端返回的一JSON对象， 其中resObj.data指"http://localhost:8080/BIMAPI/unzip/39/3d.svf"字符串
			callback && callback(resObj)
		},
		error: function (a, b, c) {}
	})
};
controlUI.prototype.setPath = function (a) {
	a ? this.setLoadUrl(a, -1, !0) : this.setLoadUrl("SSH/3d.svf", -1, !0)
};
controlUI.prototype.setProjectId = function (basePath, modelId) {
	var e = this;//this指controlUI,是个对象
	this.getprojectUrl(basePath, modelId, function (resObj) {
		1 == resObj.success && e.setLoadUrl(resObj.data, modelId, !1)
	})
};
controlUI.prototype.setLoadUrl = function (svfFileURL, d, e) {
	function func() {
        cGuiViewer3D.getToolbar(!1).setVisible(!1);

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
                '<a href="javascript:void(0);" class="slide-bar_headeritem" id="emptyID"><i class="bimicon bim-toolbar-empty"></i> 清空</a>' +
                '<a href="javascript:void(0);" class="slide-bar_headeritem" id="othersID"><i class="fa fa-check-square-o"></i> 查看其他</a>  ' +
                '<a href="javascript:void(0);" class="slide-bar_headeritem close_slider"><i class="fa fa-times"></i></a>' +
                '</div>\t' +
                '<div class="slide-bar_body">\t\t' +
                '<ul id="tree" class="ztree" style="width:100%;"></ul>\t' +
                '</div>' +
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
            '<div class="slide-bar_header">\t\t' +
			'<h2 class="title">属性</h2>\t\t' +
			'<a href="javascript:void(0);" class="slide-bar_headeritem close_slider">\t\t\t<i class="fa fa-times"></i>\t\t</a>\t' +
            '</div>\t' +
            '<div class="slide-bar_body">\t</div>' +
            '</div>' +
            '</div>');

		$(function () {
			var aWinHeight = $(window).height();
			$(".slide-bar").css("height", aWinHeight - 88);
			$(".slide-bar .slide-bar_body").css("height", aWinHeight - 88 - 45);
			var Id;
			$(".tools-bar a.tool-bar_item").bind("click", function (aAttrname) {
                aAttrname = Id = $(this).attr("id");
				switch (aAttrname) {
				case "_LayerId":
					null == bControlUI.treeMgr && (bControlUI.treeMgr = new ModeBrowerUI(cGuiViewer3D));
					$(".slide-bar").addClass("open");
					$(".slide-bar" + aAttrname).show();
					$(".slide-bar" + aAttrname).siblings().hide();
					break;
				case "_LookId":
                    bControlUI.getNavigationToolUI(cGuiViewer3D).setNavigationState("fusion orbit");
					$("#_LookId").toggleClass("selected");
					$("#_LookId").next().removeClass("selected");
					break;
				case "_PanId":
                    bControlUI.getNavigationToolUI(cGuiViewer3D).setNavigationState("pan");
					$("#_PanId").toggleClass("selected");
					$("#_PanId").prev().removeClass("selected");
					break;
				case "_ProId":
					$(".slide-bar").addClass("open");
					$(".slide-bar" + aAttrname).show();
					$(".slide-bar" + aAttrname).siblings().hide();
					null == bControlUI.attrsMgr && (bControlUI.attrsMgr = new PropertyBrowerUI(cGuiViewer3D));
                    aAttrname = cGuiViewer3D.getSelection();
                    bControlUI.attrsMgr.getPro(aAttrname);
					break;
				case "_FSId":
					$(".slide-bar").addClass("open");
					$(".slide-bar_ProId").show();
					$(".slide-bar_ProId").siblings().hide();
                    cGuiViewer3D.setScreenMode(2);
					break;
				case "6":
					null != bControlUI.ToolbarClickLeft && bControlUI.ToolbarClickLeft("6");
					break;
				case "7":
					null != bControlUI.ToolbarClickLeft && bControlUI.ToolbarClickLeft("7");
					break;
				default:
					null != bControlUI.ToolbarClickLeft && bControlUI.ToolbarClickLeft(svfFileURL)
				}
			});
			$(".slide-bar a.close_slider").bind("click", function () {
				$(this).parent().parent().hide();
				$(".slide-bar").removeClass("open")
			});
			$("#m_isolate").bind("click", function () {
                bControlUI.treeMgr.onIsolate()
			});
			$("#m_select").bind("click", function () {
                bControlUI.treeMgr.onSelect()
			});
			$("#m_local").bind("click", function () {
                bControlUI.treeMgr.onLocal()
			});
			$("#m_clear").bind("click", function () {
                bControlUI.treeMgr.onClear()
			});
			$("#m_showall").bind("click", function () {
                bControlUI.treeMgr.onShowall()
			});
			$("#m_allshop").bind("click", function () {
				null != bControlUI.ToolbarClickLeft && bControlUI.ToolbarClickLeft("tree-shop")
			});
			$("#resetID").bind("click", function () {
                bControlUI.treeMgr.selectAll(!0)
			});
			$("#emptyID").bind("click", function () {
                bControlUI.treeMgr.selectAll(!1)
			});
			$("#othersID").bind("click", function () {
                bControlUI.treeMgr.setReverseSelection(!0)
			})
		})
	}
	var bControlUI = this,//this指controlUI
	cGuiViewer3D = this.viewer = new BimKing.Viewing.Private.GuiViewer3D(document.getElementById(this._divId), this.config);
	BimKing.Viewing.Initializer(this.options, function () {
        cGuiViewer3D.initialize();
        cGuiViewer3D.load(svfFileURL, null, func)
	})
};
controlUI.prototype.getNavigationToolUI = function (a) {
	null == this.navigationMgr && (this.navigationMgr = new NavigationToolUI(a));
	return this.navigationMgr
};
controlUI.prototype.getCurTreeSelectId = function () {
	if (this.treeMgr)
		return this.treeMgr.getCurSelNodeIds();
	alert("模型树未显示!");
	return null
};
controlUI.prototype.getCurSceneSelectId = function () {
	return this.viewer.getSelection()
};
controlUI.prototype.fitToView = function (modelId) {
	this.viewer && this.viewer.fitToView(modelId)
};
controlUI.prototype.getObjectGuid = function (modelId, callback) {
	this.viewer.getProperties(modelId, function (a) {
	    //这里的a是getProperties的参数结果，作为后面第二个函数的参数，最终a.externalId传入到callback中
		callback(a.externalId)
	})
};
