"use strict";
cc._RF.push(module, '2b4a9WpqeZABZCJwD+1zyOC', 'MonsterHp');
// script/MonsterHp.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        m_Gold: cc.Label,
        m_tipVirus: cc.Label,
        m_HpProgress: cc.ProgressBar,
        m_CoinNode: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        window.gVirusHpView = this;
        this.m_HpProgress.progress = 1;
        this.m_GoldValue = 0;
    },
    start: function start() {},
    Reset: function Reset() {

        this.m_HpProgress.progress = 1;
        this.m_Gold.string = '0';
        this.m_tipVirus.string = '100%';
        this.m_GoldValue = 0;
        this.node.y = 616;
    },
    Play: function Play() {},

    MoveOut: function MoveOut() {
        var seq = cc.sequence(cc.delayTime(1), cc.fadeIn(0.5));
        this.node.runAction(seq);
    },
    MoveIn: function MoveIn() {

        this.node.runAction(cc.fadeOut(0.5));
    },
    changeProgress: function changeProgress(progress) {

        this.m_HpProgress.progress = progress;
        this.m_tipVirus.string = '' + parseInt(progress.toFixed(2) * 100) + '%';
    },
    AddGold: function AddGold(gold) {
        this.m_GoldValue += gold;
        this.m_Gold.string = '' + this.m_GoldValue;
    },
    GetGold: function GetGold() {
        return this.m_GoldValue;
    },
    Brief: function Brief() {
        var moveTo = cc.moveTo(0.5, cc.v2(0, 284));
        var scaleTo = cc.scaleTo(0.5, 1, 1);
        var spa = cc.spawn(scaleTo, moveTo);
        this.node.runAction(spa.easing(cc.easeBackOut()));
    }
    // update (dt) {},
});

cc._RF.pop();