(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/LevelItem.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '00ad9OLgF9Omqa8brBR72gW', 'LevelItem', __filename);
// script/LevelItem.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        m_imgBoss: cc.Node,
        m_labNumber: cc.Label,
        m_Point: [cc.Node]
    },

    // LIFE-CYCLE CALLBACKS:
    ctor: function ctor() {
        this.m_Index = 0;
    },
    onLoad: function onLoad() {},

    SetIndex: function SetIndex(index) {
        this.m_Index = index;
        // if( index == 1 || index == 2){
        //     this.SetPointShow(true);
        // }else{
        //     this.SetPointShow(false);
        // }
        // if( index == 1){
        //     this.m_Point[0].opacity = 255;
        //     this.m_Point[1].opacity = 0;
        // }else if( index == 2){
        //     this.m_Point[0].opacity = 0;
        //     this.m_Point[1].opacity = 255;

        // }
    },
    SetNumber: function SetNumber(num) {
        if (num <= 0) {
            this.node.opacity = 0;
            return;
        }
        this.m_labNumber.string = num;
        this.SetBoss(num % 3 == 0);
    },
    SetBoss: function SetBoss(show) {
        this.m_imgBoss.active = show;
        this.m_bBoss = show;
    },

    SetPointShow: function SetPointShow(bShow) {
        this.m_Point[0].opacity = bShow ? 255 : 0;
        this.m_Point[1].opacity = bShow ? 255 : 0;
    },
    PlayShowPointIndex: function PlayShowPointIndex(index) {
        if (index == 0) {
            this.m_Point[0].runAction(cc.fadeOut(0.5));
            this.m_Point[1].runAction(cc.fadeIn(0.5));
        } else if (index == 1) {
            this.m_Point[1].runAction(cc.fadeOut(0.5));
            this.m_Point[0].runAction(cc.fadeIn(0.5));
        } else {
            this.m_Point[0].runAction(cc.fadeOut(0.5));
            this.m_Point[1].runAction(cc.fadeOut(0.5));
        }
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=LevelItem.js.map
        