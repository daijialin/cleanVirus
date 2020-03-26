(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/Tip.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '24403Z0n7xO4K1Y3y6R81sQ', 'Tip', __filename);
// script/Tip.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},
    Reset: function Reset() {
        this.node.opactiy = 255;
        this.node.rotastion = 0;
    },
    Play: function Play() {
        var seq = cc.sequence(cc.rotateTo(0.2, 15), cc.rotateTo(0.4, -15), cc.rotateTo(0.4, 15), cc.rotateTo(0.4, -15), cc.rotateTo(0.4, 15), cc.rotateTo(0.2, 0), cc.delayTime(2));
        this.node.runAction(cc.repeatForever(seq));
    },

    MoveOut: function MoveOut() {
        this.node.runAction(cc.fadeOut(0.2).easing(cc.easeBackOut()));
    },
    MoveIn: function MoveIn() {

        this.node.runAction(cc.fadeIn(0.2).easing(cc.easeBackIn()));
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
        //# sourceMappingURL=Tip.js.map
        