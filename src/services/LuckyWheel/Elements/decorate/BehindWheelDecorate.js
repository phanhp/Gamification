//------------------------- IMPORT -------------------------
// import { DropShadowFilter } from "pixi-filters";
import { locationOfObjectOnApp } from "@/services/GameUtils";
import { convertDegreeToRadians } from "@/services/Utils";
import * as PIXI from "pixi.js";

//border
export function drawInBorderForWheel(wheelCentre, wheelRadius) {
    const inBorderRadius = wheelRadius * 1.06;
    const inBorder = new PIXI.Graphics();
    inBorder.circle(0, 0, inBorderRadius);
    inBorder.fill({ color: '#E6E6E6' });
    inBorder.position.set(wheelCentre.x, wheelCentre.y);
    return inBorder;
}

export function drawOutBorderForWheel(wheelCentre, wheelRadius) {
    const outBorderRadius = wheelRadius * 1.12;
    const outBorder = new PIXI.Graphics();
    outBorder.circle(0, 0, outBorderRadius);
    outBorder.fill({ color: '#FFFFFF' });
    outBorder.position.set(wheelCentre.x, wheelCentre.y);
    return outBorder;
}

//decorator
export async function antgameTitleLoader(appWidth, appHeight, wheelRadius, wheelCentre) {
    const spriteSource = "/assets/side-add/title antgame.png";
    const texture = await PIXI.Assets.load(spriteSource);
    const sprite = new PIXI.Sprite(texture);

    sprite.anchor.set(0.5, 0.5);
    const scaleRating = (wheelRadius / 150) * 1.25;
    sprite.scale.set(scaleRating);

    const x = appWidth / 2;
    const y = wheelCentre.y - 2.2 * wheelRadius;
    sprite.position.set(x, y);

    return sprite;
}

export async function luckyWheelTitleLoader(appWidth, appHeight, wheelRadius, wheelCentre) {
    const spriteSource = "/assets/side-add/title.png";
    const texture = await PIXI.Assets.load(spriteSource);
    const sprite = new PIXI.Sprite(texture);

    sprite.anchor.set(0.5, 0.5);
    const scaleRating = (wheelRadius / 150) * 1.25;
    sprite.scale.set(scaleRating);

    const x = appWidth / 2;
    const y = wheelCentre.y - 1.7 * wheelRadius;
    sprite.position.set(x, y);

    return sprite;
}

export async function chrismasRewardLoader(wheelCentre, wheelRadius) {
    const spriteSource = "/assets/side-add/chrismas reward.png";

    const angle = convertDegreeToRadians(225);

    const texture = await PIXI.Assets.load(spriteSource);
    const sprite = new PIXI.Sprite(texture);

    sprite.anchor.set(0.5, 0.5);

    const scaleRating = (wheelRadius / 170) * 0.55;
    sprite.scale.set(scaleRating);

    const relocate = wheelRadius * 1.12;

    const giftLocation = locationOfObjectOnApp(wheelCentre, relocate, angle);

    sprite.position.set(giftLocation.x, giftLocation.y);

    return sprite;
}

export async function pineTreeLoader(wheelCentre, wheelRadius) {
    const spriteSource = "/assets/side-add/pine tree.png";

    const angle = convertDegreeToRadians(315);

    const texture = await PIXI.Assets.load(spriteSource);
    const sprite = new PIXI.Sprite(texture);

    sprite.anchor.set(0.5, 0.5);

    const scaleRating = (wheelRadius / 170) * 1.15;
    sprite.scale.set(scaleRating);

    const relocate = wheelRadius * 1.2;

    const treeLocation = locationOfObjectOnApp(wheelCentre, relocate, angle);

    sprite.position.set(treeLocation.x, treeLocation.y);

    return sprite;
}

export async function behindWheelAssetLoader(appWidth, appHeight, wheelCentre, wheelRadius) {
    const assetsList = [
        antgameTitleLoader(appWidth, appHeight, wheelRadius, wheelCentre),
        luckyWheelTitleLoader(appWidth, appHeight, wheelRadius, wheelCentre),
        chrismasRewardLoader(wheelCentre, wheelRadius),
        pineTreeLoader(wheelCentre, wheelRadius)
    ];

    return Promise.all(assetsList)
        .then((sprites) => {
            return sprites;
        })
        .catch((error) => {
            console.error("Error loading assets:", error);
            throw error;
        });
}