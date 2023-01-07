import { _decorator, Component, Node, log } from "cc";
import { PokerFactory } from "./PokerFactory";
import { LoadRes } from "./utils/LoadRes";

const { ccclass, property } = _decorator;

@ccclass("Game")
export class Game extends Component {
    onLoad() {
        LoadRes.getInstance().loadNeedRes(() => {
            this.enterGame();
        });
    }

    private enterGame() {
        log("enterGame");
        this.node.addComponent(PokerFactory).init(this);

        PokerFactory.instance.handout();
    }

    update(deltaTime: number) {}
}
