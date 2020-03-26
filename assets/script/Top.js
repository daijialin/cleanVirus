
cc.Class({
    extends: cc.Component,

    properties: {
        m_GoldNode:cc.Node,
        m_labGold:cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        window.gTop = this;
        this.updateData();
    },

    start () {

    },
    Reset:function(){
        this.node.setPosition(cc.v2(0,761));
    },
    MoveOut:function(){
        this.Reset();
        this.node.setPosition(cc.v2(0,736));
        this.node.runAction(cc.moveTo(0.2,cc.v2(0,848)).easing(cc.easeBackIn()));
    },
    MoveIn:function(){
        
        this.Reset();
        this.node.setPosition(cc.v2(0,848));

        this.node.runAction(cc.moveTo(0.2,cc.v2(0,736)).easing(cc.easeBackOut()));
    },
    getGoldNode:function(){
        return this.m_GoldNode;
    },
    updateData:function(){
        this.m_labGold.string = goldCrarryBit(gDataCtl.GetGold());

        if ( window.gBottom  != null ){
            gBottom.onUpdate();
        }

    },
    // update (dt) {},
});
