"use strict";
cc._RF.push(module, 'e0f030P139CfbJZtzp0l5H3', 'BottomItem');
// script/BottomItem.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        m_Name: cc.Label,
        m_Value: cc.Label,
        m_Gold: cc.Label,
        m_Button: cc.Button,
        m_CoinSprite: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:
    ctor: function ctor() {
        this.m_NameData = ['射速', '火力', '强度', '火力', '金币价值', '日常收益'];
        this.m_nValue = 1;
        this.m_nLevel = 1;
    },
    onLoad: function onLoad() {},


    init: function init(state) {
        this.m_State = state;
        this.m_nLevel = this.GetLevel();
        this.onUpdate();
    },
    GetLevel: function GetLevel() {
        if (this.m_State == 0) {
            return gDataCtl.GetWeaponSpeed();
        } else if (this.m_State == 1) {
            return gDataCtl.GetWeaponFire();
        } else if (this.m_State == 2) {
            return gDataCtl.GetSubWeaponSpeed();
        } else if (this.m_State == 3) {
            return gDataCtl.GetSubWeaponFire();
        } else if (this.m_State == 4) {
            return gDataCtl.GetGoldWeaponSpeed();
        } else if (this.m_State == 5) {
            return gDataCtl.GetGoldWeaponFire();
        }
    },
    AddLevel: function AddLevel() {
        if (this.m_State == 0) {
            return gDataCtl.AddWeapoSpeed();
        } else if (this.m_State == 1) {
            return gDataCtl.AddWeapoFire();
        } else if (this.m_State == 2) {
            return gDataCtl.AddSubWeapoSpeed();
        } else if (this.m_State == 3) {
            return gDataCtl.AddSubWeapoFire();
        } else if (this.m_State == 4) {
            return gDataCtl.AddGoldWeapoSpeed();
        } else if (this.m_State == 5) {
            return gDataCtl.AddGoldWeapoFire();
        }
    },
    GetGold: function GetGold() {
        if (this.m_State == 0) {
            return gDataCtl.GetWeaponUpSpeedMoney();
        } else if (this.m_State == 1) {
            return gDataCtl.GetWeaponUpFireMoney();
        } else {
            return 1;
        }
    },
    GetValue: function GetValue() {

        if (this.m_State == 0) {
            return gDataCtl.GetWeaponSpeedValue();
        } else if (this.m_State == 1) {
            return gDataCtl.GetWeaponFireValue();
        }
        return 1;
    },
    GetMaxLevel: function GetMaxLevel() {

        if (this.m_State == 0) {
            return gDataCtl.GetWeaponSpeedMax();
        } else if (this.m_State == 1) {
            return gDataCtl.GetWeaponFireMax();
        } else {
            return 1;
        }
    },
    onUpdate: function onUpdate() {
        this.m_Name.string = this.m_NameData[this.m_State] + '[' + this.m_nLevel + ']';
        this.m_Value.string = '' + this.GetValue();

        this.m_Gold.string = '' + goldCrarryBit(this.GetGold());

        var level = this.GetLevel();

        this.m_Button.interactable = true;
        this.m_Value.node.color = new cc.Color(255, 255, 255);
        this.m_CoinSprite.color = new cc.Color(255, 255, 255);
        this.m_Gold.node.color = new cc.Color(255, 255, 255);
        if (level != this.GetMaxLevel()) {

            var upgold = this.GetGold();
            var havegold = gDataCtl.GetGold();

            if (havegold < upgold) {
                this.m_Button.interactable = false;
                this.m_Value.node.color = new cc.Color(255, 0, 0);

                this.m_CoinSprite.color = new cc.Color(127, 127, 127);
                this.m_Gold.node.color = new cc.Color(127, 127, 127);
            }
        } else {
            this.m_Gold.string = "MAX";
            this.m_Button.interactable = false;
            this.m_Value.node.color = new cc.Color(255, 0, 0);
            this.m_CoinSprite.color = new cc.Color(127, 127, 127);
            this.m_Gold.node.color = new cc.Color(127, 127, 127);
        }
    },

    onBtUp: function onBtUp() {

        if (this.GetLevel() == this.GetMaxLevel()) {
            return;
        }
        var gold = gDataCtl.GetGold();
        var upgold = this.GetGold();
        if (gold >= upgold) {

            gDataCtl.SubGold(upgold);
            this.m_nLevel = this.AddLevel();

            this.onUpdate();
            gTop.updateData();
        }
    }

    // update (dt) {},
});

cc._RF.pop();