//------------------------- IMPORT -------------------------
import { generateSpriteFromSource } from "@/services/GameUtils";
import * as PIXI from "pixi.js";
// import { DropShadowFilter } from "pixi-filters";

//---------- REWARD MESSAGE BOX ----------
//----- messageBox
export async function messageBoxData(messageBoxParams, appWidth, appHeight, wheelRadius, wheelCentre) {
    const messageBox = new PIXI.Graphics();

    let width;
    let height;
    const handleBoxSize = () => {
        const boxRelativeWidth = messageBoxParams.boxRelativeWidth;
        const boxRelativeHeight = messageBoxParams.boxRelativeHeight;
        const boxAbsoluteWidth = messageBoxParams.boxAbsoluteWidth;
        const boxAbsoluteHeight = messageBoxParams.boxAbsoluteHeight;
        const boxRoundup = messageBoxParams.boxRoundup;
        width = appWidth * boxRelativeWidth + boxAbsoluteWidth;
        height = wheelRadius * boxRelativeHeight + boxAbsoluteHeight;
        messageBox.roundRect(0, 0, width, height, boxRoundup);
    }
    handleBoxSize();

    const handleBoxShape = () => {
        const boxBackgroundColor = messageBoxParams.boxBackgroundColor;
        const boxBackgroundColorAlpha = messageBoxParams.boxBackgroundColorAlpha;
        const boxLineSize = messageBoxParams.boxLineSize;
        const boxLineColor = messageBoxParams.boxLineColor;
        messageBox.fill({ color: boxBackgroundColor, alpha: boxBackgroundColorAlpha });
        messageBox.stroke({ color: boxLineColor, width: boxLineSize });
    }
    handleBoxShape();

    const handleBoxPosition = () => {
        const boxRelativeX = messageBoxParams.boxRelativeX;
        const boxRelativeY = messageBoxParams.boxRelativeY;
        const boxRelativeAngle = messageBoxParams.boxRelativeAngle;
        const boxAbsoluteX = messageBoxParams.boxAbsoluteX;
        const boxAbsoluteY = messageBoxParams.boxAbsoluteY;
        const x = wheelCentre.x + (wheelRadius * boxRelativeX) * Math.cos(boxRelativeAngle) + boxAbsoluteX - messageBox.width / 2;
        const y = wheelCentre.y + (wheelRadius * boxRelativeY) * Math.sin(boxRelativeAngle) + boxAbsoluteY - messageBox.height / 2;
        messageBox.position.set(x, y);
    }
    handleBoxPosition();

    const handleAddTitleImage = async () => {
        const spriteSource = messageBoxParams.titleImageSource;
        const sprite = await generateSpriteFromSource(spriteSource);

        sprite.anchor.set(0.5, 0.5);

        const spriteSizeHandler = () => {
            const titleWidthRate = messageBoxParams.titleWidthRate;
            const titleHeightRate = messageBoxParams.titleHeightRate;
            const titleRelativeWidth = messageBoxParams.titleRelativeWidth;
            const titleRelativeHeight = messageBoxParams.titleRelativeHeight;
            const titleAbsoluteWidth = messageBoxParams.titleAbsoluteWidth;
            const titleAbsoluteHeight = messageBoxParams.titleAbsoluteHeight;
            const differentSpriteHeightWidthRate = sprite.height / sprite.width;
            const parrentSize = wheelRadius;
            const spriteWidth = sprite.width * titleWidthRate + parrentSize * titleRelativeWidth + titleAbsoluteWidth;
            const spriteHeight = sprite.height * titleHeightRate + parrentSize * titleRelativeHeight * differentSpriteHeightWidthRate + titleAbsoluteHeight;
            const scaleX = spriteWidth / sprite.width;
            const scaleY = spriteHeight / sprite.height;
            sprite.scale.set(scaleX, scaleY);
        }
        spriteSizeHandler();

        const spritePositionHandler = () => {
            const titleRelativeX = messageBoxParams.titleRelativeX;
            const titleRelativeY = messageBoxParams.titleRelativeY;
            const titleAbsoluteX = messageBoxParams.titleAbsoluteX;
            const titleAbsoluteY = messageBoxParams.titleAbsoluteY;
            const x = width * titleRelativeX + titleAbsoluteX;
            const y = height * titleRelativeY + titleAbsoluteY;
            sprite.position.set(x, y);
        }
        spritePositionHandler();

        messageBox.titleImage = sprite;
        messageBox.addChild(sprite);
    }
    await handleAddTitleImage();

    const button = messageBoxButton(messageBoxParams, wheelRadius, width, height);

    messageBox.button = button;
    messageBox.addChild(button);

    messageBox.visible = false;

    return {
        messageBox: messageBox,
        width: width,
        height: height
    };
}

