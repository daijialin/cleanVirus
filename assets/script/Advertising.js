
cc.Class({
    extends: cc.Component,

    properties: {
        m_TVTime:cc.Label,
        m_Close:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:
    ctor:function(){
        this.m_nTVTimeData = 20;

    },
    onLoad () {
        window.gAdvertising = this;
        this.node.active = false;
    },

    start () {
    },

    onShow:function(callBack){

        this.m_nTVTimeData = 1;
        this.m_TVTime.active = true;
        this.m_TVTime.string = ''+this.m_nTVTimeData;


        this.node.x = 0;
        this.node.active = true;
        this.m_Close.active = false;
        this.m_CallBack = callBack;
        
        var callBack=function(){
            this.m_nTVTimeData--;
            this.m_TVTime.string = ''+this.m_nTVTimeData;
            if( this.m_nTVTimeData == 0){
                this.m_Close.active = true;
                this.m_TVTime.active = false;
                this.unschedule(callBack);
            }
        }
        this.schedule(callBack,1,20);
    },
    onClose:function(){
        if(this.m_CallBack)this.m_CallBack();
        this.node.active = false;
    },
    // update (dt) {},
});
