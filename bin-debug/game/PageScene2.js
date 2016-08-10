var PageScene2 = (function (_super) {
    __extends(PageScene2, _super);
    function PageScene2() {
        _super.call(this);
        this.init();
    }
    var d = __define,c=PageScene2,p=c.prototype;
    p.init = function () {
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
    };
    p.confirmClick = function () {
        alert('confirm');
    };
    p.redrawClick = function () {
        alert('redraw');
    };
    return PageScene2;
}(egret.Sprite));
egret.registerClass(PageScene2,'PageScene2');
//# sourceMappingURL=PageScene2.js.map