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
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        _super.call(this);
        this.bar1Url = "resource/assets/loadingBar1.png";
        this.bar2Url = "resource/assets/loadingBar2.png";
        this.carPngUrl = "resource/assets/car/car.png";
        this.carJsonUrl = "resource/assets/car/car.json";
        this._count = 0;
        this.createView();
    }
    var d = __define,c=LoadingUI,p=c.prototype;
    p.createView = function () {
        this._count = 0;
        var urlLoader = new egret.URLLoader();
        urlLoader.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
        urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        urlLoader.load(new egret.URLRequest(this.bar1Url));
        var urlLoader = new egret.URLLoader();
        urlLoader.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
        urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        urlLoader.load(new egret.URLRequest(this.bar2Url));
        // var urlLoader:egret.URLLoader = new egret.URLLoader();
        // urlLoader.addEventListener(egret.Event.COMPLETE,this.onComplete,this);
        // urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        // urlLoader.load(new egret.URLRequest(this.carPngUrl));
        // var urlLoader:egret.URLLoader = new egret.URLLoader();
        // urlLoader.addEventListener(egret.Event.COMPLETE,this.onComplete,this);
        // urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        // urlLoader.load(new egret.URLRequest(this.carJsonUrl));
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = Const.SHEIGHT / 2;
        this.textField.textColor = 0xf3382f;
        this.textField.width = 750;
        this.textField.height = 100;
        this.textField.textAlign = "center";
        this._loadingBg = new egret.Bitmap();
        this._loadingBar = new egret.Bitmap();
        this.addChild(this._loadingBg);
        this.addChild(this._loadingBar);
        // this._data = RES.getRes(this.carJsonUrl);
        // this._texture = RES.getRes(this.carPngUrl);
        // var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( this._data, this._texture );
        // var mc:egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData("car") );
        // this.addChild(mc);  
        // mc.x = Const.SWIDTH - mc.width / 2;
        // mc.y = Const.SHEIGHT / 2;
        // mc.frameRate = 10;
        // mc.gotoAndPlay(0, -1); 
    };
    p.onComplete = function (e) {
        var urlLoader = e.target;
        var texture = urlLoader.data;
        if (urlLoader._request.url == this.bar1Url) {
            this._loadingBg.texture = texture;
            this._loadingBg.x = Const.SWIDTH / 2 - this._loadingBg.width / 2;
            this._loadingBg.y = Const.SHEIGHT / 2 + 50;
        }
        else if (urlLoader._request.url == this.bar2Url) {
            this._loadingBar.texture = texture;
            this._loadingBar.x = Const.SWIDTH / 2 - this._loadingBar.width / 2;
            this._loadingBar.y = Const.SHEIGHT / 2 + 50;
            this._loadingBar.scaleX = 0.01;
        }
        else if (urlLoader._request.url == this.carPngUrl) {
            this._count++;
            this._texture = texture;
            this.isInitMc();
        }
        else if (urlLoader._request.url == this.carJsonUrl) {
            // this._count ++;
            // this._data = texture;
            // this.isInitMc();
            var mcFactory = new egret.MovieClipDataFactory(this._data, this._texture);
            var mc = new egret.MovieClip(mcFactory.generateMovieClipData("car"));
            this.addChild(mc);
            mc.x = Const.SWIDTH - mc.width / 2;
            mc.y = Const.SHEIGHT / 2;
            mc.frameRate = 10;
            mc.gotoAndPlay(0, -1);
        }
    };
    p.isInitMc = function () {
        if (this._count === 2 && this._texture && this._data) {
            var mcFactory = new egret.MovieClipDataFactory(this._data, this._texture);
            var mc = new egret.MovieClip(mcFactory.generateMovieClipData("car22"));
            this.addChild(mc);
            mc.x = Const.SWIDTH - mc.width / 2;
            mc.y = Const.SHEIGHT / 2;
            mc.frameRate = 10;
            mc.gotoAndPlay(0, -1);
        }
    };
    p.setProgress = function (current, total) {
        var radio = Math.floor(current / total * 100);
        var dt = current / total;
        this._loadingBar.scaleX = dt;
        this.textField.text = radio + "%";
    };
    return LoadingUI;
}(egret.Sprite));
egret.registerClass(LoadingUI,'LoadingUI');
//# sourceMappingURL=LoadingUI.js.map