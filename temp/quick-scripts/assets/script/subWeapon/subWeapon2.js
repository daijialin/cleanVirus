(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/subWeapon/subWeapon2.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'dcffcO6YwdC8oBxOKE/howK', 'subWeapon2', __filename);
// script/subWeapon/subWeapon2.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        m_LeftWind: cc.Sprite,
        m_RightWind: cc.Sprite,
        m_buttle: [cc.Node],
        m_light: [cc.Node]
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {

        for (var i = 0; i < this.m_buttle.length; i++) {
            var pos = this.m_buttle[i].convertToWorldSpaceAR(cc.v2(0, 0));
            var pos1 = gGameCtl.m_SubWeaponParent.convertToNodeSpaceAR(pos);

            this.m_buttle[i].parent = null;
            gGameCtl.m_SubWeaponParent.addChild(this.m_buttle[i]);
            this.m_buttle[i].setPosition(pos1);

            this.m_light[i].active = false;
            this.m_light[i].index = i;
        }

        this.m_bInit = false;
        this.Reset();
    },
    start: function start() {},

    Reset: function Reset() {

        this.m_light[0].setScale(cc.v2(0.1, 0.1));
        this.m_light[1].setScale(cc.v2(0.1, 0.1));

        this.m_bButtleMove = false;
        this.m_buttle[0].active = false;
        this.m_buttle[1].active = false;
        this.m_Sleep = false;
    },
    begin: function begin() {
        for (var i = 0; i < this.m_light.length; i++) {

            this.m_light[i].active = true;
            this.m_light[i].setScale(cc.v2(0, 0));
            var seq = cc.sequence(cc.scaleTo(1, 0.5, 0.5), cc.callFunc(function (target) {

                var index = target.index;
                this.m_light[index].active = false;

                var pos = this.m_light[index].convertToWorldSpaceAR(cc.v2(0, 0));
                pos = gGameCtl.node.convertToNodeSpaceAR(pos);

                this.m_buttle[index].active = true;
                this.m_buttle[index].setPosition(pos);

                this.m_bButtleMove = true;
            }.bind(this)));
            this.m_light[i].runAction(seq);
        }
    },
    setStart: function setStart() {
        if (!this.m_bInit) {
            this.begin();
            this.m_bInit = true;
        }
        this.m_light[0].resumeAllActions();
        this.m_light[1].resumeAllActions();
        this.m_Sleep = false;
    },
    setStop: function setStop() {
        this.m_light[0].pauseAllActions();
        this.m_light[1].pauseAllActions();
        this.m_Sleep = true;
    },

    update: function update(dt) {
        if (this.m_bButtleMove && !this.m_Sleep) {
            for (var i = 0; i < this.m_buttle.length; i++) {

                var y = this.m_buttle[i].y;
                var x = this.m_buttle[i].x;
                y += 1000 * dt;
                if (i == 0) {
                    x -= 200 * dt;
                } else {
                    x += 200 * dt;
                }

                this.m_buttle[i].y = y;
                this.m_buttle[i].x = x;
                if (this.m_buttle[i].y > 860) {
                    this.begin();
                    this.m_bButtleMove = false;
                    this.m_buttle[i].active = false;
                }
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
        //# sourceMappingURL=subWeapon2.js.map
        