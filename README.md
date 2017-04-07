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
3. move `store` to your `$HOME/.misskey`

Tips
-----

### domains
web uses subdomains under primary domain:  

| subdomain name | description | implemented | need to open |
| :-- | :-- | :-- | :-- |
| admin | admin panel | no | no |
| auth | auth use applications | no | no |
| signup | user signup to misskey | yes | yes |
| login | user login point | yes | yes |
| logout | user logout point | yes | yes |
| resources | delivery css & js | yes | yes |
| shield | https proxy for http pictures | yes | yes |
| about | about page | yes | yes |
| search | search posts | yes | yes |
| help | help | no | no |
| talk | direct messages | yes | yes |
| forum | forum | no | no |
| himasaku | api proxy | yes | yes |
| streaming | timeline stream | yes | yes |
| dev | developer central | no | no |
| color | _mystely_ | no | no |
| share | providing embedding share script | yes | no |
| widgets | _mystely_ | no | no |

api uses subdomain under primary domain:  

| subdomain name | description | used by program | need to open |
| :-- | :-- |:-- | :-- |
| api | internal api domain | yes | no, **must not**. |

file uses secondary domain.

License
-----
public license.
