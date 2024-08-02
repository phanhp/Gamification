//------------------------- IMPORT -------------------------
import { convertSpriteSource, generateSprite, generateSpriteFromSource } from "@/services/GameUtils";
import { Asset } from "next/font/google";
import * as PIXI from "pixi.js";
// import { DropShadowFilter } from "pixi-filters";

//---------- PIXIJS APPLICATION ----------
//----- Tạo app
export async function pixiJsApplicationData(appParams) {
    let app;
    let appWidth;
    let appHeight;

    const appHandler = async () => {
        const appBackgroundColor = appParams.color;
        const appBackgroundColorAlpha = appParams.colorAlpha;
        app = new PIXI.Application();
        await app.init({
            resizeTo: window,
            background: appBackgroundColor,
            backgroundAlpha: appBackgroundColorAlpha
        });
        appWidth = app.canvas.width;
        appHeight = app.canvas.height;
    }
    await appHandler();

    let background;
    const appBackgroundHandler = async () => {
        const isPcBackgroundUsed = appParams.pcBackgroundUsed;
        const isMobileBackgroundUsed = appParams.mobileBackgroundUsed;

        if (appWidth >= appHeight) {
            if (isPcBackgroundUsed) {
                background = await appPcBackgroundData(appParams, appWidth, appHeight);
                app.stage.addChild(background);
            }
        } else {
            if (isMobileBackgroundUsed) {
                background = await appMobileBackgroundData(appParams, appWidth, appHeight);
                app.stage.addChild(background);
            }
        }
    }
    await appBackgroundHandler();

    return {
        app: app,
        appBackground: background,
        appWidth: appWidth,
        appHeight: appHeight
    };
}

export async function appMobileBackgroundData(appParams, appWidth, appHeight) {
    const source = appParams.mobileBackgroundSource;
    const relativeWidth = appParams.mobileBackgroundRelativeWidth;
    const relativeHeight = appParams.mobileBackgroundRelativeHeight;
    const absoluteWidth = appParams.mobileBackgroundAbsoluteWidth;
    const absoluteHeight = appParams.mobileBackgroundAbsoluteHeight;
    const relativeX = appParams.mobileBackgroundRelativeX;
    const relativeY = appParams.mobileBackgroundRelativeY;
    const absoluteX = appParams.mobileBackgroundAbsoluteX;
    const absoluteY = appParams.mobileBackgroundAbsoluteY;

    const backgroundSprite = await generateSprite(
        {
            parrentWidth: appWidth,
            parrentHeight: appHeight,
            source: source,
            widthRate: 0,
            heightRate: 0,
            relativeWidth: relativeWidth,
            relativeHeight: relativeHeight,
            absoluteWidth: absoluteWidth,
            absoluteHeight: absoluteHeight,
            relativeX: relativeX,
            relativeY: relativeY,
            absoluteX: absoluteX,
            absoluteY: absoluteY
        });
    return backgroundSprite;
}

export async function appPcBackgroundData(appParams, appWidth, appHeight) {
    const source = appParams.pcBackgroundSource;
    const relativeWidth = appParams.pcBackgroundRelativeWidth;
    const relativeHeight = appParams.pcBackgroundRelativeHeight;
    const absoluteWidth = appParams.pcBackgroundAbsoluteWidth;
    const absoluteHeight = appParams.pcBackgroundAbsoluteHeight;
    const relativeX = appParams.pcBackgroundRelativeX;
    const relativeY = appParams.pcBackgroundRelativeY;
    const absoluteX = appParams.pcBackgroundAbsoluteX;
    const absoluteY = appParams.pcBackgroundAbsoluteY;

    const backgroundSprite = await generateSprite(
        {
            parrentWidth: appWidth,
            parrentHeight: appHeight,
            source: source,
            widthRate: 0,
            heightRate: 0,
            relativeWidth: relativeWidth,
            relativeHeight: relativeHeight,
            absoluteWidth: absoluteWidth,
            absoluteHeight: absoluteHeight,
            relativeX: relativeX,
            relativeY: relativeY,
            absoluteX: absoluteX,
            absoluteY: absoluteY
        });
    return backgroundSprite;
}