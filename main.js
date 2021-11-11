var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var rabbit = {
    x : 10,
    y : 200,
    width : 50,
    height : 50,
    draw(){
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

rabbit.draw()
// 클래스로 장애물 객체 생성
class Cactus {
    constructor(){
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

let timer = 0;
var cactus_multi = [];
let jump_timer = 0;
let animation;

// 프레임마다 실행할 코드
function frame_code_operate(){
    animation = requestAnimationFrame(frame_code_operate);
    timer++;
    ctx.clearRect(0,0, canvas.width, canvas.height);

    if (timer % 180 === 0)
    {
        var cactus = new Cactus();
        cactus_multi.push(cactus);
    }

    cactus_multi.forEach((each_cactus, idx, array) => {
        collision_check(rabbit, each_cactus);

        if(each_cactus.x < 0){
            array.splice(idx, 1);
        }
        each_cactus.x = each_cactus.x - 5;
        // 현재 배열 삭제시 indx 하나 씩 밀림
        each_cactus.draw();
    })
    
    if (jumping == true)
    {
        rabbit.y -= 5;
        jump_timer ++;
    }
    else{
        if (rabbit.y < 200)
        {
            rabbit.y += 5;
        }
    }
    if (jump_timer > 25)
    {
        jumping = false;
        jump_timer = 0;
    }
    rabbit.draw()
}

function collision_check(rabbit, cactus)
{
    var diff_x = cactus.x - (rabbit.x + rabbit.width);
    var diff_y = cactus.y - (rabbit.y + rabbit.height);
    if (diff_x < 0 && diff_y < 0)
    {
        ctx.clearRect(0,0, canvas.width, canvas.height);
        cancelAnimationFrame(animation);
    }
}

var jumping = false;
document.addEventListener('keydown', function(jump){
    if (jump.code === 'Space')
    {
        jumping = true;
    }
})

frame_code_operate();
