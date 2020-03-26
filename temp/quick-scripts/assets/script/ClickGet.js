(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/ClickGet.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b2464u3O3tJGK9cfOqVDjlN', 'ClickGet', __filename);
// script/ClickGet.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        m_labGold: cc.Label,
        m_progress: cc.ProgressBar
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.updateData();
    },
    Reset: function Reset() {},
    Play: function Play() {},

    MoveOut: function MoveOut() {
        this.node.runAction(cc.moveTo(0.5, cc.v2(552, 0)).easing(cc.easeBackOut()));
    },
    MoveIn: function MoveIn() {

        this.node.runAction(cc.moveTo(0.5, cc.v2(383, 0)).easing(cc.easeBackIn()));
    },

    onClickGet: function onClickGet(target, data) {
        cc.log('获取金币');
        if (gDataCtl.GetTaskGold() <= 0) return;
        gGameCtl.createGoldAnim(this.node.getPosition(), cc.v2(-383, 733), gGameCtl.m_Top.getGoldNode(), 300, 15, gDataCtl.GetTaskGold(), function (gold) {
            gDataCtl.AddGold(gold);
            gGameCtl.m_Top.updateData();
        }.bind(this));
        gDataCtl.ClearTaskGold();
        this.updateData();
    },

    updateData: function updateData() {
        this.m_labGold.string = goldCrarryBit(gDataCtl.GetTaskGold());
    },
    update: function update(dt) {
        var time = gDataCtl.GetGoldAddTime();
        var dis = 1 / time;
        dis *= dt;
        this.m_progress.progress += dis;
        if (this.m_progress.progress >= 1) {
            this.m_progress.progress = 0;
            var gold = gDataCtl.GetAwardGold();
            gDataCtl.AddTaskGold(gold);
            gDataCtl.save();
            this.updateData();
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
        //# sourceMappingURL=ClickGet.js.map
        