package com.lokcenter.AZN.configs;

import java.net.URL;
import java.util.Objects;
import java.util.concurrent.CompletableFuture;

import com.microsoft.graph.authentication.IAuthenticationProvider;
import org.jetbrains.annotations.NotNull;
import org.springframework.lang.NonNull;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;

/**
 * An implementation of IAuthenticationProvider that uses Spring's OAuth2AuthorizedClient to get
 * access tokens
 */
public class SpringOAuth2AuthProvider implements IAuthenticationProvider {

    private final OAuth2AuthorizedClient oauthClient;

    public SpringOAuth2AuthProvider(@NonNull OAuth2AuthorizedClient oauthClient) {
        this.oauthClient = Objects.requireNonNull(oauthClient);
    }

    @NotNull
    @Override
    public CompletableFuture<String> getAuthorizationTokenAsync(@NotNull URL requestUrl) {
        return CompletableFuture.completedFuture(oauthClient.getAccessToken().getTokenValue());
    }

}
