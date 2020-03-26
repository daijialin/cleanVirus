(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/Resurgence.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '769caBGGR9MjKN152huWKMg', 'Resurgence', __filename);
// script/Resurgence.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        m_BlackBG: cc.Node,
        m_btTime: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        window.gResurgenceView = this;

        this.node.x = 0;
        this.node.active = false;
    },
    start: function start() {},


    blackBGAnim: function blackBGAnim(show) {
        if (show) {
            this.m_BlackBG.runAction(cc.fadeTo(0.5, 130));
        } else {
            this.m_BlackBG.runAction(cc.fadeTo(0.5, 0));
        }
    },
    onShowView: function onShowView(show) {
        if (show) {

            var time = 3;
            this.m_btTime.string = '' + time;
            var __callBack = function __callBack() {
                if (gAdvertising.node.active) return;
                time -= 1;
                this.m_btTime.string = '' + time;

                if (time == -1) {
                    this.node.active = false;
                    gBrief.onShowView();
                    this.unschedule(__callBack);
                }
            };
            this.schedule(__callBack, 1, 3);
        } else {
            this.m_BlackBG.runAction(cc.fadeTo(0.5, 0));
        }
        this.blackBGAnim(show);
        this.node.active = show;
    },
    onAdv: function onAdv() {
        this.node.active = false;
        gAdvertising.onShow(function () {
            gAirPlane.Resurgence();
            cc.director.getCollisionManager().enabled = true;
            gTouchCtl.setCanTouch(true);
            gGameCtl.onBulletKilledAll();
        });
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
        //# sourceMappingURL=Resurgence.js.map
        