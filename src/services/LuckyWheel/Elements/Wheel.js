//------------------------- IMPORT -------------------------
import { generateSprite, generateSpriteFromSource } from "@/services/GameUtils";
import { convertDegreeToRadians, radiansOfCircle } from "@/services/Utils";
import * as PIXI from "pixi.js";
// import { DropShadowFilter } from "pixi-filters";

//---------- LUCKYWHEEL ----------
//----- wheelContainer
export async function luckyWheelData(wheelContainerParams, appWidth, appHeight) {
    let wheelRadius;
    const wheelRadiusHandler = () => {
        const relativeWheelRadius = wheelContainerParams.relativeWheelRadius;
        const absoluteWheelRadius = wheelContainerParams.absoluteWheelRadius;
        const maxRadiusByWidth = appWidth / 2.35;
        const maxRadiusByHeight = appHeight / 3.85;
        const minRadiusByAppSize = Math.min(maxRadiusByWidth, maxRadiusByHeight)

        wheelRadius = minRadiusByAppSize * relativeWheelRadius + absoluteWheelRadius;
    }
    wheelRadiusHandler();

    let wheelCentre;
    const wheelCentreHandler = () => {
        const absoluteX = wheelContainerParams.absoluteX;
        const absoluteY = wheelContainerParams.absoluteY;
        const relativeX = wheelContainerParams.relativeX;
        const relativeY = wheelContainerParams.relativeY;

        const wheelCentreX = appWidth * relativeX + absoluteX;
        const wheelCentreY = appHeight * relativeY + absoluteY;
        wheelCentre = { x: wheelCentreX, y: wheelCentreY };
    }
    wheelCentreHandler();

    let wheelContainer;
    const wheelContainerHandler = () => {
        wheelContainer = new PIXI.Container();
        wheelContainer.position.set(wheelCentre.x, wheelCentre.y);
    }
    wheelContainerHandler();

    return {
        wheelContainer: wheelContainer,
        wheelRadius: wheelRadius,
        wheelCentre: wheelCentre
    }
}

//----- wheelPartList
export async function wheelPartListData(
    rewardList, baseColorList, wheelImageParams, wheelNameParams,
    wheelRadius, wheelCentre
) {
    const wheelPartList = [];
    const colorList = wheelPartColorList(rewardList.length, baseColorList);
    const anglePerWheelPart = radiansOfCircle() / rewardList.length;

    for (let i = 0; i < rewardList.length; i++) {
        const reward = rewardList[i];
        const color = colorList[i];
        const minAngle = anglePerWheelPart * i;
        const maxAngle = anglePerWheelPart * (i + 1);
        const colorData = color.colorData;
        const colorAlpha = color.colorAlpha;
        const wheelPartAngle = (minAngle + maxAngle) / 2;

        const graphic = await drawWheelPartGraphic(wheelRadius, colorData, colorAlpha, minAngle, maxAngle);
        const rewardImage = await drawWheelPartRewardImage(wheelImageParams, reward.image, wheelRadius, wheelPartAngle);
        const rewardName = await drawWheelPartRewardName(wheelNameParams, reward.name, wheelRadius, wheelPartAngle);

        const wheelPart = {
            reward: reward,
            minAngle: minAngle,
            maxAngle: maxAngle,
            angle: wheelPartAngle,
            wheelPartGraphic: graphic,
            rewardImage: rewardImage,
            rewardName: rewardName,
        }

        wheelPartList.push(wheelPart);
    }

    return wheelPartList;
}

//----- wheelPart colorList
export function wheelPartColorList(numberOfWheelPart, baseColorList) {
    const colorList = [];
    for (let i = 0; i < numberOfWheelPart; i++) {
        const color = baseColorList[i % baseColorList.length];
        colorList.push(color);
    }
    return colorList;
}



//----- wheelPart graphic
export async function drawWheelPartGraphic(wheelRadius, colorData, colorAlpha, minAngle, maxAngle) {
    const graphic = new PIXI.Graphics();
    graphic.moveTo(0, 0);
    graphic.arc(0, 0, wheelRadius, minAngle, maxAngle);
    graphic.lineTo(0, 0);
    graphic.stroke({ color: 'white', width: 2 });
    graphic.fill({ color: colorData, alpha: colorAlpha });
    return graphic;
}

