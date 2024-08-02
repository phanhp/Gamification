//------------------------- IMPORT -------------------------

import { generatePercentageListFromRewardList } from "@/services/GameUtils";
import { convertDegreeToRadians, multiTenOfDecimal, radiansOfCircle, shuffleArray } from "@/services/Utils";
import { messageBoxRewardImage, messageBoxRewardName } from "../../../Elements/RewardMessageBox";

import { changeButtonStatus } from "./ButtonReactive";

//---------- FUNCTION ----------
export function spinButtonPointerOver(spinButtonParams, button, appWidth, appHeight, wheelRadius, wheelCentre) {
    const hoverRelativeWidth = spinButtonParams.hoverRelativeWidth;
    const hoverRelativeHeight = spinButtonParams.hoverRelativeHeight;
    const hoverAbsoluteWidth = spinButtonParams.hoverAbsoluteWidth;
    const hoverAbsoluteHeight = spinButtonParams.hoverAbsoluteHeight;
    const buttonHoverRoundup = spinButtonParams.hoverRoundUp;

    const hoverBackgroundColor = spinButtonParams.hoverBackgroundColor;
    const hoverBackgroundColorAlpha = spinButtonParams.hoverBackgroundColorAlpha;
    const hoverLineColor = spinButtonParams.hoverLineColor;
    const hoverLineSize = spinButtonParams.hoverLineSize;

    const hoverRelativeX = spinButtonParams.hoverRelativeX;
    const hoverRelativeY = spinButtonParams.hoverRelativeY;
    const hoverAbsoluteX = spinButtonParams.hoverAbsoluteX;
    const hoverAbsoluteY = spinButtonParams.hoverAbsoluteY;

    const hoverText = spinButtonParams.hoverText;
    const hoverFontFamily = spinButtonParams.hoverFontFamily;
    const hoverFontSize = spinButtonParams.hoverFontSize;
    const hoverTextColor = spinButtonParams.hoverTextColor;

    const buttonHoverWidth = wheelRadius * hoverRelativeWidth + hoverAbsoluteWidth;
    const buttonHoverHeight = wheelRadius * hoverRelativeHeight + hoverAbsoluteHeight;
    const buttonHoverX = wheelCentre.x + appWidth * hoverRelativeX + hoverAbsoluteX - buttonHoverWidth / 2;
    const buttonHoverY = wheelCentre.y + wheelRadius * hoverRelativeY + hoverAbsoluteY - buttonHoverHeight / 2;
    const hoverTextX = buttonHoverWidth / 2;
    const hoverTextY = buttonHoverHeight / 2;

    changeButtonStatus(
        wheelRadius,
        button, button.text,
        buttonHoverWidth, buttonHoverHeight, buttonHoverRoundup,
        hoverBackgroundColor, hoverBackgroundColorAlpha, hoverLineColor, hoverLineSize, buttonHoverX, buttonHoverY,
        hoverText, hoverFontSize, hoverFontFamily, hoverTextColor,
        hoverTextX, hoverTextY
    );
}

export function spinButtonPointerOut(spinButtonParams, button, appWidth, appHeight, wheelRadius, wheelCentre) {
    const relativeWidth = spinButtonParams.relativeWidth;
    const relativeHeight = spinButtonParams.relativeHeight;
    const absoluteWidth = spinButtonParams.absoluteWidth;
    const absoluteHeight = spinButtonParams.absoluteHeight;
    const roundUp = spinButtonParams.roundUp;

    const backgroundColor = spinButtonParams.backgroundColor;
    const backgroundColorAlpha = spinButtonParams.backgroundColorAlpha;
    const lineColor = spinButtonParams.lineColor;
    const lineSize = spinButtonParams.lineSize;

    const relativeX = spinButtonParams.relativeX;
    const relativeY = spinButtonParams.relativeY;
    const absoluteX = spinButtonParams.absoluteWidth;
    const absoluteY = spinButtonParams.absoluteY;

    const text = spinButtonParams.text;
    const fontSize = spinButtonParams.fontSize;
    const fontFamily = spinButtonParams.fontFamily;
    const textColor = spinButtonParams.textColor;

    const buttonWidth = wheelRadius * relativeWidth + absoluteWidth;
    const buttonHeight = wheelRadius * relativeHeight + absoluteHeight;
    const buttonX = wheelCentre.x + appWidth * relativeX + absoluteX - buttonWidth / 2;
    const buttonY = wheelCentre.y + wheelRadius * relativeY + absoluteY - buttonHeight / 2;

    const textX = buttonWidth / 2;
    const textY = buttonHeight / 2;

    changeButtonStatus(
        wheelRadius,
        button, button.text,
        buttonWidth, buttonHeight, roundUp,
        backgroundColor, backgroundColorAlpha, lineColor, lineSize,
        buttonX, buttonY, text, fontSize, fontFamily, textColor,
        textX, textY
    );
}

