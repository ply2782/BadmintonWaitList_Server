package com.jcsport.sports.config;

import java.time.Duration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.data.redis.RedisProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class RedisConfig {

        @Value("${spring.redis.host}")
        private String host;

        @Value("${spring.redis.port}")
        private int port;

        private final RedisProperties redisProperties;

        @Bean
        public RedisConnectionFactory redisConnectionFactory() {
                return new LettuceConnectionFactory(host, port);
        }

        @Bean
        public RedisTemplate<String, Object> redisTemplate() {
                RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
                redisTemplate.setConnectionFactory(redisConnectionFactory());
                redisTemplate.setKeySerializer(new StringRedisSerializer());
                redisTemplate.setValueSerializer(new StringRedisSerializer());
                redisTemplate.setHashKeySerializer(new Jackson2JsonRedisSerializer<>(Object.class));
                redisTemplate.setHashValueSerializer(new Jackson2JsonRedisSerializer<>(Object.class));
                redisTemplate.setDefaultSerializer(new Jackson2JsonRedisSerializer<>(Object.class));

                return redisTemplate;
        }

        @Bean
        public RedisCacheManager redisCacheManager() {
                RedisCacheConfiguration redisCacheConfiguration = RedisCacheConfiguration.defaultCacheConfig()
                                .serializeKeysWith(
                                                RedisSerializationContext.SerializationPair
                                                                .fromSerializer(new StringRedisSerializer()))
                                .serializeValuesWith(RedisSerializationContext.SerializationPair
                                                .fromSerializer(new GenericJackson2JsonRedisSerializer()))
                                .entryTtl(Duration.ofMinutes(30L));

                return RedisCacheManager.RedisCacheManagerBuilder.fromConnectionFactory(redisConnectionFactory())
                                .cacheDefaults(redisCacheConfiguration).build();
        }
}
