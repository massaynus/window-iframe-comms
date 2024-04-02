export const TRACKING_CHANNEL_NAME: string = "TRACKING_BROADCAST_CHANNEL"

export enum PartyMode {
    SENDER,
    RECEIVER
}

export interface IEvent<T = unknown> {
    readonly name: string
    readonly origin: string
    readonly contents: T
}

export interface ITrackingParty {
    readonly channelName: string
    readonly mode: PartyMode
    readonly channel: BroadcastChannel

    addMessageHandler(handler: (event: IEvent) => void): void
    removeMessageHandler(handler: (event: IEvent) => void): void

    trackEvent(event: IEvent): void
}

export function resolvePartyMode() {
    if (window.frameElement === null) return PartyMode.RECEIVER
    else return PartyMode.SENDER
}

export class TrackingParty implements ITrackingParty{
    readonly channelName: string
    readonly mode: PartyMode
    readonly channel: BroadcastChannel
    private readonly handlers: Set<(event: IEvent<unknown>) => void>


    constructor(channelName: string, isScoped: boolean = false) {
        this.channelName = channelName + (isScoped ? new URLSearchParams(window.location.search).get('channelId') : '')
        this.mode = resolvePartyMode()
        this.channel = new BroadcastChannel(this.channelName)

        console.log(`Creating TrackingParty with mode "${this.mode}" for channel "${this.channelName}"`)

        this.handlers = new Set<(event: IEvent) => void>()

        this.channel.addEventListener('message', (event) => {
            const data = event.data as unknown as IEvent
            console.log('Party Mode:', this.mode, '\n', 'Tracked Event:', data, '\n', 'handler count: ', this.handlers.size)

            this.handlers.forEach(handler => handler(data))
            // maybe register a handler to send events to amplitude
        })
    }

    addMessageHandler(handler: (event: IEvent) => void)  {
        this.handlers.add(handler)
    }

    removeMessageHandler(handler: (event: IEvent) => void)  {
        this.handlers.delete(handler)
    }

    trackEvent(event: IEvent) {
        console.log('Party Mode:', this.mode, '\n', 'Sending Event:', event, '\n', 'Channel Name:', this.channelName)
        this.channel.postMessage(event)
    }
}
