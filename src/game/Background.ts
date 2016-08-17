class Background extends egret.Sprite {
    private _bg1:egret.Bitmap;
    private _bg2:egret.Bitmap;
    private _bg3:egret.Bitmap;
    private _width:number;
    public constructor() {
        super();
        this.init();
    }
    private init():void{
        this._bg1 = ResourceUtils.createBitmapByName('bg1_png');

        this.addChild(this._bg1);
        this._width = this._bg1.width;
        this._bg1.x = 0;
        this._bg1.y = Const.SHEIGHT / 2 - 220;

        this._bg2 = ResourceUtils.createBitmapByName('bg1_png');
        this.addChild(this._bg2);
        this._bg2.x = this._width-1;
        this._bg2.y = Const.SHEIGHT / 2 - 220;

        this._bg3 = ResourceUtils.createBitmapByName('olympic.bg2');
        this.addChild(this._bg3);
        this._bg3.x = this._width - 100;
        this._bg3.y =  Const.SHEIGHT / 2 - 250;
    }
    public run(time:number):void{
        egret.Tween.pauseTweens(this._bg1);
        egret.Tween.pauseTweens(this._bg2);
        var changeBg1 = ():void => {
            this._bg1.x = this._width-1;
            bgRun1(2 * time);
        }
        var changeBg2 = ():void => {
            this._bg2.x = this._width-1;
            bgRun2(2*time);
        }
        var changeBg3 = ():void => {
            this._bg3.x = this._width-100;
            bgRun3(2*time);
        }
        var bgRun1 = (t):void => {
            egret.Tween.get(this._bg1)
            .to({x: -this._width}, t)
            .call(changeBg1, this);
        }

        var bgRun2 = (t):void => {
            egret.Tween.get(this._bg2)
            .to({x: -this._width}, t)
            .call(changeBg2, this);
        }
        var bgRun3 = (t):void => {
            egret.Tween.get(this._bg3)
            .to({x: -this._width}, t)
            .call(changeBg3, this);
        }
        
        bgRun1(time);
        bgRun2(2*time);
        bgRun3(2*time);
    }
    
    public stop():void{
        egret.Tween.pauseTweens(this._bg1);
        egret.Tween.pauseTweens(this._bg2);
        egret.Tween.pauseTweens(this._bg3);
        this.reset();
    }
    public reset():void{
        this._bg1.x = 0;
        this._bg2.x = this._width;
        this._bg3.x = this._width - 100;
    }
}