//----- messageRewardImage
export async function messageBoxRewardImage(messageBoxParams, imageSource, messageBoxWidth, messageBoxHeight) {
    const sprite = await generateSpriteFromSource(imageSource);

    sprite.anchor.set(0.5, 0.5);

    const imageSizeHandler = () => {
        const widthRate = messageBoxParams.imageWidthRate;
        const heightRate = messageBoxParams.imageHeightRate;
        const relativeWidth = messageBoxParams.imageRelativeWidth;
        const relativeHeight = messageBoxParams.imageRelativeHeight;
        const absoluteWidth = messageBoxParams.imageAbsoluteWidth;
        const absoluteHeight = messageBoxParams.imageAbsoluteHeight;
        const parrentSize = messageBoxHeight;
        const differentSpriteWidthHeightRate = sprite.width / sprite.height;
        const width = sprite.width * widthRate + parrentSize * relativeWidth * differentSpriteWidthHeightRate + absoluteWidth;
        const height = sprite.height * heightRate + parrentSize * relativeHeight + absoluteHeight;
        const scaleX = width / sprite.width;
        const scaleY = height / sprite.height;
        sprite.scale.set(scaleX, scaleY);
    }
    imageSizeHandler();

    const imagePositionHandler = () => {
        const relativeX = messageBoxParams.imageRelativeX;
        const relativeY = messageBoxParams.imageRelativeY;
        const absoluteX = messageBoxParams.imageAbsoluteWidth;
        const absoluteY = messageBoxParams.imageAbsoluteHeight;
        const x = messageBoxWidth * relativeX + absoluteX;
        const y = messageBoxHeight * relativeY + absoluteY;
        sprite.position.set(x, y);
    }
    imagePositionHandler();

    return sprite;
}

//----- messageRewardName
export function messageBoxRewardName(messageBoxParams, rewardName, messageBoxWidth, messageBoxHeight) {
    const text = new PIXI.Text({ text: rewardName });
    text.anchor.set(0.5, 0.5);

    const handleTextStyle = () => {
        const fontFamily = messageBoxParams.nameFontFamily;
        const fontSize = messageBoxParams.nameFontSize;
        const color = messageBoxParams.nameColor;
        const textStyle = new PIXI.TextStyle({
            fontFamily: fontFamily,
            fontSize: fontSize,
            fill: color
        })
        text.style = textStyle;
    }
    handleTextStyle();

    const handleTextPosition = () => {
        const relativeX = messageBoxParams.nameRelativeX;
        const relativeY = messageBoxParams.nameRelativeY;
        const absoluteX = messageBoxParams.nameAbsoluteX;
        const absoluteY = messageBoxParams.nameAbsoluteY;
        const x = messageBoxWidth * relativeX + absoluteX;
        const y = messageBoxHeight * relativeY + absoluteY;
        text.position.set(x, y);
    }
    handleTextPosition();

    return text;
}

//----- messageBoxButton
export function messageBoxButton(messageBoxParams, wheelRadius, messageBoxWidth, messageBoxHeight) {
    const button = new PIXI.Graphics();

    const relativeWidth = messageBoxParams.buttonRelativeWidth;
    const relativeHeight = messageBoxParams.buttonRelativeHeight;
    const absoluteWidth = messageBoxParams.buttonAbsoluteWidth;
    const absoluteHeight = messageBoxParams.buttonAbsoluteHeight;
    const roundUp = messageBoxParams.buttonRoundup;
    const buttonWidth = wheelRadius * relativeWidth + absoluteWidth;
    const buttonHeight = wheelRadius * relativeHeight + absoluteHeight;
    button.roundRect(0, 0, buttonWidth, buttonHeight, roundUp);

    const backgroundColor = messageBoxParams.buttonColor;
    const backgroundColorAlpha = messageBoxParams.buttonColorAlpha;
    const lineColor = messageBoxParams.buttonLineColor;
    const lineSize = messageBoxParams.buttonLineSize;
    button.fill({ color: backgroundColor, alpha: backgroundColorAlpha });
    button.stroke({ color: lineColor, width: lineSize });

    const relativeX = messageBoxParams.buttonRelativeX;
    const relativeY = messageBoxParams.buttonRelativeY;
    const absoluteX = messageBoxParams.buttonAbsoluteX;
    const absoluteY = messageBoxParams.buttonAbsoluteY;
    const x = messageBoxWidth * relativeX + absoluteX - buttonWidth / 2;
    const y = messageBoxHeight * relativeY + absoluteY - buttonHeight / 2;
    button.position.set(x, y);

    button.cursor = 'pointer';
    button.eventMode = "dynamic";
    button.buttonMode = true;

    const text = messageBoxParams.buttonText;
    const buttonText = new PIXI.Text({ text: text });
    buttonText.anchor.set(0.5, 0.5);

    const fontFamily = messageBoxParams.buttonTextFontFamily;
    const fontSize = messageBoxParams.buttonTextFontSize;
    const color = messageBoxParams.buttonTextColor;
    const textStyle = new PIXI.TextStyle({
        fontFamily: fontFamily,
        fontSize: fontSize,
        fill: color
    });
    buttonText.style = textStyle;

    const textRelativeX = messageBoxParams.buttonTextRelativeX;
    const textRelativeY = messageBoxParams.buttonTextRelativeY;
    const textAbsoluteX = messageBoxParams.buttonTextAbsoluteX;
    const textAbsoluteY = messageBoxParams.buttonTextAbsoluteY;
    const textX = buttonWidth * textRelativeX + textAbsoluteX;
    const textY = buttonHeight * textRelativeY + textAbsoluteY;
    buttonText.position.set(textX, textY);

    button.text = buttonText;
    button.addChild(buttonText);
    return button;
}

