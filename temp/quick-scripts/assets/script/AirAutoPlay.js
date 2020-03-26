(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/AirAutoPlay.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '34a32HfGT9Ln6soVDuJ+7Bk', 'AirAutoPlay', __filename);
// script/AirAutoPlay.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        m_Light: [cc.Node],
        m_TailLight: cc.Node,
        m_Gun: cc.Node,
        m_AirPlaneHead: cc.Node,
        m_WuDi: cc.Node,
        m_Body: cc.Sprite,
        m_texture: cc.SpriteAtlas,
        m_subWeapon: [cc.Node]
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        window.gAirPlane = this;
        for (var i = 0; i < this.m_Light.length; i++) {

            var seq = cc.sequence(cc.delayTime(i * 0.2), cc.scaleTo(0.4, 1, 1), cc.callFunc(function (target) {
                target.setScale(cc.v2(0, 0));
            }.bind(this)), cc.delayTime(0.5));
            this.m_Light[i].runAction(cc.repeatForever(seq));
        }
        this.m_Gun = this.m_Gun.getComponent('Gun');
        this.m_WuDi.active = false;

        for (var i = 0; i < this.m_subWeapon.length; i++) {
            this.m_subWeapon[i] = this.m_subWeapon[i].getComponent('subWeapon' + i);
            this.m_subWeapon[i].node.active = false;
        }
        this.m_subWeapon[0].node.active = true;
    },
    start: function start() {},
    Reset: function Reset() {
        this.setLightColor(new cc.Color(255, 255, 255));

        for (var i = 0; i < this.m_subWeapon.length; i++) {
            if (this.m_subWeapon[i].Reset) {
                this.m_subWeapon[i].Reset();
            }
        }
    },
    Play: function Play() {
        this.node.active = true;
        this.node.setPosition(cc.v2(0, -925));
        this.node.setScale(cc.v2(0.8, 0.8));
        this.m_TailLight.setScale(cc.v2(1, 1));

        var moveTo = cc.moveTo(1, cc.v2(0, -385));
        var scaleTo = cc.scaleTo(0.5, 1, 1);
        var seq = cc.sequence(moveTo, scaleTo);
        this.node.runAction(seq);

        var seq1 = cc.sequence(cc.delayTime(1), cc.scaleTo(0.5, 0.6, 0.6));
        this.m_TailLight.runAction(seq1);
    },

    MoveOut: function MoveOut() {
        this.node.stopAllActions();
        var scaleTo = cc.scaleTo(0.5, 0.6, 0.6);
        this.node.runAction(scaleTo);

        this.m_TailLight.runAction(cc.scaleTo(0.5, 1, 1));
    },

    onCollisionEnter: function onCollisionEnter(other, self) {

        if (this.m_WuDi.active) return;
        if (other.tag < 100) {
            var js = other.node.getComponent('' + other.node.id);
            if (js != null && js.m_bDie) {
                return;
            }
            gTouchCtl.setCanTouch(false);
            gAirPlane.EndFire();
            gVirusMake.sleepVirus();
            gGameCtl.sleepBullet(0);
            this.dieBegin();
            cc.director.getCollisionManager().enabled = false;
        }
    },
    dieBegin: function dieBegin() {
        this.setLightColor(new cc.Color(255, 100, 100));

        var seq = cc.sequence(cc.tintTo(0.2, 255, 0, 0), cc.tintTo(0.2, 255, 255, 255));

        this.m_AirPlaneHead.runAction(cc.repeat(seq, 3));

        this.scheduleOnce(function () {
            this.setLightColor(new cc.Color(255, 255, 255));
            // gGameCtl.blackBGAnim(true);
            gResurgenceView.onShowView(true);
        }.bind(this), 1.5);
    },
    setLightColor: function setLightColor(color) {
        for (var i = 0; i < this.m_Light.length; i++) {
            this.m_Light[i].color = color;
        }
    },
    MoveIn: function MoveIn() {

        this.node.stopAllActions();
        var scaleTo = cc.scaleTo(0.5, 1, 1);
        this.node.runAction(scaleTo);

        this.m_TailLight.runAction(cc.scaleTo(0.5, 0.6, 0.6));
    },
    MoveOutScreen: function MoveOutScreen() {

        this.node.stopAllActions();
        this.node.runAction(cc.moveTo(0.5, cc.v2(this.node.x, 980)));
    },
    BeginFire: function BeginFire() {
        this.m_Gun.BeginFire();
        this.playSubWeapon();
    },
    EndFire: function EndFire() {
        this.m_Gun.EndFire();
        this.stopSubWeapon();
    },

    Resurgence: function Resurgence() {
        this.m_WuDi.active = true;
        this.m_WuDi.opacity = 255;

        var seq = cc.sequence(cc.delayTime(3), cc.fadeTo(0.2, 255), cc.fadeTo(0.2, 0), cc.fadeTo(0.2, 255), cc.fadeTo(0.2, 0), cc.fadeTo(0.2, 255), cc.fadeTo(0.2, 0), cc.fadeTo(0.2, 255), cc.fadeTo(0.2, 0), cc.callFunc(function () {
            this.m_WuDi.opacity = 255;
            this.m_WuDi.active = false;
        }.bind(this)));
        this.m_WuDi.runAction(seq);
    },
    DieEnd: function DieEnd() {

        this.node.active = false;
    },
    MoveTo: function MoveTo(time, pos) {
        this.node.stopAllActions();
        this.node.runAction(cc.moveTo(time, pos));
    },

    ChangeAirPlane: function ChangeAirPlane(index) {
        // cc.log('换图片'+index)
        var frame = this.m_texture.getSpriteFrame('Jishen_W' + index);
        if (frame != null) {
            this.m_Body.spriteFrame = frame;
        }

        for (var i = 0; i < this.m_subWeapon.length; i++) {
            this.m_subWeapon[i].node.active = false;
        }
        if (this.m_subWeapon[index] != null) {
            this.m_subWeapon[index].node.active = true;
        } else {
            this.m_subWeapon[0].node.active = true;
        }
    },

    stopSubWeapon: function stopSubWeapon() {

        for (var i = 0; i < this.m_subWeapon.length; i++) {
            if (this.m_subWeapon[i].setStop && this.m_subWeapon[i].node.active) {
                this.m_subWeapon[i].setStop();
            }
        }
    },
    playSubWeapon: function playSubWeapon() {

        for (var i = 0; i < this.m_subWeapon.length; i++) {
            if (this.m_subWeapon[i].setStop && this.m_subWeapon[i].node.active) {
                this.m_subWeapon[i].setStart();
            }
        }
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
        //# sourceMappingURL=AirAutoPlay.js.map
        