//------------------------- IMPORT -------------------------
import * as PIXI from "pixi.js";
// import { DropShadowFilter } from "pixi-filters";

//---------- BUTTON REACTIVE ----------
export function changeButtonStatus(
    wheelRadius,
    button, buttonText,
    width, height, roundUp,
    backgroundColor, backgroundColorAlpha,
    lineColor, lineSize,
    x, y,
    text, fontSize, fontFamily, textColor,
    textX, textY
) {
    button.clear();

    button.roundRect(0, 0, width, height, roundUp);
    button.cursor = 'pointer';
    button.fill({ color: backgroundColor, alpha: backgroundColorAlpha });
    button.stroke({ color: lineColor, width: lineSize });
    button.position.set(x, y);
    button.eventMode = "dynamic";
    button.buttonMode = true;

    buttonText.text = text;
    const rescaleFontsize = wheelRadius/180;
    fontSize = fontSize * rescaleFontsize;
    const textStyle = new PIXI.TextStyle({
        fontSize: fontSize,
        fontFamily: fontFamily,
        fill: textColor,
    })
    buttonText.style = textStyle;
    buttonText.position.set(textX, textY);
}