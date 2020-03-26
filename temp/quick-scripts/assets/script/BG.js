(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/BG.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '37f51HIzh5MXbTF9rzWJ5lC', 'BG', __filename);
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
        //# sourceMappingURL=BG.js.map
        