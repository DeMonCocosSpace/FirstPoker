import { _decorator, Component, Node } from "cc";
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
        this.node.addComponent(PokerFactory).init();

        PokerFactory.instance.createPoker(110);
    }

    update(deltaTime: number) {}
}
