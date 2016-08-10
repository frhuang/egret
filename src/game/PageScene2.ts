class PageScene2 extends egret.Sprite{
    constructor() {
        super();
        this.init();
    }
    private init():void{
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
        
        var shape = new egret.Shape();
        this.addChild(shape);
        shape.graphics.lineStyle(2, 0x000000);
        var len1 = Const.ALL_X_Y.length;
        for(var i=0; i < len1; i++) {
            var temp_x = [],
                temp_y = [];
                temp_x = Const.ALL_X_Y[i];
                temp_y = Const.ALL_Y_X[i];
                shape.graphics.moveTo[temp_x[0]+1, temp_y[0]];
                var len2 = temp_x.length;
                for(var j=0; j < len2 ; j++) {
                    shape.graphics.lineTo(temp_x[j], temp_y[j]);
                }
        }
        egret.Tween.get( shape, { loop:true} ).to( {x:10, y:20}, 500 );
    }
    private confirmClick():void{
        alert('confirm');
    }
    private redrawClick():void{
        alert('redraw');
    }
}