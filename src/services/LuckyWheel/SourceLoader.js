import { fetchDataFromApi } from "../Utils";

export async function loadPixiJsAppParamsFromDataBase(url = "http://localhost:8080/load-pixi-app") {
    // try {
    //     const response = await axios.get(url);
    //     return response.data;
    // } catch (error) {
    //     console.error("Can not loadPixiJsAppParamsFromDataBase", error);
    return {
        //appProperty Handler
        color: "#d7e6fa",
        colorAlpha: 1,
        //app background pc
        pcBackgroundUsed: true,
        pcBackgroundSource: "public/assets/Desktop - 1.png",
        pcBackgroundRelativeWidth: 1,
        pcBackgroundRelativeHeight: 1,
        pcBackgroundAbsoluteWidth: 0,
        pcBackgroundAbsoluteHeight: 0,
        pcBackgroundRelativeX: 0.5,
        pcBackgroundRelativeY: 0.5,
        pcBackgroundAbsoluteX: 0,
        pcBackgroundAbsoluteY: 0,
        //app background mobile
        mobileBackgroundUsed: true,
        mobileBackgroundSource: "public/assets/iPhone 13 mini - 3.png",
        mobileBackgroundRelativeWidth: 1,
        mobileBackgroundRelativeHeight: 1,
        mobileBackgroundAbsoluteWidth: 0,
        mobileBackgroundAbsoluteHeight: 0,
        mobileBackgroundRelativeX: 0.5,
        mobileBackgroundRelativeY: 0.5,
        mobileBackgroundAbsoluteX: 0,
        mobileBackgroundAbsoluteY: 0,
    };
    // }
}

export async function loadWheelParamsListFromDataBase(url = "http://localhost:8080/load-wheel-list") {
    // try {
    //     const response = await axios.get(url);
    //     return response.data;
    // } catch (error) {
    //     console.error("Can not loadWheelParamsListFromDataBase", error);
    return [
        {
            id: 1,
            //position
            absoluteX: 0,
            absoluteY: 0,
            relativeX: 0.5,
            relativeY: 0.6,
            //wheelRadius
            relativeWheelRadius: 1,
            absoluteWheelRadius: 0,
            //wheelBackground
            backgroundUsed: false,
            backgroundSource: "public/assets/roll.png",
            backgroundWidthRate: 1,
            backgroundHeightRate: 1,
            backgroundBonusWidth: 0,
            backgroundBonusHeight: 0,
            backgroundWidthFixed: 0,
            backgroundHeightFixed: 0,
        }
    ]
    // }
}

export async function loadRewardListFromDataBase(url = "http://localhost:8080/load-reward-list") {
    // try {
    //     const response = await axios.get(url);
    //     return response.data;
    // } catch (error) {
    //     console.error("Can not loadRewardListFromDataBase", error);
    return [
        {
            id: 1,
            name: "Bad Luck",
            amount: 0,
            ease: 20,
            limitType: "unlimited",
            image: "public/assets/badluck.png",
        },
        {
            id: 2,
            name: "Reward 1",
            amount: 14,
            ease: 10,
            limitType: "limited",
            image: "public/assets/reward.png",
        },
        {
            id: 3,
            name: "Reward 2",
            amount: 16,
            ease: 11,
            limitType: "limited",
            image: "public/assets/reward.png",
        },
        {
            id: 4,
            name: "Reward 3",
            amount: 18,
            ease: 12,
            limitType: "limited",
            image: "public/assets/reward.png",
        },
        {
            id: 5,
            name: "Reward 4",
            amount: 20,
            ease: 13,
            limitType: "limited",
            image: "public/assets/reward.png",
        },
        {
            id: 6,
            name: "Reward 5",
            amount: 22,
            ease: 14,
            limitType: "limited",
            image: "public/assets/reward.png",
        },
        {
            id: 7,
            name: "Reward 6",
            amount: 24,
            ease: 15,
            limitType: "limited",
            image: "public/assets/reward.png",
        },
        {
            id: 8,
            name: "Reward 7",
            amount: 26,
            ease: 16,
            limitType: "limited",
            image: "public/assets/reward.png",
        },
        {
            id: 9,
            name: "Reward 8",
            amount: 28,
            ease: 17,
            limitType: "limited",
            image: "public/assets/reward.png",
        },
        {
            id: 10,
            name: "Reward 9",
            amount: 30,
            ease: 18,
            limitType: "limited",
            image: "public/assets/reward.png",
        }
    ];
    // }
}

