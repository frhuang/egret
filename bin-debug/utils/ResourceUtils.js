var ResourceUtils = (function () {
    function ResourceUtils() {
    }
    var d = __define,c=ResourceUtils,p=c.prototype;
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    ResourceUtils.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 根据name关键字创建一个Bitmap对象。此name 是根据TexturePacker 组合成的一张位图
     */
    ResourceUtils.createBitmapFromSheet = function (name, sheetName) {
        if (sheetName === void 0) { sheetName = "gameRes"; }
        var sheet = RES.getRes(sheetName);
        var texture = sheet.getTexture(name);
        var result = new egret.Bitmap();
        result.texture = texture;
        return result;
    };
    ResourceUtils.getTextureFromSheet = function (name, sheetName) {
        if (sheetName === void 0) { sheetName = "gameRes"; }
        var sheet = RES.getRes(sheetName);
        var result = sheet.getTexture(name);
        return result;
    };
    return ResourceUtils;
}());
egret.registerClass(ResourceUtils,'ResourceUtils');
//# sourceMappingURL=ResourceUtils.js.map