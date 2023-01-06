import { _decorator, Component, Node, SpriteFrame, Sprite, log } from "cc";
import { LoadRes } from "./utils/LoadRes";
const { ccclass, property } = _decorator;

@ccclass("Poker")
export class Poker extends Component {
    private pokerValue = 0;

    private valueSp: SpriteFrame = null;

    private bgSp: SpriteFrame = null!;

    private sp: Sprite = null!;

    init(pokerValue: number) {
        this.pokerValue = pokerValue;

        this.bgSp = LoadRes.getInstance().pokerAtlas.getSpriteFrame("pkbm");

        const pokerName = this.valueToName(pokerValue);
        log("Poker init " + pokerName);
        this.valueSp = LoadRes.getInstance().pokerAtlas.getSpriteFrame(pokerName);

        this.sp = this.node.getComponent(Sprite);
    }

    private valueToName(pokerValue: number): string {
        const pokerTypes = ["d", "c", "h", "s"];
        const type = Math.floor(pokerValue / 100);
        const value = pokerValue % 100;

        return pokerTypes[type - 1] + value;
    }

    showBackground() {
        this.sp.spriteFrame = this.bgSp;
    }

    showValue() {
        this.sp.spriteFrame = this.valueSp;
    }

    getPokerValue(): number {
        return this.pokerValue;
    }
}