//----- wheelPart image
export async function drawWheelPartRewardImage(wheelImageParams, imageSource, wheelRadius, wheelPartAngle) {
    const widthRate = wheelImageParams.widthRate;
    const heightRate = wheelImageParams.heightRate;
    const relativeWidth = wheelImageParams.relativeWidth;
    const relativeHeight = wheelImageParams.relativeHeight;
    const absoluteWidth = wheelImageParams.absoluteWidth;
    const absoluteHeight = wheelImageParams.absoluteHeight;

    const relativeDistance = wheelImageParams.relativeDistance;
    const absoluteDistance = wheelImageParams.absoluteDistance;
    const distanceToWheelCentre = wheelRadius * relativeDistance + absoluteDistance;
    const adjustX = wheelImageParams.adjustX;
    const adjustY = wheelImageParams.adjustY;
    const adjustAngle = wheelImageParams.adjustAngle;
    const angleOfImage = wheelPartAngle + adjustAngle;
    const absoluteX = Math.cos(angleOfImage) * distanceToWheelCentre + adjustX;
    const absoluteY = Math.sin(angleOfImage) * distanceToWheelCentre + adjustY;

    const isRotateFixed = wheelImageParams.rotateFixed;
    const rotateAngle = convertDegreeToRadians(wheelImageParams.rotateAngle);
    const baseRotateAngle = radiansOfCircle() / 4;
    let imageRotateAngle = angleOfImage + rotateAngle + baseRotateAngle;
    if (isRotateFixed) {
        imageRotateAngle = rotateAngle;
    }

    try {
        const sprite = await generateSprite({
            parrentWidth: wheelRadius,
            parrentHeight: wheelRadius,
            source: imageSource,
            widthRate: widthRate,
            heightRate: heightRate,
            relativeWidth: relativeWidth,
            relativeHeight: relativeHeight,
            absoluteWidth: absoluteWidth,
            absoluteHeight: absoluteHeight,
            relativeX: 0,
            relativeY: 0,
            absoluteX: absoluteX,
            absoluteY: absoluteY,
            rotateAngle: imageRotateAngle
        });

        return sprite;
    } catch (error) {
        console.error(error.message);
        return;
    }
}

//----- wheelPart name
export async function drawWheelPartRewardName(wheelNameParams, rewardName, wheelRadius, wheelPartAngle) {
    const fontFamily = wheelNameParams.fontFamily;
    const color = wheelNameParams.color;
    let fontSize = wheelNameParams.fontSize;
    const text = new PIXI.Text({ text: rewardName });
    const rescaleFontsize = wheelRadius / 180;
    fontSize = fontSize * rescaleFontsize;
    const textStyle = new PIXI.TextStyle({
        fontFamily: fontFamily,
        fontSize: fontSize,
        fill: color
    });
    text.style = textStyle;
    text.anchor.set(0.5, 0.5);

    const relativeDistance = wheelNameParams.relativeDistance;
    const absoluteDistance = wheelNameParams.absoluteDistance;
    const distanceToWheelCentre = wheelRadius * relativeDistance + absoluteDistance;
    const adjustX = wheelNameParams.adjustX;
    const adjustY = wheelNameParams.adjustY;
    const adjustAngle = wheelNameParams.adjustAngle;
    const angleOfImage = wheelPartAngle + adjustAngle;
    const x = Math.cos(angleOfImage) * distanceToWheelCentre + adjustX;
    const y = Math.sin(angleOfImage) * distanceToWheelCentre + adjustY;
    text.position.set(x, y);

    const isRotateFixed = wheelNameParams.rotateFixed;
    const rotateAngle = convertDegreeToRadians(wheelNameParams.rotateAngle);
    const baseRotateAngle = radiansOfCircle() / 4;
    let textRotate = angleOfImage + rotateAngle + baseRotateAngle;
    if (isRotateFixed) {
        textRotate = rotateAngle;
    }
    text.rotation = textRotate;

    return text;
}
