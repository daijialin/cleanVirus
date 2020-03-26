
cc.Class({
    extends: cc.Component,

    properties: {
        m_imgBoss:cc.Node,
        m_labNumber:cc.Label,
        m_Point:[cc.Node],
    },

    // LIFE-CYCLE CALLBACKS:
    ctor:function(){
        this.m_Index = 0;
    },
    onLoad () {
    },
    SetIndex:function(index){
        this.m_Index = index;
        // if( index == 1 || index == 2){
        //     this.SetPointShow(true);
        // }else{
        //     this.SetPointShow(false);
        // }
        // if( index == 1){
        //     this.m_Point[0].opacity = 255;
        //     this.m_Point[1].opacity = 0;
        // }else if( index == 2){
        //     this.m_Point[0].opacity = 0;
        //     this.m_Point[1].opacity = 255;

        // }

    },
    SetNumber:function(num){
        if( num <= 0 ){
            this.node.opacity =0;
            return;
        }
        this.m_labNumber.string = num;
        this.SetBoss(num % 3 == 0);
    },
    SetBoss:function(show){
        this.m_imgBoss.active = show;
        this.m_bBoss = show;
    },

    SetPointShow:function(bShow){
        this.m_Point[0].opacity = bShow?255:0;
        this.m_Point[1].opacity = bShow?255:0;
    },
    PlayShowPointIndex(index){
        if( index == 0){
            this.m_Point[0].runAction(cc.fadeOut(0.5));
            this.m_Point[1].runAction(cc.fadeIn(0.5));
        }else if( index == 1){
            this.m_Point[1].runAction(cc.fadeOut(0.5));
            this.m_Point[0].runAction(cc.fadeIn(0.5));
        }else{
            this.m_Point[0].runAction(cc.fadeOut(0.5));
            this.m_Point[1].runAction(cc.fadeOut(0.5));
        }
    },
    start () {

    },

    // update (dt) {},
});
