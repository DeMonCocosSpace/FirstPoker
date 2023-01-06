import { _decorator, Component, instantiate } from "cc";
import { LoadRes } from "./utils/LoadRes";
const { ccclass, property } = _decorator;

export class PokerFactory extends Component {
    public static instance: PokerFactory = null!;

    init(): void {
        PokerFactory.instance = this;
    }

    public createPoker(value: number): void {
        const poker = instantiate(LoadRes.getInstance().pokerPrefab);
        this.node.addChild(poker);
    }
}
