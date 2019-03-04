/*webGIS插件 32237384@qq.com*/

define(function (){
    var opts =  {
            layer_config: false,
            tool_layer: [],
            tool_toolbar: [
                {
                    'Id':1,
                    'check':0,//互斥
                    'value': [{
                        'Id': 2,
                        'Mode': true,
                        'name': '工具',
                        'icon': 'rotate1',
                        'check':0//互斥
                    },
                        {
                            'Id': 3,
                            'Mode': true,
                            'name': '指定区域放大',
                            'icon': 'loop',
                            'check':0//互斥
                        },
                        {
                            'Id': 4,
                            'Mode': true,
                            'name': '缩小',
                            'icon': 'zoom-out',
                            'check':0//互斥
                        },
                        {
                            'Id': 5,
                            'Mode': true,
                            'name': '放大',
                            'icon': 'zoom-in',
                            'check':0//互斥
                        },
                        //{
                        //    'Id': 6,
                        //    'Mode': false,
                        //    'name': '工具6',
                        //    'icon': 'camera',
                        //    'check':0,//互斥
                        //    'value': [{
                        //        'Id': 7,
                        //        'Mode': true,
                        //        'name': '测面积',
                        //        'icon': 'photo',
                        //        'check':0//互斥
                        //    },
                        //        {
                        //            'Id': 8,
                        //            'Mode': true,
                        //            'name': '测距离',
                        //            'icon': 'sector',
                        //            'check':0//互斥
                        //        },
                        //        {
                        //            'Id': 9,
                        //            'Mode': true,
                        //            'name': '测高度',
                        //            'icon': 'rotate2',
                        //            'check':0//互斥
                        //        },
                        //        {
                        //            'Id': 19,
                        //            'Mode': true,
                        //            'name': '侧角度',
                        //            'icon': 'stack',
                        //            'check':0//互斥
                        //        }
                        //    ]
                        //}
                    ]
                },
                {
                    'Id':10,
                    'check':0,//可选中
                    'value': [{
                        'Id': 11,
                        'Mode': true,
                        'name': '漫游',
                        'icon': 'airplane',
                        'check':0//点击不变蓝色
                    },
                        {
                            'Id': 12,
                            'Mode': true,
                            'name': '停止漫游',
                            'icon': 'stop2',
                            'check':0//点击不变蓝色
                        },
                        {
                            'Id': 13,
                            'Mode': true,
                            'name': '动画',
                            'icon': 'truck',
                            //'check':2//点击不变蓝色
                            'check':0//点击不变蓝色
                        },
                        {
                            'Id': 14,
                            'Mode': true,
                            'name': '停止动画',
                            'icon': 'stop2',
                            //'check':2//点击不变蓝色
                            'check':0//点击不变蓝色
                        },
                        {
                            'Id': 8,
                            'Mode': true,
                            'name': '动画列表',
                            'icon': 'list',
                            'check':0//点击不变蓝色
                        },
                        {
                            'Id': 9,
                            'Mode': true,
                            'name': '镜头位置',
                            'icon': 'location',
                            'check':0//点击不变蓝色
                        }
                    ]
                },
                {
                    'Id': 15,
                    'check':0,//可选中
                    'value': [{
                        'Id': 16,
                        'Mode': true,
                        'name': '测量面积',
                        'icon': 'map',
                        'check':0//点击不变蓝色
                    },
                        {
                            'Id': 17,
                            'Mode': true,
                            'name': '测量距离',
                            'icon': 'ranging1',
                            'check':0//点击不变蓝色
                        },
                        {
                            'Id': 18,
                            'Mode': true,
                            'name': '测量角度',
                            'icon': 'crop',
                            'check':0//点击不变蓝色
                        },
                        {
                            'Id': 19,
                            'Mode': true,
                            'name': '测量高度',
                            'icon': 'text-height',
                            'check':0//点击不变蓝色
                        },
                        {
                            'Id': 20,
                            'Mode': true,
                            'name': '清除痕迹',
                            'icon': 'cross',
                            'check':0//点击不变蓝色
                        }
                    ]
                },
                {
                    'Id': 21,
                    'check':0,//可选中
                    'value': [{
                        'Id': 22,
                        'Mode': true,
                        'name': '透明度',
                        'icon': 'delicious',
                        'check':0//点击不变蓝色
                    },
                        {
                            'Id': 23,
                            'Mode': true,
                            'name': '设置',
                            'icon': 'set',
                            'check':0//点击不变蓝色
                        }
                    ]
                }
            ],
            tool_attr: [{
                'FieldName': '尺寸标注',
                'value': [{
                    'name': '顶部高度',
                    'FieldValue': '20150.000',
                    'IsAmend': false
                    },
                    {
                        'name': '底部高度',
                        'FieldValue': '19900.000',
                        'IsAmend': true
                    },
                    {
                        'name': '坡度',
                        'FieldValue': '0.00度',
                        'IsAmend': true
                    },
                    {
                        'name': '厚度',
                        'FieldValue': '250.000',
                        'IsAmend': true
                    },
                    {
                        'name': '体积',
                        'FieldValue': '46.260',
                        'IsAmend': true
                    },
                    {
                        'name': '面积',
                        'FieldValue': '185.030',
                        'IsAmend': true
                    },
                    {
                        'name': '周长',
                        'FieldValue': '69924.000',
                        'IsAmend': true
                    }
                ]
            },
                {
                    'FieldName': '限制条件',
                    'value': [{
                        'name': '自标高的高度偏移',
                        'FieldValue': '0.000',
                        'IsAmend': true
                    },
                        {
                            'name': '标高',
                            'FieldValue': '5F',
                            'IsAmend': true
                        },
                        {
                            'name': '与体重相关',
                            'FieldValue': '否',
                            'IsAmend': true
                        },
                        {
                            'name': '房间边界',
                            'FieldValue': '是',
                            'IsAmend': true
                        }
                    ]
                },
                {
                    'FieldName': '标识数据',
                    'value': [{
                        'name': '类型名称',
                        'FieldValue': '',
                        'IsAmend': true
                    },
                        {
                            'name': '注释',
                            'FieldValue': '',
                            'IsAmend': true
                        },
                        {
                            'name': '设计选项',
                            'FieldValue': '-1',
                            'IsAmend': true
                        },
                        {
                            'name': '标记',
                            'FieldValue': '',
                            'IsAmend': true
                        },
                        {
                            'name': '图像',
                            'FieldValue': '<无>',
                            'IsAmend': true
                        },
                        {
                            'name': '图像',
                            'FieldValue': '<无>',
                            'IsAmend': true
                        },
                        {
                            'name': '标记',
                            'FieldValue': '',
                            'IsAmend': true
                        },
                        {
                            'name': '图像',
                            'FieldValue': '<无>',
                            'IsAmend': true
                        },
                        {
                            'name': '标记',
                            'FieldValue': '',
                            'IsAmend': true
                        },
                        {
                            'name': '图像',
                            'FieldValue': '<无>',
                            'IsAmend': true
                        }
                    ]
                },
                {
                    'FieldName': '阶段化',
                    'value': [{
                        'name': '创建的阶段',
                        'FieldValue': '新构造',
                        'IsAmend': true
                    },
                        {
                            'name': '拆除的阶段',
                            'FieldValue': '无',
                            'IsAmend': true
                        },
                        {
                            'name': '拆除的阶段',
                            'FieldValue': '这是什么',
                            'IsAmend': true
                        },
                        {
                            'name': '拆除的阶段',
                            'FieldValue': '这是',
                            'IsAmend': true
                        },
                        {
                            'name': '拆除的阶段',
                            'FieldValue': '新阶段',
                            'IsAmend': true
                        }
                    ]
                }
            ]
        };
    return {
        opts: opts
    };
});



    //var WebGIS = new Web_GIS(opts);
    //window.WebGIS = WebGIS;
    //WebGIS.init(); //初始化插件
    //console.log(WebGIS);
