class GameScene extends egret.DisplayObjectContainer{
    private _shape:egret.Shape; 
    private _lineShape:egret.Shape;
    private _shareShape:egret.Shape;
    private _index:number = 2; 
    private _distance:egret.Point = new egret.Point();
    private _x:Array<number> = [];
    private _y:Array<number> = [];
    private _all_X_Y:Array<Array<number>> = [];
    private _all_Y_X:Array<Array<number>> = [];
    private _leftShoe:egret.Bitmap;
    private _rightShoe:egret.Bitmap;
    private _touchStatus:boolean = false;
    private _touchStatus1:boolean = false;
    private _touchStatus2:boolean = false;
    private _touchStatus3:boolean = false;
    private _touchStatus4:boolean = false;
    private _touchStatus5:boolean = false;
    private _isTouch1:boolean = false;
    private _isTouch2:boolean = false;
    private _isCollide:boolean = false;
    private _isTouch3:boolean = false;
    private _confirm_btn:MyButton;
    private _redraw_btn:MyButton;
    private _drawArea:egret.Bitmap;
    private _round:egret.MovieClip;
    private _longMovie1:egret.MovieClip;
    private _longMovie2:egret.MovieClip;
    private _kaMovie1:egret.MovieClip;
    private _kaMovie2:egret.MovieClip;
    private _car:egret.Sprite;
    private _head:egret.Bitmap;
    private _headTitle:egret.Bitmap;
    private _tips:egret.Bitmap;
    private _trafficLight:egret.Bitmap;
    private _threeRound:egret.Bitmap;
    private _navigation:egret.Bitmap;
    private _gas:egret.Bitmap;
    private _milestone:egret.Bitmap;                //里程碑
    private _share:egret.Bitmap;                    //分享图标
    private _dust:egret.MovieClip;                     //烟尘
    private _carAppearPos:egret.Point = new egret.Point();
    private _winWidth:number;
    private _winHeight:number;
    private _input:egret.TextField;
    private _page6Title:egret.Bitmap;
    constructor() {
        super(); 
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    private onAddToStage(event:egret.Event) {
        this.init();
    }
    private init():void{
        this._index = 2;
        var width = Const.SWIDTH / 2 ;
        var height = Const.SHEIGHT / 2 ;
        this._winWidth = width;
        this._winHeight = height;

        var du:egret.Bitmap = ResourceUtils.createBitmapByName('page1_4_png');
        this.addChild(du);
        du.x = width - du.width / 2;
        du.y = 25;

        var head:egret.Bitmap = ResourceUtils.createBitmapByName('page2_2_png');
        this.addChild(head);
        head.x = 10;
        head.y = 210 - head.height / 2;
        this._head = head;

        var headTitle:egret.Bitmap = ResourceUtils.createBitmapByName('page2_1_png');
        this.addChild(headTitle);
        headTitle.anchorOffsetX = 0;
        headTitle.anchorOffsetY = headTitle.height / 2;
        headTitle.x = 120;
        headTitle.y = 230;
        this._headTitle = headTitle;
        this._headTitle.scaleX = 0.01;
        this._headTitle.scaleY = 0.01;
        egret.Tween.get(this._headTitle)
            .to({scaleX: 1, scaleY:1}, 400, egret.Ease.backInOut);

        var drawArea = ResourceUtils.createBitmapByName('page2_4_png');
        this.addChild(drawArea);
        drawArea.x = width - drawArea.width / 2;
        drawArea.y = height - drawArea.height / 2 + 75;
        drawArea.touchEnabled = true;
        this._drawArea = drawArea;

        this._carAppearPos.x = width - drawArea.width / 2;
        this._carAppearPos.y = height - drawArea.height / 2 + 75;

        this._car = new egret.Sprite();
        this.addChildAt(this._car, 999);
        this._car.width = Const.SWIDTH;
        this._car.height = Const.SHEIGHT;
        

        var confirm_btn:MyButton = new MyButton("btn2_png", "btn2_png");
        this.addChild(confirm_btn);
        confirm_btn.x = width - confirm_btn.width / 2 - 120;
        confirm_btn.y = Const.SHEIGHT - 200;
        confirm_btn.setClick(this.confirmClick.bind(this));

        var redraw_btn:MyButton = new MyButton("btn3_png", "btn3_png");
        this.addChild(redraw_btn);
        redraw_btn.x = width  - redraw_btn.width / 2 + 120;
        redraw_btn.y = Const.SHEIGHT - 200;
        redraw_btn.setClick(this.redrawClick.bind(this));
        this._confirm_btn = confirm_btn;
        this._redraw_btn = redraw_btn;

        var data = RES.getRes("round_json");//JSON  
        var txtr:egret.Texture = RES.getRes("round_png");//Texture  
        var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
        var mc:egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData( "round" ) );
        this.addChild(mc);  
        mc.x = width- mc.width / 2;
        mc.y = height + 172;
        this._round = mc;

        var tips:egret.Bitmap = ResourceUtils.createBitmapByName('page2_3_png');
        this.addChild(tips);
        tips.x = width - tips.width / 2;
        tips.y = height + 270;
        this._tips = tips;

        this._shape = new egret.Shape();
        this._car.addChild(this._shape);
        this._shape.graphics.lineStyle(5, 0x777574);
        

        drawArea.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.drawStart, this);
        drawArea.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.drawMove, this);
        drawArea.addEventListener(egret.TouchEvent.TOUCH_END, this.drawEnd, this);

        var leftShoe = ResourceUtils.createBitmapByName("page2_5_png");
        this._car.addChild(leftShoe);
        leftShoe.x = width - 130;
        leftShoe.y = height - leftShoe.height / 2 + 202;
        leftShoe.anchorOffsetX = leftShoe.width / 2;
        leftShoe.anchorOffsetY = leftShoe.height / 2;
        this._leftShoe = leftShoe;

        var rightShoe = ResourceUtils.createBitmapByName("page2_6_png");
        this._car.addChild(rightShoe);
        rightShoe.x = width + 130;
        rightShoe.y = height - rightShoe.height / 2  + 202;
        rightShoe.anchorOffsetX = rightShoe.width / 2;
        rightShoe.anchorOffsetY = rightShoe.height / 2;
        this._rightShoe = rightShoe;
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
    private confirmClick():void{
        if(this._index === 2) {
            if(this._isTouch1){
                this.createCar();
            }
        } else if(this._index === 3 && this._isTouch2) {
           this.page3End();
        } else if(this._index === 4 && this._isCollide) {
            this.page4End();
        } else if(this._index === 5 && this._isTouch3) {
            this.page5End();
        }else if(this._index === 6) {
            if(this._input.text != "") {
                this.page6Hide();
                this.page7();
            }
        }
    }
    private redrawClick():void{
        if(this._index === 2){
            this._shape.graphics.clear();
            this._all_X_Y = [];
            this._all_Y_X = [];
            this._shape.graphics.lineStyle(2, 0x000000);
        } else if(this._index === 3 || this._index === 5) {
            this._lineShape.graphics.clear();
            this._lineShape.graphics.lineStyle(2, 0x000000);
        }
    }
    private drawStart(e:egret.TouchEvent) {
        this._touchStatus = true;
        var x = e.stageX;
        var y = e.stageY;
        this._shape.graphics.moveTo(x, y);
        this._shape.graphics.lineTo(x+1, y);
        
    }
    private drawMove(e:egret.TouchEvent) {
        if(this._touchStatus1 || this._touchStatus2) return;
        if(this._touchStatus){
            this._isTouch1 = true;
            var x = e.stageX;
            var y = e.stageY;
            this.movePoint(x, y, this._shape);
        }
    }
    private drawEnd(e:egret.TouchEvent) {
        this._all_X_Y.push(this._x);
        this._all_Y_X.push(this._y);
        this._touchStatus = false;
        this._x = [];
        this._y = [];
    }
    private movePoint(x, y, target:egret.Shape):void{
        var shape:egret.Shape = target;
        shape.graphics.lineTo(x, y);
    }
    //按下左边轮胎
    private leftShoeDown(e:egret.TouchEvent){
        this._touchStatus1 = true;
        this._distance.x = e.stageX - this._leftShoe.x;
    } 
    //松开左边轮胎
    private leftShoeUp(e:egret.TouchEvent){
        this._touchStatus1 = false;
    }
    //按下右边轮胎
    private rightShoeDown(e:egret.TouchEvent) {
        this._touchStatus2 = true;
        this._distance.x = e.stageX - this._rightShoe.x;
    }
    //松开右边轮胎
    private rightShoeUp(e:egret.TouchEvent){
        this._touchStatus2 = false;
    }
    //触摸开始
    private touchStart(e:egret.TouchEvent) {
        var x = e.stageX;
        var y = e.stageY;
        if(this._index === 3){
            this._touchStatus3 = true;
            this._touchStatus1 = false;
            this._touchStatus2 = false;
            this._lineShape.graphics.moveTo(x, y);
            this._lineShape.graphics.lineTo(x+1, y);
        }else if(this._index === 5) {
            this._touchStatus5 = true;
            this._lineShape.graphics.moveTo(x, y);
            this._lineShape.graphics.lineTo(x+1, y);
        }
    }
    //移动
    private touchMove(e:egret.TouchEvent) {
        if(this._index === 2) {
            var minX = Const.SWIDTH / 2 - this._drawArea.width / 2 + this._leftShoe.width / 2; 
            var maxX = Const.SWIDTH / 2 + this._drawArea.width / 2 - this._leftShoe.width / 2; 
            var x = e.stageX - this._distance.x;
            if(x <= minX) x = minX;
            else if(x >= maxX) x = maxX;
            if(this._touchStatus1) {
                this._leftShoe.x = x;
            } else if(this._touchStatus2){
                this._rightShoe.x = x;
            }
        } else if(this._index === 3 && this._touchStatus3) {
            var x = e.stageX;
            var y = e.stageY;
            this.movePoint(x, y, this._lineShape);  
            this._isTouch2 = true;
        } else if(this._index === 4 && this._touchStatus4 && !this._isCollide) {
            var x = e.stageX - this._distance.x;
            var y = e.stageY - this._distance.y;
            this._navigation.x = x;
            this._navigation.y = y;
        }else if(this._index === 5 && this._touchStatus5) {
            var x = e.stageX;
            var y = e.stageY;
            this.movePoint(x, y, this._lineShape); 
            this._isTouch3 = true; 
        }
        
    }
    //触摸松开
    private touchEnd(e:egret.TouchEvent) {
        if(this._index === 3){
            this._touchStatus3 = false;
        }else if(this._index === 7) {
            this._share.visible = false;
            this._shareShape.graphics.clear();
        }
    }
    private createCar():void{
        this._drawArea.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.drawStart, this);
        this._drawArea.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.drawMove, this);
        this._drawArea.removeEventListener(egret.TouchEvent.TOUCH_END, this.drawEnd, this);      
        this._leftShoe.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.leftShoeDown, this);
        this._leftShoe.removeEventListener(egret.TouchEvent.TOUCH_END, this.leftShoeUp, this);
        this._rightShoe.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.rightShoeDown, this);
        this._rightShoe.removeEventListener(egret.TouchEvent.TOUCH_END, this.rightShoeUp, this);
        this._leftShoe.touchEnabled = false;
        this._rightShoe.touchEnabled = false;
        this.btnHide();
        this.titleHide();
        this.removeChild(this._drawArea);
        this.removeChild(this._tips );

        var data = RES.getRes("dust_json");//JSON  
        var txtr:egret.Texture = RES.getRes("dust_png");//Texture  
        var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
        var mc:egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData( "dust" ) );
        this._car.addChild(mc);  
        mc.x = this._winWidth - 400;
        mc.y = this._winHeight / 2 + 420;
        mc.scaleX = 2;
        mc.scaleY = 2;
        mc.frameRate = 15;
        mc.gotoAndPlay(0, -1); 
        this._dust = mc;

        var x = Const.SWIDTH * 0.15;
        var y = Const.SHEIGHT * 0.2 - 5;
        this._car.x = x;
        this._car.y = y;
        this._car.scaleX = 0.7;
        this._car.scaleY = 0.7;
        egret.Tween.get(this._car)
        .wait(100)
        .call(this.carMove, this);
        this._round.gotoAndPlay(0, -1);
        
    }
    private carMove():void{
        egret.Tween.get(this._leftShoe, {loop: true}).to({rotation:360}, 1500);
        egret.Tween.get(this._rightShoe, {loop: true}).to({rotation: 360}, 1500);
        egret.Tween.get(this._car).wait(1500).call(this.fastMove, this);
        egret.Tween.get(this._shape, {loop: true})
            .to({y: this._shape.y - 4}, 200)
            .to({y: this._shape.y + 4}, 200);
    }
    private fastMove():void{
        egret.Tween.get(this._car)
            .to({x: Const.SWIDTH}, 1500, egret.Ease.sineIn)
            .wait(500)
            .call(this.page3, this);
        egret.Tween.get(this._leftShoe, {loop: true})
            .to({rotation: 360}, 800);
        egret.Tween.get(this._rightShoe, {loop: true})
            .to({rotation: 360}, 800);
    }
    private page3():void{
        this.carAppear();
        egret.Tween.get(this._car)
            .to({x: -this._carAppearPos.x + 50}, 1500, egret.Ease.sineOut)
            .call(this.page3Start, this);
        var light = ResourceUtils.createBitmapByName('page3_2_png');
        this.addChild(light);
        light.x = Const.SWIDTH;
        light.y = Const.SHEIGHT/2 - 150;
        this._trafficLight = light;
        var x = Const.SWIDTH - light.width - 60;
        egret.Tween.get(light)
            .to({x: x}, 1500, egret.Ease.sineOut);
    }
    private page3Start():void{
        this._dust.visible = false;
        
        this._round.stop();
        egret.Tween.pauseTweens(this._shape);
        egret.Tween.pauseTweens(this._leftShoe);
        egret.Tween.pauseTweens(this._rightShoe);
        this._lineShape = new egret.Shape();
        this.addChild(this._lineShape);
        this._lineShape.graphics.lineStyle(2, 0x000000);
        this.addLongAnimate();
    }
    //增加火龙动画
    private addLongAnimate():void{
        this._trafficLight.texture = RES.getRes("page3_3_png");
        var data = RES.getRes("long_json");//JSON  
        var txtr:egret.Texture = RES.getRes("long_png");//Texture  
        var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
        var mc:egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData( "long" ) );
        this.addChild(mc);  
        mc.x = this._winWidth - mc.width / 2 - 10 ;
        mc.y = this._winHeight - 133;
        mc.frameRate = 10;
        mc.gotoAndPlay(0); 
        egret.Tween.get(this._car).wait(900).call(this.addKaAnimate, this);
        this._longMovie1 = mc;
        this._longMovie1.addEventListener(egret.Event.COMPLETE, this.longAnimateEnd, this);
    }
    private longAnimateEnd(event:egret.Event):void{
        this.removeChild(this._longMovie1);
        var data = RES.getRes("longnext_json");//JSON  
        var txtr:egret.Texture = RES.getRes("longnext_png");//Texture  
        var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
        var mc:egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData( "longnext" ) );
        this.addChild(mc);  
        mc.x = this._winWidth - 30 ;
        mc.y = this._winHeight - 133;
        mc.frameRate = 10;
        mc.gotoAndPlay(0, -1);
        this._longMovie2 = mc;
    }
    //增加比卡丘动画
    private addKaAnimate():void{
        this._trafficLight.texture = RES.getRes("page3_4_png");
        var data = RES.getRes("ka_json");//JSON  
        var txtr:egret.Texture = RES.getRes("ka_png");//Texture  
        var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
        var mc:egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData( "ka" ) );
        this.addChild(mc);  
        mc.x = this._winWidth*2 - mc.width - 145;
        mc.y = this._winHeight - 130;
        mc.frameRate = 10;
        mc.gotoAndPlay(0); 
        this._kaMovie1 = mc;
        this._kaMovie1.addEventListener(egret.Event.COMPLETE, this.kaAnimateEnd, this);
    }
    private kaAnimateEnd(event:egret.Event):void{
        this.removeChild(this._kaMovie1);
        var data = RES.getRes("kanext_json");//JSON  
        var txtr:egret.Texture = RES.getRes("kanext_png");//Texture  
        var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
        var mc:egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData( "kanext" ) );
        this.addChild(mc);  
        mc.x = this._winWidth*2 - 180;
        mc.y = this._winHeight - 130;
        mc.frameRate = 6;
        mc.gotoAndPlay(0, -1); 
        this._kaMovie2 = mc;
        this.page3Animate();
    }
    private page3Animate():void{
        this._index = 3;
        this._headTitle.texture = RES.getRes("page3_1_png");
        this.titleShow();
        this.btnShow();
    }
    private page3End():void{
        this.btnHide();
        this.titleHide();
        var y = this._car.y;
        this._dust.visible = true;
        egret.Tween.get(this._leftShoe, {loop: true}).to({rotation: 360}, 1500);
        egret.Tween.get(this._rightShoe, {loop: true}).to({rotation: 360}, 1500);
        egret.Tween.resumeTweens(this._shape);
        egret.Tween.get(this._car)
            .to({rotation: 6, x: -50, y: y -10}, 1000)
            .to({rotation: 6, x: Const.SWIDTH, y: y + 250}, 2200, egret.Ease.sineIn)
            .wait(500)
            .call(this.page4, this);
    }
    private page4():void{
        this._lineShape.graphics.clear();
        this.removeChild(this._longMovie2);
        this.removeChild(this._kaMovie2);
        this.removeChild(this._trafficLight);
        this._car.x  = - Const.SWIDTH*0.5;
        this._car.y = Const.SHEIGHT *0.2 -5;
        this._car.rotation = 0;
        this._threeRound = ResourceUtils.createBitmapByName('page4_2_png');
        this.addChild(this._threeRound);
        this._threeRound.x = 0;
        this._threeRound.y = Const.SHEIGHT / 2 - this._threeRound.height + 310;

        egret.Tween.get(this._car)
            .to({x: -this._carAppearPos.x + 50 }, 2000, egret.Ease.sineOut)
            .call(this.page4Start, this);
    }
    private page4Start():void{
        this._dust.visible = false;
        this._index = 4;
        this.pauseTween();
        this._headTitle.texture = RES.getRes("page4_1_png");
        this.titleShow();
        this.btnShow();
        this._navigation = ResourceUtils.createBitmapByName('page4_3_png');
        this.addChild(this._navigation);
        this._navigation.anchorOffsetX = this._navigation.width / 2;
        this._navigation.anchorOffsetY = this._navigation.height / 2;
        this._navigation.x = Const.SWIDTH - 170;
        this._navigation.y = 230;
        this._navigation.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.navDown, this);
        this._navigation.addEventListener(egret.TouchEvent.TOUCH_END, this.navUp, this);
        this._navigation.touchEnabled = true;
        this._navigation.visible = false;
        egret.Tween.get(this._navigation, {loop: true})
            .wait(1000).call(this.showNav, this);
    }
    private showNav():void{
        this._navigation.visible = true;
        egret.Tween.get(this._navigation, {loop: true})
            .to({scaleX: 1.2, scaleY: 0.8}, 300)
            .to({scaleX: 1, scaleY: 1}, 300).wait(100);
    }
    private navDown(e:egret.TouchEvent){
        this._touchStatus4 = true;
        this._distance.x = e.stageX - this._navigation.x;
        this._distance.y = e.stageY - this._navigation.y;
    }
    private navUp(e:egret.TouchEvent){
        this._touchStatus4 = false;
        var x = e.stageX;
        var y = e.stageY;
        var minX = 100;
        var maxX = 350;
        var minY = Const.SHEIGHT / 2 - 100;
        var maxY = Const.SHEIGHT / 2 + 250;
        if(x >= minX && x <= minY && y >= minY && y<= maxY){
            var xx = (this._rightShoe.x - this._leftShoe.x / 2) * 0.7 + this._car.x + 170;
            egret.Tween.pauseTweens(this._navigation);
            this.removeChild(this._navigation);
            this._navigation = ResourceUtils.createBitmapByName('page4_3_png');
            this._car.addChild(this._navigation);
            this._navigation.scaleX = 1.428;
            this._navigation.scaleY = 1.428;
            this._navigation.anchorOffsetX = this._navigation.width / 2;
            this._navigation.anchorOffsetY = this._navigation.height / 2;
            this._navigation.x = xx;
            this._navigation.y = this._rightShoe.y - 200;
            egret.Tween.get(this._navigation, {loop: true})
                .to({scaleX: 1.6, scaleY: 1.3}, 300)
                .to({scaleX: 1.428, scaleY: 1.428}, 300).wait(100);
            this._isCollide = true;
        }else{
            this._navigation.x = Const.SWIDTH - 170;
            this._navigation.y = 230;
        }
    }
    private page4End():void{
        this._dust.visible = true;
        this._navigation.touchEnabled = false;
        this._navigation.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.navDown, this);
        this._navigation.removeEventListener(egret.TouchEvent.TOUCH_END, this.navUp, this);
        this.titleHide();
        this.btnHide();
        var y = this._car.y;
        egret.Tween.get(this._leftShoe, {loop: true}).to({rotation: 360}, 1500);
        egret.Tween.get(this._rightShoe, {loop: true}).to({rotation: 360}, 1500);
        egret.Tween.get(this._car)
            .to({x: 90}, 500)
            .to({rotation: -45, x: -40, y: y + 200}, 1500) 
            .to({rotation:-25, x: 500, y: y - 240}, 1000)
            .call(this.page5, this);
        egret.Tween.get(this._navigation)
            .to({rotation: -30}, 300)
            .to({rotation: -28}, 300)
            .to({rotation: -29}, 300)
            .to({rotation: -28}, 300)
            .to({rotation: -30}, 300);
        egret.Tween.resumeTweens(this._shape);
    }
    private page5():void{
        this.removeChild(this._threeRound);
        egret.Tween.get(this._navigation)
            .to({rotation: -15}, 500)
            .wait(1500)
            .to({rotation: 0}, 50)
            .to({rotation: 8}, 50)
            .to({rotation: 0}, 50);
        this.carAppear();
        egret.Tween.get(this._car)
            .to({x: -this._carAppearPos.x + 30}, 2000, egret.Ease.sineOut)
            .to({x: -this._carAppearPos.x + 50}, 500, egret.Ease.sineOut)
            .to({x: -this._carAppearPos.x + 70}, 500, egret.Ease.sineOut)
            .call(this.page5Start, this);
        egret.Tween.get(this._leftShoe, {loop: true})
            .wait(2000)
            .to({rotation: 360}, 2000);
        egret.Tween.get(this._rightShoe, {loop: true})
            .wait(2000)
            .to({rotation: 360}, 2000);
    }
    private page5Start():void{
        this._dust.visible = false;
        this.pauseTween();
        this._index = 5;
        this._headTitle.texture = RES.getRes("page5_1_png");
        this.titleShow();
        this.btnShow();
        this._lineShape.graphics.lineStyle(2, 0x000000);
    }
    private page5End():void{
        egret.Tween.get(this._lineShape)
            .to({x: 0, y: -50}, 200)
            .to({x: -30, y: -25}, 200)
            .to({x:-60, y:0}, 200)
            .to({x: -30, y: 25}, 200)
            .to({x: 0, y: 50}, 200)
            .to({x: 30, y: 25}, 200)
            .to({x: 60, y:0}, 200)
            .to({x: 30, y: -25}, 200)
            .to({x: 0, y: -50}, 200)
            .to({x: -30, y: -25}, 200)
            .to({x:-60, y:0}, 200)
            .to({x: -30, y: 25},200)
            .to({x: 0, y: 50}, 200)
            .call(this.page5Animate, this);
    }
    private page5Animate():void{
        this.titleHide();
        this._lineShape.graphics.clear();
        this._gas = ResourceUtils.createBitmapByName('page5_3_png');
        this.addChild(this._gas);
        this._gas.x = Const.SWIDTH - this._gas.width;
        this._gas.y =  Const.SHEIGHT / 2 - this._gas.height / 2 + 50;
        this._gas.alpha = 0;
        egret.Tween.get(this._gas)
        .to({alpha: 1}, 800);
        egret.Tween.get(this._car)
        .wait(1500)
        .call(() => {
            this._dust.visible = true;
            egret.Tween.resumeTweens(this._shape);
            egret.Tween.resumeTweens(this._leftShoe);
            egret.Tween.resumeTweens(this._rightShoe);
        }, this)
        .to({x: Const.SWIDTH - 100}, 1500, egret.Ease.sineIn)
        .call(() => {
            this._dust.visible = false;
            egret.Tween.resumeTweens(this._shape);
            egret.Tween.resumeTweens(this._leftShoe);
            egret.Tween.resumeTweens(this._rightShoe);
        })
        .wait(1000)
        .call(this.page6, this);
    }
    private page6():void{
        this.removeChild(this._gas);
        this.removeChild(this._lineShape);
        this._car.x  = - Const.SWIDTH*0.5;
        this._car.y = Const.SHEIGHT *0.2 -5;
        this._car.rotation = 0;
        egret.Tween.get(this._car)
            .to({x: -this._carAppearPos.x + 50}, 1500, egret.Ease.sineOut);
        this.page6Start();
        egret.Tween.resumeTweens(this._shape);
        egret.Tween.resumeTweens(this._leftShoe);
        egret.Tween.resumeTweens(this._rightShoe);
    }
    private page6Start():void{
        this._dust.visible = false;
        this._index = 6;
        this._milestone = ResourceUtils.createBitmapByName('page6_2_png');
        this.addChild(this._milestone);
        this._milestone.x = Const.SWIDTH;
        this._milestone.y = Const.SHEIGHT / 2 - this._milestone.height / 2 + 60;

        this._page6Title = ResourceUtils.createBitmapByName('page6_3_png');
        this.addChild(this._page6Title);
        this._page6Title.x = Const.SWIDTH - this._milestone.width + 90;
        this._page6Title.y = Const.SHEIGHT / 2 + 30;
        this._page6Title.visible = false;

        
        var input:egret.TextField = new egret.TextField();
        input.text = "";
        this.addChild(input);
        input.x = Const.SWIDTH;
        input.y = Const.SHEIGHT / 2;
        this._input = input;
        input.width = 180;
        input.height = 100;
        input.size = 22;
        input.textColor = 0x292929;
        input.verticalAlign = egret.VerticalAlign.MIDDLE;
        input.type = egret.TextFieldType.INPUT;
        input.maxChars = 6;
        input.addEventListener(egret.FocusEvent.FOCUS_IN, function (e:egret.FocusEvent) {
            this._page6Title.visible = false;
        }, this);
        input.addEventListener(egret.FocusEvent.FOCUS_OUT, function (e:egret.FocusEvent) {
            if(input.text == "") {
                this._page6Title.visible = true;
            }
        }, this);

        egret.Tween.get(this._milestone)
            .to({x: Const.SWIDTH - this._milestone.width - 30}, 1500, egret.Ease.sineOut)
            .call(this.page6Show, this);
        egret.Tween.get(this._input)
            .to({x: Const.SWIDTH - this._milestone.width + 90}, 1500, egret.Ease.sineOut)
            .call(this.page6Show, this);
    }
    private page6Show():void{
        this.pauseTween();
        this._page6Title.visible = true;
        this._headTitle.texture = RES.getRes("page6_1_png");
        this.titleShow();
        this.btnShow();
    }
    private page6Hide():void{
        this.btnHide();
        this.titleHide();
        this.removeChild(this._milestone);
        this._input.visible = false;
        this._navigation.visible = false;
    }
    private page7():void{
        this._dust.visible = true;
        this._index = 7;
        var width = Const.SWIDTH;
        var height = Const.SHEIGHT;
        var w = width / 2;
        this._car.x = 100;
        console.log(this._car.y);

        this._car.y = this._car.y + 135;

        egret.Tween.resumeTweens(this._shape);
        egret.Tween.resumeTweens(this._leftShoe);
        egret.Tween.resumeTweens(this._rightShoe);

        var gold:egret.Bitmap = ResourceUtils.createBitmapByName('page7_1_png');
        this.addChild(gold);
        gold.x = w - gold.width / 2;
        gold.y = -gold.height;
        egret.Tween.get(gold)
            .to({y: -10}, 500, egret.Ease.backOut)
            .call(this.page7Title, this);

        
        this._round.y = Const.SHEIGHT - 360;
    }
    private page7Title():void{
        var w = this._winWidth;
        var h = 360;
        var title2:egret.Bitmap = ResourceUtils.createBitmapByName('page7_6_png');
        this.addChild(title2);
        title2.x = w - title2.width / 2;
        title2.y = 370;

        var label:egret.TextField = new egret.TextField();
        this.addChild(label);
        label.width = 120;
        label.x = Const.SWIDTH - 350;
        label.y = 530;
        label.textColor = 0xf3382f;
        label.size = 20;
        label.verticalAlign = egret.VerticalAlign.MIDDLE;
        label.text = this._input.text;

        var title3:egret.Bitmap = ResourceUtils.createBitmapByName('page7_4_png');
        this.addChild(title3);
        title3.x = w;
        title3.y = title2.height + 440;
        title3.scaleX = 0.01;
        title3.scaleY = 0.01;
        title3.anchorOffsetX = title3.width / 2;
        title3.anchorOffsetY = title3.height / 2;

        var title1:egret.Bitmap = ResourceUtils.createBitmapByName('page7_5_png');
        this.addChild(title1);
        title1.x = w;
        title1.y = Const.SHEIGHT - 280;
        title1.scaleX = 0.01;
        title1.scaleX = 0.01;
        title1.anchorOffsetX = title1.width / 2;
        title1.anchorOffsetY = title1.height / 2;

        egret.Tween.get(title3)
            .wait(200)
            .to({scaleX: 1.1, scaleY: 1.1}, 200)
            .to({scaleX: 1, scaleY: 1}, 200);
        egret.Tween.get(title1)
            .wait(600)
            .to({scaleX: 1.1, scaleY:1.1}, 200)
            .to({scaleX: 1, scaleY:1}, 200)
            .call(this.page7Btn, this);
    }  
    private page7Btn():void{
        var w = this._winWidth;
        var outlineBtn:MyButton = new MyButton("page7_2_png", "page7_2_png");
        this.addChild(outlineBtn);
        outlineBtn.x =  w - outlineBtn.width / 2;
        outlineBtn.y = Const.SHEIGHT - outlineBtn.height / 2 - 180; 
        outlineBtn.setClick(this.outlineCallback.bind(this));

        var shareBtn:MyButton = new MyButton("page7_3_png", "page7_3_png");
        this.addChild(shareBtn);
        shareBtn.x = w - shareBtn.width / 2;
        shareBtn.y = Const.SHEIGHT  - shareBtn.height / 2  - 70;
        shareBtn.setClick(this.shareCallback.bind(this)); 

        this._shareShape = new egret.Shape();
        this.addChild(this._shareShape);

        this._share = ResourceUtils.createBitmapByName('page7_7_png');
        this.addChild(this._share);
        this._share.x = Const.SWIDTH - this._share.width;
        this._share.y = 0;
        this._share.visible = false;
    }
    private outlineCallback():void{
        alert('领取成功！');
    }
    private shareCallback():void{
        this._shareShape.graphics.beginFill(0x000000);
        this._shareShape.graphics.drawRect(0, 0, Const.SWIDTH, Const.SHEIGHT);
        this._shareShape.graphics.endFill();
        this._shareShape.x = 0;
        this._shareShape.y = 0;
        this._shareShape.alpha = .6;
        this._share.visible = true;
    }
    private carAppear():void{
        this._car.x  = - Const.SWIDTH*0.5;
        this._car.y = Const.SHEIGHT *0.2 -5;
        this._car.rotation = 0;
    }
    private pauseTween():void{
        egret.Tween.pauseTweens(this._shape);
        egret.Tween.pauseTweens(this._leftShoe);
        egret.Tween.pauseTweens(this._rightShoe);
    }
    private titleHide() {
        this._head.visible = false;
        this._headTitle.visible = false;
    }
    private titleShow(){
        this._headTitle.scaleX = 0.01;
        this._headTitle.scaleY = 0.01;
        this._head.visible = true;
        this._headTitle.visible = true;
        egret.Tween.get(this._headTitle)
            .wait(100)
            .to({scaleX: 1, scaleY:1}, 400, egret.Ease.backInOut);
    }
    private btnShow():void{
        this._confirm_btn.visible = true;
        this._redraw_btn.visible = true;
    }
    private btnHide():void {
        this._confirm_btn.visible = false;
        this._redraw_btn.visible = false;
    }
}