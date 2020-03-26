"use strict";
cc._RF.push(module, '37f51HIzh5MXbTF9rzWJ5lC', 'BG');
// script/BG.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},
    Reset: function Reset() {},
    Play: function Play() {
        var seq = cc.sequence(cc.delayTime(1), cc.scaleTo(0.5, 1.2, 1.2));
        this.node.runAction(seq);
    },

    MoveOut: function MoveOut() {
        this.node.runAction(cc.scaleTo(0.5, 1, 1));
    },
    MoveIn: function MoveIn() {

        this.node.runAction(cc.scaleTo(0.5, 1.2, 1.2));
    }
    // update (dt) {},
});

cc._RF.pop();