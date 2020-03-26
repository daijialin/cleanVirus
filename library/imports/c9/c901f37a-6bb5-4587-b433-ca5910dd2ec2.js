"use strict";
cc._RF.push(module, 'c901fN6a7VFh7QzylkQ3S7C', 'Top');
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