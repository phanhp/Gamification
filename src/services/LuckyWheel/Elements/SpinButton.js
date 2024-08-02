//------------------------- IMPORT -------------------------
import * as PIXI from "pixi.js";
// import { DropShadowFilter } from "pixi-filters";

//---------- SPIN BUTTON ----------
//----- spinButton
export async function spinButtonData(
    spinButtonParams,
    appWidth, appHeight,
    wheelRadius, wheelCentre) {
    const button = new PIXI.Graphics();

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
    let fontSize = spinButtonParams.fontSize;
    const fontFamily = spinButtonParams.fontFamily;
    const textColor = spinButtonParams.textColor;

    let buttonWidth = wheelRadius * relativeWidth + absoluteWidth;
    let buttonHeight = wheelRadius * relativeHeight + absoluteHeight;

    const buttonX = wheelCentre.x + appWidth * relativeX + absoluteX - buttonWidth / 2;
    const buttonY = wheelCentre.y + wheelRadius * relativeY + absoluteY - buttonHeight / 2;

    button.roundRect(0, 0, buttonWidth, buttonHeight, roundUp);
    button.fill({
        color: backgroundColor,
        alpha: backgroundColorAlpha
    })
    button.stroke({color: lineColor, width: lineSize});
    button.position.set(buttonX, buttonY);
    button.eventMode = "dynamic";
    button.buttonMode = true;
    button.cursor = 'pointer';

    const rescaleFontsize = wheelRadius/180;
    fontSize = fontSize * rescaleFontsize;
    const buttonText = new PIXI.Text({ text: text });
    buttonText.anchor.set(0.5, 0.5);
    const buttonTextStyle = new PIXI.TextStyle({
        fontFamily: fontFamily,
        fontSize: fontSize,
        fill: textColor
    })
    buttonText.position.set(buttonWidth / 2, buttonHeight / 2);
    buttonText.style = buttonTextStyle;
    button.text = buttonText;
    button.addChild(buttonText);

    return button;
}


