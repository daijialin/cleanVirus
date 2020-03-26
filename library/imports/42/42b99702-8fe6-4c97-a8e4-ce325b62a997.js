"use strict";
cc._RF.push(module, '42b99cCj+ZMl6jkzjJbYqmX', 'Setting');
// script/Setting.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},
    Reset: function Reset() {},
    Play: function Play() {},

    MoveOut: function MoveOut() {
        this.node.runAction(cc.moveTo(0.5, cc.v2(-508, 407)).easing(cc.easeBackOut()));
    },
    MoveIn: function MoveIn() {

        this.node.runAction(cc.moveTo(0.5, cc.v2(-416, 407)).easing(cc.easeBackIn()));
    }
    // update (dt) {},
});

cc._RF.pop();