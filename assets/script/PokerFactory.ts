import { _decorator, Component, instantiate, NodePool } from "cc";
import { Poker } from "./Poker";
import { LoadRes } from "./utils/LoadRes";
const { ccclass, property } = _decorator;

export class PokerFactory extends Component {
    public static instance: PokerFactory = null!;

    private pokerPool: NodePool = null;

    init(): void {
        PokerFactory.instance = this;
        this.pokerPool = new NodePool();
    }

    public createPoker(pokerValue: number): Poker {
        let poker = null;
        if (this.pokerPool.size() > 0) {
            poker = this.pokerPool.get();
        } else {
            poker = instantiate(LoadRes.getInstance().pokerPrefab);
        }

        this.node.addChild(poker);

        const pokerCtrl = poker.addComponent(Poker);

        pokerCtrl.init(pokerValue);

        pokerCtrl.showValue();

        return pokerCtrl;
    }

    //回收进节点池
    public destPoker(poker: Poker) {
        this.pokerPool.put(poker.node);
    }
}
