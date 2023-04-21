import { createRef, useEffect } from "react";

import { Inter } from "next/font/google";
import Head from "next/head";

import {
    ExplodeFactory,
    HouseFactory,
    MissileController,
    MissileFactory,
} from "buildings";

import { HouseImageLevel } from "enum";
import { km1200hour } from "mock";

import styles from "styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const explosionRef = createRef<HTMLDivElement>();
    const houseRef = createRef<HTMLDivElement>();
    const missilesRef = createRef<HTMLDivElement>();

    useEffect(() => {
        var disabled = false;

        const explosion = explosionRef.current;
        const missiles = missilesRef.current;
        const house = houseRef.current;
        if (!explosion || !missiles || !house) return;

        const houseFactory = new HouseFactory(house);

        const explodesFactory = new ExplodeFactory(explosion);
        const missileFactory = new MissileFactory(missiles);

        const controller = new MissileController(
            missileFactory,
            explodesFactory
        );

        document.addEventListener("mousemove", async (e) => {
            if (disabled) return;
            disabled = true;
            setTimeout(() => (disabled = false), 500);

            const missile1 = controller.create(km1200hour, {
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
            });

            // const missile2 = controller.create(km1200hour, {
            //     x: e.clientX,
            //     y: e.clientY,
            // });

            const myHouse = houseFactory.build(HouseImageLevel.lvl1, {
                x: e.clientX,
                y: e.clientY,
            });

            await controller.launch(missile1, myHouse.coords);
            await controller.explode(missile1, myHouse);
        });
    }, [explosionRef, houseRef, missilesRef]);

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <div id="missiles" ref={missilesRef}></div>
                <div id="houses" ref={houseRef}></div>
                <div id="explodes" ref={explosionRef}></div>
            </main>
        </>
    );
}
