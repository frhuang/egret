var Background = (function (_super) {
    __extends(Background, _super);
    function Background() {
        _super.call(this);
        this.init();
    }
    var d = __define,c=Background,p=c.prototype;
    p.init = function () {
        this._bg1 = ResourceUtils.createBitmapByName('bg1_png');
        this.addChild(this._bg1);
        this._width = this._bg1.width;
        this._bg1.x = 0;
        this._bg1.y = Const.SHEIGHT / 2 - 220;
        this._bg2 = ResourceUtils.createBitmapByName('bg1_png');
        this.addChild(this._bg2);
        this._bg2.x = this._width - 1;
        this._bg2.y = Const.SHEIGHT / 2 - 220;
        this._bg3 = ResourceUtils.createBitmapByName('bg2_png');
        this.addChild(this._bg3);
        this._bg3.x = this._width - 100;
        this._bg3.y = Const.SHEIGHT / 2 - 250;
    };
    p.run = function (time) {
        var _this = this;
        egret.Tween.pauseTweens(this._bg1);
        egret.Tween.pauseTweens(this._bg2);
        var changeBg1 = function () {
            _this._bg1.x = _this._width - 1;
            bgRun1(2 * time);
        };
        var changeBg2 = function () {
            _this._bg2.x = _this._width - 1;
            bgRun2(2 * time);
        };
        var changeBg3 = function () {
            _this._bg3.x = _this._width - 100;
            bgRun3(2 * time);
        };
        var bgRun1 = function (t) {
            egret.Tween.get(_this._bg1)
                .to({ x: -_this._width }, t)
                .call(changeBg1, _this);
        };
        var bgRun2 = function (t) {
            egret.Tween.get(_this._bg2)
                .to({ x: -_this._width }, t)
                .call(changeBg2, _this);
        };
        var bgRun3 = function (t) {
            egret.Tween.get(_this._bg3)
                .to({ x: -_this._width }, t)
                .call(changeBg3, _this);
        };
        bgRun1(time);
        bgRun2(2 * time);
        bgRun3(2 * time);
    };
    p.stop = function () {
        egret.Tween.pauseTweens(this._bg1);
        egret.Tween.pauseTweens(this._bg2);
        egret.Tween.pauseTweens(this._bg3);
        this.reset();
    };
    p.reset = function () {
        this._bg1.x = 0;
        this._bg2.x = this._width;
        this._bg3.x = this._width - 100;
    };
    return Background;
}(egret.Sprite));
egret.registerClass(Background,'Background');
//# sourceMappingURL=Background.js.map