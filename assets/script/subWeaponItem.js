
cc.Class({
    extends: cc.Component,

    properties: {
        m_texture:cc.SpriteAtlas,
        m_subWeapon:cc.Sprite,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },

    start () {

    },
    init:function(index){
        this.m_Index = index;
        var sprite = this.m_texture.getSpriteFrame('subWeapon'+index);
        this.m_subWeapon.spriteFrame = sprite;
    },
    onClickChange:function(){
        var toggle = this.getComponent(cc.Toggle);
        if( toggle.isChecked ){
            gAirPlane.ChangeAirPlane(this.m_Index)
        }else{
            gAirPlane.ChangeAirPlane(0)
        }
    },
    setDisable:function(){
        
        var toggle = this.getComponent(cc.Toggle);
        toggle.interactable = false;

        var sprite = this.m_texture.getSpriteFrame('subWeapon_gray'+this.m_Index);
        this.m_subWeapon.spriteFrame = sprite;

    }
    // update (dt) {},
});
