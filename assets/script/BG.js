
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    Reset(){

    },
    Play(){
        var seq = cc.sequence(cc.delayTime(1),cc.scaleTo(0.5,1.2,1.2));
        this.node.runAction(seq);
    },
    MoveOut:function(){
        this.node.runAction(cc.scaleTo(0.5,1,1));
    },
    MoveIn:function(){
        
        this.node.runAction(cc.scaleTo(0.5,1.2,1.2));
    }
    // update (dt) {},
});
