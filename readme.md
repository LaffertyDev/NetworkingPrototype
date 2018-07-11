# Networking Prototype

Readme here!

Goal:

- Use websockets to enable real-time communication with minimal latency
- Introduce a persistent "Data Access Layer" that bubbles up to the Application / UI code
- Have three separate ways to "Load Data": App Hydrate, User Change, Network Change
- Be able to handle change collisions (users do two things that conflict)
- Support online and offline interactions, update online environment when network is achieved
- Minimize network utilization for a target "2G" or "3G" experience
- Pseudo-database replication
- Learn how to stress test a networked app

- Test WebWorkers with performance and networking implications

Considerations:

- WebSockets?
- WebWorkers?
- Offline Mode?
- Three-way-merge?
- Abstraction?
- Observable Http Requests or Promises?
  - reactive programming?

Unknowns:

- Should the client and server be separate Git projects?
  - No, sharing the .ts network translation files is going to be a good thing
  - sharing utility code is a PITA
- What language should my server be in?
  - node?
  - C#?
  - none? like, firebase or something?

- Lock-step processing?

The actual fully-fledge game implementation:

- maintain ongoing game state connections for an arbitrary number of games
- sync users game states
- handle messaging / video contexts
- sync game state to database
- fire backups appropriately
- fire AI scripts

## Inspiration

https://github.com/mdn/samples-server/tree/master/s/websocket-chat

https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications