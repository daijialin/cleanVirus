"use strict";
cc._RF.push(module, 'f16b8bsdAJG173ZtPiWb4V5', 'data');
// script/common/data.js

'use strict';

// cc.sys.localStorage.setItem(key, value);
// cc.sys.localStorage.getItem(key);
// cc.sys.localStorage.removeItem(key);
// JSON.parse(jsonstr); //可以将json字符串转换成json对象 
// JSON.stringify(jsonobj); //可以将json对象转换成json对符串 
window.gVirusColor = [{ pro: 1, color: new cc.Color(255, 255, 166) }, { pro: 2, color: new cc.Color(205, 255, 166) }, { pro: 5, color: new cc.Color(122, 255, 116) }, { pro: 6, color: new cc.Color(116, 255, 216) }, { pro: 10, color: new cc.Color(116, 194, 255) }, { pro: 15, color: new cc.Color(255, 116, 224) }, { pro: 18, color: new cc.Color(255, 116, 160) }, { pro: 20, color: new cc.Color(255, 116, 116) }, { pro: 100, color: new cc.Color(255, 39, 39) }];
window.gVirusScale = [{ pro: 1, scale: 0.4 }, { pro: 2, scale: 0.5 }, { pro: 5, scale: 0.6 }, { pro: 10, scale: 0.7 }, { pro: 20, scale: 0.8 }, { pro: 40, scale: 0.9 }, { pro: 100, scale: 1 }];
window.gSpeed = [cc.v2(50, 60), cc.v2(60, 70), cc.v2(70, 80), cc.v2(80, 90), cc.v2(90, 100), cc.v2(100, 110), cc.v2(110, 120)];
var data = cc.Class({
    ctor: function ctor() {
        this.gData = {};
        this.gLevelDesign = [{ hp: 0 }, { hp: [[1, 1, 1, 1, 10, 5, 1, 1, 1], [1, 1, 1, 1, 10, 5, 1, 1, 1], [1, 1, 1, 1, 1000, 5, 1, 1, 1]],
            scale: {
                '1': 0.6,
                '10': 1,
                '5': 0.8
            },
            color: {
                '1': new cc.Color(255, 255, 166),
                '5': new cc.Color(122, 255, 116),
                '10': new cc.Color(255, 116, 116)
            },
            next: 10, virus: [0] }];

        this.m_WeaponSpeed = [[1, 1,, 0.50], [10, 10, 0.49], [12, 30, 0.48], [18, 80, 0.47], [32, 120, 0.46], [52, 180, 0.45], [93, 320, 0.44], [96, 980, 0.43], [124, 1980, 0.42], [350, 4000, 0.41], [865, 12000, 0.40], [2097, 45000, 0.39], [3502, 200000, 0.38], [5605, 300000, 0.37], [6605, 690000, 0.36], [7605, 790000, 0.35], [8605, 890000, 0.34], [10605, 12000, 0.33], [11605, 158000, 0.32], [12605, 350000, 0.31], [12605, 350000, 0.30], [12605, 350000, 0.29], [12605, 350000, 0.28], [12605, 350000, 0.27], [12605, 350000, 0.26], [12605, 350000, 0.25], [12605, 350000, 0.24], [12605, 350000, 0.23], [12605, 350000, 0.22], [12605, 350000, 0.21], [12605, 350000, 0.20], [12605, 350000, 0.19], [12605, 350000, 0.18], [12605, 350000, 0.17], [12605, 350000, 0.16], [12605, 350000, 0.15], [12605, 350000, 0.14], [12605, 350000, 0.13], [12605, 350000, 0.12], [12605, 350000, 0.11], [12605, 350000, 0.10], [12605, 350000, 0.09], [12605, 350000, 0.08], [12605, 350000, 0.07], [12605, 350000, 0.06], [12605, 350000, 0.05], [12605, 350000, 0.04], [12605, 350000, 0.03]];

        this.m_WeaponFire = [[1, 1], [10, 10], [12, 300], [18, 800], [32, 1200], [52, 1800], [93, 3200], [96, 9800], [124, 19800], [350, 20000], [865, 21000], [2097, 21000], [3502, 21000], [5605, 21000], [5605, 21000], [5605, 21000], [5605, 21000], [5605, 21000], [5605, 21000], [5605, 21000], [5605, 21000], [5605, 21000], [5605, 21000], [5605, 21000], [5605, 21000], [5605, 21000], [5605, 21000], [5605, 21000], [5605, 21000], [5605, 21000], [5605, 21000], [5605, 21000], [5605, 21000], [5605, 21000], [5605, 21000], [5605, 21000], [5605, 21000], [5605, 21000], [5605, 21000], [5605, 21000], [5605, 21000], [5605, 21000], [5605, 21000], [5605, 21000], [5605, 21000], [5605, 21000], [5605, 21000], [5605, 21000], [5605, 21000], [5605, 21000]];
    },
    clear: function clear() {
        cc.sys.localStorage.removeItem('data');
        cc.sys.localStorage.removeItem('Weapon');
        this.load();
    },
    save: function save() {
        var str = JSON.stringify(this.gData);
        cc.sys.localStorage.setItem('data', str);
    },
    load: function load() {
        var str = cc.sys.localStorage.getItem('data');
        this.gData = JSON.parse(str);
        if (this.gData == null) {
            this.gData = {};
        }

        return this.gData;
    },

    //实际上玩家身上的金币
    AddGold: function AddGold(gold) {
        if (this.gData.m_Gold == null) {
            this.gData.m_Gold = 0;
        }
        this.gData.m_Gold += gold;
        this.save();
    },
    SubGold: function SubGold(gold) {
        if (this.gData.m_Gold == null) {
            this.gData.m_Gold = 0;
        }
        this.gData.m_Gold -= gold;
        this.save();
    },
    GetGold: function GetGold() {
        if (this.gData.m_Gold == null) {
            this.gData.m_Gold = 9999999999;
        }
        return this.gData.m_Gold;
    },
    //设置获取金币时间
    SetGoldAddTime: function SetGoldAddTime(time) {
        this.gData.m_GetGoldTime = time;
        this.save();
    },
    //获取,金币进度时间
    GetGoldAddTime: function GetGoldAddTime() {
        if (this.gData.m_GetGoldTime == null) {
            this.gData.m_GetGoldTime = 3;
        }
        return this.gData.m_GetGoldTime;
    },
    //设置奖励金币
    SetAwardGold: function SetAwardGold(gold) {
        this.gData.m_AwardGold = gold;
        this.save();
    },
    GetAwardGold: function GetAwardGold() {
        if (this.gData.m_AwardGold == null) {
            this.gData.m_AwardGold = 3;
        }
        return this.gData.m_AwardGold;
    },
    AddTaskGold: function AddTaskGold(gold) {
        if (this.gData.m_TaskGold == null) {
            this.gData.m_TaskGold = 0;
        }
        this.gData.m_TaskGold += gold;
        this.save();
    },
    ClearTaskGold: function ClearTaskGold() {

        this.gData.m_TaskGold = 0;
        this.save();
    },
    GetTaskGold: function GetTaskGold() {
        if (this.gData.m_TaskGold == null) {
            this.gData.m_TaskGold = 0;
        }
        return this.gData.m_TaskGold;
    },
    GetCurLevelDesign: function GetCurLevelDesign() {

        if (this.gData.m_LevelDesignNum == null) {
            this.gData.m_LevelDesignNum = 1;
        }
        return this.gData.m_LevelDesignNum;
    },
    AddCurLevelDesign: function AddCurLevelDesign() {
        if (this.gData.m_LevelDesignNum == null) {
            this.gData.m_LevelDesignNum = 1;
        }
        this.gData.m_LevelDesignNum++;
        this.save();
    },
    GetLDData: function GetLDData(index) {
        if (index >= gLevelDesign.length - 1) {
            return gLevelDesign[gLevelDesign.length - 1];
        }
        return gLevelDesign[index];
    },
    GetWeaponFire: function GetWeaponFire() {
        if (this.gData.m_WeaponFire == null) {
            this.gData.m_WeaponFire = 1;
        }
        return this.gData.m_WeaponFire;
    },
    AddWeapoFire: function AddWeapoFire() {
        if (this.gData.m_WeaponFire == null) {
            this.gData.m_WeaponFire = 1;
        }
        this.gData.m_WeaponFire++;
        this.save();
        return this.gData.m_WeaponFire;
    },
    GetWeaponFireValue: function GetWeaponFireValue() {
        var value = 0;
        var level = gDataCtl.GetWeaponFire();
        var maxValue = gDataCtl.m_WeaponFire.length;
        for (var i = 0; i < level && i < maxValue; i++) {
            value += gDataCtl.m_WeaponFire[i][0];
        }
        return value;
    },
    GetWeaponUpFireMoney: function GetWeaponUpFireMoney() {
        var level = this.GetWeaponFire();
        if (level >= gDataCtl.m_WeaponFire.length) {
            var index = gDataCtl.m_WeaponFire.length - 1;
            return gDataCtl.m_WeaponFire[index][1];
        }
        return gDataCtl.m_WeaponFire[level][1];
    },
    GetWeaponFireMax: function GetWeaponFireMax() {
        return gDataCtl.m_WeaponFire.length;
    },
    GetWeaponSpeedService: function GetWeaponSpeedService() {
        var index = this.GetWeaponSpeed();
        if (gDataCtl.m_WeaponSpeed[index] == null) {
            return gDataCtl.m_WeaponSpeed[gDataCtl.m_WeaponSpeed.length - 1][2];
        }
        return gDataCtl.m_WeaponSpeed[index][2];
    },
    GetWeaponSpeed: function GetWeaponSpeed() {
        if (this.gData.m_WeaponSpeed == null) {
            this.gData.m_WeaponSpeed = 1;
        }
        return this.gData.m_WeaponSpeed;
    },
    GetWeaponSpeedValue: function GetWeaponSpeedValue() {
        var value = 0;
        var level = gDataCtl.GetWeaponSpeed();
        var maxValue = gDataCtl.m_WeaponSpeed.length;
        for (var i = 0; i < level && i < maxValue; i++) {
            value += gDataCtl.m_WeaponSpeed[i][0];
        }
        return value;
    },
    GetWeaponUpSpeedMoney: function GetWeaponUpSpeedMoney() {
        var level = this.GetWeaponSpeed();
        if (level >= gDataCtl.m_WeaponSpeed.length) {
            var index = gDataCtl.m_WeaponSpeed.length - 1;
            return gDataCtl.m_WeaponSpeed[index][1];
        }
        return gDataCtl.m_WeaponSpeed[level][1];
    },
    GetWeaponSpeedMax: function GetWeaponSpeedMax() {
        return gDataCtl.m_WeaponSpeed.length;
    },
    AddWeapoSpeed: function AddWeapoSpeed() {
        if (this.gData.m_WeaponSpeed == null) {
            this.gData.m_WeaponSpeed = 1;
        }
        this.gData.m_WeaponSpeed++;

        this.save();
        return this.gData.m_WeaponSpeed;
    },

    GetGoldWeaponFire: function GetGoldWeaponFire() {
        if (this.gData.m_GoldWeaponFire == null) {
            this.gData.m_GoldWeaponFire = 1;
        }
        return this.gData.m_GoldWeaponFire;
    },
    AddGoldWeapoFire: function AddGoldWeapoFire() {
        if (this.gData.m_GoldWeaponFire == null) {
            this.gData.m_GoldWeaponFire = 1;
        }
        this.gData.m_GoldWeaponFire++;
        this.save();
        return this.gData.m_GoldWeaponFire;
    },
    GetGoldWeaponSpeed: function GetGoldWeaponSpeed() {
        if (this.gData.m_GoldWeaponSpeed == null) {
            this.gData.m_GoldWeaponSpeed = 1;
        }
        return this.gData.m_GoldWeaponSpeed;
    },
    AddGoldWeapoSpeed: function AddGoldWeapoSpeed() {
        if (this.gData.m_GoldWeaponSpeed == null) {
            this.gData.m_GoldWeaponSpeed = 1;
        }
        this.gData.m_GoldWeaponSpeed++;

        this.save();
        return this.gData.m_GoldWeaponSpeed;
    },

    GetSubWeaponFire: function GetSubWeaponFire() {
        if (this.gData.m_SubWeaponFire == null) {
            this.gData.m_SubWeaponFire = 1;
        }
        return this.gData.m_SubWeaponFire;
    },
    AddSubWeapoFire: function AddSubWeapoFire() {
        if (this.gData.m_SubWeaponFire == null) {
            this.gData.m_SubWeaponFire = 1;
        }
        this.gData.m_SubWeaponFire++;
        this.save();
        return this.gData.m_SubWeaponFire;
    },
    GetSubWeaponSpeed: function GetSubWeaponSpeed() {
        if (this.gData.m_SubWeaponSpeed == null) {
            this.gData.m_SubWeaponSpeed = 1;
        }
        return this.gData.m_SubWeaponSpeed;
    },
    AddSubWeapoSpeed: function AddSubWeapoSpeed() {
        if (this.gData.m_SubWeaponSpeed == null) {
            this.gData.m_SubWeaponSpeed = 1;
        }
        this.gData.m_SubWeaponSpeed++;

        this.save();
        return this.gData.m_SubWeaponSpeed;
    }
});

window.gDataCtl = new data();
window.gDataCtl.load();
window.gData = window.gDataCtl.gData;
window.gLevelDesign = window.gDataCtl.gLevelDesign;

cc._RF.pop();