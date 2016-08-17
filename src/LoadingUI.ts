//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class LoadingUI extends egret.Sprite {
    private bar1Url = "resource/assets/loading_bar1.png";
    private bar2Url = "resource/assets/loading_bar2.png";
    private carPngUrl = "resource/assets/car/car.png";
    private carJsonUrl = "resource/assets/car/car.json";
    private _loadingBg:egret.Bitmap;
    private _loadingBar:egret.Bitmap;
    private _mcData:any;
    private _mcTexture:egret.Texture;
    private _count:number = 0;
    public constructor() {
        super();
        this.createView();
    }

    private textField:egret.TextField;

    private createView():void {
        this._count = 0;
        var width = Const.SWIDTH;
        var height = Const.SHEIGHT;

        var ss = new egret.Shape();
        ss.graphics.beginFill(0xe9e3d9);
        ss.graphics.drawRect(0,0,width,height);
        ss.graphics.endFill();
        this.addChild(ss);
        
        var urlLoader:egret.URLLoader = new egret.URLLoader();
        urlLoader.addEventListener(egret.Event.COMPLETE,this.onComplete,this);
        urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        urlLoader.load(new egret.URLRequest(this.bar1Url));

        var urlLoader:egret.URLLoader = new egret.URLLoader();
        urlLoader.addEventListener(egret.Event.COMPLETE,this.onComplete,this);
        urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        urlLoader.load(new egret.URLRequest(this.bar2Url));

        this.load(this.initMovieClip);

        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = height / 2;
        this.textField.textColor = 0xf3382f;
        this.textField.width = width;
        this.textField.height = 100;
        this.textField.textAlign = "center";

        this._loadingBg = new egret.Bitmap();
        this._loadingBar = new egret.Bitmap();
        this.addChild(this._loadingBg);
        this.addChild(this._loadingBar);
        
    }
    private onComplete(e:egret.Event) {
        var urlLoader:egret.URLLoader = <egret.URLLoader>e.target;
        var texture = urlLoader.data;
         if(urlLoader._request.url == this.bar1Url) {
            this._loadingBg.texture = texture;
            this._loadingBg.x = Const.SWIDTH / 2 - this._loadingBg.width / 2;
            this._loadingBg.y = Const.SHEIGHT / 2  + 50;
        }
        else if(urlLoader._request.url == this.bar2Url) {
            this._loadingBar.texture = texture;
            this._loadingBar.x = Const.SWIDTH / 2 - this._loadingBar.width / 2;
            this._loadingBar.y = Const.SHEIGHT / 2  + 50;
            this._loadingBar.scaleX = 0.01;
        }
    }
    public setProgress(current:number, total:number):void {
        var radio = Math.floor(current / total * 100);
        var dt = current / total;
        this._loadingBar.scaleX = dt;
        this.textField.text = `${radio}%`;
    }
    private initMovieClip():void {
        /*** 本示例关键代码段开始 ***/
        var mcDataFactory = new egret.MovieClipDataFactory(this._mcData, this._mcTexture);
        var role:egret.MovieClip = new egret.MovieClip(mcDataFactory.generateMovieClipData("car"));
        this.addChild(role);  
        role.x = Const.SWIDTH / 2 - role.width / 2;
        role.y = Const.SHEIGHT / 2 - role.height / 2 - 200;
        role.frameRate = 12;
        role.gotoAndPlay(0, -1); 
    }
    protected load(callback:Function):void {
        var count:number = 0;
        var self = this;
        
        var check = function () {
            count++;
            if (count == 2) {
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

            this._mcData = JSON.parse(loader.data);
            
            check();
        }, this);
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        var request = new egret.URLRequest("resource/assets/car/car.json");
        loader.load(request);
    }
}
