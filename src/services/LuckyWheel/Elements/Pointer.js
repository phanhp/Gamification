//------------------------- IMPORT -------------------------
import { generateSprite, generateSpriteFromSource } from "@/services/GameUtils";
import { convertDegreeToRadians, radiansOfCircle } from "@/services/Utils";
import { Asset } from "next/font/google";
import * as PIXI from "pixi.js";
// import { DropShadowFilter } from "pixi-filters";

//---------- POINTER ----------
export async function pointerData(pointerParams, wheelCentre, wheelRadius) {
    const source = pointerParams.imageSource;
    const sprite = await generateSpriteFromSource(source);

    const handlePointerAnchor = () => {
        const anchorX = pointerParams.anchorX;
        const anchorY = pointerParams.anchorY;
        sprite.anchor.set(anchorX, anchorY);
    }
    handlePointerAnchor();

    const handlePointerSize = () => {
        const wheelWidthRate = pointerParams.wheelWidthRate;
        const wheelHeightRate = pointerParams.wheelHeightRate;
        const absoluteWidth = pointerParams.absoluteWidth;
        const absoluteHeight = pointerParams.absoluteHeight;
        const scaleWidth = (wheelRadius * wheelWidthRate + absoluteWidth) / sprite.width;
        const scaleHeight = (wheelRadius * wheelHeightRate + absoluteHeight) / sprite.height;
        const scale = Math.min(scaleWidth, scaleHeight);
        sprite.scale.set(scale);
    }
    handlePointerSize();

    const handlePointerPosition = () => {
        const relativeX = pointerParams.relativeX;
        const relativeY = pointerParams.relativeY;
        const relativeAngle = pointerParams.relativeAngle;
        const absoluteX = pointerParams.absoluteX;
        const absoluteY = pointerParams.absoluteY;
        const x = wheelCentre.x + (wheelRadius * relativeX) * Math.cos(relativeAngle) + absoluteX;
        const y = wheelCentre.y + (wheelRadius * relativeY) * Math.sin(relativeAngle) + absoluteY;
        sprite.position.set(x, y);
    }
    handlePointerPosition();

    return sprite;
}