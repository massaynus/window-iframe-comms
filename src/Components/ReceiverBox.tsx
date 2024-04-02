import {useEffect, useRef, useState} from "react";
import {TRACKING_CHANNEL_NAME, IEvent, TrackingParty} from "../lib/TrackingComms/TrackingParty.ts";

export function ReceiverBox() {
    const [contents, setContents] = useState<string>('')
    const receiver = useRef<TrackingParty>()

    useEffect(() => {
        const handler = (e: IEvent) => {
            setContents(c => JSON.stringify(e, null, 2) + '\n' + c)
        }

        receiver.current = new TrackingParty(TRACKING_CHANNEL_NAME, false)
        receiver.current?.addMessageHandler(handler)

        return () => {
            receiver.current?.removeMessageHandler(handler)
        }
    }, []);

    return (
        <div>
            <h1>Receiver</h1>
            <br/>
            <iframe src={window.location.href + '&i=1'}/>
            <iframe src={window.location.href + '&i=2'}/>
            <iframe src={window.location.href + '&i=3'}/>
            <iframe src={window.location.href + '&i=4'}/>
            <br/>
            <pre>{contents}</pre>
        </div>
    )
}