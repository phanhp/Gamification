//------------------------- IMPORT -------------------------
import { isPressed } from "@/services/Utils";
import * as PIXI from "pixi.js";
import { claimReward, messageBoxButtonPoiterOut, messageBoxButtonPoiterOver } from "./Services/ActiveCommands/MessageBoxButtonCommand";
import { doSpinWheel, spinButtonPointerOut, spinButtonPointerOver } from "./Services/ActiveCommands/SpinButtonFunctionCommand";
// import { DropShadowFilter } from "pixi-filters";

//---------- FUNCTION ----------
//spinButton
export function spinButtonAction(
    spinButtonParams, messageBoxParams,
    button, rewardList, wheelPartList, wheelContainer, messageBox,
    appWidth, appHeight,
    wheelRadius, wheelCentre,
    messageBoxWidth, messageBoxHeight,
    beginTouchTime, endTouchTime
) {
    button.on('pointerover', () => {
        spinButtonPointerOver(spinButtonParams, button, appWidth, appHeight, wheelRadius, wheelCentre);
        beginTouchTime = Date.now();
    });

    button.on('pointerout', () => {
        spinButtonPointerOut(spinButtonParams, button, appWidth, appHeight, wheelRadius, wheelCentre);
    });

    button.on('pointerdown', () => {
        spinButtonPointerOver(spinButtonParams, button, appWidth, appHeight, wheelRadius, wheelCentre);
        beginTouchTime = Date.now();
    });

    button.on('pointerup', async () => {
        spinButtonPointerOut(spinButtonParams, button, appWidth, appHeight, wheelRadius, wheelCentre);
        endTouchTime = Date.now();
        if (isPressed(beginTouchTime, endTouchTime)) {
            await doSpinWheel(messageBoxParams, button, rewardList, wheelPartList, wheelContainer, messageBox, messageBoxWidth, messageBoxHeight);
        } else {
            spinButtonPointerOut(spinButtonParams, button, appWidth, appHeight, wheelRadius, wheelCentre);
        }
    });

    button.on('touchstart', () => {
        spinButtonPointerOver(spinButtonParams, button, appWidth, appHeight, wheelRadius, wheelCentre);
        beginTouchTime = Date.now();
    });

    button.on('touchend', async () => {
        spinButtonPointerOut(spinButtonParams, button, appWidth, appHeight, wheelRadius, wheelCentre);
        endTouchTime = Date.now();
        if (isPressed(beginTouchTime, endTouchTime)) {
            await doSpinWheel(messageBoxParams, button, rewardList, wheelPartList, wheelContainer, messageBox, messageBoxWidth, messageBoxHeight);
        } else {
            spinButtonPointerOut(spinButtonParams, button, appWidth, appHeight, wheelRadius, wheelCentre);
        }
    });
}

//messageBoxButton
export function messageBoxButtonAction(
    messageBoxParams,
    button, spinButton, messageBox,
    messageBoxWidth, messageBoxHeight,
    wheelRadius,
    beginTouchTime, endTouchTime
) {
    button.on('pointerover', () => {
        messageBoxButtonPoiterOver(
            messageBoxParams, button,
            messageBoxWidth, messageBoxHeight,
            wheelRadius);
    });

    button.on('pointerout', () => {
        messageBoxButtonPoiterOut(
            messageBoxParams, button,
            messageBoxWidth, messageBoxHeight,
            wheelRadius);
    })

    button.on('pointerdown', () => {
        claimReward(messageBox, spinButton);
    })
}