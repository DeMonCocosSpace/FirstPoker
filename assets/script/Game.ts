import { _decorator, Component, Node, log, Label } from "cc";
import { PokerFactory } from "./PokerFactory";
import { LoadRes } from "./utils/LoadRes";

const { ccclass, property } = _decorator;

@ccclass("Game")
export class Game extends Component {
    @property(Label)
    btnLabel: Label = null;

    private hasHandout = false;

    onLoad() {
        LoadRes.getInstance().loadNeedRes(() => {
            this.enterGame();
        });
    }

    private enterGame() {
        log("enterGame");
        this.node.addComponent(PokerFactory).init(this);
    }

    handout() {
        if (this.hasHandout) {
            PokerFactory.instance.openPoker();
            this.hasHandout = false;
            this.btnLabel.string = "发牌";
        } else {
            PokerFactory.instance.handout();
            this.hasHandout = true;
            this.btnLabel.string = "开牌";
        }
    }

    update(deltaTime: number) {}
}
