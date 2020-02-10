declare namespace ccab {
    export type AssetType = ""|"folder"|"animation-clip"|"asset"|"audio-clip"|"auto-atlas"|"bitmap-font"|"buffer"|"coffeescript"|"dragonbones"|"dragonbones-atlas"|"dragonbones-bin"|"effect"|"fbx"|"font"|"gltf"|"javascript"|"json"|"label-atlas"|"markdown"|"material"|"mesh"|"native-asset"|"particle"|"prefab"|"raw-asset"|"scene"|"skeleton"|"skeleton-animation-clip"|"spine"|"sprite-atlas"|"sprite-frame"|"text"|"texture"|"texture-packer"|"tiled-map"|"ttf-font"|"typescript";

    export interface Asset {
        destPath: string
        hidden: boolean
        isSubAsset: boolean
        path: string
        readonly: boolean
        type: AssetType
        url: string
        uuid: string
    }

    export interface PlugConfig {
        mainPack: Package,
        subpackArr: Package[],
        packageSaveDir: string,
        isDebug: boolean,
    }

    export interface Package {
        name: string
        zhName: string
        zipImport: boolean
        zipRawassets: boolean
        isPrivate: boolean
        type: "LOCAL" | "HOT_UPDATE" | "REMOTE"
        version: string
        packageUrl: string
        resDirs: string[]
    }

    export interface Manifest {
        version: string
        name: string        // 追加包名
        zhName: string      // 追加中文包名
        packageUrl: string
        remoteManifestUrl: string
        remoteVersionUrl: string
        assets: ManifestAssets,
        searchPaths: string[]
    }

    export interface ManifestAssets {
        [key:string]:{
            size: number
            md5: string
            compressed: boolean
        }
    }

    export interface Pack {
        name: string
        path: string
        uuids: string[]
    }

    export interface Subpackages {
        [packName: string]: Pack;
    }
}

