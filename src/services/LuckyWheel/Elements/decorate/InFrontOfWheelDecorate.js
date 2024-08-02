//------------------------- IMPORT -------------------------
// import { DropShadowFilter } from "pixi-filters";
import { convertSpriteSource, generateSpriteFromSource, locationOfObjectOnApp } from "@/services/GameUtils";
import { convertDegreeToRadians } from "@/services/Utils";
import * as PIXI from "pixi.js";

//------------------------- FRONT WHEEL -------------------------
export async function santaLoader(wheelCentre, wheelRadius) {
    const spriteSource = "/assets/side-add/santa.png";

    const angle = convertDegreeToRadians(135);

    const texture = await PIXI.Assets.load(spriteSource);
    const sprite = new PIXI.Sprite(texture);

    sprite.anchor.set(0.5, 0.5);

    const scaleRating = (wheelRadius / 170);
    sprite.scale.set(scaleRating);

    const relocate = wheelRadius*1.25;

    const santaLocation = locationOfObjectOnApp(wheelCentre, relocate, angle);

    sprite.position.set(santaLocation.x, santaLocation.y);

    return sprite;
}

export async function snowmanLoader(wheelCentre, wheelRadius) {
    const spriteSource = "/assets/side-add/snowman.png";

    const angle = convertDegreeToRadians(45);

    const texture = await PIXI.Assets.load(spriteSource);
    const sprite = new PIXI.Sprite(texture);

    sprite.anchor.set(0.5, 0.5);

    const scaleRating = (wheelRadius / 170) * 0.9;
    sprite.scale.set(scaleRating);

    const relocate = wheelRadius*1.25;

    const snowmanLocation = locationOfObjectOnApp(wheelCentre, relocate, angle);

    sprite.position.set(snowmanLocation.x, snowmanLocation.y);

    return sprite;
}

//----- wheel lightBuble
export async function drawLightBulb(wheelPart, wheelCentre, app) {
    const minAngle = wheelPart.minAngle;
    const wheelPartAngle = wheelPart.wheelPartAngle;

    const bulbOnSource = convertSpriteSource("public/assets/wheel-border/light-on-bubble.png");
    const bulbOffSource = convertSpriteSource("public/assets/wheel-border/light-off-bubble.png")

    const bulbOnTexture = await PIXI.Assets.load(bulbOnSource);
    const bulbOffTexture = await PIXI.Assets.load(bulbOffSource);

    const firstBulb = new PIXI.Sprite(bulbOnTexture);
    const secondBulb = new PIXI.Sprite(bulbOffTexture);
}

export async function frontWheelAssetLoader(appWidth, appHeight, wheelCentre, wheelRadius) {
    const assetsList = [
        santaLoader(wheelCentre, wheelRadius),
        snowmanLoader(wheelCentre, wheelRadius)
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