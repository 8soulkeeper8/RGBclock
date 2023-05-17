
let clock = document.getElementById("clock");
let color = document.getElementById("color");
let message = document.getElementById("message");

function time() {
    const time = new Date();
    const timeUS = time.toLocaleTimeString("en-US", {hour: "2-digit", minute: "2-digit", second: "2-digit"});
    const hours = time.getHours();
    
    const digits = timeUS.replace(/\D/g, "");
    const bg = `#${digits}`;
    const text = `#${(0xffffff - parseInt(`0x${digits}`)).toString(16)}`;

    const messages = [
        [0, "Уже XX часов, пора ложиться отдыхать zZzZz"],
        [1, "Уже XX часа ночи, доделывай дела и спать"],
        [5, "XX утра, спать уже бессмысленно, смирись"],
        [6, "Уже XX утра, пора вставать"],
        [12, "Сейчас XX часов, бодрствуй!"]
    ];

    for (let i = messages.length - 1; i >= 0; i--) {
        if (hours >= messages[i][0]) {
            message.textContent = messages[i][1].replace("XX", hours > 12 ? hours - 12 : hours);
            break;
        }
    }

    clock.textContent = timeUS;
    color.textContent = bg;
    document.body.style.backgroundColor = bg;
    document.body.style.color = text;
}

function invertColor(hex) {
    if (hex.indexOf('#') === 0) {
      hex = hex.slice(1);
    }
    // конвертирование rgb
    let r = parseInt(hex.substr(0, 2), 16);
    let g = parseInt(hex.substr(2, 2), 16);
    let b = parseInt(hex.substr(4, 2), 16);
    // инверсия
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // добавил нули
    if (r.length == 1) r = "0" + r;
    if (g.length == 1) g = "0" + g;
    if (b.length == 1) b = "0" + b;
    // Склеиваем в формате hex
    return "#" + r + g + b;
  }
  
function rgb() {
    // тайм переменные
    let time = new Date();
    let h = time.getHours();
    let m = time.getMinutes();
    let s = time.getSeconds();
    let ampm = h >= 12 ? 'PM' : 'AM';

    // сделал 12 часовой формат и добавил 0 если число меньше 10
    h = h % 12;
    h = h ? h : 12;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;

    // склеил часы
    let clockStr = h + ':' + m + ':' + s + ' ' + ampm;
    let colorStr = '#' + h + m + s;
    let messageStr = "";

    clock.textContent = clockStr;
    color.textContent = colorStr;

    // меняем сообщение в зависимости от времени
    if (h === 1 && ampm == 'AM') {
        messageStr = 'Уже час ночи, доделывай дела и спать';
    } else if (h == 2 || h < 5 && ampm == 'AM') {
        messageStr = 'Уже ' + h + ' часа ночи, доделывай дела и спать';
    } else if (h === 5 && ampm == 'AM') {
        messageStr = '5 утра, спать уже бессмысленно, смирись';
    } else if (h === 6 || h <= 11 && ampm == 'AM') {
        messageStr = 'Уже ' + h + ' утра, пора вставать';
    } else if (h === 12 || h <= 23 && ampm == 'PM') {
        messageStr = 'Сейчас ' + h + ' часов, бодрствуй!';
    } else {
        messageStr = 'Уже ' + h + ' часов, пора ложиться отдыхать zZzZz';
    }

    //динамически меняем все цвета
    message.textContent = messageStr;
    document.body.style.background = colorStr;
    document.body.style.color = invertColor(colorStr);
}

time();
setInterval(time, 1000);

