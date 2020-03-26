(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/subWeapon/subWeapon1.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '897f0kB0FZDdK3XsSYzUn/Y', 'subWeapon1', __filename);
// script/subWeapon/subWeapon1.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        m_LeftWind: cc.Sprite,
        m_RightWind: cc.Sprite,
        m_LeftBullet: cc.Node,
        m_RightBullet: cc.Node,
        m_buttle: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {

        var pos = this.m_buttle.convertToWorldSpaceAR(cc.v2(0, 0));
        var pos1 = gGameCtl.m_SubWeaponParent.convertToNodeSpaceAR(pos);

        this.m_buttle.parent = null;
        gGameCtl.m_SubWeaponParent.addChild(this.m_buttle);
        this.m_buttle.setPosition(pos1);

        this.m_bInit = false;
        this.Reset();
    },
    start: function start() {},

    Reset: function Reset() {

        this.m_LeftBullet.setScale(cc.v2(0.1, 0.1));
        this.m_RightBullet.setScale(cc.v2(0.1, 0.1));

        this.m_bButtleMove = false;
        this.m_buttle.active = false;
        this.m_Sleep = false;
    },
    begin: function begin() {
        var node;
        if (this.m_bBeginLeft) {
            node = this.m_LeftBullet;
            node.active = true;
            this.m_RightBullet.active = false;
        } else {
            node = this.m_RightBullet;
            node.active = true;
            this.m_LeftBullet.active = false;
        }
        node.setScale(cc.v2(0.1, 0.1));
        var seq = cc.sequence(cc.scaleTo(1, 0.5, 0.5), cc.callFunc(function () {

            node.active = false;

            var pos = node.convertToWorldSpaceAR(cc.v2(0, 0));
            pos = gGameCtl.node.convertToNodeSpaceAR(pos);

            this.m_buttle.active = true;
            this.m_buttle.setPosition(pos);

            this.m_bButtleMove = true;
        }.bind(this)));
        node.runAction(seq);
        this.m_bBeginLeft = !this.m_bBeginLeft;
    },
    setStart: function setStart() {
        if (!this.m_bInit) {
            this.begin();
            this.m_bInit = true;
        }
        this.m_LeftBullet.resumeAllActions();
        this.m_RightBullet.resumeAllActions();
        this.m_Sleep = false;
    },
    setStop: function setStop() {
        this.m_LeftBullet.pauseAllActions();
        this.m_RightBullet.pauseAllActions();
        this.m_Sleep = true;
    },

    update: function update(dt) {
        if (this.m_bButtleMove && !this.m_Sleep) {
            var y = this.m_buttle.y;
            y += 1000 * dt;
            this.m_buttle.y = y;
            if (this.m_buttle.y > 860) {
                this.begin();
                this.m_bButtleMove = false;
                this.m_buttle.active = false;
            }
        }
    }
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
        //# sourceMappingURL=subWeapon1.js.map
        