var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this);
        this._index = 2;
        this._distance = new egret.Point();
        this._x = [];
        this._y = [];
        this._all_X_Y = [];
        this._all_Y_X = [];
        this._touchStatus = false;
        this._touchStatus1 = false;
        this._touchStatus2 = false;
        this._touchStatus3 = false;
        this._touchStatus4 = false;
        this._touchStatus5 = false;
        this._isTouch1 = false;
        this._isTouch2 = false;
        this._isCollide = false;
        this._isTouch3 = false;
        this._carAppearPos = new egret.Point();
        this._labelPosY = 0;
        this._labelNextY = 0;
        this._labelStatus = false;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=GameScene,p=c.prototype;
    p.onAddToStage = function (event) {
        this.init();
    };
    p.init = function () {
        this._index = 2;
        var width = Const.SWIDTH / 2;
        var height = Const.SHEIGHT / 2;
        this._winWidth = width;
        this._winHeight = height;
        var du = ResourceUtils.createBitmapByName('page1_4_png');
        this.addChild(du);
        du.x = width - du.width / 2;
        du.y = 25;
        this._du = du;
        var mask = new egret.Shape();
        mask.graphics.beginFill(0x000000);
        mask.graphics.drawRect(0, 120, width * 2, 260);
        mask.graphics.endFill();
        this.addChild(mask);
        this._labelScroll = new egret.Sprite();
        this.addChild(this._labelScroll);
        this._labelScroll.mask = mask;
        egret.Tween.get(this._labelScroll)
            .wait(1000)
            .call(this.addLabel, this, ["label0_png", 0]);
        var drawArea = ResourceUtils.createBitmapByName('page2_4_png');
        this.addChild(drawArea);
        drawArea.x = width;
        drawArea.y = height + 75;
        drawArea.anchorOffsetX = drawArea.width / 2;
        drawArea.anchorOffsetY = drawArea.height / 2;
        drawArea.touchEnabled = true;
        this._drawArea = drawArea;
        this._carAppearPos.x = width - drawArea.width / 2;
        this._carAppearPos.y = height - drawArea.height / 2 + 75;
        this._car = new egret.Sprite();
        this.addChildAt(this._car, 999);
        this._car.width = Const.SWIDTH;
        this._car.height = Const.SHEIGHT;
        this._car.anchorOffsetX = width;
        this._car.anchorOffsetY = height;
        this._car.x = width;
        this._car.y = height;
        var confirm_btn = new MyButton("btn2_png", "btn2_png");
        this.addChild(confirm_btn);
        confirm_btn.x = width - confirm_btn.width / 2 - 120;
        confirm_btn.y = Const.SHEIGHT - 200;
        confirm_btn.setClick(this.confirmClick.bind(this));
        var redraw_btn = new MyButton("btn3_png", "btn3_png");
        this.addChild(redraw_btn);
        redraw_btn.x = width - redraw_btn.width / 2 + 120;
        redraw_btn.y = Const.SHEIGHT - 200;
        redraw_btn.setClick(this.redrawClick.bind(this));
        this._confirm_btn = confirm_btn;
        this._redraw_btn = redraw_btn;
        var data = RES.getRes("round_json"); //JSON  
        var txtr = RES.getRes("round_png"); //Texture  
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        var mc = new egret.MovieClip(mcFactory.generateMovieClipData("round"));
        this.addChild(mc);
        mc.x = width - mc.width / 2;
        mc.y = height + 172;
        this._round = mc;
        var tips = ResourceUtils.createBitmapByName('page2_3_png');
        this.addChild(tips);
        tips.x = width - tips.width / 2;
        tips.y = height + 270;
        this._tips = tips;
        this._shape = new egret.Shape();
        this._car.addChild(this._shape);
        this._shape.graphics.lineStyle(5, 0x777574);
        this._shape.anchorOffsetX = drawArea.width / 2;
        this._shape.anchorOffsetY = drawArea.height / 2;
        this._shape.width = drawArea.width;
        this._shape.height = drawArea.height;
        this._shape.x = drawArea.width / 2;
        this._shape.y = drawArea.height / 2;
        drawArea.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.drawStart, this);
        drawArea.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.drawMove, this);
        drawArea.addEventListener(egret.TouchEvent.TOUCH_END, this.drawEnd, this);
        var leftShoe = ResourceUtils.createBitmapByName("page2_5_png");
        this._car.addChild(leftShoe);
        leftShoe.x = width - 130;
        leftShoe.y = height - leftShoe.height / 2 + 202;
        leftShoe.anchorOffsetX = leftShoe.width / 2;
        leftShoe.anchorOffsetY = leftShoe.height / 2;
        this._leftShoe = leftShoe;
        var rightShoe = ResourceUtils.createBitmapByName("page2_6_png");
        this._car.addChild(rightShoe);
        rightShoe.x = width + 130;
        rightShoe.y = height - rightShoe.height / 2 + 202;
        rightShoe.anchorOffsetX = rightShoe.width / 2;
        rightShoe.anchorOffsetY = rightShoe.height / 2;
        this._rightShoe = rightShoe;
        this._leftShoe.touchEnabled = true;
        this._rightShoe.touchEnabled = true;
        this._leftShoe.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.leftShoeDown, this);
        this._leftShoe.addEventListener(egret.TouchEvent.TOUCH_END, this.leftShoeUp, this);
        this._rightShoe.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.rightShoeDown, this);
        this._rightShoe.addEventListener(egret.TouchEvent.TOUCH_END, this.rightShoeUp, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchStart, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
    };
    //对话
    p.addLabel = function (param, index) {
        if (index > 9)
            return;
        var y = this._labelNextY;
        var label = ResourceUtils.createBitmapByName(param);
        this._labelScroll.addChild(label);
        label.x = 50;
        if (index === 0) {
            label.y = 140;
            this._labelNextY = 100;
            this._labelPosY = label.height + 170;
        }
        else {
            label.y = this._labelPosY;
            this._labelNextY = this._labelNextY + label.height + 20;
            this._labelPosY = this._labelPosY + label.height + 20;
        }
        label.alpha = 0;
        egret.Tween.get(label).to({ alpha: 1 }, 1000);
        if (index != 0) {
            egret.Tween.get(this._labelScroll)
                .wait(100)
                .to({ y: -y }, 1000);
        }
        if (index === 9) {
            var down = ResourceUtils.createBitmapByName('page6_4_png');
            this._labelScroll.addChild(down);
            down.x = Const.SWIDTH - 135;
            down.y = label.y + 20;
            egret.Tween.get(down, { loop: true })
                .to({ y: down.y + 10 }, 400)
                .to({ y: down.y - 10 }, 400);
        }
    };
    //确认按钮
    p.confirmClick = function () {
        if (this._index === 2) {
            if (this._isTouch1) {
                this.createCar();
            }
        }
        else if (this._index === 3 && this._isTouch2) {
            this.page3End();
        }
        else if (this._index === 4 && this._isCollide) {
            this.page4End();
        }
        else if (this._index === 5 && this._isTouch3) {
            this.page5End();
        }
        else if (this._index === 6) {
            if (this._input.text != "") {
                this.page6Hide();
                this.page7();
            }
        }
    };
    //重画按钮
    p.redrawClick = function () {
        if (this._index === 2) {
            this._shape.graphics.clear();
            this._all_X_Y = [];
            this._all_Y_X = [];
            this._shape.graphics.lineStyle(2, 0x000000);
        }
        else if (this._index === 3 || this._index === 5) {
            this._lineShape.graphics.clear();
            this._lineShape.graphics.lineStyle(2, 0x000000);
        }
    };
    //画车开始
    p.drawStart = function (e) {
        this._touchStatus = true;
        var x = e.stageX;
        var y = e.stageY;
        this._shape.graphics.moveTo(x, y);
        this._shape.graphics.lineTo(x + 1, y);
    };
    //画车移动
    p.drawMove = function (e) {
        if (this._touchStatus1 || this._touchStatus2)
            return;
        if (this._touchStatus) {
            this._isTouch1 = true;
            var x = e.stageX;
            var y = e.stageY;
            this.movePoint(x, y, this._shape);
        }
    };
    //画车结束
    p.drawEnd = function (e) {
        this._all_X_Y.push(this._x);
        this._all_Y_X.push(this._y);
        this._touchStatus = false;
        this._x = [];
        this._y = [];
    };
    //画出点数
    p.movePoint = function (x, y, target) {
        var shape = target;
        shape.graphics.lineTo(x, y);
    };
    //按下左边轮胎
    p.leftShoeDown = function (e) {
        if (this._touchStatus)
            return;
        this._touchStatus1 = true;
        this._distance.x = e.stageX - this._leftShoe.x;
    };
    //松开左边轮胎
    p.leftShoeUp = function (e) {
        this._touchStatus1 = false;
    };
    //按下右边轮胎
    p.rightShoeDown = function (e) {
        if (this._touchStatus)
            return;
        this._touchStatus2 = true;
        this._distance.x = e.stageX - this._rightShoe.x;
    };
    //松开右边轮胎
    p.rightShoeUp = function (e) {
        this._touchStatus2 = false;
    };
    //触摸开始
    p.touchStart = function (e) {
        var x = e.stageX;
        var y = e.stageY;
        if (this._index === 3) {
            this._touchStatus3 = true;
            this._lineShape.graphics.moveTo(x, y);
            this._lineShape.graphics.lineTo(x + 1, y);
        }
        else if (this._index === 5) {
            this._touchStatus5 = true;
            this._lineShape.graphics.moveTo(x, y);
            this._lineShape.graphics.lineTo(x + 1, y);
        }
    };
    //移动
    p.touchMove = function (e) {
        if (this._index === 2) {
            var minX = Const.SWIDTH / 2 - this._drawArea.width / 2 + this._leftShoe.width / 2;
            var maxX = Const.SWIDTH / 2 + this._drawArea.width / 2 - this._leftShoe.width / 2;
            var x = e.stageX - this._distance.x;
            if (x <= minX)
                x = minX;
            else if (x >= maxX)
                x = maxX;
            if (this._touchStatus1) {
                this._leftShoe.x = x;
            }
            else if (this._touchStatus2) {
                this._rightShoe.x = x;
            }
        }
        else if (this._index === 3 && this._touchStatus3) {
            var x = e.stageX;
            var y = e.stageY;
            this.movePoint(x, y, this._lineShape);
            this._isTouch2 = true;
        }
        else if (this._index === 4 && this._touchStatus4 && !this._isCollide) {
            var x = e.stageX - this._distance.x;
            var y = e.stageY - this._distance.y;
            this._navigation.x = x;
            this._navigation.y = y;
        }
        else if (this._index === 5 && this._touchStatus5) {
            var x = e.stageX;
            var y = e.stageY;
            this.movePoint(x, y, this._lineShape);
            this._isTouch3 = true;
        }
    };
    //触摸松开
    p.touchEnd = function (e) {
        if (this._index === 3) {
            this._touchStatus3 = false;
        }
        else if (this._index === 7) {
            this._share.visible = false;
            this._shareShape.graphics.clear();
        }
    };
    p.createCar = function () {
        this._drawArea.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.drawStart, this);
        this._drawArea.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.drawMove, this);
        this._drawArea.removeEventListener(egret.TouchEvent.TOUCH_END, this.drawEnd, this);
        this._leftShoe.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.leftShoeDown, this);
        this._leftShoe.removeEventListener(egret.TouchEvent.TOUCH_END, this.leftShoeUp, this);
        this._rightShoe.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.rightShoeDown, this);
        this._rightShoe.removeEventListener(egret.TouchEvent.TOUCH_END, this.rightShoeUp, this);
        this._leftShoe.touchEnabled = false;
        this._rightShoe.touchEnabled = false;
        this.btnHide();
        this.removeChild(this._drawArea);
        this.removeChild(this._tips);
        var data = RES.getRes("dust_json"); //JSON  
        var txtr = RES.getRes("dust_png"); //Texture  
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        var mc = new egret.MovieClip(mcFactory.generateMovieClipData("dust"));
        this._car.addChild(mc);
        mc.x = this._winWidth - 390;
        mc.y = this._winHeight / 2 + 420;
        mc.scaleX = 2;
        mc.scaleY = 2;
        mc.frameRate = 12;
        mc.gotoAndPlay(0, -1);
        this._dust = mc;
        this._shape.skewX = 0.5;
        egret.Tween.get(this._car)
            .to({ scaleX: 0.7, scaleY: 0.7, y: this._winHeight + 60 }, 1000)
            .wait(100)
            .call(this.carMove, this);
    };
    p.carMove = function () {
        this._labelScroll.visible = false;
        this._round.gotoAndPlay(0, -1);
        egret.Tween.get(this._leftShoe, { loop: true }).to({ rotation: 360 }, 1500);
        egret.Tween.get(this._rightShoe, { loop: true }).to({ rotation: 360 }, 1500);
        egret.Tween.get(this._car).wait(1500).call(this.fastMove, this);
        egret.Tween.get(this._shape, { loop: true })
            .to({ y: this._shape.y - 4, skewX: 0.5 }, 200)
            .to({ y: this._shape.y + 4, skewX: 1 }, 200);
    };
    p.fastMove = function () {
        egret.Tween.get(this._car)
            .to({ x: Const.SWIDTH + 200 }, 1500, egret.Ease.sineIn)
            .wait(500)
            .call(this.page3, this);
        egret.Tween.get(this._leftShoe, { loop: true })
            .to({ rotation: 360 }, 800);
        egret.Tween.get(this._rightShoe, { loop: true })
            .to({ rotation: 360 }, 800);
    };
    p.page3 = function () {
        this._car.x = 0;
        egret.Tween.get(this._car)
            .to({ x: 250 }, 1500, egret.Ease.sineOut)
            .call(this.page3Start, this);
        var light = ResourceUtils.createBitmapByName('page3_2_png');
        this.addChild(light);
        light.x = Const.SWIDTH;
        light.y = Const.SHEIGHT / 2 - 150;
        this._trafficLight = light;
        var x = Const.SWIDTH - light.width - 60;
        egret.Tween.get(light)
            .to({ x: x }, 1500, egret.Ease.sineOut);
    };
    p.page3Start = function () {
        this._round.stop();
        this.carStop();
        egret.Tween.get(this._car)
            .to({ scaleX: 0.6, scaleY: 0.6, y: this._car.y - 30 }, 800)
            .call(this.addLongAnimate, this);
        egret.Tween.get(this._trafficLight)
            .to({ y: this._trafficLight.y - 50 }, 800);
        egret.Tween.get(this._round)
            .to({ y: this._round.y - 50 }, 800);
    };
    //增加火龙动画
    p.addLongAnimate = function () {
        this._trafficLight.texture = RES.getRes("page3_3_png");
        var data = RES.getRes("long_json"); //JSON  
        var txtr = RES.getRes("long_png"); //Texture  
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        var mc = new egret.MovieClip(mcFactory.generateMovieClipData("long"));
        this.addChild(mc);
        mc.x = this._winWidth - mc.width / 2 - 10;
        mc.y = this._winHeight - 183;
        mc.frameRate = 10;
        mc.gotoAndPlay(0);
        egret.Tween.get(this.stage).wait(900).call(this.addKaAnimate, this);
        this._longMovie1 = mc;
        this._longMovie1.addEventListener(egret.Event.COMPLETE, this.longAnimateEnd, this);
    };
    p.longAnimateEnd = function (event) {
        this.removeChild(this._longMovie1);
        var data = RES.getRes("longnext_json"); //JSON  
        var txtr = RES.getRes("longnext_png"); //Texture  
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        var mc = new egret.MovieClip(mcFactory.generateMovieClipData("longnext"));
        this.addChild(mc);
        mc.x = this._winWidth - 30;
        mc.y = this._winHeight - 183;
        mc.frameRate = 10;
        mc.gotoAndPlay(0, -1);
        this._longMovie2 = mc;
    };
    //增加比卡丘动画
    p.addKaAnimate = function () {
        this._trafficLight.texture = RES.getRes("page3_4_png");
        var data = RES.getRes("ka_json"); //JSON  
        var txtr = RES.getRes("ka_png"); //Texture  
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        var mc = new egret.MovieClip(mcFactory.generateMovieClipData("ka"));
        this.addChild(mc);
        mc.x = this._winWidth * 2 - mc.width - 145;
        mc.y = this._winHeight - 180;
        mc.frameRate = 10;
        mc.gotoAndPlay(0);
        this._kaMovie1 = mc;
        this._kaMovie1.addEventListener(egret.Event.COMPLETE, this.kaAnimateEnd, this);
    };
    p.kaAnimateEnd = function (event) {
        this.removeChild(this._kaMovie1);
        var data = RES.getRes("kanext_json"); //JSON  
        var txtr = RES.getRes("kanext_png"); //Texture  
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        var mc = new egret.MovieClip(mcFactory.generateMovieClipData("kanext"));
        this.addChild(mc);
        mc.x = this._winWidth * 2 - 180;
        mc.y = this._winHeight - 180;
        mc.frameRate = 6;
        mc.gotoAndPlay(0, -1);
        this._kaMovie2 = mc;
        this.page3Animate();
    };
    p.page3Animate = function () {
        this._labelScroll.visible = true;
        egret.Tween.get(this._labelScroll)
            .wait(100)
            .call(this.addLabel, this, ["label1_png", 1])
            .wait(2000)
            .call(this.addLabel, this, ["label2_png", 2])
            .wait(1200)
            .call(this.page3ReadyToDraw, this);
    };
    p.page3ReadyToDraw = function () {
        this._index = 3;
        this._lineShape = new egret.Shape();
        this.addChild(this._lineShape);
        this._lineShape.graphics.lineStyle(2, 0x000000);
        this.btnShow();
        var line = ResourceUtils.createBitmapByName('page3_5_png');
        this.addChild(line);
        line.x = Const.SWIDTH - line.width - 20;
        line.y = this._winHeight + 200;
        egret.Tween.get(line, { loop: true })
            .to({ alpha: 0 }, 400)
            .to({ alpha: 1 }, 400);
        this._virtualLine = line;
    };
    p.page3End = function () {
        this.btnHide();
        var y = this._car.y;
        this.carStartMove();
        this._car.rotation = 10;
        egret.Tween.get(this._car)
            .to({ rotation: 8, x: Const.SWIDTH + 200, y: y + 300 }, 2200, egret.Ease.sineIn)
            .wait(500)
            .call(this.page4, this);
    };
    p.page4 = function () {
        this.removeChild(this._virtualLine);
        this._labelScroll.visible = false;
        this._lineShape.graphics.clear();
        this.removeChild(this._longMovie2);
        this.removeChild(this._kaMovie2);
        this.removeChild(this._trafficLight);
        this._car.x = 0;
        this._car.y = Const.SHEIGHT * 0.5 + 60;
        this._car.scaleX = 0.7;
        this._car.scaleY = 0.7;
        this._car.rotation = 0;
        this._threeRound = ResourceUtils.createBitmapByName('page4_2_png');
        this.addChild(this._threeRound);
        this._threeRound.x = 0;
        this._threeRound.y = Const.SHEIGHT / 2 - this._threeRound.height + 310;
        egret.Tween.get(this._car)
            .to({ x: 200 }, 2000, egret.Ease.sineOut)
            .call(this.page4Start, this);
    };
    p.page4Start = function () {
        var _this = this;
        this.carStop();
        this._labelScroll.visible = true;
        egret.Tween.get(this._labelScroll)
            .wait(100)
            .call(this.addLabel, this, ["label3_png", 3])
            .wait(2000)
            .call(this.addLabel, this, ["label4_png", 4])
            .wait(2000)
            .call(function () {
            _this.addNavigation();
            _this.addLabel("label5_png", 5);
        })
            .wait(1200)
            .call(this.page4Ready, this);
    };
    p.addNavigation = function () {
        this._navigation = ResourceUtils.createBitmapByName('page4_3_png');
        this.addChild(this._navigation);
        this._navigation.anchorOffsetX = this._navigation.width / 2;
        this._navigation.anchorOffsetY = this._navigation.height / 2;
        this._navigation.x = 230;
        this._navigation.y = 388;
        this._navigation.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.navDown, this);
        this._navigation.addEventListener(egret.TouchEvent.TOUCH_END, this.navUp, this);
        this._navigation.touchEnabled = true;
        egret.Tween.get(this._navigation, { loop: true })
            .to({ scaleX: 1.2, scaleY: 0.8 }, 300)
            .to({ scaleX: 1, scaleY: 1 }, 300).wait(100);
        egret.Tween.get(this._navigation)
            .to({ y: 260 }, 1000);
    };
    p.page4Ready = function () {
        this._index = 4;
        this.btnShow();
    };
    p.navDown = function (e) {
        this._touchStatus4 = true;
        this._distance.x = e.stageX - this._navigation.x;
        this._distance.y = e.stageY - this._navigation.y;
    };
    p.navUp = function (e) {
        this._touchStatus4 = false;
        var x = e.stageX;
        var y = e.stageY;
        var minX = 100;
        var maxX = 350;
        var minY = Const.SHEIGHT / 2 - 100;
        var maxY = Const.SHEIGHT / 2 + 250;
        if (x >= minX && x <= minY && y >= minY && y <= maxY) {
            egret.Tween.pauseTweens(this._navigation);
            this.removeChild(this._navigation);
            this._navigation = ResourceUtils.createBitmapByName('page4_3_png');
            this._car.addChild(this._navigation);
            this._navigation.scaleX = 1.428;
            this._navigation.scaleY = 1.428;
            this._navigation.anchorOffsetX = this._navigation.width / 2;
            this._navigation.anchorOffsetY = this._navigation.height / 2;
            this._navigation.x = 360;
            this._navigation.y = this._rightShoe.y - 120;
            egret.Tween.get(this._navigation, { loop: true })
                .to({ scaleX: 1.6, scaleY: 1.3 }, 300)
                .to({ scaleX: 1.428, scaleY: 1.428 }, 300).wait(100);
            this._isCollide = true;
        }
        else {
            this._navigation.x = Const.SWIDTH - 170;
            this._navigation.y = 230;
        }
    };
    p.page4End = function () {
        var _this = this;
        this.carStartMove();
        this._navigation.touchEnabled = false;
        this._labelScroll.visible = false;
        this._navigation.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.navDown, this);
        this._navigation.removeEventListener(egret.TouchEvent.TOUCH_END, this.navUp, this);
        this.btnHide();
        var y = this._car.y;
        egret.Tween.get(this._leftShoe, { loop: true }).to({ rotation: 360 }, 1500);
        egret.Tween.get(this._rightShoe, { loop: true }).to({ rotation: 360 }, 1500);
        egret.Tween.get(this._car)
            .to({ x: 320 }, 500)
            .call(function () { _this._car.rotation = -15; })
            .to({ rotation: -45, x: Const.SWIDTH - 100, y: Const.SHEIGHT / 2 - 120, scaleX: 0.5, scaleY: 0.5 }, 2500, egret.Ease.sineInOut)
            .to({ rotation: -25, x: Const.SWIDTH + 200, y: Const.SHEIGHT / 2 - 150, scaleX: 0.4, scaleY: 0.4 }, 2000, egret.Ease.sineIn)
            .call(this.page5, this);
        egret.Tween.get(this._navigation)
            .to({ rotation: -30 }, 300)
            .to({ rotation: -28 }, 300)
            .to({ rotation: -29 }, 300)
            .to({ rotation: -28 }, 300)
            .to({ rotation: -30 }, 300);
    };
    p.page5 = function () {
        this.removeChild(this._threeRound);
        this._car.x = -100;
        this._round.y = this._round.y + 50;
        egret.Tween.get(this._navigation)
            .to({ rotation: -15 }, 500)
            .wait(1500)
            .to({ rotation: 0 }, 50)
            .to({ rotation: 8 }, 50)
            .to({ rotation: 0 }, 50);
        egret.Tween.get(this._car)
            .to({ rotation: 0, scaleX: 0.7, scaleY: 0.7, x: 100, y: Const.SHEIGHT / 2 + 60 }, 2000, egret.Ease.sineOut)
            .to({ x: 130 }, 500, egret.Ease.sineOut)
            .to({ x: 150 }, 500, egret.Ease.sineOut)
            .to({ x: 170 }, 500, egret.Ease.sineOut)
            .call(this.page5Start, this);
        egret.Tween.get(this._leftShoe, { loop: true })
            .wait(2000)
            .to({ rotation: 360 }, 2000);
        egret.Tween.get(this._rightShoe, { loop: true })
            .wait(2000)
            .to({ rotation: 360 }, 2000);
    };
    p.page5Start = function () {
        this.carStop();
        this._labelScroll.visible = true;
        egret.Tween.get(this._labelScroll)
            .wait(200)
            .call(this.addLabel, this, ["label6_png", 6])
            .wait(2000)
            .call(this.addLabel, this, ["label7_png", 7])
            .wait(1200)
            .call(this.page5Ready, this);
    };
    p.page5Ready = function () {
        this._index = 5;
        this.btnShow();
        this._lineShape.graphics.lineStyle(5, 0x000000);
    };
    p.page5End = function () {
        egret.Tween.get(this._lineShape)
            .to({ x: 0, y: 50 }, 300)
            .to({ x: 0, y: -50 }, 300)
            .to({ x: -50, y: 0 }, 300)
            .to({ x: 50, y: 0 }, 300)
            .wait(200)
            .call(this.page5Animate, this);
    };
    p.page5Animate = function () {
        this._lineShape.graphics.clear();
        this.btnHide();
        this._gas = ResourceUtils.createBitmapByName('page5_3_png');
        this.addChild(this._gas);
        this._gas.anchorOffsetX = this._gas.width / 2;
        this._gas.anchorOffsetY = this._gas.height / 2;
        this._gas.scaleX = 0.6;
        this._gas.scaleY = 0.6;
        this._gas.x = Const.SWIDTH - 150;
        this._gas.y = Const.SHEIGHT / 2 - this._gas.height / 2;
        this._gas.alpha = 0;
        egret.Tween.get(this._gas)
            .wait(200)
            .to({ alpha: 1, scaleX: 0.5, scaleY: 0.5 }, 500);
        egret.Tween.get(this._car)
            .wait(200)
            .to({ scaleX: 0.5, scaleY: 0.5, y: this._car.y + 180 }, 500)
            .wait(1000)
            .to({ scaleX: 0.3, scaleY: 0.3, x: Const.SWIDTH - 200, y: Const.SHEIGHT / 2 - 100 }, 2000)
            .wait(500)
            .call(this.scaleGas, this);
        egret.Tween.get(this._round)
            .wait(200)
            .to({ y: this._round.y + 130 }, 500);
    };
    p.scaleGas = function () {
        egret.Tween.get(this._car)
            .to({ scaleX: 0.7, scaleY: 0.7, x: 250, y: this._winHeight + 60 }, 500)
            .wait(2000)
            .to({ x: Const.SWIDTH + 200 }, 1000, egret.Ease.sineIn)
            .call(this.page6, this);
        egret.Tween.get(this._gas)
            .to({ scaleX: 1, scaleY: 1, x: Const.SWIDTH - 300, y: Const.SHEIGHT / 2 + 40 }, 500);
        egret.Tween.get(this._round)
            .to({ y: this._round.y - 130 }, 500);
    };
    p.page6 = function () {
        this.removeChild(this._gas);
        this.removeChild(this._lineShape);
        this._car.x = 0;
        this._car.rotation = 0;
        egret.Tween.get(this._car)
            .to({ x: 200 }, 1500, egret.Ease.sineOut);
        this.page6Start();
        egret.Tween.resumeTweens(this._shape);
        egret.Tween.resumeTweens(this._leftShoe);
        egret.Tween.resumeTweens(this._rightShoe);
    };
    p.page6Start = function () {
        this._dust.visible = false;
        this._index = 6;
        this._milestone = ResourceUtils.createBitmapByName('page6_2_png');
        this.addChild(this._milestone);
        this._milestone.x = Const.SWIDTH;
        this._milestone.y = Const.SHEIGHT / 2 - this._milestone.height / 2 + 60;
        this._page6Title = ResourceUtils.createBitmapByName('page6_3_png');
        this.addChild(this._page6Title);
        this._page6Title.x = Const.SWIDTH - this._milestone.width + 90;
        this._page6Title.y = Const.SHEIGHT / 2 + 30;
        this._page6Title.visible = false;
        var input = new egret.TextField();
        input.text = "";
        this.addChild(input);
        input.x = Const.SWIDTH;
        input.y = Const.SHEIGHT / 2;
        this._input = input;
        input.width = 180;
        input.height = 100;
        input.size = 30;
        input.textColor = 0x292929;
        input.verticalAlign = egret.VerticalAlign.MIDDLE;
        input.type = egret.TextFieldType.INPUT;
        input.maxChars = 6;
        input.addEventListener(egret.FocusEvent.FOCUS_IN, function (e) {
            this._page6Title.visible = false;
        }, this);
        input.addEventListener(egret.FocusEvent.FOCUS_OUT, function (e) {
            if (input.text == "") {
                this._page6Title.visible = true;
            }
        }, this);
        egret.Tween.get(this._milestone)
            .to({ x: Const.SWIDTH - this._milestone.width - 30 }, 1500, egret.Ease.sineOut)
            .call(this.page6Show, this);
        egret.Tween.get(this._input)
            .to({ x: Const.SWIDTH - this._milestone.width + 90 }, 1500, egret.Ease.sineOut);
    };
    p.page6Show = function () {
        this.carStop();
        this._page6Title.visible = true;
        this._labelScroll.visible = true;
        egret.Tween.get(this._labelScroll)
            .wait(100)
            .call(this.addLabel, this, ["label8_png", 8])
            .wait(1200)
            .call(this.addLabel, this, ["label9_png", 9])
            .wait(1000)
            .call(this.btnShow, this);
    };
    p.page6Hide = function () {
        this.btnHide();
        this.removeChild(this._milestone);
        this._labelScroll.visible = false;
        this._input.visible = false;
        this._navigation.visible = false;
    };
    p.page7 = function () {
        this.removeChild(this._du);
        this.removeChild(this._round);
        this._index = 7;
        egret.Tween.resumeTweens(this._shape);
        egret.Tween.resumeTweens(this._leftShoe);
        egret.Tween.resumeTweens(this._rightShoe);
        egret.Tween.get(this._car)
            .to({ scaleX: 0.6, scaleY: 0.6, x: Const.SWIDTH / 2, y: Const.SHEIGHT / 2 + 100 }, 1000)
            .call(this.addGold, this);
    };
    p.addGold = function () {
        var round = ResourceUtils.createBitmapByName('page2_7_png');
        this._car.addChild(round);
        round.scaleX = 1.4;
        round.scaleY = 1.4;
        round.x = Const.SWIDTH / 2 - round.width / 2 - 130;
        round.y = Const.SHEIGHT / 2 + 180;
        var gold = ResourceUtils.createBitmapByName('page7_1_png');
        this.addChild(gold);
        gold.x = Const.SWIDTH / 2 - gold.width / 2;
        gold.y = -gold.height;
        egret.Tween.get(gold)
            .to({ y: -10 }, 500, egret.Ease.backOut)
            .call(this.page7Title, this);
    };
    p.page7Title = function () {
        var w = this._winWidth;
        var h = 360;
        var title2 = ResourceUtils.createBitmapByName('page7_6_png');
        this.addChild(title2);
        title2.x = w - title2.width / 2;
        title2.y = 350;
        var label = new egret.TextField();
        this.addChild(label);
        label.width = 120;
        label.x = Const.SWIDTH - 340;
        label.y = 510;
        label.textColor = 0xf3382f;
        label.size = 20;
        label.verticalAlign = egret.VerticalAlign.MIDDLE;
        label.text = this._input.text;
        var title3 = ResourceUtils.createBitmapByName('page7_4_png');
        this.addChild(title3);
        title3.x = w;
        title3.y = title2.height + 400;
        title3.scaleX = 0.01;
        title3.scaleY = 0.01;
        title3.anchorOffsetX = title3.width / 2;
        title3.anchorOffsetY = title3.height / 2;
        var title1 = ResourceUtils.createBitmapByName('page7_5_png');
        this.addChild(title1);
        title1.x = w;
        title1.y = Const.SHEIGHT - 280;
        title1.scaleX = 0.01;
        title1.scaleX = 0.01;
        title1.anchorOffsetX = title1.width / 2;
        title1.anchorOffsetY = title1.height / 2;
        egret.Tween.get(title3)
            .wait(200)
            .to({ scaleX: 1.1, scaleY: 1.1 }, 200)
            .to({ scaleX: 1, scaleY: 1 }, 200);
        egret.Tween.get(title1)
            .wait(600)
            .to({ scaleX: 1.1, scaleY: 1.1 }, 200)
            .to({ scaleX: 1, scaleY: 1 }, 200)
            .call(this.page7Btn, this);
    };
    p.page7Btn = function () {
        var w = this._winWidth;
        var outlineBtn = new MyButton("page7_2_png", "page7_2_png");
        this.addChild(outlineBtn);
        outlineBtn.x = w - outlineBtn.width / 2;
        outlineBtn.y = Const.SHEIGHT - outlineBtn.height / 2 - 180;
        outlineBtn.setClick(this.outlineCallback.bind(this));
        var shareBtn = new MyButton("page7_3_png", "page7_3_png");
        this.addChild(shareBtn);
        shareBtn.x = w - shareBtn.width / 2;
        shareBtn.y = Const.SHEIGHT - shareBtn.height / 2 - 70;
        shareBtn.setClick(this.shareCallback.bind(this));
        this._shareShape = new egret.Shape();
        this.addChild(this._shareShape);
        this._share = ResourceUtils.createBitmapByName('page7_7_png');
        this.addChild(this._share);
        this._share.x = Const.SWIDTH - this._share.width;
        this._share.y = 0;
        this._share.visible = false;
    };
    p.outlineCallback = function () {
        alert('领取成功！');
    };
    p.shareCallback = function () {
        this._shareShape.graphics.beginFill(0x000000);
        this._shareShape.graphics.drawRect(0, 0, Const.SWIDTH, Const.SHEIGHT);
        this._shareShape.graphics.endFill();
        this._shareShape.x = 0;
        this._shareShape.y = 0;
        this._shareShape.alpha = .6;
        this._share.visible = true;
    };
    p.carStop = function () {
        this._dust.visible = false;
        egret.Tween.pauseTweens(this._leftShoe);
        egret.Tween.pauseTweens(this._rightShoe);
        egret.Tween.pauseTweens(this._shape);
    };
    p.carStartMove = function () {
        this._dust.visible = true;
        egret.Tween.get(this._leftShoe, { loop: true }).to({ rotation: 360 }, 1500);
        egret.Tween.get(this._rightShoe, { loop: true }).to({ rotation: 360 }, 1500);
        egret.Tween.resumeTweens(this._shape);
    };
    p.carStand = function () {
    };
    p.carAppear = function () {
        this._car.x = 0;
        this._car.y = Const.SHEIGHT * 0.5 + 70;
        this._car.rotation = 0;
        this._car.scaleX = 0.7;
        this._car.scaleY = 0.7;
    };
    p.btnShow = function () {
        this._confirm_btn.visible = true;
        this._redraw_btn.visible = true;
    };
    p.btnHide = function () {
        this._confirm_btn.visible = false;
        this._redraw_btn.visible = false;
    };
    return GameScene;
}(egret.DisplayObjectContainer));
egret.registerClass(GameScene,'GameScene');
//# sourceMappingURL=GameScene.js.map