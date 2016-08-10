var PageScene1 = (function (_super) {
    __extends(PageScene1, _super);
    function PageScene1() {
        _super.call(this);
        this._touchStatus = false;
        this._distance = new egret.Point();
        this._x = [];
        this._y = [];
        this._all_X_Y = [];
        this._all_Y_X = [];
        this.init();
    }
    var d = __define,c=PageScene1,p=c.prototype;
    p.init = function () {
        var drawArea = ResourceUtils.createBitmapByName('p1-area_png');
        this.addChild(drawArea);
        drawArea.x = Const.SWIDTH / 2 - drawArea.width / 2;
        drawArea.y = Const.SHEIGHT / 2 - drawArea.height / 2;
        drawArea.touchEnabled = true;
        var confirm_btn = new MyButton("btn2_png", "btn2_png");
        this.addChild(confirm_btn);
        confirm_btn.x = Const.SWIDTH / 2 - 150;
        confirm_btn.y = Const.SHEIGHT - 120;
        confirm_btn.setClick(this.confirmClick.bind(this));
        var redraw_btn = new MyButton("btn3_png", "btn3_png");
        this.addChild(redraw_btn);
        redraw_btn.x = Const.SWIDTH / 2 + 100;
        redraw_btn.y = Const.SHEIGHT - 120;
        redraw_btn.setClick(this.redrawClick.bind(this));
        this._shape = new egret.Shape();
        this._shape.width = Const.SWIDTH;
        this._shape.height = Const.SHEIGHT;
        this.addChild(this._shape);
        this._shape.graphics.lineStyle(2, 0x000000);
        drawArea.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchStart, this);
        drawArea.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        drawArea.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
    };
    p.confirmClick = function () {
        if (this._all_X_Y.length > 0) {
            Const.ALL_X_Y = this._all_X_Y;
            Const.ALL_Y_X = this._all_Y_X;
            egret.setTimeout(function () {
                MainGame.game.nextScene();
            }, this, 200);
        }
    };
    p.redrawClick = function () {
        this._shape.graphics.clear();
        this._all_X_Y = [];
        this._all_Y_X = [];
        this._shape.graphics.lineStyle(2, 0x000000);
    };
    p.touchStart = function (e) {
        this._touchStatus = true;
        var x = e.stageX;
        var y = e.stageY;
        this._shape.graphics.moveTo(x, y);
        this._shape.graphics.lineTo(x + 1, y);
    };
    p.touchMove = function (e) {
        if (this._touchStatus) {
            var x = e.stageX;
            var y = e.stageY;
            this.movePoint(x, y);
        }
    };
    p.touchEnd = function (e) {
        this._all_X_Y.push(this._x);
        this._all_Y_X.push(this._y);
        this._touchStatus = false;
        this._x = [];
        this._y = [];
    };
    p.movePoint = function (x, y) {
        this._x.push(x);
        this._y.push(y);
        var shape = this._shape;
        shape.graphics.lineTo(x, y);
    };
    return PageScene1;
}(egret.Sprite));
egret.registerClass(PageScene1,'PageScene1');
//# sourceMappingURL=PageScene1.js.map