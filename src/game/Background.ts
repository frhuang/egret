class Background extends egret.Sprite {
    private _bg1:egret.Bitmap;
    private _bg2:egret.Bitmap;
    public constructor() {
        super();
        this.init();
    }
    private init():void{
        this._bg1 = ResourceUtils.createBitmapByName('bg1_png');
        this.addChild(this._bg1);
        this._bg1.x = Const.SWIDTH;
        this._bg1.y = Const.SHEIGHT / 2;
    }
}