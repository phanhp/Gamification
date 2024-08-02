//------------------------- IMPORT -------------------------
import { generateSpriteFromSource } from "@/services/GameUtils";
import { messageBoxButtonAction, spinButtonAction } from "@/services/LuckyWheel/ActionFunction/ActionSetup";
import { pixiJsApplicationData } from "@/services/LuckyWheel/Elements/Application";
import { behindWheelAssetLoader, drawInBorderForWheel, drawOutBorderForWheel } from "@/services/LuckyWheel/Elements/decorate/BehindWheelDecorate";
import { frontWheelAssetLoader } from "@/services/LuckyWheel/Elements/decorate/InFrontOfWheelDecorate";
import { pointerData } from "@/services/LuckyWheel/Elements/Pointer";
import { messageBoxData } from "@/services/LuckyWheel/Elements/RewardMessageBox";
import { spinButtonData } from "@/services/LuckyWheel/Elements/SpinButton";
import { luckyWheelData, wheelPartListData } from "@/services/LuckyWheel/Elements/Wheel";
import { loadButtonParamsListFromDataBase, loadMessageBoxParamsListFromDataBase, loadPixiJsAppParamsFromDataBase, loadPointerParamsListFromDataBase, loadRewardListFromDataBase, loadWheelBaseColorParamsListFromDataBase, loadWheelImageParamsListFromDataBase, loadWheelParamsListFromDataBase, loadWheelTextParamsListFromDataBase } from "@/services/LuckyWheel/SourceLoader";
import { Kolker_Brush } from "next/font/google";
import { useRouter } from "next/router";
import * as PIXI from "pixi.js";
import { useEffect, useRef, useState } from "react";

