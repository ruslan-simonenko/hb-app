package org.lessi;

import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.handler.codec.http.websocketx.*;

import static org.lessi.HttpRequestHandler.handShaker;

public class WebSocketHandler extends SimpleChannelInboundHandler<WebSocketFrame> {
    @Override
    protected void messageReceived(ChannelHandlerContext ctx, WebSocketFrame frame) throws Exception {
        if (frame instanceof CloseWebSocketFrame) {
            handShaker.close(ctx.channel(), (CloseWebSocketFrame) frame);
            return;
        } else if (frame instanceof PingWebSocketFrame) {
            ctx.channel().write(new PongWebSocketFrame(frame.content()));
            return;
        } else if (!(frame instanceof TextWebSocketFrame)) {
            throw new UnsupportedOperationException(String.format("%s frame types not supported", frame.getClass()
                    .getName()));
        }

        // Send the uppercase string back.
        String request = ((TextWebSocketFrame) frame).text();
        if (request.equals("end")) {
            ctx.channel().close();
            return;
        } else {
            System.out.println(request);
        }
        ctx.channel().write(new TextWebSocketFrame(request.toUpperCase()));
    }
}
