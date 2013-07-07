package org.lessi;

import io.netty.channel.Channel;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelPipeline;
import io.netty.handler.codec.http.HttpObjectAggregator;
import io.netty.handler.codec.http.HttpRequestDecoder;
import io.netty.handler.codec.http.HttpResponseEncoder;

public class CHBPipelineInitializer extends ChannelInitializer<Channel> {
    @Override
    protected void initChannel(Channel ch) throws Exception {
        ChannelPipeline pipeline = ch.pipeline();
        pipeline.addLast("Decoder", new HttpRequestDecoder())
                .addLast("Aggregator", new HttpObjectAggregator(1 << 16))
                .addLast("Encoder", new HttpResponseEncoder())
                .addLast("Http handler", new HttpRequestHandler())
                .addLast("Web socket", new WebSocketHandler());


    }
}
