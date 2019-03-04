//define(['jquery'], function($) {
//function ATTRS123(){
	 var attrs = function(opts) {
	 	var _this = this;
	 	var tools = $('<div>');
	 	//默认配置参数
        var config = {
            tool_attr: null, //属性
            ToolAttrId: 'ToolAttr'
        }
        if(opts && $.isPlainObject(opts)) { //默认参数扩展
            $.extend(config, opts);
        } else {
            this.isConfig = true; //没有传入配置参数
        }
        
         var ToolAppend = { //初始化默认插件
            AttrClick: function() { //属性点击事件
                var AttrId = $('.attr');
                var header_tit = AttrId.find('.header_tit');
                var attr_dropDown = header_tit.next('.attr_dropDown');
                var _close = AttrId.find('.close');
                var content = AttrId.find('.content');
                var _value = content.find('.value');
                var _input = content.find('input');
                var onespan = content.find('.onespan');

                header_tit.each(function(i) { //展开/折叠二级属性
                    GlobalTool.ToolShow(header_tit.eq(i), attr_dropDown.eq(i));
                });
                _value.each(function(i) { //显示输入框
                    var Amend = $(this).parent().attr('amend');
                    if(Amend == 'true') { //判断属性是否可修改
                        GlobalTool.ToolShow(_value.eq(i), content.eq(i));
                        _value.eq(i).bind('click', function() {
                            var _this_ = $(this).parent();
                            var Input = _this_.find('input');
                            Input.focus();
                        });
                    }
                });
                _input.focusout(function() {
                    var _this_ = $(this);
                    var _parent = _this_.parent().parent();
                    _parent.removeClass('active');
                });

                _input.change(function() { //数据改变保存数据
                    var _this_ = $(this);
                    var _parent = _this_.parent().parent();
                    var Value = _parent.find('.value');
                    var LevelIds = _parent.attr('levelid').split('_');
                    var name = _parent.find('.onespan').text();
                    var FieldValue = _this_.val();
                    var IsAmend = _parent.attr('.amend');
                    var header_tit = _parent.parent().parent().prev('.header_tit');
                    var _Json = {
                        'name': name,
                        'FieldValue': FieldValue,
                        'IsAmend': IsAmend
                    };
                    AttrId.attr('amend', true);
                    _parent.attr('isamend', true);
                    header_tit.attr('isamend', true);
                    GlobalTool.SetArray('Set', config.tool_attr, LevelIds, _Json); //修改Json 数据
                    console.log(config.tool_attr);
                    Value.text(FieldValue);
                });
            },
            tool_search: function(obj) { //全屏-搜索-属性
                var tool_class = 'tool-attr';
                $('.' + tool_class).remove();
                var tool = $('<div class="' + tool_class + '">');
                if(obj) {
                    var attrdiv = $('<div class="attr" Amend="false">');
                    var _ul = $('<ul>');
                    for(var i = 0; i < obj.length; i++) {
                        var item = obj[i];
                        var _li = $('<li><p class="header_tit" levelid="' + i + '" isAmend="false" title="' + item.FieldName + '"><i class="space"></i><span>' + item.FieldName + '</span></p></li>');
                        if(item.value) {
                            var _active = '';
                            if(i == 0) {
                                _active = 'active';
                            }
                            var _li_ul = $('<ul class="attr_dropDown ' + _active + '">');
                            for(var j = 0; j < item.value.length; j++) {
                                var itemtwo = item.value[j];
                                var _li_ul_li = $('<li><p class="content" levelid="' + i + '_' + j + '" Amend="' + itemtwo.IsAmend + '" isAmend="false" title="' + itemtwo.name + '"><i class="space"></i><span class="onespan" title="' + itemtwo.name + '">' + itemtwo.name + '</span><span class="value">' + itemtwo.FieldValue + '</span><span class="form-control"><input type="text" value="' + itemtwo.FieldValue + '"></span></p></li>');
                                _li_ul.append(_li_ul_li);
                            }
                            _li.append(_li_ul);
                        }
                        _ul.append(_li);
                    }
                    attrdiv.append(_ul);
                    tool.append(attrdiv);
                }
                tools.append(tool);

            }
            
         }
         var GlobalTool = { //全局函数
            ToolShow: function(Obj, Id, CallBack) { //展开/闭合插件
                Obj.unbind().bind('click', function(event) {
                    if(!Id.hasClass('active')) {
                        Id.addClass('active');
                    } else {
                        Id.removeClass('active');
                    }
                    if(CallBack) { //执行回调
                        CallBack();
                    }
                    event.stopPropagation(); //防止事件向上冒泡
                });
            },
             ReArray: function(Type, Obj, Array, Begin) { //Json递归
                 var Begin = Begin || 0;
                 if(Array != null) {
                     if(Array.length > (Begin + 1)) {
                         var Objs = Obj[Array[Begin]].value;
                         return this.ReArray(Type, Objs, Array, Begin + 1);
                     } else {
                         if(Type == 'Get' || Type == 'Set') {
                             return Obj[Array[Begin]];
                         } else {
                             return Obj;
                         }
                     }
                 } else {
                     return Obj;
                 }
             },
             SetArray: function(Type, Obj, LevelIds, Button) { //设置 Json数据
                 var state = false;
                 if(Type == 'Add') { //添加Json数据
                     if(!Button.value) { //创建新数组,防止没有传入数组
                         Button.value = [];
                     }
                     state = this.ReArray(Type, Obj, LevelIds).push(Button);
                 } else if(Type == 'Get') { //获取Json数据
                     state = this.ReArray(Type, Obj, LevelIds);
                     return JSON.stringify(state);
                 } else if(Type == 'Set') { //修改Json数据
                     state = this.ReArray(Type, Obj, LevelIds);
                     for(var i in state) {
                         state[i] = Button[i];
                     }
                 } else if(Type == 'Del') { //删除Json数据
                     state = this.ReArray(Type, Obj, LevelIds).splice(0, 1);
                 }
             },
            GlobalClick: function(Type, Obj, Index, CallBack) { //点击通用回调
                var _this_ = Obj;
                if(Index) {
                    _this_ = Obj.eq(Index);
                }
                if(Type == 'Db') {
                    _this_.dblclick(function(event) { //双击事件
                        if(CallBack) { //判断是否传入回调函数
                            CallBack(); //执行回调
                        }
                        event.stopPropagation(); //防止事件向上冒泡
                    });
                } else {
                    var Num = 1;
                    var Ac_CallBack = function(e) {
                        if(CallBack) { //判断是否传入回调函数
                            CallBack(); //执行回调
                        }
                        e.stopPropagation(); //防止事件向上冒泡
                    }
                    if(Type == 'Right') {
                        Num = 3;
                        _this_.mousedown(function(event) {
                            if(Num == event.which) { //右键单击事件
                                Ac_CallBack(event);
                            }
                        });
                    } else {
                        _this_.bind('click', function(event) {
                            Ac_CallBack(event);
                        });
                    }
                }
            },
            DbClick: function(Obj, Index, CallBack) { //双击回调
                this.GlobalClick('Db', Obj, Index, CallBack);
            },
            GetComponentState: function(Id) { //获取组件状态
                var content = $('#' + Id);
                var state = 'show';
                if(content.hasClass('hide')) {
                    state = 'hide';
                }
                return state;
            },
            SetComponentState: function(Id, State, Obj) { //设置组件状态
                var content = $('#' + Id);
                if(State) {
                    content.removeClass('hide').addClass('show');
                    if(Obj) {
                        Obj.removeClass('hide').addClass('show');
                    }
                } else {
                    content.removeClass('show').addClass('hide');
                    if(Obj) {
                        Obj.removeClass('show').addClass('hide');
                    }
                }
            }
        }
         
         var ToolAttr = { //属性管理面板, 组件封装
            Datas: function(ObjAttr) {
                var _htmlAttr = $('<ul>');
                for(var i = 0; i < ObjAttr.length; i++) {
                    var item = ObjAttr[i];
                    var _li_ = $('<li><p class="header_tit" levelid="' + i + '" isAmend="false" title="' + item.FieldName + '"><i class="space"></i><span>' + item.FieldName + '</span></p></li>');
                    if(item.value) {
                        var _active = '';
                        if(i == 0) {
                            _active = 'active';
                        }
                        var _ul_ = $('<ul class="attr_dropDown ' + _active + '">');
                        for(var j = 0; j < item.value.length; j++) {
                            var itemli = item.value[j];
                            var _ul_li_ = $('<li><p class="content" levelid="' + i + '_' + j + '" Amend="' + itemli.IsAmend + '" isAmend="false" title="' + itemli.name + '"><i class="space"></i><span class="onespan" title="' + itemli.name + '">' + itemli.name + '</span><span class="value">' + itemli.FieldValue + '</span><span class="form-control"><input type="text" value="' + itemli.FieldValue + '"></span></p></li>');
                            _ul_.append(_ul_li_);
                        }
                        _li_.append(_ul_);
                    }
                    _htmlAttr.append(_li_);
                }
                return _htmlAttr;
            },
            UpDate: function(Type, ObjAttr) {
                //var ToolAttrId = $('.tool-attr').next('.attr');
                //var ToolAttrUl = ToolAttrId.children('ul');
                var ToolAttrId=$('.tool-attr>.attr');
                var ToolAttrUl=$('.tool-attr>.attr>ul');
                var Amend = ToolAttrId.attr('amend');
                var Levelids;
                var state = false;
                if(Type == 'Add' && ObjAttr) { //添加数据
                    ToolAttrUl.remove();
                    ToolAttrId.append(this.Datas(ObjAttr));
                    config.tool_attr = [];
                    for(var i = 0; i < ObjAttr.length; i++) { //重构数组
                        config.tool_attr.push({});
                    }
                    GlobalTool.SetArray('Set', config.tool_attr, null, ObjAttr); //修改json数据
                    ToolAppend.AttrClick(); //属性点击事件
                    ToolAttrId.addClass('active');
                    state = true;
                } else if(Type == 'Caption') { //添加数据//修改属性标题栏
                    var title = ToolAttrId.children('.title').find('span');
                    title.text(ObjAttr);
                } else if(Type == 'IsAmend') {
                    if(Amend == 'true') {
                        state = true;
                    }
                } else if(Type == 'IsAmendSection') {
                    var IsAmendSection = ToolAttrId.find('.header_tit[title=' + ObjAttr + ']').attr('isamend');
                    if(IsAmendSection == 'true') {
                        state = true;
                    }
                } else if(Type == 'IsAmendField') {
                    var IsAmendField = ToolAttrId.find('.content[title=' + ObjAttr + ']').attr('isamend');
                    if(IsAmendField == 'true') {
                        state = true;
                    }
                } else if(Type == 'GetSectionValue') {
                    Levelids = ToolAttrId.find('.header_tit[title=' + ObjAttr + ']').attr('levelid').split('_');
                    state = GlobalTool.SetArray('Get', config.tool_attr, Levelids); //获取json数据
                } else if(Type == 'GetValue') {
                    Levelids = ToolAttrId.find('.onespan[title=' + ObjAttr + ']').parent().attr('levelid').split('_');
                    state = GlobalTool.SetArray('Get', config.tool_attr, Levelids); //获取json数据
                }
                return state;
            }
        }
         this.ToolAttr = { //属性管理面板
            AddSectionData: function(AttrStruct) { //添加数据
                ToolAttr.UpDate('Add', AttrStruct);
            },
            IsAmend: function() { //属性是否被修改过, 返回 true 修改过
                return ToolAttr.UpDate('IsAmend');
            },
            IsAmendSection: function(StrSectionName) { //数据段是否被修改, 返回 true 修改过
                return ToolAttr.UpDate('IsAmendSection', StrSectionName);
            },
            IsAmendField: function(StrFieldName) { //属性段是否被修改, 返回 true 修改过
                return ToolAttr.UpDate('IsAmendField', StrFieldName);
            },
            SetCaption: function(String) { //修改属性标题栏
                ToolAttr.UpDate('Caption', String);
            },
            GetSectionValue: function(String) { //获取一级属性数据
                return ToolAttr.UpDate('GetSectionValue', String);
            },
            GetValue: function(String) { //获取二级属性数据
                return ToolAttr.UpDate('GetValue', String);
            },
            GetComponentState: function() { //获取组件是显示还是隐藏状态,返回值hide隐藏,show显示
                return GlobalTool.GetComponentState(config.ToolAttrId);
            },
            SetComponentState: function(State) { //设置组件状态, State 为 true显示，false 隐藏
                GlobalTool.SetComponentState(config.ToolAttrId, State, $('#' + config.ToolAttrId).next('.attr'));
            }
        }
        
         this.init = function(divID) { //初始化工具
            ToolAppend.tool_search(config.tool_attr); //全屏-搜索-属性
             $('.slide-bar_ProId>.slide-bar_body').append(tools); //渲染工具栏
             $(divID).append(tools); //渲染工具栏
            ToolAppend.AttrClick(); //状态栏点击事件
            //alert("123");
        };
         
	 }
	 
//	 return attrs;
//	 };
//	 return {
//      newattrs: attrs
//   }
