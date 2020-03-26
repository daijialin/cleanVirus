"use strict";
cc._RF.push(module, '08f67yQe/NG46dQc0o2jDmC', 'VirusMake');
// script/VirusMake.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        m_VirusPrefab: [cc.Prefab],
        m_animDie: cc.Prefab,
        m_VirusParentl: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:
    ctor: function ctor() {

        this.m_VirusSleep = false;
    },
    onLoad: function onLoad() {
        window.gVirusMake = this;
        this.dieAnimPool = new cc.NodePool();
        this.virusPool = new Array();
        for (var i = 0; i < this.m_VirusPrefab.length; i++) {
            this.virusPool[i] = new cc.NodePool();
        }
        this.m_BriefHp = 0;
        var level = gDataCtl.GetCurLevelDesign();
        this.m_NextBrieValue = gDataCtl.GetLDData(level).next;
    },

    Reset: function Reset() {
        this.m_BriefHp = 0;
        var level = gDataCtl.GetCurLevelDesign();
        this.m_NextBrieValue = gDataCtl.GetLDData(level).next;
        this.m_Brief = 0;
        this.m_VirusSleep = false;
    },
    start: function start() {},

    begin: function begin() {
        this.m_Brief = 0;
        var level = gDataCtl.GetCurLevelDesign();
        this.m_AllHp = 0;
        for (var i = 0; i < gDataCtl.GetLDData(level).hp.length; i++) {
            for (var j = 0; j < gDataCtl.GetLDData(level).hp[i].length; j++) {
                this.m_AllHp += gDataCtl.GetLDData(level).hp[i][j];
            }
        }
        this.m_CurHp = this.m_AllHp;

        gVirusHpView.changeProgress(1);
        this.nextBrief();
    },
    nextBrief: function nextBrief() {

        var level = gDataCtl.GetCurLevelDesign();
        if (this.m_Brief >= gDataCtl.GetLDData(level).hp.length) {
            return;
        }

        var hp = gDataCtl.GetLDData(level).hp[this.m_Brief];
        var scale = gDataCtl.GetLDData(level).scale;
        var color = gDataCtl.GetLDData(level).color;
        for (var i = 0; i < hp.length; i++) {
            var type = random(0, gDataCtl.GetLDData(level).virus.length);
            var node = this.createVirus(type);
            var js = node.getComponent('' + type);
            if (js != null) {

                var randHp = hp[i];
                this.m_BriefHp += randHp;
                js.setHp(randHp);
                js.setDieGold(randHp);
                var _color = color['' + randHp] ? color['' + randHp] : new cc.Color(255, 255, 166);
                js.setColor(_color, color);
                var _scale = scale['' + randHp] ? scale['' + randHp] : 0.6;
                js.setScale(_scale);
                if (this.m_VirusSleep) {
                    js.sleep(true);
                }
            } else {
                var a;
                a = 1;
            }
        }
        this.m_Brief++;
    },
    Play: function Play() {},

    MoveOut: function MoveOut() {
        this.scheduleOnce(function () {
            this.begin();
        }.bind(this), 1.5);
    },
    MoveIn: function MoveIn() {},
    createVirus: function createVirus(id) {
        var virus = null;
        if (this.virusPool[id].size() > 0) {
            virus = this.virusPool[id].get();
        } else {
            virus = cc.instantiate(this.m_VirusPrefab[id]);
        }
        virus.parent = this.m_VirusParentl; // 
        var js = virus.getComponent('' + id);
        js.init();
        virus.id = id;
        return virus;
    },
    onVirusKilled: function onVirusKilled(virus) {
        var js = virus.getComponent('' + virus.id);
        // if( js != null)js.stopAllActions();
        var id = virus.id;
        this.virusPool[id].put(virus); // 和初始化时的方法一样，将节点放进对象池，这个方法会同时调用节点的 removeFromParent
    },
    onVirusKilledAll: function onVirusKilledAll() {
        var children = this.m_VirusParentl.children;
        for (var i = 0; i != children.length;) {
            this.onVirusKilled(children[i]);
        }
    },
    createGoldMoveAnim: function createGoldMoveAnim(virus) {

        var js = virus.getComponent('' + virus.id);
        if (js.m_DieGold > 0) {
            var count = js.m_DieGold;
            count = count > 36 ? 36 : count;
            var pos = virus.getPosition();
            pos.x -= 450;
            pos.y -= 800;
            gGameCtl.createGoldAnim(pos, cc.v2(-214, 572), gVirusHpView.m_CoinNode, 300, count, js.m_DieGold, function (gold) {
                gVirusHpView.AddGold(gold);
            }.bind(this));
        }
    },
    createDieAnim: function createDieAnim(node) {
        this.createGoldMoveAnim(node);
        var pos = node.getPosition();
        var scale = node.getScale();
        var js = node.getComponent('' + node.id);
        var color = js.m_CurColor;

        var anim;
        if (this.dieAnimPool.size() > 0) {
            anim = this.dieAnimPool.get();
        } else {
            anim = cc.instantiate(this.m_animDie);
        }
        anim.parent = this.m_VirusParentl;

        anim.x = pos.x;
        anim.y = pos.y;
        anim.setScale(cc.v2(scale * 2, scale * 2));
        anim.color = color;

        var js = anim.getComponent(cc.Animation);
        js.playOver = function () {
            this.onDieAnimKilled(anim);
        }.bind(this);
        js.play('die');
    },
    onDieAnimKilled: function onDieAnimKilled(node) {
        this.dieAnimPool.put(node);
    },

    //sleep 是否休眠,pro 速度比例
    sleepVirus: function sleepVirus() {
        this.m_VirusSleep = true;
        var children = this.m_VirusParentl.children;
        for (var i = 0; i < children.length; i++) {
            var js = children[i].getComponent('' + children[i].id);
            if (js != null) {
                js.sleep(true);
            }
        }
    },
    unsleepVirus: function unsleepVirus() {
        this.m_VirusSleep = false;
        var children = this.m_VirusParentl.children;
        for (var i = 0; i < children.length; i++) {
            var js = children[i].getComponent('' + children[i].id);
            if (js != null) {
                js.sleep(false);
            }
        }
    },
    hit: function hit(value) {
        this.m_BriefHp += value;
        this.m_CurHp += value;
        if (this.m_BriefHp < this.m_NextBrieValue) {
            this.nextBrief();
        }
        gVirusHpView.changeProgress(this.m_CurHp / this.m_AllHp);
        if (this.m_CurHp == 0) {
            gTouchCtl.setCanTouch(false);
            gBrief.onShowView(this.m_CurHp);
        }
    }
    // update (dt) {},
});

cc._RF.pop();