
cc.Class({
    extends: cc.Component,

    properties: {
        m_LeftWind:cc.Sprite,
        m_RightWind:cc.Sprite,
        m_LeftBullet:cc.Node,
        m_RightBullet:cc.Node,
        m_buttle:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        var pos = this.m_buttle.convertToWorldSpaceAR(cc.v2(0,0));
        var pos1 = gGameCtl.m_SubWeaponParent.convertToNodeSpaceAR(pos)

        this.m_buttle.parent = null;
        gGameCtl.m_SubWeaponParent.addChild(this.m_buttle);
        this.m_buttle.setPosition(pos1);
        
        this.m_bInit = false;
        this.Reset();
    },

    start () {
    },
    Reset:function(){

        this.m_LeftBullet.setScale(cc.v2(0.1,0.1));
        this.m_RightBullet.setScale(cc.v2(0.1,0.1));
        
        this.m_bButtleMove =false;
        this.m_buttle.active = false;
        this.m_Sleep = false;
    },
    begin:function(){
        var node;
        if( this.m_bBeginLeft){
            node = this.m_LeftBullet;
            node.active = true;
            this.m_RightBullet.active = false;
            
        }else{
            node = this.m_RightBullet;
            node.active = true;
            this.m_LeftBullet.active = false;
        }
        node.setScale(cc.v2(0.1,0.1));
        var seq = cc.sequence(cc.scaleTo(1,0.5,0.5),cc.callFunc(function(){

            node.active = false;

            var pos = node.convertToWorldSpaceAR(cc.v2(0,0));
            pos = gGameCtl.node.convertToNodeSpaceAR(pos)
            
            this.m_buttle.active = true;
            this.m_buttle.setPosition(pos);

            this.m_bButtleMove = true;

        }.bind(this)))
        node.runAction(seq)
        this.m_bBeginLeft = !this.m_bBeginLeft;
    },
    setStart:function(){
        if( !this.m_bInit ){
            this.begin();
            this.m_bInit = true;
        }
        this.m_LeftBullet.resumeAllActions();
        this.m_RightBullet.resumeAllActions();
        this.m_Sleep = false;
    },
    setStop:function(){
        this.m_LeftBullet.pauseAllActions();
        this.m_RightBullet.pauseAllActions();
        this.m_Sleep  = true;
    },

    update (dt) {
        if( this.m_bButtleMove && !this.m_Sleep ){
            var y = this.m_buttle.y;
            y += 1000*dt;
            this.m_buttle.y = y;
            if( this.m_buttle.y> 860){
                this.begin();
                this.m_bButtleMove = false;
                this.m_buttle.active = false;
            }
        }
    },
});
