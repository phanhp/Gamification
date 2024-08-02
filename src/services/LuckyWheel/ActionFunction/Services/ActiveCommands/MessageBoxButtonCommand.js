//------------------------- IMPORT -------------------------
import { changeButtonStatus } from "./ButtonReactive";

//---------- FUNCTION ----------
export function messageBoxButtonPoiterOver(
    messageBoxParams, button,
    messageBoxWidth, messageBoxHeight,
    wheelRadius) {
    const buttonHoverRelativeWidth = messageBoxParams.buttonHoverRelativeWidth;
    const buttonHoverRelativeHeight = messageBoxParams.buttonHoverRelativeHeight;
    const buttonHoverAbsoluteWidth = messageBoxParams.buttonHoverAbsoluteWidth;
    const buttonHoverAbsoluteHeight = messageBoxParams.buttonHoverAbsoluteHeight;
    const buttonHoverRoundup = messageBoxParams.buttonHoverRoundup;

    const buttonHoverColor = messageBoxParams.buttonHoverColor;
    const buttonHoverColorAlpha = messageBoxParams.buttonHoverColorAlpha;
    const buttonHoverLineColor = messageBoxParams.buttonHoverLineColor;
    const buttonHoverLineSize = messageBoxParams.buttonHoverLineSize;

    const buttonHoverRelativeX = messageBoxParams.buttonHoverRelativeX;
    const buttonHoverRelativeY = messageBoxParams.buttonHoverRelativeY;
    const buttonHoverAbsoluteX = messageBoxParams.buttonHoverAbsoluteX;
    const buttonHoverAbsoluteY = messageBoxParams.buttonHoverAbsoluteY;

    const buttonHoverText = messageBoxParams.buttonHoverText;
    const buttonHoverTextFontFamily = messageBoxParams.buttonHoverTextFontFamily;
    const buttonHoverTextFontSize = messageBoxParams.buttonHoverTextFontSize;
    const buttonHoverTextColor = messageBoxParams.buttonHoverTextColor;
    const buttonHoverTextRelativeX = messageBoxParams.buttonHoverTextRelativeX;
    const buttonHoverTextRelativeY = messageBoxParams.buttonHoverTextRelativeY;
    const buttonHoverTextAbsoluteX = messageBoxParams.buttonHoverTextAbsoluteX;
    const buttonHoverTextAbsoluteY = messageBoxParams.buttonHoverTextAbsoluteY;

    const buttonHoverWidth = wheelRadius * buttonHoverRelativeWidth + buttonHoverAbsoluteWidth;
    const buttonHoverHeight = wheelRadius * buttonHoverRelativeHeight + buttonHoverAbsoluteHeight;
    const buttonHoverX = messageBoxWidth * buttonHoverRelativeX + buttonHoverAbsoluteX - buttonHoverWidth / 2;
    const buttonHoverY = messageBoxHeight * buttonHoverRelativeY + buttonHoverAbsoluteY - buttonHoverHeight / 2;
    const buttonHoverTextX = buttonHoverWidth * buttonHoverTextRelativeX + buttonHoverTextAbsoluteX;
    const buttonHoverTextY = buttonHoverHeight * buttonHoverTextRelativeY + buttonHoverTextAbsoluteY;

    changeButtonStatus(
        wheelRadius,
        button, button.text, buttonHoverWidth, buttonHoverHeight, buttonHoverRoundup,
        buttonHoverColor, buttonHoverColorAlpha, buttonHoverLineColor, buttonHoverLineSize, buttonHoverX, buttonHoverY,
        buttonHoverText, buttonHoverTextFontSize, buttonHoverTextFontFamily, buttonHoverTextColor,
        buttonHoverTextX, buttonHoverTextY
    );
}

export function messageBoxButtonPoiterOut(
    messageBoxParams, button,
    messageBoxWidth, messageBoxHeight,
    wheelRadius) {
    const relativeWidth = messageBoxParams.buttonRelativeWidth;
    const relativeHeight = messageBoxParams.buttonRelativeHeight;
    const absoluteWidth = messageBoxParams.buttonAbsoluteWidth;
    const absoluteHeight = messageBoxParams.buttonAbsoluteHeight;
    const roundUp = messageBoxParams.buttonRoundup;
    const backgroundColor = messageBoxParams.buttonColor;
    const backgroundColorAlpha = messageBoxParams.buttonColorAlpha;
    const lineColor = messageBoxParams.buttonLineColor;
    const lineSize = messageBoxParams.buttonLineSize;
    const relativeX = messageBoxParams.buttonRelativeX;
    const relativeY = messageBoxParams.buttonRelativeY;
    const absoluteX = messageBoxParams.buttonAbsoluteX;
    const absoluteY = messageBoxParams.buttonAbsoluteY;

    const text = messageBoxParams.buttonText;
    const fontFamily = messageBoxParams.buttonTextFontFamily;
    const fontSize = messageBoxParams.buttonTextFontSize;
    const color = messageBoxParams.buttonTextColor;
    const textRelativeX = messageBoxParams.buttonTextRelativeX;
    const textRelativeY = messageBoxParams.buttonTextRelativeY;
    const textAbsoluteX = messageBoxParams.buttonTextAbsoluteX;
    const textAbsoluteY = messageBoxParams.buttonTextAbsoluteY;

    const buttonWidth = wheelRadius * relativeWidth + absoluteWidth;
    const buttonHeight = wheelRadius * relativeHeight + absoluteHeight;
    const x = messageBoxWidth * relativeX + absoluteX - buttonWidth / 2;
    const y = messageBoxHeight * relativeY + absoluteY - buttonHeight / 2;
    const textX = buttonWidth * textRelativeX + textAbsoluteX;
    const textY = buttonHeight * textRelativeY + textAbsoluteY;

    changeButtonStatus(
        wheelRadius,
        button, button.text, buttonWidth, buttonHeight, roundUp,
        backgroundColor, backgroundColorAlpha, lineColor, lineSize, x, y,
        text, fontSize, fontFamily, color,
        textX, textY);
}

export function claimReward(messageBox, spinButton) {
    if (messageBox.rewardImage) {
        messageBox.removeChild(messageBox.rewardImage);
        messageBox.rewardImage = null;
    }

    if (messageBox.rewardName) {
        messageBox.removeChild(messageBox.rewardName);
        messageBox.rewardName = null;
    }

    spinButton.eventMode = "dynamic";
    messageBox.visible = false;
}