var GameStart = (function (_super) {
    __extends(GameStart, _super);
    function GameStart() {
        _super.call(this);
        this.init();
    }
    var d = __define,c=GameStart,p=c.prototype;
    p.init = function () {
        var start_btn = new MyButton("btn1_png", "btn1_png");
        this.addChild(start_btn);
        start_btn.x = Const.SWIDTH / 2 - start_btn.width / 2;
        start_btn.y = Const.SHEIGHT - 120;
        start_btn.setClick(this.showPage2View.bind(this));
    };
    p.showPage2View = function () {
        if (this.parent)
            this.parent.removeChild(this);
        MainGame.game.start();
    };
    return GameStart;
}(egret.Sprite));
egret.registerClass(GameStart,'GameStart');
//# sourceMappingURL=GameStart.js.map