export async function loadWheelBaseColorParamsListFromDataBase(url = "http://localhost:8080/load-wheel-color-params-list") {
    // try {
    //     const response = await axios.get(url);
    //     return response.data;
    // } catch (error) {
    //     console.error("Can not loadWheelBaseColorParamsListFromDataBase", error);
    return [
        {
            id: 1,
            colorData: "#F8E88B",
            colorAlpha: 1,
        },
        {
            id: 2,
            colorData: "#E6E6E6",
            colorAlpha: 1,
        },
        {
            id: 3,
            colorData: "#7FC7EF",
            colorAlpha: 1,
        },
        {
            id: 4,
            colorData: "#FFFF00",
            colorAlpha: 1,
        },
        {
            id: 5,
            colorData: "#00FF80",
            colorAlpha: 1,
        },
    ]
    // }
}

export async function loadPointerParamsListFromDataBase(url = "http://localhost:8080/load-pointer-list") {
    // try {
    //     const response = await axios.get(url);
    //     return response.data;
    // } catch (error) {
    //     console.error("Can not loadPointerParamsListFromDataBase", error);
    return [
        {
            id: 1,
            //Source
            imageSource: "public/assets/Pointer.png",
            //Pointer centre
            anchorX: 0.5,
            anchorY: 0.58,
            //Size
            wheelWidthRate: 0.35,
            wheelHeightRate: 0.35,
            absoluteWidth: 0,
            absoluteHeight: 0,
            //position
            relativeX: 0,
            relativeY: 0,
            relativeAngle: 0,
            absoluteX: 0,
            absoluteY: 0,
        }
    ]
    // }
}

export async function loadMessageBoxParamsListFromDataBase(url = "http://localhost:8080/load-message-box-list") {
    // try {
    //     const response = await axios.get(url);
    //     return response.data;
    // } catch (error) {
    //     console.error("Can not loadPointerParamsListFromDataBase", error);
    return [
        {
            id: 1,
            //----- Box
            //Color
            boxBackgroundColor: 'white',
            boxBackgroundColorAlpha: 1,
            boxLineSize: 2,
            boxLineColor: 'blue',
            //Size
            boxRelativeWidth: 0.95,
            boxRelativeHeight: 1.5,
            boxAbsoluteWidth: 0,
            boxAbsoluteHeight: 0,
            boxRoundup: 15,
            //Position
            boxRelativeX: 0,
            boxRelativeY: 0,
            boxRelativeAngle: 0,
            boxAbsoluteX: 0,
            boxAbsoluteY: 0,
            //----- Title image
            //Title image source
            titleImageSource: "public/assets/message-box/messagebox -title -image.png",
            //Size
            titleWidthRate: 0,
            titleHeightRate: 0,
            titleRelativeWidth: 1,
            titleRelativeHeight: 1,
            titleAbsoluteWidth: 0,
            titleAbsoluteHeight: 0,
            //Position
            titleRelativeX: 0.5,
            titleRelativeY: 0.15,
            titleAbsoluteX: 0,
            titleAbsoluteY: 0,
            //----- Reward image
            //Size
            imageWidthRate: 0,
            imageHeightRate: 0,
            imageRelativeWidth: 0.2,
            imageRelativeHeight: 0.2,
            imageAbsoluteWidth: 0,
            imageAbsoluteHeight: 0,
            //Position
            imageRelativeX: 0.5,
            imageRelativeY: 0.4,
            imageAbsoluteX: 0,
            imageAbsoluteY: 0,
            //----- Reward name
            //Style
            nameFontSize: 20,
            nameFontFamily: "Arial",
            nameColor: "black",
            //Position
            nameRelativeX: 0.5,
            nameRelativeY: 0.6,
            nameAbsoluteX: 0,
            nameAbsoluteY: 0,
            //----- Claim button
            //Size
            buttonRelativeWidth: 0.75,
            buttonRelativeHeight: 0.25,
            buttonAbsoluteWidth: 0,
            buttonAbsoluteHeight: 0,
            buttonRoundup: 15,
            //Shape
            buttonColor: 'darkblue',
            buttonColorAlpha: 1,
            buttonLineColor: 'darkblue',
            buttonLineSize: 2,
            //Position
            buttonRelativeX: 0.5,
            buttonRelativeY: 0.85,
            buttonAbsoluteX: 0,
            buttonAbsoluteY: 0,
            //Text
            buttonText: "NHẬN",
            buttonTextFontFamily: "Arial",
            buttonTextFontSize: 20,
            buttonTextColor: 'white',
            buttonTextRelativeX: 0.5,
            buttonTextRelativeY: 0.5,
            buttonTextAbsoluteX: 0,
            buttonTextAbsoluteY: 0,
            //Size hover
            buttonHoverRelativeWidth: 0.78,
            buttonHoverRelativeHeight: 0.28,
            buttonHoverAbsoluteWidth: 0,
            buttonHoverAbsoluteHeight: 0,
            buttonHoverRoundup: 25,
            //Shape hover
            buttonHoverColor: 'blue',
            buttonHoverColorAlpha: 1,
            buttonHoverLineColor: 'blue',
            buttonHoverLineSize: 2,
            //Position hover
            buttonHoverRelativeX: 0.5,
            buttonHoverRelativeY: 0.85,
            buttonHoverAbsoluteX: 0,
            buttonHoverAbsoluteY: 0,
            //Text hover
            buttonHoverText: "NHẬN",
            buttonHoverTextFontFamily: "Arial",
            buttonHoverTextFontSize: 22,
            buttonHoverTextColor: 'white',
            buttonHoverTextRelativeX: 0.5,
            buttonHoverTextRelativeY: 0.5,
            buttonHoverTextAbsoluteX: 0,
            buttonHoverTextAbsoluteY: 0,
        }
    ]
    // }
}

