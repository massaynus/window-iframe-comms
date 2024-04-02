# TrackingParty

it's the main class to this experiment, just make and instance, register how to deal with events coming in, and send them every occasion

It will internally choose one of the logics and use it, either just publishing events or treating them

depending on if you are the host (window) or just a guest (iframe or embed or object) 

`isScoped`: a parameter determining whether to use the same channel name across TABs or append an `id` supplemented through the `channelId` url search param to it. 
which would be unique and isolate the TAB from sending/receiving events from others.
the **channelId** params should be sent down to all iframes using the same `TrackingParty` class to use isolation correctly

`channelName`: the name of the channel to use, a default one is suggested but for any other purposes other ones can be used XD