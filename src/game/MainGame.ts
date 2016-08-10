class MainGame extends egret.Sprite{
    public static game:MainGame;
    private _startScene:GameStart;
    private _pageScene1:PageScene1;
    private gameContainer:egret.Sprite;
    constructor() {
        super();
        MainGame.game = this;
        this.init();
    }
    private init():void{
        this.gameContainer = new egret.Sprite();
        this.addChild(this.gameContainer);
        this.showStart();
    }
    public start():void{
        this.clear();
        this._pageScene1 = new PageScene1();
        this.gameContainer.addChild(this._pageScene1); 
    }
    public nextScene():void{
       this.clear();
       var pageScene2:PageScene2 = new PageScene2();
       this.gameContainer.addChild(pageScene2);
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