//------------------------- LUCKYWHEEL APPLICATION -------------------------
export function LuckyWheelReactPixiJs() {
    const router = useRouter();
    const [isAppDestroy, setIsAppDestroy] = useState(false);

    //container
    const containerRef = useRef(null);

    //data load from database
    const appParamsRef = useRef(null);
    const messageBoxParamsRef = useRef(null);
    const wheelParamsRef = useRef(null);
    const pointerParamsRef = useRef(null);
    const spinButtonParamsRef = useRef(null);
    const rewardListRef = useRef(null);
    const baseColorListRef = useRef(null);
    const wheelImageParamsRef = useRef(null);
    const wheelNameParamsRef = useRef(null);

    const [isLoadingSuccess, setIsLoadingsuccess] = useState(false);

    //handle window size
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    })
    const [isWindowHaveSize, setIsWindowHaveSize] = useState(false);
    const [windowSizeCount, setWindowSizeCount] = useState(0);

    //data generate
    const appDataRef = useRef(null);
    const wheelDataRef = useRef(null);
    const messageBoxDataRef = useRef(null);
    const behindWheelUIListRef = useRef([]);
    const frontWheelUIListRef = useRef([]);
    const wheelPartListRef = useRef(null);

    const [isGenerateSourceSuccess, setIsGenerateSourceSuccess] = useState(false);
    const [dataUpdateCount, setDataUpdateCount] = useState(0);

    //game setup component
    const appRef = useRef(null);
    const wheelContainerRef = useRef(null);
    const pointerRef = useRef(null);
    const spinButtonRef = useRef(null);
    const messageBoxRef = useRef(null);

    //button support params
    const touchStartRef = useRef(0);
    const touchEndRef = useRef(0);
    // const [isOutOfButton, setIsOutOfButton] = useState(false);

    //-------------------- Loading resource --------------------
    useEffect(() => {
        const loadingGame = async () => {
            // try {
            const setupLoading = async () => {
                const loadApp = async () => {
                    appParamsRef.current = await loadPixiJsAppParamsFromDataBase();
                }

                const loadWheelParams = async () => {
                    const wheelParamsList = await loadWheelParamsListFromDataBase();
                    wheelParamsRef.current = wheelParamsList[wheelParamsList.length - 1];
                }

                const loadMessageBoxParams = async () => {
                    const messageBoxParamsList = await loadMessageBoxParamsListFromDataBase();
                    messageBoxParamsRef.current = messageBoxParamsList[messageBoxParamsList.length - 1];
                }

                const loadPointerParams = async () => {
                    const pointerParamsList = await loadPointerParamsListFromDataBase();
                    pointerParamsRef.current = pointerParamsList[pointerParamsList.length - 1];
                }

                const loadButtonParams = async () => {
                    const spinButtonParamsList = await loadButtonParamsListFromDataBase();
                    spinButtonParamsRef.current = spinButtonParamsList[spinButtonParamsList.length - 1];
                }

                const loadRewardList = async () => {
                    rewardListRef.current = await loadRewardListFromDataBase();
                }

                const loadBaseColorList = async () => {
                    baseColorListRef.current = await loadWheelBaseColorParamsListFromDataBase();
                }

                const loadWheelImageParams = async () => {
                    const wheelImageParamsList = await loadWheelImageParamsListFromDataBase();
                    wheelImageParamsRef.current = wheelImageParamsList[wheelImageParamsList.length - 1];
                }

                const loadWheelTextParams = async () => {
                    const wheelTextParamsList = await loadWheelTextParamsListFromDataBase();
                    wheelNameParamsRef.current = wheelTextParamsList[wheelTextParamsList.length - 1];
                }

                await Promise.all([
                    loadApp(),
                    loadPointerParams(),
                    loadMessageBoxParams(),
                    loadButtonParams(),
                    loadRewardList(),
                    loadWheelParams(),
                    loadBaseColorList(),
                    loadWheelImageParams(),
                    loadWheelTextParams()]);
            }
            await setupLoading();
            setIsLoadingsuccess(true);
            // } catch (error) {
            //     console.error("Error loading data: ", error);
            //     router.push('/maintenance');
            // }
        }
        loadingGame();
    }, [])

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });

            if (containerRef.current) {
                while (containerRef.current.firstChild) {
                    containerRef.current.removeChild(containerRef.current.firstChild);
                }
            }

            setWindowSizeCount(prev => prev + 1);
        };
        handleResize();

        window.addEventListener('resize', handleResize);
        setIsWindowHaveSize(true);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    //-------------------- Generating data from loading --------------------
    useEffect(() => {
        const generateResource = async () => {
            if (!isLoadingSuccess) return;

            if (!isWindowHaveSize) return;

            const windowWidth = windowSize.width;
            const windowHeight = windowSize.height;

            const generating = async () => {
                //----- app data
                appDataRef.current = await pixiJsApplicationData(appParamsRef.current);
                appRef.current = appDataRef.current.app;
                const appWidth = appDataRef.current.appWidth;
                const appHeight = appDataRef.current.appHeight;

                //----- wheel data
                wheelDataRef.current = await luckyWheelData(wheelParamsRef.current, appWidth, appHeight);
                wheelContainerRef.current = wheelDataRef.current.wheelContainer;
                const wheelRadius = wheelDataRef.current.wheelRadius;
                const wheelCentre = wheelDataRef.current.wheelCentre;

                //----- wheelPartList data
                wheelPartListRef.current = await wheelPartListData(
                    rewardListRef.current, baseColorListRef.current, wheelImageParamsRef.current, wheelNameParamsRef.current,
                    wheelRadius, wheelCentre);

                //----- pointer data
                pointerRef.current = await pointerData(pointerParamsRef.current, wheelCentre, wheelRadius);

                //----- messageBox data
                messageBoxDataRef.current = await messageBoxData(messageBoxParamsRef.current, appWidth, appHeight, wheelRadius, wheelCentre);
                messageBoxRef.current = messageBoxDataRef.current.messageBox;
                // console.log(messageBoxRef.current.button);

                //----- spinButton data
                spinButtonRef.current = await spinButtonData(
                    spinButtonParamsRef.current,
                    appWidth, appHeight,
                    wheelRadius, wheelCentre);

                //----- behindWheelUI
                behindWheelUIListRef.current = await behindWheelAssetLoader(appWidth, appHeight, wheelCentre, wheelRadius);

                //----- frontWheelUI
                frontWheelUIListRef.current = await frontWheelAssetLoader(appWidth, appHeight, wheelCentre, wheelRadius);

                setDataUpdateCount(prev => prev + 1);
            }

            await generating();
            setIsGenerateSourceSuccess(true);
        }
        generateResource();
    }, [isLoadingSuccess, windowSizeCount])

    //-------------------- Setup for game --------------------
    useEffect(() => {
        const setupGame = async () => {
            if (!isGenerateSourceSuccess) return;

            if (!containerRef.current) return;

            const appWidth = appDataRef.current.appWidth;
            const appHeight = appDataRef.current.appHeight;
            const wheelRadius = wheelDataRef.current.wheelRadius;
            const wheelCentre = wheelDataRef.current.wheelCentre;
            const messageBoxWidth = messageBoxDataRef.current.width;
            const messageBoxHeight = messageBoxDataRef.current.height;

            //----- Add app to <div> container
            containerRef.current.appendChild(appRef.current.canvas);

            //----- behindWheelUI
            for (let i = 0; i < behindWheelUIListRef.current.length; i++) {
                const asset = behindWheelUIListRef.current[i];
                appRef.current.stage.addChild(asset);
            }

            //----- wheel border
            const outBorder = drawOutBorderForWheel(wheelCentre, wheelRadius);
            appRef.current.stage.addChild(outBorder);
            const inBorder = drawInBorderForWheel(wheelCentre, wheelRadius);
            appRef.current.stage.addChild(inBorder);

            //----- Add wheelContainer to app
            appRef.current.stage.addChild(wheelContainerRef.current);

            //----- Add wheelPart to wheelContainer
            for (let i = 0; i < wheelPartListRef.current.length; i++) {
                let wheelPart = wheelPartListRef.current[i];

                //----- Add wheelPart graphic
                const wheelPartGraphic = wheelPart.wheelPartGraphic;
                wheelContainerRef.current.addChild(wheelPartGraphic);

                //----- Add wheelPart rewardImage
                const rewardImage = wheelPart.rewardImage;
                wheelContainerRef.current.addChild(rewardImage);

                //----- Add wheelPart rewardName
                const rewardName = wheelPart.rewardName;
                wheelContainerRef.current.addChild(rewardName);
            }


            //----- frontWheel UI
            for (let i = 0; i < frontWheelUIListRef.current.length; i++) {
                const asset = frontWheelUIListRef.current[i];
                appRef.current.stage.addChild(asset);
            }

            //----- Add pointer to app
            appRef.current.stage.addChild(pointerRef.current);

            //----- Add messageBox to app
            appRef.current.stage.addChild(messageBoxRef.current);

            //----- Add spinButton to app
            appRef.current.stage.addChild(spinButtonRef.current);

            //----- wheelCentre test
            // const wc = await generateSpriteFromSource("public/assets/wheel-border/light-off-bubble.png");
            // wc.anchor.set(0.5, 0.5);
            // wc.position.set(wheelCentre.x, wheelCentre.y);
            // appRef.current.stage.addChild(wc);

            //----- Setup action
            spinButtonAction(
                spinButtonParamsRef.current, messageBoxParamsRef.current,
                spinButtonRef.current, rewardListRef.current, wheelPartListRef.current, wheelContainerRef.current, messageBoxRef.current,
                appWidth, appHeight, wheelRadius, wheelCentre, messageBoxWidth, messageBoxHeight,
                touchStartRef.current, touchEndRef.current);

            messageBoxButtonAction(
                messageBoxParamsRef.current,
                messageBoxRef.current.button, spinButtonRef.current, messageBoxRef.current,
                messageBoxWidth, messageBoxHeight, wheelRadius);
        }
        setupGame();

        if (isAppDestroy) {
            return () => {
                if (appRef.current) {
                    appRef.current.destroy(true);
                    appRef.current = null;
                }
            };
        }
    }, [isGenerateSourceSuccess, dataUpdateCount]);

    //-------------------- return components --------------------
    if (!isLoadingSuccess) {
        return (
            <div>... Is Loading</div>
        );
    }

    if (!isGenerateSourceSuccess) {
        return (
            <div>... Generating data</div>
        );
    }

    return (
        <div>
            <div ref={containerRef}></div>
        </div>
    );

}

export function LuckyWheelPixiJsComponent() {
    return (
        <div className="container d-flex justify-content-center vh-100">
            <div className="window-box">
                <div className="app-box">
                    <LuckyWheelReactPixiJs />
                </div>
            </div>
        </div>
    );
}

export default LuckyWheelPixiJsComponent;