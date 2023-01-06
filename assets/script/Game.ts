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

        const pokers = [110, 111, 112, 113, 210, 211, 212, 213, 210, 311, 312, 313, 410, 411, 412, 413];

        //随机排序，模拟洗牌两次
        pokers.sort((a: number, b: number): number => {
            return Math.random() < 0.5 ? -1 : 1;
        });
        pokers.sort((a: number, b: number): number => {
            return Math.random() < 0.5 ? -1 : 1;
        });

        let xpos = -150;
        let ypos = -150;
        for (let i = 0; i < pokers.length; i++) {
            const poker = PokerFactory.instance.createPoker(pokers[i]);
            poker.showValue();
            poker.node.setPosition(xpos, ypos);
            xpos += 25;
        }
    }

    update(deltaTime: number) {}
}
