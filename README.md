misskey-gen
=====
generate configurations for below projects under misskey-delta.  
- [misskey-api](https://github.com/misskey-delta/misskey-api)
- [misskey-web](https://github.com/misskey-delta/misskey-web)
- [misskey-file](https://github.com/misskey-delta/misskey-file)

Usage
-----
1. clone this repository.
2. run `npm start`. after you answered 10-20 questions, misskey-gen generates configurations to `store` directory.
3. move json files in `store` to your `$HOME/.misskey`.
4. add `store/hosts-snippet` to your hosts file. (_optional_)

### input
you can input settings by interacting, or environment variables. want list of environment variables, see below.

| name | required | type | sample |
| :-- | :-- | :-- | :-- |
| MISSKEY_GEN_URLS_PRIMARY | yes | url string | http://example.com:8081/ |
| MISSKEY_GEN_URLS_SECONDARY | yes | url string | http://example.com:8084/ |
| MISSKEY_GEN_TLS_ENABLE | yes | bool (0 or 1) | 0 |
| MISSKEY_GEN_TLS_KEY | if TLS enabled, yes | path string | /etc/letsencrypt/live/example.com/privkey.pem |
| MISSKEY_GEN_TLS_CERT | if TLS enabled, yes | path string | /etc/letsencrypt/live/example.com/fullchain.pem |
| MISSKEY_GEN_MONGO_HOST | yes | host string | localhost:27017 |
| MISSKEY_GEN_MONGO_AUTH | yes | bool (0 or 1) | 0 |
| MISSKEY_GEN_MONGO_USER | if MONGO auth enabled, yes | string | sample |
| MISSKEY_GEN_MONGO_PASSWORD | if MONGO auth enabled, yes | string | sample |
| MISSKEY_GEN_REDIS_HOST | yes | host string | localhost:6379 |
| MISSKEY_GEN_REDIS_AUTH | yes | bool (0 or 1) | 0 |
| MISSKEY_GEN_REDIS_PASSWORD | yes | string | sample |
| MISSKEY_GEN_PORTS_API | yes | number | 8080 |
| MISSKEY_GEN_PORTS_WEB_HTTP | yes | number | 8081 |
| MISSKEY_GEN_PORTS_WEB_HTTPS | if TLS enabled, yes | number | 8082 |
| MISSKEY_GEN_PORTS_FILE_INTERNAL | yes | number | 8083 |
| MISSKEY_GEN_PORTS_FILE_HTTP | yes | number | 8084 |
| MISSKEY_GEN_PORTS_FILE_HTTPS | if TLS enabled, yes | number | 8085 | 
| MISSKEY_GEN_RECAPTCHA_SITE | yes | reCAPTHCHA Site key | 6Le0eywUAAAAADg5OnDEl5StCjfIT7lLOzcXE5XC |
| MISSKEY_GEN_RECAPTCHA_SECRET | yes | reCAPTCHA Secret key | 6Le0eywUAAAAAFZKSxqUrC0mmNlYEmX_Fei9gRyt |
| MISSKEY_GEN_THEME_COLOR | yes | color string | #666666 |
| MISSKEY_GEN_FILE_STORAGE_PATH | yes | path string | /home/misskey/storage |

Tips
-----

### domains
web uses subdomains under primary domain:  

| subdomain name | description | implemented | need to open |
| :-- | :-- | :-- | :-- |
| auth | auth use applications | no | no |
| signup | user signup to misskey | yes | yes |
| signin | user signin point | yes | yes |
| signout | user signout point | yes | yes |
| resources | delivery css & js | yes | yes |
| about | about page | yes | yes |
| search | search posts | yes | yes |
| talk | direct messages | yes | yes |
| himasaku | api proxy | yes | yes |
| share | providing embedding share script | yes | no |

api uses subdomain under primary domain:  

| subdomain name | description | used by program | need to open |
| :-- | :-- |:-- | :-- |
| api | internal api domain | yes | no, **must not**. |

file uses secondary domain.

License
-----
public license.
