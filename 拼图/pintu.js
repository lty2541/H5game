var time = 0;
var start_flag = false;
var setTimer = null;
var p = ['',1,2,3,4,5,6,7,8,0];
var p_bh=[
    [0],
    [2,4],
    [1,3,5],
    [2,6],
    [1,5,7],
    [2,4,6,8],
    [3,5,9],
    [4,8],
    [5,7,9],
    [6,8]
]
var p_wz=[
    [0],
    [0,0],//第一个表示left,第二个表示top，比如第一块的位置为let:0px,top:0px
    [150,0],
    [300,0],
    [0,150],
    [150,150],
    [300,150],
    [0,300],
    [150,300],
    [300,300]
]
// p[1] = 1;p[2] = 2;p[3] = 3;p[4] = 4;p[5] = 5;p[6] = 6;p[7] = 7;p[8] = 8;p[9] = 0;
//判断是否可以移动
function whereCanTo(bh){
    var j=0;
    //能否移动的开关
    var move_flag=false;
    //把所有可能去的位置循环遍历一下
    for(j=0; j<p_bh[bh].length; ++j){
        //如果目标的值为0，说明目标位置没有装小DIV，则可以移动，跳出循环
       if( p[p_bh[bh][j]] == 0 ){
           move_flag=true;
           break;
       }
   }
     //可以移动，则返回目标位置的编号，否则返回0，表示不可移动
    if(move_flag == true){
        return p_bh[bh][j];
    }else{
        return 0;
    }
}
function move(id){
    for(var i=1; i<10; i++){
        if(p[i]==id){
            break;
        }
    }
    var p_flag = whereCanTo(i);
    if(p_flag!=0){
        p[i] = 0;
        p[p_flag]=id;
        document.getElementById("p"+id).style.left=p_wz[p_flag][0]+"px";
        document.getElementById("p"+id).style.top=p_wz[p_flag][1]+"px";
    }
    var end_flag = true;
    for(var k=1;k<9;++k){
        if(p[k]!=k){
            end_flag = false;
            break;
        }
    }
    if(end_flag==true){
        if(!start_flag){
            start();
        }
        alert("厉害了兄弟");
    }
}
//设置计时
function timer(){
    time+=1;
    var min = parseInt(time/60);
    var sec = parseInt(time%60);
    document.getElementById('timer').innerHTML = min+'分'+sec+'秒';
}
//开始暂停函数
function start(){
    
    //为false开始 为true暂停
    if(start_flag){
        //暂停状态
        start_flag = false;
        setTimer = setInterval(timer,1000);
        document.getElementById('start').innerHTML = '暂停';
    }else{
        //开始状态
        document.getElementById('start').innerHTML = '开始';
        start_flag = true;
        clearInterval(setTimer);
    }
}
function random_p(){
    for(var i=9; i>1; --i){
        //产生随机数，范围为1到i，不能超出范围，因为没这个id的DIV
        random = Math.floor(Math.random()*i+1);
        //把当前的DIV编号设置为随机产生的DIV的位置  
        if(p[i] != 0){
            document.getElementById('p'+ p[i]).style.left = p_wz[random][0]+'px';
            document.getElementById('p'+ p[i]).style.top = p_wz[random][1]+'px';
        }
        // //把随机产生的DIV的编号设置为当前的DIV的位置
        console.log('----------------------------'+i+'-----------------------------')
        if(p[random] != 0){
            document.getElementById('p'+ p[random]).style.left = p_wz[i][0]+'px';
            document.getElementById('p'+ p[random]).style.top = p_wz[i][1]+'px';
        }
       //然后把它们两个的DIV保存的编号对调一下
        // console.log(p[i]);
        var tem=p[random];
        console.log('i---'+i);
        console.log('tem---'+tem)
        p[random]=p[i];  
        p[i]=tem;
        
    }
}
function reset(){
    time=0;//把时间设置为0
    random_p();//把方块随机打乱函数
    if(start_flag)//如果暂停，则开始计时
        start();
}
window.onload= function(){
    reset();
}