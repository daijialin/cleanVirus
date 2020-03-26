
cc.Class({
    extends: cc.Component,

    properties: {
        m_LeftWind:cc.Sprite,
        m_RightWind:cc.Sprite,
        m_buttle:[cc.Node],
        m_light:[cc.Node],
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        for (var i = 0; i < this.m_buttle.length; i++) {
            var pos = this.m_buttle[i].convertToWorldSpaceAR(cc.v2(0,0));
            var pos1 = gGameCtl.m_SubWeaponParent.convertToNodeSpaceAR(pos)
    
            this.m_buttle[i].parent = null;
            gGameCtl.m_SubWeaponParent.addChild(this.m_buttle[i]);
            this.m_buttle[i].setPosition(pos1);
            
            this.m_light[i].active = false;
            this.m_light[i].index = i;

        }
        
        this.m_bInit = false;
        this.Reset();
    },

    start () {
    },
    Reset:function(){

        this.m_light[0].setScale(cc.v2(0.1,0.1));
        this.m_light[1].setScale(cc.v2(0.1,0.1));
        
        this.m_bButtleMove =false;
        this.m_buttle[0].active = false;
        this.m_buttle[1].active = false;
        this.m_Sleep = false;
    },
    begin:function(){
        for (var i = 0; i < this.m_light.length; i++) {

            this.m_light[i].active = true;
            this.m_light[i].setScale(cc.v2(0,0));
            var seq = cc.sequence(cc.scaleTo(1,0.5,0.5),cc.callFunc(function(target){

                var index = target.index;
                this.m_light[index].active = false;

                var pos = this.m_light[index].convertToWorldSpaceAR(cc.v2(0,0));
                pos = gGameCtl.node.convertToNodeSpaceAR(pos);
                
                this.m_buttle[index].active = true;
                this.m_buttle[index].setPosition(pos);

                this.m_bButtleMove = true;

            }.bind(this)))
            this.m_light[i].runAction(seq)
        }

    },
    setStart:function(){
        if( !this.m_bInit ){
            this.begin();
            this.m_bInit = true;
        }
        this.m_light[0].resumeAllActions();
        this.m_light[1].resumeAllActions();
        this.m_Sleep = false;
    },
    setStop:function(){
        this.m_light[0].pauseAllActions();
        this.m_light[1].pauseAllActions();
        this.m_Sleep  = true;
    },

    update (dt) {
        if( this.m_bButtleMove && !this.m_Sleep ){
            for (var i = 0; i < this.m_buttle.length; i++) {
                    
                var y = this.m_buttle[i].y;
                var x = this.m_buttle[i].x;
                y += 1000*dt;
                if( i == 0 ){
                    x -= 200*dt;
                }else{
                    x += 200*dt;
                }

                this.m_buttle[i].y = y;
                this.m_buttle[i].x = x;
                if( this.m_buttle[i].y > 860){
                    this.begin();
                    this.m_bButtleMove = false;
                    this.m_buttle[i].active = false;
                }
                
            }
        }
    },
});
