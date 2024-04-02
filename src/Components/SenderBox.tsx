import {useEffect, useRef} from "react";
import {DEFAULT_CHANNEL_NAME, TrackingParty} from "../lib/TrackingComms/TrackingParty.ts";

export function SenderBox() {
    const sender = useRef<TrackingParty>()
    useEffect(() => {
        sender.current = new TrackingParty(DEFAULT_CHANNEL_NAME)
    }, []);

    return (
        <div>
            <h1>Sender</h1>
            <input type="text" onChange={(e) => sender.current?.trackEvent({
                contents: e.target.value,
                name: 'textChanged',
                origin: window.location.href
            })}/>
        </div>
    )
}