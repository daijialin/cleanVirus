(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/subWeapon/coll/coll2.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4dd8a//MxJFvYsWkegnZXvr', 'coll2', __filename);
// script/subWeapon/coll/coll2.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        m_bombEff: cc.Animation
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {

        this.m_bombEff.node.parent = null;
        gGameCtl.m_SubWeaponParent.addChild(this.m_bombEff.node);
        this.m_bombEff.node.active = false;

        this.m_bombEff.hideEff = function () {
            this.m_bombEff.node.active = false;
        }.bind(this);
    },
    start: function start() {},


    onCollisionEnter: function onCollisionEnter(other, self) {
        self.node.active = false;

        var pos = self.node.convertToWorldSpaceAR(cc.v2(0, 0));
        pos = gGameCtl.m_SubWeaponParent.convertToNodeSpaceAR(pos);

        this.m_bombEff.node.setPosition(pos);
        this.m_bombEff.node.active = true;
        this.m_bombEff.play('3_bomb');
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
        //# sourceMappingURL=coll2.js.map
        