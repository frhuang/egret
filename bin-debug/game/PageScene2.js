var PageScene2 = (function (_super) {
    __extends(PageScene2, _super);
    function PageScene2() {
        _super.call(this);
        this._touchStatus1 = false;
        this._touchStatus2 = false;
        this._touchStatus3 = false;
        this._distance = new egret.Point();
        this._index = 0;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=PageScene2,p=c.prototype;
    p.onAddToStage = function (event) {
        this.init();
    };
    p.init = function () {
        this._index = 0;
        this._car = new egret.Sprite();
        this.addChild(this._car);
        var confirm_btn = new MyButton("btn2_png", "btn2_png");
        this.addChild(confirm_btn);
        confirm_btn.x = Const.SWIDTH / 2 - 150;
        confirm_btn.y = Const.SHEIGHT - 120;
        confirm_btn.setClick(this.confirmClick.bind(this));
        this._confirm_btn = confirm_btn;
        var redraw_btn = new MyButton("btn3_png", "btn3_png");
        this.addChild(redraw_btn);
        redraw_btn.x = Const.SWIDTH / 2 + 100;
        redraw_btn.y = Const.SHEIGHT - 120;
        redraw_btn.setClick(this.redrawClick.bind(this));
        this._redraw_btn = redraw_btn;
        this.initShape();
        this.initShoe();
    };
    //初始化汽车
    p.initShape = function () {
        this._shape = new egret.Shape();
        this._car.addChild(this._shape);
        this._shape.graphics.lineStyle(2, 0x000000);
        var len1 = Const.ALL_X_Y.length;
        for (var i = 0; i < len1; i++) {
            var temp_x = [], temp_y = [];
            temp_x = Const.ALL_X_Y[i];
            temp_y = Const.ALL_Y_X[i];
            this._shape.graphics.moveTo[temp_x[0] + 1, temp_y[0]];
            var len2 = temp_x.length;
            for (var j = 0; j < len2; j++) {
                this._shape.graphics.lineTo(temp_x[j], temp_y[j]);
            }
        }
    };
    //初始化轮胎
    p.initShoe = function () {
        var leftShoe = ResourceUtils.createBitmapByName("shoe_png");
        this._car.addChild(leftShoe);
        leftShoe.x = Const.SWIDTH / 2 - leftShoe.width / 2 - 100;
        leftShoe.y = Const.SHEIGHT / 2 - leftShoe.height / 2;
        leftShoe.anchorOffsetX = 0.5;
        leftShoe.anchorOffsetY = 0.5;
        this._leftShoe = leftShoe;
        this._rightShoe = ResourceUtils.createBitmapByName("shoe_png");
        this._car.addChild(this._rightShoe);
        this._rightShoe.x = Const.SWIDTH / 2 - this._rightShoe.width / 2 + 100;
        this._rightShoe.y = Const.SHEIGHT / 2 - this._rightShoe.height / 2;
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
    //按下左边轮胎
    p.leftShoeDown = function (e) {
        this._touchStatus1 = true;
        this._distance.x = e.stageX - this._leftShoe.x;
        this._distance.y = e.stageY - this._leftShoe.y;
    };
    //松开左边轮胎
    p.leftShoeUp = function (e) {
        this._touchStatus1 = false;
    };
    //按下右边轮胎
    p.rightShoeDown = function (e) {
        this._touchStatus2 = true;
        this._distance.x = e.stageX - this._rightShoe.x;
        this._distance.y = e.stageY - this._rightShoe.y;
    };
    //松开右边轮胎
    p.rightShoeUp = function (e) {
        this._touchStatus2 = false;
    };
    //触摸开始
    p.touchStart = function (e) {
        var x = e.stageX;
        var y = e.stageY;
        if (this._index === 1) {
            this._touchStatus3 = true;
            this._lineShape.graphics.moveTo(x, y);
            this._lineShape.graphics.lineTo(x + 1, y);
        }
    };
    //移动
    p.touchMove = function (e) {
        if (this._index === 0) {
            if (this._touchStatus1) {
                var x = e.stageX - this._distance.x;
                var y = e.stageY - this._distance.y;
                if (x < 100)
                    x = 100;
                else if (x > 200)
                    x = 200;
                if (y < Const.SHEIGHT / 2)
                    y = Const.SHEIGHT / 2;
                else if (y > Const.SHEIGHT / 2 + 200)
                    y = Const.SHEIGHT / 2 + 200;
                this._leftShoe.x = x;
                this._leftShoe.y = y;
            }
            if (this._touchStatus2) {
                this._rightShoe.x = e.stageX - this._distance.x;
                this._rightShoe.y = e.stageY - this._distance.y;
            }
        }
        else if (this._index === 1 && this._touchStatus3) {
            var x = e.stageX;
            var y = e.stageY;
            this.movePoint(x, y);
        }
    };
    //触摸松开
    p.touchEnd = function (e) {
    };
    //确定按钮回调
    p.confirmClick = function () {
        if (this._index === 0) {
            this.page2End();
        }
        else if (this._index === 1) {
            this.page3End();
        }
    };
    //重画按钮回调
    p.redrawClick = function () {
        if (this._index === 1) {
            this._lineShape.graphics.clear();
        }
    };
    //第二页结束
    p.page2End = function () {
        this.btnHide();
        this._leftShoe.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.leftShoeDown, this);
        this._leftShoe.removeEventListener(egret.TouchEvent.TOUCH_END, this.leftShoeUp, this);
        this._rightShoe.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.rightShoeDown, this);
        this._rightShoe.removeEventListener(egret.TouchEvent.TOUCH_END, this.rightShoeUp, this);
        this._touchStatus1 = false;
        this._touchStatus2 = false;
        this.carMove();
    };
    //第3页结束
    p.page3End = function () {
        this.btnHide();
        egret.Tween.get(this._car)
            .to({ x: Const.SWIDTH, y: Const.SHEIGHT - 300 }, 2000)
            .call(this.moveToNext, this);
    };
    p.btnShow = function () {
        this._confirm_btn.visible = true;
        this._redraw_btn.visible = true;
    };
    p.btnHide = function () {
        this._confirm_btn.visible = false;
        this._redraw_btn.visible = false;
    };
    //汽车移动
    p.carMove = function () {
        this.shoeMove();
        egret.Tween.get(this._shape)
            .wait(2000).call(this.page3Start, this);
    };
    //轮胎移动
    p.shoeMove = function () {
        egret.Tween.get(this._leftShoe, { loop: true })
            .to({ rotation: 360 }, 2000);
        egret.Tween.get(this._rightShoe, { loop: true })
            .to({ rotation: 360 }, 2000);
    };
    //进入第三页
    p.page3Start = function () {
        egret.Tween.pauseTweens(this._shape);
        egret.Tween.get(this._car)
            .to({ scale: 0.6, x: -100, y: 0 }, 1000).wait(500)
            .call(this.showSprites, this);
    };
    //出现精灵
    p.showSprites = function () {
        var sprite = ResourceUtils.createBitmapByName('sprites_jpg');
        this.addChild(sprite);
        sprite.x = Const.SWIDTH + sprite.width;
        sprite.y = Const.SHEIGHT / 2 - sprite.height / 2;
        this._sprites = sprite;
        egret.Tween.get(sprite)
            .to({ x: Const.SWIDTH - sprite.width }, 2000)
            .call(this.showDrawLine, this);
    };
    p.showDrawLine = function () {
        this._index = 1;
        this.btnShow();
        this._lineShape = new egret.Shape();
        this.stage.addChild(this._lineShape);
        this._lineShape.graphics.lineStyle(2, 0x000000);
    };
    p.movePoint = function (x, y) {
        var shape = this._lineShape;
        shape.graphics.lineTo(x, y);
    };
    p.moveToNext = function () {
        this._car.x = -Const.SWIDTH;
        this._lineShape.graphics.clear();
        this.removeChild(this._sprites);
        egret.Tween.get(this._car)
            .wait(200)
            .to({ x: 0, y: this._car.y }, 2000)
            .call(this.page4Start, this);
    };
    p.page4Start = function () {
        this._index = 2;
    };
    return PageScene2;
}(egret.DisplayObjectContainer));
egret.registerClass(PageScene2,'PageScene2');
//# sourceMappingURL=PageScene2.js.map