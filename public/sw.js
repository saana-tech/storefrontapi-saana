if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let i=Promise.resolve();return s[e]||(i=new Promise((async i=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=i}else importScripts(e),i()}))),i.then((()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]}))},i=(i,s)=>{Promise.all(i.map(e)).then((e=>s(1===e.length?e[0]:e)))},s={require:Promise.resolve(i)};self.define=(i,r,c)=>{s[i]||(s[i]=Promise.resolve().then((()=>{let s={};const n={uri:location.origin+i.slice(1)};return Promise.all(r.map((i=>{switch(i){case"exports":return s;case"module":return n;default:return e(i)}}))).then((e=>{const i=c(...e);return s.default||(s.default=i),s}))})))}}define("./sw.js",["./workbox-ea903bce"],(function(e){"use strict";importScripts("fallback-6ksG-53ru-fpj6QfI8-vS.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/6ksG-53ru-fpj6QfI8-vS/_buildManifest.js",revision:"6ksG-53ru-fpj6QfI8-vS"},{url:"/_next/static/6ksG-53ru-fpj6QfI8-vS/_ssgManifest.js",revision:"6ksG-53ru-fpj6QfI8-vS"},{url:"/_next/static/chunks/126-a42a790ab6175d95ad9f.js",revision:"6ksG-53ru-fpj6QfI8-vS"},{url:"/_next/static/chunks/128-69e671911029365ab65d.js",revision:"6ksG-53ru-fpj6QfI8-vS"},{url:"/_next/static/chunks/168-78af8f25dc491d5d0ad5.js",revision:"6ksG-53ru-fpj6QfI8-vS"},{url:"/_next/static/chunks/210-16c9833f960fbb88e107.js",revision:"6ksG-53ru-fpj6QfI8-vS"},{url:"/_next/static/chunks/267-df70cda5a83651984bc8.js",revision:"6ksG-53ru-fpj6QfI8-vS"},{url:"/_next/static/chunks/288-50b9539d8dafb3720fec.js",revision:"6ksG-53ru-fpj6QfI8-vS"},{url:"/_next/static/chunks/307-f75dfa3f46cd0140b149.js",revision:"6ksG-53ru-fpj6QfI8-vS"},{url:"/_next/static/chunks/419-f5cc8ad07298fe640727.js",revision:"6ksG-53ru-fpj6QfI8-vS"},{url:"/_next/static/chunks/433-f28f21edf05a5bd69eb1.js",revision:"6ksG-53ru-fpj6QfI8-vS"},{url:"/_next/static/chunks/459-f0d06d3c8f9f85cc7226.js",revision:"6ksG-53ru-fpj6QfI8-vS"},{url:"/_next/static/chunks/507-59fafd14d5fef61520f4.js",revision:"6ksG-53ru-fpj6QfI8-vS"},{url:"/_next/static/chunks/75fc9c18-9942a58048f91d946457.js",revision:"6ksG-53ru-fpj6QfI8-vS"},{url:"/_next/static/chunks/769-c88c13ce1c6b63a70168.js",revision:"6ksG-53ru-fpj6QfI8-vS"},{url:"/_next/static/chunks/87860d79-a2f0346baa7f3a65d563.js",revision:"6ksG-53ru-fpj6QfI8-vS"},{url:"/_next/static/chunks/925-b7cdf854ba84a3d3bc15.js",revision:"6ksG-53ru-fpj6QfI8-vS"},{url:"/_next/static/chunks/ff239f9d-ec9df3d4987bd5b069cf.js",revision:"6ksG-53ru-fpj6QfI8-vS"},{url:"/_next/static/chunks/framework-931d084cda32985f90f9.js",revision:"6ksG-53ru-fpj6QfI8-vS"},{url:"/_next/static/chunks/main-36bbdf33ccc305651763.js",revision:"6ksG-53ru-fpj6QfI8-vS"},{url:"/_next/static/chunks/pages/Collection-d59ab913521d3e4075a1.js",revision:"6ksG-53ru-fpj6QfI8-vS"},{url:"/_next/static/chunks/pages/Pqr-4d7cb3e751c08c26a2a0.js",revision:"6ksG-53ru-fpj6QfI8-vS"},{url:"/_next/static/chunks/pages/Product-48a46b50da317ad8a936.js",revision:"6ksG-53ru-fpj6QfI8-vS"},{url:"/_next/static/chunks/pages/Profile-fb0441c3a91f7043c1e5.js",revision:"6ksG-53ru-fpj6QfI8-vS"},{url:"/_next/static/chunks/pages/TrackingPqr-708cba15d4b1db5b1550.js",revision:"6ksG-53ru-fpj6QfI8-vS"},{url:"/_next/static/chunks/pages/_app-ad1764e7d8b5f7954e18.js",revision:"6ksG-53ru-fpj6QfI8-vS"},{url:"/_next/static/chunks/pages/_error-3878938654531582cd9a.js",revision:"6ksG-53ru-fpj6QfI8-vS"},{url:"/_next/static/chunks/pages/_offline-f8064edcb1ef0f04045b.js",revision:"6ksG-53ru-fpj6QfI8-vS"},{url:"/_next/static/chunks/pages/index-4816a41db2ec41f85bbe.js",revision:"6ksG-53ru-fpj6QfI8-vS"},{url:"/_next/static/chunks/polyfills-8683bd742a84c1edd48c.js",revision:"6ksG-53ru-fpj6QfI8-vS"},{url:"/_next/static/chunks/webpack-c415a6f57b897fc14df8.js",revision:"6ksG-53ru-fpj6QfI8-vS"},{url:"/_next/static/css/1e1564396b51d91e00b3.css",revision:"6ksG-53ru-fpj6QfI8-vS"},{url:"/_next/static/css/5591c03e82011e6ac2ea.css",revision:"6ksG-53ru-fpj6QfI8-vS"},{url:"/_next/static/css/9ed934889a74a7c92200.css",revision:"6ksG-53ru-fpj6QfI8-vS"},{url:"/_next/static/css/a6906967cfe58dc7a933.css",revision:"6ksG-53ru-fpj6QfI8-vS"},{url:"/_next/static/css/c017e7969ae504e4c68d.css",revision:"6ksG-53ru-fpj6QfI8-vS"},{url:"/_next/static/css/cd0efbfa0205dea5f1f8.css",revision:"6ksG-53ru-fpj6QfI8-vS"},{url:"/_next/static/css/e82a0d93a18a4c6c62b9.css",revision:"6ksG-53ru-fpj6QfI8-vS"},{url:"/_next/static/css/f9387d9cfd0e79733901.css",revision:"6ksG-53ru-fpj6QfI8-vS"},{url:"/_next/static/media/bannerfarma.8244517f1fcd1d96c74d8c6307e48a35.png",revision:"6ksG-53ru-fpj6QfI8-vS"},{url:"/_offline",revision:"6ksG-53ru-fpj6QfI8-vS"},{url:"/android-chrome-192x192.png",revision:"473a1927849ac26b3400fc78c1df3cc8"},{url:"/android-chrome-512x512.png",revision:"8fe677170b6cddda61d96f3357d2319b"},{url:"/apple-touch-icon.png",revision:"0108dae3cb65a40a55b62d0c48242b0b"},{url:"/favicon-16x16.png",revision:"b65dccf734df6f837271ab99d5074ec8"},{url:"/favicon-32x32.png",revision:"b45e67a232b7c43c53d2016c5c11d6c2"},{url:"/favicon.ico",revision:"804fe4c31ddde936b441d9904ab9b4d6"},{url:"/favicon.png",revision:"f163c48a9be074189326a620dc06bdd2"},{url:"/icons/android-icon-144x144.png",revision:"da9e7388c44a4f340cbb5959ed3b70d5"},{url:"/icons/android-icon-192x192.png",revision:"72903ba5a897abec83fd0cf229be7924"},{url:"/icons/android-icon-36x36.png",revision:"8d3e110e6750ebaec403f6c2c91f3b07"},{url:"/icons/android-icon-48x48.png",revision:"d34e160ced12dbf201e6d02207610272"},{url:"/icons/android-icon-72x72.png",revision:"70f1999da5accf2eda9844a5c82391ed"},{url:"/icons/android-icon-96x96.png",revision:"519ce0aba33ef62ca00f1cb78b6fcd26"},{url:"/icons/apple-icon-114x114.png",revision:"ec81b63b3d48065fbf9b274f6efb73fe"},{url:"/icons/apple-icon-120x120.png",revision:"4c6c67ae4deb4e3339f041490a757884"},{url:"/icons/apple-icon-144x144.png",revision:"da9e7388c44a4f340cbb5959ed3b70d5"},{url:"/icons/apple-icon-152x152.png",revision:"3f52c3841072caef5872b5a2ce7cadb0"},{url:"/icons/apple-icon-180x180.png",revision:"22499b1c6d73323eaab223c2fd12c38c"},{url:"/icons/apple-icon-57x57.png",revision:"055aad830c168530f18a3276fc84920f"},{url:"/icons/apple-icon-60x60.png",revision:"f9b34be9a893f4ed10d9df6535fda7f1"},{url:"/icons/apple-icon-72x72.png",revision:"70f1999da5accf2eda9844a5c82391ed"},{url:"/icons/apple-icon-76x76.png",revision:"29e4f027052e209c1dbc5495a11ff18d"},{url:"/icons/apple-icon-precomposed.png",revision:"a52f33362cd0690bfee1fd149a0a0267"},{url:"/icons/apple-icon.png",revision:"a52f33362cd0690bfee1fd149a0a0267"},{url:"/icons/browserconfig.xml",revision:"653d077300a12f09a69caeea7a8947f8"},{url:"/icons/favicon-16x16.png",revision:"23c427377688bc1b317f8159870395c8"},{url:"/icons/favicon-32x32.png",revision:"13804c212146c13c3609e959e36cf99d"},{url:"/icons/favicon-96x96.png",revision:"519ce0aba33ef62ca00f1cb78b6fcd26"},{url:"/icons/favicon.ico",revision:"a25c13d4c56cdd177e556dc61833d941"},{url:"/icons/ms-icon-144x144.png",revision:"da9e7388c44a4f340cbb5959ed3b70d5"},{url:"/icons/ms-icon-150x150.png",revision:"de1c4c8426f7725ec6ef4d9290d5a3f2"},{url:"/icons/ms-icon-310x310.png",revision:"3b68ade4bd6ef84f226a0f7ae9a57ca5"},{url:"/icons/ms-icon-70x70.png",revision:"637b8f414c65a8bafbfe8e7f51fc2dcf"},{url:"/manifest.json",revision:"b58fcfa7628c9205cb11a1b2c3e8f99a"},{url:"/site.webmanifest",revision:"053100cb84a50d2ae7f5492f7dd7f25e"},{url:"/static/fonts/Avenir/AvenirNextLTPro-Bold.otf",revision:"52541b092f10c99be21f3205bf8e219d"},{url:"/static/fonts/Avenir/AvenirNextLTPro-BoldCond.otf",revision:"620d8db93354386894c77585b3b9f247"},{url:"/static/fonts/Avenir/AvenirNextLTPro-BoldCondItalic.otf",revision:"7271c21730c03478e5ed51ed95eb83dc"},{url:"/static/fonts/Avenir/AvenirNextLTPro-BoldItalic.otf",revision:"9dbe7a6b333f1c86dd545ac694023cd0"},{url:"/static/fonts/Avenir/AvenirNextLTPro-CondItalic.otf",revision:"6c04480690bb0b442415949a8e1fef76"},{url:"/static/fonts/Avenir/AvenirNextLTPro-CondRegular.otf",revision:"1689d62f3e1c6fe3c38845e9291a6b25"},{url:"/static/fonts/Avenir/AvenirNextLTPro-Demi.otf",revision:"472d97a823bc74eca3293c8198208d89"},{url:"/static/fonts/Avenir/AvenirNextLTPro-DemiCond.otf",revision:"6c1e06f7960c7f023c549214ca041b7e"},{url:"/static/fonts/Avenir/AvenirNextLTPro-DemiCondItalic.otf",revision:"d5e447c608bb6367927bb380cfd1fec6"},{url:"/static/fonts/Avenir/AvenirNextLTPro-DemiItalic.otf",revision:"d4b54a38e125f4d9819f1662e17303a5"},{url:"/static/fonts/Avenir/AvenirNextLTPro-Heavy.otf",revision:"8c6980117ec4b3fdfdf4881468cc88d4"},{url:"/static/fonts/Avenir/AvenirNextLTPro-HeavyCond.otf",revision:"7fa20f529a08adf0829adb29f47ab52e"},{url:"/static/fonts/Avenir/AvenirNextLTPro-HeavyCondItalic.otf",revision:"9bc0b8dec521743950f13c1ee635bc16"},{url:"/static/fonts/Avenir/AvenirNextLTPro-HeavyItalic.otf",revision:"ab31d4beaa2e0649230cb1c29a161e11"},{url:"/static/fonts/Avenir/AvenirNextLTPro-Italic.otf",revision:"11acd669532846dc348182c01c75cfe3"},{url:"/static/fonts/Avenir/AvenirNextLTPro-Light.otf",revision:"7be5411c85de426f348a8754f082d17e"},{url:"/static/fonts/Avenir/AvenirNextLTPro-LightCond.otf",revision:"2fe23de0e5202342fe93d16ac42dac6d"},{url:"/static/fonts/Avenir/AvenirNextLTPro-LightCondItalic.otf",revision:"9f59accb5a671f96591f98eab4e05e56"},{url:"/static/fonts/Avenir/AvenirNextLTPro-LightItalic.otf",revision:"96725b8db121dcf1b746b4e2dfb65769"},{url:"/static/fonts/Avenir/AvenirNextLTPro-Medium.otf",revision:"751cdac5cfc9c37deefa6180a27a831d"},{url:"/static/fonts/Avenir/AvenirNextLTPro-MediumCond.otf",revision:"dd2e048c6360d830076f9c09506ab588"},{url:"/static/fonts/Avenir/AvenirNextLTPro-MediumCondItalic.otf",revision:"1011d53a68f9435e30f1ed2ce84356b1"},{url:"/static/fonts/Avenir/AvenirNextLTPro-MediumItalic.otf",revision:"a4544d03158de1296d56645fd6c43d77"},{url:"/static/fonts/Avenir/AvenirNextLTPro-Regular.otf",revision:"b62f8f0b14aebd847dcc75a459018f69"},{url:"/static/fonts/Avenir/AvenirNextLTPro-Thin.otf",revision:"286a9b6d5d3f0ca21468acf4d8c56a48"},{url:"/static/fonts/Avenir/AvenirNextLTPro-ThinCond.otf",revision:"94f80d7d0594d19e78e7dff1e6cd1de0"},{url:"/static/fonts/Avenir/AvenirNextLTPro-ThinCondItalic.otf",revision:"102038058e40ca7c6052ae339a645d40"},{url:"/static/fonts/Avenir/AvenirNextLTPro-ThinItalic.otf",revision:"1a60c9a29d91fab32b3faa9d4a7becba"},{url:"/static/fonts/Avenir/AvenirNextLTPro-Ultralight.otf",revision:"f069bf440bb5156f18e3cc57a64f2994"},{url:"/static/fonts/Avenir/AvenirNextLTPro-UltralightCond.otf",revision:"64566142f7b7b4a9d8df05a0b54c10c6"},{url:"/static/fonts/Avenir/AvenirNextLTPro-UltralightCondItalic.otf",revision:"d099b71c266cff10a2e8cd539ea40115"},{url:"/static/fonts/Avenir/AvenirNextLTPro-UltralightItalic.otf",revision:"3468f4c3b0c5c895eb125b0471ea8043"},{url:"/static/fonts/Avenir/Icon_",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"/static/fonts/utopia/UtopiaStd-Bold.otf",revision:"63939a5a2b78ba0c3c6c29d334e19324"},{url:"/static/fonts/utopia/UtopiaStd-BoldIt.otf",revision:"c9535b6ce86c829a55e852cc33c6fe97"},{url:"/static/fonts/utopia/UtopiaStd-Italic.otf",revision:"a9a97550a81c1a549f8068d61600f5fd"},{url:"/static/fonts/utopia/UtopiaStd-Regular.otf",revision:"526a79bc597b883eb186d5288bd401af"},{url:"/static/fonts/utopia/UtopiaStd-Semibold.otf",revision:"c0b137ed672fb19c9f42632247c0dcef"},{url:"/static/fonts/utopia/UtopiaStd-SemiboldIt.otf",revision:"8c810e35d3ab987c13902cf460d33385"},{url:"/static/img/bannerfarma.png",revision:"a6279ad9e024faea3fff1f610c874596"},{url:"/static/img/imgDisabled.png",revision:"d94367947fbf81fc0a8987d28c6a2f03"},{url:"/static/img/mercadopago.png",revision:"a827a260362794509c0f07131d3c4911"},{url:"/static/img/superitc.png",revision:"9e90d44c626db2d9ccb5e29b2729766f"},{url:"/static/img/user.png",revision:"5405d77c51fb46a0cbf26cb96fe4da4d"},{url:"/static/manifest.json",revision:"5d1512e339bfba42260d24e7cf29f19e"},{url:"/static/svg/ArrowDown.js",revision:"1af7e1f753971c6a76761807bb2498b6"},{url:"/static/svg/ArrowLeft.js",revision:"5c303dcf9c1482d55686ac989d282876"},{url:"/static/svg/ArrowRight.js",revision:"c6e245650b1397908132c33b41220c0f"},{url:"/static/svg/CartIcon.js",revision:"5e83e762f6b5731ad634f9c92b06b906"},{url:"/static/svg/CloseIcon.js",revision:"e6b03315e8804e85fa2d6727d599c3ea"},{url:"/static/svg/IconCategory.js",revision:"b22f168e387d8d18e35164b2578df7d6"},{url:"/static/svg/IconCheck.js",revision:"e593efb3d7ea2dcfd69e1f81c7c01d96"},{url:"/static/svg/IconCloseModal.js",revision:"6f2d252a33548a2c125b972cc20e54b7"},{url:"/static/svg/IconCloseNotification.js",revision:"a0b024da826deda4704f80dc7c2ca9b5"},{url:"/static/svg/IconCloseWhite.js",revision:"530f62b3764ee02acab7c64406349c5d"},{url:"/static/svg/IconDelete.js",revision:"0b7896ef50eaa4568241382676c49f32"},{url:"/static/svg/IconEmpty.js",revision:"ffe801504ce43a5fd4fdd4cb01d966ad"},{url:"/static/svg/IconHome.js",revision:"a76ab3db06443d2a00efafca55b123b7"},{url:"/static/svg/IconMenuBar.js",revision:"9767c6a3f3eb3370047e3e3aaf7ca71a"},{url:"/static/svg/IconPin.js",revision:"d9073e9f9c337d988bf297fc8cd830e5"},{url:"/static/svg/IconService.js",revision:"f0a23b92623085bf918c2f18951cdb64"},{url:"/static/svg/IconServiceLine.js",revision:"e405ade2c12c99aedce85c837f590e93"},{url:"/static/svg/IconServices.js",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"/static/svg/IconStart.js",revision:"d5636a0b0b88ee1e33de6043b367045d"},{url:"/static/svg/IconUser.js",revision:"4ce79c06ab57a11bd227c0145bad22e1"},{url:"/static/svg/IconWhatsapp.js",revision:"6b8f971513c0cde6fb3fd4216e38f1bf"},{url:"/static/svg/PinIcon.js",revision:"9decf73639f597f02ebea1b2b9545bab"},{url:"/static/svg/SearchIcon.js",revision:"5d71567ce1b2672f6dbf25c771613445"},{url:"/vercel.svg",revision:"26bf2d0adaf1028a4d4c6ee77005e819"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:i,event:s,state:r})=>i&&"opaqueredirect"===i.type?new Response(i.body,{status:200,statusText:"OK",headers:i.headers}):i},{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:mp3|mp4)$/i,new e.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const i=e.pathname;return!i.startsWith("/api/auth/")&&!!i.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));