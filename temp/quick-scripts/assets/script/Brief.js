(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/Brief.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '475f2t7wutGtqkzqf5wthNP', 'Brief', __filename);
// script/Brief.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        m_BG: cc.Node,
        m_Gold: cc.Label,
        m_GuangGaoGold: cc.Label,
        m_BtAdvertising: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        window.gBrief = this;
        this.node.active = false;
    },
    start: function start() {},

    onShowView: function onShowView(hp) {
        if (this.node.active) return;

        var func = function () {
            gAirPlane.EndFire();
            gGameCtl.onBulletKilledAll();
            // gAirPlane.DieEnd();
            gVirusHpView.Brief();
            gVirusMake.unsleepVirus();
            gGameCtl.playAirPlaneDieAnim(this.node.getPosition());

            var gold = goldCrarryBit(gVirusHpView.GetGold());
            var gold1 = goldCrarryBit(gVirusHpView.GetGold() * 10);

            this.m_Gold.string = '' + gold;
            this.m_GuangGaoGold.string = '' + gold1;
            this.node.active = true;
            this.node.x = 0;

            this.m_BG.runAction(cc.fadeTo(1.5, 130));
            this.node.runAction(cc.fadeIn(1.5));

            this.m_BtAdvertising.active = gVirusHpView.GetGold() > 0;
        }.bind(this);
        if (hp == 0) {
            gLevelDesignCtl.Brief(function () {
                gLevelDesignCtl.NextLevel(function () {
                    func();
                });
            }.bind(this));
        } else {
            func();
        }
    },
    onHideView: function onHideView() {
        this.node.active = false;
    },
    onClickGuangGao: function onClickGuangGao() {

        gAirPlane.MoveOutScreen();
        this.onHideView();
        gAdvertising.onShow(function () {
            var gold = gVirusHpView.GetGold();
            this.BriefData(gold * 10);
        }.bind(this));
    },

    onClickGetGold: function onClickGetGold() {
        var gold = gVirusHpView.GetGold();
        this.onHideView();
        this.BriefData(gold);
    },
    BriefData: function BriefData(gold) {

        gAirPlane.MoveOutScreen();
        gVirusHpView.node.opacity = 0;
        gVirusMake.onVirusKilledAll();
        gGameCtl.Action(ACTION_RESET);
        gGameCtl.Action(ACTION_MOVE_IN);
        gGameCtl.Action(ACTION_PLAY);

        gGameCtl.GameReset();

        if (gold == 0) return;

        gGameCtl.createGoldAnim(cc.v2(-178, -87), cc.v2(-383, 733), gGameCtl.m_Top.getGoldNode(), 150, 8, gold, function (gold) {
            gVirusHpView.Reset();
            gDataCtl.AddGold(gold);
            gGameCtl.m_Top.updateData();
        }.bind(this));
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
        //# sourceMappingURL=Brief.js.map
        