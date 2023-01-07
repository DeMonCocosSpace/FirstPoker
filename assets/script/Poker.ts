import { _decorator, Component, Node, SpriteFrame, Sprite, log } from "cc";
import { LoadRes } from "./utils/LoadRes";
const { ccclass, property } = _decorator;

/**
 * Poker设计：
 * 方块(1)<梅花(2)<红桃(3)<黑桃(4)
 * 103~114 方块3～A
 * 203~214 梅花3～A
 * 303~314 红桃3～A
 * 403~414 黑桃3～A
 */
@ccclass("Poker")
export class Poker extends Component {
    pokerName = "";

    private pokerValue = 0;

    private valueSp: SpriteFrame = null;

    private bgSp: SpriteFrame = null!;

    private sp: Sprite = null!;

    init(pokerValue: number) {
        this.pokerValue = pokerValue;

        this.bgSp = LoadRes.getInstance().pokerAtlas.getSpriteFrame("pkbm");

        const pokerName = this.valueToName(pokerValue);
        //log("Poker init " + pokerName);
        this.valueSp = LoadRes.getInstance().pokerAtlas.getSpriteFrame(pokerName);

        this.sp = this.node.getComponent(Sprite);

        this.realName(pokerValue);
    }

    private valueToName(pokerValue: number): string {
        const pokerTypes = ["d", "c", "h", "s"];
        const type = Math.floor(pokerValue / 100);
        const value = pokerValue % 100;
        return pokerTypes[type - 1] + value;
    }

    private realName(pokerValue: number) {
        const pokerTypes = ["方块", "梅花", "红桃", "黑桃"];
        const pokerValues = ["3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
        const type = Math.floor(pokerValue / 100);
        const value = pokerValue % 100;
        this.pokerName = pokerTypes[type - 1] + pokerValues[value - 3];
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