export async function loadButtonParamsListFromDataBase(url = "http://localhost:8080/load-button-list") {
    // try {
    //     const response = await axios.get(url);
    //     return response.data;
    // } catch (error) {
    //     console.error("Can not loadButtonParamsListFromDataBase");
    return [
        {
            id: 1,
            //----- Normal
            //Size
            relativeWidth: 0.8,
            relativeHeight: 0.3,
            absoluteWidth: 0,
            absoluteHeight: 0,
            roundUp: 15,
            //Shape
            backgroundColor: "#030330",
            backgroundColorAlpha: 1,
            lineColor: "#030330",
            lineSize: 3,
            //Position
            relativeX: 0,
            relativeY: 1.35,
            absoluteX: 0,
            absoluteY: 0,
            //Text
            text: "CHƠI NGAY",
            fontSize: 15,
            fontFamily: "Arial",
            textColor: "white",
            //----- Hover
            //Hover size
            hoverRelativeWidth: 0.8,
            hoverRelativeHeight: 0.3,
            hoverAbsoluteWidth: 0,
            hoverAbsoluteHeight: 0,
            hoverRoundUp: 15,
            //Hover shape
            hoverBackgroundColor: "white",
            hoverBackgroundColorAlpha: 1,
            hoverLineColor: "#030330",
            hoverLineSize: 3,
            //Hover position
            hoverRelativeX: 0,
            hoverRelativeY: 1.35,
            hoverAbsoluteX: 0,
            hoverAbsoluteY: 0,
            //Hover text
            hoverText: "QUAY",
            hoverFontSize: 17,
            hoverFontFamily: "Arial",
            hoverTextColor: "#030330",
        }
    ]
    // }
}



export async function loadWheelImageParamsListFromDataBase(url = "http://localhost:8080/load-wheel-image-params-list") {
    // try {
    //     const response = await axios.get(url);
    //     return response.data;
    // } catch (error) {
    //     console.error("Can not loadWheelImageParamsListFromDataBase", error);
    return [
        {
            id: 1,
            //scale
            widthRate: 0,
            heightRate: 0,
            relativeWidth: 0.2,
            relativeHeight: 0.2,
            absoluteWidth: 0,
            absoluteHeight: 0,
            //
            relativeDistance: 0.7,
            absoluteDistance: 0,
            adjustX: 0,
            adjustY: 0,
            adjustAngle: 0,
            //
            rotateFixed: false,
            rotateAngle: 0,
        }
    ];
    // }
}

export async function loadWheelTextParamsListFromDataBase(url = "http://localhost:8080/load-wheel-text-params-list") {
    // try {
    //     const response = await axios.get(url);
    //     return response.data;
    // } catch (error) {
    //     console.error("Can not loadWheelTextParamsListFromDataBase", error);
    return [
        {
            id: 1,
            //
            fontFamily: "Arial",
            color: "#030330",
            fontSize: 12,
            //
            relativeDistance: 0.9,
            absoluteDistance: 0,
            adjustX: 0,
            adjustY: 0,
            adjustAngle: 0,
            //
            rotateFixed: false,
            rotateAngle: 0,
        }
    ];
    // }
}