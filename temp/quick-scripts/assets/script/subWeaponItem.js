(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/subWeaponItem.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a8693c2H5REQIk+y2U/AeOU', 'subWeaponItem', __filename);
// script/subWeaponItem.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        m_texture: cc.SpriteAtlas,
        m_subWeapon: cc.Sprite
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {},
    start: function start() {},

    init: function init(index) {
        this.m_Index = index;
        var sprite = this.m_texture.getSpriteFrame('subWeapon' + index);
        this.m_subWeapon.spriteFrame = sprite;
    },
    onClickChange: function onClickChange() {
        var toggle = this.getComponent(cc.Toggle);
        if (toggle.isChecked) {
            gAirPlane.ChangeAirPlane(this.m_Index);
        } else {
            gAirPlane.ChangeAirPlane(0);
        }
    },
    setDisable: function setDisable() {

        var toggle = this.getComponent(cc.Toggle);
        toggle.interactable = false;

        var sprite = this.m_texture.getSpriteFrame('subWeapon_gray' + this.m_Index);
        this.m_subWeapon.spriteFrame = sprite;
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
        //# sourceMappingURL=subWeaponItem.js.map
        