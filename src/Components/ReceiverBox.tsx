import {useEffect, useRef, useState} from "react";
import {TRACKING_CHANNEL_NAME, IEvent, TrackingParty} from "../lib/TrackingComms/TrackingParty.ts";

export function ReceiverBox({isScoped} : {isScoped: boolean}) {
    const [contents, setContents] = useState<string>('')
    const receiver = useRef<TrackingParty>()

    useEffect(() => {
        const handler = (e: IEvent) => {
            setContents(c => JSON.stringify(e, null, 2) + '\n' + c)
        }

        receiver.current = new TrackingParty(TRACKING_CHANNEL_NAME, isScoped)
        receiver.current?.addMessageHandler(handler)

        return () => {
            receiver.current?.removeMessageHandler(handler)
            receiver.current?.channel.close()
        }
    }, [isScoped]);

    return (
        <div>
            <h1>Receiver</h1>
            <br/>
            <iframe src={window.location.href + '#one'}/>
            <iframe src={window.location.href + '#two'}/>
            <iframe src={window.location.href + '#three'}/>
            <iframe src={window.location.href + '#four'}/>
            <br/>
            <pre>{contents}</pre>
        </div>
    )
}