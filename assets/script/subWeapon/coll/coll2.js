
cc.Class({
    extends: cc.Component,

    properties: {
        m_bombEff:cc.Animation,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
        this.m_bombEff.node.parent = null;
        gGameCtl.m_SubWeaponParent.addChild(this.m_bombEff.node);
        this.m_bombEff.node.active = false;


        this.m_bombEff.hideEff = function(){
            this.m_bombEff.node.active =false;
        }.bind(this)
    },

    start () {

    },

    onCollisionEnter: function (other,self) {
        self.node.active = false;
        
        var pos = self.node.convertToWorldSpaceAR(cc.v2(0,0));
        pos = gGameCtl.m_SubWeaponParent.convertToNodeSpaceAR(pos)
        
        this.m_bombEff.node.setPosition(pos);
        this.m_bombEff.node.active =true;
        this.m_bombEff.play('3_bomb')

    },
    // update (dt) {},
});
