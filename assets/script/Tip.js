
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    Reset(){
        this.node.opactiy = 255;
        this.node.rotastion = 0;
    },
    Play(){
        var seq = cc.sequence(
            cc.rotateTo(0.2,15),
            cc.rotateTo(0.4,-15),
            cc.rotateTo(0.4,15),
            cc.rotateTo(0.4,-15),
            cc.rotateTo(0.4,15),
            cc.rotateTo(0.2,0),
            cc.delayTime(2),
        );
        this.node.runAction(cc.repeatForever(seq));
    },
    MoveOut:function(){
        this.node.runAction(cc.fadeOut(0.2).easing(cc.easeBackOut()));
    },
    MoveIn:function(){

        this.node.runAction(cc.fadeIn(0.2).easing(cc.easeBackIn()));
    }

    // update (dt) {},
});
