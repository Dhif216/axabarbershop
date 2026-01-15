(()=>{var a={};a.id=746,a.ids=[746],a.modules={261:a=>{"use strict";a.exports=require("next/dist/shared/lib/router/utils/app-paths")},3295:a=>{"use strict";a.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},10846:a=>{"use strict";a.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},19121:a=>{"use strict";a.exports=require("next/dist/server/app-render/action-async-storage.external.js")},29294:a=>{"use strict";a.exports=require("next/dist/server/app-render/work-async-storage.external.js")},44870:a=>{"use strict";a.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},63033:a=>{"use strict";a.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},77598:a=>{"use strict";a.exports=require("node:crypto")},78335:()=>{},85748:(a,b,c)=>{"use strict";c.r(b),c.d(b,{handler:()=>D,patchFetch:()=>C,routeModule:()=>y,serverHooks:()=>B,workAsyncStorage:()=>z,workUnitAsyncStorage:()=>A});var d={};c.r(d),c.d(d,{POST:()=>x});var e=c(95736),f=c(9117),g=c(4044),h=c(39326),i=c(32324),j=c(261),k=c(54290),l=c(85328),m=c(38928),n=c(46595),o=c(3421),p=c(17679),q=c(41681),r=c(63446),s=c(86439),t=c(51356),u=c(10641),v=c(28342);let w={en:{subject:"Contact Form Submission - AXA Barbershop",getCustomerHtml:a=>`
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1F4D3A; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background-color: #f5f5f0; padding: 20px; border-radius: 0 0 8px 8px; }
            .footer { color: #666; font-size: 12px; text-align: center; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>AXA BARBERSHOP</h1>
              <p>Message Received</p>
            </div>
            <div class="content">
              <p>Hi ${a.name},</p>
              <p>Thank you for contacting AXA Barbershop! We have received your message and will get back to you as soon as possible.</p>
              
              <p><strong>Your Message:</strong></p>
              <p style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #d4a574;">
                ${a.message.replace(/\n/g,"<br>")}
              </p>
              
              <p>Our team will review your message and respond to you shortly at ${a.email}.</p>
              
              <p>If you have an urgent matter, please call us at:</p>
              <p><strong>+358 41 3134978</strong></p>
              
              <p>Best regards,<br><strong>AXA Barbershop Team</strong></p>
            </div>
            <div class="footer">
              <p>This is an automated message, please do not reply to this email.</p>
            </div>
          </div>
        </body>
      </html>
    `,getBusinessHtml:a=>`
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1F4D3A; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background-color: #f5f5f0; padding: 20px; border-radius: 0 0 8px 8px; }
            .details { background-color: white; padding: 15px; border-radius: 4px; margin: 15px 0; border-left: 4px solid #d4a574; }
            .label { font-weight: bold; color: #1F4D3A; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Contact Form Submission</h1>
            </div>
            <div class="content">
              <div class="details">
                <p><span class="label">Name:</span> ${a.name}</p>
                <p><span class="label">Email:</span> ${a.email}</p>
              </div>
              
              <p><strong>Message:</strong></p>
              <div class="details">
                <p>${a.message.replace(/\n/g,"<br>")}</p>
              </div>
              
              <p>Please respond to the customer as soon as possible.</p>
            </div>
          </div>
        </body>
      </html>
    `},fi:{subject:"Yhteydenottolomakkeen l\xe4hetys - AXA Parturipalvelu",getCustomerHtml:a=>`
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1F4D3A; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background-color: #f5f5f0; padding: 20px; border-radius: 0 0 8px 8px; }
            .footer { color: #666; font-size: 12px; text-align: center; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>AXA PARTURIPALVELU</h1>
              <p>Viesti vastaanotettu</p>
            </div>
            <div class="content">
              <p>Hei ${a.name},</p>
              <p>Kiitos yhteydenotostasi AXA Parturipalveluun! Olemme vastaanottaneet viestisi ja vastaamme siihen mahdollisimman pian.</p>
              
              <p><strong>Viestisi:</strong></p>
              <p style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #d4a574;">
                ${a.message.replace(/\n/g,"<br>")}
              </p>
              
              <p>Tiimimme tarkistaa viestisi ja vastaa sinulle pian osoitteeseen ${a.email}.</p>
              
              <p>Jos asiasi on kiireellinen, soita meille:</p>
              <p><strong>+358 41 3134978</strong></p>
              
              <p>Yst\xe4v\xe4llisin terveisin,<br><strong>AXA Parturipalvelu -tiimi</strong></p>
            </div>
            <div class="footer">
              <p>T\xe4m\xe4 on automaattinen viesti, \xe4l\xe4 vastaa t\xe4h\xe4n s\xe4hk\xf6postiin.</p>
            </div>
          </div>
        </body>
      </html>
    `,getBusinessHtml:a=>`
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1F4D3A; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background-color: #f5f5f0; padding: 20px; border-radius: 0 0 8px 8px; }
            .details { background-color: white; padding: 15px; border-radius: 4px; margin: 15px 0; border-left: 4px solid #d4a574; }
            .label { font-weight: bold; color: #1F4D3A; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Uusi yhteydenottolomakkeen l\xe4hetys</h1>
            </div>
            <div class="content">
              <div class="details">
                <p><span class="label">Nimi:</span> ${a.name}</p>
                <p><span class="label">S\xe4hk\xf6posti:</span> ${a.email}</p>
              </div>
              
              <p><strong>Viesti:</strong></p>
              <div class="details">
                <p>${a.message.replace(/\n/g,"<br>")}</p>
              </div>
              
              <p>Vastaa asiakkaalle mahdollisimman pian.</p>
            </div>
          </div>
        </body>
      </html>
    `}};async function x(a){try{if(!process.env.RESEND_API_KEY)return console.error("RESEND_API_KEY is not set"),u.NextResponse.json({error:"Email service not configured"},{status:500});let b=new v.u(process.env.RESEND_API_KEY),c=await a.json();if(!c.name||!c.email||!c.message)return u.NextResponse.json({error:"Missing required fields"},{status:400});if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email))return u.NextResponse.json({error:"Invalid email format"},{status:400});if(c.message.length<10)return u.NextResponse.json({error:"Message must be at least 10 characters long"},{status:400});let d=w[c.language||"en"]||w.en,e=`
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; color: #333; }
            .info-box { background-color: #fff3cd; padding: 10px; margin-bottom: 15px; border-radius: 4px; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="info-box">
            <p><strong>TESTING MODE:</strong> This email would be sent to ${c.email}</p>
          </div>
          ${d.getCustomerHtml(c)}
        </body>
      </html>
    `,f=await b.emails.send({from:"onboarding@resend.dev",to:"migatron2012@gmail.com",subject:`[TO: ${c.email}] ${d.subject}`,html:e});return await b.emails.send({from:"onboarding@resend.dev",to:"migatron2012@gmail.com",subject:`New Contact Form - ${c.name}`,html:d.getBusinessHtml(c)}),u.NextResponse.json({success:!0,message:"Message sent successfully",contactId:f.data?.id||"sent"},{status:200})}catch(b){console.error("Contact API error:",b);let a=b instanceof Error?b.message:"An error occurred";return u.NextResponse.json({error:a||"Failed to process contact form"},{status:500})}}let y=new e.AppRouteRouteModule({definition:{kind:f.RouteKind.APP_ROUTE,page:"/api/contact/route",pathname:"/api/contact",filename:"route",bundlePath:"app/api/contact/route"},distDir:".next",relativeProjectDir:"",resolvedPagePath:"C:\\Users\\dhif_\\OneDrive\\Desktop\\AXA\\app\\api\\contact\\route.ts",nextConfigOutput:"",userland:d}),{workAsyncStorage:z,workUnitAsyncStorage:A,serverHooks:B}=y;function C(){return(0,g.patchFetch)({workAsyncStorage:z,workUnitAsyncStorage:A})}async function D(a,b,c){var d;let e="/api/contact/route";"/index"===e&&(e="/");let g=await y.prepare(a,b,{srcPage:e,multiZoneDraftMode:!1});if(!g)return b.statusCode=400,b.end("Bad Request"),null==c.waitUntil||c.waitUntil.call(c,Promise.resolve()),null;let{buildId:u,params:v,nextConfig:w,isDraftMode:x,prerenderManifest:z,routerServerContext:A,isOnDemandRevalidate:B,revalidateOnlyGenerated:C,resolvedPathname:D}=g,E=(0,j.normalizeAppPath)(e),F=!!(z.dynamicRoutes[E]||z.routes[D]);if(F&&!x){let a=!!z.routes[D],b=z.dynamicRoutes[E];if(b&&!1===b.fallback&&!a)throw new s.NoFallbackError}let G=null;!F||y.isDev||x||(G="/index"===(G=D)?"/":G);let H=!0===y.isDev||!F,I=F&&!H,J=a.method||"GET",K=(0,i.getTracer)(),L=K.getActiveScopeSpan(),M={params:v,prerenderManifest:z,renderOpts:{experimental:{cacheComponents:!!w.experimental.cacheComponents,authInterrupts:!!w.experimental.authInterrupts},supportsDynamicResponse:H,incrementalCache:(0,h.getRequestMeta)(a,"incrementalCache"),cacheLifeProfiles:null==(d=w.experimental)?void 0:d.cacheLife,isRevalidate:I,waitUntil:c.waitUntil,onClose:a=>{b.on("close",a)},onAfterTaskError:void 0,onInstrumentationRequestError:(b,c,d)=>y.onRequestError(a,b,d,A)},sharedContext:{buildId:u}},N=new k.NodeNextRequest(a),O=new k.NodeNextResponse(b),P=l.NextRequestAdapter.fromNodeNextRequest(N,(0,l.signalFromNodeResponse)(b));try{let d=async c=>y.handle(P,M).finally(()=>{if(!c)return;c.setAttributes({"http.status_code":b.statusCode,"next.rsc":!1});let d=K.getRootSpanAttributes();if(!d)return;if(d.get("next.span_type")!==m.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${d.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let e=d.get("next.route");if(e){let a=`${J} ${e}`;c.setAttributes({"next.route":e,"http.route":e,"next.span_name":a}),c.updateName(a)}else c.updateName(`${J} ${a.url}`)}),g=async g=>{var i,j;let k=async({previousCacheEntry:f})=>{try{if(!(0,h.getRequestMeta)(a,"minimalMode")&&B&&C&&!f)return b.statusCode=404,b.setHeader("x-nextjs-cache","REVALIDATED"),b.end("This page could not be found"),null;let e=await d(g);a.fetchMetrics=M.renderOpts.fetchMetrics;let i=M.renderOpts.pendingWaitUntil;i&&c.waitUntil&&(c.waitUntil(i),i=void 0);let j=M.renderOpts.collectedTags;if(!F)return await (0,o.I)(N,O,e,M.renderOpts.pendingWaitUntil),null;{let a=await e.blob(),b=(0,p.toNodeOutgoingHttpHeaders)(e.headers);j&&(b[r.NEXT_CACHE_TAGS_HEADER]=j),!b["content-type"]&&a.type&&(b["content-type"]=a.type);let c=void 0!==M.renderOpts.collectedRevalidate&&!(M.renderOpts.collectedRevalidate>=r.INFINITE_CACHE)&&M.renderOpts.collectedRevalidate,d=void 0===M.renderOpts.collectedExpire||M.renderOpts.collectedExpire>=r.INFINITE_CACHE?void 0:M.renderOpts.collectedExpire;return{value:{kind:t.CachedRouteKind.APP_ROUTE,status:e.status,body:Buffer.from(await a.arrayBuffer()),headers:b},cacheControl:{revalidate:c,expire:d}}}}catch(b){throw(null==f?void 0:f.isStale)&&await y.onRequestError(a,b,{routerKind:"App Router",routePath:e,routeType:"route",revalidateReason:(0,n.c)({isRevalidate:I,isOnDemandRevalidate:B})},A),b}},l=await y.handleResponse({req:a,nextConfig:w,cacheKey:G,routeKind:f.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:z,isRoutePPREnabled:!1,isOnDemandRevalidate:B,revalidateOnlyGenerated:C,responseGenerator:k,waitUntil:c.waitUntil});if(!F)return null;if((null==l||null==(i=l.value)?void 0:i.kind)!==t.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==l||null==(j=l.value)?void 0:j.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});(0,h.getRequestMeta)(a,"minimalMode")||b.setHeader("x-nextjs-cache",B?"REVALIDATED":l.isMiss?"MISS":l.isStale?"STALE":"HIT"),x&&b.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let m=(0,p.fromNodeOutgoingHttpHeaders)(l.value.headers);return(0,h.getRequestMeta)(a,"minimalMode")&&F||m.delete(r.NEXT_CACHE_TAGS_HEADER),!l.cacheControl||b.getHeader("Cache-Control")||m.get("Cache-Control")||m.set("Cache-Control",(0,q.getCacheControlHeader)(l.cacheControl)),await (0,o.I)(N,O,new Response(l.value.body,{headers:m,status:l.value.status||200})),null};L?await g(L):await K.withPropagatedContext(a.headers,()=>K.trace(m.BaseServerSpan.handleRequest,{spanName:`${J} ${a.url}`,kind:i.SpanKind.SERVER,attributes:{"http.method":J,"http.target":a.url}},g))}catch(b){if(b instanceof s.NoFallbackError||await y.onRequestError(a,b,{routerKind:"App Router",routePath:E,routeType:"route",revalidateReason:(0,n.c)({isRevalidate:I,isOnDemandRevalidate:B})}),F)throw b;return await (0,o.I)(N,O,new Response(null,{status:500})),null}}},86439:a=>{"use strict";a.exports=require("next/dist/shared/lib/no-fallback-error.external")},96487:()=>{}};var b=require("../../../webpack-runtime.js");b.C(a);var c=b.X(0,[586,692,342],()=>b(b.s=85748));module.exports=c})();