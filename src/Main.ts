
class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private _audio:MyButton;
    private _audioStatus:boolean = true;
    private _sound:egret.Sound;
    private _channel: egret.SoundChannel;
    private loadingView:LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        Const.SWIDTH = this.stage.stageWidth;
        Const.SHEIGHT = this.stage.stageHeight;
        // this.loadLoading(this.initLoading);
        this.loadLoading(this.initLoading);
        
    }
    private loadLoading(callback:Function):void{
        var count:number = 0;
        var self = this;
        
        var check = function () {
            count++;
            if (count == 4) {
                callback.call(self);
            }
        }
        
        var loader = new egret.URLLoader();
        loader.addEventListener(egret.Event.COMPLETE, function loadOver(e) {
            var loader = e.currentTarget;

            this._mcTexture = loader.data;
            
            check();
        }, this);
        loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        var request = new egret.URLRequest("resource/assets/car/car.png");
        loader.load(request);

        var loader = new egret.URLLoader();
        loader.addEventListener(egret.Event.COMPLETE, function loadOver(e) {
            var loader = e.currentTarget;

            this._mcTexture = loader.data;
            
            check();
        }, this);
        loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        var request = new egret.URLRequest("resource/assets/loadingBar1.png");
        loader.load(request);

        var loader = new egret.URLLoader();
        loader.addEventListener(egret.Event.COMPLETE, function loadOver(e) {
            var loader = e.currentTarget;

            this._mcTexture = loader.data;
            
            check();
        }, this);
        loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        var request = new egret.URLRequest("resource/assets/loadingBar2.png");
        loader.load(request);
        
        var loader = new egret.URLLoader();
        loader.addEventListener(egret.Event.COMPLETE, function loadOver(e) {
            var loader = e.currentTarget;

            this._mcData = JSON.parse(loader.data);
            
            check();
        }, this);
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        var request = new egret.URLRequest("resource/assets/car/car.json");
        loader.load(request);
    }
    private initLoading() {
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        var sound: egret.Sound = this._sound = new egret.Sound();
        //sound 加载完成监听
        sound.addEventListener(egret.Event.COMPLETE, function (e: egret.Event) {
            this.initSound();
        }, this);
        sound.load("resource/assets/bg.mp3");
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }
    private initSound():void{
        this._channel = this._sound.play(0);
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private _shape:egret.Shape; 
    private _touchStatus:boolean = false;  
    private _distance:egret.Point = new egret.Point();
    private _x:Array<number> = [];
    private _y:Array<number> = [];
    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene():void {
        var scene = new MainGame();
        this.addChild(scene);

        this._audio = new MyButton('page1_3_png', 'page1_3_png');
        this.addChild(this._audio);
        this._audio.x = Const.SWIDTH - this._audio.width / 2 - 20;
        this._audio.y = 50;
        this._audio.anchorOffsetX = this._audio.width / 2;
        this._audio.anchorOffsetY = this._audio.height / 2;
        this._audio.setClick(this.audioCallback.bind(this));
        egret.Tween.get(this._audio, {loop: true})
            .to({rotation: 360}, 800);
        
    }

    private audioCallback():void{
        if(this._audioStatus){
            this._audioStatus = false;
            egret.Tween.pauseTweens(this._audio);
            this._channel.stop();
            this._channel = null;
        }else{
            this._audioStatus = true;
            egret.Tween.resumeTweens(this._audio);
             this._channel = this._sound.play(0);
            
        }
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name:string):egret.Bitmap {
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}


