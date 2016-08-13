class PageScene1 extends egret.Sprite{
    private _shape:egret.Shape; 
    private _touchStatus:boolean = false;  
    private _distance:egret.Point = new egret.Point();
    private _x:Array<number> = [];
    private _y:Array<number> = [];
    private _all_X_Y:Array<Array<number>> = [];
    private _all_Y_X:Array<Array<number>> = [];
    constructor() {
        super();
        this.init();
    }
    private init():void{
        
        var drawArea = ResourceUtils.createBitmapByName('page2_4_png');
        this.addChild(drawArea);
        drawArea.x = Const.SWIDTH / 2 - drawArea.width / 2;
        drawArea.y = Const.SHEIGHT / 2 - drawArea.height / 2;
        drawArea.touchEnabled = true;

        var confirm_btn:MyButton = new MyButton("btn2_png", "btn2_png");
        this.addChild(confirm_btn);
        confirm_btn.x = Const.SWIDTH /2 - 150;
        confirm_btn.y = Const.SHEIGHT - 120;
        confirm_btn.setClick(this.confirmClick.bind(this));

        var redraw_btn:MyButton = new MyButton("btn3_png", "btn3_png");
        this.addChild(redraw_btn);
        redraw_btn.x = Const.SWIDTH/2 + 100;
        redraw_btn.y = Const.SHEIGHT - 120;
        redraw_btn.setClick(this.redrawClick.bind(this));

        this._shape = new egret.Shape();
        this.addChild(this._shape);
        this._shape.graphics.lineStyle(2, 0x000000);

        drawArea.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchStart, this);
        drawArea.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        drawArea.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);

    }
    private confirmClick():void{
        if(this._all_X_Y.length> 0){
            Const.ALL_X_Y = this._all_X_Y;
            Const.ALL_Y_X = this._all_Y_X;
            egret.setTimeout(function(){
                MainGame.game.nextScene();
            }, this, 200);
        }
    }
    private redrawClick():void{
        this._shape.graphics.clear();
        this._all_X_Y = [];
        this._all_Y_X = [];
        this._shape.graphics.lineStyle(2, 0x000000);
    }
    private touchStart(e:egret.TouchEvent) {
        this._touchStatus = true;
        var x = e.stageX;
        var y = e.stageY;
        this._shape.graphics.moveTo(x, y);
        this._shape.graphics.lineTo(x+1, y);
        
    }
    private touchMove(e:egret.TouchEvent) {
        if(this._touchStatus){
            var x = e.stageX;
            var y = e.stageY;
            this.movePoint(x, y);
        }
    }
    private touchEnd(e:egret.TouchEvent) {
        this._all_X_Y.push(this._x);
        this._all_Y_X.push(this._y);
        this._touchStatus = false;
        this._x = [];
        this._y = [];
    }
    private movePoint(x, y):void {
        this._x.push(x);
        this._y.push(y);
        var shape:egret.Shape = this._shape;
        shape.graphics.lineTo(x, y);
    }
}