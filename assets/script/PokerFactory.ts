import { _decorator, Component, instantiate, NodePool, log } from "cc";
import { Game } from "./Game";
import { Poker } from "./Poker";
import { LoadRes } from "./utils/LoadRes";
const { ccclass, property } = _decorator;

/**
 * Poker工厂类，负责发牌的一系列逻辑
 */
export class PokerFactory extends Component {
    private pokerDistance = 15;

    public static instance: PokerFactory = null!;

    private pokerPool: NodePool = null;

    //所有的poker，48张牌
    private allPokers: number[] = new Array();

    //临时存储poker node
    private pokerNodes: Array<Poker> = new Array();

    private game: Game = null!;
    init(game: Game): void {
        PokerFactory.instance = this;
        this.game = game;
        this.pokerPool = new NodePool();
    }

    /**
     * 发牌
     */
    public handout() {
        //0.回收poker node进节点池
        this.destPoker();
        //1.生成牌堆
        this.createAllPokers();
        //2.洗牌
        this.shufflePoker();
        //3.生成4组牌,排序，发给玩家
        this.dispatchPoker(0);
        this.dispatchPoker(1);
        this.dispatchPoker(2);
        this.dispatchPoker(3);
    }

    /**
     * 开牌
     */
    public openPoker() {
        this.pokerNodes.forEach((v) => {
            v.showValue();
        });
    }

    //生成牌堆
    private createAllPokers() {
        if (this.allPokers.length > 0) return;
        //4循环实现
        // let index = 0;
        // //添加方块
        // for (let i = 103; i <= 114; i++) {
        //     this.allPokers[index] = i;
        //     index++;
        // }
        // //添加梅花
        // for (let i = 203; i <= 214; i++) {
        //     this.allPokers[index] = i;
        //     index++;
        // }
        // //添加红桃
        // for (let i = 303; i <= 314; i++) {
        //     this.allPokers[index] = i;
        //     index++;
        // }
        // //添加黑桃
        // for (let i = 403; i <= 414; i++) {
        //     this.allPokers[index] = i;
        //     index++;
        // }

        //map，concat实现
        const pokers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        for (let i = 1; i <= 4; i++) {
            const ps = pokers.map((v, _, a) => {
                return i * 100 + +v + 3;
            });
            this.allPokers = this.allPokers.concat(ps);
        }
    }

    //洗牌
    private shufflePoker() {
        //随机排序两次，模拟洗牌
        this.allPokers.sort((a: number, b: number): number => {
            return Math.random() < 0.5 ? -1 : 1;
        });
        this.allPokers.sort((a: number, b: number): number => {
            return Math.random() < 0.5 ? -1 : 1;
        });
    }

    //玩家分牌，玩家编号：top=0,right=1,left=2,bottom=3
    private dispatchPoker(playvalue: number) {
        //分牌
        const pokers = this.allPokers.filter((v, i, a) => {
            return i >= 12 * playvalue && i < 12 * (playvalue + 1);
        });
        //玩家手牌排序
        //先根据大小进行排序
        pokers.sort((a: number, b: number): number => {
            return a % 100 > b % 100 ? 1 : -1;
        });
        //再调整花色
        pokers.sort((a: number, b: number): number => {
            if (a % 100 == b % 100) {
                return Math.floor(a / 100) > Math.floor(b / 100) ? 1 : -1;
            } else {
                return 0;
            }
        });
        //生成牌
        this.showPoker(playvalue, pokers);
    }

    //生成牌
    public showPoker(playvalue: number, pokers: number[]) {
        log(playvalue + "=" + pokers);
        let count = pokers.length;
        let i = 0;
        pokers.forEach((v: number) => {
            const a = count--;
            const poker = this.createPoker(v);
            this.pokerNodes.push(poker);

            let xpos = 0;
            let ypos = 0;

            switch (playvalue) {
                case 0:
                    xpos = 0 + this.pokerDistance * (a - 1) - i * this.pokerDistance;
                    ypos = 160;
                    poker.node.angle = 180;
                    break;
                case 1:
                    xpos = 320;
                    ypos = 0 - this.pokerDistance * (a - 1) + i * this.pokerDistance;
                    poker.node.angle = 90;
                    break;
                case 2:
                    xpos = 0 - this.pokerDistance * (a - 1) + i * this.pokerDistance;
                    ypos = -160;
                    break;
                case 3:
                    xpos = -320;
                    ypos = 0 + this.pokerDistance * (a - 1) - i * this.pokerDistance;
                    poker.node.angle = -90;
                    break;
            }
            //log(poker.pokerName + "=(" + xpos + "," + ypos + ")");
            poker.node.setPosition(xpos, ypos);
            this.game.node.addChild(poker.node);
            i++;
        });
    }

    private createPoker(pokerValue: number): Poker {
        let poker = null;
        if (this.pokerPool.size() > 0) {
            poker = this.pokerPool.get();
        } else {
            poker = instantiate(LoadRes.getInstance().pokerPrefab);
        }

        //this.node.addChild(poker);

        const pokerCtrl: Poker = poker.addComponent(Poker);

        pokerCtrl.init(pokerValue);

        //pokerCtrl.showValue();

        return pokerCtrl;
    }

    //回收进节点池
    public destPoker() {
        this.pokerNodes.forEach((v) => {
            this.pokerPool.put(v.node);
            v.node.angle = 0;
            v.showBackground();
            this.game.node.removeChild(v.node);
        });
        //重置
        this.pokerNodes = new Array();
    }
}
