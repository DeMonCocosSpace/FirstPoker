import { _decorator, Component, Node, AssetManager, assetManager, Prefab, SpriteAtlas, Asset, log } from "cc";
const { ccclass, property } = _decorator;

/**
 * 单例资源加载类
 */
export class LoadRes extends Component {
    private static instance: LoadRes = null!;

    public static getInstance(): LoadRes {
        if (LoadRes.instance == null) {
            LoadRes.instance = new LoadRes();
        }
        return LoadRes.instance;
    }

    public pokerAtlas: SpriteAtlas = null!;
    public pokerPrefab: Prefab = null!;

    public textureBundle: AssetManager.Bundle = null!;
    public prefabBundle: AssetManager.Bundle = null!;

    /**
     *
     * 加载游戏必须的资源
     * @param callback
     */
    public loadNeedRes(callback: () => void): void {
        //加载Poker牌集
        this.onLoadPokerAtlas(() => {
            //加载PokerView
            this.onLoadPokerView(() => {
                callback();
            });
        });
    }

    public onLoadPokerAtlas(callback: (as: SpriteAtlas) => void): void {
        if (this.pokerAtlas == null) {
            this.loadTextureRes("poker", (data: SpriteAtlas) => {
                this.pokerAtlas = data;
                callback(data);
            });
        } else {
            callback(this.pokerAtlas);
        }
    }

    public onLoadPokerView(callback: (pf: Prefab) => void): void {
        if (this.pokerPrefab == null) {
            this.loadPrefabRes("PokerView", (data: Prefab) => {
                this.pokerPrefab = data;
                callback(data);
            });
        } else {
            callback(this.pokerPrefab);
        }
    }

    public loadTextureRes(resName: string, callback: (t: SpriteAtlas) => void) {
        if (this.textureBundle == null) {
            assetManager.loadBundle("texture", (error, data: AssetManager.Bundle) => {
                log("loadTextureRes " + error);
                this.textureBundle = data;
                this.textureBundle.load(resName, SpriteAtlas, (error, data: SpriteAtlas) => {
                    log("loadTextureRes " + error);
                    callback(data);
                });
            });
        } else {
            this.textureBundle.load(resName, SpriteAtlas, (error, data: SpriteAtlas) => {
                log("loadTextureRes " + error);
                callback(data);
            });
        }
    }

    public loadPrefabRes(resName: string, callback: (prefab: Prefab) => void) {
        if (this.prefabBundle == null) {
            assetManager.loadBundle("prefab", (error, data: AssetManager.Bundle) => {
                log("loadPrefabRes " + error);
                this.prefabBundle = data;
                this.prefabBundle.load(resName, Prefab, (error, data: Prefab) => {
                    callback(data);
                });
            });
        } else {
            this.prefabBundle.load(resName, Prefab, (error, data: Prefab) => {
                log("loadPrefabRes " + error);
                callback(data);
            });
        }
    }

    public loadBundleRes<T extends Asset>(bundle: string, resName: string, callback: (t: T) => void) {
        assetManager.loadBundle(bundle, (error, data: AssetManager.Bundle) => {
            log("loadBundleRes:" + error);
            data.load(resName, (error, data: T) => {
                callback(data);
            });
        });
    }
}
