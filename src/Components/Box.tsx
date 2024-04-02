import {useEffect, useState} from "react";
import {PartyMode, resolvePartyMode} from "../lib/TrackingComms/TrackingParty.ts";
import {ReceiverBox} from "./ReceiverBox.tsx";
import {SenderBox} from "./SenderBox.tsx";

export default function Box() {
    const [mode, setMode] = useState<PartyMode>()
    const [isScoped, setIsScoped] = useState<boolean>(true)

    useEffect(() => {
        const mode = resolvePartyMode()
        const isScoped = new URLSearchParams(window.location.search).has('channelId')

        setMode(mode)
        setIsScoped(isScoped)

        console.log({isScoped})
    }, [])

    return mode === PartyMode.SENDER ? <SenderBox isScoped={isScoped} /> : <ReceiverBox isScoped={isScoped} />
}


