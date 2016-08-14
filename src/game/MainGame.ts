declare function showPage(className:string);
class MainGame extends egret.Sprite{
    public static game:MainGame;
    private _startScene:GameStart;
    private _gameScene:GameScene;
    private gameContainer:egret.Sprite;
    constructor() {
        super();
        MainGame.game = this;
        this.init();
    }
    private init():void{
        var bg = ResourceUtils.createBitmapByName('bg_jpg');
        this.addChild(bg);
        bg.width = Const.SWIDTH;
        bg.height = Const.SHEIGHT;
        
        this.gameContainer = new egret.Sprite();
        this.addChild(this.gameContainer);
        this.showStart();
       
    }
    public start():void{
        this.clear();
        this._gameScene = new GameScene();
        this.gameContainer.addChild(this._gameScene); 
    }
    private clear():void{
       while(this.gameContainer.numChildren){
            this.gameContainer.removeChildAt(0);
        }
    }
    private showStart():void{
        this.clear();
        this._startScene = new GameStart();
        this.gameContainer.addChild(this._startScene);
    }
}