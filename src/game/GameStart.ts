class GameStart extends egret.Sprite{
    constructor() {
        super();
        this.init();
    }
    private init():void{
        var start_btn:MyButton = new MyButton("btn1_png", "btn1_png");
        this.addChild(start_btn);
        start_btn.x = Const.SWIDTH /2 - start_btn.width/2;
        start_btn.y = 120;
        start_btn.setClick(this.showPage2View.bind(this));
    }

    private showPage2View(): void{
        if(this.parent) this.parent.removeChild(this);
        MainGame.game.start();
    }
}