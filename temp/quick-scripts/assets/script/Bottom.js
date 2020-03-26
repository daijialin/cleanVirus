(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/Bottom.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '45953W/p+tEr5tTMPGq/uGf', 'Bottom', __filename);
// script/Bottom.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        m_Toggle: [cc.Toggle],
        m_BottomItemPrefab: cc.Prefab,
        m_BottomItemParent: [cc.Node],
        m_SubWeaponContent: cc.Node,
        m_SubWeaponPrefab: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        window.gBottom = this;

        this.m_BottomItem = new Array();
        for (var i = 0; i < this.m_BottomItemParent.length; i++) {
            var node = cc.instantiate(this.m_BottomItemPrefab);
            this.m_BottomItemParent[i].addChild(node);
            node = node.getComponent("BottomItem");
            node.init(i);
            this.m_BottomItem[i] = node;
        }

        this.m_subWeaponItem = new Array();
        for (var i = 0; i < 6; i++) {
            var node = cc.instantiate(this.m_SubWeaponPrefab);
            this.m_SubWeaponContent.addChild(node);
            this.m_subWeaponItem = node.getComponent("subWeaponItem");
            this.m_subWeaponItem.init(i + 1);

            if (i > 1) {
                this.m_subWeaponItem.setDisable();
            }
        }
    },
    start: function start() {},
    Reset: function Reset() {},
    Play: function Play() {},

    MoveOut: function MoveOut() {
        this.node.runAction(cc.moveTo(0.5, cc.v2(0, -894)).easing(cc.easeBackOut()));
        for (var i = 0; i < this.m_Toggle.length; i++) {
            this.m_Toggle[i].isChecked = false;
        }
    },
    MoveIn: function MoveIn() {

        this.node.runAction(cc.moveTo(0.5, cc.v2(0, -725)).easing(cc.easeBackIn()));
    },

    onClickUpLevel: function onClickUpLevel(target, data) {
        if (target.isChecked) {
            gAirPlane.MoveTo(0.3, cc.v2(0, -36));
        } else {
            gAirPlane.MoveTo(0.3, cc.v2(0, -385));
        }
        if (target.node.name = 'Weapon') {} else if (target.node.name = 'SubWeapon') {} else if (target.node.name = 'Gold') {}
        this.onUpdate();
    },
    onUpdate: function onUpdate() {
        for (var i = 0; i < this.m_BottomItem.length; i++) {
            this.m_BottomItem[i].onUpdate();
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
        //# sourceMappingURL=Bottom.js.map
        