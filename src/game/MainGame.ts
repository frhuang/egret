
declare function playBgm(b:boolean);
class MainGame extends egret.Sprite{
    public static game:MainGame;
    private _startScene:GameStart;
    private _gameScene:GameScene;
    private gameContainer:egret.Sprite;
    private _audio:MyButton;
    private _audioStatus:boolean = true;
    private _sound:egret.Sound;
    private _channel: egret.SoundChannel;
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
        
        this._audio = new MyButton('olympic.page1_3', 'olympic.page1_3');
        this.addChild(this._audio);
        this._audio.x = Const.SWIDTH - this._audio.width / 2 - 20;
        this._audio.y = 50;
        this._audio.anchorOffsetX = this._audio.width / 2;
        this._audio.anchorOffsetY = this._audio.height / 2;
        this._audio.setClick(this.audioCallback.bind(this));
        egret.Tween.get(this._audio, {loop: true})
            .to({rotation: 360}, 800);
        
        this.gameContainer = new egret.Sprite();
        this.addChild(this.gameContainer);
        this.showStart();
       
    }
    
    private audioCallback():void{
        if(this._audioStatus){
            this._audioStatus = false;
            egret.Tween.pauseTweens(this._audio);
            playBgm(this._audioStatus);
        }else{
            this._audioStatus = true;
            egret.Tween.resumeTweens(this._audio);
            playBgm(this._audioStatus);
            
        }
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