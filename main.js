var windowList = [];

function preload() {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent("canv");

}

function setup() {
    frameRate(60);
    noStroke();
    windowList = [];

}

function draw() {
    update();

    //それらしい背景
    noStroke();
    background(color(48, 110, 255));
    fill(color(92, 134, 24));
    beginShape();
    var baseY = windowHeight / 2;
    var endY = baseY * 1.1;
    vertex(0, baseY);
    bezierVertex(0, baseY, windowWidth * 0.2, baseY * 0.7, windowWidth, endY);
    triangle(0, baseY - 1, 0, endY - 1, windowWidth, endY - 1);
    rect(0, endY - 2, windowWidth, windowHeight - endY + 2);
    endShape();

    windowList.forEach(function (val) {
        val.draw();
    });
}
var addCount = 45;
var MAX_WINDOW = 20;
function update() {
    addCount++;
    if (addCount >= 45) {
        //var sizeX = 300 + getRandomNumber(100);
        //var sizeY = 150 + getRandomNumber(250);
        var sizeX = 300;
        var sizeY = 180;
        var x = getRandomNumber(windowWidth - sizeX);
        var y = getRandomNumber(windowHeight - sizeY);
        windowList.push(new WindowObj(x, y, sizeX, sizeY));
        addCount = 0;
        if (windowList.length > MAX_WINDOW) {
            windowList.shift();
        }
    }
}


var headRad = 15;
var headHeight = 35;
var lineWeight = 5;
var WindowObj = function (x, y, wid, hei) {
    this.x = x;
    this.y = y;
    this.wid = wid;
    this.hei = hei;

    this.draw = function () {
        //TODO http://staging.p5js.org/examples/color-linear-gradient.html
        //グラデーションつかったほうがいい気がする。
        //うまいことマスクかけたりする必要がある。
        noStroke();
        fill(color(0, 0, 255));

        rect(this.x, this.y, this.wid, this.hei, headRad, headRad, 5, 5);

        fill(color(238, 233, 222));
        rect(this.x + lineWeight, this.y + headHeight, this.wid - lineWeight * 2, this.hei - headHeight - lineWeight);

        //ウィンドウタイトル
        noSmooth();
        textSize(18);
        textStyle(BOLD);
        var title = "Error!!";
        fill(30, 27, 132);
        text(title, this.x + 15 + 1, this.y + 25 + 1);
        fill(255, 255, 255);
        text(title, this.x + 15, this.y + 25);
        smooth();

        //xボタン
        strokeWeight(1);
        stroke(color(255, 255, 255));
        fill(color(255, 0, 0));
        var btnX = this.x + 6 + this.wid - 40;
        var btnY = y + 4;
        rect(btnX, btnY, headHeight - 8, headHeight - 8, 5, 5, 5, 5);
        strokeWeight(4);
        var xPadding = 8;
        line(btnX + xPadding + 1, btnY + xPadding, btnX + headHeight - 8 - xPadding + 1, btnY + headHeight - 8 - xPadding);
        line(btnX + headHeight - 8 - xPadding + 1, btnY + xPadding, btnX + xPadding + 1, btnY + headHeight - 8 - xPadding);

        //表示させるコンテンツ
        noStroke(0);
        var iconX = this.x + 50;
        var iconY = this.y + headHeight + (this.hei - headHeight) / 2;
        fill(128, 0, 0);
        ellipse(iconX + 2, iconY + 2, 50, 50);
        fill(255, 0, 0);
        ellipse(iconX, iconY, 50, 50);
        stroke(255, 255, 255);
        strokeWeight(8);
        line(iconX - 10, iconY - 10, iconX + 10, iconY + 10);
        line(iconX + 10, iconY - 10, iconX - 10, iconY + 10);
        noStroke();
        fill(0);
        textSize(18);
        textStyle(NORMAL);
        text("An error has occurred.", iconX + 35, iconY + 5);


        //TODO ｘボタンで閉じられるようにしたい

    }
}

/** ランダムな整数を取得 */
function getRandomNumber(max) {
    var num = Number(floor(random(max + 1)));
    return num;
}
