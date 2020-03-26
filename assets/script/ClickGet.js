
cc.Class({
    extends: cc.Component,

    properties: {
        m_labGold:cc.Label,
        m_progress:cc.ProgressBar,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.updateData();
    },

    Reset(){

    },
    Play(){

    },
    MoveOut:function(){
        this.node.runAction(cc.moveTo(0.5,cc.v2(552,0)).easing(cc.easeBackOut()));
    },
    MoveIn:function(){

        this.node.runAction(cc.moveTo(0.5,cc.v2(383,0)).easing(cc.easeBackIn()));
    },

    onClickGet:function(target,data){
        cc.log('获取金币');
        if( gDataCtl.GetTaskGold() <= 0 )return;
        gGameCtl.createGoldAnim(this.node.getPosition(),
        cc.v2(-383,733),
        gGameCtl.m_Top.getGoldNode(),
        300,15,
        gDataCtl.GetTaskGold(),
        function(gold){
            gDataCtl.AddGold(gold);
            gGameCtl.m_Top.updateData();
        }.bind(this)
        );
        gDataCtl.ClearTaskGold();
        this.updateData();
    },
    
    updateData:function(){
        this.m_labGold.string = goldCrarryBit(gDataCtl.GetTaskGold());
    },
    update (dt) {
        var time = gDataCtl.GetGoldAddTime();
        var dis = 1/time;
        dis *= dt;
        this.m_progress.progress += dis;
        if( this.m_progress.progress >= 1){
            this.m_progress.progress = 0;
            var gold = gDataCtl.GetAwardGold();
            gDataCtl.AddTaskGold(gold);
            gDataCtl.save();
            this.updateData();
        }
    },
});
