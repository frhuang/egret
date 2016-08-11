class PageScene2 extends egret.DisplayObjectContainer{
    private _shape:egret.Shape; 
    private _lineShape:egret.Shape;
    private _leftShoe:egret.Bitmap;
    private _rightShoe:egret.Bitmap;
    private _touchStatus1:boolean = false;
    private _touchStatus2:boolean = false;
    private _touchStatus3:boolean = false;
    private _confirm_btn:MyButton;
    private _redraw_btn:MyButton;
    private _distance:egret.Point = new egret.Point(); 
    private _index:number = 0;
    private _car:egret.Sprite;
    private _sprites:egret.Bitmap;
    constructor() {
        super(); 
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    private onAddToStage(event:egret.Event) {
        this.init();
    }
    private init():void{
        this._index = 0;
        this._car = new egret.Sprite();
        this.addChild(this._car);
        var confirm_btn:MyButton = new MyButton("btn2_png", "btn2_png");
        this.addChild(confirm_btn);
        confirm_btn.x = Const.SWIDTH /2 - 150;
        confirm_btn.y = Const.SHEIGHT - 120;
        confirm_btn.setClick(this.confirmClick.bind(this));
        this._confirm_btn = confirm_btn;

        var redraw_btn:MyButton = new MyButton("btn3_png", "btn3_png");
        this.addChild(redraw_btn);
        redraw_btn.x = Const.SWIDTH/2 + 100;
        redraw_btn.y = Const.SHEIGHT - 120;
        redraw_btn.setClick(this.redrawClick.bind(this));
        this._redraw_btn = redraw_btn;

        this.initShape();
        
        this.initShoe();
        
    }
    //初始化汽车
    private initShape() {
        this._shape = new egret.Shape();
        this._car.addChild(this._shape);
        this._shape.graphics.lineStyle(2, 0x000000);
        var len1 = Const.ALL_X_Y.length;
        for(var i=0; i < len1; i++) {
            var temp_x = [],
                temp_y = [];
            temp_x = Const.ALL_X_Y[i];
            temp_y = Const.ALL_Y_X[i];
            this._shape.graphics.moveTo[temp_x[0]+1, temp_y[0]];
            var len2 = temp_x.length;
            for(var j=0; j < len2 ; j++) {
                this._shape.graphics.lineTo(temp_x[j], temp_y[j]);
            }    
        }
    }
    //初始化轮胎
    private initShoe() {
        var leftShoe = ResourceUtils.createBitmapByName("shoe_png");
        this._car.addChild(leftShoe);
        leftShoe.x = Const.SWIDTH / 2 - leftShoe.width/2 - 100;
        leftShoe.y = Const.SHEIGHT / 2 - leftShoe.height / 2;
        leftShoe.anchorOffsetX = 0.5;
        leftShoe.anchorOffsetY = 0.5;
        this._leftShoe = leftShoe;
        this._rightShoe = ResourceUtils.createBitmapByName("shoe_png");
        this._car.addChild(this._rightShoe);
        this._rightShoe.x = Const.SWIDTH / 2 - this._rightShoe.width / 2 + 100;
        this._rightShoe.y = Const.SHEIGHT / 2 - this._rightShoe.height / 2;
        this._leftShoe.touchEnabled = true;
        this._rightShoe.touchEnabled = true;
        this._leftShoe.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.leftShoeDown, this);
        this._leftShoe.addEventListener(egret.TouchEvent.TOUCH_END, this.leftShoeUp, this);
        this._rightShoe.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.rightShoeDown, this);
        this._rightShoe.addEventListener(egret.TouchEvent.TOUCH_END, this.rightShoeUp, this);
        
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchStart, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
    }
    //按下左边轮胎
    private leftShoeDown(e:egret.TouchEvent){
        this._touchStatus1 = true;
        this._distance.x = e.stageX - this._leftShoe.x;
        this._distance.y = e.stageY - this._leftShoe.y;
    } 
    //松开左边轮胎
    private leftShoeUp(e:egret.TouchEvent){
        this._touchStatus1 = false;
    }
    //按下右边轮胎
    private rightShoeDown(e:egret.TouchEvent) {
        this._touchStatus2 = true;
        this._distance.x = e.stageX - this._rightShoe.x;
        this._distance.y = e.stageY - this._rightShoe.y;
    }
    //松开右边轮胎
    private rightShoeUp(e:egret.TouchEvent){
        this._touchStatus2 = false;
    }
    //触摸开始
    private touchStart(e:egret.TouchEvent) {
        var x = e.stageX;
        var y = e.stageY;
        if(this._index === 1){
            this._touchStatus3 = true;
            this._lineShape.graphics.moveTo(x, y);
            this._lineShape.graphics.lineTo(x+1, y);
        }
    }
    //移动
    private touchMove(e:egret.TouchEvent) {
        if(this._index === 0) {
            if(this._touchStatus1) {
                var x = e.stageX - this._distance.x;
                var y = e.stageY - this._distance.y;
                if(x<100) x = 100;
                else if(x >200) x = 200;
                if(y < Const.SHEIGHT/2) y = Const.SHEIGHT/ 2;
                else if(y > Const.SHEIGHT / 2 + 200 ) y = Const.SHEIGHT / 2 + 200;

                this._leftShoe.x = x;
                this._leftShoe.y = y;
            } 
            if(this._touchStatus2){
                this._rightShoe.x = e.stageX - this._distance.x;
                this._rightShoe.y = e.stageY - this._distance.y;
            }
        } else if(this._index === 1 && this._touchStatus3) {
            var x = e.stageX;
            var y = e.stageY;
            this.movePoint(x, y);
        }
        
    }
    //触摸松开
    private touchEnd(e:egret.TouchEvent) {
        
    }
    //确定按钮回调
    private confirmClick():void{
        if(this._index === 0) {
            this.page2End();
        }else if(this._index === 1) {
            this.page3End();
        }
    }
    //重画按钮回调
    private redrawClick():void{
        if(this._index === 1){
            this._lineShape.graphics.clear();
        }
    }
    //第二页结束
    private page2End():void{
        this.btnHide();
        this._leftShoe.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.leftShoeDown, this);
        this._leftShoe.removeEventListener(egret.TouchEvent.TOUCH_END, this.leftShoeUp, this);
        this._rightShoe.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.rightShoeDown, this);
        this._rightShoe.removeEventListener(egret.TouchEvent.TOUCH_END, this.rightShoeUp, this);
        this._touchStatus1 = false;
        this._touchStatus2 = false;
        this.carMove();   
    }
    //第3页结束
    private page3End():void{
        this.btnHide();
        egret.Tween.get(this._car)
        .to({x: Const.SWIDTH, y: Const.SHEIGHT-300}, 2000)
        .call( this.moveToNext, this)
    }
    private btnShow():void{
        this._confirm_btn.visible = true;
        this._redraw_btn.visible = true;
    }
    private btnHide():void {
        this._confirm_btn.visible = false;
        this._redraw_btn.visible = false;
    }
    //汽车移动
    private carMove():void{
        this.shoeMove();
        egret.Tween.get(this._shape)
        .wait(2000).call(this.page3Start, this);
    }
    //轮胎移动
    private shoeMove():void {
        egret.Tween.get(this._leftShoe, {loop: true})
            .to({rotation: 360}, 2000);
        egret.Tween.get(this._rightShoe, {loop: true})
            .to({rotation: 360}, 2000);
    }
    //进入第三页
    private page3Start():void {
        egret.Tween.pauseTweens(this._shape);
        egret.Tween.get(this._car)
            .to({scale: 0.6, x: -100, y :0}, 1000).wait(500)
            .call(this.showSprites, this);
    }
    //出现精灵
    private showSprites():void{
        var sprite = ResourceUtils.createBitmapByName('sprites_jpg');
        this.addChild(sprite);
        sprite.x = Const.SWIDTH + sprite.width;
        sprite.y = Const.SHEIGHT / 2 - sprite.height / 2;
        this._sprites = sprite;
        egret.Tween.get(sprite)
            .to({x: Const.SWIDTH-sprite.width}, 2000)
            .call(this.showDrawLine, this); 
    }
    private showDrawLine() {
        this._index = 1;
        this.btnShow();
        this._lineShape = new egret.Shape();
        this.stage.addChild(this._lineShape);
        this._lineShape.graphics.lineStyle(2, 0x000000);
    }
    private movePoint(x, y):void {
        var shape:egret.Shape = this._lineShape;
        shape.graphics.lineTo(x, y);
    }
    private moveToNext():void{
        this._car.x = -Const.SWIDTH;
        this._lineShape.graphics.clear();
        this.removeChild(this._sprites);
        egret.Tween.get(this._car)
            .wait(200)
            .to({x: 0, y: this._car.y}, 2000)
            .call(this.page4Start, this);
    }
    private page4Start():void{
        this._index = 2;
    }
}