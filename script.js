
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

time();
setInterval(time, 1000);