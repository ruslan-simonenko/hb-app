package org.lessi;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import io.netty.channel.*;
import io.netty.handler.codec.http.DefaultFullHttpResponse;
import io.netty.handler.codec.http.FullHttpRequest;
import io.netty.handler.codec.http.HttpResponseStatus;
import io.netty.handler.codec.http.HttpVersion;
import io.netty.handler.codec.http.websocketx.TextWebSocketFrame;
import io.netty.handler.codec.http.websocketx.WebSocketServerHandshaker;
import io.netty.handler.codec.http.websocketx.WebSocketServerHandshakerFactory;

public class HttpRequestHandler extends SimpleChannelInboundHandler<FullHttpRequest> {

    public static final String WEB_SOCKET_URL = "ws://192.168.1.150:9001/the-web-socket";

    public static WebSocketServerHandshaker handShaker; // TODO

    @Override
    protected void messageReceived(ChannelHandlerContext ctx, FullHttpRequest request) throws Exception {
        if (!request.getUri().equals("/open-web-socket")) {
            handleInvalidURI(ctx);
            return;
        }
        WebSocketServerHandshakerFactory wsFactory = new WebSocketServerHandshakerFactory(
                WEB_SOCKET_URL, null, false
        );
        handShaker = wsFactory.newHandshaker(request);
        if (handShaker == null) {
            handleInvalidWebSocketVersion(ctx);
            return;
        }
        final Channel channel = ctx.channel();
        handShaker.handshake(ctx.channel(), request)
                .addListener(new ChannelFutureListener() {
                    @Override
                    public void operationComplete(ChannelFuture future) throws Exception {
                        new Thread() {
                            @Override
                            public void run() {
                                System.out.println("Sending tests started");
                                while (channel.isOpen()) {
                                    try {
                                        Thread.sleep(1000);
                                        channel.write(new TextWebSocketFrame("test at " + System.currentTimeMillis()));
                                    } catch (Exception e) {
                                        e.printStackTrace();
                                    }
                                }
                            }
                        }.start();
                    }
                });
    }

    private void handleInvalidURI(ChannelHandlerContext ctx) {
        ByteBuf contentBuffer = Unpooled.buffer();
        contentBuffer.writeBytes("Refer to /open-web-socket to open web socket".getBytes());
        DefaultFullHttpResponse response = new DefaultFullHttpResponse(
                HttpVersion.HTTP_1_1,
                HttpResponseStatus.NOT_FOUND,
                contentBuffer
        );
        ctx.write(response).addListener(ChannelFutureListener.CLOSE);
    }

    private void handleInvalidWebSocketVersion(ChannelHandlerContext ctx) {
        ByteBuf contentBuffer = Unpooled.buffer();
        contentBuffer.writeBytes("Your web socket version is invalid".getBytes());
        DefaultFullHttpResponse response = new DefaultFullHttpResponse(
                HttpVersion.HTTP_1_1,
                HttpResponseStatus.BAD_REQUEST,
                contentBuffer
        );
        ctx.write(response).addListener(ChannelFutureListener.CLOSE);
    }
}
