var GameStart = (function (_super) {
    __extends(GameStart, _super);
    function GameStart() {
        _super.call(this);
        this.init();
    }
    var d = __define,c=GameStart,p=c.prototype;
    p.init = function () {
        var title = ResourceUtils.createBitmapByName('page1_5_png');
        this.addChild(title);
        title.x = Const.SWIDTH / 2 - title.width / 2;
        title.y = 100;
        var data = RES.getRes("car_json"); //JSON  
        var txtr = RES.getRes("car_png"); //Texture  
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        var mc = new egret.MovieClip(mcFactory.generateMovieClipData("car1"));
        this.addChild(mc);
        mc.x = Const.SWIDTH / 2 - mc.width / 2;
        mc.y = Const.SHEIGHT / 2 - mc.height / 2;
        mc.frameRate = 10;
        mc.gotoAndPlay(0, -1);
        var start_btn = new MyButton("btn1_png", "btn1_png");
        this.addChild(start_btn);
        start_btn.x = Const.SWIDTH / 2 - start_btn.width / 2;
        start_btn.y = Const.SHEIGHT - 300;
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