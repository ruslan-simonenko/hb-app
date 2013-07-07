app.socket = {

    instance: {},

    openSocket: function(url) {
        this.instance = new WebSocket("ws://" + app.settings.api.get("socketURL") + "/open-web-socket");

        this.instance.onopen = function() {
            console.log("Connection completed");
        };

        this.instance.onclose = function(event) {
            if (event.wasClean) {
                console.log('Conection close ok');
            } else {
                console.log('Conection bracking error'); // например, "убит" процесс сервера
            }

            console.log('Key: ' + event.code, ' Reason: ' + event.reason);
        };

        this.instance.onmessage = function(event) {
            console.log("Data ", event.data);
        };

        this.instance.onerror = function(error) {
            console.log("Error ", + error.message);
        };
    },

    sendMessage: function(message) {
        this.instance.send(JSON.stringify(message));
    },

    closeSocket: function() {
        this.instance.close();
    },

    listen: function() {

    }

};