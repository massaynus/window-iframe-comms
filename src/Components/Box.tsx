import {useEffect, useState} from "react";
import {PartyMode, resolvePartyMode} from "../lib/TrackingComms/TrackingParty.ts";
import {ReceiverBox} from "./ReceiverBox.tsx";
import {SenderBox} from "./SenderBox.tsx";

export default function Box() {
    const [mode, setMode] = useState<PartyMode>()

    useEffect(() => {
        const mode = resolvePartyMode()
        setMode(mode)
    }, [])

    return mode === PartyMode.SENDER ? <SenderBox /> : <ReceiverBox />
}


