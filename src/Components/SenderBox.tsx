import {useEffect, useRef} from "react";
import {TRACKING_CHANNEL_NAME, TrackingParty} from "../lib/TrackingComms/TrackingParty.ts";

export function SenderBox({isScoped} : {isScoped: boolean}) {
    const sender = useRef<TrackingParty>()
    useEffect(() => {
        sender.current = new TrackingParty(TRACKING_CHANNEL_NAME, isScoped)

        return () => {
            sender.current?.channel.close()
        }
    }, [isScoped]);

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