const hueInput = document.getElementById('hue');
const saturationInput = document.getElementById('saturation');
const brightnessInput = document.getElementById('brightness');
const colorPreview = document.getElementById('colorPreview');
const colorCode = document.getElementById('colorCode');

function hslToHex(h, s, l) {
    s /= 100;
    l /= 100;
    let c = (1 - Math.abs(2 * l - 1)) * s;
    let x = c * (1 - Math.abs((h / 60) % 2 - 1));
    let m = l - c / 2;
    let r = 0, g = 0, b = 0;
    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }
    r = Math.round((r + m) * 255).toString(16).padStart(2, '0');
    g = Math.round((g + m) * 255).toString(16).padStart(2, '0');
    b = Math.round((b + m) * 255).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
}

function updateColor() {
    const hue = hueInput.value;
    const saturation = saturationInput.value;
    const brightness = brightnessInput.value;
    const color = `hsl(${hue}, ${saturation}%, ${brightness}%)`;

    colorPreview.style.backgroundColor = color;
    colorCode.textContent = hslToHex(hue, saturation, brightness);
    var divs = document.getElementById("colorCode")
    var text = divs.innerText
    divs.innerText = "颜色16进制代码：" + divs.innerText;
    var divs = document.getElementById("colorCode2")
    divs.innerText = "迷你世界颜色代码：#c" + text.substring(1, 7);
}

// 初始化颜色
updateColor();
function duqu() {
    var inputContent = document.getElementById('myInput').value;
    var text = insertCInHexColor(inputContent)
    document.getElementById("color").innerText = text
}
function insertCInHexColor(hexColor) {
    // 检查传入的颜色代码是否合法
    if (!/^#([0-9A-Fa-f]{3}){1,2}$/.test(hexColor)) {
        return "无效的颜色代码";
    }

    // 在第一个数字和“#”之间插入“c”
    let modifiedColor = hexColor.replace(/^#/, '#c');

    return modifiedColor;
}
