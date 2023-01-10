import { _decorator, Component, Node, log, Label, ProgressBar } from "cc";
import { PokerFactory } from "./PokerFactory";
import { LoadRes } from "./utils/LoadRes";

const { ccclass, property } = _decorator;

@ccclass("Game")
export class Game extends Component {
    @property(Node)
    btn: Node = null;
    @property(Label)
    btnLabel: Label = null;
    @property(ProgressBar)
    progressBar: ProgressBar = null;

    private hasHandout = false;

    onLoad() {
        this.progressBar.node.active = true;
        this.btn.active = false;
        LoadRes.getInstance().loadNeedRes(() => {
            this.enterGame();
        });
    }

    private enterGame() {
        log("enterGame");
        this.btn.active = true;
        this.progressBar.node.active = false;
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

    private progress = 0;
    update(deltaTime: number) {
        this.progress += deltaTime;
        if (this.progress > 1) {
            this.progress = 0;
        }
        this.progressBar.progress = this.progress;
    }
}
