(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/Advertising.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2cc9ePgwmlGyIKRv/otIu3x', 'Advertising', __filename);
// script/Advertising.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        m_TVTime: cc.Label,
        m_Close: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:
    ctor: function ctor() {
        this.m_nTVTimeData = 20;
    },
    onLoad: function onLoad() {
        window.gAdvertising = this;
        this.node.active = false;
    },
    start: function start() {},


    onShow: function onShow(callBack) {

        this.m_nTVTimeData = 1;
        this.m_TVTime.active = true;
        this.m_TVTime.string = '' + this.m_nTVTimeData;

        this.node.x = 0;
        this.node.active = true;
        this.m_Close.active = false;
        this.m_CallBack = callBack;

        var callBack = function callBack() {
            this.m_nTVTimeData--;
            this.m_TVTime.string = '' + this.m_nTVTimeData;
            if (this.m_nTVTimeData == 0) {
                this.m_Close.active = true;
                this.m_TVTime.active = false;
                this.unschedule(callBack);
            }
        };
        this.schedule(callBack, 1, 20);
    },
    onClose: function onClose() {
        if (this.m_CallBack) this.m_CallBack();
        this.node.active = false;
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
        //# sourceMappingURL=Advertising.js.map
        