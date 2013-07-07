package org.lessi;

public class Main {

    public static final String WEB_SOCKET_PATH = "ws://192.168.1.150/websocket";

    public static void main(String[] args) throws Exception {
        new SimpleServer().run();
    }
}
