"use strict";
cc._RF.push(module, '4dc3fvqUDhMMayEzyiauxLo', 'GameControl');
// script/GameControl.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        m_Logo: cc.Node,
        m_LevelDesign: cc.Node,
        m_Top: cc.Node,
        m_Setting: cc.Node,
        m_ClickGet: cc.Node,
        m_Bottom: cc.Node,
        m_Tip: cc.Node,
        m_BG: cc.Node,
        m_AirPlane: cc.Node,
        m_MonsterHP: cc.Node,
        m_GoldPrefab: cc.Prefab,
        m_TouchControl: cc.Node,
        m_BulletPrefab: cc.Prefab,
        m_VirusMake: cc.Node,
        m_BulletParent: cc.Node,
        m_BlackBG: cc.Node,
        m_Resurgence: cc.Node,
        m_AirPlaneDieAnim: cc.Animation,
        m_SubWeaponParent: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:
    ctor: function ctor() {
        this.m_ClassArray = new Array();
        this.goldPool = new cc.NodePool();
        this.bulletPool = new cc.NodePool();
    },
    onLoad: function onLoad() {

        gDataCtl.clear();
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;

        gGameCtl = this;
        this.m_Logo = this.m_Logo.getComponent('Logo');
        this.m_ClassArray.push(this.m_Logo);

        this.m_LevelDesign = this.m_LevelDesign.getComponent('LevelDesign');
        this.m_LevelDesign.Reset();
        this.m_ClassArray.push(this.m_LevelDesign);

        this.m_Top = this.m_Top.getComponent('Top');
        this.m_ClassArray.push(this.m_Top);

        this.m_Setting = this.m_Setting.getComponent('Setting');
        this.m_ClassArray.push(this.m_Setting);

        this.m_ClickGet = this.m_ClickGet.getComponent('ClickGet');
        this.m_ClassArray.push(this.m_ClickGet);

        this.m_Bottom = this.m_Bottom.getComponent('Bottom');
        this.m_ClassArray.push(this.m_Bottom);

        this.m_Tip = this.m_Tip.getComponent('Tip');
        this.m_ClassArray.push(this.m_Tip);

        this.m_BG = this.m_BG.getComponent('BG');
        this.m_ClassArray.push(this.m_BG);

        this.m_AirPlane = this.m_AirPlane.getComponent('AirAutoPlay');
        this.m_ClassArray.push(this.m_AirPlane);

        this.m_MonsterHP = this.m_MonsterHP.getComponent('MonsterHp');
        this.m_ClassArray.push(this.m_MonsterHP);

        this.m_VirusMake = this.m_VirusMake.getComponent('VirusMake');
        this.m_ClassArray.push(this.m_VirusMake);

        this.m_Resurgence = this.m_Resurgence.getComponent('Resurgence');

        gAirPlane = this.m_AirPlane;

        for (var i = 0; i < this.m_ClassArray.length; i++) {
            var cls = this.m_ClassArray[i];
            if (cls.Play != null) {
                cls.Play();
            }
        }

        this.scheduleOnce(function () {
            this.m_TouchControl.active = true;
        }.bind(this), 1.5);

        this.m_AirPlaneDieAnim.playOver = function () {
            this.m_AirPlaneDieAnim.node.active = false;
        }.bind(this);
    },

    //全局调用
    //srcPos:开始位置,
    //dstPos:目标位置
    //radius:圆半径
    //goldCount:切分多少块,多少个金币
    //addGold:需要增加多少金币
    //callBack:动画结束回调
    createGoldAnim: function createGoldAnim(srcPos, dstPos, srcNode, radius, goldCount, addGold, callBack) {

        var array = this.getPoint(radius, srcPos.x, srcPos.y, goldCount);

        var nodeArray = new Array();
        for (var i = 0; i < array.length; i++) {
            var gold = this.createGold(this.node);
            var randPos = cc.v2(array[i].x + random(0, 50), array[i].y + random(0, 50));
            gold.setPosition(srcPos);
            nodeArray.push({ gold: gold, randPos: randPos });
        }
        nodeArray.sort(function (a, b) {
            var disa = distance(a.randPos, dstPos);
            var disb = distance(b.randPos, dstPos);
            return disa - disb;
        });
        var notPlay = false;
        var targetGoldNode = srcNode;
        for (var i = 0; i < nodeArray.length; i++) {

            var pos = nodeArray[i].randPos;
            var node = nodeArray[i].gold;
            nodeArray[i].gold.id = i;
            var seq = cc.sequence(cc.moveTo(0.5, pos), cc.delayTime(i * 0.03), cc.moveTo(0.5, dstPos), cc.callFunc(function (node) {
                // targetGoldNode.stopAllActions();
                if (!notPlay) {
                    notPlay = true;
                    var seq = cc.sequence(cc.scaleTo(0.1, 2, 2), cc.scaleTo(0.1, 1, 1), cc.callFunc(function () {
                        notPlay = false;
                    }));
                    targetGoldNode.runAction(seq);
                }

                if (node.id == nodeArray.length - 1) {
                    if (callBack != null) callBack(addGold);
                }
                this.onGoldKilled(node);
            }.bind(this)));

            node.runAction(seq);
        }
    },
    createGold: function createGold(parentNode) {
        var enemy = null;
        if (this.goldPool.size() > 0) {
            // 通过 size 接口判断对象池中是否有空闲的对象
            enemy = this.goldPool.get();
        } else {
            // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            enemy = cc.instantiate(this.m_GoldPrefab);
        }
        enemy.parent = parentNode; // 将生成的敌人加入节点树
        return enemy;
    },
    createBullet: function createBullet(count) {
        if (count == 1) {
            var bullet = null;
            if (this.bulletPool.size() > 0) {
                // 通过 size 接口判断对象池中是否有空闲的对象
                bullet = this.bulletPool.get();
            } else {
                // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
                bullet = cc.instantiate(this.m_BulletPrefab);
                bullet.CollType = COLLISION_BULLET;
            }
            bullet.parent = this.m_BulletParent; // 将生成的敌人加入节点树

            var pos = this.m_AirPlane.node.getPosition();
            pos.y += 116;
            bullet.setPosition(pos);
            pos.y += 100;
            var js = bullet.getComponent('Bullet');
            js.init();
            js.setSecondPos(pos);
        } else {
            var left = 1;
            var right = 1;
            var imgSize = 30;
            for (var i = 0; i < count; i++) {

                var offset = 0;
                if (i % 2) {
                    offset = left * imgSize;
                    offset -= imgSize / 2;
                    left++;
                } else {
                    offset = -right * imgSize;
                    offset += imgSize / 2;
                    right++;
                }
                var _bullet = null;
                if (this.bulletPool.size() > 0) {
                    // 通过 size 接口判断对象池中是否有空闲的对象
                    _bullet = this.bulletPool.get();
                } else {
                    // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
                    _bullet = cc.instantiate(this.m_BulletPrefab);
                    _bullet.CollType = COLLISION_BULLET;
                }
                _bullet.parent = this.m_BulletParent; // 将生成的敌人加入节点树

                var pos = this.m_AirPlane.node.getPosition();
                pos.y += 116;
                _bullet.setPosition(pos);
                var js = _bullet.getComponent('Bullet');
                js.init();
                js.setSecondPos(cc.v2(pos.x + offset, pos.y + 100));
            }
        }
    },
    onBulletKilled: function onBulletKilled(bullet) {
        for (var item in this.bulletPool) {
            if (item == bullet) {
                return;
            }
        }

        bullet.runAction(cc.show());
        bullet.parent = null;
        this.bulletPool.put(bullet); // 和初始化时的方法一样，将节点放进对象池，这个方法会同时调用节点的 removeFromParent
    },
    onBulletKilledAll: function onBulletKilledAll() {
        var children = this.m_BulletParent.children;

        for (var i = 0; i != children.length;) {
            if (this.onBulletKilled != null) {
                this.onBulletKilled(children[i]);
            }
        }
    },
    sleepBullet: function sleepBullet(speed) {
        var children = this.m_BulletParent.children;
        for (var i = 0; i < children.length; i++) {
            var js = children[i].getComponent('Bullet');
            if (js != null) {
                js.setSpeed(speed);
            }
        }
    },
    onGoldKilled: function onGoldKilled(gold) {
        // enemy 应该是一个 cc.Node
        this.goldPool.put(gold); // 和初始化时的方法一样，将节点放进对象池，这个方法会同时调用节点的 removeFromParent
    },

    moveAirPlane: function moveAirPlane(pos) {
        var cur_pos = this.m_AirPlane.node.getPosition();
        this.m_AirPlane.node.setPosition(cc.v2(cur_pos.x + pos.x, cur_pos.y + pos.y));
    },
    /*
    * 求圆周上等分点的坐标
    * ox,oy为圆心坐标
    * r为半径
    * count为等分个数
    */
    getPoint: function getPoint(r, ox, oy, count) {
        var point = []; //结果
        var radians = Math.PI / 180 * Math.round(360 / count),
            //弧度
        i = 0;
        for (; i < count; i++) {
            var x = ox + r * Math.sin(radians * i),
                y = oy + r * Math.cos(radians * i);

            point.unshift({ x: x, y: y }); //为保持数据顺时针
        }
        return point;
    },
    start: function start() {},


    Action: function Action(action) {

        if (action == ACTION_RESET) {
            this.ActionReset();
        } else if (action == ACTION_PLAY) {
            this.ActionPlay();
        } else if (action == ACTION_MOVE_OUT) {
            this.ActionMoveOut();
        } else if (action == ACTION_MOVE_IN) {
            this.ActionMoveIn();
        }
    },

    ActionReset: function ActionReset() {

        for (var i = 0; i < this.m_ClassArray.length; i++) {
            var cls = this.m_ClassArray[i];
            if (cls.Reset != null) {
                cls.Reset();
            }
        }
    },
    ActionPlay: function ActionPlay() {
        for (var i = 0; i < this.m_ClassArray.length; i++) {
            var cls = this.m_ClassArray[i];
            if (cls.Play != null) {
                cls.Play();
            }
        }
    },
    ActionMoveOut: function ActionMoveOut() {
        for (var i = 0; i < this.m_ClassArray.length; i++) {
            var cls = this.m_ClassArray[i];
            if (cls.MoveOut != null) {
                cls.MoveOut();
            }
        }
    },
    ActionMoveIn: function ActionMoveIn() {
        for (var i = 0; i < this.m_ClassArray.length; i++) {
            var cls = this.m_ClassArray[i];
            if (cls.MoveIn != null) {
                cls.MoveIn();
            }
        }
    },

    Test1: function Test1(target, data) {
        if (data == '重置') {
            // gDataCtl.AddGold(999);
            gDataCtl.clear();
            this.m_Top.updateData();
            this.m_ClickGet.updateData();
            this.ActiveReset();
        } else if (data == '播放') {
            this.ActivePlay();
            this.m_LevelDesign.NextLevel();
        } else if (data == '移出') {
            this.ActiveMoveOut();
        } else if (data == '移入') {
            this.ActiveMoveIn();
        }
    },
    blackBGAnim: function blackBGAnim(show) {
        if (show) {
            this.m_BlackBG.runAction(cc.fadeTo(0.5, 130));
        } else {
            this.m_BlackBG.runAction(cc.fadeTo(0.5, 0));
        }
    },
    playAirPlaneDieAnim: function playAirPlaneDieAnim(pos) {
        this.m_AirPlaneDieAnim.node.active = true;
        this.m_AirPlaneDieAnim.node.setPosition(pos);
        this.m_AirPlaneDieAnim.play('explode');
    },
    GameReset: function GameReset() {
        cc.director.getCollisionManager().enabled = true;
        gTouchCtl.Reset();
        gBottom.onUpdate();
    }
    // update (dt) {},
});

cc._RF.pop();