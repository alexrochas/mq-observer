# MQ Observer
> simple app to visualize MQ events

The main objective of this project is to be able to visualize a copy of every event sent to a topic.
This was useful at the time I needed to track many events at the same time.

## Getting Started

This project uses [Feathers](http://feathersjs.com). Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/mq-observer; npm install
    ```

3. Start your app

    ```
    npm start
    ```

4. Access http://localhost:3030 and you should see:

![example](example.png)

Fill the fields with:

 - name, simbolic name to show in the header
 - url, in the format **amqp://user:pass@host:10000/vhost**
 - exchange, name of the exchange (must be a **topic**)
 
## Meta

Alex Rocha - [about.me](http://about.me/alex.rochas)
