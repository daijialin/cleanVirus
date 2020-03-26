
cc.Class({
    extends: cc.Component,

    properties: {
        m_BG:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:
    ctor:function(){
        this.m_isCanTouchMove;
        this.m_isPlaying;
        this.m_canTouch = true;
    },
    onLoad () {
        window.gTouchCtl = this;
        this.node.on(cc.Node.EventType.TOUCH_START, this.TouchStart.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.TouchMove.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.TouchEnd.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.TouchEnd.bind(this), this);
        this.m_isCanTouchMove = false;
        this.m_isPlaying = false;
    },
    Reset:function(){
        this.m_isPlaying = false;
        this.setCanTouch(true);

    },
    BeginFireCallBack:function(){
        gAirPlane.BeginFire();
    },

    TouchStart:function(event,target){
        if(!this.m_canTouch )return;
        cc.log('TouchStart');
        this.m_BG.stopAllActions();
        this.m_BG.runAction(cc.fadeOut(0.5));
        
        this.m_isCanTouchMove = true;
        gAirPlane.node.stopAllActions();
        gAirPlane.BeginFire();
        gVirusMake.unsleepVirus();

        if( this.m_isPlaying ){
            return;
        }
        this.m_isPlaying = true;
        gGameCtl.Action(ACTION_MOVE_OUT);

    },
    TouchMove:function(event,target){

        if(!this.m_canTouch )return;
        if(!this.m_isCanTouchMove){
            return;
        }
        //;
        // cc.log('TouchMove');
        var pos = event.getDelta();
        gGameCtl.moveAirPlane(pos);
    },
    TouchEnd:function(event,target){
        if(!this.m_canTouch )return;
        cc.log('TouchEnd');
        
        this.m_BG.stopAllActions();
        this.m_BG.runAction(cc.fadeIn(0.5));
       

        this.unschedule(this.BeginFireCallBack);
        gAirPlane.EndFire();
        gVirusMake.sleepVirus();
        
    },
    start () {

    },
    setCanTouch:function(can){
        this.m_canTouch = can;
    },

    // update (dt) {},
});
