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
    divs.innerText = "迷你世界颜色代码：#c" + capitalizeText(text.substring(1, 7));
}
function capitalizeText(text) {
    let capitalizedText = '';

    for (let i = 0; i < text.length; i++) {
        let char = text.charAt(i);
        if (char.match(/[a-z]/i)) {
            capitalizedText += char.toUpperCase();
        } else {
            capitalizedText += char;
        }
    }

    return capitalizedText;
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
    var text =capitalizeText(hexColor.substring(1, 7))
    let modifiedColor = "#c"+ text;

    return modifiedColor;
}
function hexToRgb(hex) {
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    return [r, g, b];
}

function rgbToHex(r, g, b) {
    return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

function interpolateColor(startColor, endColor, factor) {
    let result = startColor.slice();
    for (let i = 0; i < 3; i++) {
        result[i] = Math.round(result[i] + factor * (endColor[i] - startColor[i]));
    }
    return result;
}

function applyGradientToText(startHex, endHex, text) {
    const startColor = hexToRgb(startHex);
    const endColor = hexToRgb(endHex);
    const length = text.length;
    let gradientTextArray = [];

    for (let i = 0; i < length; i++) {
        let factor = i / (length - 1);
        let interpolatedColor = interpolateColor(startColor, endColor, factor);
        let hexColor = rgbToHex(interpolatedColor[0], interpolatedColor[1], interpolatedColor[2]);
        gradientTextArray.push(`#c${hexColor}`);
    }

    let coloredTextArray = [];
    for (let i = 0; i < length; i++) {
        coloredTextArray.push(`${gradientTextArray[i]}${text[i]}`);
    }

    return coloredTextArray.join('');
}


function dianji() {
    const startHex = document.getElementById("inputcolorcode1").value;
    const endHex = document.getElementById("inputcolorcode2").value;
    const text = document.getElementById("inputTEXT").value;
    const outputDiv = document.getElementById('output');
outputDiv.textContent = applyGradientToText(startHex, endHex, text);
}

