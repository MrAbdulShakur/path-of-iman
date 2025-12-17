"use client"
import { GameProvider } from "./components/game/GameContext";
import GameContent from "./content";


const Page = () => {
    return (
        <GameProvider>
            <GameContent />
        </GameProvider>
    );
}

export default Page