var MainGame = (function (_super) {
    __extends(MainGame, _super);
    function MainGame() {
        _super.call(this);
        MainGame.game = this;
        this.init();
    }
    var d = __define,c=MainGame,p=c.prototype;
    p.init = function () {
        this.gameContainer = new egret.Sprite();
        this.addChild(this.gameContainer);
        this.showStart();
    };
    p.start = function () {
        this.clear();
        this._pageScene1 = new PageScene1();
        this.gameContainer.addChild(this._pageScene1);
    };
    p.nextScene = function () {
        this.clear();
        console.log(Const.ALL_X_Y);
        var pageScene2 = new PageScene2();
        this.gameContainer.addChild(pageScene2);
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