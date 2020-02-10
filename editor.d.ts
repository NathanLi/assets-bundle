declare namespace Editor {
    export function log(msg: string|any, ...subst: any[]): void;
    export function warn(msg: string|any, ...subst: any[]): void;
    export function error(msg: string|any, ...subst: any[]): void;
    export function trace(msg: string|any, ...subst: any[]): void;

    export const Builder: any;
    export class Panel {
        static templateUrl: string;
        static open: () => void;
        static close: () => void;
        static popup: () => void;
        static findWindow: (name: string) => boolean;
    }

    export interface IBuildAsset {
        /**
         * 是否是根资源
         */
        isRoot?: boolean;
        /**
         * 依赖的 uuid
         */
        dependUuids?: string[];
        /**
         * 对应的本地资源路径
         */
        nativePath?: string;
        /**
         * 对应的本地资源路径数组
         */
        nativePaths?: string[];
    }

    export class Options {
        /** 编译后的结果 */
        buildResults?: BuildResults;
        /** 编译目标路径 */
        dest: string;
        /** 编译平台 */
        platform: string;
    }

    export interface ISubpackage {
        name: string;
        path: string;
        uuids: string[];
    }

    export class BuildResults {
        /**
         * 编译出来的 assets
         */
        _buildAssets: {[index: string]: IBuildAsset};

        /**
         * 编译出来的子包
         */
        _subpackages?: {[name: string]: ISubpackage};

        /**
         * 获得指定资源依赖的所有资源
         * @param uuid 
         */
        getDependencies(uuid: string):  string[];

        /**
         * 指定的 uuid 资源是否包含在构建资源中
         * @param uuid 需要检测的资源 uuid  
         * @param assertContains 不包含时是否打印报错信息
         */
        containsAsset(uuid: string, assertContains: boolean): boolean;

        /**
         * 返回构建资源中包含的所有资源的 uuid
         */
        getAssetUuids(): string[];

        /**
         * 获取指定 uuid 的资源在引擎中定义的资源类型
         * 同时可以使用 cc.js.getClassByName(type) 进行获取资源的构造函数
         * @param uuid 定的 uuid 资源
         */
        getAssetType(uuid: string): string;

        /**
         * 获取指定 uuid 资源（例如纹理）的存放路径（如果找不到，则返回空字符串）
         * @param uuid 指定的 uuid 资源
         */
        getNativeAssetPath(uuid: string): string;

        /**
         * 获取指定 uuid 资源（例如纹理）的所有存放路径（如果找不到，则返回空数组）
         * 例如：需要获取纹理多种压缩格式的存放资源路径时，即可使用该函数
         * @param uuid 指定的 uuid 资源
         */
        getNativeAssetPaths(uuid: string): string[];
    }

    export interface IAssetInfo {
        uuid: string;
        path: string;
        url: string;
        type: string;
        isSubAsset: boolean;
    }

    export interface IMountInfo {
        path: string;
        name: string;
        type: string;
    }

    /**
     * https://docs.cocos.com/creator/manual/zh/extension/api/asset-db/asset-db-main.html?h=editor.assetdb
     */
    export class AssetDB {
        /**
         * Return uuid by url. If uuid not found, it will return null.
         * @param url 
         */
        urlToUuid(url: string): string;

        /**
         * Return uuid by file path. If uuid not found, it will return null.
         * @param fspath 
         */
        fspathToUuid(fspath: string): string;

        /**
         * Return file path by uuid. If file path not found, it will return null.
         * @param uuid 
         */
        uuidToFspath(uuid: string): string;

        /**
         * Return url by uuid. If url not found, it will return null.
         * @param uuid 
         */
        uuidToUrl(uuid: string): string;

        /**
         * Return url by file path. If file path not found, it will return null.
         * @param fspath 
         */
        fspathToUrl(fspath: string): string;

        /**
         * Return file path by url. If url not found, it will return null.
         * @param url 
         */
        urlToFspath(url: string): string;

        /**
         * Check existance by url.
         * @param url 
         */
        exists(url: string): string;

        /**
         * Check existance by uuid.
         * @param uuid 
         */
        existsByUuid(uuid: string): string;

        /**
         * Check existance by path.
         * @param fspath 
         */
        existsByPath(fspath: string): string;

        /**
         * Check whether asset for a given url is a sub asset.
         * @param url 
         */
        isSubAsset(url: string): boolean;

        /**
         * Check whether asset for a given uuid is a sub asset.
         * @param uuid 
         */
        isSubAssetByUuid(uuid: string): boolean;

        /**
         * Check whether asset for a given path is a sub asset.
         * @param fspath 
         */
        isSubAssetByPath(fspath: string): boolean;

        /**
         * Check whether asset contains sub assets for a given url.
         * @param url 
         */
        containsSubAssets(url: string): boolean;

        /**
         * Check whether asset contains sub assets for a given uuid.
         * @param uuid 
         */
        containsSubAssetsByUuid(uuid: string): boolean;

        /**
         * Check whether asset contains sub assets for a given path.
         * @param path 
         */
        containsSubAssetsByPath(path: string): boolean;

        /**
         * Return asset info by a given url.
         * @param url 
         */
        assetInfo(url: string): IAssetInfo;

        /**
         * Return asset info by a given uuid.
         * @param url 
         */
        assetInfoByUuid(url: string): IAssetInfo;

        /**
         * Return asset info by a given file path.
         * @param fspath 
         */
        assetInfoByPath(fspath: string): IAssetInfo;

        /**
         * Return all sub assets info by url if the url contains sub assets.
         * @param url 
         */
        subAssetInfos(url: string): IAssetInfo[];

        /**
         * Return all sub assets info by uuid if the uuid contains sub assets.
         * @param uuid 
         */
        subAssetInfosByUuid(uuid: string): IAssetInfo[];

        /**
         * Return all sub assets info by path if the path contains sub assets.
         * @param fspath 
         */
        subAssetInfosByPath(fspath: string): IAssetInfo[];

        /**
         * Return meta instance by a given url.
         * @param url 
         */
        loadMeta(url: string): any;

        /**
         * Return meta instance by a given uuid.
         * @param uuid 
         */
        loadMetaByUuid(uuid: string): any;

        /**
         * Return meta instance by a given path.
         * @param fspath 
         */
        loadMetaByPath(fspath: string): any;

        /**
         * Return whether a given path is reference to a mount.
         * @param url 
         */
        isMount(url: string): boolean;  

        /**
         * Return whether a given uuid is reference to a mount.
         * @param uuid 
         */
        isMountByUuid(uuid: string): boolean;

        /**
         * Return mount info by url.
         * @param url 
         */
        mountInfo(url: string): IMountInfo;

        /**
         * Return mount info by uuid.
         * @param uuid 
         */
        mountInfoByUuid(uuid: string): IMountInfo;

        /**
         * Return mount info by path.
         * @param fspath 
         */
        mountInfoByPath(fspath: string): IMountInfo;

        /**
         * Mount a directory to assetdb, and give it a name. If you don't provide a name, it will mount to root.
         * @param path 
         * @param mountPath 
         * @param cb 
         */
        mount(path: string, mountPath: string, cb: (err?: any) => void): void;
        mount(path: string, mountPath: string, opts: {hide?: any, virtual?: any, icon?: any}, cb: (err?: any) => void): void;

        /**
         * Unmount by name.
         * @param mountPath 
         * @param cb 
         */
        unmount(mountPath: string, cb: (err?: any) => void): void;

        /**
         * Overwrite the meta by loading it through uuid.
         * @param uuid 
         * @param jsonString 
         * @param cb 
         */
        saveMeta(uuid: string, jsonString: string, cb: (err: any, meta: any) => void): void;

        /**
         * queryAssets
         * @param pattern  The url pattern.
         * @param assetTypes The asset type(s). You can use the Editor.assettype2name[cc.js.getClassName(asset)] API to get the corresponding resource type. The asset in the API is the resource type you want to query, such as cc.SpriteFrame, cc.Texture2D.
         * @param cb The callback function.
         */
        queryAssets(pattern: string, assetTypes: string | string[], cb: (err: any, result: any[]) => void): void;

        queryInfoByUuid(uuid: string): Promise<any>;
    }

    export class MetaInfo {
        isSubAsset: boolean;
        /** 路径，如： "/Users/admin/GameX/assets/Game" */
        path: string;
        /** 资源类型 */
        type: string;
        /** 资源 url。如： "db://assets/Game" */
        url: string;
        /** 资源 id */
        uuid: string;
    }

    /**
     * 编译器中的 meta 文件
     */
    export class Meta {
        /** meta 版本 */
        ver: string;
        /** meta 文件的唯一 id */
        uuid: string;
        subMetas: {};
    }

    /**
     * 目录类型的 meta
     */
    export class MetaFolder extends Meta {
        /**
         * 是否为子包
         */
        isSubpackage: boolean;

        /**
         * 如果为子包，则子包的名称
         */
        subpackageName: string;
    }

    /**
     * 场景资源 meta
     */
    export class MetaFire extends Meta {
        /** 是否异步加载资源 */
        asyncLoadAssets: boolean;
        /** 是否自动释放资源 */
        autoReleaseAssets: boolean;
    }

    /**
     * 脚本文件 meta
     */
    export class MetaScript extends Meta {
        isPlugin: boolean;
        loadPluginInWeb: boolean;
        loadPluginInNative: boolean;
        loadPluginInEditor: boolean;
    }

    export const assetdb: AssetDB;
    export const buildResults: BuildResults;

}