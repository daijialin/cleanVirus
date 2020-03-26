(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/LogoVirus.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b9b2fCo4FRFBr+ZYNLBTQsI', 'LogoVirus', __filename);
// script/LogoVirus.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        m_Circl: cc.Node, //圆圈
        m_Virus: cc.Node, //病毒
        m_Tail: cc.Node //拖尾
    },

    init: function init(x, y, width) {
        this.v2 = cc.v2(x, y);
        this.width = width;
    },
    onLoad: function onLoad() {},
    start: function start() {},


    Begin: function Begin() {
        this.m_Tail.runAction(cc.fadeOut(0.1));

        var _out = cc.fadeOut(0.2);
        var _in = cc.fadeIn(0.4);
        // var dly = cc.delayTime(0.4);
        var seq = cc.sequence(_out, _in);
        this.m_Circl.runAction(seq.repeatForever());

        this.virusAction();
    },
    virusAction: function virusAction() {

        var x = random(0, this.width);
        var y = random(0, this.width);
        var v2 = cc.v2(this.v2.x + x, this.v2.y + y);
        var seq = cc.sequence(cc.moveTo(0.5, v2), cc.callFunc(function () {
            this.virusAction();
        }.bind(this)));
        this.node.runAction(seq);
    },
    Reset: function Reset() {
        this.m_Circl.opacity = 255;
        this.m_Circl.stopAllActions();

        this.m_Tail.opacity = 255;
        this.m_Tail.setScale(cc.v2(1, 1));
        this.m_Tail.stopAllActions();

        this.node.stopAllActions();
        this.node.opactiy = 255;
    }
    // update (dt) {},
});

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
        //# sourceMappingURL=LogoVirus.js.map
        