# useStoreInfo

Nano hooks are used to get the information about the current store.

```js
const {
    socialMedia: { facebook, twitter, instagram, linkedin, telegram, whatsapp },
    aboutUs,
    email,
    enamad: { imgId, imgSrc, referenceLink, metaContent },
    guild,
    logo,
    manager: { firstName, lastName },
    rayChat: { isEnabled, token },
    storeAddress,
    storeId,
    storeName,
    storeTelephoneNumber
} = useStoreInfo();
```

You can also get information such as enamad and rayChat from this hook. There is no loading or error associated with
this hook. This is because the server side is cached and geted.

In case the getStoreInfo request was not successfully received, the theme will not work. This hook is required in order
to load the theme.
