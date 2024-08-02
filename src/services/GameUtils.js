//------------------------- IMPORT -------------------------
import { reject } from "lodash";
import * as PIXI from "pixi.js";
import { Assets } from "pixi.js";
import { resolve } from "styled-jsx/css";
import { convertRadiansToDegree, roundUpDecimal, sumOfArray } from "./Utils";

//------------------------- ATTRIBUTE -------------------------


//------------------------- FUNCTION -------------------------
//-------------------------
export function generatePercentageListFromEaseList(easeList, roundUp = 3) {
    let percentageList = [];
    let totalPercentage = 0;
    let adjust;

    let total = easeList.reduce((sum, ease) => sum + ease, 0);

    if (total <= 0) {
        throw new Error("function generatePercentageListFromEaseList(easeList, roundUp = 3): Invalid easeList with total <=0");
    }

    for (let i = 0; i < easeList.length; i++) {
        let ease = easeList[i];
        let percentage = ease / total;
        percentage = roundUpDecimal(percentage, roundUp);

        totalPercentage = totalPercentage + percentage;
        if (totalPercentage >= 1) {
            let currentTotalPercentage = sumOfArray(percentageList);
            adjust = 1 - currentTotalPercentage;
            adjust = roundUpDecimal(adjust, roundUp);
            percentageList.push(adjust);
            break;
        }

        percentageList.push(percentage);
    }

    let different = easeList.length - percentageList.length;
    if (different > 0) {
        do {
            percentageList.push(0);
            different--;
        } while (different > 0);
    }
    if (different < 0) {
        do {
            percentageList.pop();
            different++;
        } while (different < 0);
        totalPercentage = 0;
        for (let i = 0; i < percentageList.length - 1; i++) {
            totalPercentage = totalPercentage + percentageList[i];
        }
        adjust = 0;
        adjust = 1 - totalPercentage;
        adjust = roundUpDecimal(adjust, roundUp);
        percentageList[percentageList.length - 1] = adjust;
    }

    return percentageList;
}

export function generatePercentageListFromRewardList(rewardList, roundUp = 3) {
    const easeList = rewardList.map(reward => reward.ease);
    return generatePercentageListFromEaseList(easeList, roundUp);
}

//-------------------------
export function totalRewardPool(rewardList) {
    let total = 0;
    for (let i = 0; i < rewardList.length; i++) {
        const amount = rewardList[i].amount;
        total += amount;
    }
    return total;
}

export function isRewardPoolEmpty(rewardList) {
    return totalRewardPool(rewardList) === 0;
}

export function isRewardAttributeExist(rewardAttribute, rewardList) {
    for (let i = 0; i < rewardList.length; i++) {
        let reward = rewardList[i];
        if (rewardAttribute === reward.id) {
            return true;
        }
        if (rewardAttribute === reward.name) {
            return true;
        }
        if (rewardAttribute === reward.type) {
            return true;
        }
        if (rewardAttribute === reward.amount) {
            return true;
        }
        if (rewardAttribute === reward.ease) {
            return true;
        }
        if (rewardAttribute === reward.image) {
            return true;
        }

    }
    return false;
}

export function isRewardPoolValidToPlay(rewardList) {
    if (isRewardAttributeExist("unlimited", rewardList)) {
        return true;
    } else {
        if (isRewardPoolEmpty) {
            return false;
        }
        return true;
    }
}

export function findRewardIndexByRewardId(rewardId, rewardList) {
    for (let i = 0; i < rewardList.length; i++) {
        if (rewardList[i].id === rewardId) {
            return i;
        }
    }
    throw new Error('function findRewardIndexByRewardId(rewardId, rewardList): RewardId can not be found');
}

//-------------------------
export function convertSpriteSource(spriteSource) {
    if (spriteSource.startsWith("public")) {
        spriteSource = spriteSource.substring("public".length);
    }
    if (!spriteSource.startsWith("/")) {
        spriteSource = "/" + spriteSource;
    }
    return spriteSource;
}

export async function generateSpriteFromSource(spriteSource) {
    try {
        spriteSource = convertSpriteSource(spriteSource);
        const texture = await PIXI.Assets.load(spriteSource);
        const sprite = PIXI.Sprite.from(texture);
        return sprite;
    } catch (error) {
        throw error;
    }
}

export async function generateSprite(
    { source = "public/assets/roll.png",
        parrentWidth = 100, parrentHeight = 100,
        widthRate = 1, heightRate = 1, relativeWidth = 0, relativeHeight = 0, absoluteWidth = 0, absoluteHeight = 0,
        relativeX = 0, relativeY = 0, absoluteX = 0, absoluteY = 0,
        relativeAnchorX = 0.5, relativeAnchorY = 0.5, absoluteAnchorX = 0, absoluteAnchorY = 0,
        rotateAngle = 0
    }
) {
    const sprite = await generateSpriteFromSource(source);

    const scaleHandler = () => {
        const width = sprite.width * widthRate + parrentWidth * relativeWidth + absoluteWidth;
        const height = sprite.height * heightRate + parrentHeight * relativeHeight + absoluteHeight;
        const scaleX = width / sprite.width;
        const scaleY = height / sprite.height;
        sprite.scale.set(scaleX, scaleY);
    }
    scaleHandler();

    const positionHandler = () => {
        const x = parrentWidth * relativeX + absoluteX;
        const y = parrentHeight * relativeY + absoluteY;
        sprite.position.set(x, y);
    }
    positionHandler();

    const anchorHandler = () => {
        const anchorPositionX = sprite.width * relativeAnchorX + absoluteAnchorX;
        const anchorPositionY = sprite.height * relativeAnchorY + absoluteAnchorY;
        const anchorX = anchorPositionX / sprite.width;
        const anchorY = anchorPositionY / sprite.height;
        sprite.anchor.set(anchorX, anchorY);
    }
    anchorHandler();

    const rotateHandler = () => {
        sprite.rotation = rotateAngle;
    }
    rotateHandler();

    return sprite;
}

//-------------------------
export function pixiComponentHandler(
    component,
    widthRate, heightRate,
    bonusWidth, bonusHeight,
    x, y
) {
    let width = component.width;
    let height = component.height;
    width = width * widthRate + bonusWidth;
    height = height * heightRate + bonusHeight;
    const scaleX = width / component.width;
    const scaleY = height / component.height;
    component.scale.set(scaleX, scaleY);

    component.position.set(x, y);
}

//-------------------------
export function createButton(
    width, height, roundUp,
    backgroundColor, backgroundColorAlpha,
    lineSize, lineColor
) {
    const button = new PIXI.Graphics();
    button.roundRect(0, 0, width, height, roundUp);
    button.fill({ color: backgroundColor, alpha: backgroundColorAlpha });
    button.stroke({ width: lineSize, fill: lineColor });
    return button;
}

//-------------------------
export function locationOfObjectOnApp(centrePointLocation, distanceToCentre, angleWithCentrepoint) {
    const centreX = centrePointLocation.x;
    const centreY = centrePointLocation.y;

    const objectLocation = {
        x: centreX + Math.cos(angleWithCentrepoint) * distanceToCentre,
        y: centreY + Math.sin(angleWithCentrepoint) * distanceToCentre
    }

    return objectLocation;
}