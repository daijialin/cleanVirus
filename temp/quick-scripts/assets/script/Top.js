(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/Top.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c901fN6a7VFh7QzylkQ3S7C', 'Top', __filename);
// script/Top.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        m_GoldNode: cc.Node,
        m_labGold: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        window.gTop = this;
        this.updateData();
    },
    start: function start() {},

    Reset: function Reset() {
        this.node.setPosition(cc.v2(0, 761));
    },
    MoveOut: function MoveOut() {
        this.Reset();
        this.node.setPosition(cc.v2(0, 736));
        this.node.runAction(cc.moveTo(0.2, cc.v2(0, 848)).easing(cc.easeBackIn()));
    },
    MoveIn: function MoveIn() {

        this.Reset();
        this.node.setPosition(cc.v2(0, 848));

        this.node.runAction(cc.moveTo(0.2, cc.v2(0, 736)).easing(cc.easeBackOut()));
    },
    getGoldNode: function getGoldNode() {
        return this.m_GoldNode;
    },
    updateData: function updateData() {
        this.m_labGold.string = goldCrarryBit(gDataCtl.GetGold());

        if (window.gBottom != null) {
            gBottom.onUpdate();
        }
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
        //# sourceMappingURL=Top.js.map
        