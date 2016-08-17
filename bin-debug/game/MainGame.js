var MainGame = (function (_super) {
    __extends(MainGame, _super);
    function MainGame() {
        _super.call(this);
        this._audioStatus = true;
        MainGame.game = this;
        this.init();
    }
    var d = __define,c=MainGame,p=c.prototype;
    p.init = function () {
        var bg = ResourceUtils.createBitmapByName('bg_jpg');
        this.addChild(bg);
        bg.width = Const.SWIDTH;
        bg.height = Const.SHEIGHT;
        this._audio = new MyButton('olympic.page1_3', 'olympic.page1_3');
        this.addChild(this._audio);
        this._audio.x = Const.SWIDTH - this._audio.width / 2 - 20;
        this._audio.y = 50;
        this._audio.anchorOffsetX = this._audio.width / 2;
        this._audio.anchorOffsetY = this._audio.height / 2;
        this._audio.setClick(this.audioCallback.bind(this));
        egret.Tween.get(this._audio, { loop: true })
            .to({ rotation: 360 }, 800);
        this.gameContainer = new egret.Sprite();
        this.addChild(this.gameContainer);
        this.showStart();
    };
    p.audioCallback = function () {
        if (this._audioStatus) {
            this._audioStatus = false;
            egret.Tween.pauseTweens(this._audio);
            playBgm(this._audioStatus);
        }
        else {
            this._audioStatus = true;
            egret.Tween.resumeTweens(this._audio);
            playBgm(this._audioStatus);
        }
    };
    p.start = function () {
        this.clear();
        this._gameScene = new GameScene();
        this.gameContainer.addChild(this._gameScene);
    };
    p.clear = function () {
        while (this.gameContainer.numChildren) {
            this.gameContainer.removeChildAt(0);
        }
    };
    p.showStart = function () {
        this.clear();
        this._startScene = new GameStart();
        this.gameContainer.addChild(this._startScene);
    };
    return MainGame;
}(egret.Sprite));
egret.registerClass(MainGame,'MainGame');
//# sourceMappingURL=MainGame.js.map