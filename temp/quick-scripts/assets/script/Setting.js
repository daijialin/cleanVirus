(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/Setting.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '42b99cCj+ZMl6jkzjJbYqmX', 'Setting', __filename);
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
        //# sourceMappingURL=Setting.js.map
        