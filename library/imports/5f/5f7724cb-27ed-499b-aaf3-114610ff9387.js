"use strict";
cc._RF.push(module, '5f772TLJ+1Jm6rzEUYQ/5OH', 'LevelDesign');
// script/LevelDesign.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        m_Item: [cc.Node]
    },

    // LIFE-CYCLE CALLBACKS:
    ctor: function ctor() {
        this.m_BasePos = new Array();
    },
    onLoad: function onLoad() {
        window.gLevelDesignCtl = this;
        for (var i = 0; i < this.m_Item.length; i++) {
            this.m_BasePos[i] = this.m_Item[i].getPosition();
        }
    },

    SetCurrentLevel: function SetCurrentLevel() {},
    Reset: function Reset() {
        var level = gDataCtl.GetCurLevelDesign();
        var starLevel = level - 2;
        for (var i = 0; i < this.m_Item.length; i++) {
            if (this.m_BasePos[i] != null) {
                this.m_Item[i].setPosition(this.m_BasePos[i]);
            }
            this.m_Item[i].setScale(cc.v2(0.6, 0.6));
            this.m_Item[i].opacity = 255;
            var js = this.m_Item[i].getComponent('LevelItem');
            js.SetNumber(starLevel + i);

            this.m_Item[i].stopAllActions();
        }
        this.m_Item[2].setScale(cc.v2(1, 1));
        this.m_Item[0].opacity = 0;
        this.m_Item[4].opacity = 0;
    },
    Play: function Play() {},
    NextLevel: function NextLevel(callBack) {
        for (var i = 1; i < this.m_Item.length; i++) {
            var moveTo = cc.moveTo(0.5, cc.v2(this.m_BasePos[i - 1]));

            var js = this.m_Item[i].getComponent('LevelItem');
            if (i == 1) {
                var out = cc.fadeOut(0.5);
                var seq = cc.spawn(out, moveTo);
                this.m_Item[i].runAction(seq);
                js.PlayShowPointIndex(-1);
            } else if (i == 2) {
                var scale = cc.scaleTo(0.5, 0.6);
                var seq = cc.spawn(scale, moveTo);
                this.m_Item[i].runAction(seq);
                js.PlayShowPointIndex(0);
            } else if (i == 3) {
                var scale = cc.scaleTo(0.5, 1);
                var seq = cc.spawn(scale, moveTo);
                this.m_Item[i].runAction(seq);
                js.PlayShowPointIndex(1);
            } else if (i == 4) {
                var _in = cc.fadeIn(0.5);
                var seq = cc.spawn(_in, moveTo);
                this.m_Item[i].runAction(seq);
                js.PlayShowPointIndex(-1);
            } else {
                this.m_Item[i].runAction(moveTo);
            }
        }
        var dly = cc.delayTime(0.5);
        var nodeSeq = cc.sequence(dly, cc.callFunc(function () {
            var level = gDataCtl.AddCurLevelDesign();
            this.Reset();
            if (callBack != null) callBack();
        }.bind(this)));
        this.node.runAction(nodeSeq);
    },
    MoveOut: function MoveOut() {
        this.Reset();
        var moveTo = cc.moveTo(0.5, cc.v2(0, 668));
        var scaleTo = cc.scaleTo(0.5, 0.4, 0.4);
        var spa = cc.spawn(scaleTo, moveTo);
        this.node.runAction(spa.easing(cc.easeBackIn()));
    },
    MoveIn: function MoveIn() {

        var moveTo = cc.moveTo(0.5, cc.v2(0, 167));
        var scaleTo = cc.scaleTo(0.5, 1, 1);
        var spa = cc.spawn(scaleTo, moveTo);
        this.node.runAction(spa.easing(cc.easeBackOut()));
    },
    Brief: function Brief(callBack) {
        var moveTo = cc.moveTo(0.5, cc.v2(0, 415));
        var scaleTo = cc.scaleTo(0.5, 1, 1);
        var spa = cc.spawn(scaleTo, moveTo);
        var seq = cc.sequence(spa, cc.callFunc(callBack));
        this.node.runAction(seq.easing(cc.easeBackIn()));
    }
    // update (dt) {},
});

cc._RF.pop();