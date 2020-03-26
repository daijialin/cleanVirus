

window.ACTION_RESET = 0;
window.ACTION_PLAY = 1;
window.ACTION_MOVE_OUT = 2;
window.ACTION_MOVE_IN =3;

window.COLLISION_WALL = 0;
window.COLLISION_BULLET = 1;
window.COLLISION_VIRUS = 2;

window.gGameCtl = null;
// window.gDataCtl = null;
window.gAirPlane= null;

function random(lower, upper) {
    return Math.floor(Math.random() * (upper - lower)) + lower;
}

function distance(p1,p2){
    var dx = Math.abs(p2.x - p1.x);
    var dy = Math.abs(p2.y - p1.y);
    return Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2));
}
//货币进位
function goldCrarryBit(gold){

    var array=[
        [100000000,'N'],
        [10000000,'T'],
        [1000000,'G'],
        [100000,'M'],
        [10000,'K'],
        [1000,'B'],
    ];
    for (var i = 0; i < array.length; i++) {
        var value = gold/array[i][0];
        if(value > 1 ){
            return ''+value.toFixed(1)+array[i][1];
        }
    }
    return gold;
}
function setVirusColor(node,color){
    for (var i = 0; i < node.children.length; i++) {
        var js = node.children[i].getComponent('color');
        if(js != null){
            node.children[i].color = color;
        }
        setVirusColor(node.children[i],color);
        
    }
}
function getVirusColorByHp(hp) {
    for (var i = 0; i < gVirusColor.length; i++) {
        if(hp <= gVirusColor[i].pro){
            return gVirusColor[i].color;
        }
    }
}
function getVirusScaleByHp(hp){

    for (var i = 0; i < gVirusColor.length; i++) {
        if(hp <= gVirusColor[i].pro){
            return gVirusScale[i].scale;
        }
    }
}

function getRandomSpeed() {
    var index = random(0,gSpeed.length-1);
    return gSpeed[index];
}