export async function doSpinWheel(
    messageBoxParams,
    spinButton, rewardList, wheelPartList, wheelContainer, messageBox,
    messageBoxWidth, messageBoxHeight) {
    spinButton.eventMode = "none";
    const randomReward = randomRewardPicker(rewardList);
    const rewardIndex = getIndexOfReward(randomReward, rewardList);
    const randomWheelPart = wheelPartList[rewardIndex];
    const rewardName = randomReward.name;
    const rewardImage = randomReward.image;

    //Animation
    const minAngle = randomWheelPart.minAngle;
    const maxAngle = randomWheelPart.maxAngle;
    const repeatSpins = 4 + Math.floor(Math.random() * (4 - 8) + 4);
    const repeatAngle = repeatSpins * radiansOfCircle();
    const randomAngle = Math.random() * (maxAngle - minAngle) + minAngle;
    let stopAngle = radiansOfCircle() - randomAngle;
    const pointerAngle = convertDegreeToRadians(270);
    const totalRotateAngle = repeatAngle + stopAngle + pointerAngle;

    const duration = 4000 + Math.random() * 2000;

    let start = null;
    const animate = async (timestamp) => {
        if (!start) start = timestamp;
        const progress = (timestamp - start) / duration;

        if (progress < 1) {
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            wheelContainer.rotation = easeProgress * totalRotateAngle;
            requestAnimationFrame(animate);
        } else {
            wheelContainer.rotation = totalRotateAngle;
            await messageBoxReveal(messageBoxParams, messageBox, messageBoxWidth, messageBoxHeight, rewardName, rewardImage);
        }
    }
    requestAnimationFrame(animate);
}

export function randomRewardPicker(rewardList) {
    const randomRewardList = generateRandomRewardList(rewardList);
    let randomReward;
    do {
        randomReward = _.sample(randomRewardList);
    } while (randomReward.amount <= 0 && randomReward.limitType === "limited");

    return randomReward;
}

export function generateRandomRewardList(rewardList) {
    const randomRewardList = [];
    const percentageList = generatePercentageListFromRewardList(rewardList, 3);
    const multiTen = multiTenOfDecimal(percentageList);
    for (let i = 0; i < rewardList.length; i++) {
        const numberOfSegment = percentageList[i] * multiTen;
        for (let j = 0; j < numberOfSegment; j++) {
            const reward = rewardList[i];
            randomRewardList.push(reward);
        }
    }
    return shuffleArray(randomRewardList);
}

export function getIndexOfReward(reward, rewardList) {
    for (let i = 0; i < rewardList.length; i++) {
        if (rewardList[i].id === reward.id) {
            return i;
        }
    }
    throw new Error("Can not find index of reward");
}

export async function messageBoxReveal(messageBoxParams, messageBox, messageBoxWidth, messageBoxHeight, rewardName, rewardImage) {
    const rewardImageSprite = await messageBoxRewardImage(messageBoxParams, rewardImage, messageBoxWidth, messageBoxHeight);
    const rewardNameSprite = messageBoxRewardName(messageBoxParams, rewardName, messageBoxWidth, messageBoxHeight);
    messageBox.rewardImage = rewardImageSprite;
    messageBox.rewardName = rewardNameSprite;
    messageBox.addChild(rewardImageSprite);
    messageBox.addChild(rewardNameSprite);
    messageBox.visible = true;
}