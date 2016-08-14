var MainGame = (function (_super) {
    __extends(MainGame, _super);
    function MainGame() {
        _super.call(this);
        MainGame.game = this;
        this.init();
    }
    var d = __define,c=MainGame,p=c.prototype;
    p.init = function () {
        var bg = ResourceUtils.createBitmapByName('bg_jpg');
        this.addChild(bg);
        bg.width = Const.SWIDTH;
        bg.height = Const.SHEIGHT;
        this.gameContainer = new egret.Sprite();
        this.addChild(this.gameContainer);
        this.showStart();
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