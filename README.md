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
