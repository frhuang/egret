var GameStart = (function (_super) {
    __extends(GameStart, _super);
    function GameStart() {
        _super.call(this);
        this.init();
    }
    var d = __define,c=GameStart,p=c.prototype;
    p.init = function () {
        var width = Const.SWIDTH / 2;
        var height = Const.SHEIGHT;
        var du = ResourceUtils.createBitmapByName('page1_4_png');
        this.addChild(du);
        du.x = width - du.width / 2;
        du.y = 20;
        var title = ResourceUtils.createBitmapByName('page1_5_png');
        this.addChild(title);
        title.x = width - title.width / 2;
        title.y = 100;
        var data = RES.getRes("car_json"); //JSON  
        var txtr = RES.getRes("car_png"); //Texture  
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        var mc = new egret.MovieClip(mcFactory.generateMovieClipData("car"));
        this.addChild(mc);
        mc.x = width - mc.width / 2;
        mc.y = height / 2;
        mc.frameRate = 12;
        mc.gotoAndPlay(0, -1);
        var start_btn = new MyButton("btn1_png", "btn1_png");
        this.addChild(start_btn);
        start_btn.x = width;
        start_btn.y = height - 260;
        start_btn.anchorOffsetX = start_btn.width / 2;
        start_btn.anchorOffsetY = start_btn.height / 2;
        start_btn.setClick(this.showPage2View.bind(this));
        egret.Tween.get(start_btn, { loop: true })
            .to({ rotation: -6 }, 300)
            .to({ rotation: 0 }, 300);
        var start_title = ResourceUtils.createBitmapByName("page1_1_png");
        this.addChild(start_title);
        start_title.x = width - start_title.width / 2;
        start_title.y = height - 120;
        var finger = ResourceUtils.createBitmapByName('page1_2_png');
        this.addChild(finger);
        finger.x = width - finger.width / 2;
        finger.y = height - 140;
        egret.Tween.get(finger, { loop: true })
            .to({ y: height - 155 }, 200)
            .to({ y: height - 140 }, 200);
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