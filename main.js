'use strict';
var path = require("path");
var fs = require("fs");

var IPC = require('./core/IPC');
var AssetsBundle = require("./core/AssetsBundle");
var AutoAtlasUtils = require("./core/AutoAtlasUtils");

const Config = require('./Config');

const PackageJson = require('./package.json');
const PackageName = PackageJson.name;

/**
 * 读取用户设置
 * @returns {ccab.PlugConfig}
 */
async function loadUserConfig() {
    if (isOpenedPanel()) {
        const [error, strData] = await IPC.sendToPanel("onBuildFinished");

        if (error) {
            Editor.error(error);
            return;
        }

        const config = JSON.parse(strData);
        return config;
    }

    const config = Config.read();
    return config;
}

/**
 * 是否打开了面板
 * @returns {boolean}
 */
function isOpenedPanel() {
    const opened = Editor.Panel.findWindow(PackageName);
    return opened;
}


module.exports = {
    load() {
        // Editor.log("加载成功, 项目编译时请始终保持此插件同时打开");
        Editor.Builder.on('build-finished', this.onBuildFinished);
        Editor.Builder.on('build-start', this.onBuildStart);
    },

    unload() {
        Editor.Builder.removeListener('build-finished', this.onBuildFinished);
        Editor.Builder.removeListener('build-start', this.onBuildStart);
    },


    /**
     * 编译开始 
     * @param {Editor.Options} options 
     * @param {()=>void} next 
     */
    async onBuildStart(options, next) {
        if (!isOpenedPanel()) {
            next();
            return;
        }
        // 动态设置子包 并获取子包配置信息
        try {
            let [error] = await IPC.sendToPanel("onBuildStart");
            error && Editor.error(error);
        } catch (error) {
            Editor.error(error);
        }

        next();
    },

    /**
     * 
     * @param {Editor.Options} options 
     * @param {()=>void} next 
     */
    async onBuildFinished(options, next) {
        const config = await loadUserConfig();
        const isEnable = config && config.isEnable;

        if (!isEnable) {
            next();
            return;
        }

        var buildResults = options.buildResults;

        Editor.success(":::::: 开始打包资源 ::::::");
        try {
            let autoAtlasInfo;
            if ("如果自动图集分离存在问题,直接注释if即可") {
                autoAtlasInfo = AutoAtlasUtils.getSubPackageAutoAtlas(options);
            }

            // Editor.log("编译完成:", options);
            let buildDest = options.dest;
            let platform = options.platform; // 'android',
            let _subpackages = buildResults._subpackages;

            AssetsBundle.init(config, buildDest, _subpackages);

            Editor.log("开始校验资源安全性和私有性");
            console.log("开始校验资源安全性和私有性");
            if (await AssetsBundle.check()) {
                Editor.log("开始打包");
                await AssetsBundle.run(autoAtlasInfo);
            }
        } catch (error) {
            Editor.error(error);
        }

        Editor.success(":::::: 打包资源结束 ::::::");

        next();
    },

    // register your ipc messages here
    messages: {
        'open'() {
            // open entry panel registered in package.json
            Editor.Panel.open('assets-bundle');
        },

        'scene:saved'() {
            if (!isOpenedPanel()) {
                return;
            }

            IPC.sendToPanel('curUserConfig')
                .then(value => {
                    const [err, str] = value;

                    if (err) {
                        throw err;
                    }

                    Config.write(JSON.parse(str));
                })
                .then(() => Editor.log('AssetsBundle saved!'))
                .catch(err => Editor.error('AssetsBundle save error: ', err));

        },
    },
};