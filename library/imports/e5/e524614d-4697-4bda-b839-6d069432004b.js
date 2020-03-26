"use strict";
cc._RF.push(module, 'e5246FNRpdL2rg5bQaUMgBL', 'Gun');
// script/Gun.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        m_Light: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    ctor: function ctor() {
        this.m_ButtleCount = 10;
    },
    onLoad: function onLoad() {

        var seq = cc.sequence(cc.scaleTo(0.1, 0, 0), cc.scaleTo(0.1, 1, 1));
        this.m_Light.runAction(cc.repeatForever(seq));

        this.m_Light.active = false;

        this.FireValue = 0;
        var level = gDataCtl.GetWeaponSpeed();
        var maxValue = gDataCtl.m_WeaponSpeed.length;
        for (var i = 0; i < level && i < maxValue; i++) {
            this.FireValue += gDataCtl.m_WeaponSpeed[i][0];
        }
    },
    start: function start() {},

    createCallBack: function createCallBack() {
        // cc.log('createCallBack');
        var count = gDataCtl.GetWeaponFire() / 10;
        if (count <= 1) {
            count = 1;
        } else if (count >= 30) {
            count = 30;
        }
        gGameCtl.createBullet(parseInt(count));
    },
    BeginFire: function BeginFire() {
        this.m_Light.active = true;
        this.createCallBack();
        var speed = gDataCtl.GetWeaponSpeedService();
        this.schedule(this.createCallBack, speed);
    },
    EndFire: function EndFire() {
        this.m_Light.active = false;
        this.unschedule(this.createCallBack);
    },
    SetBulletCount: function SetBulletCount(count) {
        this.m_ButtleCount = count;
    },
    ClearAllBullet: function ClearAllBullet() {}
    // update (dt) {},
});

cc._RF.pop();