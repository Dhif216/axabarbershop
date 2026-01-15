(()=>{var a={};a.id=103,a.ids=[103],a.modules={261:a=>{"use strict";a.exports=require("next/dist/shared/lib/router/utils/app-paths")},3295:a=>{"use strict";a.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},10846:a=>{"use strict";a.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},12042:(a,b,c)=>{"use strict";c.r(b),c.d(b,{handler:()=>F,patchFetch:()=>E,routeModule:()=>A,serverHooks:()=>D,workAsyncStorage:()=>B,workUnitAsyncStorage:()=>C});var d={};c.r(d),c.d(d,{POST:()=>z});var e=c(95736),f=c(9117),g=c(4044),h=c(39326),i=c(32324),j=c(261),k=c(54290),l=c(85328),m=c(38928),n=c(46595),o=c(3421),p=c(17679),q=c(41681),r=c(63446),s=c(86439),t=c(51356),u=c(10641),v=c(28342),w=c(23622);let x={Haircut:25,"Beard Trim":15,"Hair & Beard":35,"Kids Haircut":20,"Hair Wash":10,Styling:20,Combo:50,Leikkaus:25,"Parran Leikkaus":15,"Leikkaus & Parta":35,"Lasten Leikkaus":20,"Hiusten Pesu":10,Kampaus:20,"Combo-paketti":50},y={en:{subject:"Booking Confirmation - AXA Barbershop",getHtml:a=>`
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1F4D3A; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background-color: #f5f5f0; padding: 20px; border-radius: 0 0 8px 8px; }
            .details { background-color: white; padding: 15px; border-radius: 4px; margin: 15px 0; border-left: 4px solid #d4a574; }
            .label { font-weight: bold; color: #1F4D3A; }
            .footer { color: #666; font-size: 12px; text-align: center; margin-top: 20px; }
            .button { background-color: #1F4D3A; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>AXA BARBERSHOP</h1>
              <p>Booking Confirmation</p>
            </div>
            <div class="content">
              <p>Hi ${a.name},</p>
              <p>Thank you for booking with AXA Barbershop! Your appointment has been confirmed.</p>
              
              <div class="details">
                <p><span class="label">Service:</span> ${a.service}</p>
                <p><span class="label">Date:</span> ${new Date(a.date).toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</p>
                <p><span class="label">Time:</span> ${a.time}</p>
                <p><span class="label">Phone:</span> ${a.phone}</p>
                ${a.notes?`<p><span class="label">Notes:</span> ${a.notes}</p>`:""}
              </div>
              
              <p>Our address:</p>
              <p>Rullakkotori 1 LT 2<br>00240 Helsinki<br>Finland</p>
              
              <p>If you need to reschedule or cancel, please contact us at:</p>
              <p>Phone: +358 41 3134978<br>Email: info@axabarbershop.fi</p>
              
              <p>We look forward to seeing you!</p>
              <p>Best regards,<br><strong>AXA Barbershop Team</strong></p>
            </div>
            <div class="footer">
              <p>This is an automated message, please do not reply to this email.</p>
            </div>
          </div>
        </body>
      </html>
    `},fi:{subject:"Varausvahvistus - AXA Parturipalvelu",getHtml:a=>`
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1F4D3A; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background-color: #f5f5f0; padding: 20px; border-radius: 0 0 8px 8px; }
            .details { background-color: white; padding: 15px; border-radius: 4px; margin: 15px 0; border-left: 4px solid #d4a574; }
            .label { font-weight: bold; color: #1F4D3A; }
            .footer { color: #666; font-size: 12px; text-align: center; margin-top: 20px; }
            .button { background-color: #1F4D3A; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>AXA PARTURIPALVELU</h1>
              <p>Varausvahvistus</p>
            </div>
            <div class="content">
              <p>Hei ${a.name},</p>
              <p>Kiitos varauksestasi AXA Parturipalveluun! Varauksesi on vahvistettu.</p>
              
              <div class="details">
                <p><span class="label">Palvelu:</span> ${a.service}</p>
                <p><span class="label">P\xe4iv\xe4:</span> ${new Date(a.date).toLocaleDateString("fi-FI",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</p>
                <p><span class="label">Aika:</span> ${a.time}</p>
                <p><span class="label">Puhelin:</span> ${a.phone}</p>
                ${a.notes?`<p><span class="label">Huomautukset:</span> ${a.notes}</p>`:""}
              </div>
              
              <p>Osoitteemme:</p>
              <p>Rullakkotori 1 LT 2<br>00240 Helsinki<br>Suomi</p>
              
              <p>Jos haluat siirt\xe4\xe4 tai peruuttaa varauksen, ota yhteytt\xe4:</p>
              <p>Puhelin: +358 41 3134978<br>S\xe4hk\xf6posti: info@axabarbershop.fi</p>
              
              <p>N\xe4hd\xe4\xe4n pian!</p>
              <p>Yst\xe4v\xe4llisin terveisin,<br><strong>AXA Parturipalvelu -tiimi</strong></p>
            </div>
            <div class="footer">
              <p>T\xe4m\xe4 on automaattinen viesti, \xe4l\xe4 vastaa t\xe4h\xe4n s\xe4hk\xf6postiin.</p>
            </div>
          </div>
        </body>
      </html>
    `}};async function z(a){try{if(!process.env.RESEND_API_KEY)return console.error("RESEND_API_KEY is not set"),u.NextResponse.json({error:"Email service not configured"},{status:500});let b=new v.u(process.env.RESEND_API_KEY),c=await a.json();if(!c.name||!c.email||!c.phone||!c.service||!c.date||!c.time)return u.NextResponse.json({error:"Missing required fields"},{status:400});if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email))return u.NextResponse.json({error:"Invalid email format"},{status:400});let d=y[c.language]||y.en,e=`
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; color: #333; }
          </style>
        </head>
        <body>
          ${d.getHtml(c)}
        </body>
      </html>
    `,f=await b.emails.send({from:"onboarding@resend.dev",to:c.email,subject:d.subject,html:e});f.error?console.error("Failed to send customer email:",f.error):f.data&&console.log("Customer email sent:",f.data.id);let g=await b.emails.send({from:"onboarding@resend.dev",to:"migatron2012@gmail.com",subject:`New Booking - ${c.name}`,html:`
        <html>
          <body style="font-family: Arial, sans-serif;">
            <h2>New Booking Notification</h2>
            <p><strong>Customer Name:</strong> ${c.name}</p>
            <p><strong>Email:</strong> ${c.email}</p>
            <p><strong>Phone:</strong> ${c.phone}</p>
            <p><strong>Service:</strong> ${c.service}</p>
            <p><strong>Date:</strong> ${new Date(c.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${c.time}</p>
            ${c.notes?`<p><strong>Customer Notes:</strong> ${c.notes}</p>`:""}
          </body>
        </html>
      `});g.error?console.error("Failed to send business email:",g.error):g.data&&console.log("Business email sent:",g.data.id);let h=await w.z.booking.create({data:{service:c.service,date:c.date,time:c.time,name:c.name,email:c.email,phone:c.phone,language:c.language,status:"confirmed",price:x[c.service]||25,notes:c.notes||null}});return await w.z.reservedSlot.deleteMany({where:{date:c.date,time:c.time}}),u.NextResponse.json({success:!0,message:"Booking confirmed and email sent",bookingId:h.id},{status:200})}catch(b){console.error("Booking API error:",b);let a=b instanceof Error?b.message:"An error occurred";return u.NextResponse.json({error:a||"Failed to process booking"},{status:500})}}let A=new e.AppRouteRouteModule({definition:{kind:f.RouteKind.APP_ROUTE,page:"/api/booking/route",pathname:"/api/booking",filename:"route",bundlePath:"app/api/booking/route"},distDir:".next",relativeProjectDir:"",resolvedPagePath:"C:\\Users\\dhif_\\OneDrive\\Desktop\\AXA\\app\\api\\booking\\route.ts",nextConfigOutput:"",userland:d}),{workAsyncStorage:B,workUnitAsyncStorage:C,serverHooks:D}=A;function E(){return(0,g.patchFetch)({workAsyncStorage:B,workUnitAsyncStorage:C})}async function F(a,b,c){var d;let e="/api/booking/route";"/index"===e&&(e="/");let g=await A.prepare(a,b,{srcPage:e,multiZoneDraftMode:!1});if(!g)return b.statusCode=400,b.end("Bad Request"),null==c.waitUntil||c.waitUntil.call(c,Promise.resolve()),null;let{buildId:u,params:v,nextConfig:w,isDraftMode:x,prerenderManifest:y,routerServerContext:z,isOnDemandRevalidate:B,revalidateOnlyGenerated:C,resolvedPathname:D}=g,E=(0,j.normalizeAppPath)(e),F=!!(y.dynamicRoutes[E]||y.routes[D]);if(F&&!x){let a=!!y.routes[D],b=y.dynamicRoutes[E];if(b&&!1===b.fallback&&!a)throw new s.NoFallbackError}let G=null;!F||A.isDev||x||(G="/index"===(G=D)?"/":G);let H=!0===A.isDev||!F,I=F&&!H,J=a.method||"GET",K=(0,i.getTracer)(),L=K.getActiveScopeSpan(),M={params:v,prerenderManifest:y,renderOpts:{experimental:{cacheComponents:!!w.experimental.cacheComponents,authInterrupts:!!w.experimental.authInterrupts},supportsDynamicResponse:H,incrementalCache:(0,h.getRequestMeta)(a,"incrementalCache"),cacheLifeProfiles:null==(d=w.experimental)?void 0:d.cacheLife,isRevalidate:I,waitUntil:c.waitUntil,onClose:a=>{b.on("close",a)},onAfterTaskError:void 0,onInstrumentationRequestError:(b,c,d)=>A.onRequestError(a,b,d,z)},sharedContext:{buildId:u}},N=new k.NodeNextRequest(a),O=new k.NodeNextResponse(b),P=l.NextRequestAdapter.fromNodeNextRequest(N,(0,l.signalFromNodeResponse)(b));try{let d=async c=>A.handle(P,M).finally(()=>{if(!c)return;c.setAttributes({"http.status_code":b.statusCode,"next.rsc":!1});let d=K.getRootSpanAttributes();if(!d)return;if(d.get("next.span_type")!==m.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${d.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let e=d.get("next.route");if(e){let a=`${J} ${e}`;c.setAttributes({"next.route":e,"http.route":e,"next.span_name":a}),c.updateName(a)}else c.updateName(`${J} ${a.url}`)}),g=async g=>{var i,j;let k=async({previousCacheEntry:f})=>{try{if(!(0,h.getRequestMeta)(a,"minimalMode")&&B&&C&&!f)return b.statusCode=404,b.setHeader("x-nextjs-cache","REVALIDATED"),b.end("This page could not be found"),null;let e=await d(g);a.fetchMetrics=M.renderOpts.fetchMetrics;let i=M.renderOpts.pendingWaitUntil;i&&c.waitUntil&&(c.waitUntil(i),i=void 0);let j=M.renderOpts.collectedTags;if(!F)return await (0,o.I)(N,O,e,M.renderOpts.pendingWaitUntil),null;{let a=await e.blob(),b=(0,p.toNodeOutgoingHttpHeaders)(e.headers);j&&(b[r.NEXT_CACHE_TAGS_HEADER]=j),!b["content-type"]&&a.type&&(b["content-type"]=a.type);let c=void 0!==M.renderOpts.collectedRevalidate&&!(M.renderOpts.collectedRevalidate>=r.INFINITE_CACHE)&&M.renderOpts.collectedRevalidate,d=void 0===M.renderOpts.collectedExpire||M.renderOpts.collectedExpire>=r.INFINITE_CACHE?void 0:M.renderOpts.collectedExpire;return{value:{kind:t.CachedRouteKind.APP_ROUTE,status:e.status,body:Buffer.from(await a.arrayBuffer()),headers:b},cacheControl:{revalidate:c,expire:d}}}}catch(b){throw(null==f?void 0:f.isStale)&&await A.onRequestError(a,b,{routerKind:"App Router",routePath:e,routeType:"route",revalidateReason:(0,n.c)({isRevalidate:I,isOnDemandRevalidate:B})},z),b}},l=await A.handleResponse({req:a,nextConfig:w,cacheKey:G,routeKind:f.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:y,isRoutePPREnabled:!1,isOnDemandRevalidate:B,revalidateOnlyGenerated:C,responseGenerator:k,waitUntil:c.waitUntil});if(!F)return null;if((null==l||null==(i=l.value)?void 0:i.kind)!==t.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==l||null==(j=l.value)?void 0:j.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});(0,h.getRequestMeta)(a,"minimalMode")||b.setHeader("x-nextjs-cache",B?"REVALIDATED":l.isMiss?"MISS":l.isStale?"STALE":"HIT"),x&&b.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let m=(0,p.fromNodeOutgoingHttpHeaders)(l.value.headers);return(0,h.getRequestMeta)(a,"minimalMode")&&F||m.delete(r.NEXT_CACHE_TAGS_HEADER),!l.cacheControl||b.getHeader("Cache-Control")||m.get("Cache-Control")||m.set("Cache-Control",(0,q.getCacheControlHeader)(l.cacheControl)),await (0,o.I)(N,O,new Response(l.value.body,{headers:m,status:l.value.status||200})),null};L?await g(L):await K.withPropagatedContext(a.headers,()=>K.trace(m.BaseServerSpan.handleRequest,{spanName:`${J} ${a.url}`,kind:i.SpanKind.SERVER,attributes:{"http.method":J,"http.target":a.url}},g))}catch(b){if(b instanceof s.NoFallbackError||await A.onRequestError(a,b,{routerKind:"App Router",routePath:E,routeType:"route",revalidateReason:(0,n.c)({isRevalidate:I,isOnDemandRevalidate:B})}),F)throw b;return await (0,o.I)(N,O,new Response(null,{status:500})),null}}},19121:a=>{"use strict";a.exports=require("next/dist/server/app-render/action-async-storage.external.js")},23622:(a,b,c)=>{"use strict";c.d(b,{z:()=>e});let d=require("@prisma/client"),e=global.prisma||new d.PrismaClient({log:["error"]})},29294:a=>{"use strict";a.exports=require("next/dist/server/app-render/work-async-storage.external.js")},44870:a=>{"use strict";a.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},63033:a=>{"use strict";a.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},77598:a=>{"use strict";a.exports=require("node:crypto")},78335:()=>{},86439:a=>{"use strict";a.exports=require("next/dist/shared/lib/no-fallback-error.external")},96487:()=>{}};var b=require("../../../webpack-runtime.js");b.C(a);var c=b.X(0,[586,692,342],()=>b(b.s=12042));module.exports=c})();