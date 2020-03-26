
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

    },
    MoveOut:function(){
        this.node.runAction(cc.moveTo(0.5,cc.v2(-508,407)).easing(cc.easeBackOut()));
    },
    MoveIn:function(){

        this.node.runAction(cc.moveTo(0.5,cc.v2(-416,407)).easing(cc.easeBackIn()));
    }
    // update (dt) {},
});
