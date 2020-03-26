
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    ctor:function(){
        this.m_updateMove = false;
        this.m_Speed = 1000;
    },
    start () {

    },
    init:function(){
        this.m_updateMove = false;
    },
    onCollisionEnter: function (other,self) {

        if( other.tag == 0 ){
            var js = other.getComponent(''+other.tag);
            if( !js.m_bDie ){
                gGameCtl.onBulletKilled(this.node);
            }
        }
    },
    setSecondPos:function(pos){
        var seq = cc.sequence(
            cc.moveTo(0.1,pos),
            cc.callFunc(function(){
                this.m_updateMove = true;
            }.bind(this))
        );
        this.node.runAction(seq);
    },
    setSpeed:function(speed){
        // this.m_Speed = speed;
    },
    update (dt) {
        if(this.m_updateMove){
            var y = this.node.y;
            y += this.m_Speed*dt;
            this.node.y = y;
            if( this.m_Speed == 0 ){

                cc.log('速度:')
            } 
            if( y > 920 ){
                this.m_updateMove = false;
                gGameCtl.onBulletKilled(this.node);
            }
        }
    },
});
