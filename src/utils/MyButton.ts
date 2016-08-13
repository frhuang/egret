class MyButton extends egret.Sprite {
    private bg:egret.Bitmap;
    private title:egret.Bitmap;
    private onClick:Function;
    private tw:egret.Tween;
    private sp:egret.Sprite;
    private noScaleX:number;
    private noScaleY:number;
    public constructor(bgName:string, titleName:string) {
        super();
        this.sp = new egret.Sprite();
        this.addChild(this.sp);
        this.bg = ResourceUtils.createBitmapByName(bgName);
        this.sp.addChild(this.bg);

        this.title = ResourceUtils.createBitmapByName(titleName);
        if (this.title.texture == null) {
            this.title.texture = RES.getRes(titleName);
        }
        // this.title.x = (this.bg.width - this.title.width) >> 1;
        // this.title.y = (this.bg.height - this.title.height) >> 1;
        this.sp.addChild(this.title);
        // this.noScaleX = this.sp.x;
        // this.noScaleY = this.sp.y;
    }

    public setClick(func:Function):void {

        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickEvent, this);
        this.onClick = func;
    }

    private onClickEvent():void {
        var scaleX:number = (this.sp.width-this.sp.width*0.8)/2;
        var scaleY:number = (this.sp.height-this.sp.height*0.8)/2;
        this.tw = egret.Tween.get(this.sp);
        this.tw.call(this.onClickHandler,this);
    }
    private onClickHandler():void
    {
        this.onClick();
    }
}