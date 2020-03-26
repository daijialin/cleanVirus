
cc.Class({
    extends: cc.Component,

    properties: {
        m_BlackBG:cc.Node,
        m_btTime:cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        window.gResurgenceView = this;
        
        this.node.x = 0;
        this.node.active = false;
    },

    start () {
        
    },

    blackBGAnim:function(show){
        if( show ){
            this.m_BlackBG.runAction(cc.fadeTo(0.5,130));
        }else{
            this.m_BlackBG.runAction(cc.fadeTo(0.5,0));
        }
    },
    onShowView:function(show){
        if( show ){

            var time = 3;
            this.m_btTime.string = ''+time;
            var __callBack=function(){
                if(gAdvertising.node.active )return;
                time -= 1;
                this.m_btTime.string = ''+time;

                if( time == -1){
                    this.node.active = false;
                    gBrief.onShowView();
                    this.unschedule(__callBack);
                }
            }
            this.schedule(__callBack,1,3);
        }else{
            this.m_BlackBG.runAction(cc.fadeTo(0.5,0));
        }
        this.blackBGAnim(show);
        this.node.active = show;
    },
    onAdv:function(){
        this.node.active =false;
        gAdvertising.onShow(function(){
            gAirPlane.Resurgence();
            cc.director.getCollisionManager().enabled = true;
            gTouchCtl.setCanTouch(true);
            gGameCtl.onBulletKilledAll();
        });
    }
    // update (dt) {},
});
