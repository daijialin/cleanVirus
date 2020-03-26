(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/Logo.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '982dfGjwjBAzJOfWzHbQnD7', 'Logo', __filename);
// script/Logo.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        m_Anim: [cc.Node]
    },

    // LIFE-CYCLE CALLBACKS:

    callback1: function callback1() {
        cc.log('播放完毕1');

        var moveTo2 = cc.moveTo(0.3, cc.v2(433, 186));
        var scale2 = cc.scaleTo(0.3, 1);
        var swpan2 = cc.spawn(moveTo2, scale2);
        this.m_Anim[2].runAction(swpan2);

        var moveTo3 = cc.moveTo(0.5, cc.v2(452, -24));
        var scale3 = cc.scaleTo(0.5, 1);
        var swpan3 = cc.spawn(moveTo3, scale3);
        var callF = cc.callFunc(this.callback2.bind(this));
        var seq = cc.sequence(swpan3, callF);

        this.m_Anim[3].runAction(seq);
        this.flicker(this.m_Anim[1]);
    },
    callback2: function callback2() {
        //病毒2.
        var js = this.m_Anim[2].getComponent('LogoVirus');
        js.init(374, 137, 120);
        js.Begin();

        js = this.m_Anim[3].getComponent('LogoVirus');
        js.init(410, -62, 80);
        js.Begin();
    },

    flicker: function flicker(node) {
        var _out = cc.fadeOut(0.2);
        var _in = cc.fadeIn(0.4);
        // var dly = cc.delayTime(0.4);
        var seq = cc.sequence(_out, _in);
        node.runAction(seq.repeatForever());
    },
    onLoad: function onLoad() {},
    Reset: function Reset() {

        for (var i = 0; i < this.m_Anim.length; i++) {
            this.m_Anim[0].stopAllActions();
        }

        this.m_Anim[0].opacity = 255;
        this.m_Anim[1].opacity = 255;
        //缩放
        this.m_Anim[1].setScale(cc.v2(0, 1));

        this.m_Anim[2].setPosition(cc.v2(284, 54));
        this.m_Anim[2].setScale(cc.v2(0.2, 0.2));

        this.m_Anim[3].setPosition(cc.v2(292, 32));
        this.m_Anim[3].setScale(cc.v2(0.2, 0.2));

        var js = this.m_Anim[2].getComponent('LogoVirus');
        js.Reset();

        js = this.m_Anim[3].getComponent('LogoVirus');
        js.Reset();
    },
    Play: function Play() {
        var _out = cc.fadeOut(0.15);
        var _in = cc.fadeIn(0.15);
        var callF = cc.callFunc(function () {

            var scale = cc.scaleTo(0.3, 1);
            var callF = cc.callFunc(this.callback1.bind(this));
            var seq = cc.sequence(scale, callF);
            this.m_Anim[1].runAction(seq);

            this.flicker(this.m_Anim[0]);
        }.bind(this));
        var seq = cc.sequence(_out, _in);
        var allSeq = cc.sequence(seq, seq, seq, callF);

        this.m_Anim[0].runAction(allSeq);
    },
    MoveOut: function MoveOut() {
        this.Reset();
        this.node.setPosition(cc.v2(0, 459));
        this.node.runAction(cc.moveTo(0.5, cc.v2(0, 962)).easing(cc.easeBackIn()));
    },
    MoveIn: function MoveIn() {

        this.Reset();
        this.node.setPosition(cc.v2(0, 962));

        this.node.runAction(cc.moveTo(0.5, cc.v2(0, 459)).easing(cc.easeBackOut()));
    },
    start: function start() {}

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
        //# sourceMappingURL=Logo.js.map
        