// Requires
const crypto = require("crypto")["webcrypto"];


var secp256k1Zkp = (() => {
  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
  
  return (
function(secp256k1Zkp) {
  secp256k1Zkp = secp256k1Zkp || {};


var a;a||(a=typeof secp256k1Zkp !== 'undefined' ? secp256k1Zkp : {});var k,m;a.ready=new Promise(function(b,d){k=b;m=d});var p=Object.assign({},a),q="";"undefined"!=typeof document&&document.currentScript&&(q=document.currentScript.src);_scriptDir&&(q=_scriptDir);0!==q.indexOf("blob:")?q=q.substr(0,q.replace(/[?#].*/,"").lastIndexOf("/")+1):q="";var aa=a.print||console.log.bind(console),t=a.printErr||console.warn.bind(console);Object.assign(a,p);p=null;var u;a.wasmBinary&&(u=a.wasmBinary);
var noExitRuntime=a.noExitRuntime||!0;function ba(){this.buffer=new ArrayBuffer(w/65536*65536)}function ca(){this.exports=(
// EMSCRIPTEN_START_ASM
function instantiate(da){function c(d){d.set=function(a,b){this[a]=b};d.get=function(a){return this[a]};return d}var e;var f=new Uint8Array(123);for(var a=25;a>=0;--a){f[48+a]=52+a;f[65+a]=a;f[97+a]=26+a}f[43]=62;f[47]=63;function l(m,n,o){var g,h,a=0,i=n,j=o.length,k=n+(j*3>>2)-(o[j-2]=="=")-(o[j-1]=="=");for(;a<j;a+=4){g=f[o.charCodeAt(a+1)];h=f[o.charCodeAt(a+2)];m[i++]=f[o.charCodeAt(a)]<<2|g>>4;if(i<k)m[i++]=g<<4|h>>2;if(i<k)m[i++]=h<<6|f[o.charCodeAt(a+3)]}}function p(q){l(e,1024,"XxUhNpOTASqNizl+m/RUKS9aGz04hRbC8wP8lWf1YLg6xMWm3KIBWfxWz3SapqVlMWqlA3RCP0JTj6os0wk/pAoAAAAAAAAAT3V0IG9mIG1lbW9yeQAtKyAgIDBYMHgAdGVzdCBjb25kaXRpb24gZmFpbGVkOiByZXQAZ2Vucy0+biA+PSAyICogbmJpdHMgKiBuX2NvbW1pdHMAbnBvc2l0aXZlIDw9IG4ALi9zcmMvbW9kdWxlcy9idWxsZXRwcm9vZnMvbWFpbl9pbXBsLmgALi9zcmMvbW9kdWxlcy9nZW5lcmF0b3IvbWFpbl9pbXBsLmgALi9zcmMvbW9kdWxlcy9hZ2dzaWcvbWFpbl9pbXBsLmgAKGZsYWdzICYgU0VDUDI1NksxX0ZMQUdTX1RZUEVfTUFTSykgPT0gU0VDUDI1NksxX0ZMQUdTX1RZUEVfQ09NUFJFU1NJT04Ac2Vja2V5ICE9IE5VTEwAcHVia2V5ICE9IE5VTEwAb3V0cHV0ICE9IE5VTEwAaW5wdXQgIT0gTlVMTABjb21taXRfb3V0ICE9IE5VTEwAYmxpbmRfb3V0ICE9IE5VTEwAcG9pbnQgIT0gTlVMTAByZXN1bHQgIT0gTlVMTABjb21taXQgIT0gTlVMTABnZW5zICE9IE5VTEwAc2lncyAhPSBOVUxMAHB1Ym5vbmNlcyAhPSBOVUxMAGJsaW5kcyAhPSBOVUxMAHNjYWxhciAhPSBOVUxMAG91dHB1dGxlbiAhPSBOVUxMAHZhbHVlX2dlbiAhPSBOVUxMAGJsaW5kX2dlbiAhPSBOVUxMAHB1Ym5vbmNlX3RvdGFsICE9IE5VTEwAdHdlYWsgIT0gTlVMTABibGluZF9zd2l0Y2ggIT0gTlVMTABzY3JhdGNoICE9IE5VTEwAcm5nICE9IE5VTEwAc2lnICE9IE5VTEwAcHJvb2YgIT0gTlVMTAB2YWx1ZSAhPSBOVUxMAHNpZ25hdHVyZSAhPSBOVUxMAHNlY25vbmNlICE9IE5VTEwAcHVibm9uY2UgIT0gTlVMTABibGluZCAhPSBOVUxMAHNlZWQgIT0gTlVMTABzaWdzW2ldICE9IE5VTEwAb3V0cHV0NjQgIT0gTlVMTABpbnB1dDY0ICE9IE5VTEwAc2lnNjQgIT0gTlVMTABzZWNrZXkzMiAhPSBOVUxMAG1zZzMyICE9IE5VTEwAc2Vjbm9uY2UzMiAhPSBOVUxMAG4gPj0gMQBleHRyYV9jb21taXQgIT0gTlVMTCB8fCBleHRyYV9jb21taXRfbGVuID09IDAAc2VjcDI1NmsxX2VjbXVsdF9jb250ZXh0X2lzX2J1aWx0KCZjdHgtPmVjbXVsdF9jdHgpAHNlY3AyNTZrMV9lY211bHRfZ2VuX2NvbnRleHRfaXNfYnVpbHQoJmN0eC0+ZWNtdWx0X2dlbl9jdHgpACFzZWNwMjU2azFfZmVfaXNfemVybygmZ2UtPngpAHRlc3QgY29uZGl0aW9uIGZhaWxlZDogc2VjcDI1NmsxX2dlbmVyYXRvcl9nZW5lcmF0ZShjdHgsICZnZW4sIHRtcCkAKG51bGwpAChwcm9vZiAhPSBOVUxMICYmIHBsZW4gIT0gTlVMTCAmJiB0YXVfeCA9PSBOVUxMICYmIHRfb25lID09IE5VTEwgJiYgdF90d28gPT0gTlVMTCAmJiBjb21taXRzID09IE5VTEwgJiYgYmxpbmQgIT0gTlVMTCkgfHwgKHByb29mID09IE5VTEwgJiYgcGxlbiA9PSBOVUxMICYmIHRhdV94ID09IE5VTEwgJiYgdF9vbmUgIT0gTlVMTCAmJiB0X3R3byAhPSBOVUxMICYmIGNvbW1pdHMgIT0gTlVMTCAmJiBibGluZCAhPSBOVUxMICYmIHByaXZhdGVfbm9uY2UgIT0gTlVMTCkgfHwgKHByb29mID09IE5VTEwgJiYgcGxlbiA9PSBOVUxMICYmIHRhdV94ICE9IE5VTEwgJiYgdF9vbmUgIT0gTlVMTCAmJiB0X3R3byAhPSBOVUxMICYmIGNvbW1pdHMgIT0gTlVMTCAmJiBibGluZCAhPSBOVUxMICYmIHByaXZhdGVfbm9uY2UgIT0gTlVMTCkgfHwgKHByb29mICE9IE5VTEwgJiYgcGxlbiAhPSBOVUxMICYmIHRhdV94ICE9IE5VTEwgJiYgdF9vbmUgIT0gTlVMTCAmJiB0X3R3byAhPSBOVUxMICYmIGNvbW1pdHMgIT0gTlVMTCAmJiBibGluZCAhPSBOVUxMICYmIHByaXZhdGVfbm9uY2UgIT0gTlVMTCkgfHwgKHByb29mICE9IE5VTEwgJiYgcGxlbiAhPSBOVUxMICYmIHRhdV94ICE9IE5VTEwgJiYgdF9vbmUgIT0gTlVMTCAmJiB0X3R3byAhPSBOVUxMICYmIGNvbW1pdHMgIT0gTlVMTCAmJiBibGluZCA9PSBOVUxMICYmIHByaXZhdGVfbm9uY2UgPT0gTlVMTCkAIW5jbnQgfHwgKG5jb21taXRzICE9IE5VTEwpACFwY250IHx8IChjb21taXRzICE9IE5VTEwpAHRlc3QgY29uZGl0aW9uIGZhaWxlZDogc2VjcDI1NmsxX2VjX3B1YmtleV9zZXJpYWxpemUoY3R4LCBidWYsICZidWZsZW4sIHB1YmtleSwgU0VDUDI1NksxX0VDX0NPTVBSRVNTRUQpAHRlc3QgY29uZGl0aW9uIGZhaWxlZDogc2VjcDI1NmsxX2VjX3B1YmtleV9zZXJpYWxpemUoY3R4LCBidWYsICZidWZsZW4sIHB1Ym5vbmNlLCBTRUNQMjU2SzFfRUNfQ09NUFJFU1NFRCkAKm91dHB1dGxlbiA+PSAoKGZsYWdzICYgU0VDUDI1NksxX0ZMQUdTX0JJVF9DT01QUkVTU0lPTikgPyAzMyA6IDY1KQBbbGlic2VjcDI1NmsxXSBpbnRlcm5hbCBjb25zaXN0ZW5jeSBjaGVjayBmYWlsZWQ6ICVzCgAlczolZDogJXMKAHm+Zn753LusVaBilc6HCwcCm/zbLc4o2VnygVsW+BeYSDradyajxGVdpPv8DhEIqP0XtEimhVQZnEfQj/sQ1LhQkpt0waBJVLeLS2A16XpeB4paDyjsltVHv+6azoA6wDHTxoY5c5JuBJ5jfLG19Ao22sKK8XZpaMMMIxPzo4kEAAAAAAAAmBf4FluBAgCflY3i3LINAPybAgcLhw4AXCkGWsW6CwDc+X5mvnkAALjUEPuP0AcAxJlBVWiKBAC0F/2oCBEOAMC/T9pVRgwAoyZ32jpI");l(e,3568,"VGhlIHNjYWxhciBmb3IgdGhpcyB4IGlzIHVua25vd24AAAAAAAAAAEFBNtCMXgIA/bsDivRqDgDcrrr+//8PAP///////w8A////////AAAB");l(e,3688,"z4MStRDIz+DCOceO/LmAqKSb7Xf949laH8+jP7NSnKzD5L8KqX9UbyiIDgHWfkPk");l(e,3752,"LFaxPajNZddtNHQHxQooiv7///////////////////+rPRXrhJLkkGzozWvUpyHShjA=");l(e,3816,"EiLE5L8KqX9UbyiIDgHWfkPk");l(e,3848,"7gGVcShsCQATXJlYL1EHAEnwnOk0NAwA6nlE5gZxAAB8ZStq6XoAAIA=");l(e,3952,"MXN0IGdlbmVyYXRpb246IA==");l(e,3984,"Mm5kIGdlbmVyYXRpb246IAAAAAAAAAAAUvjVHK4nDQDYR81OoV0BAG0fxiyWlwcAKgx3M/IdDwAHNakrLQoAAED6ao7WkwYA7KNmp9CuCAC2D2MWy8sDABWGuxn5jg8Ag5rUlRaFAAAH");l(e,4128,"CA==");l(e,4169,"AQ==");l(e,4180,"AQAAAAEAAAACAAAAAgAAAAIAAAACAAAAAwAAAAEAAAAEAAAAFAAAADkAAACIAAAA6wAAAOwEAADsBAAARBEAAMgeAACyPgAA/////xkACgAZGRkAAAAABQAAAAAAAAkAAAAACwAAAAAAAAAAGQARChkZGQMKBwABAAkLGAAACQYLAAALAAYZAAAAGRkZ");l(e,4337,"DgAAAAAAAAAAGQAKDRkZGQANAAACAAkOAAAACQAOAAAO");l(e,4395,"DA==");l(e,4407,"EwAAAAATAAAAAAkMAAAAAAAMAAAM");l(e,4453,"EA==");l(e,4465,"DwAAAAQPAAAAAAkQAAAAAAAQAAAQ");l(e,4511,"Eg==");l(e,4523,"EQAAAAARAAAAAAkSAAAAAAASAAASAAAaAAAAGhoa");l(e,4578,"GgAAABoaGgAAAAAAAAk=");l(e,4627,"FA==");l(e,4639,"FwAAAAAXAAAAAAkUAAAAAAAUAAAU");l(e,4685,"Fg==");l(e,4697,"FQAAAAAVAAAAAAkWAAAAAAAWAAAWAAAwMTIzNDU2Nzg5QUJDREVGMDAwMTAyMDMwNDA1MDYwNzA4MDkxMDExMTIxMzE0MTUxNjE3MTgxOTIwMjEyMjIzMjQyNTI2MjcyODI5MzAzMTMyMzMzNDM1MzYzNzM4Mzk0MDQxNDI0MzQ0NDU0NjQ3NDg0OTUwNTE1MjUzNTQ1NTU2NTc1ODU5NjA2MTYyNjM2NDY1NjY2NzY4Njk3MDcxNzI3Mzc0NzU3Njc3Nzg3OTgwODE4MjgzODQ4NTg2ODc4ODg5OTA5MTkyOTM5NDk1OTY5Nzk4OTk=");l(e,4948,"CgAAAGQAAADoAwAAECcAAKCGAQBAQg8AgJaYAADh9QUAypo7");l(e,5e3,"CgAAAAAAAABkAAAAAAAAAOgDAAAAAAAAECcAAAAAAACghgEAAAAAAEBCDwAAAAAAgJaYAAAAAAAA4fUFAAAAAADKmjsAAAAAAOQLVAIAAAAA6HZIFwAAAAAQpdToAAAAAKByThgJAAAAQHoQ81oAAACAxqR+jQMAAADBb/KGIwAAAIpdeEVjAQAAZKeztuANAADoiQQjx4o=");l(e,5152,"BQ==");l(e,5164,"Cw==");l(e,5188,"DAAAAA0AAADMFA==");l(e,5212,"Ag==");l(e,5228,"//////////8=");l(e,5296,"wBZQ")}function ba(ca){var r=ca.a;var s=r.buffer;r.grow=$;var t=new Int8Array(s);var u=new Int16Array(s);var v=new Int32Array(s);var w=new Uint8Array(s);var x=new Uint16Array(s);var y=new Uint32Array(s);var z=new Float32Array(s);var A=new Float64Array(s);var B=Math.imul;var C=Math.fround;var D=Math.abs;var E=Math.clz32;var F=Math.min;var G=Math.max;var H=Math.floor;var I=Math.ceil;var J=Math.trunc;var K=Math.sqrt;var L=ca.abort;var M=NaN;var N=Infinity;var O=ca.b;var P=ca.c;var Q=ca.d;var R=ca.e;var S=ca.f;var T=5248704;var U=0;
// EMSCRIPTEN_START_FUNCS
function Cd(a,b){var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0;d=v[b+56>>2];d=d<<24|d<<8&16711680|(d>>>8&65280|d>>>24);c=v[b+60>>2];e=c<<24|c<<8&16711680|(c>>>8&65280|c>>>24);f=d+(Ie(e,25)^Ie(e,14)^e>>>3)|0;c=v[b+36>>2];x=c<<24|c<<8&16711680|(c>>>8&65280|c>>>24);c=v[b>>2];l=c<<24|c<<8&16711680|(c>>>8&65280|c>>>24);c=v[b+4>>2];m=c<<24|c<<8&16711680|(c>>>8&65280|c>>>24);c=(x+(l+(Ie(m,25)^Ie(m,14)^m>>>3)|0)|0)+(Ie(d,15)^Ie(d,13)^d>>>10)|0;i=v[b+28>>2];A=i<<24|i<<8&16711680|(i>>>8&65280|i>>>24);i=v[b+32>>2];$=i<<24|i<<8&16711680|(i>>>8&65280|i>>>24);g=c+(A+(Ie($,25)^Ie($,14)^$>>>3)|0)|0;i=v[b+20>>2];s=i<<24|i<<8&16711680|(i>>>8&65280|i>>>24);i=v[b+24>>2];u=i<<24|i<<8&16711680|(i>>>8&65280|i>>>24);h=d+(s+(Ie(u,25)^Ie(u,14)^u>>>3)|0)|0;i=v[b+48>>2];H=i<<24|i<<8&16711680|(i>>>8&65280|i>>>24);i=v[b+12>>2];z=i<<24|i<<8&16711680|(i>>>8&65280|i>>>24);i=v[b+16>>2];t=i<<24|i<<8&16711680|(i>>>8&65280|i>>>24);j=H+(z+(Ie(t,25)^Ie(t,14)^t>>>3)|0)|0;i=v[b+40>>2];I=i<<24|i<<8&16711680|(i>>>8&65280|i>>>24);k=f;n=g;i=v[b+8>>2];o=i<<24|i<<8&16711680|(i>>>8&65280|i>>>24);f=(I+(m+(Ie(o,25)^Ie(o,14)^o>>>3)|0)|0)+(Ie(e,15)^Ie(e,13)^e>>>10)|0;g=(Ie(f,15)^Ie(f,13)^f>>>10)+j|0;h=(Ie(g,15)^Ie(g,13)^g>>>10)+h|0;j=n+(Ie(h,15)^Ie(h,13)^h>>>10)|0;i=v[b+52>>2];ca=i<<24|i<<8&16711680|(i>>>8&65280|i>>>24);i=h+(H+(Ie(ca,25)^Ie(ca,14)^ca>>>3)|0)|0;b=v[b+44>>2];J=b<<24|b<<8&16711680|(b>>>8&65280|b>>>24);b=g+(I+(Ie(J,25)^Ie(J,14)^J>>>3)|0)|0;r=f+($+(Ie(x,25)^Ie(x,14)^x>>>3)|0)|0;q=e+(u+(Ie(A,25)^Ie(A,14)^A>>>3)|0)|0;n=(t+(Ie(s,25)^Ie(s,14)^s>>>3)|0)+ca|0;p=(J+(o+(Ie(z,25)^Ie(z,14)^z>>>3)|0)|0)+(Ie(c,15)^Ie(c,13)^c>>>10)|0;n=n+(Ie(p,15)^Ie(p,13)^p>>>10)|0;q=q+(Ie(n,15)^Ie(n,13)^n>>>10)|0;r=r+(Ie(q,15)^Ie(q,13)^q>>>10)|0;w=b+(Ie(r,15)^Ie(r,13)^r>>>10)|0;D=i+(Ie(w,15)^Ie(w,13)^w>>>10)|0;K=(k+j|0)+(Ie(D,15)^Ie(D,13)^D>>>10)|0;i=Ie(K,25)^Ie(K,14)^K>>>3;b=q+((Ie(d,25)^Ie(d,14)^d>>>3)+ca|0)|0;k=n+(J+(Ie(H,25)^Ie(H,14)^H>>>3)|0)|0;E=(p+(x+(Ie(I,25)^Ie(I,14)^I>>>3)|0)|0)+(Ie(j,15)^Ie(j,13)^j>>>10)|0;L=k+(Ie(E,15)^Ie(E,13)^E>>>10)|0;b=b+(Ie(L,15)^Ie(L,13)^L>>>10)|0;M=(r+(e+(Ie(c,25)^Ie(c,14)^c>>>3)|0)|0)+(Ie(b,15)^Ie(b,13)^b>>>10)|0;k=M+(q+(Ie(j,25)^Ie(j,14)^j>>>3)|0)|0;B=(n+(Ie(h,25)^Ie(h,14)^h>>>3)|0)+b|0;y=(p+(Ie(g,25)^Ie(g,14)^g>>>3)|0)+L|0;N=((c+(Ie(f,25)^Ie(f,14)^f>>>3)|0)+E|0)+(Ie(K,15)^Ie(K,13)^K>>>10)|0;O=y+(Ie(N,15)^Ie(N,13)^N>>>10)|0;P=B+(Ie(O,15)^Ie(O,13)^O>>>10)|0;Q=k+(Ie(P,15)^Ie(P,13)^P>>>10)|0;k=((Ie(D,25)^Ie(D,14)^D>>>3)+L|0)+P|0;B=((Ie(w,25)^Ie(w,14)^w>>>3)+E|0)+O|0;y=(j+(Ie(r,25)^Ie(r,14)^r>>>3)|0)+N|0;F=K+(h+(Ie(q,25)^Ie(q,14)^q>>>3)|0)|0;G=D+(g+(Ie(n,25)^Ie(n,14)^n>>>3)|0)|0;R=(w+(f+(Ie(p,25)^Ie(p,14)^p>>>3)|0)|0)+(Ie(M,15)^Ie(M,13)^M>>>10)|0;G=G+(Ie(R,15)^Ie(R,13)^R>>>10)|0;F=F+(Ie(G,15)^Ie(G,13)^G>>>10)|0;S=y+(Ie(F,15)^Ie(F,13)^F>>>10)|0;T=B+(Ie(S,15)^Ie(S,13)^S>>>10)|0;U=k+(Ie(T,15)^Ie(T,13)^T>>>10)|0;V=(Q+(b+i|0)|0)+(Ie(U,15)^Ie(U,13)^U>>>10)|0;B=Ie(V,25)^Ie(V,14)^V>>>3;k=(D+(Ie(b,25)^Ie(b,14)^b>>>3)|0)+F|0;i=(w+(Ie(L,25)^Ie(L,14)^L>>>3)|0)+G|0;W=((r+(Ie(E,25)^Ie(E,14)^E>>>3)|0)+R|0)+(Ie(Q,15)^Ie(Q,13)^Q>>>10)|0;X=i+(Ie(W,15)^Ie(W,13)^W>>>10)|0;i=k+(Ie(X,15)^Ie(X,13)^X>>>10)|0;Y=((K+(Ie(M,25)^Ie(M,14)^M>>>3)|0)+S|0)+(Ie(i,15)^Ie(i,13)^i>>>10)|0;k=Y+((Ie(Q,25)^Ie(Q,14)^Q>>>3)+F|0)|0;y=((Ie(P,25)^Ie(P,14)^P>>>3)+G|0)+i|0;C=((Ie(O,25)^Ie(O,14)^O>>>3)+R|0)+X|0;Z=(((Ie(N,25)^Ie(N,14)^N>>>3)+M|0)+W|0)+(Ie(V,15)^Ie(V,13)^V>>>10)|0;da=C+(Ie(Z,15)^Ie(Z,13)^Z>>>10)|0;ea=y+(Ie(da,15)^Ie(da,13)^da>>>10)|0;fa=k+(Ie(ea,15)^Ie(ea,13)^ea>>>10)|0;k=((Ie(U,25)^Ie(U,14)^U>>>3)+X|0)+ea|0;y=((Ie(T,25)^Ie(T,14)^T>>>3)+W|0)+da|0;C=((Ie(S,25)^Ie(S,14)^S>>>3)+Q|0)+Z|0;_=((Ie(F,25)^Ie(F,14)^F>>>3)+P|0)+V|0;ba=((Ie(G,25)^Ie(G,14)^G>>>3)+O|0)+U|0;aa=(((Ie(R,25)^Ie(R,14)^R>>>3)+N|0)+T|0)+(Ie(Y,15)^Ie(Y,13)^Y>>>10)|0;ba=ba+(Ie(aa,15)^Ie(aa,13)^aa>>>10)|0;ga=_+(Ie(ba,15)^Ie(ba,13)^ba>>>10)|0;ha=C+(Ie(ga,15)^Ie(ga,13)^ga>>>10)|0;ia=y+(Ie(ha,15)^Ie(ha,13)^ha>>>10)|0;la=k+(Ie(ia,15)^Ie(ia,13)^ia>>>10)|0;ma=(fa+(i+B|0)|0)+(Ie(la,15)^Ie(la,13)^la>>>10)|0;qa=v[a+28>>2];B=v[a+16>>2];k=qa+(Ie(B,26)^Ie(B,21)^Ie(B,7))|0;ra=v[a+12>>2];na=v[a+24>>2];ja=v[a+20>>2];_=(l+((na^B&(na^ja))+k|0)|0)+1116352408|0;l=ra+_|0;k=Ie(l,26)^Ie(l,21);C=(((m+na|0)+(l&(B^ja)^ja)|0)+(Ie(l,7)^k)|0)+1899447441|0;pa=v[a+8>>2];m=C+pa|0;k=Ie(m,26)^Ie(m,21);y=(((o+ja|0)+(B^m&(l^B))|0)+(Ie(m,7)^k)|0)-1245643825|0;ka=v[a+4>>2];o=y+ka|0;k=Ie(o,26)^Ie(o,21);sa=(((z+B|0)+(l^o&(l^m))|0)+(Ie(o,7)^k)|0)-373957723|0;z=v[a>>2];k=sa+z|0;oa=Ie(k,26)^Ie(k,21);oa=(((l+t|0)+(m^k&(m^o))|0)+(Ie(k,7)^oa)|0)+961987163|0;l=_+(((z|ka)&pa|z&ka)+(Ie(z,30)^Ie(z,19)^Ie(z,10))|0)|0;t=oa+l|0;_=Ie(t,26)^Ie(t,21);_=(((m+s|0)+(o^t&(o^k))|0)+(Ie(t,7)^_)|0)+1508970993|0;m=C+(((l|z)&ka|l&z)+(Ie(l,30)^Ie(l,19)^Ie(l,10))|0)|0;s=_+m|0;C=Ie(s,26)^Ie(s,21);C=(((o+u|0)+(k^s&(k^t))|0)+(Ie(s,7)^C)|0)-1841331548|0;o=y+((z&(l|m)|l&m)+(Ie(m,30)^Ie(m,19)^Ie(m,10))|0)|0;u=C+o|0;y=Ie(u,26)^Ie(u,21);A=(((k+A|0)+(t^u&(s^t))|0)+(Ie(u,7)^y)|0)-1424204075|0;l=((l&(m|o)|m&o)+(Ie(o,30)^Ie(o,19)^Ie(o,10))|0)+sa|0;k=A+l|0;y=Ie(k,26)^Ie(k,21);$=(((t+$|0)+(s^k&(s^u))|0)+(Ie(k,7)^y)|0)-670586216|0;m=((m&(l|o)|l&o)+(Ie(l,30)^Ie(l,19)^Ie(l,10))|0)+oa|0;t=$+m|0;y=Ie(t,26)^Ie(t,21);x=(((s+x|0)+(u^t&(k^u))|0)+(Ie(t,7)^y)|0)+310598401|0;o=_+((o&(l|m)|l&m)+(Ie(m,30)^Ie(m,19)^Ie(m,10))|0)|0;s=x+o|0;y=Ie(s,26)^Ie(s,21);I=(((u+I|0)+(k^s&(k^t))|0)+(Ie(s,7)^y)|0)+607225278|0;l=C+((l&(m|o)|m&o)+(Ie(o,30)^Ie(o,19)^Ie(o,10))|0)|0;u=I+l|0;C=Ie(u,26)^Ie(u,21);J=(((k+J|0)+(t^u&(s^t))|0)+(Ie(u,7)^C)|0)+1426881987|0;m=A+((m&(l|o)|l&o)+(Ie(l,30)^Ie(l,19)^Ie(l,10))|0)|0;k=J+m|0;A=Ie(k,26)^Ie(k,21);H=(((t+H|0)+(s^k&(s^u))|0)+(Ie(k,7)^A)|0)+1925078388|0;o=$+((o&(l|m)|l&m)+(Ie(m,30)^Ie(m,19)^Ie(m,10))|0)|0;t=H+o|0;A=Ie(t,26)^Ie(t,21);A=(((s+ca|0)+(u^t&(k^u))|0)+(Ie(t,7)^A)|0)-2132889090|0;l=x+((l&(m|o)|m&o)+(Ie(o,30)^Ie(o,19)^Ie(o,10))|0)|0;s=A+l|0;x=Ie(s,26)^Ie(s,21);u=(((d+u|0)+(k^s&(k^t))|0)+(Ie(s,7)^x)|0)-1680079193|0;d=I+((m&(l|o)|l&o)+(Ie(l,30)^Ie(l,19)^Ie(l,10))|0)|0;m=u+d|0;x=Ie(m,26)^Ie(m,21);k=(((e+k|0)+(t^m&(s^t))|0)+(Ie(m,7)^x)|0)-1046744716|0;e=J+((o&(d|l)|d&l)+(Ie(d,30)^Ie(d,19)^Ie(d,10))|0)|0;o=k+e|0;x=Ie(o,26)^Ie(o,21);t=(((c+t|0)+(s^o&(m^s))|0)+(Ie(o,7)^x)|0)-459576895|0;c=H+((l&(d|e)|d&e)+(Ie(e,30)^Ie(e,19)^Ie(e,10))|0)|0;l=t+c|0;x=Ie(l,26)^Ie(l,21);s=(((f+s|0)+(m^l&(m^o))|0)+(Ie(l,7)^x)|0)-272742522|0;d=A+((d&(c|e)|c&e)+(Ie(c,30)^Ie(c,19)^Ie(c,10))|0)|0;f=s+d|0;x=Ie(f,26)^Ie(f,21);m=(((m+p|0)+(o^f&(l^o))|0)+(Ie(f,7)^x)|0)+264347078|0;e=u+((e&(c|d)|c&d)+(Ie(d,30)^Ie(d,19)^Ie(d,10))|0)|0;p=m+e|0;u=Ie(p,26)^Ie(p,21);o=(((g+o|0)+(l^p&(f^l))|0)+(Ie(p,7)^u)|0)+604807628|0;c=k+((c&(d|e)|d&e)+(Ie(e,30)^Ie(e,19)^Ie(e,10))|0)|0;g=o+c|0;k=Ie(g,26)^Ie(g,21);l=(((l+n|0)+(f^g&(f^p))|0)+(Ie(g,7)^k)|0)+770255983|0;d=t+((d&(c|e)|c&e)+(Ie(c,30)^Ie(c,19)^Ie(c,10))|0)|0;n=l+d|0;k=Ie(n,26)^Ie(n,21);k=(((f+h|0)+(p^n&(g^p))|0)+(Ie(n,7)^k)|0)+1249150122|0;e=s+((e&(c|d)|c&d)+(Ie(d,30)^Ie(d,19)^Ie(d,10))|0)|0;f=k+e|0;h=Ie(f,26)^Ie(f,21);p=(((p+q|0)+(g^f&(g^n))|0)+(Ie(f,7)^h)|0)+1555081692|0;c=m+((c&(d|e)|d&e)+(Ie(e,30)^Ie(e,19)^Ie(e,10))|0)|0;h=p+c|0;q=Ie(h,26)^Ie(h,21);q=(((g+j|0)+(n^h&(f^n))|0)+(Ie(h,7)^q)|0)+1996064986|0;d=o+((d&(c|e)|c&e)+(Ie(c,30)^Ie(c,19)^Ie(c,10))|0)|0;g=q+d|0;j=Ie(g,26)^Ie(g,21);n=(((n+r|0)+(f^g&(f^h))|0)+(Ie(g,7)^j)|0)-1740746414|0;e=l+((e&(c|d)|c&d)+(Ie(d,30)^Ie(d,19)^Ie(d,10))|0)|0;j=n+e|0;r=Ie(j,26)^Ie(j,21);r=(((f+E|0)+(h^j&(g^h))|0)+(Ie(j,7)^r)|0)-1473132947|0;c=k+((c&(d|e)|d&e)+(Ie(e,30)^Ie(e,19)^Ie(e,10))|0)|0;f=r+c|0;E=Ie(f,26)^Ie(f,21);w=(((h+w|0)+(g^f&(g^j))|0)+(Ie(f,7)^E)|0)-1341970488|0;d=p+((d&(c|e)|c&e)+(Ie(c,30)^Ie(c,19)^Ie(c,10))|0)|0;h=w+d|0;p=Ie(h,26)^Ie(h,21);p=(((g+L|0)+(j^h&(f^j))|0)+(Ie(h,7)^p)|0)-1084653625|0;e=q+((e&(c|d)|c&d)+(Ie(d,30)^Ie(d,19)^Ie(d,10))|0)|0;g=p+e|0;q=Ie(g,26)^Ie(g,21);q=(((j+D|0)+(f^g&(f^h))|0)+(Ie(g,7)^q)|0)-958395405|0;c=n+((c&(d|e)|d&e)+(Ie(e,30)^Ie(e,19)^Ie(e,10))|0)|0;j=q+c|0;n=Ie(j,26)^Ie(j,21);n=(((b+f|0)+(h^j&(g^h))|0)+(Ie(j,7)^n)|0)-710438585|0;b=r+((d&(c|e)|c&e)+(Ie(c,30)^Ie(c,19)^Ie(c,10))|0)|0;f=n+b|0;d=Ie(f,26)^Ie(f,21);r=(((h+K|0)+(g^f&(g^j))|0)+(Ie(f,7)^d)|0)+113926993|0;d=w+((e&(b|c)|b&c)+(Ie(b,30)^Ie(b,19)^Ie(b,10))|0)|0;e=r+d|0;h=Ie(e,26)^Ie(e,21);w=(((g+M|0)+(j^e&(f^j))|0)+(Ie(e,7)^h)|0)+338241895|0;c=p+((c&(b|d)|b&d)+(Ie(d,30)^Ie(d,19)^Ie(d,10))|0)|0;g=w+c|0;h=Ie(g,26)^Ie(g,21);j=(((j+N|0)+(f^g&(e^f))|0)+(Ie(g,7)^h)|0)+666307205|0;b=q+((b&(c|d)|c&d)+(Ie(c,30)^Ie(c,19)^Ie(c,10))|0)|0;h=j+b|0;p=Ie(h,26)^Ie(h,21);p=(((f+R|0)+(e^h&(e^g))|0)+(Ie(h,7)^p)|0)+773529912|0;d=n+((d&(b|c)|b&c)+(Ie(b,30)^Ie(b,19)^Ie(b,10))|0)|0;f=p+d|0;n=Ie(f,26)^Ie(f,21);n=(((e+O|0)+(g^f&(g^h))|0)+(Ie(f,7)^n)|0)+1294757372|0;c=r+((c&(b|d)|b&d)+(Ie(d,30)^Ie(d,19)^Ie(d,10))|0)|0;e=n+c|0;q=Ie(e,26)^Ie(e,21);q=(((g+G|0)+(h^e&(f^h))|0)+(Ie(e,7)^q)|0)+1396182291|0;b=w+((b&(c|d)|c&d)+(Ie(c,30)^Ie(c,19)^Ie(c,10))|0)|0;g=q+b|0;r=Ie(g,26)^Ie(g,21);r=(((h+P|0)+(f^g&(e^f))|0)+(Ie(g,7)^r)|0)+1695183700|0;d=j+((d&(b|c)|b&c)+(Ie(b,30)^Ie(b,19)^Ie(b,10))|0)|0;h=r+d|0;j=Ie(h,26)^Ie(h,21);j=(((f+F|0)+(e^h&(e^g))|0)+(Ie(h,7)^j)|0)+1986661051|0;c=p+((c&(b|d)|b&d)+(Ie(d,30)^Ie(d,19)^Ie(d,10))|0)|0;f=j+c|0;p=Ie(f,26)^Ie(f,21);p=(((e+Q|0)+(g^f&(g^h))|0)+(Ie(f,7)^p)|0)-2117940946|0;b=n+((b&(c|d)|c&d)+(Ie(c,30)^Ie(c,19)^Ie(c,10))|0)|0;e=p+b|0;n=Ie(e,26)^Ie(e,21);n=(((g+S|0)+(h^e&(f^h))|0)+(Ie(e,7)^n)|0)-1838011259|0;d=q+((d&(b|c)|b&c)+(Ie(b,30)^Ie(b,19)^Ie(b,10))|0)|0;g=n+d|0;q=Ie(g,26)^Ie(g,21);q=(((h+W|0)+(f^g&(e^f))|0)+(Ie(g,7)^q)|0)-1564481375|0;c=r+((c&(b|d)|b&d)+(Ie(d,30)^Ie(d,19)^Ie(d,10))|0)|0;h=q+c|0;r=Ie(h,26)^Ie(h,21);r=(((f+T|0)+(e^h&(e^g))|0)+(Ie(h,7)^r)|0)-1474664885|0;b=j+((b&(c|d)|c&d)+(Ie(c,30)^Ie(c,19)^Ie(c,10))|0)|0;f=r+b|0;j=Ie(f,26)^Ie(f,21);j=(((e+X|0)+(g^f&(g^h))|0)+(Ie(f,7)^j)|0)-1035236496|0;d=p+((d&(b|c)|b&c)+(Ie(b,30)^Ie(b,19)^Ie(b,10))|0)|0;e=j+d|0;p=Ie(e,26)^Ie(e,21);p=(((g+U|0)+(h^e&(f^h))|0)+(Ie(e,7)^p)|0)-949202525|0;c=n+((c&(b|d)|b&d)+(Ie(d,30)^Ie(d,19)^Ie(d,10))|0)|0;g=p+c|0;n=Ie(g,26)^Ie(g,21);n=(((h+i|0)+(f^g&(e^f))|0)+(Ie(g,7)^n)|0)-778901479|0;b=q+((b&(c|d)|c&d)+(Ie(c,30)^Ie(c,19)^Ie(c,10))|0)|0;h=n+b|0;q=Ie(h,26)^Ie(h,21);q=(((f+V|0)+(e^h&(e^g))|0)+(Ie(h,7)^q)|0)-694614492|0;d=r+((d&(b|c)|b&c)+(Ie(b,30)^Ie(b,19)^Ie(b,10))|0)|0;f=q+d|0;r=Ie(f,26)^Ie(f,21);r=(((e+Y|0)+(g^f&(g^h))|0)+(Ie(f,7)^r)|0)-200395387|0;c=j+((c&(b|d)|b&d)+(Ie(d,30)^Ie(d,19)^Ie(d,10))|0)|0;e=r+c|0;j=Ie(e,26)^Ie(e,21);w=(((g+Z|0)+(h^e&(f^h))|0)+(Ie(e,7)^j)|0)+275423344|0;b=p+((b&(c|d)|c&d)+(Ie(c,30)^Ie(c,19)^Ie(c,10))|0)|0;g=w+b|0;j=Ie(g,26)^Ie(g,21);p=(((h+aa|0)+(f^g&(e^f))|0)+(Ie(g,7)^j)|0)+430227734|0;d=n+((d&(b|c)|b&c)+(Ie(b,30)^Ie(b,19)^Ie(b,10))|0)|0;h=p+d|0;j=Ie(h,26)^Ie(h,21);n=(((f+da|0)+(e^h&(e^g))|0)+(Ie(h,7)^j)|0)+506948616|0;c=q+((c&(b|d)|b&d)+(Ie(d,30)^Ie(d,19)^Ie(d,10))|0)|0;f=n+c|0;j=Ie(f,26)^Ie(f,21);q=(((e+ba|0)+(g^f&(g^h))|0)+(Ie(f,7)^j)|0)+659060556|0;b=r+((b&(c|d)|c&d)+(Ie(c,30)^Ie(c,19)^Ie(c,10))|0)|0;j=q+b|0;e=Ie(j,26)^Ie(j,21);r=(((g+ea|0)+(h^j&(f^h))|0)+(Ie(j,7)^e)|0)+883997877|0;d=w+((d&(b|c)|b&c)+(Ie(b,30)^Ie(b,19)^Ie(b,10))|0)|0;g=r+d|0;e=Ie(g,26)^Ie(g,21);w=(((h+ga|0)+(f^g&(f^j))|0)+(Ie(g,7)^e)|0)+958139571|0;c=p+((c&(b|d)|b&d)+(Ie(d,30)^Ie(d,19)^Ie(d,10))|0)|0;e=w+c|0;p=(((Ie(W,25)^Ie(W,14)^W>>>3)+S|0)+aa|0)+(Ie(fa,15)^Ie(fa,13)^fa>>>10)|0;D=(((f+fa|0)+(j^e&(g^j))|0)+(Ie(e,26)^Ie(e,21)^Ie(e,7))|0)+1322822218|0;b=n+((b&(c|d)|c&d)+(Ie(c,30)^Ie(c,19)^Ie(c,10))|0)|0;f=D+b|0;h=Ie(f,26)^Ie(f,21);n=(((j+ha|0)+(g^f&(e^g))|0)+(Ie(f,7)^h)|0)+1537002063|0;d=q+((d&(b|c)|b&c)+(Ie(b,30)^Ie(b,19)^Ie(b,10))|0)|0;h=n+d|0;j=Ie(h,26)^Ie(h,21);q=(((g+p|0)+(e^h&(e^f))|0)+(Ie(h,7)^j)|0)+1747873779|0;c=r+((c&(b|d)|b&d)+(Ie(d,30)^Ie(d,19)^Ie(d,10))|0)|0;g=q+c|0;j=Ie(g,26)^Ie(g,21);r=(((e+ia|0)+(f^g&(f^h))|0)+(Ie(g,7)^j)|0)+1955562222|0;b=w+((b&(c|d)|c&d)+(Ie(c,30)^Ie(c,19)^Ie(c,10))|0)|0;e=r+b|0;k=((Ie(i,25)^Ie(i,14)^i>>>3)+U|0)+ga|0;i=(((Ie(X,25)^Ie(X,14)^X>>>3)+T|0)+ba|0)+(Ie(p,15)^Ie(p,13)^p>>>10)|0;j=k+(Ie(i,15)^Ie(i,13)^i>>>10)|0;i=(((f+i|0)+(h^e&(g^h))|0)+(Ie(e,26)^Ie(e,21)^Ie(e,7))|0)+2024104815|0;d=D+((d&(b|c)|b&c)+(Ie(b,30)^Ie(b,19)^Ie(b,10))|0)|0;f=i+d|0;w=Ie(f,26)^Ie(f,21);w=(((h+la|0)+(g^f&(e^g))|0)+(Ie(f,7)^w)|0)-2067236844|0;c=n+((c&(b|d)|b&d)+(Ie(d,30)^Ie(d,19)^Ie(d,10))|0)|0;h=w+c|0;n=Ie(h,26)^Ie(h,21);n=(((g+j|0)+(e^h&(e^f))|0)+(Ie(h,7)^n)|0)-1933114872|0;b=q+((b&(c|d)|c&d)+(Ie(c,30)^Ie(c,19)^Ie(c,10))|0)|0;g=n+b|0;q=Ie(g,26)^Ie(g,21);q=(((e+ma|0)+(f^g&(f^h))|0)+(Ie(g,7)^q)|0)-1866530822|0;d=r+((d&(b|c)|b&c)+(Ie(b,30)^Ie(b,19)^Ie(b,10))|0)|0;e=q+d|0;v[a+28>>2]=e+qa;c=i+((c&(b|d)|b&d)+(Ie(d,30)^Ie(d,19)^Ie(d,10))|0)|0;b=w+((Ie(c,30)^Ie(c,19)^Ie(c,10))+(b&(c|d)|c&d)|0)|0;d=n+((Ie(b,30)^Ie(b,19)^Ie(b,10))+(d&(b|c)|b&c)|0)|0;i=q+((Ie(d,30)^Ie(d,19)^Ie(d,10))+(c&(b|d)|b&d)|0)|0;v[a+12>>2]=i+ra;k=c;j=(((Ie(Y,25)^Ie(Y,14)^Y>>>3)+V|0)+ha|0)+(Ie(j,15)^Ie(j,13)^j>>>10)|0;c=(((j+f|0)+(h^e&(g^h))|0)+(Ie(e,26)^Ie(e,21)^Ie(e,7))|0)-1538233109|0;f=k+c|0;v[a+24>>2]=f+na;c=c+((b&(d|i)|d&i)+(Ie(i,30)^Ie(i,19)^Ie(i,10))|0)|0;v[a+8>>2]=c+pa;k=b;b=(((h+((p+((Ie(Z,25)^Ie(Z,14)^Z>>>3)+Y|0)|0)+(Ie(ma,15)^Ie(ma,13)^ma>>>10)|0)|0)+(g^f&(e^g))|0)+(Ie(f,26)^Ie(f,21)^Ie(f,7))|0)-1090935817|0;h=k+b|0;v[a+20>>2]=h+ja;b=b+((d&(c|i)|c&i)+(Ie(c,30)^Ie(c,19)^Ie(c,10))|0)|0;v[a+4>>2]=b+ka;k=d+B|0;d=(((g+((((Ie(aa,25)^Ie(aa,14)^aa>>>3)+Z|0)+ia|0)+(Ie(j,15)^Ie(j,13)^j>>>10)|0)|0)+(e^h&(e^f))|0)+(Ie(h,26)^Ie(h,21)^Ie(h,7))|0)-965641998|0;v[a+16>>2]=k+d;ta=a,ua=d+((z+(i&(b|c)|b&c)|0)+(Ie(b,30)^Ie(b,19)^Ie(b,10))|0)|0,v[ta>>2]=ua}function Zb(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;l=T-16|0;T=l;a:{b:{c:{d:{e:{f:{g:{h:{i:{j:{k:{if(a>>>0<=244){f=v[1331];h=a>>>0<11?16:a+11&-8;c=h>>>3|0;b=f>>>c|0;if(b&3){c=c+((b^-1)&1)|0;a=c<<3;b=a+5364|0;d=v[a+5372>>2];a=v[d+8>>2];l:{if((b|0)==(a|0)){m=5324,n=Ie(-2,c)&f,v[m>>2]=n;break l}v[a+12>>2]=b;v[b+8>>2]=a}a=d+8|0;b=c<<3;v[d+4>>2]=b|3;b=b+d|0;v[b+4>>2]=v[b+4>>2]|1;break a}k=v[1333];if(k>>>0>=h>>>0){break k}if(b){a=2<<c;a=(0-a|a)&b<<c;b=(0-a&a)-1|0;a=b>>>12&16;c=a;b=b>>>a|0;a=b>>>5&8;c=c|a;b=b>>>a|0;a=b>>>2&4;c=c|a;b=b>>>a|0;a=b>>>1&2;c=c|a;b=b>>>a|0;a=b>>>1&1;d=(c|a)+(b>>>a|0)|0;a=d<<3;b=a+5364|0;g=v[a+5372>>2];a=v[g+8>>2];m:{if((b|0)==(a|0)){f=Ie(-2,d)&f;v[1331]=f;break m}v[a+12>>2]=b;v[b+8>>2]=a}v[g+4>>2]=h|3;c=g+h|0;a=d<<3;d=a-h|0;v[c+4>>2]=d|1;v[a+g>>2]=d;if(k){b=(k&-8)+5364|0;e=v[1336];a=1<<(k>>>3);n:{if(!(a&f)){v[1331]=a|f;a=b;break n}a=v[b+8>>2]}v[b+8>>2]=e;v[a+12>>2]=e;v[e+12>>2]=b;v[e+8>>2]=a}a=g+8|0;v[1336]=c;v[1333]=d;break a}j=v[1332];if(!j){break k}b=(0-j&j)-1|0;a=b>>>12&16;c=a;b=b>>>a|0;a=b>>>5&8;c=c|a;b=b>>>a|0;a=b>>>2&4;c=c|a;b=b>>>a|0;a=b>>>1&2;c=c|a;b=b>>>a|0;a=b>>>1&1;b=v[((c|a)+(b>>>a|0)<<2)+5628>>2];e=(v[b+4>>2]&-8)-h|0;c=b;while(1){o:{a=v[c+16>>2];if(!a){a=v[c+20>>2];if(!a){break o}}c=(v[a+4>>2]&-8)-h|0;d=c>>>0<e>>>0;e=d?c:e;b=d?a:b;c=a;continue}break}i=v[b+24>>2];d=v[b+12>>2];if((d|0)!=(b|0)){a=v[b+8>>2];v[a+12>>2]=d;v[d+8>>2]=a;break b}c=b+20|0;a=v[c>>2];if(!a){a=v[b+16>>2];if(!a){break j}c=b+16|0}while(1){g=c;d=a;c=a+20|0;a=v[c>>2];if(a){continue}c=d+16|0;a=v[d+16>>2];if(a){continue}break}v[g>>2]=0;break b}h=-1;if(a>>>0>4294967231){break k}a=a+11|0;h=a&-8;j=v[1332];if(!j){break k}e=0-h|0;f=0;p:{if(h>>>0<256){break p}f=31;if(h>>>0>16777215){break p}a=a>>>8|0;g=a+1048320>>>16&8;a=a<<g;c=a+520192>>>16&4;a=a<<c;b=a+245760>>>16&2;a=(a<<b>>>15|0)-(b|(c|g))|0;f=(a<<1|h>>>a+21&1)+28|0}c=v[(f<<2)+5628>>2];q:{r:{s:{if(!c){a=0;break s}a=0;b=h<<((f|0)==31?0:25-(f>>>1|0)|0);while(1){t:{g=(v[c+4>>2]&-8)-h|0;if(g>>>0>=e>>>0){break t}d=c;e=g;if(e){break t}e=0;a=c;break r}g=v[c+20>>2];c=v[((b>>>29&4)+c|0)+16>>2];a=g?(g|0)==(c|0)?a:g:a;b=b<<1;if(c){continue}break}}if(!(a|d)){d=0;a=2<<f;a=(0-a|a)&j;if(!a){break k}b=(a&0-a)-1|0;a=b>>>12&16;c=a;b=b>>>a|0;a=b>>>5&8;c=c|a;b=b>>>a|0;a=b>>>2&4;c=c|a;b=b>>>a|0;a=b>>>1&2;c=c|a;b=b>>>a|0;a=b>>>1&1;a=v[((c|a)+(b>>>a|0)<<2)+5628>>2]}if(!a){break q}}while(1){b=(v[a+4>>2]&-8)-h|0;c=b>>>0<e>>>0;e=c?b:e;d=c?a:d;b=v[a+16>>2];if(b){a=b}else{a=v[a+20>>2]}if(a){continue}break}}if(!d|v[1333]-h>>>0<=e>>>0){break k}f=v[d+24>>2];b=v[d+12>>2];if((d|0)!=(b|0)){a=v[d+8>>2];v[a+12>>2]=b;v[b+8>>2]=a;break c}c=d+20|0;a=v[c>>2];if(!a){a=v[d+16>>2];if(!a){break i}c=d+16|0}while(1){g=c;b=a;c=a+20|0;a=v[c>>2];if(a){continue}c=b+16|0;a=v[b+16>>2];if(a){continue}break}v[g>>2]=0;break c}c=v[1333];if(c>>>0>=h>>>0){d=v[1336];b=c-h|0;u:{if(b>>>0>=16){v[1333]=b;a=d+h|0;v[1336]=a;v[a+4>>2]=b|1;v[c+d>>2]=b;v[d+4>>2]=h|3;break u}v[1336]=0;v[1333]=0;v[d+4>>2]=c|3;a=c+d|0;v[a+4>>2]=v[a+4>>2]|1}a=d+8|0;break a}i=v[1334];if(i>>>0>h>>>0){b=i-h|0;v[1334]=b;c=v[1337];a=c+h|0;v[1337]=a;v[a+4>>2]=b|1;v[c+4>>2]=h|3;a=c+8|0;break a}a=0;j=h+47|0;b=j;if(v[1449]){c=v[1451]}else{v[1452]=-1;v[1453]=-1;v[1450]=4096;v[1451]=4096;v[1449]=l+12&-16^1431655768;v[1454]=0;v[1442]=0;c=4096}g=b+c|0;e=0-c|0;c=g&e;if(c>>>0<=h>>>0){break a}d=v[1441];if(d){b=v[1439];f=b+c|0;if(d>>>0<f>>>0|b>>>0>=f>>>0){break a}}if(w[5768]&4){break f}v:{w:{d=v[1337];if(d){a=5772;while(1){b=v[a>>2];if(b>>>0<=d>>>0&d>>>0<b+v[a+4>>2]>>>0){break w}a=v[a+8>>2];if(a){continue}break}}b=Bb(0);if((b|0)==-1){break g}f=c;d=v[1450];a=d-1|0;if(a&b){f=(c-b|0)+(a+b&0-d)|0}if(f>>>0<=h>>>0|f>>>0>2147483646){break g}d=v[1441];if(d){a=v[1439];e=a+f|0;if(d>>>0<e>>>0|a>>>0>=e>>>0){break g}}a=Bb(f);if((b|0)!=(a|0)){break v}break e}f=e&g-i;if(f>>>0>2147483646){break g}b=Bb(f);if((b|0)==(v[a>>2]+v[a+4>>2]|0)){break h}a=b}if(!((a|0)==-1|h+48>>>0<=f>>>0)){b=v[1451];b=b+(j-f|0)&0-b;if(b>>>0>2147483646){b=a;break e}if((Bb(b)|0)!=-1){f=b+f|0;b=a;break e}Bb(0-f|0);break g}b=a;if((a|0)!=-1){break e}break g}d=0;break b}b=0;break c}if((b|0)!=-1){break e}}v[1442]=v[1442]|4}if(c>>>0>2147483646){break d}b=v[1324];c=c+7&-8;a=b+c|0;x:{y:{if(!c|a>>>0>b>>>0){if(tc()>>>0>=a>>>0){break y}if(P(a|0)|0){break y}a=v[1324]}else{a=b}v[1328]=48;b=-1;break x}v[1324]=a}if(tc()>>>0<a>>>0){if(!(P(a|0)|0)){break d}}v[1324]=a;if((b|0)==-1|(a|0)==-1|a>>>0<=b>>>0){break d}f=a-b|0;if(f>>>0<=h+40>>>0){break d}}a=v[1439]+f|0;v[1439]=a;if(a>>>0>y[1440]){v[1440]=a}z:{A:{B:{g=v[1337];if(g){a=5772;while(1){d=v[a>>2];c=v[a+4>>2];if((d+c|0)==(b|0)){break B}a=v[a+8>>2];if(a){continue}break}break A}a=v[1335];if(!(a>>>0<=b>>>0?a:0)){v[1335]=b}a=0;v[1444]=f;v[1443]=b;v[1339]=-1;v[1340]=v[1449];v[1446]=0;while(1){d=a<<3;c=d+5364|0;v[d+5372>>2]=c;v[d+5376>>2]=c;a=a+1|0;if((a|0)!=32){continue}break}d=f-40|0;a=b+8&7?-8-b&7:0;c=d-a|0;v[1334]=c;a=a+b|0;v[1337]=a;v[a+4>>2]=c|1;v[(b+d|0)+4>>2]=40;v[1338]=v[1453];break z}if(w[a+12|0]&8|d>>>0>g>>>0|b>>>0<=g>>>0){break A}v[a+4>>2]=c+f;a=g+8&7?-8-g&7:0;c=a+g|0;v[1337]=c;b=v[1334]+f|0;a=b-a|0;v[1334]=a;v[c+4>>2]=a|1;v[(b+g|0)+4>>2]=40;v[1338]=v[1453];break z}if(y[1335]>b>>>0){v[1335]=b}d=b+f|0;c=5772;C:{while(1){if((d|0)!=v[c>>2]){a=5772;c=v[c+8>>2];if(c){continue}break C}break}a=5772;if(w[c+12|0]&8){break C}v[c>>2]=b;v[c+4>>2]=v[c+4>>2]+f;j=(b+8&7?-8-b&7:0)+b|0;v[j+4>>2]=h|3;d=d+(d+8&7?-8-d&7:0)|0;i=h+j|0;a=d-i|0;D:{if((d|0)==(g|0)){v[1337]=i;a=v[1334]+a|0;v[1334]=a;v[i+4>>2]=a|1;break D}if(v[1336]==(d|0)){v[1336]=i;a=v[1333]+a|0;v[1333]=a;v[i+4>>2]=a|1;v[a+i>>2]=a;break D}e=v[d+4>>2];if((e&3)==1){f=e&-8;E:{if(e>>>0<=255){b=e>>>3|0;e=v[d+8>>2];c=v[d+12>>2];if((c|0)==(e|0)){m=5324,n=v[1331]&Ie(-2,b),v[m>>2]=n;break E}v[e+12>>2]=c;v[c+8>>2]=e;break E}h=v[d+24>>2];b=v[d+12>>2];F:{if((d|0)!=(b|0)){c=v[d+8>>2];v[c+12>>2]=b;v[b+8>>2]=c;break F}G:{e=d+20|0;c=v[e>>2];if(c){break G}e=d+16|0;c=v[e>>2];if(c){break G}b=0;break F}while(1){g=e;b=c;e=b+20|0;c=v[e>>2];if(c){continue}e=b+16|0;c=v[b+16>>2];if(c){continue}break}v[g>>2]=0}if(!h){break E}e=v[d+28>>2];c=(e<<2)+5628|0;H:{if(v[c>>2]==(d|0)){v[c>>2]=b;if(b){break H}m=5328,n=v[1332]&Ie(-2,e),v[m>>2]=n;break E}v[h+(v[h+16>>2]==(d|0)?16:20)>>2]=b;if(!b){break E}}v[b+24>>2]=h;c=v[d+16>>2];if(c){v[b+16>>2]=c;v[c+24>>2]=b}c=v[d+20>>2];if(!c){break E}v[b+20>>2]=c;v[c+24>>2]=b}d=d+f|0;e=v[d+4>>2];a=a+f|0}v[d+4>>2]=e&-2;v[i+4>>2]=a|1;v[a+i>>2]=a;if(a>>>0<=255){b=(a&-8)+5364|0;c=v[1331];a=1<<(a>>>3);I:{if(!(c&a)){v[1331]=a|c;a=b;break I}a=v[b+8>>2]}v[b+8>>2]=i;v[a+12>>2]=i;v[i+12>>2]=b;v[i+8>>2]=a;break D}e=31;if(a>>>0<=16777215){b=a>>>8|0;e=b+1048320>>>16&8;b=b<<e;d=b+520192>>>16&4;b=b<<d;c=b+245760>>>16&2;b=(b<<c>>>15|0)-(c|(d|e))|0;e=(b<<1|a>>>b+21&1)+28|0}v[i+28>>2]=e;v[i+16>>2]=0;v[i+20>>2]=0;d=(e<<2)+5628|0;J:{c=v[1332];b=1<<e;K:{if(!(c&b)){v[1332]=b|c;v[d>>2]=i;v[i+24>>2]=d;break K}e=a<<((e|0)==31?0:25-(e>>>1|0)|0);b=v[d>>2];while(1){c=b;if((v[b+4>>2]&-8)==(a|0)){break J}b=e>>>29|0;e=e<<1;d=c+(b&4)|0;b=v[d+16>>2];if(b){continue}break}v[d+16>>2]=i;v[i+24>>2]=c}v[i+12>>2]=i;v[i+8>>2]=i;break D}a=v[c+8>>2];v[a+12>>2]=i;v[c+8>>2]=i;v[i+24>>2]=0;v[i+12>>2]=c;v[i+8>>2]=a}a=j+8|0;break a}while(1){L:{c=v[a>>2];if(c>>>0<=g>>>0){e=c+v[a+4>>2]|0;if(e>>>0>g>>>0){break L}}a=v[a+8>>2];continue}break}d=f-40|0;a=b+8&7?-8-b&7:0;c=d-a|0;v[1334]=c;a=a+b|0;v[1337]=a;v[a+4>>2]=c|1;v[(b+d|0)+4>>2]=40;v[1338]=v[1453];a=(e+(e-39&7?39-e&7:0)|0)-47|0;c=a>>>0<g+16>>>0?g:a;v[c+4>>2]=27;a=v[1446];v[c+16>>2]=v[1445];v[c+20>>2]=a;a=v[1444];v[c+8>>2]=v[1443];v[c+12>>2]=a;v[1445]=c+8;v[1444]=f;v[1443]=b;v[1446]=0;a=c+24|0;while(1){v[a+4>>2]=7;b=a+8|0;a=a+4|0;if(b>>>0<e>>>0){continue}break}if((c|0)==(g|0)){break z}v[c+4>>2]=v[c+4>>2]&-2;e=c-g|0;v[g+4>>2]=e|1;v[c>>2]=e;if(e>>>0<=255){b=(e&-8)+5364|0;c=v[1331];a=1<<(e>>>3);M:{if(!(c&a)){v[1331]=a|c;a=b;break M}a=v[b+8>>2]}v[b+8>>2]=g;v[a+12>>2]=g;v[g+12>>2]=b;v[g+8>>2]=a;break z}a=31;if(e>>>0<=16777215){a=e>>>8|0;d=a+1048320>>>16&8;a=a<<d;c=a+520192>>>16&4;a=a<<c;b=a+245760>>>16&2;a=(a<<b>>>15|0)-(b|(c|d))|0;a=(a<<1|e>>>a+21&1)+28|0}v[g+28>>2]=a;v[g+16>>2]=0;v[g+20>>2]=0;b=(a<<2)+5628|0;N:{d=v[1332];c=1<<a;O:{if(!(d&c)){v[1332]=c|d;v[b>>2]=g;break O}a=e<<((a|0)==31?0:25-(a>>>1|0)|0);d=v[b>>2];while(1){b=d;if((e|0)==(v[b+4>>2]&-8)){break N}c=a>>>29|0;a=a<<1;c=(c&4)+b|0;d=v[c+16>>2];if(d){continue}break}v[c+16>>2]=g}v[g+24>>2]=b;v[g+12>>2]=g;v[g+8>>2]=g;break z}a=v[b+8>>2];v[a+12>>2]=g;v[b+8>>2]=g;v[g+24>>2]=0;v[g+12>>2]=b;v[g+8>>2]=a}a=v[1334];if(a>>>0<=h>>>0){break d}b=a-h|0;v[1334]=b;c=v[1337];a=c+h|0;v[1337]=a;v[a+4>>2]=b|1;v[c+4>>2]=h|3;a=c+8|0;break a}a=0;v[1328]=48;break a}P:{if(!f){break P}c=v[d+28>>2];a=(c<<2)+5628|0;Q:{if(v[a>>2]==(d|0)){v[a>>2]=b;if(b){break Q}j=Ie(-2,c)&j;v[1332]=j;break P}v[f+(v[f+16>>2]==(d|0)?16:20)>>2]=b;if(!b){break P}}v[b+24>>2]=f;a=v[d+16>>2];if(a){v[b+16>>2]=a;v[a+24>>2]=b}a=v[d+20>>2];if(!a){break P}v[b+20>>2]=a;v[a+24>>2]=b}R:{if(e>>>0<=15){a=e+h|0;v[d+4>>2]=a|3;a=a+d|0;v[a+4>>2]=v[a+4>>2]|1;break R}v[d+4>>2]=h|3;f=d+h|0;v[f+4>>2]=e|1;v[e+f>>2]=e;if(e>>>0<=255){b=(e&-8)+5364|0;c=v[1331];a=1<<(e>>>3);S:{if(!(c&a)){v[1331]=a|c;a=b;break S}a=v[b+8>>2]}v[b+8>>2]=f;v[a+12>>2]=f;v[f+12>>2]=b;v[f+8>>2]=a;break R}a=31;if(e>>>0<=16777215){a=e>>>8|0;g=a+1048320>>>16&8;a=a<<g;c=a+520192>>>16&4;a=a<<c;b=a+245760>>>16&2;a=(a<<b>>>15|0)-(b|(c|g))|0;a=(a<<1|e>>>a+21&1)+28|0}v[f+28>>2]=a;v[f+16>>2]=0;v[f+20>>2]=0;b=(a<<2)+5628|0;T:{c=1<<a;U:{if(!(c&j)){v[1332]=c|j;v[b>>2]=f;break U}a=e<<((a|0)==31?0:25-(a>>>1|0)|0);h=v[b>>2];while(1){b=h;if((v[b+4>>2]&-8)==(e|0)){break T}c=a>>>29|0;a=a<<1;c=(c&4)+b|0;h=v[c+16>>2];if(h){continue}break}v[c+16>>2]=f}v[f+24>>2]=b;v[f+12>>2]=f;v[f+8>>2]=f;break R}a=v[b+8>>2];v[a+12>>2]=f;v[b+8>>2]=f;v[f+24>>2]=0;v[f+12>>2]=b;v[f+8>>2]=a}a=d+8|0;break a}V:{if(!i){break V}c=v[b+28>>2];a=(c<<2)+5628|0;W:{if(v[a>>2]==(b|0)){v[a>>2]=d;if(d){break W}m=5328,n=Ie(-2,c)&j,v[m>>2]=n;break V}v[i+(v[i+16>>2]==(b|0)?16:20)>>2]=d;if(!d){break V}}v[d+24>>2]=i;a=v[b+16>>2];if(a){v[d+16>>2]=a;v[a+24>>2]=d}a=v[b+20>>2];if(!a){break V}v[d+20>>2]=a;v[a+24>>2]=d}X:{if(e>>>0<=15){a=e+h|0;v[b+4>>2]=a|3;a=a+b|0;v[a+4>>2]=v[a+4>>2]|1;break X}v[b+4>>2]=h|3;d=b+h|0;v[d+4>>2]=e|1;v[d+e>>2]=e;if(k){c=(k&-8)+5364|0;g=v[1336];a=1<<(k>>>3);Y:{if(!(a&f)){v[1331]=a|f;a=c;break Y}a=v[c+8>>2]}v[c+8>>2]=g;v[a+12>>2]=g;v[g+12>>2]=c;v[g+8>>2]=a}v[1336]=d;v[1333]=e}a=b+8|0}T=l+16|0;return a|0}function ha(a,b,c){var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0;d=T-496|0;T=d;A=v[c+24>>2];x=v[c+28>>2];y=v[b>>2];t=v[b+4>>2];ja(d- -64|0,A,x,0,y,t);B=v[c+16>>2];C=v[c+20>>2];D=v[b+8>>2];E=v[b+12>>2];ja(d+208|0,B,C,0,D,E);N=v[c+8>>2];H=v[c+12>>2];O=v[b+16>>2];P=v[b+20>>2];ja(d+320|0,N,H,0,O,P);Q=v[c>>2];R=v[c+4>>2];S=v[b+24>>2];U=v[b+28>>2];ja(d+400|0,Q,R,0,S,U);V=v[c+32>>2];W=v[c+36>>2];X=v[b+32>>2];Y=v[b+36>>2];ja(d+480|0,V,W,0,X,Y);b=v[d+484>>2];c=b;ja(d+464|0,v[d+480>>2],b&1048575,0,15632,16);ja(d+80|0,V,W,0,y,t);ja(d+144|0,A,x,0,D,E);ja(d+272|0,B,C,0,O,P);ja(d+368|0,N,H,0,S,U);ja(d+432|0,Q,R,0,X,Y);b=v[d+492>>2];g=b;k=v[d+488>>2];b=b<<12|k>>>20;ja(d+448|0,k<<12|c>>>20,b,g>>>20|0,15632,16);ja(d+96|0,Q,R,0,y,t);ja(d+224|0,V,W,0,D,E);ja(d+160|0,A,x,0,O,P);ja(d+288|0,B,C,0,S,U);ja(d+384|0,N,H,0,X,Y);ea=v[d+288>>2];g=v[d+160>>2];b=ea+g|0;F=v[d+292>>2];c=F+v[d+164>>2]|0;c=b>>>0<g>>>0?c+1|0:c;Z=b;k=v[d+384>>2];g=b+k|0;m=c;b=c+v[d+388>>2]|0;b=g>>>0<k>>>0?b+1|0:b;G=g;g=v[d+224>>2];c=G+g|0;n=b;b=b+v[d+228>>2]|0;s=c;j=c>>>0<g>>>0?b+1|0:b;$=v[d+272>>2];g=v[d+144>>2];b=$+g|0;I=v[d+276>>2];c=I+v[d+148>>2]|0;c=b>>>0<g>>>0?c+1|0:c;M=b;k=v[d+368>>2];g=b+k|0;f=c;b=c+v[d+372>>2]|0;b=g>>>0<k>>>0?b+1|0:b;_=g;k=v[d+432>>2];g=g+k|0;r=b;c=b+v[d+436>>2]|0;c=g>>>0<k>>>0?c+1|0:c;z=g;g=v[d+80>>2];b=z+g|0;o=c;c=c+v[d+84>>2]|0;c=b>>>0<g>>>0?c+1|0:c;J=b;k=v[d+448>>2];g=b+k|0;e=c;b=c+v[d+452>>2]|0;q=g;i=g>>>0<k>>>0?b+1|0:b;aa=v[d+208>>2];g=v[d+64>>2];b=aa+g|0;p=v[d+212>>2];c=p+v[d+68>>2]|0;c=b>>>0<g>>>0?c+1|0:c;K=b;k=v[d+320>>2];b=b+k|0;g=c;c=c+v[d+324>>2]|0;L=b;h=v[d+400>>2];l=b+h|0;k=b>>>0<k>>>0?c+1|0:c;b=k+v[d+404>>2]|0;b=h>>>0>l>>>0?b+1|0:b;u=l;ba=v[d+464>>2];l=l+ba|0;c=b+v[d+468>>2]|0;c=l>>>0<ba>>>0?c+1|0:c;ca=c>>>20|0;da=v[d+476>>2];ba=c;h=(c|0)==(b|0)&l>>>0<u>>>0|c>>>0<b>>>0;u=(b|0)==(k|0)&u>>>0<L>>>0|b>>>0<k>>>0;L=(g|0)==(k|0)&K>>>0>L>>>0|g>>>0>k>>>0;p=(g|0)==(p|0)&K>>>0<aa>>>0|g>>>0<p>>>0;g=v[d+72>>2];b=g+v[d+216>>2]|0;c=v[d+220>>2]+v[d+76>>2]|0;c=b>>>0<g>>>0?c+1|0:c;k=b;g=p+b|0;b=c;b=g>>>0<k>>>0?b+1|0:b;c=g+v[d+328>>2]|0;b=b+v[d+332>>2]|0;b=c>>>0<g>>>0?b+1|0:b;g=c;c=L+c|0;b=c>>>0<g>>>0?b+1|0:b;k=c;g=c+v[d+408>>2]|0;c=b+v[d+412>>2]|0;c=g>>>0<k>>>0?c+1|0:c;b=u+g|0;c=b>>>0<g>>>0?c+1|0:c;k=b;g=b+v[d+472>>2]|0;b=c+da|0;b=g>>>0<k>>>0?b+1|0:b;c=h+g|0;b=c>>>0<g>>>0?b+1|0:b;h=b;k=c<<12|ca;g=k+q|0;b=(b<<12|c>>>20|w)+i|0;b=g>>>0<k>>>0?b+1|0:b;K=b>>>20|0;u=v[d+460>>2];aa=v[d+92>>2];ca=v[d+444>>2];da=v[d+380>>2];k=b;p=(i|0)==(b|0)&g>>>0<q>>>0|b>>>0<i>>>0;q=(e|0)==(i|0)&q>>>0<J>>>0|e>>>0>i>>>0;J=(e|0)==(o|0)&z>>>0>J>>>0|e>>>0<o>>>0;e=v[d+152>>2];b=e+v[d+280>>2]|0;c=v[d+284>>2]+v[d+156>>2]|0;c=b>>>0<e>>>0?c+1|0:c;i=b;e=b+((f|0)==(I|0)&M>>>0<$>>>0|f>>>0<I>>>0)|0;b=c;b=e>>>0<i>>>0?b+1|0:b;c=e+v[d+376>>2]|0;b=b+da|0;b=c>>>0<e>>>0?b+1|0:b;i=c;e=c+((f|0)==(r|0)&M>>>0>_>>>0|f>>>0>r>>>0)|0;c=e>>>0<i>>>0?b+1|0:b;i=e;e=e+v[d+440>>2]|0;b=c+ca|0;b=e>>>0<i>>>0?b+1|0:b;i=e;e=e+((o|0)==(r|0)&z>>>0<_>>>0|o>>>0<r>>>0)|0;c=e>>>0<i>>>0?b+1|0:b;i=e;e=e+v[d+88>>2]|0;b=c+aa|0;b=e>>>0<i>>>0?b+1|0:b;c=J+e|0;b=c>>>0<e>>>0?b+1|0:b;i=c;e=c+v[d+456>>2]|0;c=b+u|0;c=e>>>0<i>>>0?c+1|0:c;i=e;e=q+e|0;b=c;b=e>>>0<i>>>0?b+1|0:b;i=h>>>20|0;e=i+e|0;c=e>>>0<i>>>0?b+1|0:b;i=e;e=p+e|0;b=c;b=e>>>0<i>>>0?b+1|0:b;h=b;c=(b<<12|e>>>20|w)+j|0;i=e<<12|K;e=i+s|0;o=e;c=e>>>0<i>>>0?c+1|0:c;e=c;b=c<<4|o>>>28;ja(d,o<<4&-16|k>>>16&15,b&16777215,0,977,1);I=v[d+4>>2];b=I+v[d+100>>2]|0;K=v[d>>2];i=v[d+96>>2];c=K+i|0;w=c;b=c>>>0<i>>>0?b+1|0:b;i=b;v[a>>2]=c;v[a+4>>2]=b&1048575;ja(d+112|0,N,H,0,y,t);ja(d+240|0,Q,R,0,D,E);ja(d+336|0,V,W,0,O,P);ja(d+176|0,A,x,0,S,U);ja(d+304|0,B,C,0,X,Y);z=d+48|0;L=v[d+304>>2];f=v[d+176>>2];c=L+f|0;M=v[d+308>>2];b=M+v[d+180>>2]|0;b=c>>>0<f>>>0?b+1|0:b;_=c;q=v[d+336>>2];f=c+q|0;r=b;c=b+v[d+340>>2]|0;c=f>>>0<q>>>0?c+1|0:c;q=f;f=c;u=v[d+236>>2];$=v[d+396>>2];o=(e|0)==(j|0)&o>>>0<s>>>0|e>>>0<j>>>0;p=(j|0)==(n|0)&s>>>0<G>>>0|j>>>0<n>>>0;n=(m|0)==(n|0)&Z>>>0>G>>>0|m>>>0>n>>>0;j=v[d+168>>2];c=j+v[d+296>>2]|0;b=v[d+300>>2]+v[d+172>>2]|0;b=c>>>0<j>>>0?b+1|0:b;j=c;c=c+((m|0)==(F|0)&Z>>>0<ea>>>0|m>>>0<F>>>0)|0;b=c>>>0<j>>>0?b+1|0:b;m=c;j=c+v[d+392>>2]|0;c=b+$|0;c=j>>>0<m>>>0?c+1|0:c;m=j;j=n+j|0;b=c;b=j>>>0<m>>>0?b+1|0:b;m=j;j=j+v[d+232>>2]|0;c=b+u|0;c=j>>>0<m>>>0?c+1|0:c;m=j;j=p+j|0;b=c;b=j>>>0<m>>>0?b+1|0:b;h=h>>>20|0;j=h+j|0;b=h>>>0>j>>>0?b+1|0:b;h=j;j=o+h|0;s=j;c=h>>>0>j>>>0?b+1|0:b;j=c;c=(c<<12|s>>>20)+f|0;h=s<<12|e>>>20;e=h+q|0;Z=e;c=e>>>0<h>>>0?c+1|0:c;e=c;ja(z,Z,c&1048575,0,15632,16);u=v[d+240>>2];h=v[d+112>>2];c=u+h|0;z=v[d+244>>2];b=z+v[d+116>>2]|0;b=c>>>0<h>>>0?b+1|0:b;J=c;h=v[d+48>>2];c=c+h|0;o=b;b=b+v[d+52>>2]|0;p=c;h=c>>>0<h>>>0?b+1|0:b;m=v[d+104>>2];b=m+v[d+8>>2]|0;c=v[d+12>>2]+v[d+108>>2]|0;c=b>>>0<m>>>0?c+1|0:c;n=b;m=b+((i|0)==(I|0)&w>>>0<K>>>0|i>>>0<I>>>0)|0;b=c;F=m;b=m>>>0<n>>>0?b+1|0:b;m=b;n=F<<12|i>>>20;i=n+p|0;b=(b<<12|F>>>20)+h|0;G=i;b=i>>>0<n>>>0?b+1|0:b;i=b;v[a+8>>2]=G;v[a+12>>2]=b&1048575;ja(d+128|0,B,C,0,y,t);ja(d+256|0,N,H,0,D,E);ja(d+352|0,Q,R,0,O,P);ja(d+416|0,V,W,0,S,U);ja(d+192|0,A,x,0,X,Y);t=d+32|0;y=v[d+420>>2];b=y+v[d+196>>2]|0;D=v[d+416>>2];n=v[d+192>>2];c=D+n|0;w=c;n=c>>>0<n>>>0?b+1|0:b;x=v[d+348>>2];s=(e|0)==(f|0)&q>>>0>Z>>>0|e>>>0<f>>>0;q=(f|0)==(r|0)&q>>>0<_>>>0|f>>>0<r>>>0;f=v[d+184>>2];c=f+v[d+312>>2]|0;b=v[d+316>>2]+v[d+188>>2]|0;b=c>>>0<f>>>0?b+1|0:b;f=c;c=c+((r|0)==(M|0)&_>>>0<L>>>0|r>>>0<M>>>0)|0;b=c>>>0<f>>>0?b+1|0:b;f=c;c=c+v[d+344>>2]|0;b=b+x|0;b=c>>>0<f>>>0?b+1|0:b;f=c;c=q+c|0;b=c>>>0<f>>>0?b+1|0:b;f=j>>>20|0;j=f+c|0;c=f>>>0>j>>>0?b+1|0:b;f=j;j=s+f|0;b=c;A=j;b=f>>>0>j>>>0?b+1|0:b;j=b;f=A<<12|e>>>20;e=f+w|0;b=(b<<12|A>>>20)+n|0;x=e;b=e>>>0<f>>>0?b+1|0:b;e=b;ja(t,x,b&1048575,0,15632,16);E=v[d+256>>2];f=v[d+128>>2];c=E+f|0;t=v[d+260>>2];b=t+v[d+132>>2]|0;b=c>>>0<f>>>0?b+1|0:b;B=c;f=v[d+352>>2];c=c+f|0;r=b;b=b+v[d+356>>2]|0;b=c>>>0<f>>>0?b+1|0:b;C=c;f=v[d+32>>2];c=c+f|0;s=b;b=b+v[d+36>>2]|0;q=c;f=c>>>0<f>>>0?b+1|0:b;H=v[d+60>>2];G=(h|0)==(i|0)&p>>>0>G>>>0|h>>>0>i>>>0;p=(h|0)==(o|0)&p>>>0<J>>>0|h>>>0<o>>>0;h=v[d+120>>2];c=h+v[d+248>>2]|0;b=v[d+252>>2]+v[d+124>>2]|0;b=c>>>0<h>>>0?b+1|0:b;h=c;c=c+((o|0)==(z|0)&u>>>0>J>>>0|o>>>0<z>>>0)|0;b=c>>>0<h>>>0?b+1|0:b;h=c;c=c+v[d+56>>2]|0;b=b+H|0;b=c>>>0<h>>>0?b+1|0:b;h=c;c=p+c|0;b=c>>>0<h>>>0?b+1|0:b;m=m>>>20|0;h=m+c|0;c=h>>>0<m>>>0?b+1|0:b;m=h;h=G+h|0;b=c;b=h>>>0<m>>>0?b+1|0:b;m=h;h=b;o=m<<12|i>>>20;i=o+q|0;b=(b<<12|m>>>20)+f|0;b=i>>>0<o>>>0?b+1|0:b;o=i;i=b;v[a+16>>2]=o;v[a+20>>2]=b&1048575;p=d+16|0;m=(e|0)==(n|0)&w>>>0>x>>>0|e>>>0<n>>>0;w=(n|0)==(y|0)&w>>>0<D>>>0|n>>>0<y>>>0;n=v[d+200>>2];c=n+v[d+424>>2]|0;b=v[d+428>>2]+v[d+204>>2]|0;b=c>>>0<n>>>0?b+1|0:b;n=c;c=w+c|0;b=c>>>0<n>>>0?b+1|0:b;n=j>>>20|0;j=n+c|0;b=j>>>0<n>>>0?b+1|0:b;c=m+j|0;n=c;b=c>>>0<j>>>0?b+1|0:b;c=b<<12|c>>>20;ja(p,n<<12|e>>>20,c,b>>>20|0,15632,16);n=v[d+20>>2];b=n+(ba&1048575)|0;p=v[d+16>>2];c=l+p|0;b=c>>>0<l>>>0?b+1|0:b;j=c;e=b;w=v[d+44>>2];F=v[d+364>>2];m=(f|0)==(i|0)&o>>>0<q>>>0|f>>>0>i>>>0;o=(f|0)==(s|0)&q>>>0<C>>>0|f>>>0<s>>>0;l=v[d+136>>2];c=l+v[d+264>>2]|0;b=v[d+268>>2]+v[d+140>>2]|0;b=c>>>0<l>>>0?b+1|0:b;f=c;l=c+((r|0)==(t|0)&B>>>0<E>>>0|r>>>0<t>>>0)|0;c=f>>>0>l>>>0?b+1|0:b;f=l;l=f+v[d+360>>2]|0;b=c+F|0;b=f>>>0>l>>>0?b+1|0:b;f=l;l=f+((r|0)==(s|0)&B>>>0>C>>>0|r>>>0>s>>>0)|0;c=f>>>0>l>>>0?b+1|0:b;f=l;l=f+v[d+40>>2]|0;b=c+w|0;b=f>>>0>l>>>0?b+1|0:b;c=o+l|0;b=c>>>0<l>>>0?b+1|0:b;h=h>>>20|0;l=h+c|0;c=h>>>0>l>>>0?b+1|0:b;h=l;l=m+h|0;b=c;b=h>>>0>l>>>0?b+1|0:b;h=l;l=b;m=h<<12|i>>>20;i=m+j|0;b=(b<<12|h>>>20)+e|0;b=i>>>0<m>>>0?b+1|0:b;f=a;v[f+24>>2]=i;v[f+28>>2]=b&1048575;f=k&65535;h=g;g=b;i=(b|0)==(e|0)&j>>>0>i>>>0|b>>>0<e>>>0;e=(e|0)==(n|0)&j>>>0<p>>>0|e>>>0<n>>>0;c=e+v[d+24>>2]|0;b=v[d+28>>2];b=c>>>0<e>>>0?b+1|0:b;l=l>>>20|0;k=l+c|0;c=l>>>0>k>>>0?b+1|0:b;l=k;k=i+k|0;b=c;c=k;b=(l>>>0>c>>>0?b+1|0:b)<<12|c>>>20;k=c<<12|g>>>20;g=h+k|0;b=b+f|0;v[a+32>>2]=g;v[a+36>>2]=g>>>0<k>>>0?b+1|0:b;T=d+496|0}function Kd(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,u=0,x=0;o=T+-64|0;T=o;j=0;a:{if((d|0)!=33){break a}j=0;if(!hb(v[1325],o,c)){break a}l=v[1325];k=v[1326];h=v[1327];j=T-112|0;T=j;c=f?e:0;v[j+104>>2]=c;v[j+108>>2]=a;v[j+100>>2]=f;b:{if(!k){ia(v[l+176>>2],v[l+180>>2],1701);a=0;break b}if(!h){ia(v[l+176>>2],v[l+180>>2],1515);a=0;break b}if(y[h>>2]<=127){ia(v[l+176>>2],v[l+180>>2],1147);a=0;break b}if(!a){ia(v[l+176>>2],v[l+180>>2],1741);a=0;break b}if(!o){ia(v[l+176>>2],v[l+180>>2],1500);a=0;break b}if(!(c|!f)){ia(v[l+176>>2],v[l+180>>2],1968);a=0;break b}if(!Qa(v[l>>2])){ia(v[l+176>>2],v[l+180>>2],2014);a=0;break b}if(!kb(k,176,1)){a=0;break b}a=wa(k,88);mb(a,o);n=j+8|0;lb(n,3402);v[j>>2]=0;v[j+4>>2]=a;g=j+104|0;a=0;d=T-432|0;T=d;c:{if(b-1320>>>0<4294966201){break c}if(!kb(k,848,2)){break c}c=wa(k,728);e=wa(k,120);v[d+312>>2]=0;v[d+316>>2]=0;v[d+304>>2]=0;v[d+308>>2]=0;v[d+296>>2]=0;v[d+300>>2]=0;v[d+288>>2]=0;v[d+292>>2]=0;v[d+280>>2]=0;v[d+284>>2]=0;v[d+272>>2]=0;v[d+276>>2]=0;v[d+264>>2]=0;v[d+268>>2]=0;v[d+256>>2]=0;v[d+260>>2]=0;if(!(!j|!v[j>>2])){a=d+328|0;Aa(a);m=d+288|0;ma(a,m,32);t[d+8|0]=1;t[d+9|0]=0;t[d+10|0]=0;t[d+11|0]=0;ma(a,d+8|0,4);i=v[j>>2];f=v[i+4>>2];i=v[i>>2];t[d|0]=i;t[d+1|0]=i>>>8;t[d+2|0]=i>>>16;t[d+3|0]=i>>>24;t[d+4|0]=f;t[d+5|0]=f>>>8;t[d+6|0]=f>>>16;t[d+7|0]=f>>>24;ma(a,d,8);za(a,m)}_a(d+288|0,v[j+4>>2],n);if(!(!g|!v[g>>2])){a=d+328|0;Aa(a);f=d+288|0;ma(a,f,32);ma(a,v[g>>2],v[j+100>>2]);za(a,f)}a=0;f=v[j+108>>2]- -64|0;if(!Db(d+104|0,f,0,4)){break c}if(!Db(d+16|0,f,1,4)){break c}g=d+288|0;_a(g,d+104|0,d+16|0);f=c+472|0;la(f,g,d+12|0);d:{if(v[d+12>>2]){break d}if(pa(f)){break d}i=d+288|0;_a(i,d+104|0,d+16|0);g=c- -64|0;la(g,i,d+12|0);if(v[d+12>>2]){break d}if(pa(g)){break d}i=c+552|0;if(!Db(i,v[j+108>>2]- -64|0,2,4)){break c}m=c+640|0;if(!Db(m,v[j+108>>2]- -64|0,3,4)){break c}p=d+288|0;_a(p,i,m);i=c+224|0;la(i,p,d+12|0);if(v[d+12>>2]){break d}if(pa(i)){break d}nb(c,f);f=v[c+28>>2];v[c+56>>2]=v[c+24>>2];v[c+60>>2]=f;f=v[c+20>>2];v[c+48>>2]=v[c+16>>2];v[c+52>>2]=f;f=v[c+12>>2];v[c+40>>2]=v[c+8>>2];v[c+44>>2]=f;f=v[c+4>>2];v[c+32>>2]=v[c>>2];v[c+36>>2]=f;m=Eb(64);if(m){i=c+32|0;f=0;while(1){fa(i,i);f=f+1|0;if((m|0)!=(f|0)){continue}break}}fa(c+128|0,g);va(c+192|0,g);f=d+328|0;Aa(f);g=d+288|0;ma(f,g,32);ma(f,v[j+108>>2],64);za(f,g);Aa(f);ma(f,g,32);g=d+256|0;za(f,g);f=c+440|0;la(f,g,d+12|0);if(v[d+12>>2]){break d}if(pa(f)){break d}g=v[j+108>>2];la(d+224|0,g,d+12|0);if(v[d+12>>2]){break d}if(pa(d+224|0)){break d}la(d+192|0,g+32|0,d+12|0);if(v[d+12>>2]){break d}if(pa(d+192|0)){break d}i=c+504|0;la(i,g+193|0,d+12|0);if(v[d+12>>2]){break d}if(pa(i)){break d}na(c+256|0,d+104|0,88);na(c+344|0,d+16|0,88);v[c+536>>2]=n;v[c+432>>2]=64;v[c+436>>2]=0;v[c+544>>2]=j?v[j>>2]:0;a=v[j+4>>2];v[c+548>>2]=1;v[c+540>>2]=a;a=d+224|0;ga(a,a,f);f=d+192|0;oa(f,f,a);v[e>>2]=v[j+108>>2]+193;a=v[d+220>>2];v[e+32>>2]=v[d+216>>2];v[e+36>>2]=a;a=v[d+212>>2];v[e+24>>2]=v[d+208>>2];v[e+28>>2]=a;a=v[d+204>>2];v[e+16>>2]=v[d+200>>2];v[e+20>>2]=a;a=v[d+196>>2];v[e+8>>2]=v[d+192>>2];v[e+12>>2]=a;a=v[d+292>>2];v[e+72>>2]=v[d+288>>2];v[e+76>>2]=a;a=v[d+300>>2];v[e+80>>2]=v[d+296>>2];v[e+84>>2]=a;a=v[d+308>>2];v[e+88>>2]=v[d+304>>2];v[e+92>>2]=a;a=v[d+316>>2];v[e+96>>2]=v[d+312>>2];v[e+100>>2]=a;a=v[c+12>>2];v[e+48>>2]=v[c+8>>2];v[e+52>>2]=a;a=v[c+4>>2];v[e+40>>2]=v[c>>2];v[e+44>>2]=a;a=v[c+16>>2];f=v[c+20>>2];g=v[c+28>>2];i=v[c+24>>2];v[e+112>>2]=6;v[e+108>>2]=c;v[e+104>>2]=2;c=e- -64|0;v[c>>2]=i;v[c+4>>2]=g;v[e+56>>2]=a;v[e+60>>2]=f;a=0;c=T-512|0;T=c;f=b-193|0;e:{if((jd()|0)!=(f|0)){break e}if(!kb(k,4304,2)){break e}v[c+336>>2]=1;v[c+376>>2]=v[h+8>>2];b=v[h+4>>2];v[c+380>>2]=b;v[c+384>>2]=b+B(v[h>>2]>>>1|0,88);v[c+388>>2]=64;v[c+396>>2]=1;u=c,x=Eb(32),v[u+392>>2]=x;u=c,x=wa(k,32),v[u+400>>2]=x;u=c,x=wa(k,4272),v[u+404>>2]=x;b=c+408|0;Aa(b);ma(b,v[e>>2],f);g=e+72|0;ma(b,g,32);f=c+304|0;i=e+8|0;ua(f,i);ma(b,f,32);za(b,f);h=c+344|0;ta(h);m=v[e+112>>2];p=v[c+392>>2];b=v[e>>2];la(c+112|0,b,c+44|0);if(v[c+44>>2]){Na(k);break e}f=c+408|0;Aa(f);ma(f,g,32);ma(f,b,32);za(f,c+144|0);la(c+176|0,b+32|0,c+44|0);f:{g:{h:{if(v[c+44>>2]){break h}if(pa(c+176|0)){break g}f=c+208|0;la(f,b- -64|0,c+44|0);if(v[c+44>>2]){break h}if(pa(f)){break g}f=c+240|0;la(f,b+96|0,c+44|0);if(v[c+44>>2]){break h}if(pa(f)){break g}f=c+272|0;la(f,b+128|0,c+44|0);if(v[c+44>>2]){break h}if(pa(f)){break g}hd(c+80|0,c+176|0,c+240|0,2);v[v[c+404>>2]>>2]=e;e=c+408|0;Aa(e);f=c+304|0;ma(e,f,32);za(e,f);la(v[c+400>>2],f,c+44|0);if(!v[c+44>>2]){f=v[c+400>>2];if(!pa(f)){break f}}Na(k);break e}Na(k);break e}Na(k);break e}la(c+48|0,c+144|0,c+44|0);i:{if(!v[c+44>>2]){if(!pa(c+48|0)){break i}}Na(k);break e}e=c+80|0;va(e,e);oa(e,e,c+112|0);a=c+48|0;ga(a,a,e);oa(a,a,i);ga(a,a,f);oa(h,h,a);a=v[c+404>>2];e=b+160|0;v[a+4264>>2]=e;f=c+272|0;h=v[f+28>>2];v[c+104>>2]=v[f+24>>2];v[c+108>>2]=h;h=v[f+20>>2];v[c+96>>2]=v[f+16>>2];v[c+100>>2]=h;h=v[f+12>>2];v[c+88>>2]=v[f+8>>2];v[c+92>>2]=h;h=v[f+4>>2];v[c+80>>2]=v[f>>2];v[c+84>>2]=h;b=v[c+400>>2];h=v[b+28>>2];v[f+24>>2]=v[b+24>>2];v[f+28>>2]=h;h=v[b+20>>2];v[f+16>>2]=v[b+16>>2];v[f+20>>2]=h;h=v[b+12>>2];v[f+8>>2]=v[b+8>>2];v[f+12>>2]=h;h=v[b+4>>2];v[f>>2]=v[b>>2];v[f+4>>2]=h;h=v[c+392>>2];if(h){a=0;while(1){b=a<<1;g=w[e+(b>>>3|0)|0];i=b|1;t[c+7|0]=g>>>(b&6)<<1&2|g>>>(i&7)&1;b=c+408|0;Aa(b);g=c+144|0;ma(b,g,32);ma(b,c+7|0,1);h=(h<<1)+7>>>3|0;ma(b,e+(h+(a<<6)|0)|0,32);ma(b,e+(h+(i<<5)|0)|0,32);za(b,g);la(c+8|0,g,c+44|0);j:{if(!v[c+44>>2]){if(!pa(c+8|0)){break j}}Na(k);a=0;break e}b=c+8|0;ga(f,f,b);fa((v[c+404>>2]+(a<<5)|0)+136|0,b);a=a+1|0;h=v[c+392>>2];if(a>>>0<h>>>0){continue}break}a=v[c+404>>2]}e=T-32|0;T=e;h=c+176|0;g=v[h+4>>2];b=a+8|0;v[b>>2]=v[h>>2];v[b+4>>2]=g;g=v[h+28>>2];v[b+24>>2]=v[h+24>>2];v[b+28>>2]=g;g=v[h+20>>2];v[b+16>>2]=v[h+16>>2];v[b+20>>2]=g;g=v[h+12>>2];v[b+8>>2]=v[h+8>>2];v[b+12>>2]=g;g=b+32|0;q=h+32|0;ga(g,b,q);i=b- -64|0;r=h- -64|0;ga(i,g,r);n=b+96|0;s=h+96|0;ga(n,i,s);nb(e,n);ga(n,i,e);ga(e,e,s);ga(i,g,e);ga(e,e,r);ga(g,b,e);ga(e,e,q);g=v[e+28>>2];v[b+24>>2]=v[e+24>>2];v[b+28>>2]=g;g=v[e+20>>2];v[b+16>>2]=v[e+16>>2];v[b+20>>2]=g;g=v[e+12>>2];v[b+8>>2]=v[e+8>>2];v[b+12>>2]=g;g=v[e+4>>2];v[b>>2]=v[e>>2];v[b+4>>2]=g;T=e+32|0;e=v[c+108>>2];v[f+24>>2]=v[c+104>>2];v[f+28>>2]=e;e=v[c+100>>2];v[f+16>>2]=v[c+96>>2];v[f+20>>2]=e;e=v[c+92>>2];v[f+8>>2]=v[c+88>>2];v[f+12>>2]=e;e=v[c+84>>2];v[f>>2]=v[c+80>>2];v[f+4>>2]=e;va(a+4232|0,b);a=v[c+404>>2];b=a+4232|0;ga(b,b,a+104|0);a=v[c+404>>2]+72|0;ga(a,a,c+272|0);a=v[c+404>>2]+40|0;ga(a,a,c+240|0);a=v[c+404>>2]+8|0;ga(a,a,c+208|0);a=c+80|0;ga(a,v[c+400>>2],h);fa(a,a);b=v[c+404>>2];ga(b+3208|0,b+4232|0,a);a=0;b=jb(l,k,h,0,3,c+336|0,(m+(p<<1)|0)+129|0);Na(k);if((b|0)!=1){break e}a=v[c+296>>2]}T=c+512|0}Na(k)}T=d+432|0;Na(k)}T=j+112|0;j=(a|0)!=0}T=o- -64|0;return j|0}function he(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;l=T-80|0;T=l;a:{if((d|0)!=32){break a}if(!cb(e,f)){break a}k=v[1325];d=l+16|0;g=c;c=0;j=T-208|0;T=j;v[j+44>>2]=0;b:{if(!Qa(v[k+8>>2])){ia(v[k+176>>2],v[k+180>>2],2066);break b}c:{if(!g){ia(v[k+176>>2],v[k+180>>2],1928);break c}if(!d){ia(v[k+176>>2],v[k+180>>2],1769);break c}if(!e){ia(v[k+176>>2],v[k+180>>2],1375);break c}la(j+112|0,e,j+44|0);d:{if(v[j+44>>2]){break d}if(pa(j+112|0)){break d}la(j+48|0,g,0);f=pd(j,g,e,0);e:{if(!f){break e}i=k+8|0;while(1){la(j+80|0,j,j+44|0);f:{if(v[j+44>>2]){break f}if(pa(j+80|0)){break f}c=f;m=T-288|0;T=m;f=m+128|0;n=j+80|0;Mb(i,f,n);h=m+40|0;sa(h,f);Wa(h);Wa(m+80|0);k=m+256|0;La(k,h);f=j+176|0;la(f,k,m+4|0);k=m+8|0;ga(k,f,j+112|0);oa(k,k,j+48|0);h=j+144|0;xd(h,n);ga(h,h,k);f=0;g:{if(pa(h)){break g}f=1;if(!Gb(h)){break g}va(h,h)}T=m+288|0;if(f){break e}}c=0;p=p+1|0;f=pd(j,g,e,p);if(f){continue}break}}ta(j+48|0);ta(j+80|0);if(!c){break d}Bc(d,j+176|0,j+144|0);break b}t[d|0]=0;t[d+1|0]=0;t[d+2|0]=0;t[d+3|0]=0;t[d+4|0]=0;t[d+5|0]=0;t[d+6|0]=0;t[d+7|0]=0;t[d+56|0]=0;t[d+57|0]=0;t[d+58|0]=0;t[d+59|0]=0;t[d+60|0]=0;t[d+61|0]=0;t[d+62|0]=0;t[d+63|0]=0;t[d+48|0]=0;t[d+49|0]=0;t[d+50|0]=0;t[d+51|0]=0;t[d+52|0]=0;t[d+53|0]=0;t[d+54|0]=0;t[d+55|0]=0;t[d+40|0]=0;t[d+41|0]=0;t[d+42|0]=0;t[d+43|0]=0;t[d+44|0]=0;t[d+45|0]=0;t[d+46|0]=0;t[d+47|0]=0;t[d+32|0]=0;t[d+33|0]=0;t[d+34|0]=0;t[d+35|0]=0;t[d+36|0]=0;t[d+37|0]=0;t[d+38|0]=0;t[d+39|0]=0;t[d+24|0]=0;t[d+25|0]=0;t[d+26|0]=0;t[d+27|0]=0;t[d+28|0]=0;t[d+29|0]=0;t[d+30|0]=0;t[d+31|0]=0;t[d+16|0]=0;t[d+17|0]=0;t[d+18|0]=0;t[d+19|0]=0;t[d+20|0]=0;t[d+21|0]=0;t[d+22|0]=0;t[d+23|0]=0;t[d+8|0]=0;t[d+9|0]=0;t[d+10|0]=0;t[d+11|0]=0;t[d+12|0]=0;t[d+13|0]=0;t[d+14|0]=0;t[d+15|0]=0}c=0}T=j+208|0;if(!c){break a}v[l+12>>2]=72;c=v[1325];k=l+12|0;d=l+16|0;n=T+-64|0;T=n;h:{if(!a){ia(v[c+176>>2],v[c+180>>2],1405);e=0;break h}if(!k){ia(v[c+176>>2],v[c+180>>2],1589);e=0;break h}if(!d){ia(v[c+176>>2],v[c+180>>2],1729);e=0;break h}c=n+32|0;Ac(c,n,d);f=a;g=T-96|0;T=g;p=g+80|0;t[p|0]=0;v[g+72>>2]=0;v[g+76>>2]=0;a=g- -64|0;v[a>>2]=0;v[a+4>>2]=0;v[g+56>>2]=0;v[g+60>>2]=0;v[g+48>>2]=0;v[g+52>>2]=0;o=g+32|0;t[o|0]=0;v[g+24>>2]=0;v[g+28>>2]=0;v[g+16>>2]=0;v[g+20>>2]=0;v[g+8>>2]=0;v[g+12>>2]=0;v[g>>2]=0;v[g+4>>2]=0;d=g+48|0;a=d|1;ua(a,c);c=g|1;ua(c,n);i=33;i:{if(w[g+48|0]){h=33;break i}h=33;e=t[g+49|0];if((e|0)<0){break i}h=32;if(e){d=a;break i}d=a;a=t[g+50|0];if((a|0)<0){break i}d=g+48|2;h=31;if(a){break i}a=t[g+51|0];if((a|0)<0){break i}d=g+48|3;h=30;if(a){break i}a=t[g+52|0];if((a|0)<0){break i}d=g+48|4;h=29;if(a){break i}a=t[g+53|0];if((a|0)<0){break i}d=g+48|5;h=28;if(a){break i}a=t[g+54|0];if((a|0)<0){break i}d=g+48|6;h=27;if(a){break i}a=t[g+55|0];if((a|0)<0){break i}d=g+48|7;h=26;if(a){break i}a=t[g+56|0];if((a|0)<0){break i}d=g+48|8;h=25;if(a){break i}a=t[g+57|0];if((a|0)<0){break i}d=g+48|9;h=24;if(a){break i}a=t[g+58|0];if((a|0)<0){break i}d=g+48|10;h=23;if(a){break i}a=t[g+59|0];if((a|0)<0){break i}d=g+48|11;h=22;if(a){break i}a=t[g+60|0];if((a|0)<0){break i}d=g+48|12;h=21;if(a){break i}a=t[g+61|0];if((a|0)<0){break i}d=g+48|13;h=20;if(a){break i}a=t[g+62|0];if((a|0)<0){break i}d=g+48|14;h=19;if(a){break i}a=t[g+63|0];if((a|0)<0){break i}d=g+48|15;h=18;if(a){break i}a=t[g+64|0];if((a|0)<0){break i}d=g- -64|0;h=17;if(a){break i}a=t[g+65|0];if((a|0)<0){break i}d=g+65|0;h=16;if(a){break i}a=t[g+66|0];if((a|0)<0){break i}d=g+66|0;h=15;if(a){break i}a=t[g+67|0];if((a|0)<0){break i}d=g+67|0;h=14;if(a){break i}a=t[g+68|0];if((a|0)<0){break i}d=g+68|0;h=13;if(a){break i}a=t[g+69|0];if((a|0)<0){break i}d=g+69|0;h=12;if(a){break i}a=t[g+70|0];if((a|0)<0){break i}d=g+70|0;h=11;if(a){break i}a=t[g+71|0];if((a|0)<0){break i}d=g+71|0;h=10;if(a){break i}a=t[g+72|0];if((a|0)<0){break i}d=g+72|0;h=9;if(a){break i}a=t[g+73|0];if((a|0)<0){break i}d=g+73|0;h=8;if(a){break i}a=t[g+74|0];if((a|0)<0){break i}d=g+74|0;h=7;if(a){break i}a=t[g+75|0];if((a|0)<0){break i}d=g+75|0;h=6;if(a){break i}a=t[g+76|0];if((a|0)<0){break i}d=g+76|0;h=5;if(a){break i}a=t[g+77|0];if((a|0)<0){break i}d=g+77|0;h=4;if(a){break i}a=t[g+78|0];if((a|0)<0){break i}d=g+78|0;h=3;if(a){break i}a=t[g+79|0];if((a|0)<0){break i}a=!a&t[g+80|0]>=0;h=a?1:2;d=a?p:g+79|0}a=g;j:{if(w[g|0]){break j}e=t[g+1|0];if((e|0)<0){break j}i=32;if(e){a=c;break j}a=c;c=t[g+2|0];if((c|0)<0){break j}a=g|2;i=31;if(c){break j}c=t[g+3|0];if((c|0)<0){break j}a=g|3;i=30;if(c){break j}c=t[g+4|0];if((c|0)<0){break j}a=g|4;i=29;if(c){break j}c=t[g+5|0];if((c|0)<0){break j}a=g|5;i=28;if(c){break j}c=t[g+6|0];if((c|0)<0){break j}a=g|6;i=27;if(c){break j}c=t[g+7|0];if((c|0)<0){break j}a=g|7;i=26;if(c){break j}c=t[g+8|0];if((c|0)<0){break j}a=g|8;i=25;if(c){break j}c=t[g+9|0];if((c|0)<0){break j}a=g|9;i=24;if(c){break j}c=t[g+10|0];if((c|0)<0){break j}a=g|10;i=23;if(c){break j}c=t[g+11|0];if((c|0)<0){break j}a=g|11;i=22;if(c){break j}c=t[g+12|0];if((c|0)<0){break j}a=g|12;i=21;if(c){break j}c=t[g+13|0];if((c|0)<0){break j}a=g|13;i=20;if(c){break j}c=t[g+14|0];if((c|0)<0){break j}a=g|14;i=19;if(c){break j}c=t[g+15|0];if((c|0)<0){break j}a=g|15;i=18;if(c){break j}c=t[g+16|0];if((c|0)<0){break j}a=g+16|0;i=17;if(c){break j}c=t[g+17|0];if((c|0)<0){break j}a=g+17|0;i=16;if(c){break j}c=t[g+18|0];if((c|0)<0){break j}a=g+18|0;i=15;if(c){break j}c=t[g+19|0];if((c|0)<0){break j}a=g+19|0;i=14;if(c){break j}c=t[g+20|0];if((c|0)<0){break j}a=g+20|0;i=13;if(c){break j}c=t[g+21|0];if((c|0)<0){break j}a=g+21|0;i=12;if(c){break j}c=t[g+22|0];if((c|0)<0){break j}a=g+22|0;i=11;if(c){break j}c=t[g+23|0];if((c|0)<0){break j}a=g+23|0;i=10;if(c){break j}c=t[g+24|0];if((c|0)<0){break j}a=g+24|0;i=9;if(c){break j}c=t[g+25|0];if((c|0)<0){break j}a=g+25|0;i=8;if(c){break j}c=t[g+26|0];if((c|0)<0){break j}a=g+26|0;i=7;if(c){break j}c=t[g+27|0];if((c|0)<0){break j}a=g+27|0;i=6;if(c){break j}c=t[g+28|0];if((c|0)<0){break j}a=g+28|0;i=5;if(c){break j}c=t[g+29|0];if((c|0)<0){break j}a=g+29|0;i=4;if(c){break j}c=t[g+30|0];if((c|0)<0){break j}a=g+30|0;i=3;if(c){break j}c=t[g+31|0];if((c|0)<0){break j}a=!c&t[g+32|0]>=0;i=a?1:2;a=a?o:g+31|0}o=v[k>>2];c=(h+i|0)+6|0;v[k>>2]=c;e=0;if(c>>>0<=o>>>0){t[f+3|0]=h;t[f+2|0]=2;t[f|0]=48;e=h+4|0;t[f+1|0]=e+i;na(f+4|0,d,h);c=f+h|0;t[c+5|0]=i;t[e+f|0]=2;na(c+6|0,a,i);e=1}T=g+96|0}T=n- -64|0;if(e){qc(l,v[l+12>>2]);na(b,Sb(l),Xb(v[l+4>>2],w[l+11|0])+1|0);Wb(l)}o=(e|0)!=0}T=l+80|0;return o|0}function vd(a,b){var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,w=0,x=0,y=0,z=0,A=0,B=0;g=T-224|0;T=g;y=v[b+32>>2];j=v[b+36>>2];ja(g+208|0,y,j,0,801750719,1076732275);r=v[b+40>>2];n=v[b+44>>2];ja(g+176|0,r,n,0,801750719,1076732275);ja(g+192|0,y,j,0,1354194884,1162945305);o=v[b+48>>2];m=v[b+52>>2];ja(g+144|0,o,m,0,801750719,1076732275);ja(g+160|0,r,n,0,1354194884,1162945305);x=v[b+56>>2];c=v[b+60>>2];ja(g+112|0,x,c,0,801750719,1076732275);ja(g+128|0,o,m,0,1354194884,1162945305);z=c;ja(g+96|0,x,c,0,1354194884,1162945305);A=g+80|0;u=v[b+16>>2];p=v[b+20>>2];k=p;e=v[b>>2];d=v[g+208>>2];h=e+d|0;f=v[b+4>>2];c=f+v[g+212>>2]|0;c=d>>>0>h>>>0?c+1|0:c;s=h;d=h;h=c;f=(f|0)==(c|0)&d>>>0<e>>>0|c>>>0<f>>>0;i=v[b+8>>2];d=v[g+216>>2];e=i+d|0;l=v[b+12>>2];c=l+v[g+220>>2]|0;c=d>>>0>e>>>0?c+1|0:c;d=e;e=f+d|0;c=d>>>0>e>>>0?c+1|0:c;f=e;d=e;e=c;l=(l|0)==(c|0)&d>>>0<i>>>0|c>>>0<l>>>0;d=v[g+200>>2];i=d+v[g+184>>2]|0;c=v[g+188>>2]+v[g+204>>2]|0;c=d>>>0>i>>>0?c+1|0:c;d=i;i=d+u|0;c=c+k|0;c=d>>>0>i>>>0?c+1|0:c;d=i;i=l+d|0;c=d>>>0>i>>>0?c+1|0:c;d=c;q=i;i=v[g+176>>2];l=i+f|0;k=e;c=e+v[g+180>>2]|0;c=i>>>0>l>>>0?c+1|0:c;i=l;e=c;f=(c|0)==(k|0)&f>>>0>i>>>0|c>>>0<k>>>0;k=q+f|0;c=d;l=k;d=f>>>0>k>>>0?c+1|0:c;w=v[b+24>>2];q=v[b+28>>2];k=q;f=i;b=v[g+192>>2];i=f+b|0;c=v[g+196>>2]+e|0;c=b>>>0>i>>>0?c+1|0:c;B=i;b=i;t=c;b=(c|0)==(e|0)&b>>>0<f>>>0|c>>>0<e>>>0;e=b+l|0;c=d;c=b>>>0>e>>>0?c+1|0:c;b=e;d=c;i=(p|0)==(c|0)&b>>>0<u>>>0|c>>>0<p>>>0;b=v[g+168>>2];f=b+v[g+152>>2]|0;c=v[g+156>>2]+v[g+172>>2]|0;c=b>>>0>f>>>0?c+1|0:c;b=f;f=b+w|0;c=c+k|0;c=b>>>0>f>>>0?c+1|0:c;b=f;f=i+b|0;c=b>>>0>f>>>0?c+1|0:c;b=c;l=f;f=v[g+144>>2];k=f+e|0;i=d;c=d+v[g+148>>2]|0;c=f>>>0>k>>>0?c+1|0:c;f=k;d=c;e=(c|0)==(i|0)&e>>>0>f>>>0|c>>>0<i>>>0;i=l+e|0;c=b;c=e>>>0>i>>>0?c+1|0:c;e=i;b=c;l=e;e=v[g+160>>2];k=e+f|0;i=d;c=d+v[g+164>>2]|0;c=e>>>0>k>>>0?c+1|0:c;e=k;d=c;f=(c|0)==(i|0)&e>>>0<f>>>0|c>>>0<i>>>0;i=l+f|0;c=b;c=f>>>0>i>>>0?c+1|0:c;f=i;b=c;i=v[g+120>>2];k=v[g+124>>2];u=f;c=d+j|0;f=e+y|0;c=f>>>0<e>>>0?c+1|0:c;p=f;l=c;d=(c|0)==(d|0)&e>>>0>f>>>0|c>>>0<d>>>0;e=u+d|0;c=b;c=d>>>0>e>>>0?c+1|0:c;b=e;d=c;q=(q|0)==(c|0)&b>>>0<w>>>0|c>>>0<q>>>0;j=i;i=v[g+96>>2];b=v[g+136>>2];f=i+b|0;w=v[g+100>>2];c=w+v[g+140>>2]|0;c=b>>>0>f>>>0?c+1|0:c;b=f;f=j+b|0;c=c+k|0;c=b>>>0>f>>>0?c+1|0:c;b=f;f=q+b|0;c=b>>>0>f>>>0?c+1|0:c;b=c;q=f;f=v[g+112>>2];k=f+e|0;j=d;c=d+v[g+116>>2]|0;c=f>>>0>k>>>0?c+1|0:c;f=k;d=c;e=(c|0)==(j|0)&e>>>0>f>>>0|c>>>0<j>>>0;j=q+e|0;c=b;c=e>>>0>j>>>0?c+1|0:c;b=c;k=j;e=f;f=v[g+128>>2];j=e+f|0;c=v[g+132>>2]+d|0;c=f>>>0>j>>>0?c+1|0:c;f=c;d=(c|0)==(d|0)&e>>>0>j>>>0|c>>>0<d>>>0;e=k+d|0;c=b;c=d>>>0>e>>>0?c+1|0:c;d=e;b=c;k=d;d=r;e=d+j|0;c=f+n|0;c=d>>>0>e>>>0?c+1|0:c;q=e;d=e;r=c;d=(f|0)==(c|0)&d>>>0<j>>>0|c>>>0<f>>>0;e=k+d|0;c=b;c=d>>>0>e>>>0?c+1|0:c;d=e;e=d+o|0;b=c;c=c+m|0;u=e;c=d>>>0>e>>>0?c+1|0:c;f=c;ja(A,e,c,0,801750719,1076732275);j=(b|0)==(c|0)&d>>>0>e>>>0|b>>>0>c>>>0;i=(b|0)==(w|0)&d>>>0<i>>>0|b>>>0<w>>>0;b=v[g+104>>2];d=b+x|0;c=v[g+108>>2]+z|0;c=b>>>0>d>>>0?c+1|0:c;b=d;d=i+d|0;c=b>>>0>d>>>0?c+1|0:c;b=d;d=j+d|0;k=d;c=b>>>0>d>>>0?c+1|0:c;ja(g+48|0,d,c,0,801750719,1076732275);ja(g- -64|0,e,f,0,1354194884,1162945305);i=c;ja(g+32|0,d,c,0,1354194884,1162945305);A=g+16|0;j=v[g+56>>2];m=v[g+60>>2];b=s;d=v[g+80>>2];e=b+d|0;c=v[g+84>>2]+h|0;c=d>>>0>e>>>0?c+1|0:c;n=e;d=e;o=c;e=(c|0)==(h|0)&b>>>0>d>>>0|c>>>0<h>>>0;b=v[g+88>>2];d=b+B|0;c=v[g+92>>2]+t|0;c=b>>>0>d>>>0?c+1|0:c;b=d;d=e+d|0;c=b>>>0>d>>>0?c+1|0:c;e=d;b=d;d=c;s=(t|0)==(c|0)&b>>>0<B>>>0|c>>>0<t>>>0;b=v[g+72>>2];h=b+p|0;c=v[g+76>>2]+l|0;c=b>>>0>h>>>0?c+1|0:c;b=h;h=b+j|0;c=c+m|0;c=b>>>0>h>>>0?c+1|0:c;b=h;h=s+b|0;c=b>>>0>h>>>0?c+1|0:c;b=c;s=h;h=v[g+48>>2];m=h+e|0;c=v[g+52>>2]+d|0;c=h>>>0>m>>>0?c+1|0:c;j=m;h=c;d=(c|0)==(d|0)&e>>>0>j>>>0|c>>>0<d>>>0;e=s+d|0;c=b;c=d>>>0>e>>>0?c+1|0:c;d=e;b=c;t=d;d=v[g+64>>2];e=d+j|0;c=v[g+68>>2]+h|0;c=d>>>0>e>>>0?c+1|0:c;s=e;d=e;m=c;d=(h|0)==(c|0)&d>>>0<j>>>0|c>>>0<h>>>0;e=t+d|0;c=b;j=e;b=e;c=d>>>0>b>>>0?c+1|0:c;h=c;l=(l|0)==(c|0)&b>>>0<p>>>0|c>>>0<l>>>0;b=v[g+40>>2];d=b+q|0;c=v[g+44>>2]+r|0;c=b>>>0>d>>>0?c+1|0:c;b=d;d=l+d|0;c=b>>>0>d>>>0?c+1|0:c;b=c;p=d;l=(i|0)==(z|0)&k>>>0<x>>>0|i>>>0<z>>>0;c=l;d=c?801750719:0;e=d+e|0;c=(c?1076732275:0)+h|0;c=d>>>0>e>>>0?c+1|0:c;d=c;h=(h|0)==(c|0)&e>>>0<j>>>0|c>>>0<h>>>0;j=p+h|0;c=b;c=h>>>0>j>>>0?c+1|0:c;h=j;b=c;p=h;h=v[g+32>>2];j=h+e|0;c=v[g+36>>2]+d|0;c=h>>>0>j>>>0?c+1|0:c;h=j;j=c;d=(c|0)==(d|0)&e>>>0>h>>>0|c>>>0<d>>>0;e=p+d|0;c=b;b=e;d=d>>>0>b>>>0?c+1|0:c;p=b;b=h;e=b+u|0;c=f+j|0;c=b>>>0>e>>>0?c+1|0:c;f=e;b=c;e=(j|0)==(c|0)&e>>>0<h>>>0|c>>>0<j>>>0;h=p+e|0;c=d;d=h;c=e>>>0>d>>>0?c+1|0:c;h=l+((r|0)==(c|0)&d>>>0<q>>>0|c>>>0<r>>>0)|0;e=c;p=h;h=l?1354194884:0;j=h+d|0;c=(l?1162945305:0)+c|0;c=h>>>0>j>>>0?c+1|0:c;r=j;h=j;j=c;l=p+((c|0)==(e|0)&d>>>0>h>>>0|c>>>0<e>>>0)|0;d=k;e=d+h|0;c=c+i|0;c=d>>>0>e>>>0?c+1|0:c;h=e;d=e;e=c;t=l+((j|0)==(c|0)&d>>>0<r>>>0|c>>>0<j>>>0)|0;ja(A,t,0,0,801750719,1076732275);l=v[g+20>>2];c=o+l|0;i=v[g+16>>2];d=n;n=i+d|0;r=n;c=d>>>0>n>>>0?c+1|0:c;o=c;v[a>>2]=n;v[a+4>>2]=c;ja(g,t,0,0,1354194884,1162945305);k=v[g+4>>2];c=k+m|0;j=v[g>>2];d=j;n=d+s|0;s=n;c=d>>>0>n>>>0?c+1|0:c;n=c;d=c;m=(l|0)==(o|0)&i>>>0>r>>>0|l>>>0>o>>>0;o=m+v[g+24>>2]|0;c=v[g+28>>2];c=m>>>0>o>>>0?c+1|0:c;m=o;o=m+s|0;c=c+d|0;c=m>>>0>o>>>0?c+1|0:c;m=c;v[a+8>>2]=o;v[a+12>>2]=c;c=b;d=f;f=d+t|0;i=f;b=d>>>0>f>>>0?c+1|0:c;d=(m|0)==(n|0)&o>>>0<s>>>0|m>>>0<n>>>0;f=(k|0)==(n|0)&j>>>0>s>>>0|k>>>0>n>>>0;m=f+v[g+8>>2]|0;c=v[g+12>>2];c=f>>>0>m>>>0?c+1|0:c;f=m;m=d+f|0;c=f>>>0>m>>>0?c+1|0:c;f=m;m=f+i|0;c=b+c|0;c=f>>>0>m>>>0?c+1|0:c;d=a;f=m;v[d+16>>2]=f;v[d+20>>2]=c;d=!b&i>>>0<t>>>0;b=(b|0)==(c|0)&f>>>0<i>>>0|b>>>0>c>>>0;d=d+b|0;c=0;c=b>>>0>d>>>0?1:c;f=d;b=h;h=d+b|0;d=c;c=e+c|0;c=b>>>0>h>>>0?c+1|0:c;b=h;v[a+24>>2]=b;v[a+28>>2]=c;Ec(a,Lb(a)+((c|0)==(d|0)&b>>>0<f>>>0|c>>>0<d>>>0)|0);T=g+224|0}function _c(a,b,c,d,e){var f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,x=0,y=0,z=0,A=0,C=0,D=0,E=0,F=0;i=T-80|0;T=i;v[i+76>>2]=b;E=i+55|0;x=i+56|0;a:{b:{c:{d:while(1){e:{j=b;f:{g:{if((o^2147483647)<(f|0)){break g}o=f+o|0;h:{i:{f=j;h=w[f|0];if(h){while(1){j:{b=h&255;k:{if(!b){b=f;break k}if((b|0)!=37){break j}h=f;while(1){if(w[h+1|0]!=37){b=h;break k}f=f+1|0;g=w[h+2|0];b=h+2|0;h=b;if((g|0)==37){continue}break}}f=f-j|0;D=o^2147483647;if((f|0)>(D|0)){break g}if(a){ub(a,j,f)}if(f){continue d}v[i+76>>2]=b;f=b+1|0;q=-1;g=t[b+1|0];if(!(!_b(g)|w[b+2|0]!=36)){q=g-48|0;y=1;f=b+3|0}v[i+76>>2]=f;l=0;k=t[f|0];b=k-32|0;l:{if(b>>>0>31){h=f;break l}h=f;b=1<<b;if(!(b&75913)){break l}while(1){h=f+1|0;v[i+76>>2]=h;l=b|l;k=t[f+1|0];b=k-32|0;if(b>>>0>=32){break l}f=h;b=1<<b;if(b&75913){continue}break}}m:{if((k|0)==42){b=t[h+1|0];n:{if(!(!_b(b)|w[h+2|0]!=36)){v[((b<<2)+e|0)-192>>2]=10;k=h+3|0;y=1;r=v[((t[h+1|0]<<3)+d|0)-384>>2];break n}if(y){break i}k=h+1|0;if(!a){v[i+76>>2]=k;y=0;r=0;break m}b=v[c>>2];v[c>>2]=b+4;y=0;r=v[b>>2]}v[i+76>>2]=k;if((r|0)>=0){break m}r=0-r|0;l=l|8192;break m}r=Zc(i+76|0);if((r|0)<0){break g}k=v[i+76>>2]}f=0;n=-1;o:{if(w[k|0]!=46){b=k;C=0;break o}if(w[k+1|0]==42){b=t[k+2|0];p:{if(!(!_b(b)|w[k+3|0]!=36)){v[((b<<2)+e|0)-192>>2]=10;b=k+4|0;n=v[((t[k+2|0]<<3)+d|0)-384>>2];break p}if(y){break i}b=k+2|0;n=0;if(!a){break p}g=v[c>>2];v[c>>2]=g+4;n=v[g>>2]}v[i+76>>2]=b;C=(n^-1)>>>31|0;break o}v[i+76>>2]=k+1;n=Zc(i+76|0);b=v[i+76>>2];C=1}while(1){k=f;h=28;m=b;f=t[b|0];if(f-123>>>0<4294967238){break e}b=m+1|0;f=w[(f+B(k,58)|0)+4191|0];if(f-1>>>0<8){continue}break}v[i+76>>2]=b;q:{r:{if((f|0)!=27){if(!f){break e}if((q|0)>=0){v[(q<<2)+e>>2]=f;g=(q<<3)+d|0;f=v[g+4>>2];v[i+64>>2]=v[g>>2];v[i+68>>2]=f;break r}if(!a){break b}Yc(i- -64|0,f,c);break q}if((q|0)>=0){break e}}f=0;if(!a){continue d}}g=l&-65537;l=l&8192?g:l;q=0;z=1110;h=x;s:{t:{u:{v:{w:{x:{y:{z:{A:{B:{C:{D:{E:{F:{G:{f=t[m|0];f=k?(f&15)==3?f&-33:f:f;switch(f-88|0){case 11:break s;case 27:break x;case 12:case 17:break A;case 23:break B;case 0:case 32:break C;case 24:break D;case 22:break E;case 29:break F;case 9:case 13:case 14:case 15:break g;case 1:case 2:case 3:case 4:case 5:case 6:case 7:case 8:case 10:case 16:case 18:case 19:case 20:case 21:case 25:case 26:case 28:case 30:case 31:break h;default:break G}}H:{switch(f-65|0){case 2:break v;case 0:case 4:case 5:case 6:break g;case 1:case 3:break h;default:break H}}if((f|0)==83){break w}break h}s=v[i+64>>2];p=v[i+68>>2];z=1110;break z}f=0;I:{switch(k&255){case 0:v[v[i+64>>2]>>2]=o;continue d;case 1:v[v[i+64>>2]>>2]=o;continue d;case 2:j=v[i+64>>2];v[j>>2]=o;v[j+4>>2]=o>>31;continue d;case 3:u[v[i+64>>2]>>1]=o;continue d;case 4:t[v[i+64>>2]]=o;continue d;case 6:v[v[i+64>>2]>>2]=o;continue d;case 7:break I;default:continue d}}j=v[i+64>>2];v[j>>2]=o;v[j+4>>2]=o>>31;continue d}n=n>>>0>8?n:8;l=l|8;f=120}j=x;F=f&32;g=v[i+68>>2];p=g;s=v[i+64>>2];m=s;if(g|m){while(1){j=j-1|0;t[j|0]=F|w[(m&15)+4720|0];A=!g&m>>>0>15|(g|0)!=0;k=g;g=g>>>4|0;m=(k&15)<<28|m>>>4;if(A){continue}break}}if(!(l&8)|!(p|s)){break y}z=(f>>>4|0)+1110|0;q=2;break y}f=x;g=v[i+68>>2];p=g;s=v[i+64>>2];m=s;if(g|m){while(1){f=f-1|0;t[f|0]=m&7|48;k=!g&m>>>0>7|(g|0)!=0;j=g;g=g>>>3|0;m=(j&7)<<29|m>>>3;if(k){continue}break}}j=f;if(!(l&8)){break y}f=x-j|0;n=(f|0)<(n|0)?n:f+1|0;break y}f=v[i+68>>2];p=f;s=v[i+64>>2];if((f|0)<0){p=0-(p+((s|0)!=0)|0)|0;s=0-s|0;v[i+64>>2]=s;v[i+68>>2]=p;q=1;z=1110;break z}if(l&2048){q=1;z=1111;break z}q=l&1;z=q?1112:1110}k=x;m=s;g=p;J:{if(!g){j=m;break J}while(1){j=Ge(m,g,10,0);f=U;A=Fe(j,f,246,0)+m|0;k=k-1|0;t[k|0]=A|48;A=g>>>0>9;m=j;g=f;if(A){continue}break}}if(j){while(1){k=k-1|0;f=(j>>>0)/10|0;t[k|0]=B(f,246)+j|48;g=j>>>0>9;j=f;if(g){continue}break}}j=k}if((n|0)<0?C:0){break g}l=C?l&-65537:l;if(!((p|s)!=0|n)){j=x;h=j;n=0;break h}f=!(p|s)+(x-j|0)|0;n=(f|0)<(n|0)?n:f;break h}p=0;k=n>>>0<2147483647?n:2147483647;h=k;l=(h|0)!=0;K:{L:{M:{N:{f=v[i+64>>2];j=f?f:2224;f=j;O:{if(!(f&3)|!h){break O}while(1){p=w[f|0];if(!p){break N}h=h-1|0;l=(h|0)!=0;f=f+1|0;if(!(f&3)){break O}if(h){continue}break}}if(!l){break L}P:{if(!(!w[f|0]|h>>>0<4)){while(1){m=v[f>>2];if((m^-1)&m-16843009&-2139062144){break P}f=f+4|0;h=h-4|0;if(h>>>0>3){continue}break}}if(!h){break L}}l=0;break M}l=1}while(1){if(!l){p=w[f|0];l=1;continue}if(!p){break K}f=f+1|0;h=h-1|0;if(!h){break L}l=0;continue}}f=0}f=f?f-j|0:k;h=f+j|0;if((n|0)>=0){l=g;n=f;break h}l=g;n=f;if(!w[h|0]){break h}break g}if(n){j=v[i+64>>2];break u}ib(a,32,r,0,l);g=0;break t}v[i+12>>2]=0;v[i+8>>2]=v[i+64>>2];j=i+8|0;v[i+64>>2]=j;n=-1}f=0;h=j;Q:{while(1){g=v[h>>2];if(!g){break Q}m=Xc(i+4|0,g);g=(m|0)<0;if(!(g|m>>>0>n-f>>>0)){h=h+4|0;f=f+m|0;if(n>>>0>f>>>0){continue}break Q}break}if(g){break c}}h=61;if((f|0)<0){break e}ib(a,32,r,f,l);h=0;g=0;if(!f){break t}while(1){R:{g=v[j>>2];if(!g){break R}g=Xc(i+4|0,g);h=g+h|0;if(h>>>0>f>>>0){break R}ub(a,i+4|0,g);j=j+4|0;if(f>>>0>h>>>0){continue}}break}g=f}ib(a,32,r,g,l^8192);f=(g|0)<(r|0)?r:g;continue d}t[i+55|0]=v[i+64>>2];n=1;j=E;l=g;break h}h=w[f+1|0];f=f+1|0;continue}}if(a){break a}if(!y){break b}f=1;while(1){a=v[(f<<2)+e>>2];if(a){Yc((f<<3)+d|0,a,c);o=1;f=f+1|0;if((f|0)!=10){continue}break a}break}o=1;if(f>>>0>=10){break a}while(1){if(v[(f<<2)+e>>2]){break i}f=f+1|0;if((f|0)!=10){continue}break}break a}h=28;break e}m=h-j|0;g=(n|0)>(m|0)?n:m;if((g|0)<=(q^2147483647)){break f}}h=61;break e}h=61;k=g+q|0;f=(k|0)<(r|0)?r:k;if((D|0)<(f|0)){break e}ib(a,32,f,k,l);ub(a,z,q);ib(a,48,f,k,l^65536);ib(a,48,g,m,0);ub(a,j,m);ib(a,32,f,k,l^8192);continue}break}v[1328]=h}o=-1;break a}o=0}T=i+80|0;return o}function ea(a,b){var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0;d=T-336|0;T=d;c=v[b+4>>2];e=c;h=v[b>>2];g=h;c=c<<1|g>>>31;s=v[b+24>>2];t=v[b+28>>2];I=g<<1;A=c;ja(d- -64|0,s,t,0,I,c);c=v[b+12>>2];B=c;x=v[b+8>>2];g=x;c=c<<1|g>>>31;f=g<<1;g=c;u=v[b+16>>2];p=v[b+20>>2];ja(d+272|0,f,c,0,u,p);c=v[b+32>>2];b=v[b+36>>2];ja(d+224|0,c,b,0,c,b);m=v[d+228>>2];ja(d+208|0,v[d+224>>2],m&1048575,0,15632,16);j=c;c=b<<1|c>>>31;H=j<<1;w=c;ja(d+176|0,H,c,0,h,e);ja(d+80|0,s,t,0,f,g);ja(d+256|0,u,p,0,u,p);b=v[d+236>>2];g=b;c=v[d+232>>2];b=b<<12|c>>>20;ja(d+192|0,c<<12|m>>>20,b,g>>>20|0,15632,16);ja(d+320|0,h,e,0,h,e);ja(d+160|0,H,w,0,x,B);b=u;c=p<<1|b>>>31;ja(d+96|0,b<<1,c,0,s,t);C=v[d+164>>2];b=C+v[d+100>>2]|0;F=v[d+160>>2];g=v[d+96>>2];c=F+g|0;k=c;j=c>>>0<g>>>0?b+1|0:b;G=v[d+80>>2];g=v[d+256>>2];c=G+g|0;r=v[d+84>>2];b=r+v[d+260>>2]|0;b=c>>>0<g>>>0?b+1|0:b;D=c;g=v[d+176>>2];c=c+g|0;f=b;b=b+v[d+180>>2]|0;b=c>>>0<g>>>0?b+1|0:b;y=c;m=v[d+192>>2];g=c+m|0;i=b;c=b+v[d+196>>2]|0;n=g;c=g>>>0<m>>>0?c+1|0:c;e=c;o=v[d+64>>2];g=v[d+272>>2];c=o+g|0;h=v[d+68>>2];b=h+v[d+276>>2]|0;b=c>>>0<g>>>0?b+1|0:b;l=c;z=v[d+208>>2];c=c+z|0;g=b;b=b+v[d+212>>2]|0;b=c>>>0<z>>>0?b+1|0:b;z=c;E=b>>>20|0;J=v[d+220>>2];K=b;m=(b|0)==(g|0)&l>>>0>c>>>0|b>>>0<g>>>0;l=(g|0)==(h|0)&l>>>0<o>>>0|g>>>0<h>>>0;g=v[d+280>>2];b=g+v[d+72>>2]|0;c=v[d+76>>2]+v[d+284>>2]|0;c=b>>>0<g>>>0?c+1|0:c;h=b;g=l+b|0;b=c;b=g>>>0<h>>>0?b+1|0:b;h=g;g=g+v[d+216>>2]|0;c=b+J|0;c=g>>>0<h>>>0?c+1|0:c;h=g;g=m+g|0;b=c;l=g;b=g>>>0<h>>>0?b+1|0:b;h=b;o=g<<12|E;g=o+n|0;c=(b<<12|l>>>20|q)+e|0;c=g>>>0<o>>>0?c+1|0:c;E=c>>>20|0;o=0;J=v[d+204>>2];q=v[d+188>>2];m=c;L=(e|0)==(c|0)&g>>>0<n>>>0|c>>>0<e>>>0;l=(e|0)==(i|0)&n>>>0<y>>>0|e>>>0<i>>>0;n=(f|0)==(i|0)&y>>>0<D>>>0|f>>>0>i>>>0;e=v[d+264>>2];b=e+v[d+88>>2]|0;c=v[d+92>>2]+v[d+268>>2]|0;c=b>>>0<e>>>0?c+1|0:c;e=(f|0)==(r|0)&D>>>0<G>>>0|f>>>0<r>>>0;f=b;e=e+b|0;b=c;b=e>>>0<f>>>0?b+1|0:b;f=e;e=e+v[d+184>>2]|0;c=b+q|0;c=e>>>0<f>>>0?c+1|0:c;f=e;e=n+e|0;b=c;b=e>>>0<f>>>0?b+1|0:b;c=e+v[d+200>>2]|0;b=b+J|0;b=c>>>0<e>>>0?b+1|0:b;f=c;e=l+c|0;c=e>>>0<f>>>0?b+1|0:b;h=h>>>20|0;e=h+e|0;b=c;b=e>>>0<h>>>0?b+1|0:b;h=e;e=L+e|0;c=e>>>0<h>>>0?b+1|0:b;f=c;b=c<<12|e>>>20;e=e<<12|E;c=e+k|0;b=(b|o)+j|0;n=c;b=c>>>0<e>>>0?b+1|0:b;e=b;ja(d,c<<4&-16|m>>>16&15,(b<<4|c>>>28)&16777215,0,977,1);o=v[d+4>>2];c=o+v[d+324>>2]|0;G=v[d>>2];h=v[d+320>>2];b=G+h|0;r=b;c=b>>>0<h>>>0?c+1|0:c;h=c;v[a>>2]=b;v[a+4>>2]=c&1048575;ja(d+304|0,I,A,0,x,B);ja(d+144|0,H,w,0,u,p);ja(d+112|0,s,t,0,s,t);y=d+48|0;D=v[d+148>>2];c=D+v[d+116>>2]|0;E=v[d+144>>2];i=v[d+112>>2];b=E+i|0;l=b;i=b>>>0<i>>>0?c+1|0:c;q=(e|0)==(j|0)&k>>>0>n>>>0|e>>>0<j>>>0;n=(j|0)==(C|0)&k>>>0<F>>>0|j>>>0<C>>>0;j=v[d+104>>2];c=j+v[d+168>>2]|0;b=v[d+172>>2]+v[d+108>>2]|0;b=c>>>0<j>>>0?b+1|0:b;j=c;c=n+c|0;b=c>>>0<j>>>0?b+1|0:b;f=f>>>20|0;j=f+c|0;c=f>>>0>j>>>0?b+1|0:b;f=j;j=q+f|0;b=c;q=j;b=f>>>0>j>>>0?b+1|0:b;j=b;b=(b<<12|q>>>20)+i|0;f=q<<12|e>>>20;e=f+l|0;C=e;b=e>>>0<f>>>0?b+1|0:b;e=b;ja(y,C,b&1048575,0,15632,16);y=v[d+52>>2];b=y+v[d+308>>2]|0;F=v[d+48>>2];f=v[d+304>>2];c=F+f|0;n=c;f=c>>>0<f>>>0?b+1|0:b;k=v[d+328>>2];b=k+v[d+8>>2]|0;c=v[d+12>>2]+v[d+332>>2]|0;c=b>>>0<k>>>0?c+1|0:c;k=(h|0)==(o|0)&r>>>0<G>>>0|h>>>0<o>>>0;o=b;k=k+b|0;b=c;b=k>>>0<o>>>0?b+1|0:b;o=k;k=b;r=o<<12|h>>>20;h=r+n|0;b=(b<<12|o>>>20)+f|0;b=h>>>0<r>>>0?b+1|0:b;r=h;h=b;v[a+8>>2]=r;v[a+12>>2]=b&1048575;ja(d+240|0,u,p,0,I,A);ja(d+288|0,x,B,0,x,B);ja(d+128|0,H,w,0,s,t);p=d+32|0;w=(e|0)==(i|0)&l>>>0>C>>>0|e>>>0<i>>>0;q=(i|0)==(D|0)&l>>>0<E>>>0|i>>>0<D>>>0;i=v[d+120>>2];b=i+v[d+152>>2]|0;c=v[d+156>>2]+v[d+124>>2]|0;c=b>>>0<i>>>0?c+1|0:c;l=b;i=q+b|0;b=c;b=i>>>0<l>>>0?b+1|0:b;c=i;i=j>>>20|0;j=c+i|0;c=j>>>0<i>>>0?b+1|0:b;i=j;j=w+i|0;b=c;l=j;b=j>>>0<i>>>0?b+1|0:b;j=b;s=b<<12|l>>>20;c=s+v[d+132>>2]|0;B=l<<12|e>>>20;i=v[d+128>>2];e=B+i|0;A=e;c=e>>>0<i>>>0?c+1|0:c;e=c;ja(p,A,c&1048575,0,15632,16);x=v[d+240>>2];i=v[d+288>>2];c=x+i|0;t=v[d+244>>2];b=t+v[d+292>>2]|0;b=c>>>0<i>>>0?b+1|0:b;u=c;i=v[d+32>>2];c=c+i|0;p=b;b=b+v[d+36>>2]|0;w=c;i=c>>>0<i>>>0?b+1|0:b;q=(f|0)==(h|0)&n>>>0>r>>>0|f>>>0>h>>>0;l=(f|0)==(y|0)&n>>>0<F>>>0|f>>>0<y>>>0;f=v[d+312>>2];b=f+v[d+56>>2]|0;c=v[d+60>>2]+v[d+316>>2]|0;c=b>>>0<f>>>0?c+1|0:c;n=b;f=l+b|0;b=c;b=f>>>0<n>>>0?b+1|0:b;k=k>>>20|0;f=k+f|0;c=f>>>0<k>>>0?b+1|0:b;b=q+f|0;n=b;c=b>>>0<f>>>0?c+1|0:c;f=c;b=c<<12|b>>>20;k=n<<12|h>>>20;h=k+w|0;c=b+i|0;q=h;c=h>>>0<k>>>0?c+1|0:c;h=c;v[a+16>>2]=q;v[a+20>>2]=c&1048575;o=d+16|0;k=j>>>20|0;j=k+v[d+136>>2]|0;b=v[d+140>>2];b=j>>>0<k>>>0?b+1|0:b;c=j+((e|0)==(s|0)&A>>>0<B>>>0|e>>>0<s>>>0)|0;k=c;b=c>>>0<j>>>0?b+1|0:b;c=b<<12|c>>>20;ja(o,k<<12|e>>>20,c,b>>>20|0,15632,16);l=v[d+16>>2];e=z&-2;c=l+e|0;z=v[d+20>>2];b=z+(K&1048575)|0;k=c;j=c>>>0<e>>>0?b+1|0:b;A=v[d+44>>2];q=(h|0)==(i|0)&q>>>0<w>>>0|h>>>0<i>>>0;n=(i|0)==(p|0)&u>>>0>w>>>0|i>>>0<p>>>0;e=v[d+296>>2];b=e+v[d+248>>2]|0;c=v[d+252>>2]+v[d+300>>2]|0;c=b>>>0<e>>>0?c+1|0:c;e=b;b=b+((p|0)==(t|0)&u>>>0<x>>>0|p>>>0<t>>>0)|0;c=b>>>0<e>>>0?c+1|0:c;i=b;e=b+v[d+40>>2]|0;b=c+A|0;b=e>>>0<i>>>0?b+1|0:b;c=n+e|0;b=c>>>0<e>>>0?b+1|0:b;f=f>>>20|0;e=f+c|0;b=e>>>0<f>>>0?b+1|0:b;f=e;e=q+e|0;c=e>>>0<f>>>0?b+1|0:b;f=e;e=c;p=f<<12|h>>>20;h=p+k|0;b=(c<<12|f>>>20)+j|0;b=h>>>0<p>>>0?b+1|0:b;i=a;v[i+24>>2]=h;v[i+28>>2]=b&1048575;i=m&65535;f=g;g=b;h=(b|0)==(j|0)&k>>>0>h>>>0|b>>>0<j>>>0;j=(j|0)==(z|0)&k>>>0<l>>>0|j>>>0<z>>>0;c=j+v[d+24>>2]|0;b=v[d+28>>2];b=c>>>0<j>>>0?b+1|0:b;e=e>>>20|0;m=e+c|0;c=e>>>0>m>>>0?b+1|0:b;b=h+m|0;c=b>>>0<m>>>0?c+1|0:c;m=b;b=c<<12|b>>>20;m=m<<12|g>>>20;g=f+m|0;c=b+i|0;v[a+32>>2]=g;v[a+36>>2]=g>>>0<m>>>0?c+1|0:c;T=d+336|0}function wd(a,b,c){var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,w=0,x=0;g=T-256|0;T=g;ja(g+240|0,v[c>>2],v[c+4>>2],0,v[b>>2],v[b+4>>2]);d=v[g+244>>2];v[a>>2]=v[g+240>>2];v[a+4>>2]=d;ja(g+208|0,v[c+8>>2],v[c+12>>2],0,v[b>>2],v[b+4>>2]);ja(g+224|0,v[c>>2],v[c+4>>2],0,v[b+8>>2],v[b+12>>2]);h=v[g+208>>2];e=v[g+248>>2];i=h+e|0;f=v[g+212>>2];d=f+v[g+252>>2]|0;d=e>>>0>i>>>0?d+1|0:d;j=i;k=v[g+224>>2];e=i+k|0;i=d;d=d+v[g+228>>2]|0;d=e>>>0<k>>>0?d+1|0:d;k=e;e=d;v[a+8>>2]=k;v[a+12>>2]=d;ja(g+160|0,v[c+16>>2],v[c+20>>2],0,v[b>>2],v[b+4>>2]);ja(g+176|0,v[c+8>>2],v[c+12>>2],0,v[b+8>>2],v[b+12>>2]);ja(g+192|0,v[c>>2],v[c+4>>2],0,v[b+16>>2],v[b+20>>2]);d=v[g+220>>2];h=(f|0)==(i|0)&h>>>0>j>>>0|f>>>0>i>>>0;f=h+v[g+216>>2]|0;n=f;d=f>>>0<h>>>0?d+1|0:d;h=d;f=d;e=(e|0)==(i|0)&j>>>0>k>>>0|e>>>0<i>>>0;i=e+v[g+232>>2]|0;d=v[g+236>>2];d=e>>>0>i>>>0?d+1|0:d;e=i;i=e+n|0;d=d+f|0;d=e>>>0>i>>>0?d+1|0:d;k=i;f=v[g+160>>2];e=i+f|0;i=d;d=d+v[g+164>>2]|0;d=e>>>0<f>>>0?d+1|0:d;q=e;j=v[g+176>>2];f=e+j|0;e=d;d=d+v[g+180>>2]|0;d=f>>>0<j>>>0?d+1|0:d;m=f;l=v[g+192>>2];j=f+l|0;f=d;d=d+v[g+196>>2]|0;o=j;d=j>>>0<l>>>0?d+1|0:d;j=d;v[a+16>>2]=o;v[a+20>>2]=d;ja(g+96|0,v[c+24>>2],v[c+28>>2],0,v[b>>2],v[b+4>>2]);ja(g+112|0,v[c+16>>2],v[c+20>>2],0,v[b+8>>2],v[b+12>>2]);ja(g+128|0,v[c+8>>2],v[c+12>>2],0,v[b+16>>2],v[b+20>>2]);ja(g+144|0,v[c>>2],v[c+4>>2],0,v[b+24>>2],v[b+28>>2]);d=v[g+172>>2];p=(e|0)==(i|0)&k>>>0>q>>>0|e>>>0<i>>>0;l=p+v[g+168>>2]|0;w=l;h=(h|0)==(i|0)&k>>>0<n>>>0|h>>>0>i>>>0;i=l+h|0;d=l>>>0<p>>>0?d+1|0:d;n=d;l=i;i=h>>>0>i>>>0?d+1|0:d;h=(e|0)==(f|0)&m>>>0<q>>>0|e>>>0>f>>>0;e=h+v[g+184>>2]|0;d=v[g+188>>2];d=e>>>0<h>>>0?d+1|0:d;h=e;e=e+l|0;d=d+i|0;p=e;e=e>>>0<h>>>0?d+1|0:d;h=(f|0)==(j|0)&m>>>0>o>>>0|f>>>0>j>>>0;f=h+v[g+200>>2]|0;d=v[g+204>>2];d=f>>>0<h>>>0?d+1|0:d;h=f;f=f+p|0;d=d+e|0;d=f>>>0<h>>>0?d+1|0:d;o=f;j=v[g+96>>2];h=f+j|0;f=d;d=d+v[g+100>>2]|0;d=h>>>0<j>>>0?d+1|0:d;s=h;k=v[g+112>>2];j=h+k|0;h=d;d=d+v[g+116>>2]|0;d=j>>>0<k>>>0?d+1|0:d;t=j;m=v[g+128>>2];k=j+m|0;j=d;d=d+v[g+132>>2]|0;d=k>>>0<m>>>0?d+1|0:d;u=k;r=v[g+144>>2];m=k+r|0;k=d;d=d+v[g+148>>2]|0;d=m>>>0<r>>>0?d+1|0:d;v[a+24>>2]=m;v[a+28>>2]=d;ja(g+48|0,v[c+24>>2],v[c+28>>2],0,v[b+8>>2],v[b+12>>2]);ja(g- -64|0,v[c+16>>2],v[c+20>>2],0,v[b+16>>2],v[b+20>>2]);ja(g+80|0,v[c+8>>2],v[c+12>>2],0,v[b+24>>2],v[b+28>>2]);m=(d|0)==(k|0)&m>>>0<u>>>0|d>>>0<k>>>0;q=m+v[g+152>>2]|0;d=v[g+156>>2];d=m>>>0>q>>>0?d+1|0:d;m=d;x=(e|0)==(f|0)&o>>>0<p>>>0|e>>>0>f>>>0;d=(e|0)==(i|0)&l>>>0>p>>>0|e>>>0<i>>>0;e=(i|0)==(n|0)&l>>>0<w>>>0|i>>>0<n>>>0;i=d+e|0;d=0;d=e>>>0>i>>>0?1:d;e=i;i=x+e|0;w=i;d=e>>>0>i>>>0?d+1|0:d;n=d;i=d;f=(f|0)==(h|0)&o>>>0>s>>>0|f>>>0>h>>>0;e=f+v[g+104>>2]|0;d=v[g+108>>2];d=e>>>0<f>>>0?d+1|0:d;f=e;e=e+w|0;d=d+i|0;p=e;i=e>>>0<f>>>0?d+1|0:d;f=(h|0)==(j|0)&s>>>0>t>>>0|h>>>0>j>>>0;e=f+v[g+120>>2]|0;d=v[g+124>>2];d=e>>>0<f>>>0?d+1|0:d;f=e;e=e+p|0;d=d+i|0;o=e;e=e>>>0<f>>>0?d+1|0:d;h=(j|0)==(k|0)&t>>>0>u>>>0|j>>>0>k>>>0;f=h+v[g+136>>2]|0;d=v[g+140>>2];d=f>>>0<h>>>0?d+1|0:d;h=f;f=f+o|0;d=d+e|0;d=f>>>0<h>>>0?d+1|0:d;x=f;h=f;f=f+q|0;k=d;d=d+m|0;d=f>>>0<h>>>0?d+1|0:d;s=f;j=v[g+48>>2];h=f+j|0;f=d;d=d+v[g+52>>2]|0;d=h>>>0<j>>>0?d+1|0:d;t=h;l=v[g+64>>2];j=h+l|0;h=d;d=d+v[g+68>>2]|0;d=j>>>0<l>>>0?d+1|0:d;u=j;r=v[g+80>>2];l=j+r|0;j=d;d=d+v[g+84>>2]|0;d=l>>>0<r>>>0?d+1|0:d;r=l;l=d;v[a+32>>2]=r;v[a+36>>2]=d;ja(g+16|0,v[c+24>>2],v[c+28>>2],0,v[b+16>>2],v[b+20>>2]);ja(g+32|0,v[c+16>>2],v[c+20>>2],0,v[b+24>>2],v[b+28>>2]);k=(e|0)==(k|0)&o>>>0>x>>>0|e>>>0>k>>>0;d=(e|0)==(i|0)&o>>>0<p>>>0|e>>>0<i>>>0;e=(i|0)==(n|0)&p>>>0<w>>>0|i>>>0<n>>>0;i=d+e|0;d=0;d=e>>>0>i>>>0?1:d;e=i;i=k+e|0;d=e>>>0>i>>>0?d+1|0:d;e=i;i=e+((f|0)==(m|0)&q>>>0>s>>>0|f>>>0<m>>>0)|0;m=i;d=e>>>0>i>>>0?d+1|0:d;k=d;i=d;f=(f|0)==(h|0)&s>>>0>t>>>0|f>>>0>h>>>0;e=f+v[g+56>>2]|0;d=v[g+60>>2];d=e>>>0<f>>>0?d+1|0:d;f=e;e=e+m|0;d=d+i|0;n=e;i=e>>>0<f>>>0?d+1|0:d;f=(h|0)==(j|0)&t>>>0>u>>>0|h>>>0>j>>>0;e=f+v[g+72>>2]|0;d=v[g+76>>2];d=e>>>0<f>>>0?d+1|0:d;f=e;e=e+n|0;d=d+i|0;q=e;e=e>>>0<f>>>0?d+1|0:d;h=(j|0)==(l|0)&r>>>0<u>>>0|j>>>0>l>>>0;f=h+v[g+88>>2]|0;d=v[g+92>>2];d=f>>>0<h>>>0?d+1|0:d;h=f;f=f+q|0;d=d+e|0;d=f>>>0<h>>>0?d+1|0:d;l=f;j=v[g+16>>2];h=f+j|0;f=d;d=d+v[g+20>>2]|0;d=h>>>0<j>>>0?d+1|0:d;p=h;o=v[g+32>>2];j=h+o|0;h=d;d=d+v[g+36>>2]|0;d=j>>>0<o>>>0?d+1|0:d;o=j;j=d;v[a+40>>2]=o;v[a+44>>2]=d;ja(g,v[c+24>>2],v[c+28>>2],0,v[b+24>>2],v[b+28>>2]);c=(i|0)==(k|0)&m>>>0>n>>>0|i>>>0<k>>>0;b=c+((e|0)==(i|0)&n>>>0>q>>>0|e>>>0<i>>>0)|0;d=0;d=b>>>0<c>>>0?1:d;c=b;b=c+((e|0)==(f|0)&l>>>0<q>>>0|e>>>0>f>>>0)|0;k=b;d=b>>>0<c>>>0?d+1|0:d;i=d;b=d;e=(f|0)==(h|0)&l>>>0>p>>>0|f>>>0>h>>>0;c=e+v[g+24>>2]|0;d=v[g+28>>2];d=c>>>0<e>>>0?d+1|0:d;e=c;c=e+k|0;d=b+d|0;f=c;d=f>>>0<e>>>0?d+1|0:d;c=d;j=(h|0)==(j|0)&o>>>0<p>>>0|h>>>0>j>>>0;h=j+v[g+40>>2]|0;d=v[g+44>>2];d=h>>>0<j>>>0?d+1|0:d;j=h;h=h+f|0;d=c+d|0;d=h>>>0<j>>>0?d+1|0:d;n=v[g>>2];j=h+n|0;b=d;d=d+v[g+4>>2]|0;d=j>>>0<n>>>0?d+1|0:d;e=a;v[e+48>>2]=j;v[e+52>>2]=d;j=(b|0)==(d|0)&h>>>0>j>>>0|b>>>0>d>>>0;a=(b|0)==(c|0)&f>>>0>h>>>0|b>>>0<c>>>0;c=(c|0)==(i|0)&f>>>0<k>>>0|c>>>0<i>>>0;b=c+v[g+8>>2]|0;d=v[g+12>>2];d=b>>>0<c>>>0?d+1|0:d;c=b;b=a+c|0;d=b>>>0<c>>>0?d+1|0:d;c=b;b=j+c|0;v[e+56>>2]=b;v[e+60>>2]=b>>>0<c>>>0?d+1|0:d;T=g+256|0}function fa(a,b){var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0;o=T+-64|0;T=o;h=T-160|0;T=h;d=v[b>>2];c=v[b+4>>2];ja(h+144|0,d,c,0,d,c);c=v[h+148>>2];v[o>>2]=v[h+144>>2];v[o+4>>2]=c;ja(h+128|0,v[b+8>>2],v[b+12>>2],0,v[b>>2],v[b+4>>2]);c=v[h+132>>2];j=c;g=v[h+128>>2];d=g;c=c<<1|d>>>31;k=d<<1;e=v[h+152>>2];f=k+e|0;d=c;c=c+v[h+156>>2]|0;i=f;v[o+8>>2]=f;c=f>>>0<e>>>0?c+1|0:c;v[o+12>>2]=c;ja(h+96|0,v[b+16>>2],v[b+20>>2],0,v[b>>2],v[b+4>>2]);f=v[b+8>>2];e=v[b+12>>2];ja(h+112|0,f,e,0,f,e);e=v[h+140>>2];w=e;p=(c|0)==(d|0)&i>>>0<k>>>0|c>>>0<d>>>0;l=v[h+136>>2];f=l;c=e<<1|f>>>31;q=f<<1;d=q|((d|0)==(j|0)&g>>>0>k>>>0|d>>>0<j>>>0);e=p+d|0;i=c;s=e;c=d>>>0>e>>>0?c+1|0:c;g=c;d=c;c=v[h+100>>2];t=c;m=v[h+96>>2];e=m;c=c<<1|e>>>31;k=e<<1;e=k;j=e+s|0;f=c;c=c+d|0;c=e>>>0>j>>>0?c+1|0:c;n=j;d=v[h+112>>2];e=j+d|0;j=c;c=c+v[h+116>>2]|0;r=e;c=d>>>0>e>>>0?c+1|0:c;e=c;v[o+16>>2]=r;v[o+20>>2]=c;ja(h- -64|0,v[b+24>>2],v[b+28>>2],0,v[b>>2],v[b+4>>2]);ja(h+80|0,v[b+16>>2],v[b+20>>2],0,v[b+8>>2],v[b+12>>2]);c=0;d=(i|0)==(w|0)&l>>>0>q>>>0|i>>>0<w>>>0;i=d+(p&!(g|s))|0;E=i;c=d>>>0>i>>>0?1:c;q=c;d=c;c=v[h+108>>2];y=c;A=v[h+104>>2];i=A;c=c<<1|i>>>31;z=(g|0)==(j|0)&n>>>0<s>>>0|g>>>0>j>>>0;s=i<<1;f=s|((f|0)==(t|0)&k>>>0<m>>>0|f>>>0<t>>>0);i=z+f|0;k=c;c=f>>>0>i>>>0?c+1|0:c;w=i;g=i+E|0;f=c;c=c+d|0;F=g;d=g>>>0<i>>>0?c+1|0:c;e=(e|0)==(j|0)&n>>>0>r>>>0|e>>>0<j>>>0;i=e+v[h+120>>2]|0;c=v[h+124>>2];c=e>>>0>i>>>0?c+1|0:c;e=i;i=e+g|0;c=c+d|0;B=i;c=e>>>0>i>>>0?c+1|0:c;l=c;e=c;c=v[h+68>>2];G=c;t=v[h+64>>2];i=t;c=c<<1|i>>>31;n=i<<1;g=n;j=g+B|0;i=c;c=c+e|0;C=j;c=g>>>0>j>>>0?c+1|0:c;m=c;e=c;c=v[h+84>>2];D=c;r=v[h+80>>2];g=r;c=c<<1|g>>>31;p=g<<1;j=p;x=j+C|0;g=c;c=c+e|0;u=x;c=j>>>0>u>>>0?c+1|0:c;e=c;v[o+24>>2]=u;v[o+28>>2]=c;ja(h+32|0,v[b+24>>2],v[b+28>>2],0,v[b+8>>2],v[b+12>>2]);j=v[b+16>>2];c=v[b+20>>2];ja(h+48|0,j,c,0,j,c);x=(d|0)==(l|0)&B>>>0<F>>>0|d>>>0>l>>>0;j=(d|0)==(q|0)&F>>>0<E>>>0|d>>>0<q>>>0;d=(k|0)==(y|0)&s>>>0<A>>>0|k>>>0<y>>>0;f=d+(z&!(f|w))|0;c=0;c=d>>>0>f>>>0?1:c;d=f;f=j+d|0;c=d>>>0>f>>>0?c+1|0:c;d=f;f=x+d|0;H=f;c=d>>>0>f>>>0?c+1|0:c;j=c;d=c;c=v[h+76>>2];F=c;x=v[h+72>>2];f=x;c=c<<1|f>>>31;y=(m|0)==(l|0)&B>>>0>C>>>0|m>>>0<l>>>0;z=f<<1;f=z|((i|0)==(G|0)&n>>>0<t>>>0|i>>>0<G>>>0);i=y+f|0;q=c;c=f>>>0>i>>>0?c+1|0:c;A=i;f=i;k=f+H|0;i=c;c=c+d|0;B=k;d=f>>>0>k>>>0?c+1|0:c;c=v[h+92>>2];E=c;s=(e|0)==(m|0)&u>>>0<C>>>0|e>>>0<m>>>0;w=v[h+88>>2];e=w;c=c<<1|e>>>31;t=e<<1;e=t|((g|0)==(D|0)&r>>>0>p>>>0|g>>>0<D>>>0);f=s+e|0;k=c;c=f>>>0<e>>>0?c+1|0:c;n=f;e=f;g=f+B|0;f=c;c=c+d|0;C=g;c=g>>>0<e>>>0?c+1|0:c;l=c;e=c;c=v[h+36>>2];G=c;r=v[h+32>>2];g=r;c=c<<1|g>>>31;p=g<<1;m=p;u=m+C|0;g=c;c=c+e|0;c=m>>>0>u>>>0?c+1|0:c;D=u;e=v[h+48>>2];u=u+e|0;m=c;c=c+v[h+52>>2]|0;c=e>>>0>u>>>0?c+1|0:c;e=c;v[o+32>>2]=u;v[o+36>>2]=c;ja(h+16|0,v[b+24>>2],v[b+28>>2],0,v[b+16>>2],v[b+20>>2]);I=(d|0)==(l|0)&B>>>0>C>>>0|d>>>0>l>>>0;n=!(f|n)&s;j=(d|0)==(j|0)&B>>>0<H>>>0|d>>>0<j>>>0;d=(q|0)==(F|0)&x>>>0>z>>>0|q>>>0<F>>>0;f=d+((k|0)==(E|0)&w>>>0>t>>>0|k>>>0<E>>>0)|0;c=0;c=d>>>0>f>>>0?1:c;d=f;f=d+(y&!(i|A))|0;c=d>>>0>f>>>0?c+1|0:c;d=f;f=j+d|0;c=d>>>0>f>>>0?c+1|0:c;d=f;f=n+d|0;c=d>>>0>f>>>0?c+1|0:c;d=f;f=I+d|0;z=f;c=d>>>0>f>>>0?c+1|0:c;q=c;d=c;c=v[h+44>>2];A=c;t=v[h+40>>2];f=t;c=c<<1|f>>>31;w=(m|0)==(l|0)&C>>>0>D>>>0|m>>>0<l>>>0;n=f<<1;f=n|((g|0)==(G|0)&r>>>0>p>>>0|g>>>0<G>>>0);g=w+f|0;i=c;c=f>>>0>g>>>0?c+1|0:c;r=g;k=g+z|0;f=c;c=c+d|0;y=k;d=g>>>0>k>>>0?c+1|0:c;e=(e|0)==(m|0)&u>>>0<D>>>0|e>>>0<m>>>0;g=e+v[h+56>>2]|0;c=v[h+60>>2];c=g>>>0<e>>>0?c+1|0:c;e=g;g=g+k|0;c=c+d|0;x=g;c=g>>>0<e>>>0?c+1|0:c;e=c;c=v[h+20>>2];s=c;p=v[h+16>>2];g=p;c=c<<1|g>>>31;l=g<<1;g=l;m=g+x|0;k=c;c=c+e|0;c=g>>>0>m>>>0?c+1|0:c;g=c;v[o+40>>2]=m;v[o+44>>2]=c;c=v[b+24>>2];b=v[b+28>>2];ja(h,c,b,0,c,b);D=(d|0)==(e|0)&y>>>0>x>>>0|d>>>0>e>>>0;j=(d|0)==(q|0)&y>>>0<z>>>0|d>>>0<q>>>0;b=(i|0)==(A|0)&n>>>0<t>>>0|i>>>0<A>>>0;d=b+(w&!(f|r))|0;c=0;c=b>>>0>d>>>0?1:c;b=d;d=j+d|0;c=b>>>0>d>>>0?c+1|0:c;b=d;d=D+d|0;n=d;c=b>>>0>d>>>0?c+1|0:c;i=c;b=c;c=v[h+28>>2];r=c;m=(g|0)==(e|0)&m>>>0<x>>>0|g>>>0<e>>>0;j=v[h+24>>2];d=j;c=c<<1|d>>>31;q=d<<1;d=q|((k|0)==(s|0)&l>>>0<p>>>0|k>>>0<s>>>0);g=m+d|0;f=c;c=d>>>0>g>>>0?c+1|0:c;k=g;l=g+n|0;d=c;c=c+b|0;c=g>>>0>l>>>0?c+1|0:c;p=l;g=v[h>>2];l=l+g|0;b=c;c=c+v[h+4>>2]|0;c=g>>>0>l>>>0?c+1|0:c;e=o;g=l;v[e+48>>2]=g;v[e+52>>2]=c;l=(b|0)==(c|0)&g>>>0<p>>>0|b>>>0>c>>>0;i=(b|0)==(i|0)&n>>>0>p>>>0|b>>>0<i>>>0;g=m&!(d|k);b=(f|0)==(r|0)&j>>>0>q>>>0|f>>>0<r>>>0;d=b+v[h+8>>2]|0;c=v[h+12>>2];c=b>>>0>d>>>0?c+1|0:c;b=d;d=g+d|0;c=b>>>0>d>>>0?c+1|0:c;b=d;d=i+d|0;c=b>>>0>d>>>0?c+1|0:c;b=d;d=l+d|0;v[e+56>>2]=d;v[e+60>>2]=b>>>0>d>>>0?c+1|0:c;T=h+160|0;vd(a,e);T=e- -64|0}function Jb(a,b){var c=0,d=0,e=0,f=0;d=T-480|0;T=d;f=d+440|0;ea(f,b);ha(f,f,b);e=d+400|0;ea(e,f);ha(e,e,b);c=v[d+436>>2];v[d+392>>2]=v[d+432>>2];v[d+396>>2]=c;c=v[d+428>>2];v[d+384>>2]=v[d+424>>2];v[d+388>>2]=c;c=v[d+420>>2];v[d+376>>2]=v[d+416>>2];v[d+380>>2]=c;c=v[d+412>>2];v[d+368>>2]=v[d+408>>2];v[d+372>>2]=c;c=v[d+404>>2];v[d+360>>2]=v[d+400>>2];v[d+364>>2]=c;c=d+360|0;ea(c,c);ea(c,c);ea(c,c);ha(c,c,e);c=v[d+396>>2];v[d+352>>2]=v[d+392>>2];v[d+356>>2]=c;c=v[d+388>>2];v[d+344>>2]=v[d+384>>2];v[d+348>>2]=c;c=v[d+380>>2];v[d+336>>2]=v[d+376>>2];v[d+340>>2]=c;c=v[d+372>>2];v[d+328>>2]=v[d+368>>2];v[d+332>>2]=c;c=v[d+364>>2];v[d+320>>2]=v[d+360>>2];v[d+324>>2]=c;c=d+320|0;ea(c,c);ea(c,c);ea(c,c);ha(c,c,e);c=v[d+356>>2];v[d+312>>2]=v[d+352>>2];v[d+316>>2]=c;c=v[d+348>>2];v[d+304>>2]=v[d+344>>2];v[d+308>>2]=c;c=v[d+340>>2];v[d+296>>2]=v[d+336>>2];v[d+300>>2]=c;c=v[d+332>>2];v[d+288>>2]=v[d+328>>2];v[d+292>>2]=c;c=v[d+324>>2];v[d+280>>2]=v[d+320>>2];v[d+284>>2]=c;e=d+280|0;ea(e,e);ea(e,e);ha(e,e,f);c=v[d+316>>2];v[d+272>>2]=v[d+312>>2];v[d+276>>2]=c;c=v[d+308>>2];v[d+264>>2]=v[d+304>>2];v[d+268>>2]=c;c=v[d+300>>2];v[d+256>>2]=v[d+296>>2];v[d+260>>2]=c;c=v[d+292>>2];v[d+248>>2]=v[d+288>>2];v[d+252>>2]=c;c=v[d+284>>2];v[d+240>>2]=v[d+280>>2];v[d+244>>2]=c;c=d+240|0;ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ha(c,c,e);e=v[d+276>>2];v[d+232>>2]=v[d+272>>2];v[d+236>>2]=e;e=v[d+268>>2];v[d+224>>2]=v[d+264>>2];v[d+228>>2]=e;e=v[d+260>>2];v[d+216>>2]=v[d+256>>2];v[d+220>>2]=e;e=v[d+252>>2];v[d+208>>2]=v[d+248>>2];v[d+212>>2]=e;e=v[d+244>>2];v[d+200>>2]=v[d+240>>2];v[d+204>>2]=e;e=d+200|0;ea(e,e);ea(e,e);ea(e,e);ea(e,e);ea(e,e);ea(e,e);ea(e,e);ea(e,e);ea(e,e);ea(e,e);ea(e,e);ea(e,e);ea(e,e);ea(e,e);ea(e,e);ea(e,e);ea(e,e);ea(e,e);ea(e,e);ea(e,e);ea(e,e);ea(e,e);ha(e,e,c);c=v[d+236>>2];v[d+192>>2]=v[d+232>>2];v[d+196>>2]=c;c=v[d+228>>2];v[d+184>>2]=v[d+224>>2];v[d+188>>2]=c;c=v[d+220>>2];v[d+176>>2]=v[d+216>>2];v[d+180>>2]=c;c=v[d+212>>2];v[d+168>>2]=v[d+208>>2];v[d+172>>2]=c;c=v[d+204>>2];v[d+160>>2]=v[d+200>>2];v[d+164>>2]=c;c=d+160|0;ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ha(c,c,e);c=v[d+196>>2];v[d+152>>2]=v[d+192>>2];v[d+156>>2]=c;c=v[d+188>>2];v[d+144>>2]=v[d+184>>2];v[d+148>>2]=c;c=v[d+180>>2];v[d+136>>2]=v[d+176>>2];v[d+140>>2]=c;c=v[d+172>>2];v[d+128>>2]=v[d+168>>2];v[d+132>>2]=c;c=v[d+164>>2];v[d+120>>2]=v[d+160>>2];v[d+124>>2]=c;c=0;while(1){e=d+120|0;ea(e,e);c=c+1|0;if((c|0)!=88){continue}break}c=d+120|0;ha(c,c,d+160|0);c=v[d+156>>2];v[d+112>>2]=v[d+152>>2];v[d+116>>2]=c;c=v[d+148>>2];v[d+104>>2]=v[d+144>>2];v[d+108>>2]=c;c=v[d+140>>2];v[d+96>>2]=v[d+136>>2];v[d+100>>2]=c;c=v[d+132>>2];v[d+88>>2]=v[d+128>>2];v[d+92>>2]=c;c=v[d+124>>2];v[d+80>>2]=v[d+120>>2];v[d+84>>2]=c;c=d+80|0;ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ha(c,c,d+200|0);c=v[d+116>>2];v[d+72>>2]=v[d+112>>2];v[d+76>>2]=c;f=v[d+108>>2];e=d- -64|0;c=e;v[c>>2]=v[d+104>>2];v[c+4>>2]=f;c=v[d+100>>2];v[d+56>>2]=v[d+96>>2];v[d+60>>2]=c;c=v[d+92>>2];v[d+48>>2]=v[d+88>>2];v[d+52>>2]=c;c=v[d+84>>2];v[d+40>>2]=v[d+80>>2];v[d+44>>2]=c;c=d+40|0;ea(c,c);ea(c,c);ea(c,c);ha(c,c,d+400|0);c=v[d+76>>2];v[d+32>>2]=v[d+72>>2];v[d+36>>2]=c;c=v[e+4>>2];v[d+24>>2]=v[e>>2];v[d+28>>2]=c;c=v[d+60>>2];v[d+16>>2]=v[d+56>>2];v[d+20>>2]=c;c=v[d+52>>2];v[d+8>>2]=v[d+48>>2];v[d+12>>2]=c;c=v[d+44>>2];v[d>>2]=v[d+40>>2];v[d+4>>2]=c;ea(d,d);ea(d,d);ea(d,d);ea(d,d);ea(d,d);ea(d,d);ea(d,d);ea(d,d);ea(d,d);ea(d,d);ea(d,d);ea(d,d);ea(d,d);ea(d,d);ea(d,d);ea(d,d);ea(d,d);ea(d,d);ea(d,d);ea(d,d);ea(d,d);ea(d,d);ea(d,d);ha(d,d,d+240|0);ea(d,d);ea(d,d);ea(d,d);ea(d,d);ea(d,d);ea(d,d);ha(d,d,d+440|0);ea(d,d);ea(a,d);ea(d,a);a=T-48|0;T=a;c=a+8|0;ra(c,d,1);qa(c,b);b=ic(c);T=a+48|0;T=d+480|0;return b}function uc(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var q=0,r=0,s=0,t=0,u=0,x=0,z=0,A=0,C=0;q=T-1824|0;T=q;s=q+1288|0;v[s>>2]=0;v[s+4>>2]=0;s=q+1280|0;v[s>>2]=0;v[s+4>>2]=0;v[q+1272>>2]=0;v[q+1276>>2]=0;v[q+1264>>2]=0;v[q+1268>>2]=0;v[q+376>>2]=0;v[q+380>>2]=0;v[q+368>>2]=0;v[q+372>>2]=0;v[q+360>>2]=0;v[q+364>>2]=0;v[q+352>>2]=0;v[q+356>>2]=0;a:{if(y[d>>2]<193?d:0){break a}ta(q+1408|0);_a(q+1264|0,i,j);if(n){s=q+1304|0;Aa(s);i=q+1264|0;ma(s,i,32);ma(s,n,o);za(s,i)}vb(q+1232|0,q+1200|0,l,0);vb(q+1072|0,q+1040|0,m,1);b:{if(!(!f|(c|e))){a=q+400|0;Pa(a,v[k+8>>2],q+1072|0,256);sa(f,a);Pa(a,v[k+8>>2],q+1040|0,256);sa(f+88|0,a);break b}kd(q,v[g>>2],v[g+4>>2]);if(p){m=q+352|0;ua(m,q);v[q+372>>2]=w[p+16|0]|w[p+17|0]<<8|(w[p+18|0]<<16|w[p+19|0]<<24);i=w[p+4|0]|w[p+5|0]<<8|(w[p+6|0]<<16|w[p+7|0]<<24);v[q+356>>2]=w[p|0]|w[p+1|0]<<8|(w[p+2|0]<<16|w[p+3|0]<<24);v[q+360>>2]=i;i=w[p+12|0]|w[p+13|0]<<8|(w[p+14|0]<<16|w[p+15|0]<<24);v[q+364>>2]=w[p+8|0]|w[p+9|0]<<8|(w[p+10|0]<<16|w[p+11|0]<<24);v[q+368>>2]=i;la(q,m,q+396|0)}va(q,q);i=q+1232|0;oa(i,i,q);Pa(q+656|0,v[k+8>>2],i,256);Pa(q+528|0,v[k+8>>2],q+1200|0,256);x=q+1480|0;while(1){z=v[g>>2];i=v[g+4>>2];u=q+1440|0;t=v[k+4>>2];m=A;na(u,t+B(m+(v[k>>2]>>>1|0)|0,88)|0,88);n=r;o=m+2|0;s=q+400|0;p=q+1168|0;vb(s,p,l,o);Ia(u,u);o=t+B(m,88)|0;t=m&31;i=((m&63)>>>0>=32?i>>>t|0:((1<<t)-1&i)<<32-t|z>>>t)&1;ka(u,o,i);ka(x,o+40|0,i);i=q+656|0;Ja(i,i,u);Pa(q,o,s,256);n=q+1664|0;sa(n,q);i=q+528|0;Ja(i,i,n);Pa(q,v[k+4>>2]+B(m+(v[k>>2]>>>1|0)|0,88)|0,p,256);sa(n,q);Ja(i,i,n);i=m+1|0;r=i?r:r+1|0;A=i;if((i|0)!=64|r){continue}break}sa(q,q+656|0);m=q+88|0;sa(m,q+528|0);i=q+1264|0;_a(i,q,m);la(q+944|0,i,q+396|0);if(v[q+396>>2]){break a}if(pa(q+944|0)){break a}i=q+1264|0;_a(i,q,m);la(q+912|0,i,q+396|0);if(v[q+396>>2]){break a}if(pa(q+912|0)){break a}i=q+912|0;fa(q+880|0,i);bc(q+1664|0,l,q+944|0,i,g);ta(q+1168|0);n=0;while(1){m=q+1440|0;i=q+400|0;ac(q+1664|0,m,i,q+1408|0);ga(m,m,i);i=q+1168|0;oa(i,i,m);n=n+1|0;if((n|0)!=64){continue}break}bc(q+1664|0,l,q+944|0,q+912|0,g);ta(q+1136|0);n=0;while(1){m=q+1440|0;ya(m,1);o=q+400|0;i=q+1104|0;ac(q+1664|0,o,i,m);ga(o,o,i);i=q+1136|0;oa(i,i,o);n=n+1|0;if((n|0)!=64){continue}break}bc(q+1664|0,l,q+944|0,q+912|0,g);ta(q+1104|0);n=0;while(1){o=q+1440|0;ya(o,1);va(o,o);m=q+400|0;i=q+1008|0;ac(q+1664|0,m,i,o);ga(m,m,i);i=q+1104|0;oa(i,i,m);n=n+1|0;if((n|0)!=64){continue}break}i=q+784|0;ya(i,2);nb(i,i);n=q+1104|0;va(n,n);m=q+1136|0;oa(m,m,n);ga(m,m,i);oa(n,n,q+1168|0);va(n,n);oa(n,n,m);Pa(q+400|0,j,m,256);n=f;if(!n){n=q+176|0;i=q+400|0;sa(n,i);Pa(i,v[k+8>>2],q+1072|0,256)}i=q+400|0;Ja(i,i,n);m=q+176|0;sa(m,i);Pa(i,j,q+1104|0,256);c:{if(!f){p=q+264|0;f=q+400|0;sa(p,f);Pa(f,v[k+8>>2],q+1040|0,256);break c}p=f+88|0}f=q+400|0;Ja(f,f,p);i=q+264|0;sa(i,f);f=q+1264|0;_a(f,m,i);la(q+848|0,f,q+396|0);if(v[q+396>>2]){break a}if(pa(q+848|0)){break a}fa(q+816|0,q+848|0);if(!(e?c:0)){j=q+1008|0;ga(j,q+1072|0,q+848|0);i=q+784|0;ga(i,q+1040|0,q+816|0);oa(j,j,i);f=q+880|0;ga(i,f,h);oa(j,j,i);ga(f,f,q+912|0)}if(!c){ua(e,q+1008|0);break b}if(e){la(q+1008|0,e,q+396|0);if(v[q+396>>2]){break a}if(pa(q+784|0)){break a}}f=q+976|0;ga(f,q+1200|0,q+848|0);oa(f,f,q+1232|0);e=q+1008|0;va(e,e);va(f,f);ua(c,e);ua(c+32|0,f);ed(c- -64|0,q,4);e=q+1304|0;Aa(e);m=q+1264|0;ma(e,m,32);ma(e,c,64);za(e,m);e=v[q+876>>2];f=q+1464|0;v[f>>2]=v[q+872>>2];v[f+4>>2]=e;e=v[q+868>>2];f=q+1456|0;v[f>>2]=v[q+864>>2];v[f+4>>2]=e;e=v[q+860>>2];f=q+1448|0;v[f>>2]=v[q+856>>2];v[f+4>>2]=e;e=v[q+852>>2];v[q+1440>>2]=v[q+848>>2];v[q+1444>>2]=e;e=l;l=q+944|0;bc(q+1504|0,e,l,q+912|0,g);v[d>>2]=v[d>>2]-193;nb(l,l);p=c+193|0;j=q+1440|0;h=0;r=T-224|0;T=r;v[r+40>>2]=0;e=v[d>>2];c=jd();d:{if(e>>>0<c>>>0){break d}v[d>>2]=c;c=B(Eb(64),176);if(!kb(b,c+15360|0,5)){break d}o=wa(b,2048);n=wa(b,2048);i=wa(b,5632);g=wa(b,5632);f=wa(b,c);while(1){e=h<<5;c=h<<1;dd(e+o|0,c,j);dd(e+n|0,c|1,j);c=B(h,88);na(c+i|0,c+v[k+4>>2]|0,88);na(c+g|0,v[k+4>>2]+B((v[k>>2]>>>1|0)+h|0,88)|0,88);h=h+1|0;if((h|0)!=64){continue}break}c=r+8|0;hd(c,o,n,64);ua(p,c);c=r+120|0;Aa(c);ma(c,m,32);ma(c,p,32);e=c;c=r+80|0;za(e,c);la(r+48|0,c,r+44|0);h=0;e:{if(v[r+44>>2]){break e}if(pa(r+48|0)){break e}if(!cd(a,b,f,r+40|0,v[k+8>>2],i,g,o,n,l,r+48|0,64,r+80|0)){break e}ua(p+32|0,o);ua(p+96|0,n);ua(p- -64|0,o+32|0);ua(p+128|0,n+32|0);ed(p+160|0,f,v[r+40>>2]);h=1}Na(b)}T=r+224|0;if(!h){break a}v[d>>2]=v[d>>2]+193}C=1}T=q+1824|0;return C}function Fc(a,b){var c=0,d=0,e=0,f=0;d=T-480|0;T=d;f=d+440|0;ea(f,b);ha(f,f,b);e=d+400|0;ea(e,f);ha(e,e,b);c=v[d+436>>2];v[d+392>>2]=v[d+432>>2];v[d+396>>2]=c;c=v[d+428>>2];v[d+384>>2]=v[d+424>>2];v[d+388>>2]=c;c=v[d+420>>2];v[d+376>>2]=v[d+416>>2];v[d+380>>2]=c;c=v[d+412>>2];v[d+368>>2]=v[d+408>>2];v[d+372>>2]=c;c=v[d+404>>2];v[d+360>>2]=v[d+400>>2];v[d+364>>2]=c;c=d+360|0;ea(c,c);ea(c,c);ea(c,c);ha(c,c,e);c=v[d+396>>2];v[d+352>>2]=v[d+392>>2];v[d+356>>2]=c;c=v[d+388>>2];v[d+344>>2]=v[d+384>>2];v[d+348>>2]=c;c=v[d+380>>2];v[d+336>>2]=v[d+376>>2];v[d+340>>2]=c;c=v[d+372>>2];v[d+328>>2]=v[d+368>>2];v[d+332>>2]=c;c=v[d+364>>2];v[d+320>>2]=v[d+360>>2];v[d+324>>2]=c;c=d+320|0;ea(c,c);ea(c,c);ea(c,c);ha(c,c,e);c=v[d+356>>2];v[d+312>>2]=v[d+352>>2];v[d+316>>2]=c;c=v[d+348>>2];v[d+304>>2]=v[d+344>>2];v[d+308>>2]=c;c=v[d+340>>2];v[d+296>>2]=v[d+336>>2];v[d+300>>2]=c;c=v[d+332>>2];v[d+288>>2]=v[d+328>>2];v[d+292>>2]=c;c=v[d+324>>2];v[d+280>>2]=v[d+320>>2];v[d+284>>2]=c;e=d+280|0;ea(e,e);ea(e,e);ha(e,e,f);c=v[d+316>>2];v[d+272>>2]=v[d+312>>2];v[d+276>>2]=c;c=v[d+308>>2];v[d+264>>2]=v[d+304>>2];v[d+268>>2]=c;c=v[d+300>>2];v[d+256>>2]=v[d+296>>2];v[d+260>>2]=c;c=v[d+292>>2];v[d+248>>2]=v[d+288>>2];v[d+252>>2]=c;c=v[d+284>>2];v[d+240>>2]=v[d+280>>2];v[d+244>>2]=c;c=d+240|0;ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ha(c,c,e);e=v[d+276>>2];v[d+232>>2]=v[d+272>>2];v[d+236>>2]=e;e=v[d+268>>2];v[d+224>>2]=v[d+264>>2];v[d+228>>2]=e;e=v[d+260>>2];v[d+216>>2]=v[d+256>>2];v[d+220>>2]=e;e=v[d+252>>2];v[d+208>>2]=v[d+248>>2];v[d+212>>2]=e;e=v[d+244>>2];v[d+200>>2]=v[d+240>>2];v[d+204>>2]=e;e=d+200|0;ea(e,e);ea(e,e);ea(e,e);ea(e,e);ea(e,e);ea(e,e);ea(e,e);ea(e,e);ea(e,e);ea(e,e);ea(e,e);ea(e,e);ea(e,e);ea(e,e);ea(e,e);ea(e,e);ea(e,e);ea(e,e);ea(e,e);ea(e,e);ea(e,e);ea(e,e);ha(e,e,c);c=v[d+236>>2];v[d+192>>2]=v[d+232>>2];v[d+196>>2]=c;c=v[d+228>>2];v[d+184>>2]=v[d+224>>2];v[d+188>>2]=c;c=v[d+220>>2];v[d+176>>2]=v[d+216>>2];v[d+180>>2]=c;c=v[d+212>>2];v[d+168>>2]=v[d+208>>2];v[d+172>>2]=c;c=v[d+204>>2];v[d+160>>2]=v[d+200>>2];v[d+164>>2]=c;c=d+160|0;ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ha(c,c,e);c=v[d+196>>2];v[d+152>>2]=v[d+192>>2];v[d+156>>2]=c;c=v[d+188>>2];v[d+144>>2]=v[d+184>>2];v[d+148>>2]=c;c=v[d+180>>2];v[d+136>>2]=v[d+176>>2];v[d+140>>2]=c;c=v[d+172>>2];v[d+128>>2]=v[d+168>>2];v[d+132>>2]=c;c=v[d+164>>2];v[d+120>>2]=v[d+160>>2];v[d+124>>2]=c;c=0;while(1){e=d+120|0;ea(e,e);c=c+1|0;if((c|0)!=88){continue}break}c=d+120|0;ha(c,c,d+160|0);c=v[d+156>>2];v[d+112>>2]=v[d+152>>2];v[d+116>>2]=c;c=v[d+148>>2];v[d+104>>2]=v[d+144>>2];v[d+108>>2]=c;c=v[d+140>>2];v[d+96>>2]=v[d+136>>2];v[d+100>>2]=c;c=v[d+132>>2];v[d+88>>2]=v[d+128>>2];v[d+92>>2]=c;c=v[d+124>>2];v[d+80>>2]=v[d+120>>2];v[d+84>>2]=c;c=d+80|0;ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ea(c,c);ha(c,c,d+200|0);c=v[d+116>>2];v[d+72>>2]=v[d+112>>2];v[d+76>>2]=c;f=v[d+108>>2];e=d- -64|0;c=e;v[c>>2]=v[d+104>>2];v[c+4>>2]=f;c=v[d+100>>2];v[d+56>>2]=v[d+96>>2];v[d+60>>2]=c;c=v[d+92>>2];v[d+48>>2]=v[d+88>>2];v[d+52>>2]=c;c=v[d+84>>2];v[d+40>>2]=v[d+80>>2];v[d+44>>2]=c;c=d+40|0;ea(c,c);ea(c,c);ea(c,c);ha(c,c,d+400|0);c=v[d+76>>2];v[d+32>>2]=v[d+72>>2];v[d+36>>2]=c;c=v[e+4>>2];v[d+24>>2]=v[e>>2];v[d+28>>2]=c;c=v[d+60>>2];v[d+16>>2]=v[d+56>>2];v[d+20>>2]=c;c=v[d+52>>2];v[d+8>>2]=v[d+48>>2];v[d+12>>2]=c;c=v[d+44>>2];v[d>>2]=v[d+40>>2];v[d+4>>2]=c;ea(d,d);ea(d,d);ea(d,d);ea(d,d);ea(d,d);ea(d,d);ea(d,d);ea(d,d);ea(d,d);ea(d,d);ea(d,d);ea(d,d);ea(d,d);ea(d,d);ea(d,d);ea(d,d);ea(d,d);ea(d,d);ea(d,d);ea(d,d);ea(d,d);ea(d,d);ea(d,d);ha(d,d,d+240|0);ea(d,d);ea(d,d);ea(d,d);ea(d,d);ea(d,d);ha(d,d,b);ea(d,d);ea(d,d);ea(d,d);ha(d,d,d+440|0);ea(d,d);ea(d,d);ha(a,b,d);T=d+480|0}function ee(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;a:{if((b|0)!=32){break a}b=Ib(1088,1114304);m=T-16|0;T=m;v[m+12>>2]=b;n=m+12|0;l=Rb(n,192);c=l;d=v[273];v[c+184>>2]=v[272];v[c+188>>2]=d;Kc(c);h=c+8|0;Ab(h);j=T-221696|0;T=j;if(!v[h>>2]){q=h,r=Rb(n,65536),v[q>>2]=r;d=j+131456|0;Oa(d,3472);c=j+131584|0;Ka(c,3568);i=j+256|0;Jc(i,c,0);c=j+131328|0;Oa(c,i);Ha(c,c,3472,0);na(j+128|0,d,128);i=na(j,c,128);while(1){d=na((i+256|0)+(f<<11)|0,i,128);e=d+128|0;c=i+128|0;Ba(e,d,c);g=d+256|0;Ba(g,e,c);e=d+384|0;Ba(e,g,c);g=d+512|0;Ba(g,e,c);e=d+640|0;Ba(e,g,c);g=d+768|0;Ba(g,e,c);e=d+896|0;Ba(e,g,c);g=d+1024|0;Ba(g,e,c);e=d+1152|0;Ba(e,g,c);g=d+1280|0;Ba(g,e,c);e=d+1408|0;Ba(e,g,c);g=d+1536|0;Ba(g,e,c);e=d+1664|0;Ba(e,g,c);g=d+1792|0;Ba(g,e,c);Ba(d+1920|0,g,c);Ga(c,c,0);Ga(c,c,0);Ga(c,c,0);Ga(c,c,0);Ga(i,i,0);if((f|0)==62){sb(i,i);Ba(i,i,i+131328|0)}f=f+1|0;if((f|0)!=64){continue}break}k=i+131584|0;o=i+256|0;f=0;e=T-48|0;T=e;c=-1;while(1){d=(f<<7)+o|0;if(!v[d+120>>2]){g=k+B(f,88)|0;b:{if((c|0)==-1){c=v[d+84>>2];v[g>>2]=v[d+80>>2];v[g+4>>2]=c;c=v[d+116>>2];v[g+32>>2]=v[d+112>>2];v[g+36>>2]=c;c=v[d+108>>2];v[g+24>>2]=v[d+104>>2];v[g+28>>2]=c;c=v[d+100>>2];v[g+16>>2]=v[d+96>>2];v[g+20>>2]=c;c=v[d+92>>2];v[g+8>>2]=v[d+88>>2];v[g+12>>2]=c;break b}ha(g,k+B(c,88)|0,d+80|0)}c=f}f=f+1|0;if((f|0)!=1024){continue}break}if((c|0)!=-1){Gc(e+8|0,k+B(c,88)|0);f=0;d=0;if(c){d=c;while(1){c=c-1|0;if(!v[((c<<7)+o|0)+120>>2]){g=e+8|0;ha(k+B(d,88)|0,k+B(c,88)|0,g);ha(g,g,((d<<7)+o|0)+80|0);d=c}if(c){continue}break}}c=k+B(d,88)|0;d=v[e+12>>2];v[c>>2]=v[e+8>>2];v[c+4>>2]=d;d=v[e+44>>2];v[c+32>>2]=v[e+40>>2];v[c+36>>2]=d;d=v[e+36>>2];v[c+24>>2]=v[e+32>>2];v[c+28>>2]=d;d=v[e+28>>2];v[c+16>>2]=v[e+24>>2];v[c+20>>2]=d;d=v[e+20>>2];v[c+8>>2]=v[e+16>>2];v[c+12>>2]=d;while(1){c=k+B(f,88)|0;d=(f<<7)+o|0;g=v[d+120>>2];v[c+80>>2]=g;if(!g){rb(c,d,c)}f=f+1|0;if((f|0)!=1024){continue}break}}T=e+48|0;e=0;while(1){c=e<<10;d=i+131584|0;xa(c+v[h>>2]|0,d+B(e,1408)|0);f=e<<4;xa((c+v[h>>2]|0)- -64|0,d+B(f|1,88)|0);xa((c+v[h>>2]|0)+128|0,d+B(f|2,88)|0);xa((c+v[h>>2]|0)+192|0,d+B(f|3,88)|0);xa((c+v[h>>2]|0)+256|0,d+B(f|4,88)|0);xa((c+v[h>>2]|0)+320|0,d+B(f|5,88)|0);xa((c+v[h>>2]|0)+384|0,d+B(f|6,88)|0);xa((c+v[h>>2]|0)+448|0,d+B(f|7,88)|0);xa((c+v[h>>2]|0)+512|0,d+B(f|8,88)|0);xa((c+v[h>>2]|0)+576|0,d+B(f|9,88)|0);xa((c+v[h>>2]|0)+640|0,d+B(f|10,88)|0);xa((c+v[h>>2]|0)+704|0,d+B(f|11,88)|0);xa((c+v[h>>2]|0)+768|0,d+B(f|12,88)|0);xa((c+v[h>>2]|0)+832|0,d+B(f|13,88)|0);xa((c+v[h>>2]|0)+896|0,d+B(f|14,88)|0);xa((c+v[h>>2]|0)+960|0,d+B(f|15,88)|0);e=e+1|0;if((e|0)!=64){continue}break}Ic(h,0)}T=j+221696|0;c=T-256|0;T=c;if(!v[l>>2]){d=c+128|0;Oa(d,3472);f=Rb(n,524288);v[l>>2]=f;Hc(f,d);h=Rb(n,524288);v[l+4>>2]=h;d=na(c,d,128);f=0;while(1){Ga(d,d,0);f=f+1|0;if((f|0)!=128){continue}break}Hc(h,d)}T=c+256|0;T=m+16|0;if(!l){Sa(b);b=0}v[1325]=b;if(!b){break a}c:{if(!Qa(v[b+8>>2])){ia(v[b+176>>2],v[b+180>>2],2066);a=0;break c}Ic(b+8|0,a);a=1}if(!a){break a}a=Qc(v[1325],30720);v[1326]=a;if(!a){break a}a=0;d=T-256|0;T=d;d:{e:{h=v[1325];c=h+184|0;b=Ib(c,12);f:{if(!b){break f}i=Ib(c,22616);v[b+4>>2]=i;if(!i){Sa(b);break f}v[b>>2]=256;j=i+22528|0;v[b+8>>2]=j;a=d+112|0;La(a,3472);La(d+144|0,3512);Pb(d+184|0,a,64);a=0;while(1){v[d+104>>2]=0;v[d+108>>2]=0;v[d+96>>2]=0;v[d+100>>2]=0;v[d+88>>2]=0;v[d+92>>2]=0;v[d+80>>2]=0;v[d+84>>2]=0;f=d+80|0;Ob(d+184|0,f);g=d+16|0;g:{if(!g){ia(v[h+176>>2],v[h+180>>2],1631);c=0;break g}if(!f){ia(v[h+176>>2],v[h+180>>2],1914);c=0;break g}c=T-432|0;T=c;v[c+424>>2]=0;v[c+428>>2]=0;v[c+416>>2]=0;v[c+420>>2]=0;v[c+408>>2]=0;v[c+412>>2]=0;v[c+400>>2]=0;v[c+404>>2]=0;v[c+392>>2]=4;v[c+396>>2]=0;e=c+72|0;Aa(e);ma(e,3952,16);ma(e,f,32);l=e;e=c+32|0;za(l,e);h:{i:{if(Ka(c+392|0,e)&1){e=c+304|0;k=c+392|0;ld(e,k);Oa(c+176|0,e);e=c+72|0;Aa(e);ma(e,3984,16);ma(e,f,32);f=c+32|0;za(e,f);if(!(Ka(k,f)&1)){break i}f=c+304|0;ld(f,c+392|0);e=c+176|0;Ja(e,e,f);sa(f,e);Ra(f);e=f+40|0;Ra(e);La(g,f);La(g+32|0,e);T=c+432|0;break h}v[c+8>>2]=1120;v[c+4>>2]=209;v[c>>2]=1234;xb(3327,c);O();L()}v[c+24>>2]=1120;v[c+20>>2]=222;v[c+16>>2]=1234;xb(3327,c+16|0);O();L()}c=1}if(!c){break e}lb(i+B(a,88)|0,d+16|0);a=a+1|0;if((a|0)!=256){continue}break}lb(j,3338);a=b}T=d+256|0;break d}v[d+8>>2]=2156;v[d+4>>2]=60;v[d>>2]=1195;xb(3327,d);O();L()}v[1327]=a;p=(a|0)!=0}return p|0}function Pa(a,b,c,d){var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,U=0,V=0;e=T-2432|0;T=e;f=v[c+28>>2];v[e+536>>2]=v[c+24>>2];v[e+540>>2]=f;f=v[c+20>>2];v[e+528>>2]=v[c+16>>2];v[e+532>>2]=f;f=v[c+12>>2];v[e+520>>2]=v[c+8>>2];v[e+524>>2]=f;f=v[c+4>>2];v[e+512>>2]=v[c>>2];v[e+516>>2]=f;a:{if((d|0)>=129){zc(e+720|0,e+688|0,e+512|0);c=v[e+748>>2];f=e- -64|0;v[f>>2]=v[e+744>>2];v[f+4>>2]=c;c=v[e+740>>2];v[e+56>>2]=v[e+736>>2];v[e+60>>2]=c;c=v[e+732>>2];v[e+48>>2]=v[e+728>>2];v[e+52>>2]=c;c=v[e+724>>2];v[e+40>>2]=v[e+720>>2];v[e+44>>2]=c;r=xc(e+544|0,e+40|0,128);c=v[e+716>>2];v[e+32>>2]=v[e+712>>2];v[e+36>>2]=c;c=v[e+708>>2];v[e+24>>2]=v[e+704>>2];v[e+28>>2]=c;c=v[e+700>>2];v[e+16>>2]=v[e+696>>2];v[e+20>>2]=c;c=v[e+692>>2];v[e+8>>2]=v[e+688>>2];v[e+12>>2]=c;B=xc(e+752|0,e+8|0,128);c=32;break a}f=v[c+28>>2];v[e+96>>2]=v[c+24>>2];v[e+100>>2]=f;f=v[c+20>>2];v[e+88>>2]=v[c+16>>2];v[e+92>>2]=f;f=v[c+12>>2];v[e+80>>2]=v[c+8>>2];v[e+84>>2]=f;f=v[c+4>>2];v[e+72>>2]=v[c>>2];v[e+76>>2]=f;r=xc(e+544|0,e+72|0,d);c=(d+3|0)/4|0}Oa(a,b);g=T-1344|0;T=g;f=g+320|0;yc(f,g,a);td(8,e+1728|0,e+1600|0,f,g);T=g+1344|0;s=e+1768|0;Ca(s);t=e+1856|0;Ca(t);u=e+1944|0;Ca(u);w=e+2032|0;Ca(w);x=e+2120|0;Ca(x);y=e+2208|0;Ca(y);z=e+2296|0;Ca(z);A=e+2384|0;Ca(A);k=(d|0)<129;if(!k){Da(e+896|0,e+1728|0);Da(e+984|0,e+1816|0);Da(e+1072|0,e+1904|0);Da(e+1160|0,e+1992|0);Da(e+1248|0,e+2080|0);Da(e+1336|0,e+2168|0);Da(e+1424|0,e+2256|0);Da(e+1512|0,e+2344|0)}g=c<<2;j=v[g+(e+544|0)>>2];f=j>>31;m=e+1640|0;l=(f^j)-f|0;f=l>>>0<2;ka(m,e+1728|0,f);h=e+1680|0;ka(h,s,f);C=e+1816|0;o=l>>>1|0;f=(o|0)==1;ka(m,C,f);ka(h,t,f);D=e+1904|0;f=(o|0)==2;ka(m,D,f);ka(h,u,f);E=e+1992|0;f=(o|0)==3;ka(m,E,f);ka(h,w,f);F=e+2080|0;f=(o|0)==4;ka(m,F,f);ka(h,x,f);G=e+2168|0;f=(o|0)==5;ka(m,G,f);ka(h,y,f);H=e+2256|0;f=(o|0)==6;ka(m,H,f);ka(h,z,f);I=e+2344|0;f=(o|0)==7;ka(m,I,f);ka(h,A,f);v[e+1720>>2]=0;f=e+104|0;ra(f,h,1);ka(h,f,(j|0)!=(l|0));Oa(a,m);if(!k){k=v[g+(e+752|0)>>2];f=k>>31;j=e+1640|0;g=(f^k)-f|0;f=g>>>0<2;ka(j,e+896|0,f);ka(h,e+936|0,f);l=g>>>1|0;f=(l|0)==1;ka(j,e+984|0,f);ka(h,e+1024|0,f);f=(l|0)==2;ka(j,e+1072|0,f);ka(h,e+1112|0,f);f=(l|0)==3;ka(j,e+1160|0,f);ka(h,e+1200|0,f);f=(l|0)==4;ka(j,e+1248|0,f);ka(h,e+1288|0,f);f=(l|0)==5;ka(j,e+1336|0,f);ka(h,e+1376|0,f);f=(l|0)==6;ka(j,e+1424|0,f);ka(h,e+1464|0,f);f=(l|0)==7;ka(j,e+1512|0,f);ka(h,e+1552|0,f);v[e+1720>>2]=0;f=e+104|0;ra(f,h,1);ka(h,f,(g|0)!=(k|0));Ja(a,a,j)}J=e+1552|0;K=e+1512|0;L=e+1464|0;M=e+1424|0;N=e+1376|0;O=e+1336|0;P=e+1288|0;Q=e+1248|0;R=e+1200|0;S=e+1160|0;U=e+1112|0;V=e+1072|0;m=e+1024|0;o=e+984|0;j=e+936|0;l=(d|0)<129;while(1){ec(a,a);ec(a,a);ec(a,a);ec(a,a);f=c-1|0;k=f<<2;n=v[k+(e+544|0)>>2];g=n>>31;p=e+1640|0;q=(g^n)-g|0;g=q>>>0<2;ka(p,e+1728|0,g);ka(h,s,g);i=q>>>1|0;g=(i|0)==1;ka(p,C,g);ka(h,t,g);g=(i|0)==2;ka(p,D,g);ka(h,u,g);g=(i|0)==3;ka(p,E,g);ka(h,w,g);g=(i|0)==4;ka(p,F,g);ka(h,x,g);g=(i|0)==5;ka(p,G,g);ka(h,y,g);g=(i|0)==6;ka(p,H,g);ka(h,z,g);g=(i|0)==7;ka(p,I,g);ka(h,A,g);v[e+1720>>2]=0;g=e+104|0;ra(g,h,1);ka(h,g,(n|0)!=(q|0));Ja(a,a,p);if(!l){q=v[k+(e+752|0)>>2];g=q>>31;i=e+1640|0;k=(g^q)-g|0;g=k>>>0<2;ka(i,e+896|0,g);ka(h,j,g);n=k>>>1|0;g=(n|0)==1;ka(i,o,g);ka(h,m,g);g=(n|0)==2;ka(i,V,g);ka(h,U,g);g=(n|0)==3;ka(i,S,g);ka(h,R,g);g=(n|0)==4;ka(i,Q,g);ka(h,P,g);g=(n|0)==5;ka(i,O,g);ka(h,N,g);g=(n|0)==6;ka(i,M,g);ka(h,L,g);g=(n|0)==7;ka(i,K,g);ka(h,J,g);v[e+1720>>2]=0;g=e+104|0;ra(g,h,1);ka(h,g,(k|0)!=(q|0));Ja(a,a,i)}g=c>>>0>1;c=f;if(g){continue}break}c=a+80|0;ha(c,c,e+1600|0);c=e+424|0;na(c,b,88);f=e+104|0;Oa(f,c);Ga(f,f,0);sa(c,f);xa(e+360|0,b);b:{if((d|0)>=129){c=e+296|0;xa(c,b);b=e+232|0;xa(b,e+424|0);Fa(e+360|0,b,(r|0)==2);break b}xa(e+232|0,e+424|0);B=r;c=e+360|0}Fa(c,e+232|0,(B|0)==2);b=e+424|0;ab(b,e+360|0);Ia(b,b);Ja(a,a,b);if((d|0)>=129){b=e+424|0;ab(b,e+296|0);Ia(b,b);Da(b,b);Ja(a,a,b)}T=e+2432|0}function Td(a,b,c,d,e,f,g,h,i){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;var j=0,k=0,l=0,m=0;l=T-96|0;T=l;k=0;a:{if((g|0)!=33|(i|0)!=32){break a}k=0;if(!hb(v[1325],l+32|0,f)){break a}f=v[1325];k=l+32|0;i=T-32|0;T=i;b:{if((l|0)==-24){ia(v[f+176>>2],v[f+180>>2],1755);c=0;break b}if(!b){ia(v[f+176>>2],v[f+180>>2],1821);c=0;break b}if(!d){ia(v[f+176>>2],v[f+180>>2],1741);c=0;break b}if(!k){ia(v[f+176>>2],v[f+180>>2],1500);c=0;break b}if(!h){ia(v[f+176>>2],v[f+180>>2],1807);c=0;break b}g=T-592|0;T=g;v[g+472>>2]=0;v[g+476>>2]=0;v[g+464>>2]=0;v[g+468>>2]=0;v[g+456>>2]=0;v[g+460>>2]=0;v[g+448>>2]=0;v[g+452>>2]=0;c:{if(e-1320>>>0<4294966169){break c}la(g+408|0,d,g+4|0);if(v[g+4>>2]){break c}if(pa(g+408|0)){break c}la(g+376|0,d+32|0,g+4|0);if(v[g+4>>2]){break c}if(pa(g+376|0)){break c}vb(g+344|0,g+312|0,h,0);vb(g+280|0,g+248|0,h,1);e=g+96|0;mb(e,k);h=g+8|0;lb(h,3402);f=g+448|0;_a(f,e,h);e=w[d+64|0];t[g+447|0]=e<<1&2|(e&2)>>>1;e=g+488|0;Aa(e);ma(e,f,32);h=g+447|0;ma(e,h,1);k=d+65|0;ma(e,k,64);za(e,f);Aa(e);ma(e,f,32);ma(e,h,1);ma(e,k,64);za(e,f);la(g+184|0,f,g+4|0);if(v[g+4>>2]){break c}if(pa(g+184|0)){break c}e=w[d+64|0];t[g+447|0]=e>>>1&2|e>>>3&1;e=g+488|0;Aa(e);f=g+448|0;ma(e,f,32);ma(e,g+447|0,1);ma(e,d+129|0,64);za(e,f);la(g+216|0,f,g+4|0);if(v[g+4>>2]){break c}if(pa(g+216|0)){break c}e=g+312|0;ga(e,e,g+216|0);d=g+376|0;oa(d,d,e);oa(d,d,g+344|0);ua(g+448|0,d);if(v[g+448>>2]){break c}f=w[g+478|0];e=f>>>24|0;h=w[g+479|0]|f<<8;f=e;d=h;h=w[g+477|0];e=h>>>16|0;h=d|h<<16;j=e|f;f=w[g+476|0];e=f>>>8|0;f=f<<24|h;e=(w[g+475|0]|(e|j)|w[g+474|0]<<8)+(w[g+473|0]<<16)|0;j=0;f=j+f|0;e=(w[g+472|0]<<24)+(f>>>0<j>>>0?e+1|0:e)|0;d=l;h=0+f|0;v[d+24>>2]=h;v[d+28>>2]=h>>>0<j>>>0?e+1|0:e;if(c){d=v[g+456>>2];e=v[g+452>>2];t[c|0]=e;t[c+1|0]=e>>>8;t[c+2|0]=e>>>16;t[c+3|0]=e>>>24;t[c+4|0]=d;t[c+5|0]=d>>>8;t[c+6|0]=d>>>16;t[c+7|0]=d>>>24;d=v[g+464>>2];e=v[g+460>>2];t[c+8|0]=e;t[c+9|0]=e>>>8;t[c+10|0]=e>>>16;t[c+11|0]=e>>>24;t[c+12|0]=d;t[c+13|0]=d>>>8;t[c+14|0]=d>>>16;t[c+15|0]=d>>>24;d=v[g+468>>2];t[c+16|0]=d;t[c+17|0]=d>>>8;t[c+18|0]=d>>>16;t[c+19|0]=d>>>24}e=g+280|0;d=g+216|0;ga(e,e,d);c=g+248|0;ga(c,c,d);ga(c,c,d);d=g+408|0;oa(d,d,e);oa(d,d,c);c=g+184|0;fa(c,c);nb(c,c);ga(i,d,c);va(i,i);j=1}T=g+592|0;c=j;if(!c){break b}ua(b,i);c=1}T=i+32|0;if(c){b=v[l+24>>2];f=v[l+28>>2];d=T-48|0;T=d;e=d+37|0;g=d+16|0;i=e-g|0;d:{if((i|0)<=19){h=i;i=E(f);i=B(64-((i|0)==32?E(b|1)+32|0:i)|0,1233)>>12;j=(i<<3)+4992|0;k=v[j>>2];j=v[j+4>>2];m=61;if((h|0)<(i+((f|0)==(j|0)&b>>>0>=k>>>0|f>>>0>j>>>0)|0)){break d}}e:{if(!f&b>>>0<=99999999){e=sc(g,b);break e}if((f|0)==2328306&b>>>0<=1874919423|f>>>0<2328306){e=Ge(b,f,1e8,0);h=U;f=sc(g,e);e=Fe(e,h,-1e8,0)+b|0;b=e;e=(e>>>0)/1e4|0;e=Za(Za(f,e),b+B(e,-1e4)|0);break e}e=Ge(b,f,1874919424,2328306);h=U;j=rc(g,e);h=Fe(e,h,-1874919424,-2328307)+b|0;e=f+U|0;e=b>>>0>h>>>0?e+1|0:e;b=h;f=Ge(b,e,1e8,0);h=U;i=(f>>>0)/1e4|0;i=Za(Za(j,i),f+B(i,-1e4)|0);f=Fe(f,h,-1e8,0)+b|0;e=(f>>>0)/1e4|0;e=Za(Za(i,e),f+B(e,-1e4)|0)}m=0}v[d+12>>2]=m;v[d+8>>2]=e;b=l+8|0;Tc(b,g,v[d+8>>2]);T=d+48|0;na(a,Sb(b),Xb(v[l+12>>2],w[l+19|0])+1|0);Wb(b)}k=(c|0)!=0}T=l+96|0;return k|0}function ye(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,w=0,x=0,y=0,z=0,A=0,C=0,D=0,E=0,F=0,G=0;Ta(c);a=1;if(g?1:d){a=1;a:{if(g>>>0<2){break a}a=2;if(g>>>0<5){break a}a=3;if(g>>>0<21){break a}a=4;if(g>>>0<58){break a}a=5;if(g>>>0<137){break a}a=6;if(g>>>0<236){break a}a=7;if(g>>>0<1261){break a}a=9;if(g>>>0<4421){break a}a=10;if(g>>>0<7881){break a}a=g>>>0<16051?11:12}m=a;if(!kb(b,(B(((m+128|0)/(m+1|0)<<2)+132|0,(g<<1)+2|0)+(128<<m)|0)+8|0,6)){return 0}a=(g<<1)+2|0;s=wa(b,B(a,88));k=wa(b,a<<5);r=wa(b,8);F=r,G=wa(b,a<<3),v[F+4>>2]=G;z=(((m|128)&255)>>>0)/((m+1&255)>>>0)|0;F=r,G=wa(b,B(a,z)<<2),v[F>>2]=G;a=0;o=wa(b,128<<m);if(d){i=v[d+4>>2];v[k>>2]=v[d>>2];v[k+4>>2]=i;i=v[d+28>>2];v[k+24>>2]=v[d+24>>2];v[k+28>>2]=i;i=v[d+20>>2];v[k+16>>2]=v[d+16>>2];v[k+20>>2]=i;i=v[d+12>>2];v[k+8>>2]=v[d+8>>2];v[k+12>>2]=i;d=na(s,3472,88);fd(k,k+32|0,d,d+88|0);p=2}b:{if(g){while(1){d=(p<<5)+k|0;i=B(p,88)+s|0;if(!(V[e|0](d,i,a+h|0,f)|0)){a=0;break b}n=d;d=p|1;fd(n,(d<<5)+k|0,i,B(d,88)+s|0);p=p+2|0;a=a+1|0;if((g|0)!=(a|0)){continue}break}}n=o;i=r;a=0;l=T-128|0;T=l;j=m+1|0;w=(m+128|0)/(j|0)|0;c:{if(!p){Ta(c);break c}while(1){t=(a<<5)+k|0;if(!(pa(t)|v[(B(a,88)+s|0)+80>>2])){A=u<<3;v[(A+v[i+4>>2]|0)+4>>2]=a;q=v[i>>2]+(B(u,w)<<2)|0;d:{if(pa(t)){Xa(q,0,(j+127|0)/(j|0)<<2);e=0;break d}e=(nd(v[t>>2])|0)!=0;F=q,G=e+Fb(t,0,j)|0,v[F>>2]=G;r=((j+127|0)/(j|0)|0)-1|0;C=128-B(r,j)|0;f=r;e:{while(1){if(!Fb(t,B(f,j),(f|0)==(r|0)?C:j)){v[(f<<2)+q>>2]=0;d=(f|0)>1;f=f-1|0;if(d){continue}break e}break}x=-1<<j;h=Fb(t,j,j);if(!(h&1)){v[q>>2]=v[q>>2]+x;h=h+1|0}v[q+4>>2]=h;if((f|0)==1){break e}E=1<<j;d=2;while(1){o=d;D=d-1|0;y=(d<<2)+q|0;g=Fb(t,B(d,j),(d|0)==(r|0)?C:j);f:{if(g&1){d=h;break f}d=h+x|0;v[(D<<2)+q>>2]=d;g=g+1|0}h=g;v[y>>2]=h;g:{h:{i:{switch(d+1|0){case 2:g=y-8|0;d=v[g>>2];if((d|0)>=0){break g}v[g>>2]=d+E;break h;case 0:break i;default:break g}}g=y-8|0;d=v[g>>2];if((d|0)<=0){break g}v[g>>2]=d+x}v[(D<<2)+q>>2]=0}d=o+1|0;if((f|0)!=(o|0)){continue}break}}}v[v[i+4>>2]+A>>2]=e;u=u+1|0}a=a+1|0;if((p|0)!=(a|0)){continue}break}Ta(c);if(!u){break c}e=1<<m;g=(e|0)>1?e:1;h=w-1|0;while(1){a=0;while(1){Ta(n+(a<<7)|0);a=a+1|0;if((g|0)!=(a|0)){continue}break}a=0;while(1){d=v[i+4>>2]+(a<<3)|0;f=v[d+4>>2];o=v[v[i>>2]+(B(a,w)+h<<2)>>2];if(!(!v[d>>2]|h)){Ia(l,B(f,88)+s|0);Ha(n,n,l,0)}j:{if((o|0)>0){d=n+((o<<6)+-64&-128)|0;Ha(d,d,B(f,88)+s|0,0);break j}if((o|0)>=0){break j}Ia(l,B(f,88)+s|0);d=n+((o^-1)<<6&-128)|0;Ha(d,d,l,0)}a=a+1|0;if((u|0)!=(a|0)){continue}break}a=0;while(1){Ga(c,c,0);a=a+1|0;if((m|0)!=(a|0)){continue}break}Ta(l);a=e;while(1){d=a-1|0;Ba(l,l,n+(d<<7)|0);Ba(c,c,l);f=a>>>0>2;a=d;if(f){continue}break}Ba(l,l,n);Ga(c,c,0);Ba(c,c,l);h=h-1|0;if((h|0)>=0){continue}break}}T=l+128|0;k:{if(!p){c=0;break k}d=z<<2;c=0;a=0;while(1){ta((a<<5)+k|0);v[v[i+4>>2]+(a<<3)>>2]=0;Xa(v[i>>2]+B(a,d)|0,0,d);a=a+1|0;if((p|0)!=(a|0)){continue}break}}while(1){Dc(n+(c<<7)|0);a=1;c=c+1|0;if(!(c>>>m|0)){continue}break}}Na(b)}return a|0}function ze(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;f=T+-64|0;T=f;i=v[d+52>>2];l=i<<1;a:{b:{if(l>>>0>c>>>0){j=i>>>0<2?i:2;l=Eb(j);if(c>>>0<i>>>0){i=v[d+44>>2]+B(c,88)|0}else{i=v[d+48>>2]+B(c-i|0,88)|0}na(b,i,88);ta(a);if(!v[d>>2]){break b}q=c^-1;r=c-1|0;n=He(c);i=n-1|0;m=n<<5;while(1){c:{if(!n){break c}e=v[d+52>>2];g=(e>>>0)/(j>>>0)|0;b=(c>>>0)/(g>>>0)|0;if((B(b,g)|0)==(c|0)){p=b-1|0;b=i;d:{if((c|0)!=(e|0)){break d}g=B(k,4272);b=v[g+v[d+68>>2]>>2];e=b- -64|0;h=v[e+4>>2];v[f+24>>2]=v[e>>2];v[f+28>>2]=h;e=v[b+60>>2];v[f+16>>2]=v[b+56>>2];v[f+20>>2]=e;e=v[b+52>>2];v[f+8>>2]=v[b+48>>2];v[f+12>>2]=e;e=v[b+44>>2];v[f>>2]=v[b+40>>2];v[f+4>>2]=e;b=He(r);e=Ee(c);if((e|0)!=(l|0)){h=e-l|0;e=0;while(1){o=(g+v[d+68>>2]|0)+(e<<5)|0;ga(o+2184|0,o+1160|0,f);fa(f,f);e=e+1|0;if((h|0)!=(e|0)){continue}break}}if((l|0)!=1){break d}e=(g+v[d+68>>2]|0)+72|0;ga(e,e,f);fa(f,f)}e=v[d+68>>2]+B(k,4272)|0;g=e+3208|0;ga(g+m|0,g+(b<<5)|0,(e+(p<<5)|0)+8|0);break c}b=Ee(c);g=v[d+68>>2]+B(k,4272)|0;h=g+3208|0;p=h+(i<<5)|0;h=h+m|0;if(c>>>0<e>>>0){ga(h,p,(g+(b<<5)|0)+136|0);break c}ga(h,p,(g+(b<<5)|0)+2184|0)}b=v[d+68>>2];p=B(k,4272);g=b+p|0;e=g+m|0;h=e+3232|0;o=v[h+4>>2];v[f+56>>2]=v[h>>2];v[f+60>>2]=o;h=e+3224|0;o=v[h+4>>2];v[f+48>>2]=v[h>>2];v[f+52>>2]=o;h=e+3216|0;o=v[h+4>>2];v[f+40>>2]=v[h>>2];v[f+44>>2]=o;e=e+3208|0;h=v[e+4>>2];v[f+32>>2]=v[e>>2];v[f+36>>2]=h;e:{if(!((n|0)!=(v[d+56>>2]-1|0)|y[d+52>>2]/(j>>>0)>>>0<=c>>>0)){ga((g+(Ee(q)<<5)|0)+1160|0,e,g+4232|0);b=v[d+68>>2]}b=v[b+p>>2];e=v[b+104>>2];if(e){if((V[e|0](f,0,v[d+64>>2]+(k<<5)|0,c,v[b+108>>2])|0)!=1){break e}b=f+32|0;oa(b,b,f)}oa(a,a,f+32|0);k=k+1|0;if(k>>>0<y[d>>2]){continue}break b}break}e=0;break a}n=v[d+56>>2];j=i+B(n,v[d>>2])|0;e=j<<1;if(e>>>0>c>>>0){g=b;e=c-l|0;b=n<<1;i=(e>>>0)/(b>>>0)|0;k=B(i,4272);e=e-B(b,i)|0;if(!Db(g,v[(k+v[d+68>>2]|0)+4264>>2],e,b)){e=0;break a}b=((k+v[d+68>>2]|0)+(c&1?1160:136)|0)+(e<<4&-32)|0;c=v[b+4>>2];v[a>>2]=v[b>>2];v[a+4>>2]=c;c=v[b+28>>2];v[a+24>>2]=v[b+24>>2];v[a+28>>2]=c;c=v[b+20>>2];v[a+16>>2]=v[b+16>>2];v[a+20>>2]=c;c=v[b+12>>2];v[a+8>>2]=v[b+8>>2];v[a+12>>2]=c;ga(a,a,v[d+64>>2]+(i<<5)|0);break b}if((c|0)==(e|0)){c=v[d+12>>2];v[a>>2]=v[d+8>>2];v[a+4>>2]=c;c=v[d+36>>2];v[a+24>>2]=v[d+32>>2];v[a+28>>2]=c;c=v[d+28>>2];v[a+16>>2]=v[d+24>>2];v[a+20>>2]=c;c=v[d+20>>2];v[a+8>>2]=v[d+16>>2];v[a+12>>2]=c;na(b,v[d+40>>2],88);break b}m=v[d+60>>2];if(!(!m|(e|1)!=(c|0))){ta(a);if(!v[d>>2]){break b}e=0;while(1){c=v[v[d+68>>2]+B(e,4272)>>2];if((V[v[c+104>>2]](f+32|0,b,v[d+64>>2]+(e<<5)|0,v[d+56>>2]+v[d+52>>2]<<1,v[c+108>>2])|0)==1){oa(a,a,f+32|0);e=e+1|0;if(e>>>0<y[d>>2]){continue}break b}break}e=0;break a}e=0;c=(j<<1^-1)+c|0;j=(m|0)!=0;c=c-j|0;g=v[d+68>>2];l=v[g>>2];j=v[l+112>>2]-j|0;if(c>>>0>=j>>>0){m=m?-1:0;while(1){c=c-j|0;k=k+1|0;l=v[g+B(k,4272)>>2];j=m+v[l+112>>2]|0;if(c>>>0>=j>>>0){continue}break}}if((V[v[l+104>>2]](a,b,v[d+64>>2]+(k<<5)|0,i+n<<1,v[l+108>>2])|0)!=1){break a}}e=1}T=f- -64|0;return e|0}function Sa(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0;a:{if(!a){break a}d=a-8|0;b=v[a-4>>2];a=b&-8;f=d+a|0;b:{if(b&1){break b}if(!(b&3)){break a}b=v[d>>2];d=d-b|0;if(d>>>0<y[1335]){break a}a=a+b|0;if(v[1336]!=(d|0)){if(b>>>0<=255){e=v[d+8>>2];b=b>>>3|0;c=v[d+12>>2];if((c|0)==(e|0)){i=5324,j=v[1331]&Ie(-2,b),v[i>>2]=j;break b}v[e+12>>2]=c;v[c+8>>2]=e;break b}h=v[d+24>>2];b=v[d+12>>2];c:{if((d|0)!=(b|0)){c=v[d+8>>2];v[c+12>>2]=b;v[b+8>>2]=c;break c}d:{e=d+20|0;c=v[e>>2];if(c){break d}e=d+16|0;c=v[e>>2];if(c){break d}b=0;break c}while(1){g=e;b=c;e=b+20|0;c=v[e>>2];if(c){continue}e=b+16|0;c=v[b+16>>2];if(c){continue}break}v[g>>2]=0}if(!h){break b}e=v[d+28>>2];c=(e<<2)+5628|0;e:{if(v[c>>2]==(d|0)){v[c>>2]=b;if(b){break e}i=5328,j=v[1332]&Ie(-2,e),v[i>>2]=j;break b}v[h+(v[h+16>>2]==(d|0)?16:20)>>2]=b;if(!b){break b}}v[b+24>>2]=h;c=v[d+16>>2];if(c){v[b+16>>2]=c;v[c+24>>2]=b}c=v[d+20>>2];if(!c){break b}v[b+20>>2]=c;v[c+24>>2]=b;break b}b=v[f+4>>2];if((b&3)!=3){break b}v[1333]=a;v[f+4>>2]=b&-2;v[d+4>>2]=a|1;v[a+d>>2]=a;return}if(d>>>0>=f>>>0){break a}b=v[f+4>>2];if(!(b&1)){break a}f:{if(!(b&2)){if(v[1337]==(f|0)){v[1337]=d;a=v[1334]+a|0;v[1334]=a;v[d+4>>2]=a|1;if(v[1336]!=(d|0)){break a}v[1333]=0;v[1336]=0;return}if(v[1336]==(f|0)){v[1336]=d;a=v[1333]+a|0;v[1333]=a;v[d+4>>2]=a|1;v[a+d>>2]=a;return}a=(b&-8)+a|0;g:{if(b>>>0<=255){e=v[f+8>>2];b=b>>>3|0;c=v[f+12>>2];if((c|0)==(e|0)){i=5324,j=v[1331]&Ie(-2,b),v[i>>2]=j;break g}v[e+12>>2]=c;v[c+8>>2]=e;break g}h=v[f+24>>2];b=v[f+12>>2];h:{if((f|0)!=(b|0)){c=v[f+8>>2];v[c+12>>2]=b;v[b+8>>2]=c;break h}i:{e=f+20|0;c=v[e>>2];if(c){break i}e=f+16|0;c=v[e>>2];if(c){break i}b=0;break h}while(1){g=e;b=c;e=b+20|0;c=v[e>>2];if(c){continue}e=b+16|0;c=v[b+16>>2];if(c){continue}break}v[g>>2]=0}if(!h){break g}e=v[f+28>>2];c=(e<<2)+5628|0;j:{if(v[c>>2]==(f|0)){v[c>>2]=b;if(b){break j}i=5328,j=v[1332]&Ie(-2,e),v[i>>2]=j;break g}v[h+(v[h+16>>2]==(f|0)?16:20)>>2]=b;if(!b){break g}}v[b+24>>2]=h;c=v[f+16>>2];if(c){v[b+16>>2]=c;v[c+24>>2]=b}c=v[f+20>>2];if(!c){break g}v[b+20>>2]=c;v[c+24>>2]=b}v[d+4>>2]=a|1;v[a+d>>2]=a;if(v[1336]!=(d|0)){break f}v[1333]=a;return}v[f+4>>2]=b&-2;v[d+4>>2]=a|1;v[a+d>>2]=a}if(a>>>0<=255){b=(a&-8)+5364|0;c=v[1331];a=1<<(a>>>3);k:{if(!(c&a)){v[1331]=a|c;a=b;break k}a=v[b+8>>2]}v[b+8>>2]=d;v[a+12>>2]=d;v[d+12>>2]=b;v[d+8>>2]=a;return}e=31;if(a>>>0<=16777215){b=a>>>8|0;g=b+1048320>>>16&8;b=b<<g;e=b+520192>>>16&4;b=b<<e;c=b+245760>>>16&2;b=(b<<c>>>15|0)-(c|(e|g))|0;e=(b<<1|a>>>b+21&1)+28|0}v[d+28>>2]=e;v[d+16>>2]=0;v[d+20>>2]=0;g=(e<<2)+5628|0;l:{m:{c=v[1332];b=1<<e;n:{if(!(c&b)){v[1332]=b|c;v[g>>2]=d;v[d+24>>2]=g;break n}e=a<<((e|0)==31?0:25-(e>>>1|0)|0);b=v[g>>2];while(1){c=b;if((v[b+4>>2]&-8)==(a|0)){break m}b=e>>>29|0;e=e<<1;g=c+(b&4)|0;b=v[g+16>>2];if(b){continue}break}v[g+16>>2]=d;v[d+24>>2]=c}v[d+12>>2]=d;v[d+8>>2]=d;break l}a=v[c+8>>2];v[a+12>>2]=d;v[c+8>>2]=d;v[d+24>>2]=0;v[d+12>>2]=c;v[d+8>>2]=a}a=v[1339]-1|0;v[1339]=a?a:-1}}function ud(a,b,c,d,e,f,g){var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;j=T-1248|0;T=j;a:{b:{if((d|0)<=0){break b}while(1){n=(i<<5)+f|0;if(!(pa(n)|v[((i<<7)+e|0)+120>>2])){h=B(m,1120);k=h+v[b+16>>2]|0;v[k+1112>>2]=i;zc(k,k+32|0,n);k=h+v[b+16>>2]|0;n=gc(k- -64|0,130,k,5);k=h+v[b+16>>2]|0;v[k+1104>>2]=n;k=gc(k+584|0,130,k+32|0,5);h=h+v[b+16>>2]|0;v[h+1108>>2]=k;m=m+1|0;h=v[h+1104>>2];l=(h|0)>(l|0)?h:l;l=(l|0)<(k|0)?k:l}i=i+1|0;if((i|0)!=(d|0)){continue}break}i=1;if((m|0)<=0){break b}yc(v[b>>2],v[b+4>>2],(v[v[b+16>>2]+1112>>2]<<7)+e|0);if((m|0)!=1){while(1){d=j+528|0;f=B(i,1120);na(d,(v[(f+v[b+16>>2]|0)+1112>>2]<<7)+e|0,128);h=v[b>>2]+(i<<10)|0;Ed(d,h-48|0);o=h;h=B(i,320);yc(o,h+v[b+4>>2]|0,d);d=h+v[b+4>>2]|0;ha(d,d,((v[(f+v[b+16>>2]|0)+1112>>2]<<7)+e|0)+80|0);i=i+1|0;if((m|0)!=(i|0)){continue}break}}td(m<<3,v[b+8>>2],j+1120|0,v[b>>2],v[b+4>>2]);e=0;while(1){d=B(e,704);Da(d+v[b+12>>2]|0,d+v[b+8>>2]|0);o=1;d=e<<3;f=B(d|1,88);Da(f+v[b+12>>2]|0,f+v[b+8>>2]|0);f=B(d|2,88);Da(f+v[b+12>>2]|0,f+v[b+8>>2]|0);f=B(d|3,88);Da(f+v[b+12>>2]|0,f+v[b+8>>2]|0);f=B(d|4,88);Da(f+v[b+12>>2]|0,f+v[b+8>>2]|0);f=B(d|5,88);Da(f+v[b+12>>2]|0,f+v[b+8>>2]|0);f=B(d|6,88);Da(f+v[b+12>>2]|0,f+v[b+8>>2]|0);d=B(d|7,88);Da(d+v[b+12>>2]|0,d+v[b+8>>2]|0);e=e+1|0;if((m|0)!=(e|0)){continue}break}break a}bb(j+1120|0,1)}c:{if(!g){f=0;g=0;break c}f=v[g+4>>2];e=j+1088|0;d=e;v[d>>2]=v[g>>2];v[d+4>>2]=f;f=v[g+8>>2];i=v[g+12>>2];v[d+16>>2]=0;v[d+20>>2]=0;v[d+8>>2]=f;v[d+12>>2]=i;v[d+24>>2]=0;v[d+28>>2]=0;f=v[g+20>>2];d=j+1056|0;v[d>>2]=v[g+16>>2];v[d+4>>2]=f;f=v[g+24>>2];g=v[g+28>>2];v[d+16>>2]=0;v[d+20>>2]=0;v[d+8>>2]=f;v[d+12>>2]=g;v[d+24>>2]=0;v[d+28>>2]=0;f=gc(j+528|0,129,e,15);g=gc(j,129,d,15);d=(f|0)>(l|0)?f:l;l=(d|0)<(g|0)?g:d}Ta(c);if((l|0)>0){while(1){Ga(c,c,0);d=l;l=d-1|0;i=0;if(o){while(1){e=v[b+16>>2];k=B(i,1120);h=e+k|0;d:{if((d|0)>v[h+1104>>2]){break d}h=v[(h+(l<<2)|0)- -64>>2];if(!h){break d}e=v[b+8>>2]+B(i,704)|0;e:{if((h|0)>0){na(j+1160|0,e+B(h-1>>>1|0,88)|0,88);break e}Ia(j+1160|0,e+B((h^-1)>>>1|0,88)|0)}Ha(c,c,j+1160|0,0);e=v[b+16>>2]}e=e+k|0;f:{if((d|0)>v[e+1108>>2]){break f}e=v[(e+(l<<2)|0)+584>>2];if(!e){break f}h=v[b+12>>2]+B(i,704)|0;g:{if((e|0)>0){na(j+1160|0,h+B(e-1>>>1|0,88)|0,88);break g}Ia(j+1160|0,h+B((e^-1)>>>1|0,88)|0)}Ha(c,c,j+1160|0,0)}i=i+1|0;if((m|0)!=(i|0)){continue}break}}h:{if((d|0)>(f|0)){break h}e=v[(j+528|0)+(l<<2)>>2];if(!e){break h}i=v[a>>2];i:{if((e|0)>0){ab(j+1160|0,i+((e<<5)-32&-64)|0);break i}h=j+1160|0;ab(h,i+((e^-1)<<5&-64)|0);Ia(h,h)}sd(c,c,j+1160|0,j+1120|0)}j:{if((d|0)>(g|0)){break j}e=v[(l<<2)+j>>2];if(!e){break j}i=v[a+4>>2];k:{if((e|0)>0){ab(j+1160|0,i+((e<<5)-32&-64)|0);break k}h=j+1160|0;ab(h,i+((e^-1)<<5&-64)|0);Ia(h,h)}sd(c,c,j+1160|0,j+1120|0)}if((d|0)>1){continue}break}}if(!v[c+120>>2]){a=c+80|0;ha(a,a,j+1120|0)}T=j+1248|0}function xd(a,b){var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;e=T-448|0;T=e;c=e+128|0;fa(c,b);m=e+416|0;ga(m,c,b);j=e+96|0;ga(j,c,m);g=e+384|0;ga(g,j,c);l=e- -64|0;ga(l,g,c);k=e+32|0;ga(k,l,c);ga(e,k,c);h=e+352|0;fa(h,e);fa(h,h);ga(h,h,k);i=e+320|0;fa(i,h);fa(i,i);ga(i,i,m);f=e+288|0;fa(f,i);fa(f,f);fa(f,f);fa(f,f);fa(f,f);fa(f,f);ga(f,f,h);d=e+256|0;fa(d,f);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);ga(d,d,f);c=e+224|0;fa(c,d);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);ga(c,c,d);d=e+192|0;fa(d,c);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);fa(d,d);ga(d,d,c);c=e+160|0;fa(c,d);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);ga(c,c,f);fa(c,c);fa(c,c);fa(c,c);ga(c,c,j);fa(c,c);fa(c,c);fa(c,c);fa(c,c);ga(c,c,g);fa(c,c);fa(c,c);fa(c,c);fa(c,c);ga(c,c,j);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);ga(c,c,k);fa(c,c);fa(c,c);fa(c,c);fa(c,c);ga(c,c,k);fa(c,c);fa(c,c);fa(c,c);fa(c,c);ga(c,c,g);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);ga(c,c,g);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);ga(c,c,e);fa(c,c);fa(c,c);fa(c,c);fa(c,c);ga(c,c,j);fa(c,c);fa(c,c);fa(c,c);ga(c,c,g);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);ga(c,c,l);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);ga(c,c,j);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);ga(c,c,g);fa(c,c);fa(c,c);fa(c,c);fa(c,c);ga(c,c,g);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);ga(c,c,i);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);ga(c,c,l);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);ga(c,c,k);fa(c,c);fa(c,c);fa(c,c);fa(c,c);ga(c,c,e);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);ga(c,c,m);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);ga(c,c,e);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);ga(c,c,e);fa(c,c);fa(c,c);fa(c,c);fa(c,c);ga(c,c,l);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);ga(c,c,b);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);fa(c,c);ga(a,c,h);T=e+448|0}function Jd(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0;l=T-128|0;T=l;g=0;a:{if(b>>>0>72){break a}i=v[1325];h=T+-64|0;T=h;g=l- -64|0;b:{c:{if(!g){ia(v[i+176>>2],v[i+180>>2],1729);break c}if(!a){ia(v[i+176>>2],v[i+180>>2],1420);break c}i=h+32|0;k=T-16|0;T=k;d:{if(!b){break d}v[k+12>>2]=a+1;if(w[a|0]!=48){break d}b=a+b|0;a=Ad(k+12|0,b);if((a|0)<0|(b|0)!=(a+v[k+12>>2]|0)){break d}if(!zd(i,k+12|0,b)){break d}if(!zd(h,k+12|0,b)){break d}j=(b|0)==v[k+12>>2]}T=k+16|0;if(j){Bc(g,h+32|0,h);a=1;break b}t[g|0]=0;t[g+1|0]=0;t[g+2|0]=0;t[g+3|0]=0;t[g+4|0]=0;t[g+5|0]=0;t[g+6|0]=0;t[g+7|0]=0;t[g+56|0]=0;t[g+57|0]=0;t[g+58|0]=0;t[g+59|0]=0;t[g+60|0]=0;t[g+61|0]=0;t[g+62|0]=0;t[g+63|0]=0;t[g+48|0]=0;t[g+49|0]=0;t[g+50|0]=0;t[g+51|0]=0;t[g+52|0]=0;t[g+53|0]=0;t[g+54|0]=0;t[g+55|0]=0;t[g+40|0]=0;t[g+41|0]=0;t[g+42|0]=0;t[g+43|0]=0;t[g+44|0]=0;t[g+45|0]=0;t[g+46|0]=0;t[g+47|0]=0;t[g+32|0]=0;t[g+33|0]=0;t[g+34|0]=0;t[g+35|0]=0;t[g+36|0]=0;t[g+37|0]=0;t[g+38|0]=0;t[g+39|0]=0;t[g+24|0]=0;t[g+25|0]=0;t[g+26|0]=0;t[g+27|0]=0;t[g+28|0]=0;t[g+29|0]=0;t[g+30|0]=0;t[g+31|0]=0;t[g+16|0]=0;t[g+17|0]=0;t[g+18|0]=0;t[g+19|0]=0;t[g+20|0]=0;t[g+21|0]=0;t[g+22|0]=0;t[g+23|0]=0;t[g+8|0]=0;t[g+9|0]=0;t[g+10|0]=0;t[g+11|0]=0;t[g+12|0]=0;t[g+13|0]=0;t[g+14|0]=0;t[g+15|0]=0}a=0}T=h- -64|0;g=0;if(!a|(d|0)!=32){break a}g=0;if(!Ea(v[1325],l,e,f)){break a}b=l- -64|0;e=0;j=T-192|0;T=j;i=v[1325];e:{if(!Qa(v[i>>2])){ia(v[i+176>>2],v[i+180>>2],2014);break e}if(!c){ia(v[i+176>>2],v[i+180>>2],1928);break e}if(!b){ia(v[i+176>>2],v[i+180>>2],1729);break e}if(!l){ia(v[i+176>>2],v[i+180>>2],1390);break e}la(j+8|0,c,0);a=j+40|0;Ac(j+72|0,a,b);if(Gb(a)){break e}if(!Ua(i,j+104|0,l)){break e}b=j+40|0;e=j+104|0;a=j+8|0;c=0;h=T-432|0;T=h;g=j+72|0;f:{if(pa(g)){break f}if(pa(b)){break f}f=h+368|0;nb(f,b);d=h+336|0;ga(d,f,a);b=h+304|0;ga(b,f,g);a=h+136|0;Oa(a,e);hc(i,h+8|0,a,b,d);if(v[h+128>>2]){break f}b=h+400|0;ua(b,g);a=h+264|0;Ka(a,b);c=1;if(yd(a,h+8|0)){break f}c=0;b=1;g:{if(v[h+296>>2]|v[h+300>>2]){break g}b=1;if(v[h+288>>2]|v[h+292>>2]){break g}a=v[h+284>>2];e=a;d=v[h+280>>2];b=1;if(!a&d>>>0>21319971|a){break g}a=-1;h:{if((d|0)!=21319971|e){break h}e=v[h+276>>2];d=v[h+272>>2];b=1;if((e|0)==103691&d>>>0>1979466754|e>>>0>103691){break g}if((d|0)!=1979466754|(e|0)!=103691){break h}a=1;d=v[h+268>>2];b=v[h+264>>2];if((d|0)==893298&b>>>0>801749742|d>>>0>893298){break h}a=(b|0)!=801749742|(d|0)!=893298?-1:0}b=a}if((b|0)>=0){break f}a=h+264|0;qa(a,3608);c=(yd(a,h+8|0)|0)!=0}T=h+432|0;e=(c|0)!=0}T=j+192|0;g=(e|0)!=0}T=l+128|0;return g|0}function vb(a,b,c,d){var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0;A=w[c+28|0]|w[c+29|0]<<8|(w[c+30|0]<<16|w[c+31|0]<<24);B=w[c+24|0]|w[c+25|0]<<8|(w[c+26|0]<<16|w[c+27|0]<<24);C=w[c+20|0]|w[c+21|0]<<8|(w[c+22|0]<<16|w[c+23|0]<<24);D=w[c+16|0]|w[c+17|0]<<8|(w[c+18|0]<<16|w[c+19|0]<<24);E=w[c+12|0]|w[c+13|0]<<8|(w[c+14|0]<<16|w[c+15|0]<<24);F=w[c+8|0]|w[c+9|0]<<8|(w[c+10|0]<<16|w[c+11|0]<<24);G=w[c+4|0]|w[c+5|0]<<8|(w[c+6|0]<<16|w[c+7|0]<<24);H=w[c|0]|w[c+1|0]<<8|(w[c+2|0]<<16|w[c+3|0]<<24);while(1){y=10;k=z;q=0;l=0;m=d;h=A;n=B;r=C;g=D;c=E;i=F;e=G;j=H;f=1797285236;x=2036477234;s=857760878;o=1634760805;while(1){p=g;g=m;m=j+o|0;g=Ie(g^m,16);o=p+g|0;j=Ie(o^j,12);u=j+m|0;m=Ie(g^u,8);g=o+m|0;o=Ie(j^g,7);j=c+f|0;k=Ie(j^k,16);h=k+h|0;t=Ie(c^h,12);I=t+j|0;c=o+I|0;p=i;i=i+x|0;j=Ie(i^q,16);n=j+n|0;J=Ie(p^n,12);i=J+i|0;K=Ie(i^j,8);j=Ie(K^c,16);p=e;e=e+s|0;q=Ie(e^l,16);r=q+r|0;L=Ie(p^r,12);e=L+e|0;s=c;p=o;c=Ie(e^q,8);o=c+r|0;r=o+j|0;l=Ie(p^r,12);f=s+l|0;q=Ie(j^f,8);r=q+r|0;j=Ie(r^l,7);p=g;g=i;k=Ie(k^I,8);i=h+k|0;h=Ie(i^t,7);g=g+h|0;l=Ie(c^g,16);c=p+l|0;h=Ie(c^h,12);x=g+h|0;l=Ie(l^x,8);g=c+l|0;c=Ie(g^h,7);s=m;p=e;e=n+K|0;m=Ie(e^J,7);h=p+m|0;n=Ie(s^h,16);i=i+n|0;t=Ie(i^m,12);s=h+t|0;m=Ie(n^s,8);h=i+m|0;i=Ie(h^t,7);p=k;k=Ie(o^L,7);n=k+u|0;u=Ie(p^n,16);e=u+e|0;t=Ie(e^k,12);o=n+t|0;k=Ie(u^o,8);n=e+k|0;e=Ie(n^t,7);y=y-1|0;if(y){continue}break}f=f+1797285236|0;v[a+16>>2]=f<<24|f<<8&16711680|(f>>>8&65280|f>>>24);f=x+2036477234|0;v[a+20>>2]=f<<24|f<<8&16711680|(f>>>8&65280|f>>>24);f=s+857760878|0;v[a+24>>2]=f<<24|f<<8&16711680|(f>>>8&65280|f>>>24);f=o+1634760805|0;v[a+28>>2]=f<<24|f<<8&16711680|(f>>>8&65280|f>>>24);e=e+G|0;v[a+8>>2]=e<<24|e<<8&16711680|(e>>>8&65280|e>>>24);e=j+H|0;v[a+12>>2]=e<<24|e<<8&16711680|(e>>>8&65280|e>>>24);c=c+E|0;v[a>>2]=c<<24|c<<8&16711680|(c>>>8&65280|c>>>24);c=i+F|0;v[a+4>>2]=c<<24|c<<8&16711680|(c>>>8&65280|c>>>24);c=h+A|0;v[b+16>>2]=c<<24|c<<8&16711680|(c>>>8&65280|c>>>24);c=n+B|0;v[b+20>>2]=c<<24|c<<8&16711680|(c>>>8&65280|c>>>24);c=r+C|0;v[b+24>>2]=c<<24|c<<8&16711680|(c>>>8&65280|c>>>24);c=g+D|0;v[b+28>>2]=c<<24|c<<8&16711680|(c>>>8&65280|c>>>24);v[b+8>>2]=l<<8&16711680|l<<24|(l>>>8&65280|l>>>24);c=d+m|0;v[b+12>>2]=c<<24|c<<8&16711680|(c>>>8&65280|c>>>24);c=k+z|0;v[b>>2]=c<<24|c<<8&16711680|(c>>>8&65280|c>>>24);v[b+4>>2]=q<<8&16711680|q<<24|(q>>>8&65280|q>>>24);z=z+1|0;if(Lb(a)|Lb(b)){continue}break}}function Hc(a,b){var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0;c=T-816|0;T=c;Ga(c+688|0,b,0);d=v[c+724>>2];v[c+544>>2]=v[c+720>>2];v[c+548>>2]=d;d=v[c+716>>2];v[c+536>>2]=v[c+712>>2];v[c+540>>2]=d;d=v[c+708>>2];v[c+528>>2]=v[c+704>>2];v[c+532>>2]=d;d=v[c+700>>2];v[c+520>>2]=v[c+696>>2];v[c+524>>2]=d;d=v[c+740>>2];v[c+560>>2]=v[c+736>>2];v[c+564>>2]=d;d=v[c+748>>2];v[c+568>>2]=v[c+744>>2];v[c+572>>2]=d;d=v[c+756>>2];v[c+576>>2]=v[c+752>>2];v[c+580>>2]=d;d=v[c+764>>2];v[c+584>>2]=v[c+760>>2];v[c+588>>2]=d;d=v[c+692>>2];v[c+512>>2]=v[c+688>>2];v[c+516>>2]=d;d=v[c+732>>2];v[c+552>>2]=v[c+728>>2];v[c+556>>2]=d;v[c+592>>2]=0;g=c+768|0;rb(c+600|0,b,g);d=v[c+676>>2];v[c+280>>2]=v[c+672>>2];v[c+284>>2]=d;d=v[c+668>>2];v[c+272>>2]=v[c+664>>2];v[c+276>>2]=d;d=v[c+660>>2];v[c+264>>2]=v[c+656>>2];v[c+268>>2]=d;d=v[c+652>>2];v[c+256>>2]=v[c+648>>2];v[c+260>>2]=d;d=v[c+636>>2];v[c+240>>2]=v[c+632>>2];v[c+244>>2]=d;d=v[c+628>>2];v[c+232>>2]=v[c+624>>2];v[c+236>>2]=d;d=v[c+620>>2];v[c+224>>2]=v[c+616>>2];v[c+228>>2]=d;d=v[c+612>>2];v[c+216>>2]=v[c+608>>2];v[c+220>>2]=d;d=v[c+644>>2];v[c+248>>2]=v[c+640>>2];v[c+252>>2]=d;d=v[c+604>>2];v[c+208>>2]=v[c+600>>2];v[c+212>>2]=d;d=v[b+116>>2];v[c+320>>2]=v[b+112>>2];v[c+324>>2]=d;d=v[b+108>>2];v[c+312>>2]=v[b+104>>2];v[c+316>>2]=d;d=v[b+100>>2];v[c+304>>2]=v[b+96>>2];v[c+308>>2]=d;d=v[b+92>>2];v[c+296>>2]=v[b+88>>2];v[c+300>>2]=d;d=v[b+84>>2];v[c+288>>2]=v[b+80>>2];v[c+292>>2]=d;v[c+328>>2]=0;b=v[c+804>>2];v[c+160>>2]=v[c+800>>2];v[c+164>>2]=b;b=v[c+796>>2];v[c+152>>2]=v[c+792>>2];v[c+156>>2]=b;b=v[c+788>>2];v[c+144>>2]=v[c+784>>2];v[c+148>>2]=b;b=v[c+780>>2];v[c+136>>2]=v[c+776>>2];v[c+140>>2]=b;b=v[c+772>>2];v[c+128>>2]=v[c+768>>2];v[c+132>>2]=b;b=c+128|0;Ra(b);zb(a,b);h=c+248|0;Ra(h);zb(a+32|0,h);i=c+288|0;b=1;while(1){d=c+208|0;e=c+128|0;Ha(d,d,c+512|0,e);Ra(e);d=(b<<6)+a|0;zb(d,e);Ra(h);zb(d+32|0,h);b=b+1|0;if((b|0)!=8192){continue}break}ha(i,i,g);b=c+168|0;Gc(b,i);d=c+424|0;rb(d,c+208|0,b);b=a+524224|0;ab(c+336|0,b);xa(b,d);Gc(g,g);b=c+88|0;ea(b,g);ha(b,b,c+688|0);g=c+376|0;h=c+464|0;b=8191;while(1){f=c+168|0;e=c+336|0;ha(f,f,e);d=c+48|0;ea(d,f);i=c+8|0;ha(i,d,f);f=c+424|0;ha(f,e,d);ra(f,f,1);qa(f,c+88|0);j=e;d=b-1|0;e=(d<<6)+a|0;ab(j,e);ha(h,g,i);xa(e,f);e=b>>>0>1;b=d;if(e){continue}break}T=c+816|0}function Ja(a,b,c){var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;d=T-528|0;T=d;f=d+488|0;l=b+80|0;ea(f,l);e=v[b+36>>2];v[d+480>>2]=v[b+32>>2];v[d+484>>2]=e;e=v[b+28>>2];v[d+472>>2]=v[b+24>>2];v[d+476>>2]=e;e=v[b+20>>2];v[d+464>>2]=v[b+16>>2];v[d+468>>2]=e;e=v[b+12>>2];v[d+456>>2]=v[b+8>>2];v[d+460>>2]=e;e=v[b+4>>2];v[d+448>>2]=v[b>>2];v[d+452>>2]=e;i=d+448|0;Ca(i);h=d+408|0;ha(h,c,f);e=v[b+76>>2];v[d+400>>2]=v[b+72>>2];v[d+404>>2]=e;e=b- -64|0;g=v[e+4>>2];v[d+392>>2]=v[e>>2];v[d+396>>2]=g;e=v[b+60>>2];v[d+384>>2]=v[b+56>>2];v[d+388>>2]=e;e=v[b+52>>2];v[d+376>>2]=v[b+48>>2];v[d+380>>2]=e;e=v[b+44>>2];v[d+368>>2]=v[b+40>>2];v[d+372>>2]=e;Ca(d+368|0);e=d+328|0;m=c+40|0;ha(e,m,f);ha(e,e,l);f=v[d+484>>2];v[d+320>>2]=v[d+480>>2];v[d+324>>2]=f;f=v[d+476>>2];v[d+312>>2]=v[d+472>>2];v[d+316>>2]=f;f=v[d+468>>2];v[d+304>>2]=v[d+464>>2];v[d+308>>2]=f;f=v[d+460>>2];v[d+296>>2]=v[d+456>>2];v[d+300>>2]=f;f=v[d+452>>2];v[d+288>>2]=v[d+448>>2];v[d+292>>2]=f;f=d+288|0;qa(f,h);g=v[d+404>>2];v[d+240>>2]=v[d+400>>2];v[d+244>>2]=g;g=v[d+396>>2];v[d+232>>2]=v[d+392>>2];v[d+236>>2]=g;g=v[d+388>>2];v[d+224>>2]=v[d+384>>2];v[d+228>>2]=g;g=v[d+380>>2];v[d+216>>2]=v[d+376>>2];v[d+220>>2]=g;g=v[d+372>>2];v[d+208>>2]=v[d+368>>2];v[d+212>>2]=g;j=d+208|0;qa(j,e);g=d+88|0;ea(g,f);e=d+48|0;ra(e,h,1);h=d+248|0;ha(h,i,e);qa(g,h);k=ic(j);n=ic(g);h=v[d+404>>2];v[d+40>>2]=v[d+400>>2];v[d+44>>2]=h;h=v[d+396>>2];v[d+32>>2]=v[d+392>>2];v[d+36>>2]=h;h=v[d+388>>2];v[d+24>>2]=v[d+384>>2];v[d+28>>2]=h;h=v[d+380>>2];v[d+16>>2]=v[d+376>>2];v[d+20>>2]=h;h=v[d+372>>2];v[d+8>>2]=v[d+368>>2];v[d+12>>2]=h;h=d+8|0;Ma(h,2);qa(e,i);i=g;k=k&n;g=!k;ka(h,i,g);ka(e,j,g);g=d+168|0;ea(g,e);i=d+128|0;ha(i,g,f);ea(g,g);ka(g,j,k);ea(f,h);j=a+80|0;ha(j,l,e);l=ic(j);k=v[b+120>>2];Ma(j,2);ra(i,i,1);qa(f,i);Ca(f);e=v[d+324>>2];v[a+32>>2]=v[d+320>>2];v[a+36>>2]=e;e=v[d+316>>2];v[a+24>>2]=v[d+312>>2];v[a+28>>2]=e;e=v[d+308>>2];v[a+16>>2]=v[d+304>>2];v[a+20>>2]=e;e=v[d+300>>2];v[a+8>>2]=v[d+296>>2];v[a+12>>2]=e;e=v[d+292>>2];v[a>>2]=v[d+288>>2];v[a+4>>2]=e;Ma(f,2);qa(f,i);ha(f,f,h);qa(f,g);e=a+40|0;ra(e,f,3);Ca(e);Ma(a,4);Ma(e,4);ka(a,c,v[b+120>>2]);ka(e,m,v[b+120>>2]);ka(j,3648,v[b+120>>2]);v[a+120>>2]=B(l,1-k|0);T=d+528|0}function Vd(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;g=T-80|0;T=g;f=0;a:{if(!Ea(v[1325],g+16|0,b,c)|(e|0)!=32){break a}c=v[1325];b=g+16|0;e=T-128|0;T=e;v[e+4>>2]=0;b:{if(!Qa(v[c>>2])){ia(v[c+176>>2],v[c+180>>2],2014);break b}if(!b){ia(v[c+176>>2],v[c+180>>2],1390);break b}if(!d){ia(v[c+176>>2],v[c+180>>2],1666);break b}la(e+8|0,d,e+4|0);if(v[e+4>>2]){t[b|0]=0;t[b+1|0]=0;t[b+2|0]=0;t[b+3|0]=0;t[b+4|0]=0;t[b+5|0]=0;t[b+6|0]=0;t[b+7|0]=0;t[b+56|0]=0;t[b+57|0]=0;t[b+58|0]=0;t[b+59|0]=0;t[b+60|0]=0;t[b+61|0]=0;t[b+62|0]=0;t[b+63|0]=0;t[b+48|0]=0;t[b+49|0]=0;t[b+50|0]=0;t[b+51|0]=0;t[b+52|0]=0;t[b+53|0]=0;t[b+54|0]=0;t[b+55|0]=0;t[b+40|0]=0;t[b+41|0]=0;t[b+42|0]=0;t[b+43|0]=0;t[b+44|0]=0;t[b+45|0]=0;t[b+46|0]=0;t[b+47|0]=0;t[b+32|0]=0;t[b+33|0]=0;t[b+34|0]=0;t[b+35|0]=0;t[b+36|0]=0;t[b+37|0]=0;t[b+38|0]=0;t[b+39|0]=0;t[b+24|0]=0;t[b+25|0]=0;t[b+26|0]=0;t[b+27|0]=0;t[b+28|0]=0;t[b+29|0]=0;t[b+30|0]=0;t[b+31|0]=0;t[b+16|0]=0;t[b+17|0]=0;t[b+18|0]=0;t[b+19|0]=0;t[b+20|0]=0;t[b+21|0]=0;t[b+22|0]=0;t[b+23|0]=0;t[b+8|0]=0;t[b+9|0]=0;t[b+10|0]=0;t[b+11|0]=0;t[b+12|0]=0;t[b+13|0]=0;t[b+14|0]=0;t[b+15|0]=0;break b}d=Ua(c,e+40|0,b);t[b+56|0]=0;t[b+57|0]=0;t[b+58|0]=0;t[b+59|0]=0;t[b+60|0]=0;t[b+61|0]=0;t[b+62|0]=0;t[b+63|0]=0;t[b+48|0]=0;t[b+49|0]=0;t[b+50|0]=0;t[b+51|0]=0;t[b+52|0]=0;t[b+53|0]=0;t[b+54|0]=0;t[b+55|0]=0;t[b+40|0]=0;t[b+41|0]=0;t[b+42|0]=0;t[b+43|0]=0;t[b+44|0]=0;t[b+45|0]=0;t[b+46|0]=0;t[b+47|0]=0;t[b+32|0]=0;t[b+33|0]=0;t[b+34|0]=0;t[b+35|0]=0;t[b+36|0]=0;t[b+37|0]=0;t[b+38|0]=0;t[b+39|0]=0;t[b+24|0]=0;t[b+25|0]=0;t[b+26|0]=0;t[b+27|0]=0;t[b+28|0]=0;t[b+29|0]=0;t[b+30|0]=0;t[b+31|0]=0;t[b+16|0]=0;t[b+17|0]=0;t[b+18|0]=0;t[b+19|0]=0;t[b+20|0]=0;t[b+21|0]=0;t[b+22|0]=0;t[b+23|0]=0;t[b+8|0]=0;t[b+9|0]=0;t[b+10|0]=0;t[b+11|0]=0;t[b+12|0]=0;t[b+13|0]=0;t[b+14|0]=0;t[b+15|0]=0;t[b|0]=0;t[b+1|0]=0;t[b+2|0]=0;t[b+3|0]=0;t[b+4|0]=0;t[b+5|0]=0;t[b+6|0]=0;t[b+7|0]=0;if(!d){break b}d=T-160|0;T=d;f=d+32|0;h=e+40|0;Oa(f,h);ya(d,1);hc(c,f,f,d,e+8|0);c=0;if(!v[d+152>>2]){sa(h,d+32|0);c=1}T=d+160|0;if(!c){break b}$a(b,e+40|0);i=1}T=e+128|0;f=0;if(!i){break a}v[g+12>>2]=33;f=(Ya(v[1325],a,g+12|0,g+16|0,258)|0)!=0}T=g+80|0;return f|0}function ma(a,b,c){var d=0,e=0,f=0,g=0;d=v[a+96>>2];v[a+96>>2]=d+c;g=d&63;a:{if(g+c>>>0<64){break a}d=a+32|0;e=64-g|0;na(d+g|0,b,e);Cd(a,d);b=b+e|0;g=0;c=c-e|0;if(c>>>0<64){break a}while(1){e=w[b+4|0]|w[b+5|0]<<8|(w[b+6|0]<<16|w[b+7|0]<<24);f=w[b|0]|w[b+1|0]<<8|(w[b+2|0]<<16|w[b+3|0]<<24);t[d|0]=f;t[d+1|0]=f>>>8;t[d+2|0]=f>>>16;t[d+3|0]=f>>>24;t[d+4|0]=e;t[d+5|0]=e>>>8;t[d+6|0]=e>>>16;t[d+7|0]=e>>>24;e=w[b+60|0]|w[b+61|0]<<8|(w[b+62|0]<<16|w[b+63|0]<<24);f=w[b+56|0]|w[b+57|0]<<8|(w[b+58|0]<<16|w[b+59|0]<<24);t[d+56|0]=f;t[d+57|0]=f>>>8;t[d+58|0]=f>>>16;t[d+59|0]=f>>>24;t[d+60|0]=e;t[d+61|0]=e>>>8;t[d+62|0]=e>>>16;t[d+63|0]=e>>>24;e=w[b+52|0]|w[b+53|0]<<8|(w[b+54|0]<<16|w[b+55|0]<<24);f=w[b+48|0]|w[b+49|0]<<8|(w[b+50|0]<<16|w[b+51|0]<<24);t[d+48|0]=f;t[d+49|0]=f>>>8;t[d+50|0]=f>>>16;t[d+51|0]=f>>>24;t[d+52|0]=e;t[d+53|0]=e>>>8;t[d+54|0]=e>>>16;t[d+55|0]=e>>>24;e=w[b+44|0]|w[b+45|0]<<8|(w[b+46|0]<<16|w[b+47|0]<<24);f=w[b+40|0]|w[b+41|0]<<8|(w[b+42|0]<<16|w[b+43|0]<<24);t[d+40|0]=f;t[d+41|0]=f>>>8;t[d+42|0]=f>>>16;t[d+43|0]=f>>>24;t[d+44|0]=e;t[d+45|0]=e>>>8;t[d+46|0]=e>>>16;t[d+47|0]=e>>>24;e=w[b+36|0]|w[b+37|0]<<8|(w[b+38|0]<<16|w[b+39|0]<<24);f=w[b+32|0]|w[b+33|0]<<8|(w[b+34|0]<<16|w[b+35|0]<<24);t[d+32|0]=f;t[d+33|0]=f>>>8;t[d+34|0]=f>>>16;t[d+35|0]=f>>>24;t[d+36|0]=e;t[d+37|0]=e>>>8;t[d+38|0]=e>>>16;t[d+39|0]=e>>>24;e=w[b+28|0]|w[b+29|0]<<8|(w[b+30|0]<<16|w[b+31|0]<<24);f=w[b+24|0]|w[b+25|0]<<8|(w[b+26|0]<<16|w[b+27|0]<<24);t[d+24|0]=f;t[d+25|0]=f>>>8;t[d+26|0]=f>>>16;t[d+27|0]=f>>>24;t[d+28|0]=e;t[d+29|0]=e>>>8;t[d+30|0]=e>>>16;t[d+31|0]=e>>>24;e=w[b+20|0]|w[b+21|0]<<8|(w[b+22|0]<<16|w[b+23|0]<<24);f=w[b+16|0]|w[b+17|0]<<8|(w[b+18|0]<<16|w[b+19|0]<<24);t[d+16|0]=f;t[d+17|0]=f>>>8;t[d+18|0]=f>>>16;t[d+19|0]=f>>>24;t[d+20|0]=e;t[d+21|0]=e>>>8;t[d+22|0]=e>>>16;t[d+23|0]=e>>>24;e=w[b+12|0]|w[b+13|0]<<8|(w[b+14|0]<<16|w[b+15|0]<<24);f=w[b+8|0]|w[b+9|0]<<8|(w[b+10|0]<<16|w[b+11|0]<<24);t[d+8|0]=f;t[d+9|0]=f>>>8;t[d+10|0]=f>>>16;t[d+11|0]=f>>>24;t[d+12|0]=e;t[d+13|0]=e>>>8;t[d+14|0]=e>>>16;t[d+15|0]=e>>>24;Cd(a,d);b=b- -64|0;c=c+-64|0;if(c>>>0>63){continue}break}}if(c){na((a+g|0)+32|0,b,c)}}function Ae(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;f=T-192|0;T=f;if(!d){ga(e+160|0,e+192|0,c);ga(e+96|0,e- -64|0,c)}g=v[e+432>>2];a:{if(g>>>0>d>>>0){b=v[e+164>>2];v[a>>2]=v[e+160>>2];v[a+4>>2]=b;b=v[e+188>>2];v[a+24>>2]=v[e+184>>2];v[a+28>>2]=b;b=v[e+180>>2];v[a+16>>2]=v[e+176>>2];v[a+20>>2]=b;b=v[e+172>>2];v[a+8>>2]=v[e+168>>2];v[a+12>>2]=b;break a}if(g<<1>>>0>d>>>0){i=d-g|0;g=(g>>>0)/y[e+548>>2]|0;d=(i>>>0)/(g>>>0)|0;if((i|0)==(B(d,g)|0)){h=e- -64|0;ga(f+160|0,h,e+32|0);b=e+128|0;fa(b,h);if(g>>>0<=i>>>0){d=d>>>0>1?d:1;g=0;while(1){ga(b,b,f+160|0);g=g+1|0;if((d|0)!=(g|0)){continue}break}}ga(b,b,c)}b=a;a=e+128|0;oa(b,a,e+96|0);ga(a,a,e);oa(a,a,a);break a}b:{c:{switch(v[e+436>>2]){case 2:d=v[e+228>>2];v[a>>2]=v[e+224>>2];v[a+4>>2]=d;d=v[e+252>>2];v[a+24>>2]=v[e+248>>2];v[a+28>>2]=d;d=v[e+244>>2];v[a+16>>2]=v[e+240>>2];v[a+20>>2]=d;d=v[e+236>>2];v[a+8>>2]=v[e+232>>2];v[a+12>>2]=d;na(b,e+344|0,88);break b;case 1:na(b,e+256|0,88);ya(a,1);break b;case 0:ta(f+128|0);ta(f+160|0);ya(f+96|0,1);l=e+128|0;i=e- -64|0;fa(l,i);va(a,l);oa(a,a,i);k=v[e+548>>2];if(k){m=v[e+432>>2];d=(m>>>0)/(k>>>0)|0;q=d>>>0>1?d:1;n=e+192|0;r=e+472|0;o=v[e+544>>2];g=0;while(1){ta(f+32|0);d=0;if(k>>>0<=m>>>0){while(1){j=f+160|0;ga(j,j,r);h=f+32|0;oa(h,h,h);p=j;j=f+96|0;oa(p,p,j);oa(h,h,j);d=d+1|0;if((q|0)!=(d|0)){continue}break}}ga(f- -64|0,l,n);d=0;if(g){while(1){h=f- -64|0;ga(h,h,i);d=d+1|0;if((g|0)!=(d|0)){continue}break}}if(o){ya(f,v[(g<<3)+o>>2]);ga(f,f,n);ga(f,f,i);d=0;if(g){while(1){h=f- -64|0;ga(h,h,i);d=d+1|0;if((g|0)!=(d|0)){continue}break}}d=f+128|0;oa(d,d,f)}d=f+32|0;ga(d,d,f- -64|0);h=f+128|0;oa(h,h,d);g=g+1|0;if((k|0)!=(g|0)){continue}break}}ga(a,a,f+160|0);oa(a,a,f+128|0);d=f+96|0;va(d,e+504|0);oa(a,a,d);ga(a,a,e+440|0);na(b,v[e+536>>2],88);break b;case 3:ga(a,e+224|0,e+440|0);na(b,e+552|0,88);break b;case 4:fa(a,e+224|0);ga(a,a,e+440|0);na(b,e+640|0,88);break b;default:break c}}d=e+128|0;ga(a,d,e+440|0);ga(d,d,e- -64|0);na(b,(v[e+540>>2]+B(v[e+436>>2],88)|0)-440|0,88)}ga(a,a,c);v[e+436>>2]=v[e+436>>2]+1}T=f+192|0;return 1}function cd(a,b,c,d,e,f,g,h,i,j,k,l,m){var n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,w=0,x=0,y=0,z=0,A=0,C=0,D=0,E=0,F=0,G=0,H=0;o=T-2512|0;T=o;n=v[j+28>>2];p=o+2408|0;v[p>>2]=v[j+24>>2];v[p+4>>2]=n;n=v[j+20>>2];p=o+2400|0;v[p>>2]=v[j+16>>2];v[p+4>>2]=n;n=v[j+12>>2];p=o+2392|0;v[p>>2]=v[j+8>>2];v[p+4>>2]=n;p=v[j+4>>2];v[o+2384>>2]=v[j>>2];v[o+2388>>2]=p;v[o+2456>>2]=e;v[o+2508>>2]=l;v[o+2464>>2]=i;v[o+2460>>2]=h;v[o+2452>>2]=g;v[o+2448>>2]=f;n=1;a:{if(l>>>0<4){break a}D=c-88|0;x=l+1|0;y=o+2416|0;r=o+2472|0;E=l>>>0>32;F=l>>>0>128;G=l>>>0>2048;while(1){v[o+2504>>2]=1<<w;ta(r);p=l>>>1|0;u=l>>>0<2;b:{if(!u){q=p>>>0>1?p:1;n=0;while(1){s=o+8|0;t=n<<6;ga(s,t+h|0,(i+t|0)+32|0);oa(r,r,s);n=n+1|0;if((q|0)!=(n|0)){continue}break}ga(r,r,k);ya(y,1);n=0;s=o+272|0;jb(a,b,s,0,6,o+400|0,x);t=v[d>>2];v[d>>2]=t+1;sa(B(t,88)+c|0,s);ta(r);while(1){s=o+8|0;t=n<<6;ga(s,(t+h|0)+32|0,i+t|0);oa(r,r,s);n=n+1|0;if((q|0)!=(n|0)){continue}break}break b}ga(r,r,k);ya(y,1);n=o+272|0;jb(a,b,n,0,6,o+400|0,x);q=v[d>>2];v[d>>2]=q+1;sa(B(q,88)+c|0,n);ta(r)}ga(r,r,k);ya(y,1);n=o+144|0;q=o+400|0;jb(a,b,n,0,7,q,x);s=v[d>>2];v[d>>2]=s+1;sa(B(s,88)+c|0,n);n=B(v[d>>2],88);_a(m,(n+c|0)-176|0,n+D|0);q=q+(w<<5)|0;la(q,m,o+140|0);c:{d:{e:{if(v[o+140>>2]){break e}if(pa(q)){break e}s=q+992|0;nb(s,q);if(!u){H=p>>>0>1?p:1;n=0;while(1){t=n<<6;z=t+h|0;ga(z,z,q);u=o+8|0;A=t|32;ga(u,A+h|0,s);C=n<<5;oa(C+h|0,z,u);t=i+t|0;ga(t,t,s);ga(u,i+A|0,q);oa(i+C|0,t,u);n=n+1|0;if((H|0)!=(n|0)){continue}break}}if(!((w|0)==1&E|((w|0)==3&G|(w|0)==2&F))){break c}f:{g:{if(l>>>0<=1){fa(o+8|0,j);j=0;break g}q=p>>>0>1?p:1;l=2<<w;n=0;while(1){r=o+8|0;x=o+400|0;jb(a,b,r,0,8,x,l);u=B(l,88);v[o+2448>>2]=u+v[o+2448>>2];s=B(n,88);sa(s+f|0,r);ya(y,1);jb(a,b,r,0,9,x,l);v[o+2452>>2]=u+v[o+2452>>2];sa(g+s|0,r);n=n+1|0;if((q|0)!=(n|0)){continue}break}fa(o+8|0,j);j=0;if(!w){break f}}while(1){l=o+8|0;fa(l,l);j=j+1|0;if((w|0)!=(j|0)){continue}break}}if(cd(a,b,c,d,e,f,g,h,i,o+8|0,k,p,m)){break d}}n=0;break a}n=1;break a}n=1;w=w+1|0;q=l>>>0>7;l=p;if(q){continue}break}}T=o+2512|0;return n}function Oc(a,b,c){var d=0,e=0,f=0,g=0,h=0;d=T-128|0;T=d;v[d+4>>2]=0;a:{if(!Qa(v[a>>2])){ia(v[a+176>>2],v[a+180>>2],2014);break a}if(!b){ia(v[a+176>>2],v[a+180>>2],1390);break a}if(!c){ia(v[a+176>>2],v[a+180>>2],1666);break a}la(d+8|0,c,d+4|0);if(v[d+4>>2]){t[b|0]=0;t[b+1|0]=0;t[b+2|0]=0;t[b+3|0]=0;t[b+4|0]=0;t[b+5|0]=0;t[b+6|0]=0;t[b+7|0]=0;t[b+56|0]=0;t[b+57|0]=0;t[b+58|0]=0;t[b+59|0]=0;t[b+60|0]=0;t[b+61|0]=0;t[b+62|0]=0;t[b+63|0]=0;t[b+48|0]=0;t[b+49|0]=0;t[b+50|0]=0;t[b+51|0]=0;t[b+52|0]=0;t[b+53|0]=0;t[b+54|0]=0;t[b+55|0]=0;t[b+40|0]=0;t[b+41|0]=0;t[b+42|0]=0;t[b+43|0]=0;t[b+44|0]=0;t[b+45|0]=0;t[b+46|0]=0;t[b+47|0]=0;t[b+32|0]=0;t[b+33|0]=0;t[b+34|0]=0;t[b+35|0]=0;t[b+36|0]=0;t[b+37|0]=0;t[b+38|0]=0;t[b+39|0]=0;t[b+24|0]=0;t[b+25|0]=0;t[b+26|0]=0;t[b+27|0]=0;t[b+28|0]=0;t[b+29|0]=0;t[b+30|0]=0;t[b+31|0]=0;t[b+16|0]=0;t[b+17|0]=0;t[b+18|0]=0;t[b+19|0]=0;t[b+20|0]=0;t[b+21|0]=0;t[b+22|0]=0;t[b+23|0]=0;t[b+8|0]=0;t[b+9|0]=0;t[b+10|0]=0;t[b+11|0]=0;t[b+12|0]=0;t[b+13|0]=0;t[b+14|0]=0;t[b+15|0]=0;break a}c=Ua(a,d+40|0,b);t[b+56|0]=0;t[b+57|0]=0;t[b+58|0]=0;t[b+59|0]=0;t[b+60|0]=0;t[b+61|0]=0;t[b+62|0]=0;t[b+63|0]=0;t[b+48|0]=0;t[b+49|0]=0;t[b+50|0]=0;t[b+51|0]=0;t[b+52|0]=0;t[b+53|0]=0;t[b+54|0]=0;t[b+55|0]=0;t[b+40|0]=0;t[b+41|0]=0;t[b+42|0]=0;t[b+43|0]=0;t[b+44|0]=0;t[b+45|0]=0;t[b+46|0]=0;t[b+47|0]=0;t[b+32|0]=0;t[b+33|0]=0;t[b+34|0]=0;t[b+35|0]=0;t[b+36|0]=0;t[b+37|0]=0;t[b+38|0]=0;t[b+39|0]=0;t[b+24|0]=0;t[b+25|0]=0;t[b+26|0]=0;t[b+27|0]=0;t[b+28|0]=0;t[b+29|0]=0;t[b+30|0]=0;t[b+31|0]=0;t[b+16|0]=0;t[b+17|0]=0;t[b+18|0]=0;t[b+19|0]=0;t[b+20|0]=0;t[b+21|0]=0;t[b+22|0]=0;t[b+23|0]=0;t[b+8|0]=0;t[b+9|0]=0;t[b+10|0]=0;t[b+11|0]=0;t[b+12|0]=0;t[b+13|0]=0;t[b+14|0]=0;t[b+15|0]=0;t[b|0]=0;t[b+1|0]=0;t[b+2|0]=0;t[b+3|0]=0;t[b+4|0]=0;t[b+5|0]=0;t[b+6|0]=0;t[b+7|0]=0;if(!c){break a}f=d+40|0;c=T-160|0;T=c;g=d+8|0;if(!pa(g)){e=c+128|0;ya(e,0);Oa(c,f);hc(a,c,c,g,e);sa(f,c);e=1}T=c+160|0;if(!e){break a}$a(b,d+40|0);h=1}T=d+128|0;return h}function Bc(a,b,c){var d=0,e=0;d=w[b+4|0]|w[b+5|0]<<8|(w[b+6|0]<<16|w[b+7|0]<<24);e=w[b|0]|w[b+1|0]<<8|(w[b+2|0]<<16|w[b+3|0]<<24);t[a|0]=e;t[a+1|0]=e>>>8;t[a+2|0]=e>>>16;t[a+3|0]=e>>>24;t[a+4|0]=d;t[a+5|0]=d>>>8;t[a+6|0]=d>>>16;t[a+7|0]=d>>>24;d=w[b+28|0]|w[b+29|0]<<8|(w[b+30|0]<<16|w[b+31|0]<<24);e=w[b+24|0]|w[b+25|0]<<8|(w[b+26|0]<<16|w[b+27|0]<<24);t[a+24|0]=e;t[a+25|0]=e>>>8;t[a+26|0]=e>>>16;t[a+27|0]=e>>>24;t[a+28|0]=d;t[a+29|0]=d>>>8;t[a+30|0]=d>>>16;t[a+31|0]=d>>>24;d=w[b+20|0]|w[b+21|0]<<8|(w[b+22|0]<<16|w[b+23|0]<<24);e=w[b+16|0]|w[b+17|0]<<8|(w[b+18|0]<<16|w[b+19|0]<<24);t[a+16|0]=e;t[a+17|0]=e>>>8;t[a+18|0]=e>>>16;t[a+19|0]=e>>>24;t[a+20|0]=d;t[a+21|0]=d>>>8;t[a+22|0]=d>>>16;t[a+23|0]=d>>>24;d=w[b+12|0]|w[b+13|0]<<8|(w[b+14|0]<<16|w[b+15|0]<<24);b=w[b+8|0]|w[b+9|0]<<8|(w[b+10|0]<<16|w[b+11|0]<<24);t[a+8|0]=b;t[a+9|0]=b>>>8;t[a+10|0]=b>>>16;t[a+11|0]=b>>>24;t[a+12|0]=d;t[a+13|0]=d>>>8;t[a+14|0]=d>>>16;t[a+15|0]=d>>>24;b=w[c+4|0]|w[c+5|0]<<8|(w[c+6|0]<<16|w[c+7|0]<<24);d=w[c|0]|w[c+1|0]<<8|(w[c+2|0]<<16|w[c+3|0]<<24);t[a+32|0]=d;t[a+33|0]=d>>>8;t[a+34|0]=d>>>16;t[a+35|0]=d>>>24;t[a+36|0]=b;t[a+37|0]=b>>>8;t[a+38|0]=b>>>16;t[a+39|0]=b>>>24;b=w[c+12|0]|w[c+13|0]<<8|(w[c+14|0]<<16|w[c+15|0]<<24);d=w[c+8|0]|w[c+9|0]<<8|(w[c+10|0]<<16|w[c+11|0]<<24);t[a+40|0]=d;t[a+41|0]=d>>>8;t[a+42|0]=d>>>16;t[a+43|0]=d>>>24;t[a+44|0]=b;t[a+45|0]=b>>>8;t[a+46|0]=b>>>16;t[a+47|0]=b>>>24;b=w[c+20|0]|w[c+21|0]<<8|(w[c+22|0]<<16|w[c+23|0]<<24);d=w[c+16|0]|w[c+17|0]<<8|(w[c+18|0]<<16|w[c+19|0]<<24);t[a+48|0]=d;t[a+49|0]=d>>>8;t[a+50|0]=d>>>16;t[a+51|0]=d>>>24;t[a+52|0]=b;t[a+53|0]=b>>>8;t[a+54|0]=b>>>16;t[a+55|0]=b>>>24;b=w[c+28|0]|w[c+29|0]<<8|(w[c+30|0]<<16|w[c+31|0]<<24);c=w[c+24|0]|w[c+25|0]<<8|(w[c+26|0]<<16|w[c+27|0]<<24);t[a+56|0]=c;t[a+57|0]=c>>>8;t[a+58|0]=c>>>16;t[a+59|0]=c>>>24;t[a+60|0]=b;t[a+61|0]=b>>>8;t[a+62|0]=b>>>16;t[a+63|0]=b>>>24}function Ac(a,b,c){var d=0,e=0;d=w[c+4|0]|w[c+5|0]<<8|(w[c+6|0]<<16|w[c+7|0]<<24);e=w[c|0]|w[c+1|0]<<8|(w[c+2|0]<<16|w[c+3|0]<<24);t[a|0]=e;t[a+1|0]=e>>>8;t[a+2|0]=e>>>16;t[a+3|0]=e>>>24;t[a+4|0]=d;t[a+5|0]=d>>>8;t[a+6|0]=d>>>16;t[a+7|0]=d>>>24;d=w[c+28|0]|w[c+29|0]<<8|(w[c+30|0]<<16|w[c+31|0]<<24);e=w[c+24|0]|w[c+25|0]<<8|(w[c+26|0]<<16|w[c+27|0]<<24);t[a+24|0]=e;t[a+25|0]=e>>>8;t[a+26|0]=e>>>16;t[a+27|0]=e>>>24;t[a+28|0]=d;t[a+29|0]=d>>>8;t[a+30|0]=d>>>16;t[a+31|0]=d>>>24;d=w[c+20|0]|w[c+21|0]<<8|(w[c+22|0]<<16|w[c+23|0]<<24);e=w[c+16|0]|w[c+17|0]<<8|(w[c+18|0]<<16|w[c+19|0]<<24);t[a+16|0]=e;t[a+17|0]=e>>>8;t[a+18|0]=e>>>16;t[a+19|0]=e>>>24;t[a+20|0]=d;t[a+21|0]=d>>>8;t[a+22|0]=d>>>16;t[a+23|0]=d>>>24;d=w[c+12|0]|w[c+13|0]<<8|(w[c+14|0]<<16|w[c+15|0]<<24);e=w[c+8|0]|w[c+9|0]<<8|(w[c+10|0]<<16|w[c+11|0]<<24);t[a+8|0]=e;t[a+9|0]=e>>>8;t[a+10|0]=e>>>16;t[a+11|0]=e>>>24;t[a+12|0]=d;t[a+13|0]=d>>>8;t[a+14|0]=d>>>16;t[a+15|0]=d>>>24;a=w[c+60|0]|w[c+61|0]<<8|(w[c+62|0]<<16|w[c+63|0]<<24);d=w[c+56|0]|w[c+57|0]<<8|(w[c+58|0]<<16|w[c+59|0]<<24);t[b+24|0]=d;t[b+25|0]=d>>>8;t[b+26|0]=d>>>16;t[b+27|0]=d>>>24;t[b+28|0]=a;t[b+29|0]=a>>>8;t[b+30|0]=a>>>16;t[b+31|0]=a>>>24;a=w[c+52|0]|w[c+53|0]<<8|(w[c+54|0]<<16|w[c+55|0]<<24);d=w[c+48|0]|w[c+49|0]<<8|(w[c+50|0]<<16|w[c+51|0]<<24);t[b+16|0]=d;t[b+17|0]=d>>>8;t[b+18|0]=d>>>16;t[b+19|0]=d>>>24;t[b+20|0]=a;t[b+21|0]=a>>>8;t[b+22|0]=a>>>16;t[b+23|0]=a>>>24;a=w[c+44|0]|w[c+45|0]<<8|(w[c+46|0]<<16|w[c+47|0]<<24);d=w[c+40|0]|w[c+41|0]<<8|(w[c+42|0]<<16|w[c+43|0]<<24);t[b+8|0]=d;t[b+9|0]=d>>>8;t[b+10|0]=d>>>16;t[b+11|0]=d>>>24;t[b+12|0]=a;t[b+13|0]=a>>>8;t[b+14|0]=a>>>16;t[b+15|0]=a>>>24;a=w[c+36|0]|w[c+37|0]<<8|(w[c+38|0]<<16|w[c+39|0]<<24);c=w[c+32|0]|w[c+33|0]<<8|(w[c+34|0]<<16|w[c+35|0]<<24);t[b|0]=c;t[b+1|0]=c>>>8;t[b+2|0]=c>>>16;t[b+3|0]=c>>>24;t[b+4|0]=a;t[b+5|0]=a>>>8;t[b+6|0]=a>>>16;t[b+7|0]=a>>>24}function yc(a,b,c){var d=0,e=0,f=0,g=0;d=T-304|0;T=d;Ga(d+176|0,c,0);f=v[d+212>>2];v[d+32>>2]=v[d+208>>2];v[d+36>>2]=f;f=v[d+204>>2];v[d+24>>2]=v[d+200>>2];v[d+28>>2]=f;f=v[d+196>>2];v[d+16>>2]=v[d+192>>2];v[d+20>>2]=f;f=v[d+188>>2];v[d+8>>2]=v[d+184>>2];v[d+12>>2]=f;f=v[d+228>>2];v[d+48>>2]=v[d+224>>2];v[d+52>>2]=f;f=v[d+236>>2];v[d+56>>2]=v[d+232>>2];v[d+60>>2]=f;e=v[d+244>>2];f=d- -64|0;v[f>>2]=v[d+240>>2];v[f+4>>2]=e;f=v[d+252>>2];v[d+72>>2]=v[d+248>>2];v[d+76>>2]=f;f=v[d+180>>2];v[d>>2]=v[d+176>>2];v[d+4>>2]=f;f=v[d+220>>2];v[d+40>>2]=v[d+216>>2];v[d+44>>2]=f;v[d+80>>2]=0;f=d+256|0;rb(d+88|0,c,f);e=v[d+124>>2];v[a+32>>2]=v[d+120>>2];v[a+36>>2]=e;e=v[d+116>>2];v[a+24>>2]=v[d+112>>2];v[a+28>>2]=e;e=v[d+108>>2];v[a+16>>2]=v[d+104>>2];v[a+20>>2]=e;e=v[d+100>>2];v[a+8>>2]=v[d+96>>2];v[a+12>>2]=e;e=v[d+92>>2];v[a>>2]=v[d+88>>2];v[a+4>>2]=e;e=v[d+132>>2];v[a+40>>2]=v[d+128>>2];v[a+44>>2]=e;e=v[d+140>>2];v[a+48>>2]=v[d+136>>2];v[a+52>>2]=e;e=v[d+148>>2];v[a+56>>2]=v[d+144>>2];v[a+60>>2]=e;g=v[d+156>>2];e=a- -64|0;v[e>>2]=v[d+152>>2];v[e+4>>2]=g;e=v[d+164>>2];v[a+72>>2]=v[d+160>>2];v[a+76>>2]=e;e=v[c+92>>2];v[a+88>>2]=v[c+88>>2];v[a+92>>2]=e;e=v[c+100>>2];v[a+96>>2]=v[c+96>>2];v[a+100>>2]=e;e=v[c+108>>2];v[a+104>>2]=v[c+104>>2];v[a+108>>2]=e;e=v[c+116>>2];v[a+112>>2]=v[c+112>>2];v[a+116>>2]=e;e=v[c+84>>2];c=v[c+80>>2];v[a+120>>2]=0;v[a+80>>2]=c;v[a+84>>2]=e;c=v[d+292>>2];v[b+32>>2]=v[d+288>>2];v[b+36>>2]=c;c=v[d+284>>2];v[b+24>>2]=v[d+280>>2];v[b+28>>2]=c;c=v[d+276>>2];v[b+16>>2]=v[d+272>>2];v[b+20>>2]=c;c=v[d+268>>2];v[b+8>>2]=v[d+264>>2];v[b+12>>2]=c;c=v[d+260>>2];v[b>>2]=v[d+256>>2];v[b+4>>2]=c;c=a+128|0;Ha(c,a,d,b+40|0);e=a+256|0;Ha(e,c,d,b+80|0);c=a+384|0;Ha(c,e,d,b+120|0);e=a+512|0;Ha(e,c,d,b+160|0);c=a+640|0;Ha(c,e,d,b+200|0);e=a+768|0;Ha(e,c,d,b+240|0);Ha(a+896|0,e,d,b+280|0);a=a+976|0;ha(a,a,f);T=d+304|0}function we(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0;g=T-16|0;T=g;a:{if((c|0)!=32){break a}v[1328]=0;e=$b(d,g+12|0);f=U;c=v[g+12>>2];if((c|0)==(d|0)|w[c|0]){break a}b:{switch(w[d|0]-43|0){case 0:case 2:break a;default:break b}}if((e&f)==-1){e=-1;f=-1;if(v[1328]==68){break a}}d=v[1325];c=T-400|0;T=c;v[c+188>>2]=33;c:{if(!a){ia(v[d+176>>2],v[d+180>>2],1680);break c}if(!b){ia(v[d+176>>2],v[d+180>>2],1821);break c}Aa(c+296|0);if((Pc(d,c+232|0,b,e,f)|0)!=1){break c}if((Vb(d,c+192|0,c+232|0)|0)!=1){break c}ma(c+296|0,c+192|0,33);e=w[1084]|w[1085]<<8|(w[1086]<<16|w[1087]<<24);v[c+96>>2]=w[1080]|w[1081]<<8|(w[1082]<<16|w[1083]<<24);v[c+100>>2]=e;e=w[1076]|w[1077]<<8|(w[1078]<<16|w[1079]<<24);v[c+88>>2]=w[1072]|w[1073]<<8|(w[1074]<<16|w[1075]<<24);v[c+92>>2]=e;e=w[1068]|w[1069]<<8|(w[1070]<<16|w[1071]<<24);v[c+80>>2]=w[1064]|w[1065]<<8|(w[1066]<<16|w[1067]<<24);v[c+84>>2]=e;e=w[1060]|w[1061]<<8|(w[1062]<<16|w[1063]<<24);v[c+72>>2]=w[1056]|w[1057]<<8|(w[1058]<<16|w[1059]<<24);v[c+76>>2]=e;f=w[1052]|w[1053]<<8|(w[1054]<<16|w[1055]<<24);e=c- -64|0;v[e>>2]=w[1048]|w[1049]<<8|(w[1050]<<16|w[1051]<<24);v[e+4>>2]=f;e=w[1044]|w[1045]<<8|(w[1046]<<16|w[1047]<<24);v[c+56>>2]=w[1040]|w[1041]<<8|(w[1042]<<16|w[1043]<<24);v[c+60>>2]=e;e=w[1036]|w[1037]<<8|(w[1038]<<16|w[1039]<<24);v[c+48>>2]=w[1032]|w[1033]<<8|(w[1034]<<16|w[1035]<<24);v[c+52>>2]=e;e=w[1028]|w[1029]<<8|(w[1030]<<16|w[1031]<<24);v[c+40>>2]=w[1024]|w[1025]<<8|(w[1026]<<16|w[1027]<<24);v[c+44>>2]=e;if((Oc(d,c+40|0,b)|0)!=1){break c}if((Ya(d,c+192|0,c+188|0,c+40|0,258)|0)!=1){break c}d=c+296|0;ma(d,c+192|0,v[c+188>>2]);e=d;d=c+144|0;za(e,d);la(c+104|0,d,c+140|0);if(v[c+140>>2]){ta(c+104|0);break c}la(c+8|0,b,c+140|0);if(v[c+140>>2]){ta(c+104|0);ta(c+8|0);break c}b=c+104|0;d=c+8|0;oa(b,b,d);ua(a,b);ta(b);ta(d);h=1}T=c+400|0}T=g+16|0;return h|0}function Ic(a,b){var c=0,d=0,e=0,f=0;c=T-384|0;T=c;v[c+56>>2]=0;v[c+60>>2]=0;v[c+48>>2]=0;v[c+52>>2]=0;v[c+40>>2]=0;v[c+44>>2]=0;d=32;v[c+32>>2]=0;v[c+36>>2]=0;v[c+24>>2]=0;v[c+28>>2]=0;v[c+16>>2]=0;v[c+20>>2]=0;v[c+8>>2]=0;v[c+12>>2]=0;v[c>>2]=0;v[c+4>>2]=0;a:{if(!b){b=a+40|0;Oa(b,3472);sb(b,b);e=a+8|0;ya(e,1);ua(c+144|0,e);b=v[c+172>>2];v[c+24>>2]=v[c+168>>2];v[c+28>>2]=b;b=v[c+164>>2];v[c+16>>2]=v[c+160>>2];v[c+20>>2]=b;b=v[c+156>>2];v[c+8>>2]=v[c+152>>2];v[c+12>>2]=b;b=v[c+148>>2];v[c>>2]=v[c+144>>2];v[c+4>>2]=b;break a}e=a+8|0;ua(c+144|0,e);d=v[c+172>>2];v[c+24>>2]=v[c+168>>2];v[c+28>>2]=d;d=v[c+164>>2];v[c+16>>2]=v[c+160>>2];v[c+20>>2]=d;d=v[c+156>>2];v[c+8>>2]=v[c+152>>2];v[c+12>>2]=d;d=v[c+148>>2];v[c>>2]=v[c+144>>2];v[c+4>>2]=d;d=w[b+12|0]|w[b+13|0]<<8|(w[b+14|0]<<16|w[b+15|0]<<24);v[c+40>>2]=w[b+8|0]|w[b+9|0]<<8|(w[b+10|0]<<16|w[b+11|0]<<24);v[c+44>>2]=d;d=w[b+20|0]|w[b+21|0]<<8|(w[b+22|0]<<16|w[b+23|0]<<24);v[c+48>>2]=w[b+16|0]|w[b+17|0]<<8|(w[b+18|0]<<16|w[b+19|0]<<24);v[c+52>>2]=d;d=w[b+28|0]|w[b+29|0]<<8|(w[b+30|0]<<16|w[b+31|0]<<24);v[c+56>>2]=w[b+24|0]|w[b+25|0]<<8|(w[b+26|0]<<16|w[b+27|0]<<24);v[c+60>>2]=d;d=w[b+4|0]|w[b+5|0]<<8|(w[b+6|0]<<16|w[b+7|0]<<24);v[c+32>>2]=w[b|0]|w[b+1|0]<<8|(w[b+2|0]<<16|w[b+3|0]<<24);v[c+36>>2]=d;d=64}Pb(c+72|0,c,d);while(1){b=c+144|0;Ob(c+72|0,b);d=c+184|0;b=Ka(d,b);b=Fd(d)|!b;v[c+68>>2]=b;if(b){continue}break}b=a+40|0;Ed(b,c+184|0);while(1){d=c+144|0;Ob(c+72|0,d);f=c+352|0;la(f,d,c+68|0);d=v[c+68>>2]|pa(f);v[c+68>>2]=d;if(d){continue}break}f=a;d=c+224|0;a=c+352|0;Mb(f,d,a);va(a,a);a=v[c+380>>2];v[e+24>>2]=v[c+376>>2];v[e+28>>2]=a;a=v[c+372>>2];v[e+16>>2]=v[c+368>>2];v[e+20>>2]=a;a=v[c+364>>2];v[e+8>>2]=v[c+360>>2];v[e+12>>2]=a;a=v[c+356>>2];v[e>>2]=v[c+352>>2];v[e+4>>2]=a;na(b,d,128);T=c+384|0}function sd(a,b,c,d){var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;e=T-480|0;T=e;a:{if(v[c+80>>2]){na(a,b,128);break a}if(v[b+120>>2]){v[a+120>>2]=0;f=e+440|0;ea(f,d);b=e+400|0;ha(b,f,d);ha(a,c,f);ha(a+40|0,c+40|0,b);bb(a+80|0,1);break a}v[a+120>>2]=0;k=e+440|0;f=b+80|0;ha(k,f,d);l=e+400|0;ea(l,k);d=v[b+36>>2];v[e+392>>2]=v[b+32>>2];v[e+396>>2]=d;d=v[b+28>>2];v[e+384>>2]=v[b+24>>2];v[e+388>>2]=d;d=v[b+20>>2];v[e+376>>2]=v[b+16>>2];v[e+380>>2]=d;d=v[b+12>>2];v[e+368>>2]=v[b+8>>2];v[e+372>>2]=d;d=v[b+4>>2];v[e+360>>2]=v[b>>2];v[e+364>>2]=d;g=e+360|0;Ca(g);i=e+320|0;ha(i,c,l);d=v[b+76>>2];v[e+312>>2]=v[b+72>>2];v[e+316>>2]=d;h=b- -64|0;d=v[h+4>>2];v[e+304>>2]=v[h>>2];v[e+308>>2]=d;d=v[b+60>>2];v[e+296>>2]=v[b+56>>2];v[e+300>>2]=d;d=v[b+52>>2];v[e+288>>2]=v[b+48>>2];v[e+292>>2]=d;d=v[b+44>>2];v[e+280>>2]=v[b+40>>2];v[e+284>>2]=d;d=e+280|0;Ca(d);j=e+240|0;ha(j,c+40|0,l);ha(j,j,k);h=e+200|0;ra(h,g,1);qa(h,i);c=e+160|0;ra(c,d,1);qa(c,j);if(qb(h)){if(qb(e+160|0)){Ga(a,b,0);break a}v[a+120>>2]=1;break a}d=e+120|0;c=e+160|0;ea(d,c);i=e+80|0;h=e+200|0;ea(i,h);g=e+40|0;ha(g,h,i);b=v[f+36>>2];v[a+112>>2]=v[f+32>>2];v[a+116>>2]=b;b=v[f+28>>2];v[a+104>>2]=v[f+24>>2];v[a+108>>2]=b;b=v[f+20>>2];v[a+96>>2]=v[f+16>>2];v[a+100>>2]=b;b=v[f+12>>2];v[a+88>>2]=v[f+8>>2];v[a+92>>2]=b;b=v[f+4>>2];v[a+80>>2]=v[f>>2];v[a+84>>2]=b;b=a+80|0;ha(b,b,h);ha(e,e+360|0,i);b=v[e+36>>2];v[a+32>>2]=v[e+32>>2];v[a+36>>2]=b;b=v[e+28>>2];v[a+24>>2]=v[e+24>>2];v[a+28>>2]=b;b=v[e+20>>2];v[a+16>>2]=v[e+16>>2];v[a+20>>2]=b;b=v[e+12>>2];v[a+8>>2]=v[e+8>>2];v[a+12>>2]=b;b=v[e+4>>2];v[a>>2]=v[e>>2];v[a+4>>2]=b;Ma(a,2);qa(a,g);ra(a,a,3);qa(a,d);b=a+40|0;ra(b,a,5);qa(b,e);ha(b,b,c);ha(g,g,e+280|0);ra(g,g,1);qa(b,g)}T=e+480|0}function Ha(a,b,c,d){var e=0,f=0,g=0,h=0,i=0,j=0,k=0;e=T-448|0;T=e;a:{if(v[b+120>>2]){Oa(a,c);break a}if(v[c+80>>2]){if(d){bb(d,1)}na(a,b,128);break a}v[a+120>>2]=0;g=e+408|0;i=b+80|0;ea(g,i);f=v[b+36>>2];v[e+400>>2]=v[b+32>>2];v[e+404>>2]=f;f=v[b+28>>2];v[e+392>>2]=v[b+24>>2];v[e+396>>2]=f;f=v[b+20>>2];v[e+384>>2]=v[b+16>>2];v[e+388>>2]=f;f=v[b+12>>2];v[e+376>>2]=v[b+8>>2];v[e+380>>2]=f;f=v[b+4>>2];v[e+368>>2]=v[b>>2];v[e+372>>2]=f;j=e+368|0;Ca(j);k=e+328|0;ha(k,c,g);f=v[b+76>>2];v[e+320>>2]=v[b+72>>2];v[e+324>>2]=f;f=b- -64|0;h=v[f+4>>2];v[e+312>>2]=v[f>>2];v[e+316>>2]=h;f=v[b+60>>2];v[e+304>>2]=v[b+56>>2];v[e+308>>2]=f;f=v[b+52>>2];v[e+296>>2]=v[b+48>>2];v[e+300>>2]=f;f=v[b+44>>2];v[e+288>>2]=v[b+40>>2];v[e+292>>2]=f;h=e+288|0;Ca(h);f=e+248|0;ha(f,c+40|0,g);ha(f,f,i);c=e+208|0;ra(c,j,1);qa(c,k);g=e+168|0;ra(g,h,1);qa(g,f);if(qb(c)){if(qb(e+168|0)){Ga(a,b,d);break a}if(d){bb(d,0)}v[a+120>>2]=1;break a}ea(e+128|0,e+168|0);b=e+88|0;c=e+208|0;ea(b,c);ha(e+48|0,c,b);if(d){b=v[e+212>>2];v[d>>2]=v[e+208>>2];v[d+4>>2]=b;b=v[e+244>>2];v[d+32>>2]=v[e+240>>2];v[d+36>>2]=b;b=v[e+236>>2];v[d+24>>2]=v[e+232>>2];v[d+28>>2]=b;b=v[e+228>>2];v[d+16>>2]=v[e+224>>2];v[d+20>>2]=b;b=v[e+220>>2];v[d+8>>2]=v[e+216>>2];v[d+12>>2]=b}ha(a+80|0,i,e+208|0);d=e+8|0;ha(d,e+368|0,e+88|0);b=v[e+44>>2];v[a+32>>2]=v[e+40>>2];v[a+36>>2]=b;b=v[e+36>>2];v[a+24>>2]=v[e+32>>2];v[a+28>>2]=b;b=v[e+28>>2];v[a+16>>2]=v[e+24>>2];v[a+20>>2]=b;b=v[e+20>>2];v[a+8>>2]=v[e+16>>2];v[a+12>>2]=b;b=v[e+12>>2];v[a>>2]=v[e+8>>2];v[a+4>>2]=b;Ma(a,2);b=e+48|0;qa(a,b);ra(a,a,3);qa(a,e+128|0);c=a+40|0;ra(c,a,5);qa(c,d);ha(c,c,e+168|0);ha(b,b,e+288|0);ra(b,b,1);qa(c,b)}T=e+448|0}function le(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;g=T-112|0;T=g;j=kc(g+96|0,d);k=Nb(g+80|0,d);a:{while(1){if((d|0)!=(e|0)){h=(e<<2)+c|0;f=0;if(!Ea(v[1325],fb(v[j>>2],e),b+i|0,v[h>>2])){break a}f=v[h>>2];h=fb(v[j>>2],e);m=Hb(v[k>>2],e),n=h,v[m>>2]=n;e=e+1|0;i=i+f|0;continue}break}c=v[1325];f=v[k>>2];i=0;e=T-224|0;T=e;b=g+16|0;b:{if(!b){ia(v[c+176>>2],v[c+180>>2],1804);c=0;break b}t[b|0]=0;t[b+1|0]=0;t[b+2|0]=0;t[b+3|0]=0;t[b+4|0]=0;t[b+5|0]=0;t[b+6|0]=0;t[b+7|0]=0;t[b+56|0]=0;t[b+57|0]=0;t[b+58|0]=0;t[b+59|0]=0;t[b+60|0]=0;t[b+61|0]=0;t[b+62|0]=0;t[b+63|0]=0;t[b+48|0]=0;t[b+49|0]=0;t[b+50|0]=0;t[b+51|0]=0;t[b+52|0]=0;t[b+53|0]=0;t[b+54|0]=0;t[b+55|0]=0;t[b+40|0]=0;t[b+41|0]=0;t[b+42|0]=0;t[b+43|0]=0;t[b+44|0]=0;t[b+45|0]=0;t[b+46|0]=0;t[b+47|0]=0;t[b+32|0]=0;t[b+33|0]=0;t[b+34|0]=0;t[b+35|0]=0;t[b+36|0]=0;t[b+37|0]=0;t[b+38|0]=0;t[b+39|0]=0;t[b+24|0]=0;t[b+25|0]=0;t[b+26|0]=0;t[b+27|0]=0;t[b+28|0]=0;t[b+29|0]=0;t[b+30|0]=0;t[b+31|0]=0;t[b+16|0]=0;t[b+17|0]=0;t[b+18|0]=0;t[b+19|0]=0;t[b+20|0]=0;t[b+21|0]=0;t[b+22|0]=0;t[b+23|0]=0;t[b+8|0]=0;t[b+9|0]=0;t[b+10|0]=0;t[b+11|0]=0;t[b+12|0]=0;t[b+13|0]=0;t[b+14|0]=0;t[b+15|0]=0;if(!d){ia(v[c+176>>2],v[c+180>>2],1961);c=0;break b}if(!f){ia(v[c+176>>2],v[c+180>>2],1541);c=0;break b}Ta(e+96|0);while(1){h=e+8|0;Ua(c,h,v[f+(i<<2)>>2]);l=e+96|0;Ja(l,l,h);i=i+1|0;if((i|0)!=(d|0)){continue}break}c=0;if(v[e+216>>2]){break b}c=e+8|0;sa(c,e+96|0);$a(b,c);c=1}T=e+224|0;f=0;if(!c){break a}v[g+12>>2]=33;f=(Ya(v[1325],a,g+12|0,g+16|0,258)|0)!=0}db(k);db(j);T=g+112|0;return f|0}function Rc(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var q=0,r=0,s=0,t=0;s=T-224|0;T=s;a:{if(!b){ia(v[a+176>>2],v[a+180>>2],1701);break a}if(!c){ia(v[a+176>>2],v[a+180>>2],1515);break a}if(y[c>>2]<=127){ia(v[a+176>>2],v[a+180>>2],1147);break a}b:{q=(d|0)!=0&(e|0)!=0;if(!(k?1:!j|!q|(f|h)|g)){break b}r=!(d|e);if(!(m?!j|!r|(!g|f)|(!h|!k):1)){break b}t=r;r=(f|0)!=0;if(!(m?!k|(!j|!(t&r)|(!g|!h)):1)){break b}q=q&r&(g|0)!=0&(h|0)!=0&(k|0)!=0;if(!(m?!j|!q:1)|q&!(j|m)){break b}ia(v[a+176>>2],v[a+180>>2],2231);q=0;break a}if(!i){ia(v[a+176>>2],v[a+180>>2],1755);q=0;break a}if(!l){ia(v[a+176>>2],v[a+180>>2],1807);q=0;break a}if(!(!o|n)){ia(v[a+176>>2],v[a+180>>2],1968);q=0;break a}if(!Qa(v[a>>2])){ia(v[a+176>>2],v[a+180>>2],2014);q=0;break a}if(!Qa(v[a+8>>2])){ia(v[a+176>>2],v[a+180>>2],2066);q=0;break a}q=0;if(!kb(b,120,2)){break a}t=wa(b,88);r=wa(b,32);lb(s+136|0,3402);c:{d:{e:{if(!k){if(!j){break e}la(r,v[j>>2],s+8|0);if(v[s+8>>2]){break c}if(pa(r)){break c}j=s+8|0;wc(j,r,v[i>>2],v[i+4>>2],s+136|0,v[c+8>>2]);sa(t,j);break d}if(j){la(r,v[j>>2],s+8|0);if(v[s+8>>2]){break c}if(pa(r)){break c}mb(t,v[k>>2]);break d}mb(t,v[k>>2]);break d}j=s+8|0;wc(j,r,v[i>>2],v[i+4>>2],s+136|0,v[c+8>>2]);sa(t,j)}k=m?m:l;if(!g){q=uc(a,b,d,e,f,0,i,r,t,s+136|0,c,l,k,n,o,p);break c}j=Zb(176);if(!j){break c}if(f){if(!Ua(a,j,g)){break c}if(!Ua(a,j+88|0,h)){break c}q=uc(a,b,d,e,f,j,i,r,t,s+136|0,c,l,k,n,o,p);break c}q=uc(a,b,d,e,0,j,i,r,t,s+136|0,c,l,k,n,o,p);$a(g,j);$a(h,j+88|0)}Na(b)}T=s+224|0;return q}function Ea(a,b,c,d){var e=0,f=0,g=0;g=T-96|0;T=g;a:{if(!b){ia(v[a+176>>2],v[a+180>>2],1390);a=0;break a}t[b|0]=0;t[b+1|0]=0;t[b+2|0]=0;t[b+3|0]=0;t[b+4|0]=0;t[b+5|0]=0;t[b+6|0]=0;t[b+7|0]=0;t[b+56|0]=0;t[b+57|0]=0;t[b+58|0]=0;t[b+59|0]=0;t[b+60|0]=0;t[b+61|0]=0;t[b+62|0]=0;t[b+63|0]=0;t[b+48|0]=0;t[b+49|0]=0;t[b+50|0]=0;t[b+51|0]=0;t[b+52|0]=0;t[b+53|0]=0;t[b+54|0]=0;t[b+55|0]=0;t[b+40|0]=0;t[b+41|0]=0;t[b+42|0]=0;t[b+43|0]=0;t[b+44|0]=0;t[b+45|0]=0;t[b+46|0]=0;t[b+47|0]=0;t[b+32|0]=0;t[b+33|0]=0;t[b+34|0]=0;t[b+35|0]=0;t[b+36|0]=0;t[b+37|0]=0;t[b+38|0]=0;t[b+39|0]=0;t[b+24|0]=0;t[b+25|0]=0;t[b+26|0]=0;t[b+27|0]=0;t[b+28|0]=0;t[b+29|0]=0;t[b+30|0]=0;t[b+31|0]=0;t[b+16|0]=0;t[b+17|0]=0;t[b+18|0]=0;t[b+19|0]=0;t[b+20|0]=0;t[b+21|0]=0;t[b+22|0]=0;t[b+23|0]=0;t[b+8|0]=0;t[b+9|0]=0;t[b+10|0]=0;t[b+11|0]=0;t[b+12|0]=0;t[b+13|0]=0;t[b+14|0]=0;t[b+15|0]=0;if(!c){ia(v[a+176>>2],v[a+180>>2],1420);a=0;break a}e=g+8|0;a=T-80|0;T=a;b:{if((d|0)!=65){if((d|0)!=33){break b}d=w[c|0];if((d&254)!=2){break b}if(!Ka(a+40|0,c+1|0)){break b}f=(Jc(e,a+40|0,(d|0)==3)|0)!=0;break b}d=w[c|0];if(d>>>0>7|!(1<<d&208)){break b}if(!Ka(a+40|0,c+1|0)){break b}if(!Ka(a,c+33|0)){break b}Bd(e,a+40|0,a);c=w[c|0];if((c&254)==6){if((Qb(v[a>>2])|0)!=((c|0)==7|0)){break b}}c=0;d=T-128|0;T=d;if(!v[e+80>>2]){f=d+88|0;ea(f,e+40|0);c=d+48|0;ea(c,e);ha(c,c,e);e=d+8|0;bb(e,7);qa(c,e);Ca(c);c=Cc(f,c)}T=d+128|0;f=c}T=a+80|0;a=0;if(!f){break a}$a(b,g+8|0);a=1}T=g+96|0;return a}function fe(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;o=o|0;var p=0,q=0;p=T-256|0;T=p;a:{if((c|0)!=32){break a}if(!cb(d,e)|((f|0)!=0&(g|0)!=32|(o|0)!=32)){break a}if(j){if(!Ea(v[1325],p+192|0,j,k)){break a}if(eb(p+192|0,32)){break a}}if(l){if(!Ea(v[1325],p+128|0,l,m)){break a}if(eb(p+128|0,32)){break a}}if(!Ea(v[1325],p- -64|0,h,i)){break a}if(eb(p- -64|0,32)){break a}c=j?p+192|0:0;i=l?p+128|0:0;h=p- -64|0;j=T-688|0;T=j;e=v[1325];b:{if(!Qa(v[e+8>>2])){ia(v[e+176>>2],v[e+180>>2],2066);g=0;break b}if(!p){ia(v[e+176>>2],v[e+180>>2],1897);g=0;break b}if(!b){ia(v[e+176>>2],v[e+180>>2],1928);g=0;break b}if(!d){ia(v[e+176>>2],v[e+180>>2],1911);g=0;break b}if(!n){ia(v[e+176>>2],v[e+180>>2],1835);g=0;break b}c:{if(!f){f=j+192|0;Pb(f,n,32);g=0;if(!bd(e,j+96|0,j+320|0,f)){break b}Xa(j+192|0,0,68);sa(j+536|0,j+320|0);break c}g=j+96|0;la(g,f,j);f=j+320|0;Mb(e+8|0,f,g);sa(j+536|0,f);if(i){g=j+192|0;Ta(g);f=j+448|0;Ua(e,f,i);Ja(g,g,f);if(Cb(g)){break c}f=j+96|0;va(f,f);break c}if(Cb(j+320|0)){break c}f=j+96|0;va(f,f);f=j+320|0;sb(f,f);f=j+536|0;Ia(f,f)}Wa(j+536|0);f=j+656|0;if(!c){c=j+128|0;$a(c,j+536|0)}ad(e,f,c,h,b);la(j+624|0,d,j+4|0);if(v[j+4>>2]){ta(j+624|0);g=0;break b}c=j+624|0;ga(c,c,j+656|0);oa(c,c,j+96|0);b=j+8|0;sa(b,j+320|0);Ra(b);La(p,b);ua(p+32|0,c);ta(c);g=1}T=j+688|0;if(!g){break a}q=(fc(v[1325],a,p)|0)!=0}T=p+256|0;return q|0}function xc(a,b,c){var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;i=T-32|0;T=i;j=Gb(b);e=nd(v[b>>2]);va(i,b);t=j^!e;u=!(v[i+24>>2]|(v[i+16>>2]|(v[i+8>>2]|v[i>>2]^1))|(v[i+28>>2]|(v[i+20>>2]|(v[i+12>>2]|v[i+4>>2]))));qd(b,t,!u);k=j?-801750718:0;g=j?-1:0;d=g^v[b>>2];h=k+d|0;l=j?-1076732276:0;e=l+(v[b+4>>2]^g)|0;e=d>>>0>h>>>0?e+1|0:e;f=h;d=pa(b);o=d?0:-1;v[b>>2]=f&o;p=d?0:-1;v[b+4>>2]=p&e;s=j?-1162945306:0;d=s+(g^v[b+12>>2])|0;m=j?-1354194885:0;h=g^v[b+8>>2];n=m+h|0;q=n;e=(e|0)==(l|0)&f>>>0<k>>>0|e>>>0<l>>>0;f=n+e|0;d=h>>>0>n>>>0?d+1|0:d;k=f;v[b+8>>2]=o&f;f=e>>>0>f>>>0?d+1|0:d;v[b+12>>2]=p&f;n=j?-2:0;h=g^v[b+16>>2];r=n+h|0;l=j?-1:0;e=l+(g^v[b+20>>2])|0;e=h>>>0>r>>>0?e+1|0:e;h=(d|0)==(s|0)&m>>>0>q>>>0|d>>>0<s>>>0;d=(d|0)==(f|0)&k>>>0<q>>>0|d>>>0>f>>>0;f=h+d|0;m=0;m=d>>>0>f>>>0?1:m;k=f+r|0;d=e+m|0;d=f>>>0>k>>>0?d+1|0:d;v[b+16>>2]=o&k;f=d;v[b+20>>2]=p&d;d=g;g=d+(d^v[b+24>>2])|0;h=d+(d^v[b+28>>2])|0;h=d>>>0>g>>>0?h+1|0:h;d=h;h=g;f=(e|0)==(f|0)&k>>>0<r>>>0|e>>>0>f>>>0;g=f+((e|0)==(l|0)&r>>>0<n>>>0|e>>>0<l>>>0)|0;e=0;e=f>>>0>g>>>0?1:e;f=g;g=h+f|0;d=e+d|0;v[b+24>>2]=g&o;v[b+28>>2]=p&(f>>>0>g>>>0?d+1|0:d);e=j?-1:1;f=u?0-e|0:e;h=c-1>>>2|0;c=md(b);g=0;while(1){q=c;d=md(b);e=(d^-1)&1;c=(c|0)<=0?0-e|0:e;v[(g<<2)+a>>2]=B(f,q-(c<<4)|0);c=c+d|0;e=(h|0)!=(g|0);g=g+1|0;if(e){continue}break}v[((h<<2)+a|0)+4>>2]=B(c,f);T=i+32|0;return 1<<t}function la(a,b,c){var d=0,e=0,f=0,g=0,h=0;d=w[b+24|0]|w[b+25|0]<<8|(w[b+26|0]<<16|w[b+27|0]<<24);g=d<<24|d<<8&16711680;f=e;e=w[b+28|0]|w[b+29|0]<<8|(w[b+30|0]<<16|w[b+31|0]<<24);h=e<<24|d>>>8;v[a>>2]=f|(((e&255)<<24|d>>>8)&-16777216|((e&16777215)<<8|d>>>24)&16711680|(e>>>8&65280|e>>>24));e=h&65280|(e<<8|d>>>24)&255|g;d=0;v[a+4>>2]=e|(0|(d|d));e=0;d=w[b+16|0]|w[b+17|0]<<8|(w[b+18|0]<<16|w[b+19|0]<<24);g=d<<24|d<<8&16711680;f=e;e=w[b+20|0]|w[b+21|0]<<8|(w[b+22|0]<<16|w[b+23|0]<<24);h=e<<24|d>>>8;v[a+8>>2]=f|(((e&255)<<24|d>>>8)&-16777216|((e&16777215)<<8|d>>>24)&16711680|(e>>>8&65280|e>>>24));e=h&65280|(e<<8|d>>>24)&255|g;d=0;v[a+12>>2]=e|(d|d|f);e=0;d=w[b+8|0]|w[b+9|0]<<8|(w[b+10|0]<<16|w[b+11|0]<<24);g=d<<24|d<<8&16711680;f=e;e=w[b+12|0]|w[b+13|0]<<8|(w[b+14|0]<<16|w[b+15|0]<<24);h=e<<24|d>>>8;v[a+16>>2]=f|(((e&255)<<24|d>>>8)&-16777216|((e&16777215)<<8|d>>>24)&16711680|(e>>>8&65280|e>>>24));e=h&65280|(e<<8|d>>>24)&255|g;g=f;d=0;v[a+20>>2]=e|(f|(d|d));e=w[b|0]|w[b+1|0]<<8|(w[b+2|0]<<16|w[b+3|0]<<24);b=w[b+4|0]|w[b+5|0]<<8|(w[b+6|0]<<16|w[b+7|0]<<24);f=e;h=e<<8;e=h&16711680|e<<24;h=b<<24|f>>>8;g=d;d=f;v[a+24>>2]=g|(((b&255)<<24|d>>>8)&-16777216|((b&16777215)<<8|d>>>24)&16711680|(b>>>8&65280|b>>>24));b=h&65280|(b<<8|d>>>24)&255|e;d=0;v[a+28>>2]=b|(d|d|g);a=Ec(a,Lb(a));if(c){v[c>>2]=a}}function Xd(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0;f=T-80|0;T=f;a:{if(!cb(b,c)){break a}d=v[1325];e=T-256|0;T=e;c=f+16|0;b:{if(!c){ia(v[d+176>>2],v[d+180>>2],1390);b=0;break b}t[c|0]=0;t[c+1|0]=0;t[c+2|0]=0;t[c+3|0]=0;t[c+4|0]=0;t[c+5|0]=0;t[c+6|0]=0;t[c+7|0]=0;t[c+56|0]=0;t[c+57|0]=0;t[c+58|0]=0;t[c+59|0]=0;t[c+60|0]=0;t[c+61|0]=0;t[c+62|0]=0;t[c+63|0]=0;t[c+48|0]=0;t[c+49|0]=0;t[c+50|0]=0;t[c+51|0]=0;t[c+52|0]=0;t[c+53|0]=0;t[c+54|0]=0;t[c+55|0]=0;t[c+40|0]=0;t[c+41|0]=0;t[c+42|0]=0;t[c+43|0]=0;t[c+44|0]=0;t[c+45|0]=0;t[c+46|0]=0;t[c+47|0]=0;t[c+32|0]=0;t[c+33|0]=0;t[c+34|0]=0;t[c+35|0]=0;t[c+36|0]=0;t[c+37|0]=0;t[c+38|0]=0;t[c+39|0]=0;t[c+24|0]=0;t[c+25|0]=0;t[c+26|0]=0;t[c+27|0]=0;t[c+28|0]=0;t[c+29|0]=0;t[c+30|0]=0;t[c+31|0]=0;t[c+16|0]=0;t[c+17|0]=0;t[c+18|0]=0;t[c+19|0]=0;t[c+20|0]=0;t[c+21|0]=0;t[c+22|0]=0;t[c+23|0]=0;t[c+8|0]=0;t[c+9|0]=0;t[c+10|0]=0;t[c+11|0]=0;t[c+12|0]=0;t[c+13|0]=0;t[c+14|0]=0;t[c+15|0]=0;if(!Qa(v[d+8>>2])){ia(v[d+176>>2],v[d+180>>2],2066);b=0;break b}if(!b){ia(v[d+176>>2],v[d+180>>2],1375);b=0;break b}g=e+8|0;la(g,b,e+4|0);b=0;if(pa(g)|v[e+4>>2]){break b}b=e+128|0;Mb(d+8|0,b,e+8|0);d=e+40|0;sa(d,b);$a(c,d);b=1}T=e+256|0;if(!b){tb(f+16|0,64);break a}v[f+12>>2]=33;b=a;a=f+16|0;b=Ya(v[1325],b,f+12|0,a,258);tb(a,64);h=(b|0)!=0}T=f+80|0;return h|0}function Ka(a,b){var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;e=w[b+30|0];d=e>>>24|0;c=w[b+31|0]|e<<8;e=d;h=c;c=w[b+29|0];d=c>>>16|0;c=h|c<<16;e=d|e;h=c;c=w[b+28|0];d=c>>>8|0;c=h|c<<24;d=w[b+27|0]|(d|e)|w[b+26|0]<<8|(w[b+25|0]&15)<<16;h=d;k=0|c;v[a>>2]=k;v[a+4>>2]=d;e=w[b+24|0];d=e>>>28|0;c=e<<4|w[b+25|0]>>>4;e=d;f=c;c=w[b+23|0];d=c>>>20|0;c=f|c<<12;e=d|e;f=c;c=w[b+22|0];d=c>>>12|0;c=f|c<<20;e=d|e;f=c;c=w[b+21|0];d=c>>>4|0;c=f|c<<28;d=d|e|w[b+20|0]<<4|w[b+19|0]<<12;f=d;m=c;v[a+8>>2]=c;v[a+12>>2]=d;e=w[b+17|0];d=e>>>24|0;c=w[b+18|0]|e<<8;e=d;i=c;c=w[b+16|0];d=c>>>16|0;c=i|c<<16;e=d|e;i=c;c=w[b+15|0];d=c>>>8|0;c=i|c<<24;d=w[b+14|0]|(d|e)|w[b+13|0]<<8|(w[b+12|0]&15)<<16;i=d;l=c|n;v[a+16>>2]=l;v[a+20>>2]=d;e=w[b+11|0];d=e>>>28|0;c=e<<4|w[b+12|0]>>>4;e=d;g=c;c=w[b+10|0];d=c>>>20|0;c=g|c<<12;e=d|e;g=c;c=w[b+9|0];d=c>>>12|0;c=g|c<<20;e=d|e;g=c;c=w[b+8|0];d=c>>>4|0;c=g|c<<28;d=d|e|w[b+7|0]<<4|w[b+6|0]<<12;g=d;o=c;v[a+24>>2]=c;v[a+28>>2]=d;e=w[b+4|0];d=e>>>24|0;c=w[b+5|0]|e<<8;e=d;j=c;c=w[b+3|0];d=c>>>16|0;c=j|c<<16;e=d|e;j=c;c=w[b+2|0];d=c>>>8|0;c=j|c<<24;e=w[b+1|0]|(d|e);d=w[b|0]<<8;b=c|n;v[a+32>>2]=b;c=a;a=d|e;v[c+36>>2]=a;a:{if(!((b|0)!=-1|(a|0)!=65535|((o&(m&l))!=-1|(g&(f&i))!=1048575))){a=0;if((h|0)==1048574&k>>>0>4294966318|h>>>0>1048574){break a}}a=1}return a}function td(a,b,c,d,e){var f=0,g=0,h=0,i=0,j=0,k=0,l=0;i=T-48|0;T=i;a:{if(!a){break a}j=a-1|0;h=B(j,88)+b|0;f=(j<<7)+d|0;g=v[f+4>>2];v[h>>2]=v[f>>2];v[h+4>>2]=g;g=v[f+36>>2];v[h+32>>2]=v[f+32>>2];v[h+36>>2]=g;g=v[f+28>>2];v[h+24>>2]=v[f+24>>2];v[h+28>>2]=g;g=v[f+20>>2];v[h+16>>2]=v[f+16>>2];v[h+20>>2]=g;g=v[f+12>>2];v[h+8>>2]=v[f+8>>2];v[h+12>>2]=g;g=v[f+76>>2];v[h+72>>2]=v[f+72>>2];v[h+76>>2]=g;k=f- -64|0;l=v[k+4>>2];g=h- -64|0;v[g>>2]=v[k>>2];v[g+4>>2]=l;g=v[f+60>>2];v[h+56>>2]=v[f+56>>2];v[h+60>>2]=g;g=v[f+52>>2];v[h+48>>2]=v[f+48>>2];v[h+52>>2]=g;g=v[f+44>>2];v[h+40>>2]=v[f+40>>2];v[h+44>>2]=g;g=v[f+92>>2];v[c+8>>2]=v[f+88>>2];v[c+12>>2]=g;g=v[f+100>>2];v[c+16>>2]=v[f+96>>2];v[c+20>>2]=g;g=v[f+108>>2];v[c+24>>2]=v[f+104>>2];v[c+28>>2]=g;g=v[f+116>>2];v[c+32>>2]=v[f+112>>2];v[c+36>>2]=g;g=v[f+84>>2];v[c>>2]=v[f+80>>2];v[c+4>>2]=g;v[h+80>>2]=0;c=B(j,40)+e|0;f=v[c+36>>2];v[i+40>>2]=v[c+32>>2];v[i+44>>2]=f;f=v[c+28>>2];v[i+32>>2]=v[c+24>>2];v[i+36>>2]=f;f=v[c+20>>2];v[i+24>>2]=v[c+16>>2];v[i+28>>2]=f;f=v[c+12>>2];v[i+16>>2]=v[c+8>>2];v[i+20>>2]=f;f=v[c+4>>2];v[i+8>>2]=v[c>>2];v[i+12>>2]=f;if(!j){break a}a=a-2|0;rb(B(a,88)+b|0,(a<<7)+d|0,i+8|0);if(!a){break a}while(1){c=i+8|0;ha(c,c,B(a,40)+e|0);a=a-1|0;rb(B(a,88)+b|0,(a<<7)+d|0,c);if(a){continue}break}}T=i+48|0}function Sd(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0;a:{b:{if(!cb(b,c)){g=eb(b,c);if((e|0)!=32|(c|0)!=32){break a}if(g){break b}break a}if((c|0)!=32|(e|0)!=32){break a}}a=na(a,b,c);e=v[1325];b=T-80|0;T=b;v[b+12>>2]=0;c:{if(!a){ia(v[e+176>>2],v[e+180>>2],1375);break c}if(!d){ia(v[e+176>>2],v[e+180>>2],1666);break c}la(b+48|0,d,b+12|0);la(b+16|0,a,0);if(v[b+12>>2]){t[a|0]=0;t[a+1|0]=0;t[a+2|0]=0;t[a+3|0]=0;t[a+4|0]=0;t[a+5|0]=0;t[a+6|0]=0;t[a+7|0]=0;t[a+24|0]=0;t[a+25|0]=0;t[a+26|0]=0;t[a+27|0]=0;t[a+28|0]=0;t[a+29|0]=0;t[a+30|0]=0;t[a+31|0]=0;t[a+16|0]=0;t[a+17|0]=0;t[a+18|0]=0;t[a+19|0]=0;t[a+20|0]=0;t[a+21|0]=0;t[a+22|0]=0;t[a+23|0]=0;t[a+8|0]=0;t[a+9|0]=0;t[a+10|0]=0;t[a+11|0]=0;t[a+12|0]=0;t[a+13|0]=0;t[a+14|0]=0;t[a+15|0]=0;break c}d=b+16|0;oa(d,d,b+48|0);d=!pa(d);t[a|0]=0;t[a+1|0]=0;t[a+2|0]=0;t[a+3|0]=0;t[a+4|0]=0;t[a+5|0]=0;t[a+6|0]=0;t[a+7|0]=0;t[a+24|0]=0;t[a+25|0]=0;t[a+26|0]=0;t[a+27|0]=0;t[a+28|0]=0;t[a+29|0]=0;t[a+30|0]=0;t[a+31|0]=0;t[a+16|0]=0;t[a+17|0]=0;t[a+18|0]=0;t[a+19|0]=0;t[a+20|0]=0;t[a+21|0]=0;t[a+22|0]=0;t[a+23|0]=0;t[a+8|0]=0;t[a+9|0]=0;t[a+10|0]=0;t[a+11|0]=0;t[a+12|0]=0;t[a+13|0]=0;t[a+14|0]=0;t[a+15|0]=0;if(!d){break c}ua(a,b+16|0);f=1}T=b+80|0;if(f){f=1;if(cb(a,c)){break a}}tb(a,c);f=0}return f|0}function $a(a,b){var c=0,d=0;d=T+-64|0;T=d;xa(d,b);c=v[d+60>>2];b=v[d+56>>2];t[a+56|0]=b;t[a+57|0]=b>>>8;t[a+58|0]=b>>>16;t[a+59|0]=b>>>24;t[a+60|0]=c;t[a+61|0]=c>>>8;t[a+62|0]=c>>>16;t[a+63|0]=c>>>24;c=v[d+52>>2];b=v[d+48>>2];t[a+48|0]=b;t[a+49|0]=b>>>8;t[a+50|0]=b>>>16;t[a+51|0]=b>>>24;t[a+52|0]=c;t[a+53|0]=c>>>8;t[a+54|0]=c>>>16;t[a+55|0]=c>>>24;c=v[d+44>>2];b=v[d+40>>2];t[a+40|0]=b;t[a+41|0]=b>>>8;t[a+42|0]=b>>>16;t[a+43|0]=b>>>24;t[a+44|0]=c;t[a+45|0]=c>>>8;t[a+46|0]=c>>>16;t[a+47|0]=c>>>24;c=v[d+36>>2];b=v[d+32>>2];t[a+32|0]=b;t[a+33|0]=b>>>8;t[a+34|0]=b>>>16;t[a+35|0]=b>>>24;t[a+36|0]=c;t[a+37|0]=c>>>8;t[a+38|0]=c>>>16;t[a+39|0]=c>>>24;c=v[d+28>>2];b=v[d+24>>2];t[a+24|0]=b;t[a+25|0]=b>>>8;t[a+26|0]=b>>>16;t[a+27|0]=b>>>24;t[a+28|0]=c;t[a+29|0]=c>>>8;t[a+30|0]=c>>>16;t[a+31|0]=c>>>24;c=v[d+20>>2];b=v[d+16>>2];t[a+16|0]=b;t[a+17|0]=b>>>8;t[a+18|0]=b>>>16;t[a+19|0]=b>>>24;t[a+20|0]=c;t[a+21|0]=c>>>8;t[a+22|0]=c>>>16;t[a+23|0]=c>>>24;c=v[d+12>>2];b=v[d+8>>2];t[a+8|0]=b;t[a+9|0]=b>>>8;t[a+10|0]=b>>>16;t[a+11|0]=b>>>24;t[a+12|0]=c;t[a+13|0]=c>>>8;t[a+14|0]=c>>>16;t[a+15|0]=c>>>24;c=v[d+4>>2];b=v[d>>2];t[a|0]=b;t[a+1|0]=b>>>8;t[a+2|0]=b>>>16;t[a+3|0]=b>>>24;t[a+4|0]=c;t[a+5|0]=c>>>8;t[a+6|0]=c>>>16;t[a+7|0]=c>>>24;T=d- -64|0}function za(a,b){var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0;e=T-16|0;T=e;c=v[a+96>>2];d=c>>>5|0;v[e+8>>2]=d&117440512;v[e+12>>2]=c>>>21&255|(d&65280|(c<<11&16711680|c<<27));ma(a,3888,(55-c&63)+1|0);ma(a,e+8|0,8);c=v[a>>2];d=v[a+4>>2];v[a>>2]=0;v[a+4>>2]=0;f=v[a+8>>2];g=v[a+12>>2];v[a+8>>2]=0;v[a+12>>2]=0;h=v[a+16>>2];i=v[a+20>>2];v[a+16>>2]=0;v[a+20>>2]=0;j=v[a+24>>2];k=v[a+28>>2];v[a+24>>2]=0;v[a+28>>2]=0;a=k<<8&16711680|k<<24|(k>>>8&65280|k>>>24);t[b+28|0]=a;t[b+29|0]=a>>>8;t[b+30|0]=a>>>16;t[b+31|0]=a>>>24;a=j<<8&16711680|j<<24|(j>>>8&65280|j>>>24);t[b+24|0]=a;t[b+25|0]=a>>>8;t[b+26|0]=a>>>16;t[b+27|0]=a>>>24;a=i<<8&16711680|i<<24|(i>>>8&65280|i>>>24);t[b+20|0]=a;t[b+21|0]=a>>>8;t[b+22|0]=a>>>16;t[b+23|0]=a>>>24;a=h<<8&16711680|h<<24|(h>>>8&65280|h>>>24);t[b+16|0]=a;t[b+17|0]=a>>>8;t[b+18|0]=a>>>16;t[b+19|0]=a>>>24;a=g<<8&16711680|g<<24|(g>>>8&65280|g>>>24);t[b+12|0]=a;t[b+13|0]=a>>>8;t[b+14|0]=a>>>16;t[b+15|0]=a>>>24;a=f<<8&16711680|f<<24|(f>>>8&65280|f>>>24);t[b+8|0]=a;t[b+9|0]=a>>>8;t[b+10|0]=a>>>16;t[b+11|0]=a>>>24;a=d<<8&16711680|d<<24|(d>>>8&65280|d>>>24);t[b+4|0]=a;t[b+5|0]=a>>>8;t[b+6|0]=a>>>16;t[b+7|0]=a>>>24;a=c<<8&16711680|c<<24|(c>>>8&65280|c>>>24);t[b|0]=a;t[b+1|0]=a>>>8;t[b+2|0]=a>>>16;t[b+3|0]=a>>>24;T=e+16|0}function _d(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;k=T-128|0;T=k;m=kc(k+112|0,d);n=Nb(k+96|0,d);a:{while(1){if((d|0)!=(i|0)){l=(i<<2)+c|0;if(v[l>>2]!=33){j=0;break a}j=0;if(!hb(v[1325],fb(v[m>>2],i),b+h|0)){break a}l=v[l>>2];j=fb(v[m>>2],i);p=Hb(v[n>>2],i),q=j,v[p>>2]=q;i=i+1|0;h=h+l|0;continue}break}o=kc(k+80|0,g);h=0;l=Nb(k- -64|0,g);i=0;b:{while(1){if((g|0)!=(i|0)){b=(i<<2)+f|0;j=0;if(v[b>>2]!=33){break b}j=0;if(!hb(v[1325],fb(v[o>>2],i),e+h|0)){break b}c=v[b>>2];b=fb(v[o>>2],i);p=Hb(v[l>>2],i),q=b,v[p>>2]=q;i=i+1|0;h=c+h|0;continue}break}b=v[1325];j=v[l>>2];h=T-304|0;T=h;f=v[n>>2];c:{if(!(f|!d)){ia(v[b+176>>2],v[b+180>>2],2966);b=0;break c}if(!(j|!g)){ia(v[b+176>>2],v[b+180>>2],2938);b=0;break c}if(!k){ia(v[b+176>>2],v[b+180>>2],1434);b=0;break c}Ta(h+176|0);if(g){c=0;while(1){e=h+88|0;mb(e,v[j+(c<<2)>>2]);b=h+176|0;Ha(b,b,e,0);c=c+1|0;if((g|0)!=(c|0)){continue}break}}b=h+176|0;sb(b,b);if(d){c=0;while(1){e=h+88|0;mb(e,v[f+(c<<2)>>2]);b=h+176|0;Ha(b,b,e,0);c=c+1|0;if((d|0)!=(c|0)){continue}break}}b=0;if(v[h+296>>2]){break c}sa(h,h+176|0);dc(k,h);b=1}T=h+304|0;j=0;if(!b){break b}j=(Vb(v[1325],a,k)|0)!=0}db(l);db(o)}db(n);db(m);T=k+128|0;return j|0}function Zd(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0;e=T-144|0;T=e;d=0;a:{if((c|0)!=33){break a}d=0;if(!hb(v[1325],e+80|0,b)){break a}f=v[1325];c=e+80|0;d=T-128|0;T=d;b=e+16|0;b:{if(!b){ia(v[f+176>>2],v[f+180>>2],1390);f=0;break b}t[b|0]=0;t[b+1|0]=0;t[b+2|0]=0;t[b+3|0]=0;t[b+4|0]=0;t[b+5|0]=0;t[b+6|0]=0;t[b+7|0]=0;t[b+56|0]=0;t[b+57|0]=0;t[b+58|0]=0;t[b+59|0]=0;t[b+60|0]=0;t[b+61|0]=0;t[b+62|0]=0;t[b+63|0]=0;t[b+48|0]=0;t[b+49|0]=0;t[b+50|0]=0;t[b+51|0]=0;t[b+52|0]=0;t[b+53|0]=0;t[b+54|0]=0;t[b+55|0]=0;t[b+40|0]=0;t[b+41|0]=0;t[b+42|0]=0;t[b+43|0]=0;t[b+44|0]=0;t[b+45|0]=0;t[b+46|0]=0;t[b+47|0]=0;t[b+32|0]=0;t[b+33|0]=0;t[b+34|0]=0;t[b+35|0]=0;t[b+36|0]=0;t[b+37|0]=0;t[b+38|0]=0;t[b+39|0]=0;t[b+24|0]=0;t[b+25|0]=0;t[b+26|0]=0;t[b+27|0]=0;t[b+28|0]=0;t[b+29|0]=0;t[b+30|0]=0;t[b+31|0]=0;t[b+16|0]=0;t[b+17|0]=0;t[b+18|0]=0;t[b+19|0]=0;t[b+20|0]=0;t[b+21|0]=0;t[b+22|0]=0;t[b+23|0]=0;t[b+8|0]=0;t[b+9|0]=0;t[b+10|0]=0;t[b+11|0]=0;t[b+12|0]=0;t[b+13|0]=0;t[b+14|0]=0;t[b+15|0]=0;if(!c){ia(v[f+176>>2],v[f+180>>2],1500);f=0;break b}f=1;Ka(d,c+1|0);yb(d+40|0,d);if(t[c|0]&1){c=d+40|0;Ia(c,c)}$a(b,d+40|0)}T=d+128|0;d=0;if(!f){break a}v[e+12>>2]=33;d=(Ya(v[1325],a,e+12|0,e+16|0,258)|0)!=0}T=e+144|0;return d|0}function Rd(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0;f=0;a:{if(!cb(b,c)|(e|0)!=32){break a}a=na(a,b,c);e=v[1325];b=T-80|0;T=b;v[b+12>>2]=0;b:{if(!a){ia(v[e+176>>2],v[e+180>>2],1375);break b}if(!d){ia(v[e+176>>2],v[e+180>>2],1666);break b}la(b+48|0,d,b+12|0);la(b+16|0,a,0);if(v[b+12>>2]){t[a|0]=0;t[a+1|0]=0;t[a+2|0]=0;t[a+3|0]=0;t[a+4|0]=0;t[a+5|0]=0;t[a+6|0]=0;t[a+7|0]=0;t[a+24|0]=0;t[a+25|0]=0;t[a+26|0]=0;t[a+27|0]=0;t[a+28|0]=0;t[a+29|0]=0;t[a+30|0]=0;t[a+31|0]=0;t[a+16|0]=0;t[a+17|0]=0;t[a+18|0]=0;t[a+19|0]=0;t[a+20|0]=0;t[a+21|0]=0;t[a+22|0]=0;t[a+23|0]=0;t[a+8|0]=0;t[a+9|0]=0;t[a+10|0]=0;t[a+11|0]=0;t[a+12|0]=0;t[a+13|0]=0;t[a+14|0]=0;t[a+15|0]=0;break b}d=b+16|0;e=b+48|0;if(pa(e)){d=0}else{ga(d,d,e);d=1}t[a|0]=0;t[a+1|0]=0;t[a+2|0]=0;t[a+3|0]=0;t[a+4|0]=0;t[a+5|0]=0;t[a+6|0]=0;t[a+7|0]=0;t[a+24|0]=0;t[a+25|0]=0;t[a+26|0]=0;t[a+27|0]=0;t[a+28|0]=0;t[a+29|0]=0;t[a+30|0]=0;t[a+31|0]=0;t[a+16|0]=0;t[a+17|0]=0;t[a+18|0]=0;t[a+19|0]=0;t[a+20|0]=0;t[a+21|0]=0;t[a+22|0]=0;t[a+23|0]=0;t[a+8|0]=0;t[a+9|0]=0;t[a+10|0]=0;t[a+11|0]=0;t[a+12|0]=0;t[a+13|0]=0;t[a+14|0]=0;t[a+15|0]=0;if(!d){break b}ua(a,b+16|0);f=1}T=b+80|0;if(f){f=1;if(cb(a,c)){break a}}tb(a,c);f=0}return f|0}function La(a,b){t[a|0]=v[b+36>>2]>>>8;t[a+1|0]=v[b+36>>2];t[a+2|0]=(v[b+36>>2]&16777215)<<8|v[b+32>>2]>>>24;t[a+3|0]=(v[b+36>>2]&65535)<<16|v[b+32>>2]>>>16;t[a+4|0]=(v[b+36>>2]&255)<<24|v[b+32>>2]>>>8;t[a+5|0]=v[b+32>>2];t[a+6|0]=v[b+28>>2]>>>12;t[a+7|0]=v[b+28>>2]>>>4;t[a+8|0]=(v[b+28>>2]&268435455)<<4|v[b+24>>2]>>>28;t[a+9|0]=(v[b+28>>2]&1048575)<<12|v[b+24>>2]>>>20;t[a+10|0]=(v[b+28>>2]&4095)<<20|v[b+24>>2]>>>12;t[a+11|0]=(v[b+28>>2]&15)<<28|v[b+24>>2]>>>4;t[a+12|0]=x[b+22>>1]&15|v[b+24>>2]<<4;t[a+13|0]=v[b+20>>2]>>>8;t[a+14|0]=v[b+20>>2];t[a+15|0]=(v[b+20>>2]&16777215)<<8|v[b+16>>2]>>>24;t[a+16|0]=(v[b+20>>2]&65535)<<16|v[b+16>>2]>>>16;t[a+17|0]=(v[b+20>>2]&255)<<24|v[b+16>>2]>>>8;t[a+18|0]=v[b+16>>2];t[a+19|0]=v[b+12>>2]>>>12;t[a+20|0]=v[b+12>>2]>>>4;t[a+21|0]=(v[b+12>>2]&268435455)<<4|v[b+8>>2]>>>28;t[a+22|0]=(v[b+12>>2]&1048575)<<12|v[b+8>>2]>>>20;t[a+23|0]=(v[b+12>>2]&4095)<<20|v[b+8>>2]>>>12;t[a+24|0]=(v[b+12>>2]&15)<<28|v[b+8>>2]>>>4;t[a+25|0]=x[b+6>>1]&15|v[b+8>>2]<<4;t[a+26|0]=v[b+4>>2]>>>8;t[a+27|0]=v[b+4>>2];t[a+28|0]=(v[b+4>>2]&16777215)<<8|v[b>>2]>>>24;t[a+29|0]=(v[b+4>>2]&65535)<<16|v[b>>2]>>>16;t[a+30|0]=(v[b+4>>2]&255)<<24|v[b>>2]>>>8;t[a+31|0]=v[b>>2]}function De(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;h=T-160|0;T=h;l=kc(h+144|0,d);m=Nb(h+128|0,d);a:{while(1){if((d|0)!=(i|0)){k=(i<<2)+c|0;g=0;if(v[k>>2]!=64){break a}g=0;if(!Kb(v[1325],fb(v[l>>2],i),b+j|0)){break a}g=v[k>>2];k=fb(v[l>>2],i);n=Hb(v[m>>2],i),o=k,v[n>>2]=o;i=i+1|0;j=j+g|0;continue}break}g=0;if(!Ea(v[1325],h- -64|0,e,f)){break a}c=v[1325];f=v[m>>2];i=h- -64|0;e=0;j=0;b=T-384|0;T=b;b:{if(!h){ia(v[c+176>>2],v[c+180>>2],1897);break b}c:{d:{e:{f:{g:{h:{if(f){if(!d){break g}break h}ia(v[c+176>>2],v[c+180>>2],1528);break b}while(1){if(v[f+(e<<2)>>2]){e=e+1|0;if((e|0)!=(d|0)){continue}break f}break}ia(v[c+176>>2],v[c+180>>2],1848);break b}if(!i){break e}ya(b+352|0,0);break c}if(i){break d}}ia(v[c+176>>2],v[c+180>>2],1643);break b}ya(b+352|0,0);e=0;while(1){la(b+232|0,v[f+(e<<2)>>2]+32|0,b+12|0);if(v[b+12>>2]){break b}g=b+352|0;oa(g,g,b+232|0);e=e+1|0;if((e|0)!=(d|0)){continue}break}}d=b+16|0;Ta(d);e=c;c=b+144|0;Ua(e,c,i);Ja(d,d,c);if(!Cb(d)){c=b+16|0;sb(c,c)}c=b+264|0;sa(c,b+16|0);Ra(c);La(h,c);ua(h+32|0,b+352|0);j=1}T=b+384|0;g=0;if(!j){break a}g=(fc(v[1325],a,h)|0)!=0}db(m);db(l);T=h+160|0;return g|0}function qd(a,b,c){var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;j=v[a+4>>2];d=j;h=(c-1&256)+b|0;b=h&63;e=h>>>0<64;f=b&31;g=v[a>>2];if((b&63)>>>0>=32){c=e<<f;e=0}else{c=(1<<f)-1&e>>>32-f;e=e<<f}f=g+e|0;d=c+d|0;i=f;d=e>>>0>f>>>0?d+1|0:d;c=d;v[a>>2]=f;v[a+4>>2]=d;m=v[a+12>>2];f=m;n=h>>>6|0;e=(n|0)==1;h=b&31;l=v[a+8>>2];if((b&63)>>>0>=32){d=e<<h;e=0}else{d=(1<<h)-1&e>>>32-h;e=e<<h}h=l+e|0;d=d+f|0;o=h;c=(c|0)==(j|0)&g>>>0>i>>>0|c>>>0<j>>>0;f=h+c|0;d=e>>>0>h>>>0?d+1|0:d;k=f;e=c>>>0>f>>>0?d+1|0:d;f=e;v[a+8>>2]=k;v[a+12>>2]=e;j=v[a+20>>2];c=j;g=(n|0)==2;i=b&31;h=v[a+16>>2];if((b&63)>>>0>=32){e=g<<i;g=0}else{e=(1<<i)-1&g>>>32-i;g=g<<i}i=h+g|0;c=c+e|0;c=g>>>0>i>>>0?c+1|0:c;e=(d|0)==(f|0)&k>>>0<o>>>0|d>>>0>f>>>0;f=e+((d|0)==(m|0)&l>>>0>o>>>0|d>>>0<m>>>0)|0;d=0;d=e>>>0>f>>>0?1:d;e=f;f=i+e|0;d=c+d|0;l=f;d=e>>>0>f>>>0?d+1|0:d;f=d;v[a+16>>2]=l;v[a+20>>2]=d;e=v[a+28>>2];g=(n|0)==3;k=b&31;if((b&63)>>>0>=32){d=g<<k;b=0}else{d=(1<<k)-1&g>>>32-k;b=g<<k}g=b+v[a+24>>2]|0;e=d+e|0;e=b>>>0>g>>>0?e+1|0:e;b=(c|0)==(f|0)&i>>>0>l>>>0|c>>>0>f>>>0;c=b+((c|0)==(j|0)&i>>>0<h>>>0|c>>>0<j>>>0)|0;d=0;d=b>>>0>c>>>0?1:d;b=c;c=c+g|0;d=d+e|0;v[a+24>>2]=c;v[a+28>>2]=b>>>0>c>>>0?d+1|0:d}function Ua(a,b,c){var d=0,e=0;d=T+-64|0;T=d;e=w[c+60|0]|w[c+61|0]<<8|(w[c+62|0]<<16|w[c+63|0]<<24);v[d+56>>2]=w[c+56|0]|w[c+57|0]<<8|(w[c+58|0]<<16|w[c+59|0]<<24);v[d+60>>2]=e;e=w[c+52|0]|w[c+53|0]<<8|(w[c+54|0]<<16|w[c+55|0]<<24);v[d+48>>2]=w[c+48|0]|w[c+49|0]<<8|(w[c+50|0]<<16|w[c+51|0]<<24);v[d+52>>2]=e;e=w[c+44|0]|w[c+45|0]<<8|(w[c+46|0]<<16|w[c+47|0]<<24);v[d+40>>2]=w[c+40|0]|w[c+41|0]<<8|(w[c+42|0]<<16|w[c+43|0]<<24);v[d+44>>2]=e;e=w[c+36|0]|w[c+37|0]<<8|(w[c+38|0]<<16|w[c+39|0]<<24);v[d+32>>2]=w[c+32|0]|w[c+33|0]<<8|(w[c+34|0]<<16|w[c+35|0]<<24);v[d+36>>2]=e;e=w[c+28|0]|w[c+29|0]<<8|(w[c+30|0]<<16|w[c+31|0]<<24);v[d+24>>2]=w[c+24|0]|w[c+25|0]<<8|(w[c+26|0]<<16|w[c+27|0]<<24);v[d+28>>2]=e;e=w[c+20|0]|w[c+21|0]<<8|(w[c+22|0]<<16|w[c+23|0]<<24);v[d+16>>2]=w[c+16|0]|w[c+17|0]<<8|(w[c+18|0]<<16|w[c+19|0]<<24);v[d+20>>2]=e;e=w[c+12|0]|w[c+13|0]<<8|(w[c+14|0]<<16|w[c+15|0]<<24);v[d+8>>2]=w[c+8|0]|w[c+9|0]<<8|(w[c+10|0]<<16|w[c+11|0]<<24);v[d+12>>2]=e;e=w[c+4|0]|w[c+5|0]<<8|(w[c+6|0]<<16|w[c+7|0]<<24);v[d>>2]=w[c|0]|w[c+1|0]<<8|(w[c+2|0]<<16|w[c+3|0]<<24);v[d+4>>2]=e;ab(b,d);c=1;if(Fd(b)){ia(v[a+176>>2],v[a+180>>2],2126);c=0}T=d- -64|0;return c}function Ob(a,b){var c=0,d=0,e=0;e=T-208|0;T=e;if(v[a+64>>2]){c=e+8|0;d=a+32|0;pb(c,d);Va(c,a,32);Va(c,4170,1);ob(c,d);pb(c,d);Va(c,a,32);ob(c,a)}c=e+8|0;pb(c,a+32|0);Va(c,a,32);ob(c,a);c=w[a+28|0]|w[a+29|0]<<8|(w[a+30|0]<<16|w[a+31|0]<<24);d=w[a+24|0]|w[a+25|0]<<8|(w[a+26|0]<<16|w[a+27|0]<<24);t[b+24|0]=d;t[b+25|0]=d>>>8;t[b+26|0]=d>>>16;t[b+27|0]=d>>>24;t[b+28|0]=c;t[b+29|0]=c>>>8;t[b+30|0]=c>>>16;t[b+31|0]=c>>>24;c=w[a+20|0]|w[a+21|0]<<8|(w[a+22|0]<<16|w[a+23|0]<<24);d=w[a+16|0]|w[a+17|0]<<8|(w[a+18|0]<<16|w[a+19|0]<<24);t[b+16|0]=d;t[b+17|0]=d>>>8;t[b+18|0]=d>>>16;t[b+19|0]=d>>>24;t[b+20|0]=c;t[b+21|0]=c>>>8;t[b+22|0]=c>>>16;t[b+23|0]=c>>>24;c=w[a+12|0]|w[a+13|0]<<8|(w[a+14|0]<<16|w[a+15|0]<<24);d=w[a+8|0]|w[a+9|0]<<8|(w[a+10|0]<<16|w[a+11|0]<<24);t[b+8|0]=d;t[b+9|0]=d>>>8;t[b+10|0]=d>>>16;t[b+11|0]=d>>>24;t[b+12|0]=c;t[b+13|0]=c>>>8;t[b+14|0]=c>>>16;t[b+15|0]=c>>>24;c=w[a+4|0]|w[a+5|0]<<8|(w[a+6|0]<<16|w[a+7|0]<<24);d=w[a|0]|w[a+1|0]<<8|(w[a+2|0]<<16|w[a+3|0]<<24);t[b|0]=d;t[b+1|0]=d>>>8;t[b+2|0]=d>>>16;t[b+3|0]=d>>>24;t[b+4|0]=c;t[b+5|0]=c>>>8;t[b+6|0]=c>>>16;t[b+7|0]=c>>>24;v[a+64>>2]=1;T=e+208|0}function Wd(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0;d=T-128|0;T=d;e=0;a:{if(!Ea(v[1325],d- -64|0,b,c)){break a}b=v[1325];e=d- -64|0;c=T-96|0;T=c;b:{if(!d){ia(v[b+176>>2],v[b+180>>2],1500);b=0;break b}t[d|0]=0;t[d+1|0]=0;t[d+2|0]=0;t[d+3|0]=0;t[d+4|0]=0;t[d+5|0]=0;t[d+6|0]=0;t[d+7|0]=0;t[d+56|0]=0;t[d+57|0]=0;t[d+58|0]=0;t[d+59|0]=0;t[d+60|0]=0;t[d+61|0]=0;t[d+62|0]=0;t[d+63|0]=0;t[d+48|0]=0;t[d+49|0]=0;t[d+50|0]=0;t[d+51|0]=0;t[d+52|0]=0;t[d+53|0]=0;t[d+54|0]=0;t[d+55|0]=0;t[d+40|0]=0;t[d+41|0]=0;t[d+42|0]=0;t[d+43|0]=0;t[d+44|0]=0;t[d+45|0]=0;t[d+46|0]=0;t[d+47|0]=0;t[d+32|0]=0;t[d+33|0]=0;t[d+34|0]=0;t[d+35|0]=0;t[d+36|0]=0;t[d+37|0]=0;t[d+38|0]=0;t[d+39|0]=0;t[d+24|0]=0;t[d+25|0]=0;t[d+26|0]=0;t[d+27|0]=0;t[d+28|0]=0;t[d+29|0]=0;t[d+30|0]=0;t[d+31|0]=0;t[d+16|0]=0;t[d+17|0]=0;t[d+18|0]=0;t[d+19|0]=0;t[d+20|0]=0;t[d+21|0]=0;t[d+22|0]=0;t[d+23|0]=0;t[d+8|0]=0;t[d+9|0]=0;t[d+10|0]=0;t[d+11|0]=0;t[d+12|0]=0;t[d+13|0]=0;t[d+14|0]=0;t[d+15|0]=0;if(!e){ia(v[b+176>>2],v[b+180>>2],1390);b=0;break b}f=b;b=c+8|0;Ua(f,b,e);dc(d,b);b=1}T=c+96|0;e=0;if(!b){break a}e=(Vb(v[1325],a,d)|0)!=0}T=d+128|0;return e|0}function ve(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;e=(c>>>0)/y[d+2104>>2]|0;if(v[d+2108>>2]==(c|0)){na(b,v[d+2056>>2],88);b=d+2096|0;c=v[b+4>>2];v[a+24>>2]=v[b>>2];v[a+28>>2]=c;b=d+2088|0;c=v[b+4>>2];v[a+16>>2]=v[b>>2];v[a+20>>2]=c;b=d+2080|0;c=v[b+4>>2];v[a+8>>2]=v[b>>2];v[a+12>>2]=c;b=v[d+2076>>2];v[a>>2]=v[d+2072>>2];v[a+4>>2]=b;return 1}f=e^1;a:{if(!(e&1)){na(b,v[d+2052>>2]+B(c,88)|0,88);b=v[d+2064>>2]+(f<<5)|0;e=v[b+4>>2];v[a>>2]=v[b>>2];v[a+4>>2]=e;e=v[b+28>>2];v[a+24>>2]=v[b+24>>2];v[a+28>>2]=e;e=v[b+20>>2];v[a+16>>2]=v[b+16>>2];v[a+20>>2]=e;e=v[b+12>>2];v[a+8>>2]=v[b+8>>2];v[a+12>>2]=e;ga(a,a,d+2016|0);break a}na(b,v[d+2048>>2]+B(c,88)|0,88);b=v[d+2060>>2]+(f<<5)|0;e=v[b+4>>2];v[a>>2]=v[b>>2];v[a+4>>2]=e;e=v[b+28>>2];v[a+24>>2]=v[b+24>>2];v[a+28>>2]=e;e=v[b+20>>2];v[a+16>>2]=v[b+16>>2];v[a+20>>2]=e;e=v[b+12>>2];v[a+8>>2]=v[b+8>>2];v[a+12>>2]=e}e=v[d+2104>>2];if(e>>>0>=2){b=0;while(1){b:{if(!(((c>>>0)/(e>>>0)^c>>>b)&1)){ga(a,a,(b<<5)+d|0);break b}ga(a,a,((b<<5)+d|0)+992|0)}e=v[d+2104>>2];b=b+1|0;if(e>>>0>1<<b>>>0){continue}break}}a=d+2016|0;ga(a,a,d+1984|0);return 1}function ue(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;e=(c>>>0)/y[d+2104>>2]|0;if(v[d+2108>>2]==(c|0)){na(b,v[d+2056>>2],88);b=d+2096|0;c=v[b+4>>2];v[a+24>>2]=v[b>>2];v[a+28>>2]=c;b=d+2088|0;c=v[b+4>>2];v[a+16>>2]=v[b>>2];v[a+20>>2]=c;b=d+2080|0;c=v[b+4>>2];v[a+8>>2]=v[b>>2];v[a+12>>2]=c;b=v[d+2076>>2];v[a>>2]=v[d+2072>>2];v[a+4>>2]=b;return 1}f=e^1;a:{if(e&1){na(b,v[d+2052>>2]+B(c,88)|0,88);b=v[d+2064>>2]+(f<<5)|0;e=v[b+4>>2];v[a>>2]=v[b>>2];v[a+4>>2]=e;e=v[b+28>>2];v[a+24>>2]=v[b+24>>2];v[a+28>>2]=e;e=v[b+20>>2];v[a+16>>2]=v[b+16>>2];v[a+20>>2]=e;e=v[b+12>>2];v[a+8>>2]=v[b+8>>2];v[a+12>>2]=e;ga(a,a,d+2016|0);break a}na(b,v[d+2048>>2]+B(c,88)|0,88);b=v[d+2060>>2]+(f<<5)|0;e=v[b+4>>2];v[a>>2]=v[b>>2];v[a+4>>2]=e;e=v[b+28>>2];v[a+24>>2]=v[b+24>>2];v[a+28>>2]=e;e=v[b+20>>2];v[a+16>>2]=v[b+16>>2];v[a+20>>2]=e;e=v[b+12>>2];v[a+8>>2]=v[b+8>>2];v[a+12>>2]=e}e=v[d+2104>>2];if(e>>>0>=2){b=0;while(1){b:{if(((c>>>0)/(e>>>0)^c>>>b)&1){ga(a,a,(b<<5)+d|0);break b}ga(a,a,((b<<5)+d|0)+992|0)}e=v[d+2104>>2];b=b+1|0;if(e>>>0>1<<b>>>0){continue}break}}a=d+2016|0;ga(a,a,d+1984|0);return 1}function Id(a,b,c,d,e,f,g,h,i,j,k){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;var l=0,m=0;l=T-256|0;T=l;a:{if((b|0)!=64){break a}if(!Kb(v[1325],l+192|0,a)){break a}if(eb(l+192|0,32)|(d|0)!=32){break a}if(e){if(!Ea(v[1325],l+128|0,e,f)){break a}if(eb(l+128|0,32)){break a}}if(!Ea(v[1325],l- -64|0,g,h)){break a}if(eb(l- -64|0,32)){break a}if(!Ea(v[1325],l,i,j)){break a}if(eb(l,32)){break a}f=l+192|0;e=e?l+128|0:0;g=l- -64|0;a=0;d=T-528|0;T=d;b=v[1325];b:{if(!Qa(v[b>>2])){ia(v[b+176>>2],v[b+180>>2],2014);break b}if(!f){ia(v[b+176>>2],v[b+180>>2],1897);break b}if(!c){ia(v[b+176>>2],v[b+180>>2],1928);break b}if(!g){ia(v[b+176>>2],v[b+180>>2],1390);break b}if(!Ka(d+456|0,f)){break b}la(d+496|0,f+32|0,d+4|0);if(v[d+4>>2]){break b}if(!e){f=d+72|0;yb(f,d+456|0);e=d+8|0;$a(e,f)}ad(b,d+200|0,e,l,c);v[d+232>>2]=g;v[d+160>>2]=b;c=Qc(b,4194304);if(!c){break b}b=jb(b,c,d+328|0,d+496|0,1,d+160|0,1);Sa(c);if(!b){break b}b=d+240|0;sa(b,d+328|0);b=Cc(d+456|0,b);if(k){a=b;break b}if(!b){break b}a=(Cb(d+328|0)|0)!=0}T=d+528|0;m=(a|0)!=0}T=l+256|0;return m|0}function Ra(a){var b=0,c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;b=v[a+8>>2];e=v[a+12>>2];c=v[a+4>>2];f=v[a+36>>2];n=f;i=v[a+32>>2];d=v[a>>2];f=Fe(f>>>16|0,0,977,1);d=d+f|0;c=U+c|0;c=d>>>0<f>>>0?c+1|0:c;f=d;j=c;c=c>>>20|0;d=c+b|0;b=e;l=d;b=c>>>0>d>>>0?b+1|0:b;o=b&1048575;c=v[a+24>>2];e=v[a+28>>2];g=b;h=b>>>20|0;d=h+v[a+16>>2]|0;b=v[a+20>>2];k=d;b=d>>>0<h>>>0?b+1|0:b;p=b;h=b>>>20|0;b=h+c|0;d=e;m=b;d=b>>>0<h>>>0?d+1|0:d;h=d&1048575;b=n&65535;n=d;e=d>>>20|0;c=e+i|0;d=c;i=j&1048575;b=c>>>0<e>>>0?b+1|0:b;j=p&1048575;e=b;if(b>>>16|(m&(k&l))==-1&(n&(j&g))==1048575&((c|0)==-1&(b|0)==65535)&((i|0)==1048574&f>>>0>4294966318|i>>>0>1048574)){b=i+1|0;c=f+977|0;b=c>>>0<977?b+1|0:b;f=c;i=b&1048575;g=b>>>20|0;c=g+l|0;b=o;b=c>>>0<g>>>0?b+1|0:b;l=c;o=b&1048575;g=b>>>20|0;k=g+k|0;c=j;c=g>>>0>k>>>0?c+1|0:c;j=c&1048575;g=c>>>20|0;c=g+m|0;b=h;b=c>>>0<g>>>0?b+1|0:b;m=c;h=b&1048575;c=d+(b>>>20|0)|0;b=e;b=c>>>0<d>>>0?b+1|0:b;d=c;e=b&65535}v[a+32>>2]=d;v[a+36>>2]=e;v[a+24>>2]=m;v[a+28>>2]=h;v[a+16>>2]=k;v[a+20>>2]=j;v[a+8>>2]=l;v[a+12>>2]=o;v[a>>2]=f;v[a+4>>2]=i}function pb(a,b){var c=0,d=0,e=0,f=0;c=T+-64|0;T=c;d=w[b+28|0]|w[b+29|0]<<8|(w[b+30|0]<<16|w[b+31|0]<<24);v[c+24>>2]=w[b+24|0]|w[b+25|0]<<8|(w[b+26|0]<<16|w[b+27|0]<<24);v[c+28>>2]=d;d=w[b+20|0]|w[b+21|0]<<8|(w[b+22|0]<<16|w[b+23|0]<<24);v[c+16>>2]=w[b+16|0]|w[b+17|0]<<8|(w[b+18|0]<<16|w[b+19|0]<<24);v[c+20>>2]=d;d=w[b+8|0]|w[b+9|0]<<8|(w[b+10|0]<<16|w[b+11|0]<<24);e=w[b+12|0]|w[b+13|0]<<8|(w[b+14|0]<<16|w[b+15|0]<<24);f=w[b|0]|w[b+1|0]<<8|(w[b+2|0]<<16|w[b+3|0]<<24);b=w[b+4|0]|w[b+5|0]<<8|(w[b+6|0]<<16|w[b+7|0]<<24);v[c+40>>2]=0;v[c+44>>2]=0;v[c+48>>2]=0;v[c+52>>2]=0;v[c+56>>2]=0;v[c+60>>2]=0;v[c>>2]=f;v[c+4>>2]=b;v[c+8>>2]=d;v[c+12>>2]=e;v[c+32>>2]=0;v[c+36>>2]=0;d=a+100|0;Aa(d);b=0;while(1){e=b+c|0;t[e|0]=w[e|0]^92;e=(b|1)+c|0;t[e|0]=w[e|0]^92;e=(b|2)+c|0;t[e|0]=w[e|0]^92;e=(b|3)+c|0;t[e|0]=w[e|0]^92;b=b+4|0;if((b|0)!=64){continue}break}ma(d,c,64);Aa(a);b=0;while(1){d=b+c|0;t[d|0]=w[d|0]^106;d=(b|1)+c|0;t[d|0]=w[d|0]^106;d=(b|2)+c|0;t[d|0]=w[d|0]^106;d=(b|3)+c|0;t[d|0]=w[d|0]^106;b=b+4|0;if((b|0)!=64){continue}break}ma(a,c,64);T=c- -64|0}function Kb(a,b,c){var d=0,e=0;d=T-80|0;T=d;v[d+12>>2]=0;a:{if(!b){ia(v[a+176>>2],v[a+180>>2],1729);break a}b:{if(!c){ia(v[a+176>>2],v[a+180>>2],1881);break b}a=d+12|0;la(d+48|0,c,a);e=v[d+12>>2];la(d+16|0,c+32|0,a);if(!(e|v[d+12>>2])){Bc(b,d+48|0,d+16|0);e=1;break a}t[b|0]=0;t[b+1|0]=0;t[b+2|0]=0;t[b+3|0]=0;t[b+4|0]=0;t[b+5|0]=0;t[b+6|0]=0;t[b+7|0]=0;t[b+56|0]=0;t[b+57|0]=0;t[b+58|0]=0;t[b+59|0]=0;t[b+60|0]=0;t[b+61|0]=0;t[b+62|0]=0;t[b+63|0]=0;t[b+48|0]=0;t[b+49|0]=0;t[b+50|0]=0;t[b+51|0]=0;t[b+52|0]=0;t[b+53|0]=0;t[b+54|0]=0;t[b+55|0]=0;t[b+40|0]=0;t[b+41|0]=0;t[b+42|0]=0;t[b+43|0]=0;t[b+44|0]=0;t[b+45|0]=0;t[b+46|0]=0;t[b+47|0]=0;t[b+32|0]=0;t[b+33|0]=0;t[b+34|0]=0;t[b+35|0]=0;t[b+36|0]=0;t[b+37|0]=0;t[b+38|0]=0;t[b+39|0]=0;t[b+24|0]=0;t[b+25|0]=0;t[b+26|0]=0;t[b+27|0]=0;t[b+28|0]=0;t[b+29|0]=0;t[b+30|0]=0;t[b+31|0]=0;t[b+16|0]=0;t[b+17|0]=0;t[b+18|0]=0;t[b+19|0]=0;t[b+20|0]=0;t[b+21|0]=0;t[b+22|0]=0;t[b+23|0]=0;t[b+8|0]=0;t[b+9|0]=0;t[b+10|0]=0;t[b+11|0]=0;t[b+12|0]=0;t[b+13|0]=0;t[b+14|0]=0;t[b+15|0]=0}e=0}T=d+80|0;return e}function Ge(a,b,c,d){var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;g=c;a:{b:{c:{d:{e:{f:{g:{h:{i:{j:{k:{if(b){if(!g){break k}if(!d){break j}c=E(d)-E(b)|0;if(c>>>0<=31){break i}break c}if((d|0)==1|d>>>0>1){break c}a=(a>>>0)/(g>>>0)|0;U=0;break a}if(!a){break h}if(!d){break g}if(d-1&d){break g}a=b>>>Ee(d)|0;U=0;break a}if(!(g-1&g)){break f}h=(E(g)+33|0)-E(b)|0;e=0-h|0;break d}h=c+1|0;e=63-c|0;break d}a=(b>>>0)/(d>>>0)|0;U=0;break a}c=E(d)-E(b)|0;if(c>>>0<31){break e}break c}if((g|0)==1){break b}c=Ee(g);d=c&31;if((c&63)>>>0>=32){c=0;a=b>>>d|0}else{c=b>>>d|0;a=((1<<d)-1&b)<<32-d|a>>>d}U=c;break a}h=c+1|0;e=63-c|0}c=h&63;f=c&31;if(c>>>0>=32){c=0;i=b>>>f|0}else{c=b>>>f|0;i=((1<<f)-1&b)<<32-f|a>>>f}f=c;c=e&63;e=c&31;if(c>>>0>=32){c=a<<e;a=0}else{c=(1<<e)-1&a>>>32-e|b<<e;a=a<<e}b=c;if(h){c=d-1|0;e=g-1|0;m=(e|0)!=-1?c+1|0:c;while(1){c=i<<1|b>>>31;f=f<<1|i>>>31;j=m-(f+(c>>>0>e>>>0)|0)>>31;k=g&j;i=c-k|0;f=f-((d&j)+(c>>>0<k>>>0)|0)|0;b=b<<1|a>>>31;a=l|a<<1;l=j&1;h=h-1|0;if(h){continue}break}}U=b<<1|a>>>31;a=l|a<<1;break a}a=0;b=0}U=b}return a}function Wa(a){var b=0,c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;g=v[a+24>>2];k=v[a+28>>2];f=v[a+16>>2];h=v[a+20>>2];e=v[a+8>>2];l=v[a+12>>2];c=v[a+4>>2];d=v[a+36>>2];j=d;i=v[a+32>>2];b=v[a>>2];d=Fe(d>>>16|0,0,977,1);b=b+d|0;c=U+c|0;c=b>>>0<d>>>0?c+1|0:c;d=b;n=c;b=e;e=c>>>20|0;c=b+e|0;b=l;b=c>>>0<e>>>0?b+1|0:b;e=c;l=b;c=f;f=b>>>20|0;b=c+f|0;c=h;c=b>>>0<f>>>0?c+1|0:c;f=b;m=c;b=g;g=c>>>20|0;c=b+g|0;b=k;b=c>>>0<g>>>0?b+1|0:b;g=c;k=b;h=i+(b>>>20|0)|0;b=j&65535;b=h>>>0<i>>>0?b+1|0:b;i=h;j=n&1048575;m=m&1048575;h=b;b=Fe((c&(e&f))==-1&(k&(l&m))==1048575&((i|0)==-1&(b|0)==65535)&((j|0)==1048574&d>>>0>4294966318|j>>>0>1048574)|b>>>16,0,977,1)+d|0;c=j+U|0;c=b>>>0<d>>>0?c+1|0:c;v[a>>2]=b;v[a+4>>2]=c&1048575;b=e;e=c>>>20|0;d=b+e|0;b=l&1048575;v[a+8>>2]=d;b=d>>>0<e>>>0?b+1|0:b;v[a+12>>2]=b&1048575;b=f+(b>>>20|0)|0;c=m;v[a+16>>2]=b;c=b>>>0<f>>>0?c+1|0:c;v[a+20>>2]=c&1048575;d=c>>>20|0;b=d+g|0;c=k&1048575;c=b>>>0<d>>>0?c+1|0:c;v[a+24>>2]=b;v[a+28>>2]=c&1048575;d=i+(c>>>20|0)|0;b=h;v[a+32>>2]=d;v[a+36>>2]=(d>>>0<i>>>0?b+1|0:b)&65535}function ua(a,b){t[a|0]=w[b+31|0];t[a+1|0]=x[b+30>>1];t[a+2|0]=v[b+28>>2]>>>8;t[a+3|0]=v[b+28>>2];t[a+4|0]=(v[b+28>>2]&16777215)<<8|v[b+24>>2]>>>24;t[a+5|0]=(v[b+28>>2]&65535)<<16|v[b+24>>2]>>>16;t[a+6|0]=(v[b+28>>2]&255)<<24|v[b+24>>2]>>>8;t[a+7|0]=v[b+24>>2];t[a+8|0]=w[b+23|0];t[a+9|0]=x[b+22>>1];t[a+10|0]=v[b+20>>2]>>>8;t[a+11|0]=v[b+20>>2];t[a+12|0]=(v[b+20>>2]&16777215)<<8|v[b+16>>2]>>>24;t[a+13|0]=(v[b+20>>2]&65535)<<16|v[b+16>>2]>>>16;t[a+14|0]=(v[b+20>>2]&255)<<24|v[b+16>>2]>>>8;t[a+15|0]=v[b+16>>2];t[a+16|0]=w[b+15|0];t[a+17|0]=x[b+14>>1];t[a+18|0]=v[b+12>>2]>>>8;t[a+19|0]=v[b+12>>2];t[a+20|0]=(v[b+12>>2]&16777215)<<8|v[b+8>>2]>>>24;t[a+21|0]=(v[b+12>>2]&65535)<<16|v[b+8>>2]>>>16;t[a+22|0]=(v[b+12>>2]&255)<<24|v[b+8>>2]>>>8;t[a+23|0]=v[b+8>>2];t[a+24|0]=w[b+7|0];t[a+25|0]=x[b+6>>1];t[a+26|0]=v[b+4>>2]>>>8;t[a+27|0]=v[b+4>>2];t[a+28|0]=(v[b+4>>2]&16777215)<<8|v[b>>2]>>>24;t[a+29|0]=(v[b+4>>2]&65535)<<16|v[b>>2]>>>16;t[a+30|0]=(v[b+4>>2]&255)<<24|v[b>>2]>>>8;t[a+31|0]=v[b>>2]}function oa(a,b,c){var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;f=v[c>>2];e=v[b>>2];h=f+e|0;g=v[c+4>>2];d=g+v[b+4>>2]|0;d=e>>>0>h>>>0?d+1|0:d;e=h;v[a>>2]=e;v[a+4>>2]=d;h=(d|0)==(g|0)&e>>>0<f>>>0|d>>>0<g>>>0;e=v[b+8>>2];f=h+e|0;d=v[b+12>>2];d=e>>>0>f>>>0?d+1|0:d;j=f;f=v[c+8>>2];g=j+f|0;e=v[c+12>>2]+d|0;k=g;v[a+8>>2]=g;e=f>>>0>g>>>0?e+1|0:e;v[a+12>>2]=e;m=v[c+16>>2];g=v[b+16>>2];i=m+g|0;l=v[c+20>>2];f=l+v[b+20>>2]|0;f=g>>>0>i>>>0?f+1|0:f;e=(d|0)==(e|0)&j>>>0>k>>>0|d>>>0>e>>>0;g=e+(!d&h>>>0>j>>>0)|0;d=0;d=e>>>0>g>>>0?1:d;n=i;e=g;g=i+e|0;d=d+f|0;j=g;v[a+16>>2]=g;d=e>>>0>g>>>0?d+1|0:d;v[a+20>>2]=d;h=v[c+24>>2];g=v[b+24>>2];k=h+g|0;i=v[c+28>>2];e=i+v[b+28>>2]|0;e=g>>>0>k>>>0?e+1|0:e;g=k;c=(d|0)==(f|0)&j>>>0<n>>>0|d>>>0<f>>>0;f=c+((f|0)==(l|0)&n>>>0<m>>>0|f>>>0<l>>>0)|0;d=0;d=c>>>0>f>>>0?1:d;c=f;f=f+g|0;d=d+e|0;d=c>>>0>f>>>0?d+1|0:d;b=a;v[b+24>>2]=f;v[b+28>>2]=d;b=((e|0)==(i|0)&g>>>0<h>>>0|e>>>0<i>>>0)+((d|0)==(e|0)&f>>>0<g>>>0|d>>>0<e>>>0)|0;Ec(a,Lb(a)+b|0)}function ld(a,b){var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;c=T-688|0;T=c;d=c+648|0;ha(d,4008,b);e=c+608|0;ea(e,b);qa(e,4128);k=c+368|0;ha(k,b,d);ra(k,k,1);h=c+568|0;ha(h,4048,e);qa(h,k);d=v[c+604>>2];v[c+560>>2]=v[c+600>>2];v[c+564>>2]=d;d=v[c+596>>2];v[c+552>>2]=v[c+592>>2];v[c+556>>2]=d;d=v[c+588>>2];v[c+544>>2]=v[c+584>>2];v[c+548>>2]=d;d=v[c+580>>2];v[c+536>>2]=v[c+576>>2];v[c+540>>2]=d;d=v[c+572>>2];v[c+528>>2]=v[c+568>>2];v[c+532>>2]=d;i=c+528|0;qa(i,e);ra(i,i,5);g=c+448|0;ha(g,4008,b);ea(g,g);j=c+488|0;ea(j,e);qa(j,g);f=c+408|0;ha(f,g,e);Fc(f,f);d=c+328|0;ha(d,h,g);ha(d,d,f);h=c+288|0;ha(h,i,g);ha(h,h,f);g=c+248|0;ha(g,j,e);ha(g,g,f);e=c+208|0;ea(e,d);ha(e,e,d);qa(e,4088);f=c+168|0;ea(f,h);ha(f,f,h);qa(f,4088);i=c+128|0;ea(i,g);ha(i,i,g);qa(i,4088);j=c+88|0;e=Jb(j,e);l=c+48|0;f=Jb(l,f);m=c+8|0;Jb(m,i);i=h;h=f&!e;ka(d,i,h);ka(j,l,h);e=!(e|f);ka(d,g,e);ka(j,m,e);Bd(a,d,j);a=a+40|0;ra(k,a,1);ka(a,k,Qb(v[b>>2]));T=c+688|0}function Ba(a,b,c){var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0;d=T-480|0;T=d;a:{if(v[b+120>>2]){na(a,c,128);break a}if(v[c+120>>2]){na(a,b,128);break a}v[a+120>>2]=0;e=d+440|0;h=c+80|0;ea(e,h);f=d+400|0;i=b+80|0;ea(f,i);j=d+360|0;ha(j,b,e);k=d+320|0;ha(k,c,f);g=d+280|0;ha(g,b+40|0,e);ha(g,g,h);e=d+240|0;ha(e,c+40|0,f);ha(e,e,i);c=d+200|0;ra(c,j,1);qa(c,k);f=d+160|0;ra(f,g,1);qa(f,e);if(qb(c)){if(qb(d+160|0)){Ga(a,b,0);break a}v[a+120>>2]=1;break a}e=d+120|0;f=d+160|0;ea(e,f);g=d+80|0;c=d+200|0;ea(g,c);b=d+40|0;ha(b,c,g);ha(c,c,h);ha(a+80|0,i,c);ha(d,d+360|0,g);c=v[d+36>>2];v[a+32>>2]=v[d+32>>2];v[a+36>>2]=c;c=v[d+28>>2];v[a+24>>2]=v[d+24>>2];v[a+28>>2]=c;c=v[d+20>>2];v[a+16>>2]=v[d+16>>2];v[a+20>>2]=c;c=v[d+12>>2];v[a+8>>2]=v[d+8>>2];v[a+12>>2]=c;c=v[d+4>>2];v[a>>2]=v[d>>2];v[a+4>>2]=c;Ma(a,2);qa(a,b);ra(a,a,3);qa(a,e);c=a+40|0;ra(c,a,5);qa(c,d);ha(c,c,f);ha(b,b,d+280|0);ra(b,b,1);qa(c,b)}T=d+480|0}function Ga(a,b,c){var d=0,e=0,f=0,g=0;e=T-160|0;T=e;d=v[b+120>>2];v[a+120>>2]=d;a:{if(d){if(!c){break a}bb(c,1);break a}if(c){d=v[b+44>>2];v[c>>2]=v[b+40>>2];v[c+4>>2]=d;d=v[b+76>>2];v[c+32>>2]=v[b+72>>2];v[c+36>>2]=d;d=b- -64|0;f=v[d+4>>2];v[c+24>>2]=v[d>>2];v[c+28>>2]=f;d=v[b+60>>2];v[c+16>>2]=v[b+56>>2];v[c+20>>2]=d;d=v[b+52>>2];v[c+8>>2]=v[b+48>>2];v[c+12>>2]=d;Ca(c);Ma(c,2)}c=a+80|0;g=b+40|0;ha(c,b+80|0,g);Ma(c,2);f=e+120|0;ea(f,b);Ma(f,3);d=e+80|0;ea(d,f);c=e+40|0;ea(c,g);Ma(c,2);ea(e,c);Ma(e,2);ha(c,c,b);b=v[e+76>>2];v[a+32>>2]=v[e+72>>2];v[a+36>>2]=b;b=e- -64|0;g=v[b+4>>2];v[a+24>>2]=v[b>>2];v[a+28>>2]=g;b=v[e+60>>2];v[a+16>>2]=v[e+56>>2];v[a+20>>2]=b;b=v[e+52>>2];v[a+8>>2]=v[e+48>>2];v[a+12>>2]=b;b=v[e+44>>2];v[a>>2]=v[e+40>>2];v[a+4>>2]=b;Ma(a,4);ra(a,a,4);qa(a,d);ra(d,d,1);Ma(c,6);qa(c,d);a=a+40|0;ha(a,f,c);ra(d,e,2);qa(a,d)}T=e+160|0}function va(a,b){var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;d=v[b+4>>2]^-1;e=v[b>>2]^-1;c=e;f=c-801750718|0;g=pa(b);i=g?0:-1;v[a>>2]=f&i;c=d-((c>>>0<801750718)+1076732275|0)|0;g=g?0:-1;v[a+4>>2]=c&g;k=v[b+8>>2]^-1;f=(d|0)==(c|0)&e>>>0>f>>>0|d>>>0>c>>>0;d=k+f|0;e=v[b+12>>2]^-1;c=e;c=d>>>0<f>>>0?c+1|0:c;f=d;h=d-1354194885|0;v[a+8>>2]=i&h;j=c-((d>>>0<1354194885)+1162945305|0)|0;v[a+12>>2]=g&j;d=v[b+20>>2]^-1;l=d;e=(c|0)==(e|0)&f>>>0<k>>>0|c>>>0<e>>>0;f=(c|0)==(j|0)&f>>>0>h>>>0|c>>>0>j>>>0;c=e+f|0;e=0;e=c>>>0<f>>>0?1:e;h=v[b+16>>2]^-1;f=c;c=h+c|0;d=d+e|0;d=c>>>0<f>>>0?d+1|0:d;f=c-2|0;v[a+16>>2]=i&f;e=d-(c>>>0<2)|0;v[a+20>>2]=g&e;e=(d|0)==(e|0)&c>>>0>f>>>0|d>>>0>e>>>0;d=e+((d|0)==(l|0)&c>>>0<h>>>0|d>>>0<l>>>0)|0;c=0;c=d>>>0<e>>>0?1:c;e=v[b+24>>2]^-1;d=e+d|0;b=(v[b+28>>2]^-1)+c|0;b=d>>>0<e>>>0?b+1|0:b;v[a+24>>2]=i&d-1;v[a+28>>2]=g&b-!d}function Ec(a,b){var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;c=v[a+4>>2];j=v[a>>2];f=Fe(b,0,801750719,1076732275);e=j+f|0;d=U+c|0;d=e>>>0<f>>>0?d+1|0:d;f=e;v[a>>2]=e;v[a+4>>2]=d;g=v[a+12>>2];l=v[a+8>>2];h=Fe(b,0,1354194884,1162945305);i=l+h|0;e=U+g|0;e=i>>>0<h>>>0?e+1|0:e;h=i;f=(d|0)==(c|0)&f>>>0<j>>>0|d>>>0<c>>>0;d=h+f|0;c=e;j=d;v[a+8>>2]=d;c=d>>>0<f>>>0?c+1|0:c;v[a+12>>2]=c;m=v[a+16>>2];f=b;i=m+f|0;k=v[a+20>>2];d=k;d=f>>>0>i>>>0?d+1|0:d;f=(e|0)==(g|0)&h>>>0<l>>>0|e>>>0<g>>>0;g=(c|0)==(e|0)&h>>>0>j>>>0|c>>>0<e>>>0;c=f+g|0;e=0;e=c>>>0<g>>>0?1:e;h=c;g=c+i|0;c=d+e|0;e=g;v[a+16>>2]=e;c=e>>>0<h>>>0?c+1|0:c;v[a+20>>2]=c;f=v[a+28>>2];c=(d|0)==(c|0)&e>>>0<i>>>0|d>>>0>c>>>0;d=c+((d|0)==(k|0)&i>>>0<m>>>0|d>>>0<k>>>0)|0;e=0;e=d>>>0<c>>>0?1:e;g=d;c=d+v[a+24>>2]|0;d=e+f|0;v[a+24>>2]=c;v[a+28>>2]=c>>>0<g>>>0?d+1|0:d;return b}function jb(a,b,c,d,e,f,g){var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;m=T-128|0;T=m;Ta(c);n=1;a:{if(!(g?1:d)){break a}if(!g){ya(m,0);hc(a,c,c,m,d);break a}n=0;o=vc(b,6);j=1;while(1){b:{if((j|0)==13){break b}k=j+1|0;l=((((j^128)&255)>>>0)/((k&255)>>>0)<<3)+264|0;h=(l+(128<<j)|0)+8|0;if(h>>>0>o>>>0){break b}l=(o-h>>>0)/(l>>>0)|0;h=j-1|0;if(h>>>0<=11){h=v[(h<<2)+4208>>2]}else{h=0}j=h>>>0>l>>>0?l:h;i=j>>>0>i>>>0?j:i;j=k;if(h>>>0<=l>>>0){continue}}break}if(!i){break a}j=4;h=g-1|0;k=i>>>0<5e6?i:5e6;i=(h+k>>>0)/(k>>>0)|0;l=(i+h>>>0)/(i>>>0)|0;if(l>>>0<=87){k=(vc(b,6)>>>0)/(gd(1)>>>0)|0;if(!k){break a}i=(h+k>>>0)/(k>>>0)|0;l=(h+i>>>0)/(i>>>0)|0;j=5}n=1;if(!i){break a}h=0;while(1){k=g>>>0<l>>>0?g:l;if(!(V[j|0](a,b,m,h?0:d,e,f,k,B(h,l))|0)){n=0;break a}Ba(c,c,m);g=g-k|0;h=h+1|0;if((h|0)!=(i|0)){continue}break}}T=m+128|0;return n}function $b(a,b){var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;h=b;k=a;d=a;a=w[a|0];a:{if(!a){break a}b:{while(1){b=a<<24>>24;if(!((b|0)==32|b-9>>>0<5)){break b}a=w[d+1|0];d=d+1|0;if(a){continue}break}break a}c:{a=a&255;switch(a-43|0){case 0:case 2:break c;default:break a}}i=(a|0)==45?-1:0;d=d+1|0}b=0;while(1){d:{a=-48;c=t[d|0];e:{if((c-48&255)>>>0<10){break e}a=-87;if((c-97&255)>>>0<26){break e}a=-55;if((c-65&255)>>>0>25){break d}}c=a+c|0;if((c|0)>9){break d}a=1;f:{if((e|0)==429496729&f>>>0>2576980377|e>>>0>429496729){break f}j=Fe(f,e,10,0);g=U;if((g|0)==-1&(c^-1)>>>0<j>>>0){break f}a=g;e=c+j|0;a=e>>>0<c>>>0?a+1|0:a;f=e;e=a;l=1;a=b}d=d+1|0;b=a;continue}break}if(h){v[h>>2]=l?d:k}g:{h:{if(b){v[1328]=68;i=0;break h}if((e&f)!=-1){break g}}f=-1;e=-1}a=i;g=a^f;c=g-a|0;b=a>>31;U=(b^e)-(b+(a>>>0>g>>>0)|0)|0;return c}function sb(a,b){var c=0,d=0,e=0;v[a+120>>2]=v[b+120>>2];c=v[b+36>>2];v[a+32>>2]=v[b+32>>2];v[a+36>>2]=c;c=v[b+28>>2];v[a+24>>2]=v[b+24>>2];v[a+28>>2]=c;c=v[b+20>>2];v[a+16>>2]=v[b+16>>2];v[a+20>>2]=c;c=v[b+12>>2];v[a+8>>2]=v[b+8>>2];v[a+12>>2]=c;c=v[b+4>>2];v[a>>2]=v[b>>2];v[a+4>>2]=c;c=v[b+44>>2];v[a+40>>2]=v[b+40>>2];v[a+44>>2]=c;c=v[b+52>>2];v[a+48>>2]=v[b+48>>2];v[a+52>>2]=c;c=v[b+60>>2];v[a+56>>2]=v[b+56>>2];v[a+60>>2]=c;d=b- -64|0;e=v[d+4>>2];c=a- -64|0;v[c>>2]=v[d>>2];v[c+4>>2]=e;c=v[b+76>>2];v[a+72>>2]=v[b+72>>2];v[a+76>>2]=c;c=v[b+92>>2];v[a+88>>2]=v[b+88>>2];v[a+92>>2]=c;c=v[b+100>>2];v[a+96>>2]=v[b+96>>2];v[a+100>>2]=c;c=v[b+108>>2];v[a+104>>2]=v[b+104>>2];v[a+108>>2]=c;c=v[b+116>>2];v[a+112>>2]=v[b+112>>2];v[a+116>>2]=c;c=v[b+84>>2];v[a+80>>2]=v[b+80>>2];v[a+84>>2]=c;a=a+40|0;Ca(a);ra(a,a,1)}function Mb(a,b,c){var d=0,e=0,f=0,g=0;d=T-192|0;T=d;v[d+48>>2]=0;v[d+52>>2]=0;v[d+56>>2]=0;v[d+60>>2]=0;e=d- -64|0;v[e>>2]=0;v[e+4>>2]=0;v[d+72>>2]=0;v[d+76>>2]=0;v[d+80>>2]=0;v[d+84>>2]=0;v[d+88>>2]=0;v[d+92>>2]=0;v[d+96>>2]=0;v[d+100>>2]=0;v[d+40>>2]=0;v[d+44>>2]=0;g=na(b,a+40|0,128);oa(d+8|0,c,a+8|0);v[d+184>>2]=0;while(1){b=d+40|0;c=v[a>>2]+(f<<10)|0;e=jc(d+8|0,f<<2,4);Fa(b,c,!e);Fa(b,c- -64|0,(e|0)==1);Fa(b,c+128|0,(e|0)==2);Fa(b,c+192|0,(e|0)==3);Fa(b,c+256|0,(e|0)==4);Fa(b,c+320|0,(e|0)==5);Fa(b,c+384|0,(e|0)==6);Fa(b,c+448|0,(e|0)==7);Fa(b,c+512|0,(e|0)==8);Fa(b,c+576|0,(e|0)==9);Fa(b,c+640|0,(e|0)==10);Fa(b,c+704|0,(e|0)==11);Fa(b,c+768|0,(e|0)==12);Fa(b,c+832|0,(e|0)==13);Fa(b,c+896|0,(e|0)==14);Fa(b,c+960|0,(e|0)==15);c=d+104|0;ab(c,b);Ja(g,g,c);f=f+1|0;if((f|0)!=64){continue}break}T=d+192|0}function ie(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;o=o|0;p=p|0;q=q|0;var r=0;j=T-240|0;T=j;a:{if((d|0)!=32){break a}if(!Ea(v[1325],j+176|0,e,f)){break a}if(!Ea(v[1325],j+112|0,g,h)){break a}if(!hb(v[1325],j+48|0,i)){break a}v[1328]=0;d=$b(k,j+44|0);v[j+32>>2]=d;e=U;v[j+36>>2]=e;f=v[j+44>>2];if((f|0)==(k|0)|w[f|0]){break a}b:{switch(w[k|0]-43|0){case 0:case 2:break a;default:break b}}c:{if((d&e)==-1){if((q|0)!=20|(m|0)!=32){break a}if(v[1328]!=68){break c}break a}if((m|0)!=32|(q|0)!=20){break a}}v[j+28>>2]=675;v[j+24>>2]=j+48;c=Rc(v[1325],v[1326],v[1327],a,j+28|0,c,j+176|0,j+112|0,j+32|0,0,j+24|0,l,0,o?n:0,o,p);if(c){a=j+8|0;qc(a,v[j+28>>2]);na(b,Sb(a),Xb(v[j+12>>2],w[j+19|0])+1|0);Wb(a)}r=(c|0)!=0}T=j+240|0;return r|0}function ac(a,b,c,d){var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;i=T-96|0;T=i;l=v[a+152>>2];g=v[a+148>>2];e=(l>>>0)/(g>>>0)|0;m=B(e,g);f=v[a+140>>2];if(f){h=f+(e<<3)|0;f=v[h>>2];h=v[h+4>>2]}else{f=0;h=0}j=v[a+136>>2]+(e<<3)|0;k=v[j>>2];o=v[j+4>>2];a:{if((l|0)!=(m|0)){break a}j=a+104|0;n=a+40|0;fa(j,n);if(g>>>0>l>>>0){break a}g=e>>>0>1?e:1;e=0;while(1){ga(j,j,n);e=e+1|0;if((g|0)!=(e|0)){continue}break}}e=i- -64|0;g=i+32|0;vb(e,g,v[a>>2],v[a+152>>2]+2|0);ga(e,e,d);ga(g,g,d);d=k-f|0;f=o-(h+(f>>>0>k>>>0)|0)|0;h=d;k=l-m|0;d=k&31;d=((k&63)>>>0>=32?f>>>d|0:((1<<d)-1&f)<<32-d|h>>>d)&1;ya(b,d);f=a+40|0;va(i,f);oa(b,b,i);oa(b,b,e);ya(c,!d);va(c,c);oa(c,c,f);oa(c,c,g);d=a+72|0;ga(c,c,d);b=a+104|0;oa(c,c,b);v[a+152>>2]=v[a+152>>2]+1;ga(d,d,a+8|0);oa(b,b,b);T=i+96|0}function zd(a,b,c){var d=0,e=0,f=0,g=0;d=T-48|0;T=d;v[d+44>>2]=0;v[d+24>>2]=0;v[d+28>>2]=0;v[d+16>>2]=0;v[d+20>>2]=0;v[d+8>>2]=0;v[d+12>>2]=0;v[d>>2]=0;v[d+4>>2]=0;f=v[b>>2];a:{if((f|0)==(c|0)|w[f|0]!=2){break a}v[b>>2]=f+1;e=Ad(b,c);if((e|0)<=0){break a}f=c;c=v[b>>2];if(f>>>0<e+c>>>0){break a}f=t[c|0];b:{if(!(f|e>>>0<2)){if(t[c+1|0]>=0){break a}g=1;break b}c:{if(!((f|0)!=-1|e>>>0<2)){if(t[c+1|0]>=0){break c}break a}g=1;if((f|0)>=0){break b}}v[d+44>>2]=1;g=0}d:{e:{f:{g:{while(1){if(w[c|0]){break g}c=c+1|0;v[b>>2]=c;f=(e|0)>1;e=e-1|0;if(f){continue}break}e=0;break f}if(e>>>0<33){break f}v[d+44>>2]=1;break e}if(!g){break e}na((d-e|0)+32|0,c,e);la(a,d,d+44|0);if(!v[d+44>>2]){break d}}ya(a,0)}v[b>>2]=v[b>>2]+e;g=1}T=d+48|0;return g}function _a(a,b,c){var d=0,e=0,f=0,g=0,h=0;d=T-160|0;T=d;g=d,h=!wb(b+40|0)<<1|!wb(c+40|0),t[g+15|0]=h;f=d+16|0;Aa(f);ma(f,a,32);ma(f,d+15|0,1);e=v[b+36>>2];v[d+152>>2]=v[b+32>>2];v[d+156>>2]=e;e=v[b+28>>2];v[d+144>>2]=v[b+24>>2];v[d+148>>2]=e;e=v[b+20>>2];v[d+136>>2]=v[b+16>>2];v[d+140>>2]=e;e=v[b+12>>2];v[d+128>>2]=v[b+8>>2];v[d+132>>2]=e;e=v[b+4>>2];v[d+120>>2]=v[b>>2];v[d+124>>2]=e;b=d+120|0;Wa(b);La(a,b);ma(f,a,32);e=v[c+36>>2];v[d+152>>2]=v[c+32>>2];v[d+156>>2]=e;e=v[c+28>>2];v[d+144>>2]=v[c+24>>2];v[d+148>>2]=e;e=v[c+20>>2];v[d+136>>2]=v[c+16>>2];v[d+140>>2]=e;e=v[c+12>>2];v[d+128>>2]=v[c+8>>2];v[d+132>>2]=e;e=v[c+4>>2];v[d+120>>2]=v[c>>2];v[d+124>>2]=e;Wa(b);La(a,b);ma(f,a,32);za(f,a);T=d+160|0}function Yc(a,b,c){a:{switch(b-9|0){case 0:b=v[c>>2];v[c>>2]=b+4;v[a>>2]=v[b>>2];return;case 6:b=v[c>>2];v[c>>2]=b+4;b=u[b>>1];v[a>>2]=b;v[a+4>>2]=b>>31;return;case 7:b=v[c>>2];v[c>>2]=b+4;v[a>>2]=x[b>>1];v[a+4>>2]=0;return;case 8:b=v[c>>2];v[c>>2]=b+4;b=t[b|0];v[a>>2]=b;v[a+4>>2]=b>>31;return;case 9:b=v[c>>2];v[c>>2]=b+4;v[a>>2]=w[b|0];v[a+4>>2]=0;return;case 16:b=v[c>>2]+7&-8;v[c>>2]=b+8;A[a>>3]=A[b>>3];default:return;case 1:case 4:case 14:b=v[c>>2];v[c>>2]=b+4;b=v[b>>2];v[a>>2]=b;v[a+4>>2]=b>>31;return;case 2:case 5:case 11:case 15:b=v[c>>2];v[c>>2]=b+4;v[a>>2]=v[b>>2];v[a+4>>2]=0;return;case 3:case 10:case 12:case 13:break a}}b=v[c>>2]+7&-8;v[c>>2]=b+8;c=v[b+4>>2];v[a>>2]=v[b>>2];v[a+4>>2]=c}function Be(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0;h=T-16|0;T=h;i=Nb(h,d);a:{while(1){if((d|0)!=(f|0)){g=0;if(v[(f<<2)+c>>2]!=32){break a}j=Hb(v[i>>2],f),k=(f<<5)+b|0,v[j>>2]=k;f=f+1|0;continue}break}c=v[1325];g=v[i>>2];b=T-80|0;T=b;b:{if(!a){ia(v[c+176>>2],v[c+180>>2],1453);f=0;break b}if(!g){ia(v[c+176>>2],v[c+180>>2],1559);f=0;break b}if(d>>>0<e>>>0){ia(v[c+176>>2],v[c+180>>2],1180);f=0;break b}c=0;ya(b+48|0,0);if(d){while(1){la(b+16|0,v[g+(c<<2)>>2],b+12|0);f=0;if(v[b+12>>2]){break b}if(c>>>0>=e>>>0){f=b+16|0;va(f,f)}f=b+48|0;oa(f,f,b+16|0);c=c+1|0;if((d|0)!=(c|0)){continue}break}}ua(a,b+48|0);f=1}T=b+80|0;g=(f|0)!=0}db(i);T=h+16|0;return g|0}function qb(a){var b=0,c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;d=v[a+4>>2];c=v[a+36>>2];o=c;i=v[a+32>>2];b=v[a>>2];c=Fe(c>>>16|0,0,977,1);b=b+c|0;d=U+d|0;d=b>>>0<c>>>0?d+1|0:d;m=b^976;c=d&1048575;n=c^1;a:{if(b|c){e=0;if((m|0)!=-1|(n|0)!=1048575){break a}}g=b;h=c;e=v[a+16>>2];k=v[a+20>>2];f=d>>>20|0;d=f+v[a+8>>2]|0;b=v[a+12>>2];b=d>>>0<f>>>0?b+1|0:b;c=b;j=b>>>20|0;e=j+e|0;b=k;k=e;f=d|e;b=e>>>0<j>>>0?b+1|0:b;e=b;j=c|b;l=g;p=f;f=b>>>20|0;g=f+v[a+24>>2]|0;a=v[a+28>>2];a=f>>>0>g>>>0?a+1|0:a;b=l|(p|g);f=(a|j)&1048575|h;l=b;b=i;i=a>>>20|0;h=b+i|0;b=o&65535;b=h>>>0<i>>>0?b+1|0:b;e=!(l|h|(b|f))|(g&(k&(h&(d&m))))==-1&(a&(e&(c&n&(b^983040))))==1048575}return e}function je(a,b,c,d,e,f,g,h,i,j,k,l,m){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0,o=0,p=0;n=T-32|0;T=n;v[n+28>>2]=c;c=0;a:{if((d|0)!=32){break a}v[1328]=0;d=$b(e,n+24|0);v[n+16>>2]=d;o=U;v[n+20>>2]=o;p=v[n+24>>2];if((p|0)==(e|0)|w[p|0]){break a}b:{switch(w[e|0]-43|0){case 0:case 2:break a;default:break b}}c:{if((d&o)==-1){if((m|0)!=20|(i|0)!=32|(g|0)!=32){break a}if(v[1328]!=68){break c}break a}if((g|0)!=32|(i|0)!=32|(m|0)!=20){break a}}v[n+12>>2]=675;a=Rc(v[1325],v[1326],v[1327],a,n+12|0,0,0,0,n+16|0,n+28|0,0,f,h,k?j:0,k,l);if(a){qc(n,v[n+12>>2]);na(b,Sb(n),Xb(v[n+4>>2],w[n+11|0])+1|0);Wb(n)}c=(a|0)!=0}T=n+32|0;return c|0}function pe(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;d=T-32|0;T=d;e=v[a+28>>2];v[d+16>>2]=e;f=v[a+20>>2];v[d+28>>2]=c;v[d+24>>2]=b;b=f-e|0;v[d+20>>2]=b;f=b+c|0;i=2;b=d+16|0;a:{while(1){b:{c:{d:{if(!$c(R(v[a+60>>2],b|0,i|0,d+12|0)|0)){g=v[d+12>>2];if((g|0)==(f|0)){break d}if((g|0)>=0){break c}break b}if((f|0)!=-1){break b}}b=v[a+44>>2];v[a+28>>2]=b;v[a+20>>2]=b;v[a+16>>2]=b+v[a+48>>2];a=c;break a}h=v[b+4>>2];j=h>>>0<g>>>0;e=(j<<3)+b|0;h=g-(j?h:0)|0;v[e>>2]=h+v[e>>2];b=(j?12:4)+b|0;v[b>>2]=v[b>>2]-h;f=f-g|0;i=i-j|0;b=e;continue}break}v[a+28>>2]=0;v[a+16>>2]=0;v[a+20>>2]=0;v[a>>2]=v[a>>2]|32;a=0;if((i|0)==2){break a}a=c-v[b+4>>2]|0}T=d+32|0;return a|0}function Qd(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;g=T+-64|0;T=g;f=0;a:{if(!cb(b,c)){break a}f=0;if(!Ea(v[1325],g,d,e)){break a}d=v[1325];e=0;c=T-400|0;T=c;v[c+396>>2]=0;b:{if(!a){ia(v[d+176>>2],v[d+180>>2],1485);break b}if(!g){ia(v[d+176>>2],v[d+180>>2],1471);break b}if(!b){ia(v[d+176>>2],v[d+180>>2],1574);break b}Ua(d,c+176|0,g);la(c+144|0,b,c+396|0);c:{if(v[c+396>>2]){break c}if(pa(c+144|0)){break c}d=c+264|0;b=c+176|0;Pa(d,b,c+144|0,256);sa(b,d);Wa(b);Wa(c+216|0);d=c+112|0;La(d,b);h=c,i=Qb(v[c+216>>2])|2,t[h+111|0]=i;b=c+8|0;Aa(b);e=1;ma(b,c+111|0,1);ma(b,d,32);za(b,a)}ta(c+144|0)}T=c+400|0;f=(e|0)!=0}T=g- -64|0;return f|0}function sa(a,b){var c=0,d=0,e=0,f=0;e=T-80|0;T=e;v[a+80>>2]=v[b+120>>2];c=b+80|0;Fc(c,c);d=e+40|0;ea(d,c);ha(e,c,d);ha(b,b,d);d=b+40|0;ha(d,d,e);bb(c,1);c=v[b+36>>2];v[a+32>>2]=v[b+32>>2];v[a+36>>2]=c;c=v[b+28>>2];v[a+24>>2]=v[b+24>>2];v[a+28>>2]=c;c=v[b+20>>2];v[a+16>>2]=v[b+16>>2];v[a+20>>2]=c;c=v[b+12>>2];v[a+8>>2]=v[b+8>>2];v[a+12>>2]=c;c=v[b+4>>2];v[a>>2]=v[b>>2];v[a+4>>2]=c;c=v[b+44>>2];v[a+40>>2]=v[b+40>>2];v[a+44>>2]=c;c=v[b+52>>2];v[a+48>>2]=v[b+48>>2];v[a+52>>2]=c;c=v[b+60>>2];v[a+56>>2]=v[b+56>>2];v[a+60>>2]=c;d=b- -64|0;f=v[d+4>>2];c=a- -64|0;v[c>>2]=v[d>>2];v[c+4>>2]=f;c=v[b+76>>2];v[a+72>>2]=v[b+72>>2];v[a+76>>2]=c;T=e+80|0}function eb(a,b){var c=0,d=0,e=0,f=0,g=0,h=0,i=0;d=T-16|0;T=d;v[d>>2]=0;v[d+4>>2]=0;Ab(d+8|0);if(b){c=T-16|0;T=c;v[c+12>>2]=-1;v[c+8>>2]=2147483647;e=v[oc(c+12|0,c+8|0)>>2];T=c+16|0;if(b>>>0>e>>>0){Ub();L()}c=mc(b);v[d>>2]=c;v[d+4>>2]=c;h=Tb(d),i=b+c|0,v[h>>2]=i;c=T-16|0;T=c;v[c>>2]=d;e=v[d+4>>2];v[c+4>>2]=e;v[c+8>>2]=b+e;e=v[c+4>>2];f=v[c+8>>2];while(1){if((e|0)==(f|0)){pc(c);T=c+16|0}else{t[e|0]=0;e=e+1|0;v[c+4>>2]=e;continue}break}}tb(v[d>>2],b);e=v[d>>2];a:{if(!b){break a}while(1){c=w[a|0];f=w[e|0];if((c|0)==(f|0)){e=e+1|0;a=a+1|0;b=b-1|0;if(b){continue}break a}break}g=c-f|0}if(v[d>>2]){Mc(d);Sa(v[d>>2])}T=d+16|0;return!g}function Ya(a,b,c,d,e){var f=0,g=0,h=0,i=0,j=0,k=0;f=T-96|0;T=f;a:{if(!c){ia(v[a+176>>2],v[a+180>>2],1589);break a}g=v[c>>2];h=e&256;if(g>>>0<(h?33:65)>>>0){ia(v[a+176>>2],v[a+180>>2],3205);break a}v[f+4>>2]=g;v[c>>2]=0;if(!b){ia(v[a+176>>2],v[a+180>>2],1405);break a}b=Xa(b,0,g);if(!d){ia(v[a+176>>2],v[a+180>>2],1390);break a}if((e&255)!=2){ia(v[a+176>>2],v[a+180>>2],1303);break a}if(!Ua(a,f+8|0,d)){break a}d=0;e=f+8|0;if(!v[e+80>>2]){b:{Ra(e);a=e+40|0;Ra(a);d=1;La(b+1|0,e);if(h){v[f+4>>2]=33;j=b,k=Qb(v[a>>2])?3:2,t[j|0]=k;break b}v[f+4>>2]=65;t[b|0]=4;La(b+33|0,a)}}if(!d){break a}v[c>>2]=v[f+4>>2];i=1}T=f+96|0;return i}function ic(a){var b=0,c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;e=v[a+8>>2];g=v[a+12>>2];f=v[a+4>>2];d=v[a+36>>2];i=d;j=v[a+32>>2];c=v[a>>2];b=Fe(d>>>16|0,0,977,1);d=c+b|0;c=U+f|0;k=d;c=b>>>0>d>>>0?c+1|0:c;l=c;d=c>>>20|0;f=d+e|0;b=g;b=d>>>0>f>>>0?b+1|0:b;m=f;d=k|f;f=b;h=c|b;c=d;d=b>>>20|0;e=d+v[a+16>>2]|0;b=v[a+20>>2];b=d>>>0>e>>>0?b+1|0:b;n=e;e=c|e;d=b;g=b|h;c=v[a+28>>2];h=e;e=v[a+24>>2];a=b>>>20|0;e=e+a|0;b=c;c=h|e;b=a>>>0>e>>>0?b+1|0:b;a=b;h=(b|g)&1048575;g=b>>>20|0;j=g+j|0;b=i&65535;i=c;c=j;b=g>>>0>c>>>0?b+1|0:b;return!(i|c|(b|h))|(e&(n&(m&(c&(k^976)))))==-1&(a&(d&(f&((l^1)&(b^983040)))))==1048575}function xa(a,b){var c=0,d=0,e=0,f=0;c=T-80|0;T=c;d=v[b+12>>2];v[c+48>>2]=v[b+8>>2];v[c+52>>2]=d;d=v[b+20>>2];v[c+56>>2]=v[b+16>>2];v[c+60>>2]=d;e=v[b+28>>2];d=c- -64|0;v[d>>2]=v[b+24>>2];v[d+4>>2]=e;d=v[b+36>>2];v[c+72>>2]=v[b+32>>2];v[c+76>>2]=d;d=v[b+4>>2];v[c+40>>2]=v[b>>2];v[c+44>>2]=d;d=c+40|0;Wa(d);e=v[b+76>>2];v[c+32>>2]=v[b+72>>2];v[c+36>>2]=e;e=b- -64|0;f=v[e+4>>2];v[c+24>>2]=v[e>>2];v[c+28>>2]=f;e=v[b+60>>2];v[c+16>>2]=v[b+56>>2];v[c+20>>2]=e;e=v[b+52>>2];v[c+8>>2]=v[b+48>>2];v[c+12>>2]=e;e=v[b+44>>2];v[c>>2]=v[b+40>>2];v[c+4>>2]=e;Wa(c);zb(a,d);zb(a+32|0,c);T=c+80|0}function xe(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;i=T-112|0;T=i;Ta(c);k=1;a:{if(!(g?1:d)){break a}if(!kb(b,gd(g),6)){k=0;break a}l=wa(b,g<<7);m=wa(b,g<<5);o=i,p=wa(b,g<<10),v[o+88>>2]=p;o=i,p=wa(b,B(g,320)),v[o+92>>2]=p;j=wa(b,B(g,1408));v[i+96>>2]=j;v[i+100>>2]=j+B(g,704);o=i,p=wa(b,B(g,1120)),v[o+104>>2]=p;j=0;n=i+88|0;if(g){while(1){if(!(V[e|0]((j<<5)+m|0,i,h+j|0,f)|0)){Na(b);k=0;break a}Oa((j<<7)+l|0,i);j=j+1|0;if((j|0)!=(g|0)){continue}break}}else{g=0}ud(a,n,c,g,l,m,d);Na(b)}T=i+112|0;return k|0}function Oa(a,b){var c=0,d=0,e=0;v[a+120>>2]=v[b+80>>2];c=v[b+4>>2];v[a>>2]=v[b>>2];v[a+4>>2]=c;c=v[b+12>>2];v[a+8>>2]=v[b+8>>2];v[a+12>>2]=c;c=v[b+20>>2];v[a+16>>2]=v[b+16>>2];v[a+20>>2]=c;c=v[b+28>>2];v[a+24>>2]=v[b+24>>2];v[a+28>>2]=c;c=v[b+36>>2];v[a+32>>2]=v[b+32>>2];v[a+36>>2]=c;c=v[b+44>>2];v[a+40>>2]=v[b+40>>2];v[a+44>>2]=c;c=v[b+52>>2];v[a+48>>2]=v[b+48>>2];v[a+52>>2]=c;c=v[b+60>>2];v[a+56>>2]=v[b+56>>2];v[a+60>>2]=c;d=b- -64|0;e=v[d+4>>2];c=a- -64|0;v[c>>2]=v[d>>2];v[c+4>>2]=e;c=v[b+76>>2];v[a+72>>2]=v[b+72>>2];v[a+76>>2]=c;bb(a+80|0,1)}function Ca(a){var b=0,c=0,d=0,e=0,f=0;b=v[a+4>>2];c=v[a+36>>2];e=c;f=v[a+32>>2];d=v[a>>2];c=Fe(c>>>16|0,0,977,1);d=d+c|0;b=U+b|0;b=c>>>0>d>>>0?b+1|0:b;v[a>>2]=d;v[a+4>>2]=b&1048575;d=b>>>20|0;c=d+v[a+8>>2]|0;b=v[a+12>>2];v[a+8>>2]=c;b=c>>>0<d>>>0?b+1|0:b;v[a+12>>2]=b&1048575;d=b>>>20|0;c=d+v[a+16>>2]|0;b=v[a+20>>2];v[a+16>>2]=c;b=c>>>0<d>>>0?b+1|0:b;v[a+20>>2]=b&1048575;d=b>>>20|0;c=d+v[a+24>>2]|0;b=v[a+28>>2];b=c>>>0<d>>>0?b+1|0:b;v[a+24>>2]=c;v[a+28>>2]=b&1048575;c=b>>>20|0;d=c+f|0;b=e&65535;v[a+32>>2]=d;v[a+36>>2]=c>>>0>d>>>0?b+1|0:b}function xb(a,b){var c=0,d=0,e=0,f=0;d=T-16|0;T=d;v[d+12>>2]=b;c=T-208|0;T=c;v[c+204>>2]=b;b=c+160|0;Xa(b,0,40);v[c+200>>2]=v[c+204>>2];a:{if((_c(0,a,c+200|0,c+80|0,b)|0)<0){break a}f=v[1307]>=0;e=v[1288];if(v[1306]<=0){v[1288]=e&-33}b:{c:{d:{if(!v[1300]){v[1300]=80;v[1292]=0;v[1293]=0;v[1295]=0;b=v[1299];v[1299]=c;break d}b=0;if(v[1292]){break c}}if(id(5152)){break b}}_c(5152,a,c+200|0,c+80|0,c+160|0)}if(b){V[v[1297]](5152,0,0)|0;v[1299]=b;v[1292]=0;v[1293]=0;v[1300]=0;v[1295]=0}v[1288]=v[1288]|e&32;if(!f){break a}}T=c+208|0;T=d+16|0}function qa(a,b){var c=0,d=0,e=0;c=v[a+4>>2]+v[b+4>>2]|0;e=v[b>>2];d=e+v[a>>2]|0;v[a>>2]=d;v[a+4>>2]=d>>>0<e>>>0?c+1|0:c;c=v[a+12>>2]+v[b+12>>2]|0;e=v[b+8>>2];d=e+v[a+8>>2]|0;v[a+8>>2]=d;v[a+12>>2]=d>>>0<e>>>0?c+1|0:c;c=v[a+20>>2]+v[b+20>>2]|0;e=v[b+16>>2];d=e+v[a+16>>2]|0;v[a+16>>2]=d;v[a+20>>2]=d>>>0<e>>>0?c+1|0:c;c=v[a+28>>2]+v[b+28>>2]|0;e=v[b+24>>2];d=e+v[a+24>>2]|0;v[a+24>>2]=d;v[a+28>>2]=d>>>0<e>>>0?c+1|0:c;d=v[b+32>>2];c=d+v[a+32>>2]|0;b=v[a+36>>2]+v[b+36>>2]|0;v[a+32>>2]=c;v[a+36>>2]=c>>>0<d>>>0?b+1|0:b}function Bd(a,b,c){var d=0;v[a+80>>2]=0;d=v[b+4>>2];v[a>>2]=v[b>>2];v[a+4>>2]=d;d=v[b+12>>2];v[a+8>>2]=v[b+8>>2];v[a+12>>2]=d;d=v[b+20>>2];v[a+16>>2]=v[b+16>>2];v[a+20>>2]=d;d=v[b+28>>2];v[a+24>>2]=v[b+24>>2];v[a+28>>2]=d;d=v[b+36>>2];v[a+32>>2]=v[b+32>>2];v[a+36>>2]=d;b=v[c+4>>2];v[a+40>>2]=v[c>>2];v[a+44>>2]=b;b=v[c+12>>2];v[a+48>>2]=v[c+8>>2];v[a+52>>2]=b;b=v[c+20>>2];v[a+56>>2]=v[c+16>>2];v[a+60>>2]=b;d=v[c+28>>2];b=a- -64|0;v[b>>2]=v[c+24>>2];v[b+4>>2]=d;b=v[c+36>>2];v[a+72>>2]=v[c+32>>2];v[a+76>>2]=b}function gc(a,b,c,d){var e=0,f=0,g=0,h=0,i=0,j=0;e=T-32|0;T=e;f=v[c+28>>2];v[e+24>>2]=v[c+24>>2];v[e+28>>2]=f;f=v[c+20>>2];v[e+16>>2]=v[c+16>>2];v[e+20>>2]=f;f=v[c+12>>2];v[e+8>>2]=v[c+8>>2];v[e+12>>2]=f;f=v[c+4>>2];v[e>>2]=v[c>>2];v[e+4>>2]=f;i=Xa(a,0,b<<2);f=1;if(jc(e,255,1)){va(e,e);f=-1}a=-1;j=d-1|0;c=0;while(1){if((jc(e,c,1)|0)==(g|0)){c=c+1|0}else{a=b-c|0;h=(a|0)<(d|0)?a:d;a=Fb(e,c,h)+g|0;g=a>>>j&1;v[(c<<2)+i>>2]=B(a-(g<<d)|0,f);a=c;c=c+h|0}if((b|0)>(c|0)){continue}break}T=e+32|0;return a+1|0}function Pb(a,b,c){var d=0,e=0,f=0;f=T-208|0;T=f;v[a>>2]=16843009;v[a+4>>2]=16843009;v[a+32>>2]=0;v[a+36>>2]=0;v[a+24>>2]=16843009;v[a+28>>2]=16843009;v[a+16>>2]=16843009;v[a+20>>2]=16843009;v[a+8>>2]=16843009;v[a+12>>2]=16843009;v[a+40>>2]=0;v[a+44>>2]=0;v[a+48>>2]=0;v[a+52>>2]=0;v[a+56>>2]=0;v[a+60>>2]=0;d=f+8|0;e=a+32|0;pb(d,e);Va(d,a,32);Va(d,4168,1);Va(d,b,c);ob(d,e);pb(d,e);Va(d,a,32);ob(d,a);pb(d,e);Va(d,a,32);Va(d,4169,1);Va(d,b,c);ob(d,e);pb(d,e);Va(d,a,32);ob(d,a);v[a+64>>2]=0;T=f+208|0}function bc(a,b,c,d,e){v[a>>2]=b;b=v[c+4>>2];v[a+8>>2]=v[c>>2];v[a+12>>2]=b;b=v[c+12>>2];v[a+16>>2]=v[c+8>>2];v[a+20>>2]=b;b=v[c+20>>2];v[a+24>>2]=v[c+16>>2];v[a+28>>2]=b;b=v[c+28>>2];v[a+32>>2]=v[c+24>>2];v[a+36>>2]=b;b=v[d+4>>2];v[a+40>>2]=v[d>>2];v[a+44>>2]=b;b=v[d+12>>2];v[a+48>>2]=v[d+8>>2];v[a+52>>2]=b;b=v[d+20>>2];v[a+56>>2]=v[d+16>>2];v[a+60>>2]=b;c=v[d+28>>2];b=a- -64|0;v[b>>2]=v[d+24>>2];v[b+4>>2]=c;ya(a+72|0,1);v[a+140>>2]=0;v[a+144>>2]=1;v[a+136>>2]=e;v[a+148>>2]=64;v[a+152>>2]=0}function ra(a,b,c){var d=0,e=0,f=0,g=0;g=c+1|0;c=Fe(g,0,-1954,2097149);d=v[b>>2];e=U-(v[b+4>>2]+(d>>>0>c>>>0)|0)|0;v[a>>2]=c-d;v[a+4>>2]=e;c=Fe(g,0,-2,2097151);d=U;e=v[b+8>>2];f=d-(v[b+12>>2]+(e>>>0>c>>>0)|0)|0;v[a+8>>2]=c-e;v[a+12>>2]=f;e=v[b+16>>2];f=d-(v[b+20>>2]+(e>>>0>c>>>0)|0)|0;v[a+16>>2]=c-e;v[a+20>>2]=f;f=d;d=v[b+24>>2];e=f-(v[b+28>>2]+(d>>>0>c>>>0)|0)|0;v[a+24>>2]=c-d;v[a+28>>2]=e;c=Fe(g,0,-2,131071);f=v[b+36>>2];b=v[b+32>>2];g=U-(f+(b>>>0>c>>>0)|0)|0;v[a+32>>2]=c-b;v[a+36>>2]=g}function ed(a,b,c){var d=0,e=0,f=0,g=0,h=0;d=T-48|0;T=d;g=c+7>>>3|0;h=Xa(a,0,g);if(c){while(1){a=B(f,88)+b|0;e=v[a+36>>2];v[d+40>>2]=v[a+32>>2];v[d+44>>2]=e;e=v[a+28>>2];v[d+32>>2]=v[a+24>>2];v[d+36>>2]=e;e=v[a+20>>2];v[d+24>>2]=v[a+16>>2];v[d+28>>2]=e;e=v[a+12>>2];v[d+16>>2]=v[a+8>>2];v[d+20>>2]=e;e=v[a+4>>2];v[d+8>>2]=v[a>>2];v[d+12>>2]=e;e=d+8|0;Wa(e);La(((f<<5)+g|0)+h|0,e);if(!wb(a+40|0)){a=(f>>>3|0)+h|0;t[a|0]=w[a|0]|1<<(f&7)}f=f+1|0;if((f|0)!=(c|0)){continue}break}}T=d+48|0}function ka(a,b,c){var d=0,e=0,f=0,g=0,h=0;e=0-c|0;d=e&v[b>>2];f=c-1|0;h=c>>31;g=0-(h+((c|0)!=0)|0)|0;c=h-!c|0;h=g&v[b+4>>2]|c&v[a+4>>2];v[a>>2]=d|f&v[a>>2];v[a+4>>2]=h;d=g&v[b+12>>2]|c&v[a+12>>2];v[a+8>>2]=e&v[b+8>>2]|f&v[a+8>>2];v[a+12>>2]=d;d=g&v[b+20>>2]|c&v[a+20>>2];v[a+16>>2]=e&v[b+16>>2]|f&v[a+16>>2];v[a+20>>2]=d;d=g&v[b+28>>2]|c&v[a+28>>2];v[a+24>>2]=e&v[b+24>>2]|f&v[a+24>>2];v[a+28>>2]=d;c=g&v[b+36>>2]|c&v[a+36>>2];v[a+32>>2]=e&v[b+32>>2]|f&v[a+32>>2];v[a+36>>2]=c}function kc(a,b){var c=0,d=0,e=0,f=0;v[a>>2]=0;v[a+4>>2]=0;Ab(a+8|0);if(b){c=T-16|0;T=c;v[c+12>>2]=67108863;v[c+8>>2]=2147483647;d=v[oc(c+12|0,c+8|0)>>2];T=c+16|0;if(b>>>0>d>>>0){Ub();L()}if(b>>>0>=67108864){nc();L()}b=b<<6;c=mc(b);v[a>>2]=c;v[a+4>>2]=c;e=Tb(a),f=b+c|0,v[e>>2]=f;c=T-16|0;T=c;v[c>>2]=a;d=v[a+4>>2];v[c+4>>2]=d;v[c+8>>2]=b+d;b=v[c+4>>2];d=v[c+8>>2];while(1){if((b|0)==(d|0)){pc(c);T=c+16|0}else{Xa(b,0,64);b=b- -64|0;v[c+4>>2]=b;continue}break}}return a}function Nb(a,b){var c=0,d=0,e=0,f=0;v[a>>2]=0;v[a+4>>2]=0;Ab(a+8|0);if(b){c=T-16|0;T=c;v[c+12>>2]=1073741823;v[c+8>>2]=2147483647;d=v[oc(c+12|0,c+8|0)>>2];T=c+16|0;if(b>>>0>d>>>0){Ub();L()}if(b>>>0>=1073741824){nc();L()}b=b<<2;c=mc(b);v[a>>2]=c;v[a+4>>2]=c;e=Tb(a),f=b+c|0,v[e>>2]=f;c=T-16|0;T=c;v[c>>2]=a;d=v[a+4>>2];v[c+4>>2]=d;v[c+8>>2]=b+d;b=v[c+4>>2];d=v[c+8>>2];while(1){if((b|0)==(d|0)){pc(c);T=c+16|0}else{Ab(b);b=b+4|0;v[c+4>>2]=b;continue}break}}return a}function Gd(a,b){var c=0,d=0,e=0;d=v[b+4>>2]&1048575;v[a>>2]=v[b>>2];v[a+4>>2]=d;c=v[b+8>>2];d=v[b+12>>2]<<12|c>>>20;v[a+8>>2]=c<<12&-4096|v[b+4>>2]>>>20;v[a+12>>2]=d&1048575;c=v[b+16>>2];d=v[b+20>>2]<<24|c>>>8;v[a+16>>2]=c<<24&-16777216|v[b+12>>2]>>>8;v[a+20>>2]=d&1048575;e=v[b+24>>2]<<4&1048560;c=v[b+20>>2];d=c>>>28|0;v[a+24>>2]=(c&268435455)<<4|v[b+16>>2]>>>28;v[a+28>>2]=d|e;c=v[b+28>>2];b=v[b+24>>2];v[a+32>>2]=(c&65535)<<16|b>>>16;v[a+36>>2]=c>>>16}function rd(a,b,c){var d=0,e=0,f=0,g=0,h=0,i=0;d=T+-64|0;T=d;wd(d,b,c);e=v[d+44>>2];g=v[d+40>>2];c=g<<16;f=v[d+36>>2];b=f>>>16|0;h=v[d+32>>2];v[a>>2]=(f&65535)<<16|h>>>16;v[a+4>>2]=b|c;i=v[d+52>>2];f=v[d+48>>2];c=f<<16;v[a+8>>2]=(e&65535)<<16|g>>>16;v[a+12>>2]=e>>>16|c;b=v[d+60>>2];c=b>>>16|0;e=v[d+56>>2];v[a+24>>2]=(b&65535)<<16|e>>>16;v[a+28>>2]=c;b=e<<16;v[a+16>>2]=(i&65535)<<16|f>>>16;v[a+20>>2]=i>>>16|b;qd(a,0,h>>>15&1);T=d- -64|0}function ad(a,b,c,d,e){var f=0;f=T-224|0;T=f;v[f+140>>2]=33;Aa(f+32|0);a:{if(Ya(a,f+144|0,f+140|0,c,258)){ma(f+32|0,f+144|1,32);if(d){v[f+140>>2]=33;if(!Ya(a,f+144|0,f+140|0,d,258)){break a}ma(f+32|0,f+144|0,33)}a=f+32|0;ma(a,e,32);c=a;a=f+192|0;za(c,a);la(b,a,f+136|0);T=f+224|0;return}v[f+8>>2]=3098;v[f+4>>2]=46;v[f>>2]=1270;xb(3327,f);O();L()}v[f+24>>2]=2993;v[f+20>>2]=52;v[f+16>>2]=1270;xb(3327,f+16|0);O();L()}function bd(a,b,c,d){var e=0,f=0;e=T-48|0;T=e;a:{if(!Qa(v[a+8>>2])){ia(v[a+176>>2],v[a+180>>2],2066);a=0;break a}if(!b){ia(v[a+176>>2],v[a+180>>2],1787);a=0;break a}if(!c){ia(v[a+176>>2],v[a+180>>2],1804);a=0;break a}if(d){a=a+8|0;while(1){Ob(d,e);la(b,e,e+44|0);f=pa(b);v[e+44>>2]=f;if(f){continue}break}Mb(a,c,b);a=1;if(Cb(c)){break a}va(b,b);sb(c,c);break a}ia(v[a+176>>2],v[a+180>>2],1717);a=0}T=e+48|0;return a}function zb(a,b){var c=0,d=0,e=0,f=0;c=v[b+4>>2];e=v[b+8>>2]<<20;v[a>>2]=v[b>>2];v[a+4>>2]=c|e;c=v[b+16>>2]<<8;d=v[b+12>>2];e=d>>>12|0;v[a+8>>2]=(d&4095)<<20|v[b+8>>2]>>>12;v[a+12>>2]=c|e;c=v[b+24>>2];d=c<<28;c=v[b+28>>2]<<28|c>>>4;f=d;d=v[b+20>>2];e=d>>>24|0;v[a+16>>2]=f|((d&16777215)<<8|v[b+16>>2]>>>24);v[a+20>>2]=c|e;c=v[b+32>>2];d=c<<16;c=v[b+36>>2]<<16|c>>>16;v[a+24>>2]=v[b+28>>2]>>>4|d;v[a+28>>2]=c}function Ad(a,b){var c=0,d=0,e=0,f=0;e=-1;c=v[a>>2];a:{if(c>>>0>=b>>>0){break a}d=c+1|0;v[a>>2]=d;c=w[c|0];if((c|0)==255){break a}f=c<<24>>24;if((f|0)>=0){return c}if((f|0)==-128){break a}c=c&127;if((c|0)>(b-d|0)|(!w[d|0]|c>>>0>4)){break a}b:{if(!c){break b}e=0;while(1){e=w[d|0]|e<<8;if(e+c>>>0>b-d>>>0){break b}d=d+1|0;v[a>>2]=d;f=(c|0)>1;c=c-1|0;if(f){continue}break}if(e>>>0>127){break a}}e=-1}return e}function vc(a,b){var c=0,d=0,e=0,f=0,g=0,h=0,i=0;d=v[a+60>>2];a:{if(!d){break a}if(d-1>>>0>=3){e=d&-4;c=a+40|0;while(1){f=h<<2;g=v[c+(f|12)>>2]+(v[c+(f|8)>>2]+(v[c+(f|4)>>2]+(v[c+f>>2]+g|0)|0)|0)|0;h=h+4|0;if((h|0)!=(e|0)){continue}break}}c=d&3;if(!c){break a}while(1){g=v[((e<<2)+a|0)+40>>2]+g|0;e=e+1|0;i=i+1|0;if((c|0)!=(i|0)){continue}break}}a=v[a+64>>2]-g|0;b=a-(b<<4)|0;return a>>>0<b>>>0?0:b}function Pc(a,b,c,d,e){var f=0;f=T-432|0;T=f;a:{if(!b){ia(v[a+176>>2],v[a+180>>2],1500);c=0;break a}if(!c){ia(v[a+176>>2],v[a+180>>2],1821);c=0;break a}lb(f+344|0,3402);lb(f+256|0,3338);la(f+8|0,c,f+4|0);c=0;if(!v[f+4>>2]){wc(f+128|0,f+8|0,d,e,f+344|0,f+256|0);if(!v[f+248>>2]){a=f+40|0;sa(a,f+128|0);dc(b,a);c=1}Dc(f+128|0);a=f+40|0;v[a+80>>2]=0;gb(a);gb(a+40|0)}ta(f+8|0)}T=f+432|0;return c}function ub(a,b,c){var d=0,e=0,f=0;if(!(w[a|0]&32)){a:{d=b;b=a;a=v[b+16>>2];b:{if(!a){if(id(b)){break b}a=v[b+16>>2]}f=v[b+20>>2];if(a-f>>>0<c>>>0){V[v[b+36>>2]](b,d,c)|0;break a}c:{if(v[b+80>>2]<0){break c}a=c;while(1){e=a;if(!a){break c}a=e-1|0;if(w[d+a|0]!=10){continue}break}if(V[v[b+36>>2]](b,d,e)>>>0<e>>>0){break b}d=d+e|0;c=c-e|0;f=v[b+20>>2]}na(f,d,c);v[b+20>>2]=v[b+20>>2]+c}}}}function Dd(a,b,c){var d=0,e=0,f=0,g=0,h=0;e=0-c|0;d=e&v[b>>2];f=c-1|0;g=0-((c|0)!=0)|0;c=0-!c|0;h=g&v[b+4>>2]|c&v[a+4>>2];v[a>>2]=d|f&v[a>>2];v[a+4>>2]=h;d=g&v[b+12>>2]|c&v[a+12>>2];v[a+8>>2]=e&v[b+8>>2]|f&v[a+8>>2];v[a+12>>2]=d;d=g&v[b+20>>2]|c&v[a+20>>2];v[a+16>>2]=e&v[b+16>>2]|f&v[a+16>>2];v[a+20>>2]=d;c=g&v[b+28>>2]|c&v[a+28>>2];v[a+24>>2]=e&v[b+24>>2]|f&v[a+24>>2];v[a+28>>2]=c}function yb(a,b){var c=0,d=0,e=0;d=T-128|0;T=d;c=v[b+36>>2];v[a+32>>2]=v[b+32>>2];v[a+36>>2]=c;c=v[b+28>>2];v[a+24>>2]=v[b+24>>2];v[a+28>>2]=c;c=v[b+20>>2];v[a+16>>2]=v[b+16>>2];v[a+20>>2]=c;c=v[b+12>>2];v[a+8>>2]=v[b+8>>2];v[a+12>>2]=c;c=v[b+4>>2];v[a>>2]=v[b>>2];v[a+4>>2]=c;c=d+88|0;ea(c,b);e=d+48|0;ha(e,b,c);v[a+80>>2]=0;b=d+8|0;bb(b,7);qa(b,e);a=Jb(a+40|0,b);T=d+128|0;return a}function $d(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0;e=T-80|0;T=e;a:{if((c|0)!=32){break a}v[1328]=0;c=$b(d,e+76|0);g=U;f=v[e+76>>2];if((f|0)==(d|0)|w[f|0]){break a}b:{switch(w[d|0]-43|0){case 0:case 2:break a;default:break b}}d=v[1325];f=e+8|0;if((c&g)==-1){if(v[1328]==68){break a}g=-1;c=-1}if(!Pc(d,f,b,c,g)){break a}h=(Vb(v[1325],a,e+8|0)|0)!=0}T=e+80|0;return h|0}function md(a){var b=0,c=0,d=0,e=0,f=0,g=0,h=0;c=v[a+28>>2];e=v[a+24>>2];v[a+24>>2]=(c&15)<<28|e>>>4;v[a+28>>2]=c>>>4;c=v[a+12>>2];h=v[a+8>>2];f=h<<28;d=v[a+4>>2];b=d>>>4|0;g=(d&15)<<28;d=v[a>>2];v[a>>2]=g|d>>>4;v[a+4>>2]=b|f;f=e<<28;b=v[a+20>>2];e=b>>>4|0;g=(b&15)<<28;b=v[a+16>>2];v[a+16>>2]=g|b>>>4;v[a+20>>2]=e|f;v[a+8>>2]=(c&15)<<28|h>>>4;v[a+12>>2]=b<<28|c>>>4;return d&15}function Lb(a){var b=0,c=0,d=0,e=0;b=v[a+12>>2];c=v[a+8>>2];d=v[a+4>>2];d=(b|0)==-1162945306&c>>>0>2940772411|b>>>0>3132021990|((d|0)==-1076732276&y[a>>2]>3493216576|d>>>0>3218235020);e=(b|0)==-1162945306&c>>>0<2940772411|b>>>0<3132021990;c=(v[a+24>>2]&v[a+28>>2])!=-1;b=v[a+20>>2];a=v[a+16>>2];c=c|((b|0)==-1&a>>>0<4294967294|(b|0)!=-1);return d&((e|c)^-1)|(c^-1)&(a&b)==-1}function qc(a,b){var c=0,d=0,e=0,f=0,g=0,h=0,i=0;e=T-32|0;T=e;h=e+32|0;d=h;f=e+21|0;c=d-f|0;a:{if((c|0)<=9){i=c;c=B(32-E(b|1)|0,1233)>>12;g=61;if((i|0)<(c+(y[(c<<2)+4944>>2]<=b>>>0)|0)){break a}}b:{if(b>>>0<=99999999){d=sc(f,b);break b}d=(b>>>0)/1e8|0;c=B(d,-1e8)+b|0;b=(c>>>0)/1e4|0;d=Za(Za(Wc(f,d),b),c+B(b,-1e4)|0)}g=0}v[e+12>>2]=g;v[e+8>>2]=d;Tc(a,f,v[e+8>>2]);T=h}function Gb(a){var b=0,c=0,d=0,e=0,f=0;c=v[a+28>>2];e=c>>>31|0;b=v[a+12>>2];d=(b|0)==1566010995;f=v[a+8>>2];c=((d&f>>>0<1470386205|b>>>0<1566010995|(v[a+16>>2]&v[a+20>>2])!=-1)&(e^-1)|((c|0)==2147483647&v[a+24>>2]!=-1|c>>>0<2147483647))^-1;d=f>>>0>1470386205&d|b>>>0>1566010995;b=v[a+4>>2];return e|c&(d|((b|0)==-538366138&y[a>>2]>1746608288|b>>>0>3756601158))}function yd(a,b){var c=0,d=0;c=T-80|0;T=c;d=c+40|0;ea(d,b+80|0);ha(d,d,a);a=v[b+36>>2];v[c+32>>2]=v[b+32>>2];v[c+36>>2]=a;a=v[b+28>>2];v[c+24>>2]=v[b+24>>2];v[c+28>>2]=a;a=v[b+20>>2];v[c+16>>2]=v[b+16>>2];v[c+20>>2]=a;a=v[b+12>>2];v[c+8>>2]=v[b+8>>2];v[c+12>>2]=a;a=v[b+4>>2];v[c>>2]=v[b>>2];v[c+4>>2]=a;Ca(c);a=Cc(d,c);T=c+80|0;return a}function Ma(a,b){var c=0,d=0;c=a,d=Fe(b,0,v[a>>2],v[a+4>>2]),v[c>>2]=d;v[a+4>>2]=U;c=a,d=Fe(v[a+8>>2],v[a+12>>2],b,0),v[c+8>>2]=d;v[a+12>>2]=U;c=a,d=Fe(v[a+16>>2],v[a+20>>2],b,0),v[c+16>>2]=d;v[a+20>>2]=U;c=a,d=Fe(v[a+24>>2],v[a+28>>2],b,0),v[c+24>>2]=d;v[a+28>>2]=U;c=a,d=Fe(v[a+32>>2],v[a+36>>2],b,0),v[c+32>>2]=d;v[a+36>>2]=U}function ja(a,b,c,d,e,f){var g=0,h=0,i=0,j=0;d=Fe(d,0,e,f);h=U;i=Fe(f,0,c,0);d=i+d|0;h=U+h|0;j=Fe(e,0,b,0);g=U;e=Fe(e,0,c,0);c=g+e|0;g=U;g=c>>>0<e>>>0?g+1|0:g;e=g+d|0;b=Fe(b,0,f,0)+c|0;f=U;c=b>>>0<c>>>0?f+1|0:f;f=c+e|0;v[a+8>>2]=f;d=d>>>0<i>>>0?h+1|0:h;d=e>>>0<g>>>0?d+1|0:d;v[a+12>>2]=c>>>0>f>>>0?d+1|0:d;v[a>>2]=j;v[a+4>>2]=b}function ge(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;if((c|0)==32){c=T-240|0;T=c;d=v[1325];a:{if(!Qa(v[d+8>>2])){ia(v[d+176>>2],v[d+180>>2],2066);b=0;break a}if(!a){ia(v[d+176>>2],v[d+180>>2],1942);b=0;break a}e=c+8|0;Pb(e,b,32);b=0;if(!bd(d,c+208|0,c+80|0,e)){break a}ua(a,c+208|0);b=1}T=c+240|0;a=(b|0)!=0}else{a=0}return a|0}
function Tc(a,b,c){var d=0,e=0,f=0;a:{e=c-b|0;if(e>>>0<4294967280){b:{if(e>>>0<11){t[a+11|0]=e;break b}if(e>>>0>=11){f=e+16&-16;d=f-1|0;d=(d|0)==11?f:d}else{d=10}f=d+1|0;d=mc(f);v[a>>2]=d;v[a+8>>2]=f|-2147483648;Lc(a,e);a=d}while(1){if((b|0)!=(c|0)){Uc(a,w[b|0]);a=a+1|0;b=b+1|0;continue}break}Uc(a,0);break a}Ub();L()}}function fd(a,b,c,d){var e=0,f=0;e=T-32|0;T=e;f=v[a+28>>2];v[e+24>>2]=v[a+24>>2];v[e+28>>2]=f;f=v[a+20>>2];v[e+16>>2]=v[a+16>>2];v[e+20>>2]=f;f=v[a+12>>2];v[e+8>>2]=v[a+8>>2];v[e+12>>2]=f;f=v[a+4>>2];v[e>>2]=v[a>>2];v[e+4>>2]=f;zc(a,b,e);Da(d,c);if(Gb(a)){va(a,a);Ia(c,c)}if(Gb(b)){va(b,b);Ia(d,d)}T=e+32|0}function se(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;na(b,v[d+2052>>2]+B(c,88)|0,88);e=1;ya(a,1);if(v[d+2104>>2]){b=0;while(1){a:{if(c&e){ga(a,a,((b<<5)+d|0)+992|0);break a}ga(a,a,(b<<5)+d|0)}b=b+1|0;e=1<<b;if(e>>>0<=y[d+2104>>2]){continue}break}}b=a;a=d+2016|0;ga(b,b,a);ga(a,a,d+1984|0);return 1}function hb(a,b,c){var d=0,e=0;d=T-128|0;T=d;a:{if(!b){ia(v[a+176>>2],v[a+180>>2],1500);a=0;break a}if(!c){ia(v[a+176>>2],v[a+180>>2],1420);a=0;break a}a=0;e=w[c|0];if((e&254)!=8){break a}if(!Ka(d+88|0,c+1|0)){break a}if(!yb(d,d+88|0)){break a}a=1;if(e&1){Ia(d,d)}dc(b,d)}T=d+128|0;return a}function Qc(a,b){var c=0;c=a+184|0;a=Ib(c,72);if(a){v[a>>2]=0;v[a+4>>2]=0;v[a+68>>2]=c;v[a+64>>2]=b;v[a+56>>2]=0;v[a+60>>2]=0;v[a+48>>2]=0;v[a+52>>2]=0;v[a+40>>2]=0;v[a+44>>2]=0;v[a+32>>2]=0;v[a+36>>2]=0;v[a+24>>2]=0;v[a+28>>2]=0;v[a+16>>2]=0;v[a+20>>2]=0;v[a+8>>2]=0;v[a+12>>2]=0}return a}function Fb(a,b,c){var d=0,e=0,f=0;d=b>>>6|0;if((d|0)==((b+c|0)-1>>>6|0)){return jc(a,b,c)}d=(d<<3)+a|0;e=v[d+8>>2];a=b&63;b=64-a|0;f=(b&63)>>>0>=32?0:e<<b;e=v[d+4>>2];d=v[d>>2];b=a&31;return(f|((a&63)>>>0>=32?e>>>b|0:((1<<b)-1&e)<<32-b|d>>>b))&(((c&63)>>>0>=32?0:-1<<c)^-1)}function te(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;na(b,v[d+2048>>2]+B(c,88)|0,88);e=1;ya(a,1);if(v[d+2104>>2]){b=0;while(1){a:{if(c&e){ga(a,a,(b<<5)+d|0);break a}ga(a,a,((b<<5)+d|0)+992|0)}b=b+1|0;e=1<<b;if(e>>>0<=y[d+2104>>2]){continue}break}}return 1}function dd(a,b,c){if(!(b&1)){ac(c- -64|0,a,c+32|0,c);return}b=v[c+36>>2];v[a>>2]=v[c+32>>2];v[a+4>>2]=b;b=v[c+60>>2];v[a+24>>2]=v[c+56>>2];v[a+28>>2]=b;b=v[c+52>>2];v[a+16>>2]=v[c+48>>2];v[a+20>>2]=b;b=v[c+44>>2];v[a+8>>2]=v[c+40>>2];v[a+12>>2]=b}function Ud(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0;f=T-80|0;T=f;g=0;a:{if(!Ea(v[1325],f+16|0,b,c)|(e|0)!=32){break a}g=0;if(!Oc(v[1325],f+16|0,d)){break a}v[f+12>>2]=33;g=(Ya(v[1325],a,f+12|0,f+16|0,258)|0)!=0}T=f+80|0;return g|0}function Vb(a,b,c){var d=0,e=0,f=0;d=T-96|0;T=d;a:{if(!b){ia(v[a+176>>2],v[a+180>>2],1405);a=0;break a}if(!c){ia(v[a+176>>2],v[a+180>>2],1500);a=0;break a}a=d+8|0;mb(a,c);e=b,f=wb(d+48|0)^9,t[e|0]=f;Ra(a);La(b+1|0,a);a=1}T=d+96|0;return a}function cb(a,b){a=a|0;b=b|0;var c=0;if((b|0)==32){c=v[1325];b=T-48|0;T=b;a:{if(!a){ia(v[c+176>>2],v[c+180>>2],1375);a=0;break a}la(b+16|0,a,b+12|0);a=0;if(v[b+12>>2]){break a}a=!pa(b+16|0)}T=b+48|0;a=(a|0)!=0}else{a=0}return a|0}function kb(a,b,c){var d=0,e=0;a:{if(vc(a,c)>>>0<b>>>0){break a}c=(c<<4)+b|0;b=Ib(v[a+68>>2],c);d=(v[a+60>>2]<<2)+a|0;v[d>>2]=b;if(!b){break a}v[d+40>>2]=c;v[((v[a+60>>2]<<2)+a|0)+20>>2]=0;e=1;v[a+60>>2]=v[a+60>>2]+1}return e}function Fe(a,b,c,d){var e=0,f=0,g=0,h=0,i=0,j=0;e=c>>>16|0;f=a>>>16|0;j=B(e,f);g=c&65535;h=a&65535;i=B(g,h);f=(i>>>16|0)+B(f,g)|0;e=(f&65535)+B(e,h)|0;U=(B(b,c)+j|0)+B(a,d)+(f>>>16)+(e>>>16)|0;return i&65535|e<<16}function fc(a,b,c){var d=0;d=T+-64|0;T=d;a:{if(!b){ia(v[a+176>>2],v[a+180>>2],1864);a=0;break a}if(!c){ia(v[a+176>>2],v[a+180>>2],1729);a=0;break a}a=d+32|0;Ac(a,d,c);ua(b,a);ua(b+32|0,d);a=1}T=d- -64|0;return a}function pd(a,b,c,d){var e=0,f=0,g=0;e=T-192|0;T=e;v[e+76>>2]=0;f=e+80|0;g=e+76|0;od(f,g,c);od(f,g,b);Pb(e+8|0,f,v[e+76>>2]);b=0;while(1){Ob(e+8|0,a);b=b+1|0;if(d>>>0>=b>>>0){continue}break}T=e+192|0;return 1}function Nd(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=T-80|0;T=d;e=0;a:{if((c|0)!=33){break a}e=0;if(!Ea(v[1325],d+16|0,b,33)){break a}v[d+12>>2]=65;e=(Ya(v[1325],a,d+12|0,d+16|0,2)|0)!=0}T=d+80|0;return e|0}function ib(a,b,c,d,e){var f=0;f=T-256|0;T=f;if(!(e&73728|(c|0)<=(d|0))){d=c-d|0;c=d>>>0<256;Xa(f,b&255,c?d:256);if(!c){while(1){ub(a,f,256);d=d-256|0;if(d>>>0>255){continue}break}}ub(a,f,d)}T=f+256|0}function Aa(a){v[a+96>>2]=0;v[a+24>>2]=528734635;v[a+28>>2]=1541459225;v[a+16>>2]=1359893119;v[a+20>>2]=-1694144372;v[a+8>>2]=1013904242;v[a+12>>2]=-1521486534;v[a>>2]=1779033703;v[a+4>>2]=-1150833019}function Zc(a){var b=0,c=0,d=0;d=v[a>>2];while(1){c=t[d|0];if(_b(c)){d=d+1|0;v[a>>2]=d;if(b>>>0<=214748364){c=c-48|0;b=B(b,10);b=(c|0)>(b^2147483647)?-1:c+b|0}else{b=-1}continue}break}return b}function Ld(){var a=0,b=0;a=v[1327];if(a){Sa(v[a+4>>2]);Sa(a);v[1327]=0}a=v[1326];if(a){Sa(a);v[1326]=0}a=v[1325];if(a){Kc(a);b=a+8|0;ta(b+8|0);Dc(b+40|0);v[b>>2]=0;Sa(a);v[1325]=0}return 1}function id(a){var b=0;b=v[a+72>>2];v[a+72>>2]=b-1|b;b=v[a>>2];if(b&8){v[a>>2]=b|32;return-1}v[a+4>>2]=0;v[a+8>>2]=0;b=v[a+44>>2];v[a+28>>2]=b;v[a+20>>2]=b;v[a+16>>2]=b+v[a+48>>2];return 0}function wa(a,b){var c=0,d=0;c=v[a+60>>2];a:{if(!c){break a}a=(c-1<<2)+a|0;c=v[a+20>>2];b=b+15&-16;if(c+b>>>0>y[a+40>>2]){break a}d=c+v[a>>2]|0;Xa(d,0,b);v[a+20>>2]=b+v[a+20>>2]}return d}function Db(a,b,c,d){var e=0,f=0;e=T-48|0;T=e;f=e+8|0;Ka(f,((c<<5)+(d+7>>>3|0)|0)+b|0);a:{if(!yb(a,f)){d=0;break a}d=1;if(!(w[(c>>>3|0)+b|0]>>>(c&7)&1)){break a}Ia(a,a)}T=e+48|0;return d}function jc(a,b,c){var d=0,e=0;a=(b>>>3&536870904)+a|0;d=v[a>>2];e=((c&63)>>>0>=32?0:-1<<c)^-1;c=v[a+4>>2];b=b&63;a=b&31;return e&((b&63)>>>0>=32?c>>>a|0:((1<<a)-1&c)<<32-a|d>>>a)}function Pd(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=T+-64|0;T=e;d=0;a:{if((c|0)!=64){break a}d=0;if(!Kb(v[1325],e,b)){break a}d=(fc(v[1325],a,e)|0)!=0}T=e- -64|0;return d|0}function Bb(a){var b=0,c=0;b=v[1324];c=a+7&-8;a=b+c|0;a:{if(a>>>0<=b>>>0?c:0){break a}if(tc()>>>0<a>>>0){if(!(P(a|0)|0)){break a}}v[1324]=a;return b}v[1328]=48;return-1}function hc(a,b,c,d,e){var f=0;f=T-3904|0;T=f;v[f+24>>2]=f+736;v[f+20>>2]=f+32;v[f+16>>2]=f+1856;v[f+12>>2]=f+2560;v[f+8>>2]=f+2880;ud(a,f+8|0,b,1,c,d,e);T=f+3904|0}function Yd(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=T-80|0;T=d;if(Ea(v[1325],d+16|0,b,c)){v[d+12>>2]=33;e=(Ya(v[1325],a,d+12|0,d+16|0,258)|0)!=0}T=d+80|0;return e|0}function wc(a,b,c,d,e,f){var g=0,h=0;g=T-256|0;T=g;h=g+224|0;kd(h,c,d);Pa(a,e,h,64);Pa(g+96|0,f,b,256);if(!v[g+216>>2]){b=g+8|0;sa(b,g+96|0);Ja(a,a,b)}T=g+256|0}function oe(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=T-16|0;T=e;a=$c(Q(v[a+60>>2],b|0,c|0,d&255,e+8|0)|0);T=e+16|0;U=a?-1:v[e+12>>2];return(a?-1:v[e+8>>2])|0}function zc(a,b,c){var d=0,e=0;d=T+-64|0;T=d;e=d+32|0;rd(e,c,3784);rd(d,c,3816);ga(e,e,3720);ga(d,d,3752);oa(b,e,d);ga(a,b,3688);oa(a,a,c);T=d- -64|0}function Fd(a){return!(v[a+32>>2]|(v[a+24>>2]|(v[a+16>>2]|(v[a+8>>2]|v[a>>2])))|(v[a+36>>2]|(v[a+28>>2]|(v[a+20>>2]|(v[a+12>>2]|v[a+4>>2])))))}function bb(a,b){v[a+8>>2]=0;v[a+12>>2]=0;v[a>>2]=b;v[a+4>>2]=0;v[a+16>>2]=0;v[a+20>>2]=0;v[a+24>>2]=0;v[a+28>>2]=0;v[a+32>>2]=0;v[a+36>>2]=0}function gb(a){v[a>>2]=0;v[a+4>>2]=0;v[a+32>>2]=0;v[a+36>>2]=0;v[a+24>>2]=0;v[a+28>>2]=0;v[a+16>>2]=0;v[a+20>>2]=0;v[a+8>>2]=0;v[a+12>>2]=0}function Eb(a){var b=0,c=0;a:{if(a>>>0>=9){while(1){b=b+1|0;c=a>>>0>3;a=a>>>1|0;if(c){continue}break}break a}b=v[(a<<2)+4172>>2]}return b}function rc(a,b){var c=0;if(b>>>0<=99){return Wc(a,b)}if(b>>>0<=999){c=a;a=(b>>>0)/100|0;return Yb(Vc(c,a),B(a,-100)+b|0)}return Za(a,b)}function hd(a,b,c,d){var e=0,f=0;e=T-32|0;T=e;ta(a);while(1){d=d-1|0;f=d<<5;ga(e,f+b|0,c+f|0);oa(a,a,e);if(d){continue}break}T=e+32|0}function rb(a,b,c){var d=0,e=0;d=T-80|0;T=d;e=d+40|0;ea(e,c);ha(d,e,c);ha(a,b,e);ha(a+40|0,b+40|0,d);v[a+80>>2]=v[b+120>>2];T=d+80|0}function ce(a,b){a=a|0;b=b|0;var c=0,d=0;c=T+-64|0;T=c;if((b|0)==33){a=Ea(v[1325],c,a,33);tb(c,64);d=(a|0)!=0}T=c- -64|0;return d|0}function Ed(a,b){var c=0,d=0,e=0;d=T-48|0;T=d;e=d+8|0;ea(e,b);ha(a,a,e);c=a+40|0;ha(c,c,e);ha(c,c,b);a=a+80|0;ha(a,a,b);T=d+48|0}function kd(a,b,c){v[a+8>>2]=0;v[a+12>>2]=0;v[a>>2]=b;v[a+4>>2]=c;v[a+16>>2]=0;v[a+20>>2]=0;v[a+24>>2]=0;v[a+28>>2]=0}function pa(a){return!(v[a+24>>2]|(v[a+16>>2]|(v[a+8>>2]|v[a>>2]))|(v[a+28>>2]|(v[a+20>>2]|(v[a+12>>2]|v[a+4>>2]))))}function ya(a,b){v[a+8>>2]=0;v[a+12>>2]=0;v[a>>2]=b;v[a+4>>2]=0;v[a+16>>2]=0;v[a+20>>2]=0;v[a+24>>2]=0;v[a+28>>2]=0}function de(a,b){a=a|0;b=b|0;var c=0,d=0;c=T+-64|0;T=c;if((b|0)==33){d=(hb(v[1325],c,a)|0)!=0}T=c- -64|0;return d|0}function be(a,b){a=a|0;b=b|0;var c=0,d=0;c=T+-64|0;T=c;if((b|0)==64){d=(Kb(v[1325],c,a)|0)!=0}T=c- -64|0;return d|0}function Xc(a,b){if(!a){return 0}a:{if(!((b&-128)==57216|b>>>0<=127)){v[1328]=25;a=-1;break a}t[a|0]=b;a=1}return a}function na(a,b,c){var d=0;if(c){d=a;while(1){t[d|0]=w[b|0];d=d+1|0;b=b+1|0;c=c-1|0;if(c){continue}break}}return a}function ta(a){v[a>>2]=0;v[a+4>>2]=0;v[a+24>>2]=0;v[a+28>>2]=0;v[a+16>>2]=0;v[a+20>>2]=0;v[a+8>>2]=0;v[a+12>>2]=0}function Cb(a){var b=0,c=0;c=T-48|0;T=c;if(!v[a+120>>2]){b=c+8|0;ha(b,a+40|0,a+80|0);b=wb(b)}T=c+48|0;return b}function sc(a,b){var c=0;if(b>>>0<=9999){return rc(a,b)}c=a;a=(b>>>0)/1e4|0;return Za(rc(c,a),B(a,-1e4)+b|0)}function Jc(a,b,c){if(!yb(a,b)){return 0}b=a+40|0;Ra(b);if((Qb(v[a+40>>2])|0)!=(c|0)){ra(b,b,1)}return 1}function Xa(a,b,c){var d=0;if(c){d=a;while(1){t[d|0]=b;d=d+1|0;c=c-1|0;if(c){continue}break}}return a}function re(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;va(a,d+40|0);Ua(v[d>>2],b,v[d+72>>2]+(c<<6)|0);return 1}function mb(a,b){var c=0,d=0;c=T-48|0;T=c;d=c+8|0;Ka(d,b+1|0);yb(a,d);if(t[b|0]&1){Ia(a,a)}T=c+48|0}function ke(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)==64){a=(fc(v[1325],a,b)|0)!=0}else{a=0}return a|0}function Od(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)==64){a=(Kb(v[1325],a,b)|0)!=0}else{a=0}return a|0}function Cc(a,b){var c=0,d=0;c=T-48|0;T=c;d=c+8|0;ra(d,a,1);qa(d,b);a=qb(d);T=c+48|0;return a}function Ie(a,b){var c=0,d=0;c=b&31;d=(-1>>>c&a)<<c;c=a;a=0-b&31;return d|(c&-1<<a)>>>a}
function ob(a,b){var c=0;c=T-32|0;T=c;za(a,c);a=a+100|0;ma(a,c,32);za(a,b);T=c+32|0}function Za(a,b){var c=0;c=a;a=(b>>>0)/100|0;return Yb(Yb(c,a),B(a,-100)+b|0)}function He(a){var b=0;while(1){if(a){a=a-1&a;b=b+1|0;continue}break}return b}function dc(a,b){var c=0,d=0;Wa(b);La(a+1|0,b);c=a,d=wb(b+40|0)^9,t[c|0]=d}function Yb(a,b){b=x[(b<<1)+4736>>1];t[a|0]=b;t[a+1|0]=b>>>8;return a+2|0}function Sb(a){var b=0,c=0,d=0;return b=v[a>>2],c=a,d=lc(w[a+11|0]),d?b:c}function Na(a){var b=0;b=v[a+60>>2]-1|0;v[a+60>>2]=b;Sa(v[(b<<2)+a>>2])}function jd(){var a=0;a=Eb(32);return((a<<6)+((a<<1)+7>>>3|0)|0)+160|0}function Ce(a,b){a=a|0;b=b|0;b=T-16|0;T=b;v[b>>2]=a;xb(3273,b);O();L()}function ga(a,b,c){var d=0;d=T+-64|0;T=d;wd(d,b,c);vd(a,d);T=d- -64|0}function Rb(a,b){var c=0;c=a;a=v[a>>2];v[c>>2]=a+(b+15&-16);return a}function wb(a){var b=0;b=T-48|0;T=b;a=Jb(b+8|0,a);T=b+48|0;return a}function Ib(a,b){b=Zb(b);if(!b){ia(v[a>>2],v[a+4>>2],1096)}return b}function db(a){var b=0;if(v[a>>2]){Mc(a);b=v[a>>2];Tb(a);Sa(b)}}function Wc(a,b){if(b>>>0<=9){return Vc(a,b)}return Yb(a,b)}function od(a,b,c){na(v[b>>2]+a|0,c,32);v[b>>2]=v[b>>2]+32}function Ta(a){v[a+120>>2]=1;gb(a);gb(a+40|0);gb(a+80|0)}function Dc(a){v[a+120>>2]=0;gb(a);gb(a+40|0);gb(a+80|0)}function lb(a,b){Ka(a,b);Ka(a+40|0,b+32|0);v[a+80>>2]=0}function ab(a,b){Gd(a,b);Gd(a+40|0,b+32|0);v[a+80>>2]=0}function Ee(a){if(a){return 31-E(a-1^a)|0}return 32}function mc(a){a=Zb(a?a:1);if(!a){O();L()}return a}function Ia(a,b){a=na(a,b,88)+40|0;Ca(a);ra(a,a,1)}function $c(a){if(!a){return 0}v[1328]=a;return-1}function Fa(a,b,c){Dd(a,b,c);Dd(a+32|0,b+32|0,c)}function Wb(a){if(lc(w[a+11|0])){Sa(v[a>>2])}}function qe(a){a=a|0;return S(v[a+60>>2])|0}function oc(a,b){return y[b>>2]<y[a>>2]?b:a}function Da(a,b){a=na(a,b,88);ha(a,a,3848)}function Vc(a,b){t[a|0]=b+48;return a+1|0}function pc(a){v[v[a>>2]+4>>2]=v[a+4>>2]}function Xb(a,b){return lc(b)?a:b&255}function Kc(a){v[a>>2]=0;v[a+4>>2]=0}function lc(a){return(a&128)>>>7|0}function fb(a,b){return(b<<6)+a|0}function _b(a){return a-48>>>0<10}function Hb(a,b){return(b<<2)+a|0}function gd(a){return B(a,4032)}function ia(a,b,c){V[a|0](c,b)}function nd(a){return(a^-1)&1}function Qa(a){return(a|0)!=0}function tc(){return W()<<16}function Va(a,b,c){ma(a,b,c)}function Mc(a){Lc(a,v[a>>2])}function Lc(a,b){v[a+4>>2]=b}function Tb(a){return a+8|0}function tb(a,b){Xa(a,0,b)}function ec(a,b){Ga(a,b,0)}function Uc(a,b){t[a|0]=b}function Qb(a){return a&1}function nb(a,b){xd(a,b)}function me(){return 675}function Gc(a,b){Fc(a,b)}function Ab(a){v[a>>2]=0}function ne(){return 20}function cc(){return 32}function ae(){return 72}function Sc(){return 33}function Nc(){return 64}function Md(){return 65}function Ub(){nc();L()}function nc(){O();L()}function Hd(){}
// EMSCRIPTEN_END_FUNCS
e=w;p(ca);var V=c([null,re,Ae,ze,ye,xe,ve,ue,te,se,Ce,qe,pe,oe]);function W(){return s.byteLength/65536|0}function $(aa){aa=aa|0;var X=W()|0;var Y=X+aa|0;if(X<Y&&Y<65536){var Z=new ArrayBuffer(B(Y,65536));var _=new Int8Array(Z);_.set(t);t=new Int8Array(Z);u=new Int16Array(Z);v=new Int32Array(Z);w=new Uint8Array(Z);x=new Uint16Array(Z);y=new Uint32Array(Z);z=new Float32Array(Z);A=new Float64Array(Z);s=Z;r.buffer=s;e=w}return X}return{"g":Hd,"h":ee,"i":Ld,"j":cc,"k":we,"l":Be,"m":cb,"n":ce,"o":de,"p":be,"q":me,"r":je,"s":ie,"t":ne,"u":Td,"v":Kd,"w":Sc,"x":Xd,"y":Yd,"z":Md,"A":Nd,"B":cc,"C":Sd,"D":Vd,"E":Rd,"F":Ud,"G":Qd,"H":Sc,"I":$d,"J":_d,"K":Zd,"L":Wd,"M":Nc,"N":cc,"O":fe,"P":De,"Q":Id,"R":Pd,"S":Nc,"T":ke,"U":Od,"V":le,"W":cc,"X":ge,"Y":ae,"Z":he,"_":Jd,"$":Sa,"aa":Zb,"ba":V}}return ba(da)}
// EMSCRIPTEN_END_ASM




)(x)}function da(){return{then:function(b){b({instance:new ca})}}}var ea=Error,WebAssembly={};u=[];"object"!=typeof WebAssembly&&A("no native wasm support detected");var B,D=!1,E="undefined"!=typeof TextDecoder?new TextDecoder("utf8"):void 0,F,G,H;
function I(b){F=b;a.HEAP8=new Int8Array(b);a.HEAP16=new Int16Array(b);a.HEAP32=new Int32Array(b);a.HEAPU8=G=new Uint8Array(b);a.HEAPU16=new Uint16Array(b);a.HEAPU32=H=new Uint32Array(b);a.HEAPF32=new Float32Array(b);a.HEAPF64=new Float64Array(b)}var w=a.INITIAL_MEMORY||16777216;a.wasmMemory?B=a.wasmMemory:B=new ba;B&&(F=B.buffer);w=F.byteLength;I(F);var M=[],N=[],O=[];function fa(){var b=a.preRun.shift();M.unshift(b)}var P=0,Q=null,R=null;
function A(b){if(a.onAbort)a.onAbort(b);b="Aborted("+b+")";t(b);D=!0;b=new ea(b+". Build with -sASSERTIONS for more info.");m(b);throw b;}function S(b){return b.startsWith("data:application/octet-stream;base64,")}var T;T="secp256k1-zkp.wasm";if(!S(T)){var U=T;T=a.locateFile?a.locateFile(U,q):q+U}
function V(){var b=T;try{if(b==T&&u)return new Uint8Array(u);if(S(b))try{var d=ha(b.slice(37)),g=new Uint8Array(d.length);for(b=0;b<d.length;++b)g[b]=d.charCodeAt(b);var f=g}catch(e){throw Error("Converting base64 string to bytes failed.");}else f=void 0;var c=f;if(c)return c;throw"both async and sync fetching of the wasm failed";}catch(e){A(e)}}
function ia(){return u||"function"!=typeof fetch?Promise.resolve().then(function(){return V()}):fetch(T,{credentials:"same-origin"}).then(function(b){if(!b.ok)throw"failed to load wasm binary file at '"+T+"'";return b.arrayBuffer()}).catch(function(){return V()})}function W(b){for(;0<b.length;)b.shift()(a)}
var ja=[null,[],[]],ha="function"==typeof atob?atob:function(b){var d="",g=0;b=b.replace(/[^A-Za-z0-9\+\/=]/g,"");do{var f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(b.charAt(g++));var c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(b.charAt(g++));var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(b.charAt(g++));var y="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(b.charAt(g++));
f=f<<2|c>>4;c=(c&15)<<4|e>>2;var C=(e&3)<<6|y;d+=String.fromCharCode(f);64!==e&&(d+=String.fromCharCode(c));64!==y&&(d+=String.fromCharCode(C))}while(g<b.length);return d},x={b:function(){A("")},c:function(b){var d=G.length;b>>>=0;if(2147483648<b)return!1;for(var g=1;4>=g;g*=2){var f=d*(1+.2/g);f=Math.min(f,b+100663296);var c=Math;f=Math.max(b,f);c=c.min.call(c,2147483648,f+(65536-f%65536)%65536);a:{try{B.grow(c-F.byteLength+65535>>>16);I(B.buffer);var e=1;break a}catch(y){}e=void 0}if(e)return!0}return!1},
f:function(){return 52},d:function(){return 70},e:function(b,d,g,f){for(var c=0,e=0;e<g;e++){var y=H[d>>2],C=H[d+4>>2];d+=8;for(var J=0;J<C;J++){var z=G[y+J],K=ja[b];if(0===z||10===z){z=1===b?aa:t;var l=K;for(var n=0,r=n+NaN,v=n;l[v]&&!(v>=r);)++v;if(16<v-n&&l.buffer&&E)l=E.decode(l.subarray(n,v));else{for(r="";n<v;){var h=l[n++];if(h&128){var L=l[n++]&63;if(192==(h&224))r+=String.fromCharCode((h&31)<<6|L);else{var Y=l[n++]&63;h=224==(h&240)?(h&15)<<12|L<<6|Y:(h&7)<<18|L<<12|Y<<6|l[n++]&63;65536>
h?r+=String.fromCharCode(h):(h-=65536,r+=String.fromCharCode(55296|h>>10,56320|h&1023))}}else r+=String.fromCharCode(h)}l=r}z(l);K.length=0}else K.push(z)}c+=C}H[f>>2]=c;return 0},a:B};
(function(){function b(c){a.asm=c.exports;N.unshift(a.asm.g);P--;a.monitorRunDependencies&&a.monitorRunDependencies(P);0==P&&(null!==Q&&(clearInterval(Q),Q=null),R&&(c=R,R=null,c()))}function d(c){b(c.instance)}function g(c){return ia().then(function(){return da()}).then(function(e){return e}).then(c,function(e){t("failed to asynchronously prepare wasm: "+e);A(e)})}var f={a:x};P++;a.monitorRunDependencies&&a.monitorRunDependencies(P);if(a.instantiateWasm)try{return a.instantiateWasm(f,b)}catch(c){return t("Module.instantiateWasm callback failed with error: "+
c),!1}(function(){return u||"function"!=typeof WebAssembly.instantiateStreaming||S(T)||"function"!=typeof fetch?g(d):fetch(T,{credentials:"same-origin"}).then(function(c){return WebAssembly.instantiateStreaming(c,f).then(d,function(e){t("wasm streaming compile failed: "+e);t("falling back to ArrayBuffer instantiation");return g(d)})})})().catch(m);return{}})();a.___wasm_call_ctors=function(){return(a.___wasm_call_ctors=a.asm.g).apply(null,arguments)};
a._initialize=function(){return(a._initialize=a.asm.h).apply(null,arguments)};a._uninitialize=function(){return(a._uninitialize=a.asm.i).apply(null,arguments)};a._blindSize=function(){return(a._blindSize=a.asm.j).apply(null,arguments)};a._blindSwitch=function(){return(a._blindSwitch=a.asm.k).apply(null,arguments)};a._blindSum=function(){return(a._blindSum=a.asm.l).apply(null,arguments)};a._isValidSecretKey=function(){return(a._isValidSecretKey=a.asm.m).apply(null,arguments)};
a._isValidPublicKey=function(){return(a._isValidPublicKey=a.asm.n).apply(null,arguments)};a._isValidCommit=function(){return(a._isValidCommit=a.asm.o).apply(null,arguments)};a._isValidSingleSignerSignature=function(){return(a._isValidSingleSignerSignature=a.asm.p).apply(null,arguments)};a._bulletproofProofSize=function(){return(a._bulletproofProofSize=a.asm.q).apply(null,arguments)};a._createBulletproof=function(){return(a._createBulletproof=a.asm.r).apply(null,arguments)};
a._createBulletproofBlindless=function(){return(a._createBulletproofBlindless=a.asm.s).apply(null,arguments)};a._bulletproofMessageSize=function(){return(a._bulletproofMessageSize=a.asm.t).apply(null,arguments)};a._rewindBulletproof=function(){return(a._rewindBulletproof=a.asm.u).apply(null,arguments)};a._verifyBulletproof=function(){return(a._verifyBulletproof=a.asm.v).apply(null,arguments)};a._publicKeySize=function(){return(a._publicKeySize=a.asm.w).apply(null,arguments)};
a._publicKeyFromSecretKey=function(){return(a._publicKeyFromSecretKey=a.asm.x).apply(null,arguments)};a._publicKeyFromData=function(){return(a._publicKeyFromData=a.asm.y).apply(null,arguments)};a._uncompressedPublicKeySize=function(){return(a._uncompressedPublicKeySize=a.asm.z).apply(null,arguments)};a._uncompressPublicKey=function(){return(a._uncompressPublicKey=a.asm.A).apply(null,arguments)};a._secretKeySize=function(){return(a._secretKeySize=a.asm.B).apply(null,arguments)};
a._secretKeyTweakAdd=function(){return(a._secretKeyTweakAdd=a.asm.C).apply(null,arguments)};a._publicKeyTweakAdd=function(){return(a._publicKeyTweakAdd=a.asm.D).apply(null,arguments)};a._secretKeyTweakMultiply=function(){return(a._secretKeyTweakMultiply=a.asm.E).apply(null,arguments)};a._publicKeyTweakMultiply=function(){return(a._publicKeyTweakMultiply=a.asm.F).apply(null,arguments)};
a._sharedSecretKeyFromSecretKeyAndPublicKey=function(){return(a._sharedSecretKeyFromSecretKeyAndPublicKey=a.asm.G).apply(null,arguments)};a._commitSize=function(){return(a._commitSize=a.asm.H).apply(null,arguments)};a._pedersenCommit=function(){return(a._pedersenCommit=a.asm.I).apply(null,arguments)};a._pedersenCommitSum=function(){return(a._pedersenCommitSum=a.asm.J).apply(null,arguments)};a._pedersenCommitToPublicKey=function(){return(a._pedersenCommitToPublicKey=a.asm.K).apply(null,arguments)};
a._publicKeyToPedersenCommit=function(){return(a._publicKeyToPedersenCommit=a.asm.L).apply(null,arguments)};a._singleSignerSignatureSize=function(){return(a._singleSignerSignatureSize=a.asm.M).apply(null,arguments)};a._seedSize=function(){return(a._seedSize=a.asm.N).apply(null,arguments)};a._createSingleSignerSignature=function(){return(a._createSingleSignerSignature=a.asm.O).apply(null,arguments)};a._addSingleSignerSignatures=function(){return(a._addSingleSignerSignatures=a.asm.P).apply(null,arguments)};
a._verifySingleSignerSignature=function(){return(a._verifySingleSignerSignature=a.asm.Q).apply(null,arguments)};a._singleSignerSignatureFromData=function(){return(a._singleSignerSignatureFromData=a.asm.R).apply(null,arguments)};a._uncompactSingleSignerSignatureSize=function(){return(a._uncompactSingleSignerSignatureSize=a.asm.S).apply(null,arguments)};a._compactSingleSignerSignature=function(){return(a._compactSingleSignerSignature=a.asm.T).apply(null,arguments)};
a._uncompactSingleSignerSignature=function(){return(a._uncompactSingleSignerSignature=a.asm.U).apply(null,arguments)};a._combinePublicKeys=function(){return(a._combinePublicKeys=a.asm.V).apply(null,arguments)};a._nonceSize=function(){return(a._nonceSize=a.asm.W).apply(null,arguments)};a._createSecretNonce=function(){return(a._createSecretNonce=a.asm.X).apply(null,arguments)};a._maximumMessageHashSignatureSize=function(){return(a._maximumMessageHashSignatureSize=a.asm.Y).apply(null,arguments)};
a._createMessageHashSignature=function(){return(a._createMessageHashSignature=a.asm.Z).apply(null,arguments)};a._verifyMessageHashSignature=function(){return(a._verifyMessageHashSignature=a.asm._).apply(null,arguments)};a._free=function(){return(a._free=a.asm.$).apply(null,arguments)};a._malloc=function(){return(a._malloc=a.asm.aa).apply(null,arguments)};var X;R=function ka(){X||Z();X||(R=ka)};
function Z(){function b(){if(!X&&(X=!0,a.calledRun=!0,!D)){W(N);k(a);if(a.onRuntimeInitialized)a.onRuntimeInitialized();if(a.postRun)for("function"==typeof a.postRun&&(a.postRun=[a.postRun]);a.postRun.length;){var d=a.postRun.shift();O.unshift(d)}W(O)}}if(!(0<P)){if(a.preRun)for("function"==typeof a.preRun&&(a.preRun=[a.preRun]);a.preRun.length;)fa();W(M);0<P||(a.setStatus?(a.setStatus("Running..."),setTimeout(function(){setTimeout(function(){a.setStatus("")},1);b()},1)):b())}}
if(a.preInit)for("function"==typeof a.preInit&&(a.preInit=[a.preInit]);0<a.preInit.length;)a.preInit.pop()();Z();


  return secp256k1Zkp.ready
}
);
})();
if (typeof exports === 'object' && typeof module === 'object')
  module.exports = secp256k1Zkp;
else if (typeof define === 'function' && define['amd'])
  define([], function() { return secp256k1Zkp; });
else if (typeof exports === 'object')
  exports["secp256k1Zkp"] = secp256k1Zkp;
// Use strict
"use strict";


// Classes

// Secp256k1-zkp class
class Secp256k1Zkp {

	// Public
	
		// Initialize
		static initialize() {
		
			// Set instance to invalid
			Secp256k1Zkp.instance = Secp256k1Zkp.INVALID;
			
			// Return promise
			return new Promise(function(resolve, reject) {
		
				// Set settings
				var settings = {
				
					// On abort
					"onAbort": function(error) {
					
						// Prevent on abort from being called again
						delete settings["onAbort"];
						
						// Reject error
						reject("Failed to download resource");
					}
				};
				
				// Create secp256k1-zkp instance
				secp256k1Zkp(settings).then(function(instance) {
				
					// Prevent on abort from being called
					delete settings["onAbort"];
					
					// Initialize seed to size of seed
					var seed = new Uint8Array(instance._seedSize());
					
					// Fill seed with random values
					crypto.getRandomValues(seed);
					
					// Allocate and fill memory
					var seedBuffer = instance._malloc(seed["length"] * seed["BYTES_PER_ELEMENT"]);
					instance["HEAPU8"].set(seed, seedBuffer / seed["BYTES_PER_ELEMENT"]);
				
					// Check if initializing failed
					if(instance._initialize(seedBuffer, seed["length"] * seed["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
					
						// Clear memory
						instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
						
						// Free memory
						instance._free(seedBuffer);
						
						// Clear seed
						seed.fill(0);
						
						// Reject error
						reject("Failed to initialize");
					}
					
					// Otherwise
					else {
					
						// Clear memory
						instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
						
						// Free memory
						instance._free(seedBuffer);
						
						// Clear seed
						seed.fill(0);
						
						// Set instance
						Secp256k1Zkp.instance = instance;
					
						// Resolve
						resolve();
					}
				});
			});
		}
		
		// Uninitialize
		static uninitialize() {
		
			// Check if instance exists and is invalid
			if(typeof Secp256k1Zkp.instance === "undefined" || Secp256k1Zkp.instance === Secp256k1Zkp.INVALID)
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
		
			// Uninitialize
			Secp256k1Zkp.instance._uninitialize();
		}
		
		// Blind switch
		static blindSwitch(blind, value) {
		
			// Check if instance doesn't exist
			if(typeof Secp256k1Zkp.instance === "undefined") {
			
				// Set instance
				Secp256k1Zkp.instance = secp256k1Zkp();
				
				// Initialize seed to size of seed
				var seed = new Uint8Array(Secp256k1Zkp.instance._seedSize());
				
				// Fill seed with random values
				crypto.getRandomValues(seed);
				
				// Allocate and fill memory
				var seedBuffer = Secp256k1Zkp.instance._malloc(seed["length"] * seed["BYTES_PER_ELEMENT"]);
				Secp256k1Zkp.instance["HEAPU8"].set(seed, seedBuffer / seed["BYTES_PER_ELEMENT"]);
				
				// Check if initializing failed
				if(Secp256k1Zkp.instance._initialize(seedBuffer, seed["length"] * seed["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
					
					// Set instance to invalid
					Secp256k1Zkp.instance = Secp256k1Zkp.INVALID;
				}
				
				// Otherwise
				else {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
				}
			}
		
			// Check if instance is invalid
			if(Secp256k1Zkp.instance === Secp256k1Zkp.INVALID)
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			
			// Initialize result to size of blind
			var result = new Uint8Array(Secp256k1Zkp.instance._blindSize());
			
			// Allocate and fill memory
			var resultBuffer = Secp256k1Zkp.instance._malloc(result["length"] * result["BYTES_PER_ELEMENT"]);
			
			var blindBuffer = Secp256k1Zkp.instance._malloc(blind["length"] * blind["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(blind, blindBuffer / blind["BYTES_PER_ELEMENT"]);
			
			var cStringValue = Secp256k1Zkp.stringToCString(value);
			var valueBuffer = Secp256k1Zkp.instance._malloc(cStringValue["length"] * cStringValue["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(cStringValue, valueBuffer / cStringValue["BYTES_PER_ELEMENT"]);
			cStringValue.fill(0);
			
			// Check if performing blind switch failed
			if(Secp256k1Zkp.instance._blindSwitch(resultBuffer, blindBuffer, blind["length"] * blind["BYTES_PER_ELEMENT"], valueBuffer) === Secp256k1Zkp.C_FALSE) {
			
				// Clear memory
				Secp256k1Zkp.instance["HEAPU8"].fill(0, resultBuffer / result["BYTES_PER_ELEMENT"], resultBuffer / result["BYTES_PER_ELEMENT"] + result["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, blindBuffer / blind["BYTES_PER_ELEMENT"], blindBuffer / blind["BYTES_PER_ELEMENT"] + blind["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, valueBuffer / cStringValue["BYTES_PER_ELEMENT"], valueBuffer / cStringValue["BYTES_PER_ELEMENT"] + cStringValue["length"]);
				
				// Free memory
				Secp256k1Zkp.instance._free(resultBuffer);
				Secp256k1Zkp.instance._free(blindBuffer);
				Secp256k1Zkp.instance._free(valueBuffer);
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			}
			
			// Get result
			result = new Uint8Array(Secp256k1Zkp.instance["HEAPU8"].subarray(resultBuffer, resultBuffer + result["length"]));
			
			// Clear memory
			Secp256k1Zkp.instance["HEAPU8"].fill(0, resultBuffer / result["BYTES_PER_ELEMENT"], resultBuffer / result["BYTES_PER_ELEMENT"] + result["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, blindBuffer / blind["BYTES_PER_ELEMENT"], blindBuffer / blind["BYTES_PER_ELEMENT"] + blind["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, valueBuffer / cStringValue["BYTES_PER_ELEMENT"], valueBuffer / cStringValue["BYTES_PER_ELEMENT"] + cStringValue["length"]);
			
			// Free memory
			Secp256k1Zkp.instance._free(resultBuffer);
			Secp256k1Zkp.instance._free(blindBuffer);
			Secp256k1Zkp.instance._free(valueBuffer);
			
			// Return result
			return result;
		}
		
		// Blind sum
		static blindSum(positiveBlinds, negativeBlinds) {
		
			// Check if instance doesn't exist
			if(typeof Secp256k1Zkp.instance === "undefined") {
			
				// Set instance
				Secp256k1Zkp.instance = secp256k1Zkp();
				
				// Initialize seed to size of seed
				var seed = new Uint8Array(Secp256k1Zkp.instance._seedSize());
				
				// Fill seed with random values
				crypto.getRandomValues(seed);
				
				// Allocate and fill memory
				var seedBuffer = Secp256k1Zkp.instance._malloc(seed["length"] * seed["BYTES_PER_ELEMENT"]);
				Secp256k1Zkp.instance["HEAPU8"].set(seed, seedBuffer / seed["BYTES_PER_ELEMENT"]);
				
				// Check if initializing failed
				if(Secp256k1Zkp.instance._initialize(seedBuffer, seed["length"] * seed["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
					
					// Set instance to invalid
					Secp256k1Zkp.instance = Secp256k1Zkp.INVALID;
				}
				
				// Otherwise
				else {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
				}
			}
		
			// Check if instance is invalid
			if(Secp256k1Zkp.instance === Secp256k1Zkp.INVALID)
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			
			// Initialize result to size of blind
			var result = new Uint8Array(Secp256k1Zkp.instance._blindSize());
			
			// Allocate and fill memory
			var resultBuffer = Secp256k1Zkp.instance._malloc(result["length"] * result["BYTES_PER_ELEMENT"]);
			
			var blindsLength = positiveBlinds.reduce(function(positiveBlindsLength, positiveBlind) {
			
				// Return length of positive blind added to total
				return positiveBlindsLength + positiveBlind["length"];
				
			}, 0) + negativeBlinds.reduce(function(negativeBlindsLength, negativeBlind) {
			
				// Return length of negative blind added to total
				return negativeBlindsLength + negativeBlind["length"];
				
			}, 0);
			
			var blindsBuffer = Secp256k1Zkp.instance._malloc(blindsLength * Uint8Array["BYTES_PER_ELEMENT"]);
			
			// Go through all positive and negative blinds
			var blindsOffset = 0;
			for(var i = 0; i < positiveBlinds["length"] + negativeBlinds["length"]; ++i) {
			
				// Get blind
				var blind = (i < positiveBlinds["length"]) ? positiveBlinds[i] : negativeBlinds[i - positiveBlinds["length"]];
				
				// Set blind in memory at offset
				Secp256k1Zkp.instance["HEAPU8"].set(blind, blindsBuffer / Uint8Array["BYTES_PER_ELEMENT"] + blindsOffset);
				
				// Update offset
				blindsOffset += blind["length"];
			}
			
			var blindsSizesBuffer = Secp256k1Zkp.instance._malloc((positiveBlinds["length"] + negativeBlinds["length"]) * Uint32Array["BYTES_PER_ELEMENT"]);
			
			for(var i = 0; i < positiveBlinds["length"] + negativeBlinds["length"]; ++i)
				Secp256k1Zkp.instance["HEAPU32"].set(new Uint32Array([(i < positiveBlinds["length"]) ? positiveBlinds[i]["length"] : negativeBlinds[i - positiveBlinds["length"]]["length"]]), blindsSizesBuffer / Uint32Array["BYTES_PER_ELEMENT"] + i);
			
			// Check if performing blind sum failed
			if(Secp256k1Zkp.instance._blindSum(resultBuffer, blindsBuffer, blindsSizesBuffer, positiveBlinds["length"] + negativeBlinds["length"], positiveBlinds["length"]) === Secp256k1Zkp.C_FALSE) {
			
				// Clear memory
				Secp256k1Zkp.instance["HEAPU8"].fill(0, resultBuffer / result["BYTES_PER_ELEMENT"], resultBuffer / result["BYTES_PER_ELEMENT"] + result["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, blindsBuffer / Uint8Array["BYTES_PER_ELEMENT"], blindsBuffer / Uint8Array["BYTES_PER_ELEMENT"] + blindsLength);
				Secp256k1Zkp.instance["HEAPU32"].fill(0, blindsSizesBuffer / Uint32Array["BYTES_PER_ELEMENT"], blindsSizesBuffer / Uint32Array["BYTES_PER_ELEMENT"] + positiveBlinds["length"] + negativeBlinds["length"]);
				
				// Free memory
				Secp256k1Zkp.instance._free(resultBuffer);
				Secp256k1Zkp.instance._free(blindsBuffer);
				Secp256k1Zkp.instance._free(blindsSizesBuffer);
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			}
			
			// Get result
			result = new Uint8Array(Secp256k1Zkp.instance["HEAPU8"].subarray(resultBuffer, resultBuffer + result["length"]));
			
			// Clear memory
			Secp256k1Zkp.instance["HEAPU8"].fill(0, resultBuffer / result["BYTES_PER_ELEMENT"], resultBuffer / result["BYTES_PER_ELEMENT"] + result["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, blindsBuffer / Uint8Array["BYTES_PER_ELEMENT"], blindsBuffer / Uint8Array["BYTES_PER_ELEMENT"] + blindsLength);
			Secp256k1Zkp.instance["HEAPU32"].fill(0, blindsSizesBuffer / Uint32Array["BYTES_PER_ELEMENT"], blindsSizesBuffer / Uint32Array["BYTES_PER_ELEMENT"] + positiveBlinds["length"] + negativeBlinds["length"]);
			
			// Free memory
			Secp256k1Zkp.instance._free(resultBuffer);
			Secp256k1Zkp.instance._free(blindsBuffer);
			Secp256k1Zkp.instance._free(blindsSizesBuffer);
			
			// Return result
			return result;
		}
		
		// Is valid secret key
		static isValidSecretKey(secretKey) {
		
			// Check if instance doesn't exist
			if(typeof Secp256k1Zkp.instance === "undefined") {
			
				// Set instance
				Secp256k1Zkp.instance = secp256k1Zkp();
				
				// Initialize seed to size of seed
				var seed = new Uint8Array(Secp256k1Zkp.instance._seedSize());
				
				// Fill seed with random values
				crypto.getRandomValues(seed);
				
				// Allocate and fill memory
				var seedBuffer = Secp256k1Zkp.instance._malloc(seed["length"] * seed["BYTES_PER_ELEMENT"]);
				Secp256k1Zkp.instance["HEAPU8"].set(seed, seedBuffer / seed["BYTES_PER_ELEMENT"]);
				
				// Check if initializing failed
				if(Secp256k1Zkp.instance._initialize(seedBuffer, seed["length"] * seed["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
					
					// Set instance to invalid
					Secp256k1Zkp.instance = Secp256k1Zkp.INVALID;
				}
				
				// Otherwise
				else {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
				}
			}
		
			// Check if instance is invalid
			if(Secp256k1Zkp.instance === Secp256k1Zkp.INVALID)
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			
			// Allocate and fill memory
			var secretKeyBuffer = Secp256k1Zkp.instance._malloc(secretKey["length"] * secretKey["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(secretKey, secretKeyBuffer / secretKey["BYTES_PER_ELEMENT"]);
			
			// Check if secret key is not a valid secret key
			if(Secp256k1Zkp.instance._isValidSecretKey(secretKeyBuffer, secretKey["length"] * secretKey["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
			
				// Clear memory
				Secp256k1Zkp.instance["HEAPU8"].fill(0, secretKeyBuffer / secretKey["BYTES_PER_ELEMENT"], secretKeyBuffer / secretKey["BYTES_PER_ELEMENT"] + secretKey["length"]);
				
				// Free memory
				Secp256k1Zkp.instance._free(secretKeyBuffer);
			
				// Return false
				return false;
			}
			
			// Clear memory
			Secp256k1Zkp.instance["HEAPU8"].fill(0, secretKeyBuffer / secretKey["BYTES_PER_ELEMENT"], secretKeyBuffer / secretKey["BYTES_PER_ELEMENT"] + secretKey["length"]);
			
			// Free memory
			Secp256k1Zkp.instance._free(secretKeyBuffer);
			
			// Return true
			return true;
		}
		
		// Is valid public key
		static isValidPublicKey(publicKey) {
		
			// Check if instance doesn't exist
			if(typeof Secp256k1Zkp.instance === "undefined") {
			
				// Set instance
				Secp256k1Zkp.instance = secp256k1Zkp();
				
				// Initialize seed to size of seed
				var seed = new Uint8Array(Secp256k1Zkp.instance._seedSize());
				
				// Fill seed with random values
				crypto.getRandomValues(seed);
				
				// Allocate and fill memory
				var seedBuffer = Secp256k1Zkp.instance._malloc(seed["length"] * seed["BYTES_PER_ELEMENT"]);
				Secp256k1Zkp.instance["HEAPU8"].set(seed, seedBuffer / seed["BYTES_PER_ELEMENT"]);
				
				// Check if initializing failed
				if(Secp256k1Zkp.instance._initialize(seedBuffer, seed["length"] * seed["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
					
					// Set instance to invalid
					Secp256k1Zkp.instance = Secp256k1Zkp.INVALID;
				}
				
				// Otherwise
				else {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
				}
			}
		
			// Check if instance is invalid
			if(Secp256k1Zkp.instance === Secp256k1Zkp.INVALID)
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			
			// Allocate and fill memory
			var publicKeyBuffer = Secp256k1Zkp.instance._malloc(publicKey["length"] * publicKey["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(publicKey, publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"]);
			
			// Check if public key is not a valid public key
			if(Secp256k1Zkp.instance._isValidPublicKey(publicKeyBuffer, publicKey["length"] * publicKey["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
			
				// Clear memory
				Secp256k1Zkp.instance["HEAPU8"].fill(0, publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"], publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"] + publicKey["length"]);
				
				// Free memory
				Secp256k1Zkp.instance._free(publicKeyBuffer);
			
				// Return false
				return false;
			}
			
			// Clear memory
			Secp256k1Zkp.instance["HEAPU8"].fill(0, publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"], publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"] + publicKey["length"]);
			
			// Free memory
			Secp256k1Zkp.instance._free(publicKeyBuffer);
			
			// Return true
			return true;
		}
		
		// Is valid commit
		static isValidCommit(commit) {
		
			// Check if instance doesn't exist
			if(typeof Secp256k1Zkp.instance === "undefined") {
			
				// Set instance
				Secp256k1Zkp.instance = secp256k1Zkp();
				
				// Initialize seed to size of seed
				var seed = new Uint8Array(Secp256k1Zkp.instance._seedSize());
				
				// Fill seed with random values
				crypto.getRandomValues(seed);
				
				// Allocate and fill memory
				var seedBuffer = Secp256k1Zkp.instance._malloc(seed["length"] * seed["BYTES_PER_ELEMENT"]);
				Secp256k1Zkp.instance["HEAPU8"].set(seed, seedBuffer / seed["BYTES_PER_ELEMENT"]);
				
				// Check if initializing failed
				if(Secp256k1Zkp.instance._initialize(seedBuffer, seed["length"] * seed["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
					
					// Set instance to invalid
					Secp256k1Zkp.instance = Secp256k1Zkp.INVALID;
				}
				
				// Otherwise
				else {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
				}
			}
		
			// Check if instance is invalid
			if(Secp256k1Zkp.instance === Secp256k1Zkp.INVALID)
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			
			// Allocate and fill memory
			var commitBuffer = Secp256k1Zkp.instance._malloc(commit["length"] * commit["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(commit, commitBuffer / commit["BYTES_PER_ELEMENT"]);
			
			// Check if commit is not a valid commit
			if(Secp256k1Zkp.instance._isValidCommit(commitBuffer, commit["length"] * commit["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
			
				// Clear memory
				Secp256k1Zkp.instance["HEAPU8"].fill(0, commitBuffer / commit["BYTES_PER_ELEMENT"], commitBuffer / commit["BYTES_PER_ELEMENT"] + commit["length"]);
				
				// Free memory
				Secp256k1Zkp.instance._free(commitBuffer);
			
				// Return false
				return false;
			}
			
			// Clear memory
			Secp256k1Zkp.instance["HEAPU8"].fill(0, commitBuffer / commit["BYTES_PER_ELEMENT"], commitBuffer / commit["BYTES_PER_ELEMENT"] + commit["length"]);
			
			// Free memory
			Secp256k1Zkp.instance._free(commitBuffer);
			
			// Return true
			return true;
		}
		
		// Is valid single-signer signature
		static isValidSingleSignerSignature(signature) {
		
			// Check if instance doesn't exist
			if(typeof Secp256k1Zkp.instance === "undefined") {
			
				// Set instance
				Secp256k1Zkp.instance = secp256k1Zkp();
				
				// Initialize seed to size of seed
				var seed = new Uint8Array(Secp256k1Zkp.instance._seedSize());
				
				// Fill seed with random values
				crypto.getRandomValues(seed);
				
				// Allocate and fill memory
				var seedBuffer = Secp256k1Zkp.instance._malloc(seed["length"] * seed["BYTES_PER_ELEMENT"]);
				Secp256k1Zkp.instance["HEAPU8"].set(seed, seedBuffer / seed["BYTES_PER_ELEMENT"]);
				
				// Check if initializing failed
				if(Secp256k1Zkp.instance._initialize(seedBuffer, seed["length"] * seed["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
					
					// Set instance to invalid
					Secp256k1Zkp.instance = Secp256k1Zkp.INVALID;
				}
				
				// Otherwise
				else {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
				}
			}
		
			// Check if instance is invalid
			if(Secp256k1Zkp.instance === Secp256k1Zkp.INVALID)
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			
			// Allocate and fill memory
			var signatureBuffer = Secp256k1Zkp.instance._malloc(signature["length"] * signature["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(signature, signatureBuffer / signature["BYTES_PER_ELEMENT"]);
			
			// Check if signature is not a valid single-signer signature
			if(Secp256k1Zkp.instance._isValidSingleSignerSignature(signatureBuffer, signature["length"] * signature["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
			
				// Clear memory
				Secp256k1Zkp.instance["HEAPU8"].fill(0, signatureBuffer / signature["BYTES_PER_ELEMENT"], signatureBuffer / signature["BYTES_PER_ELEMENT"] + signature["length"]);
				
				// Free memory
				Secp256k1Zkp.instance._free(signatureBuffer);
			
				// Return false
				return false;
			}
			
			// Clear memory
			Secp256k1Zkp.instance["HEAPU8"].fill(0, signatureBuffer / signature["BYTES_PER_ELEMENT"], signatureBuffer / signature["BYTES_PER_ELEMENT"] + signature["length"]);
			
			// Free memory
			Secp256k1Zkp.instance._free(signatureBuffer);
			
			// Return true
			return true;
		}
		
		// Create bulletproof
		static createBulletproof(blind, value, nonce, privateNonce, extraCommit, message) {
		
			// Check if instance doesn't exist
			if(typeof Secp256k1Zkp.instance === "undefined") {
			
				// Set instance
				Secp256k1Zkp.instance = secp256k1Zkp();
				
				// Initialize seed to size of seed
				var seed = new Uint8Array(Secp256k1Zkp.instance._seedSize());
				
				// Fill seed with random values
				crypto.getRandomValues(seed);
				
				// Allocate and fill memory
				var seedBuffer = Secp256k1Zkp.instance._malloc(seed["length"] * seed["BYTES_PER_ELEMENT"]);
				Secp256k1Zkp.instance["HEAPU8"].set(seed, seedBuffer / seed["BYTES_PER_ELEMENT"]);
				
				// Check if initializing failed
				if(Secp256k1Zkp.instance._initialize(seedBuffer, seed["length"] * seed["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
					
					// Set instance to invalid
					Secp256k1Zkp.instance = Secp256k1Zkp.INVALID;
				}
				
				// Otherwise
				else {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
				}
			}
		
			// Check if instance is invalid
			if(Secp256k1Zkp.instance === Secp256k1Zkp.INVALID)
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			
			// Initialize proof to size of bulletproof proof
			var proof = new Uint8Array(Secp256k1Zkp.instance._bulletproofProofSize());
			
			// Initialize proof size to size of a max 64-bit integer C string
			var proofSize = new Uint8Array(Secp256k1Zkp.MAX_64_BIT_INTEGER_C_STRING["length"]);
			
			// Allocate and fill memory
			var proofBuffer = Secp256k1Zkp.instance._malloc(proof["length"] * proof["BYTES_PER_ELEMENT"]);
			
			var proofSizeBuffer = Secp256k1Zkp.instance._malloc(proofSize["length"] * proofSize["BYTES_PER_ELEMENT"]);
			
			var blindBuffer = Secp256k1Zkp.instance._malloc(blind["length"] * blind["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(blind, blindBuffer / blind["BYTES_PER_ELEMENT"]);
			
			var cStringValue = Secp256k1Zkp.stringToCString(value);
			var valueBuffer = Secp256k1Zkp.instance._malloc(cStringValue["length"] * cStringValue["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(cStringValue, valueBuffer / cStringValue["BYTES_PER_ELEMENT"]);
			cStringValue.fill(0);
			
			var nonceBuffer = Secp256k1Zkp.instance._malloc(nonce["length"] * nonce["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(nonce, nonceBuffer / nonce["BYTES_PER_ELEMENT"]);
			
			var privateNonceBuffer = Secp256k1Zkp.instance._malloc(privateNonce["length"] * privateNonce["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(privateNonce, privateNonceBuffer / privateNonce["BYTES_PER_ELEMENT"]);
			
			var extraCommitBuffer = Secp256k1Zkp.instance._malloc(extraCommit["length"] * extraCommit["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(extraCommit, extraCommitBuffer / extraCommit["BYTES_PER_ELEMENT"]);
			
			var messageBuffer = Secp256k1Zkp.instance._malloc(message["length"] * message["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(message, messageBuffer / message["BYTES_PER_ELEMENT"]);
			
			// Check if creating bulletproof failed
			if(Secp256k1Zkp.instance._createBulletproof(proofBuffer, proofSizeBuffer, blindBuffer, blind["length"] * blind["BYTES_PER_ELEMENT"], valueBuffer, nonceBuffer, nonce["length"] * nonce["BYTES_PER_ELEMENT"], privateNonceBuffer, privateNonce["length"] * privateNonce["BYTES_PER_ELEMENT"], extraCommitBuffer, extraCommit["length"] * extraCommit["BYTES_PER_ELEMENT"], messageBuffer, message["length"] * message["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
			
				// Clear memory
				Secp256k1Zkp.instance["HEAPU8"].fill(0, proofBuffer / proof["BYTES_PER_ELEMENT"], proofBuffer / proof["BYTES_PER_ELEMENT"] + proof["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, proofSizeBuffer / proofSize["BYTES_PER_ELEMENT"], proofSizeBuffer / proofSize["BYTES_PER_ELEMENT"] + proofSize["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, blindBuffer / blind["BYTES_PER_ELEMENT"], blindBuffer / blind["BYTES_PER_ELEMENT"] + blind["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, valueBuffer / cStringValue["BYTES_PER_ELEMENT"], valueBuffer / cStringValue["BYTES_PER_ELEMENT"] + cStringValue["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, nonceBuffer / nonce["BYTES_PER_ELEMENT"], nonceBuffer / nonce["BYTES_PER_ELEMENT"] + nonce["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, privateNonceBuffer / privateNonce["BYTES_PER_ELEMENT"], privateNonceBuffer / privateNonce["BYTES_PER_ELEMENT"] + privateNonce["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, extraCommitBuffer / extraCommit["BYTES_PER_ELEMENT"], extraCommitBuffer / extraCommit["BYTES_PER_ELEMENT"] + extraCommit["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, messageBuffer / message["BYTES_PER_ELEMENT"], messageBuffer / message["BYTES_PER_ELEMENT"] + message["length"]);
				
				// Free memory
				Secp256k1Zkp.instance._free(proofBuffer);
				Secp256k1Zkp.instance._free(proofSizeBuffer);
				Secp256k1Zkp.instance._free(blindBuffer);
				Secp256k1Zkp.instance._free(valueBuffer);
				Secp256k1Zkp.instance._free(nonceBuffer);
				Secp256k1Zkp.instance._free(privateNonceBuffer);
				Secp256k1Zkp.instance._free(extraCommitBuffer);
				Secp256k1Zkp.instance._free(messageBuffer);
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			}
			
			// Get proof size
			proofSize = Secp256k1Zkp.cStringToString(Secp256k1Zkp.instance["HEAPU8"].subarray(proofSizeBuffer, proofSizeBuffer + proofSize["length"]));
			
			// Get proof
			proof = new Uint8Array(Secp256k1Zkp.instance["HEAPU8"].subarray(proofBuffer, proofBuffer + parseInt(proofSize, Secp256k1Zkp.DECIMAL_NUMBER_BASE)));
			
			// Clear memory
			Secp256k1Zkp.instance["HEAPU8"].fill(0, proofBuffer / proof["BYTES_PER_ELEMENT"], proofBuffer / proof["BYTES_PER_ELEMENT"] + proof["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, proofSizeBuffer / proofSize["BYTES_PER_ELEMENT"], proofSizeBuffer / proofSize["BYTES_PER_ELEMENT"] + proofSize["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, blindBuffer / blind["BYTES_PER_ELEMENT"], blindBuffer / blind["BYTES_PER_ELEMENT"] + blind["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, valueBuffer / cStringValue["BYTES_PER_ELEMENT"], valueBuffer / cStringValue["BYTES_PER_ELEMENT"] + cStringValue["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, nonceBuffer / nonce["BYTES_PER_ELEMENT"], nonceBuffer / nonce["BYTES_PER_ELEMENT"] + nonce["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, privateNonceBuffer / privateNonce["BYTES_PER_ELEMENT"], privateNonceBuffer / privateNonce["BYTES_PER_ELEMENT"] + privateNonce["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, extraCommitBuffer / extraCommit["BYTES_PER_ELEMENT"], extraCommitBuffer / extraCommit["BYTES_PER_ELEMENT"] + extraCommit["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, messageBuffer / message["BYTES_PER_ELEMENT"], messageBuffer / message["BYTES_PER_ELEMENT"] + message["length"]);
			
			// Free memory
			Secp256k1Zkp.instance._free(proofBuffer);
			Secp256k1Zkp.instance._free(proofSizeBuffer);
			Secp256k1Zkp.instance._free(blindBuffer);
			Secp256k1Zkp.instance._free(valueBuffer);
			Secp256k1Zkp.instance._free(nonceBuffer);
			Secp256k1Zkp.instance._free(privateNonceBuffer);
			Secp256k1Zkp.instance._free(extraCommitBuffer);
			Secp256k1Zkp.instance._free(messageBuffer);
			
			// Return proof
			return proof;
		}
		
		// Create bulletproof blindless
		static createBulletproofBlindless(tauX, tOne, tTwo, commit, value, nonce, extraCommit, message) {
		
			// Check if instance doesn't exist
			if(typeof Secp256k1Zkp.instance === "undefined") {
			
				// Set instance
				Secp256k1Zkp.instance = secp256k1Zkp();
				
				// Initialize seed to size of seed
				var seed = new Uint8Array(Secp256k1Zkp.instance._seedSize());
				
				// Fill seed with random values
				crypto.getRandomValues(seed);
				
				// Allocate and fill memory
				var seedBuffer = Secp256k1Zkp.instance._malloc(seed["length"] * seed["BYTES_PER_ELEMENT"]);
				Secp256k1Zkp.instance["HEAPU8"].set(seed, seedBuffer / seed["BYTES_PER_ELEMENT"]);
				
				// Check if initializing failed
				if(Secp256k1Zkp.instance._initialize(seedBuffer, seed["length"] * seed["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
					
					// Set instance to invalid
					Secp256k1Zkp.instance = Secp256k1Zkp.INVALID;
				}
				
				// Otherwise
				else {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
				}
			}
		
			// Check if instance is invalid
			if(Secp256k1Zkp.instance === Secp256k1Zkp.INVALID)
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			
			// Initialize proof to size of bulletproof proof
			var proof = new Uint8Array(Secp256k1Zkp.instance._bulletproofProofSize());
			
			// Initialize proof size to size of a max 64-bit integer C string
			var proofSize = new Uint8Array(Secp256k1Zkp.MAX_64_BIT_INTEGER_C_STRING["length"]);
			
			// Allocate and fill memory
			var proofBuffer = Secp256k1Zkp.instance._malloc(proof["length"] * proof["BYTES_PER_ELEMENT"]);
			
			var proofSizeBuffer = Secp256k1Zkp.instance._malloc(proofSize["length"] * proofSize["BYTES_PER_ELEMENT"]);
			
			var tauXBuffer = Secp256k1Zkp.instance._malloc(tauX["length"] * tauX["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(tauX, tauXBuffer / tauX["BYTES_PER_ELEMENT"]);
			
			var tOneBuffer = Secp256k1Zkp.instance._malloc(tOne["length"] * tOne["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(tOne, tOneBuffer / tOne["BYTES_PER_ELEMENT"]);
			
			var tTwoBuffer = Secp256k1Zkp.instance._malloc(tTwo["length"] * tTwo["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(tTwo, tTwoBuffer / tTwo["BYTES_PER_ELEMENT"]);
			
			var commitBuffer = Secp256k1Zkp.instance._malloc(commit["length"] * commit["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(commit, commitBuffer / commit["BYTES_PER_ELEMENT"]);
			
			var cStringValue = Secp256k1Zkp.stringToCString(value);
			var valueBuffer = Secp256k1Zkp.instance._malloc(cStringValue["length"] * cStringValue["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(cStringValue, valueBuffer / cStringValue["BYTES_PER_ELEMENT"]);
			cStringValue.fill(0);
			
			var nonceBuffer = Secp256k1Zkp.instance._malloc(nonce["length"] * nonce["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(nonce, nonceBuffer / nonce["BYTES_PER_ELEMENT"]);
			
			var extraCommitBuffer = Secp256k1Zkp.instance._malloc(extraCommit["length"] * extraCommit["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(extraCommit, extraCommitBuffer / extraCommit["BYTES_PER_ELEMENT"]);
			
			var messageBuffer = Secp256k1Zkp.instance._malloc(message["length"] * message["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(message, messageBuffer / message["BYTES_PER_ELEMENT"]);
			
			// Check if creating bulletproof blindless failed
			if(Secp256k1Zkp.instance._createBulletproofBlindless(proofBuffer, proofSizeBuffer, tauXBuffer, tauX["length"] * tauX["BYTES_PER_ELEMENT"], tOneBuffer, tOne["length"] * tOne["BYTES_PER_ELEMENT"], tTwoBuffer, tTwo["length"] * tTwo["BYTES_PER_ELEMENT"], commitBuffer, commit["length"] * commit["BYTES_PER_ELEMENT"], valueBuffer, nonceBuffer, nonce["length"] * nonce["BYTES_PER_ELEMENT"], extraCommitBuffer, extraCommit["length"] * extraCommit["BYTES_PER_ELEMENT"], messageBuffer, message["length"] * message["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
			
				// Clear memory
				Secp256k1Zkp.instance["HEAPU8"].fill(0, proofBuffer / proof["BYTES_PER_ELEMENT"], proofBuffer / proof["BYTES_PER_ELEMENT"] + proof["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, proofSizeBuffer / proofSize["BYTES_PER_ELEMENT"], proofSizeBuffer / proofSize["BYTES_PER_ELEMENT"] + proofSize["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, tauXBuffer / tauX["BYTES_PER_ELEMENT"], tauXBuffer / tauX["BYTES_PER_ELEMENT"] + tauX["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, tOneBuffer / tOne["BYTES_PER_ELEMENT"], tOneBuffer / tOne["BYTES_PER_ELEMENT"] + tOne["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, tTwoBuffer / tTwo["BYTES_PER_ELEMENT"], tTwoBuffer / tTwo["BYTES_PER_ELEMENT"] + tTwo["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, commitBuffer / commit["BYTES_PER_ELEMENT"], commitBuffer / commit["BYTES_PER_ELEMENT"] + commit["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, valueBuffer / cStringValue["BYTES_PER_ELEMENT"], valueBuffer / cStringValue["BYTES_PER_ELEMENT"] + cStringValue["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, nonceBuffer / nonce["BYTES_PER_ELEMENT"], nonceBuffer / nonce["BYTES_PER_ELEMENT"] + nonce["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, extraCommitBuffer / extraCommit["BYTES_PER_ELEMENT"], extraCommitBuffer / extraCommit["BYTES_PER_ELEMENT"] + extraCommit["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, messageBuffer / message["BYTES_PER_ELEMENT"], messageBuffer / message["BYTES_PER_ELEMENT"] + message["length"]);
				
				// Free memory
				Secp256k1Zkp.instance._free(proofBuffer);
				Secp256k1Zkp.instance._free(proofSizeBuffer);
				Secp256k1Zkp.instance._free(tauXBuffer);
				Secp256k1Zkp.instance._free(tOneBuffer);
				Secp256k1Zkp.instance._free(tTwoBuffer);
				Secp256k1Zkp.instance._free(commitBuffer);
				Secp256k1Zkp.instance._free(valueBuffer);
				Secp256k1Zkp.instance._free(nonceBuffer);
				Secp256k1Zkp.instance._free(extraCommitBuffer);
				Secp256k1Zkp.instance._free(messageBuffer);
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			}
			
			// Get proof size
			proofSize = Secp256k1Zkp.cStringToString(Secp256k1Zkp.instance["HEAPU8"].subarray(proofSizeBuffer, proofSizeBuffer + proofSize["length"]));
			
			// Get proof
			proof = new Uint8Array(Secp256k1Zkp.instance["HEAPU8"].subarray(proofBuffer, proofBuffer + parseInt(proofSize, Secp256k1Zkp.DECIMAL_NUMBER_BASE)));
			
			// Clear memory
			Secp256k1Zkp.instance["HEAPU8"].fill(0, proofBuffer / proof["BYTES_PER_ELEMENT"], proofBuffer / proof["BYTES_PER_ELEMENT"] + proof["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, proofSizeBuffer / proofSize["BYTES_PER_ELEMENT"], proofSizeBuffer / proofSize["BYTES_PER_ELEMENT"] + proofSize["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, tauXBuffer / tauX["BYTES_PER_ELEMENT"], tauXBuffer / tauX["BYTES_PER_ELEMENT"] + tauX["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, tOneBuffer / tOne["BYTES_PER_ELEMENT"], tOneBuffer / tOne["BYTES_PER_ELEMENT"] + tOne["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, tTwoBuffer / tTwo["BYTES_PER_ELEMENT"], tTwoBuffer / tTwo["BYTES_PER_ELEMENT"] + tTwo["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, commitBuffer / commit["BYTES_PER_ELEMENT"], commitBuffer / commit["BYTES_PER_ELEMENT"] + commit["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, valueBuffer / cStringValue["BYTES_PER_ELEMENT"], valueBuffer / cStringValue["BYTES_PER_ELEMENT"] + cStringValue["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, nonceBuffer / nonce["BYTES_PER_ELEMENT"], nonceBuffer / nonce["BYTES_PER_ELEMENT"] + nonce["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, extraCommitBuffer / extraCommit["BYTES_PER_ELEMENT"], extraCommitBuffer / extraCommit["BYTES_PER_ELEMENT"] + extraCommit["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, messageBuffer / message["BYTES_PER_ELEMENT"], messageBuffer / message["BYTES_PER_ELEMENT"] + message["length"]);
			
			// Free memory
			Secp256k1Zkp.instance._free(proofBuffer);
			Secp256k1Zkp.instance._free(proofSizeBuffer);
			Secp256k1Zkp.instance._free(tauXBuffer);
			Secp256k1Zkp.instance._free(tOneBuffer);
			Secp256k1Zkp.instance._free(tTwoBuffer);
			Secp256k1Zkp.instance._free(commitBuffer);
			Secp256k1Zkp.instance._free(valueBuffer);
			Secp256k1Zkp.instance._free(nonceBuffer);
			Secp256k1Zkp.instance._free(extraCommitBuffer);
			Secp256k1Zkp.instance._free(messageBuffer);
			
			// Return proof
			return proof;
		}
		
		// Rewind bulletproof
		static rewindBulletproof(proof, commit, nonce) {
		
			// Check if instance doesn't exist
			if(typeof Secp256k1Zkp.instance === "undefined") {
			
				// Set instance
				Secp256k1Zkp.instance = secp256k1Zkp();
				
				// Initialize seed to size of seed
				var seed = new Uint8Array(Secp256k1Zkp.instance._seedSize());
				
				// Fill seed with random values
				crypto.getRandomValues(seed);
				
				// Allocate and fill memory
				var seedBuffer = Secp256k1Zkp.instance._malloc(seed["length"] * seed["BYTES_PER_ELEMENT"]);
				Secp256k1Zkp.instance["HEAPU8"].set(seed, seedBuffer / seed["BYTES_PER_ELEMENT"]);
				
				// Check if initializing failed
				if(Secp256k1Zkp.instance._initialize(seedBuffer, seed["length"] * seed["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
					
					// Set instance to invalid
					Secp256k1Zkp.instance = Secp256k1Zkp.INVALID;
				}
				
				// Otherwise
				else {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
				}
			}
		
			// Check if instance is invalid
			if(Secp256k1Zkp.instance === Secp256k1Zkp.INVALID)
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			
			// Initialize value to size of a max 64-bit integer C string
			var value = new Uint8Array(Secp256k1Zkp.MAX_64_BIT_INTEGER_C_STRING["length"]);
			
			// Initialize blind to size of blind
			var blind = new Uint8Array(Secp256k1Zkp.instance._blindSize());
			
			// Initialize message to size of rewind bulletproof message
			var message = new Uint8Array(Secp256k1Zkp.instance._bulletproofMessageSize());
			
			// Allocate and fill memory
			var valueBuffer = Secp256k1Zkp.instance._malloc(value["length"] * value["BYTES_PER_ELEMENT"]);
			
			var blindBuffer = Secp256k1Zkp.instance._malloc(blind["length"] * blind["BYTES_PER_ELEMENT"]);
			
			var messageBuffer = Secp256k1Zkp.instance._malloc(message["length"] * message["BYTES_PER_ELEMENT"]);
			
			var proofBuffer = Secp256k1Zkp.instance._malloc(proof["length"] * proof["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(proof, proofBuffer / proof["BYTES_PER_ELEMENT"]);
			
			var commitBuffer = Secp256k1Zkp.instance._malloc(commit["length"] * commit["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(commit, commitBuffer / commit["BYTES_PER_ELEMENT"]);
			
			var nonceBuffer = Secp256k1Zkp.instance._malloc(nonce["length"] * nonce["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(nonce, nonceBuffer / nonce["BYTES_PER_ELEMENT"]);
			
			// Check if performing rewind bulletproof failed
			if(Secp256k1Zkp.instance._rewindBulletproof(valueBuffer, blindBuffer, messageBuffer, proofBuffer, proof["length"] * proof["BYTES_PER_ELEMENT"], commitBuffer, commit["length"] * commit["BYTES_PER_ELEMENT"], nonceBuffer, nonce["length"] * nonce["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
			
				// Clear memory
				Secp256k1Zkp.instance["HEAPU8"].fill(0, valueBuffer / value["BYTES_PER_ELEMENT"], valueBuffer / value["BYTES_PER_ELEMENT"] + value["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, blindBuffer / blind["BYTES_PER_ELEMENT"], blindBuffer / blind["BYTES_PER_ELEMENT"] + blind["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, messageBuffer / message["BYTES_PER_ELEMENT"], messageBuffer / message["BYTES_PER_ELEMENT"] + message["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, proofBuffer / proof["BYTES_PER_ELEMENT"], proofBuffer / proof["BYTES_PER_ELEMENT"] + proof["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, commitBuffer / commit["BYTES_PER_ELEMENT"], commitBuffer / commit["BYTES_PER_ELEMENT"] + commit["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, nonceBuffer / nonce["BYTES_PER_ELEMENT"], nonceBuffer / nonce["BYTES_PER_ELEMENT"] + nonce["length"]);
				
				// Free memory
				Secp256k1Zkp.instance._free(valueBuffer);
				Secp256k1Zkp.instance._free(blindBuffer);
				Secp256k1Zkp.instance._free(messageBuffer);
				Secp256k1Zkp.instance._free(proofBuffer);
				Secp256k1Zkp.instance._free(commitBuffer);
				Secp256k1Zkp.instance._free(nonceBuffer);
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			}
			
			// Get value
			value = Secp256k1Zkp.cStringToString(Secp256k1Zkp.instance["HEAPU8"].subarray(valueBuffer, valueBuffer + value["length"]));
			
			// Get blind
			blind = new Uint8Array(Secp256k1Zkp.instance["HEAPU8"].subarray(blindBuffer, blindBuffer + blind["length"]));
			
			// Get message
			message = new Uint8Array(Secp256k1Zkp.instance["HEAPU8"].subarray(messageBuffer, messageBuffer + message["length"]));
			
			// Clear memory
			Secp256k1Zkp.instance["HEAPU8"].fill(0, valueBuffer / value["BYTES_PER_ELEMENT"], valueBuffer / value["BYTES_PER_ELEMENT"] + value["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, blindBuffer / blind["BYTES_PER_ELEMENT"], blindBuffer / blind["BYTES_PER_ELEMENT"] + blind["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, messageBuffer / message["BYTES_PER_ELEMENT"], messageBuffer / message["BYTES_PER_ELEMENT"] + message["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, proofBuffer / proof["BYTES_PER_ELEMENT"], proofBuffer / proof["BYTES_PER_ELEMENT"] + proof["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, commitBuffer / commit["BYTES_PER_ELEMENT"], commitBuffer / commit["BYTES_PER_ELEMENT"] + commit["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, nonceBuffer / nonce["BYTES_PER_ELEMENT"], nonceBuffer / nonce["BYTES_PER_ELEMENT"] + nonce["length"]);
			
			// Free memory
			Secp256k1Zkp.instance._free(valueBuffer);
			Secp256k1Zkp.instance._free(blindBuffer);
			Secp256k1Zkp.instance._free(messageBuffer);
			Secp256k1Zkp.instance._free(proofBuffer);
			Secp256k1Zkp.instance._free(commitBuffer);
			Secp256k1Zkp.instance._free(nonceBuffer);
			
			// Return value, blind, and message
			return {
			
				// Value
				"Value": value,
				
				// Blind
				"Blind": blind,
				
				// Message
				"Message": message
			};
		}
		
		// Verify bulletproof
		static verifyBulletproof(proof, commit, extraCommit) {
		
			// Check if instance doesn't exist
			if(typeof Secp256k1Zkp.instance === "undefined") {
			
				// Set instance
				Secp256k1Zkp.instance = secp256k1Zkp();
				
				// Initialize seed to size of seed
				var seed = new Uint8Array(Secp256k1Zkp.instance._seedSize());
				
				// Fill seed with random values
				crypto.getRandomValues(seed);
				
				// Allocate and fill memory
				var seedBuffer = Secp256k1Zkp.instance._malloc(seed["length"] * seed["BYTES_PER_ELEMENT"]);
				Secp256k1Zkp.instance["HEAPU8"].set(seed, seedBuffer / seed["BYTES_PER_ELEMENT"]);
				
				// Check if initializing failed
				if(Secp256k1Zkp.instance._initialize(seedBuffer, seed["length"] * seed["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
					
					// Set instance to invalid
					Secp256k1Zkp.instance = Secp256k1Zkp.INVALID;
				}
				
				// Otherwise
				else {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
				}
			}
		
			// Check if instance is invalid
			if(Secp256k1Zkp.instance === Secp256k1Zkp.INVALID)
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			
			// Allocate and fill memory
			var proofBuffer = Secp256k1Zkp.instance._malloc(proof["length"] * proof["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(proof, proofBuffer / proof["BYTES_PER_ELEMENT"]);
			
			var commitBuffer = Secp256k1Zkp.instance._malloc(commit["length"] * commit["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(commit, commitBuffer / commit["BYTES_PER_ELEMENT"]);
			
			var extraCommitBuffer = Secp256k1Zkp.instance._malloc(extraCommit["length"] * extraCommit["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(extraCommit, extraCommitBuffer / extraCommit["BYTES_PER_ELEMENT"]);
			
			// Check if bulletproof isn't verified
			if(Secp256k1Zkp.instance._verifyBulletproof(proofBuffer, proof["length"] * proof["BYTES_PER_ELEMENT"], commitBuffer, commit["length"] * commit["BYTES_PER_ELEMENT"], extraCommitBuffer, extraCommit["length"] * extraCommit["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
			
				// Clear memory
				Secp256k1Zkp.instance["HEAPU8"].fill(0, proofBuffer / proof["BYTES_PER_ELEMENT"], proofBuffer / proof["BYTES_PER_ELEMENT"] + proof["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, commitBuffer / commit["BYTES_PER_ELEMENT"], commitBuffer / commit["BYTES_PER_ELEMENT"] + commit["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, extraCommitBuffer / extraCommit["BYTES_PER_ELEMENT"], extraCommitBuffer / extraCommit["BYTES_PER_ELEMENT"] + extraCommit["length"]);
				
				// Free memory
				Secp256k1Zkp.instance._free(proofBuffer);
				Secp256k1Zkp.instance._free(commitBuffer);
				Secp256k1Zkp.instance._free(extraCommitBuffer);
			
				// Return false
				return false;
			}
			
			// Clear memory
			Secp256k1Zkp.instance["HEAPU8"].fill(0, proofBuffer / proof["BYTES_PER_ELEMENT"], proofBuffer / proof["BYTES_PER_ELEMENT"] + proof["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, commitBuffer / commit["BYTES_PER_ELEMENT"], commitBuffer / commit["BYTES_PER_ELEMENT"] + commit["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, extraCommitBuffer / extraCommit["BYTES_PER_ELEMENT"], extraCommitBuffer / extraCommit["BYTES_PER_ELEMENT"] + extraCommit["length"]);
			
			// Free memory
			Secp256k1Zkp.instance._free(proofBuffer);
			Secp256k1Zkp.instance._free(commitBuffer);
			Secp256k1Zkp.instance._free(extraCommitBuffer);
			
			// Return true
			return true;
		}
		
		// Public key from secret key
		static publicKeyFromSecretKey(secretKey) {
		
			// Check if instance doesn't exist
			if(typeof Secp256k1Zkp.instance === "undefined") {
			
				// Set instance
				Secp256k1Zkp.instance = secp256k1Zkp();
				
				// Initialize seed to size of seed
				var seed = new Uint8Array(Secp256k1Zkp.instance._seedSize());
				
				// Fill seed with random values
				crypto.getRandomValues(seed);
				
				// Allocate and fill memory
				var seedBuffer = Secp256k1Zkp.instance._malloc(seed["length"] * seed["BYTES_PER_ELEMENT"]);
				Secp256k1Zkp.instance["HEAPU8"].set(seed, seedBuffer / seed["BYTES_PER_ELEMENT"]);
				
				// Check if initializing failed
				if(Secp256k1Zkp.instance._initialize(seedBuffer, seed["length"] * seed["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
					
					// Set instance to invalid
					Secp256k1Zkp.instance = Secp256k1Zkp.INVALID;
				}
				
				// Otherwise
				else {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
				}
			}
		
			// Check if instance is invalid
			if(Secp256k1Zkp.instance === Secp256k1Zkp.INVALID)
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			
			// Initialize public key to size of public key
			var publicKey = new Uint8Array(Secp256k1Zkp.instance._publicKeySize());
			
			// Allocate and fill memory
			var publicKeyBuffer = Secp256k1Zkp.instance._malloc(publicKey["length"] * publicKey["BYTES_PER_ELEMENT"]);
			
			var secretKeyBuffer = Secp256k1Zkp.instance._malloc(secretKey["length"] * secretKey["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(secretKey, secretKeyBuffer / secretKey["BYTES_PER_ELEMENT"]);
			
			// Check if getting public key from secret key failed
			if(Secp256k1Zkp.instance._publicKeyFromSecretKey(publicKeyBuffer, secretKeyBuffer, secretKey["length"] * secretKey["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
			
				// Clear memory
				Secp256k1Zkp.instance["HEAPU8"].fill(0, publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"], publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"] + publicKey["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, secretKeyBuffer / secretKey["BYTES_PER_ELEMENT"], secretKeyBuffer / secretKey["BYTES_PER_ELEMENT"] + secretKey["length"]);
				
				// Free memory
				Secp256k1Zkp.instance._free(publicKeyBuffer);
				Secp256k1Zkp.instance._free(secretKeyBuffer);
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			}
			
			// Get public key
			publicKey = new Uint8Array(Secp256k1Zkp.instance["HEAPU8"].subarray(publicKeyBuffer, publicKeyBuffer + publicKey["length"]));
			
			// Clear memory
			Secp256k1Zkp.instance["HEAPU8"].fill(0, publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"], publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"] + publicKey["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, secretKeyBuffer / secretKey["BYTES_PER_ELEMENT"], secretKeyBuffer / secretKey["BYTES_PER_ELEMENT"] + secretKey["length"]);
			
			// Free memory
			Secp256k1Zkp.instance._free(publicKeyBuffer);
			Secp256k1Zkp.instance._free(secretKeyBuffer);
			
			// Return public key
			return publicKey;
		}
		
		// Public key from data
		static publicKeyFromData(data) {
		
			// Check if instance doesn't exist
			if(typeof Secp256k1Zkp.instance === "undefined") {
			
				// Set instance
				Secp256k1Zkp.instance = secp256k1Zkp();
				
				// Initialize seed to size of seed
				var seed = new Uint8Array(Secp256k1Zkp.instance._seedSize());
				
				// Fill seed with random values
				crypto.getRandomValues(seed);
				
				// Allocate and fill memory
				var seedBuffer = Secp256k1Zkp.instance._malloc(seed["length"] * seed["BYTES_PER_ELEMENT"]);
				Secp256k1Zkp.instance["HEAPU8"].set(seed, seedBuffer / seed["BYTES_PER_ELEMENT"]);
				
				// Check if initializing failed
				if(Secp256k1Zkp.instance._initialize(seedBuffer, seed["length"] * seed["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
					
					// Set instance to invalid
					Secp256k1Zkp.instance = Secp256k1Zkp.INVALID;
				}
				
				// Otherwise
				else {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
				}
			}
		
			// Check if instance is invalid
			if(Secp256k1Zkp.instance === Secp256k1Zkp.INVALID)
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			
			// Initialize public key to size of public key
			var publicKey = new Uint8Array(Secp256k1Zkp.instance._publicKeySize());
			
			// Allocate and fill memory
			var publicKeyBuffer = Secp256k1Zkp.instance._malloc(publicKey["length"] * publicKey["BYTES_PER_ELEMENT"]);
			
			var dataBuffer = Secp256k1Zkp.instance._malloc(data["length"] * data["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(data, dataBuffer / data["BYTES_PER_ELEMENT"]);
			
			// Check if getting public key from data failed
			if(Secp256k1Zkp.instance._publicKeyFromData(publicKeyBuffer, dataBuffer, data["length"] * data["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
			
				// Clear memory
				Secp256k1Zkp.instance["HEAPU8"].fill(0, publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"], publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"] + publicKey["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, dataBuffer / data["BYTES_PER_ELEMENT"], dataBuffer / data["BYTES_PER_ELEMENT"] + data["length"]);
				
				// Free memory
				Secp256k1Zkp.instance._free(publicKeyBuffer);
				Secp256k1Zkp.instance._free(dataBuffer);
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			}
			
			// Get public key
			publicKey = new Uint8Array(Secp256k1Zkp.instance["HEAPU8"].subarray(publicKeyBuffer, publicKeyBuffer + publicKey["length"]));
			
			// Clear memory
			Secp256k1Zkp.instance["HEAPU8"].fill(0, publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"], publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"] + publicKey["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, dataBuffer / data["BYTES_PER_ELEMENT"], dataBuffer / data["BYTES_PER_ELEMENT"] + data["length"]);
			
			// Free memory
			Secp256k1Zkp.instance._free(publicKeyBuffer);
			Secp256k1Zkp.instance._free(dataBuffer);
			
			// Return public key
			return publicKey;
		}
		
		// Uncompress public key
		static uncompressPublicKey(publicKey) {
		
			// Check if instance doesn't exist
			if(typeof Secp256k1Zkp.instance === "undefined") {
			
				// Set instance
				Secp256k1Zkp.instance = secp256k1Zkp();
				
				// Initialize seed to size of seed
				var seed = new Uint8Array(Secp256k1Zkp.instance._seedSize());
				
				// Fill seed with random values
				crypto.getRandomValues(seed);
				
				// Allocate and fill memory
				var seedBuffer = Secp256k1Zkp.instance._malloc(seed["length"] * seed["BYTES_PER_ELEMENT"]);
				Secp256k1Zkp.instance["HEAPU8"].set(seed, seedBuffer / seed["BYTES_PER_ELEMENT"]);
				
				// Check if initializing failed
				if(Secp256k1Zkp.instance._initialize(seedBuffer, seed["length"] * seed["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
					
					// Set instance to invalid
					Secp256k1Zkp.instance = Secp256k1Zkp.INVALID;
				}
				
				// Otherwise
				else {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
				}
			}
		
			// Check if instance is invalid
			if(Secp256k1Zkp.instance === Secp256k1Zkp.INVALID)
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			
			// Initialize uncompressed public key to size of uncompressed public key
			var uncompressedPublicKey = new Uint8Array(Secp256k1Zkp.instance._uncompressedPublicKeySize());
			
			// Allocate and fill memory
			var uncompressedPublicKeyBuffer = Secp256k1Zkp.instance._malloc(uncompressedPublicKey["length"] * uncompressedPublicKey["BYTES_PER_ELEMENT"]);
			
			var publicKeyBuffer = Secp256k1Zkp.instance._malloc(publicKey["length"] * publicKey["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(publicKey, publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"]);
			
			// Check if uncompressing the public key failed
			if(Secp256k1Zkp.instance._uncompressPublicKey(uncompressedPublicKeyBuffer, publicKeyBuffer, publicKey["length"] * publicKey["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
			
				// Clear memory
				Secp256k1Zkp.instance["HEAPU8"].fill(0, uncompressedPublicKeyBuffer / uncompressedPublicKey["BYTES_PER_ELEMENT"], uncompressedPublicKeyBuffer / uncompressedPublicKey["BYTES_PER_ELEMENT"] + uncompressedPublicKey["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"], publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"] + publicKey["length"]);
				
				// Free memory
				Secp256k1Zkp.instance._free(uncompressedPublicKeyBuffer);
				Secp256k1Zkp.instance._free(publicKeyBuffer);
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			}
			
			// Get uncompressed public key
			uncompressedPublicKey = new Uint8Array(Secp256k1Zkp.instance["HEAPU8"].subarray(uncompressedPublicKeyBuffer, uncompressedPublicKeyBuffer + uncompressedPublicKey["length"]));
			
			// Clear memory
			Secp256k1Zkp.instance["HEAPU8"].fill(0, uncompressedPublicKeyBuffer / uncompressedPublicKey["BYTES_PER_ELEMENT"], uncompressedPublicKeyBuffer / uncompressedPublicKey["BYTES_PER_ELEMENT"] + uncompressedPublicKey["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"], publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"] + publicKey["length"]);
			
			// Free memory
			Secp256k1Zkp.instance._free(uncompressedPublicKeyBuffer);
			Secp256k1Zkp.instance._free(publicKeyBuffer);
			
			// Return uncompressed public key
			return uncompressedPublicKey;
		}
		
		// Secret key tweak add
		static secretKeyTweakAdd(secretKey, tweak) {
		
			// Check if instance doesn't exist
			if(typeof Secp256k1Zkp.instance === "undefined") {
			
				// Set instance
				Secp256k1Zkp.instance = secp256k1Zkp();
				
				// Initialize seed to size of seed
				var seed = new Uint8Array(Secp256k1Zkp.instance._seedSize());
				
				// Fill seed with random values
				crypto.getRandomValues(seed);
				
				// Allocate and fill memory
				var seedBuffer = Secp256k1Zkp.instance._malloc(seed["length"] * seed["BYTES_PER_ELEMENT"]);
				Secp256k1Zkp.instance["HEAPU8"].set(seed, seedBuffer / seed["BYTES_PER_ELEMENT"]);
				
				// Check if initializing failed
				if(Secp256k1Zkp.instance._initialize(seedBuffer, seed["length"] * seed["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
					
					// Set instance to invalid
					Secp256k1Zkp.instance = Secp256k1Zkp.INVALID;
				}
				
				// Otherwise
				else {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
				}
			}
		
			// Check if instance is invalid
			if(Secp256k1Zkp.instance === Secp256k1Zkp.INVALID)
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			
			// Initialize result to size of secret key
			var result = new Uint8Array(Secp256k1Zkp.instance._secretKeySize());
			
			// Allocate and fill memory
			var resultBuffer = Secp256k1Zkp.instance._malloc(result["length"] * result["BYTES_PER_ELEMENT"]);
			
			var secretKeyBuffer = Secp256k1Zkp.instance._malloc(secretKey["length"] * secretKey["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(secretKey, secretKeyBuffer / secretKey["BYTES_PER_ELEMENT"]);
			
			var tweakBuffer = Secp256k1Zkp.instance._malloc(tweak["length"] * tweak["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(tweak, tweakBuffer / tweak["BYTES_PER_ELEMENT"]);
			
			// Check if performing secret key tweak add failed
			if(Secp256k1Zkp.instance._secretKeyTweakAdd(resultBuffer, secretKeyBuffer, secretKey["length"] * secretKey["BYTES_PER_ELEMENT"], tweakBuffer, tweak["length"] * tweak["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
			
				// Clear memory
				Secp256k1Zkp.instance["HEAPU8"].fill(0, resultBuffer / result["BYTES_PER_ELEMENT"], resultBuffer / result["BYTES_PER_ELEMENT"] + result["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, secretKeyBuffer / secretKey["BYTES_PER_ELEMENT"], secretKeyBuffer / secretKey["BYTES_PER_ELEMENT"] + secretKey["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, tweakBuffer / tweak["BYTES_PER_ELEMENT"], tweakBuffer / tweak["BYTES_PER_ELEMENT"] + tweak["length"]);
				
				// Free memory
				Secp256k1Zkp.instance._free(resultBuffer);
				Secp256k1Zkp.instance._free(secretKeyBuffer);
				Secp256k1Zkp.instance._free(tweakBuffer);
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			}
			
			// Get result
			result = new Uint8Array(Secp256k1Zkp.instance["HEAPU8"].subarray(resultBuffer, resultBuffer + result["length"]));
			
			// Clear memory
			Secp256k1Zkp.instance["HEAPU8"].fill(0, resultBuffer / result["BYTES_PER_ELEMENT"], resultBuffer / result["BYTES_PER_ELEMENT"] + result["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, secretKeyBuffer / secretKey["BYTES_PER_ELEMENT"], secretKeyBuffer / secretKey["BYTES_PER_ELEMENT"] + secretKey["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, tweakBuffer / tweak["BYTES_PER_ELEMENT"], tweakBuffer / tweak["BYTES_PER_ELEMENT"] + tweak["length"]);
			
			// Free memory
			Secp256k1Zkp.instance._free(resultBuffer);
			Secp256k1Zkp.instance._free(secretKeyBuffer);
			Secp256k1Zkp.instance._free(tweakBuffer);
			
			// Return result
			return result;
		}
		
		// Public key tweak add
		static publicKeyTweakAdd(publicKey, tweak) {
		
			// Check if instance doesn't exist
			if(typeof Secp256k1Zkp.instance === "undefined") {
			
				// Set instance
				Secp256k1Zkp.instance = secp256k1Zkp();
				
				// Initialize seed to size of seed
				var seed = new Uint8Array(Secp256k1Zkp.instance._seedSize());
				
				// Fill seed with random values
				crypto.getRandomValues(seed);
				
				// Allocate and fill memory
				var seedBuffer = Secp256k1Zkp.instance._malloc(seed["length"] * seed["BYTES_PER_ELEMENT"]);
				Secp256k1Zkp.instance["HEAPU8"].set(seed, seedBuffer / seed["BYTES_PER_ELEMENT"]);
				
				// Check if initializing failed
				if(Secp256k1Zkp.instance._initialize(seedBuffer, seed["length"] * seed["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
					
					// Set instance to invalid
					Secp256k1Zkp.instance = Secp256k1Zkp.INVALID;
				}
				
				// Otherwise
				else {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
				}
			}
		
			// Check if instance is invalid
			if(Secp256k1Zkp.instance === Secp256k1Zkp.INVALID)
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			
			// Initialize result to size of public key
			var result = new Uint8Array(Secp256k1Zkp.instance._publicKeySize());
			
			// Allocate and fill memory
			var resultBuffer = Secp256k1Zkp.instance._malloc(result["length"] * result["BYTES_PER_ELEMENT"]);
			
			var publicKeyBuffer = Secp256k1Zkp.instance._malloc(publicKey["length"] * publicKey["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(publicKey, publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"]);
			
			var tweakBuffer = Secp256k1Zkp.instance._malloc(tweak["length"] * tweak["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(tweak, tweakBuffer / tweak["BYTES_PER_ELEMENT"]);
			
			// Check if performing public key tweak add failed
			if(Secp256k1Zkp.instance._publicKeyTweakAdd(resultBuffer, publicKeyBuffer, publicKey["length"] * publicKey["BYTES_PER_ELEMENT"], tweakBuffer, tweak["length"] * tweak["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
			
				// Clear memory
				Secp256k1Zkp.instance["HEAPU8"].fill(0, resultBuffer / result["BYTES_PER_ELEMENT"], resultBuffer / result["BYTES_PER_ELEMENT"] + result["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"], publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"] + publicKey["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, tweakBuffer / tweak["BYTES_PER_ELEMENT"], tweakBuffer / tweak["BYTES_PER_ELEMENT"] + tweak["length"]);
				
				// Free memory
				Secp256k1Zkp.instance._free(resultBuffer);
				Secp256k1Zkp.instance._free(publicKeyBuffer);
				Secp256k1Zkp.instance._free(tweakBuffer);
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			}
			
			// Get result
			result = new Uint8Array(Secp256k1Zkp.instance["HEAPU8"].subarray(resultBuffer, resultBuffer + result["length"]));
			
			// Clear memory
			Secp256k1Zkp.instance["HEAPU8"].fill(0, resultBuffer / result["BYTES_PER_ELEMENT"], resultBuffer / result["BYTES_PER_ELEMENT"] + result["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"], publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"] + publicKey["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, tweakBuffer / tweak["BYTES_PER_ELEMENT"], tweakBuffer / tweak["BYTES_PER_ELEMENT"] + tweak["length"]);
			
			// Free memory
			Secp256k1Zkp.instance._free(resultBuffer);
			Secp256k1Zkp.instance._free(publicKeyBuffer);
			Secp256k1Zkp.instance._free(tweakBuffer);
			
			// Return result
			return result;
		}
		
		// Secret key tweak multiply
		static secretKeyTweakMultiply(secretKey, tweak) {
		
			// Check if instance doesn't exist
			if(typeof Secp256k1Zkp.instance === "undefined") {
			
				// Set instance
				Secp256k1Zkp.instance = secp256k1Zkp();
				
				// Initialize seed to size of seed
				var seed = new Uint8Array(Secp256k1Zkp.instance._seedSize());
				
				// Fill seed with random values
				crypto.getRandomValues(seed);
				
				// Allocate and fill memory
				var seedBuffer = Secp256k1Zkp.instance._malloc(seed["length"] * seed["BYTES_PER_ELEMENT"]);
				Secp256k1Zkp.instance["HEAPU8"].set(seed, seedBuffer / seed["BYTES_PER_ELEMENT"]);
				
				// Check if initializing failed
				if(Secp256k1Zkp.instance._initialize(seedBuffer, seed["length"] * seed["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
					
					// Set instance to invalid
					Secp256k1Zkp.instance = Secp256k1Zkp.INVALID;
				}
				
				// Otherwise
				else {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
				}
			}
		
			// Check if instance is invalid
			if(Secp256k1Zkp.instance === Secp256k1Zkp.INVALID)
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			
			// Initialize result to size of secret key
			var result = new Uint8Array(Secp256k1Zkp.instance._secretKeySize());
			
			// Allocate and fill memory
			var resultBuffer = Secp256k1Zkp.instance._malloc(result["length"] * result["BYTES_PER_ELEMENT"]);
			
			var secretKeyBuffer = Secp256k1Zkp.instance._malloc(secretKey["length"] * secretKey["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(secretKey, secretKeyBuffer / secretKey["BYTES_PER_ELEMENT"]);
			
			var tweakBuffer = Secp256k1Zkp.instance._malloc(tweak["length"] * tweak["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(tweak, tweakBuffer / tweak["BYTES_PER_ELEMENT"]);
			
			// Check if performing secret key tweak multiply failed
			if(Secp256k1Zkp.instance._secretKeyTweakMultiply(resultBuffer, secretKeyBuffer, secretKey["length"] * secretKey["BYTES_PER_ELEMENT"], tweakBuffer, tweak["length"] * tweak["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
			
				// Clear memory
				Secp256k1Zkp.instance["HEAPU8"].fill(0, resultBuffer / result["BYTES_PER_ELEMENT"], resultBuffer / result["BYTES_PER_ELEMENT"] + result["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, secretKeyBuffer / secretKey["BYTES_PER_ELEMENT"], secretKeyBuffer / secretKey["BYTES_PER_ELEMENT"] + secretKey["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, tweakBuffer / tweak["BYTES_PER_ELEMENT"], tweakBuffer / tweak["BYTES_PER_ELEMENT"] + tweak["length"]);
				
				// Free memory
				Secp256k1Zkp.instance._free(resultBuffer);
				Secp256k1Zkp.instance._free(secretKeyBuffer);
				Secp256k1Zkp.instance._free(tweakBuffer);
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			}
			
			// Get result
			result = new Uint8Array(Secp256k1Zkp.instance["HEAPU8"].subarray(resultBuffer, resultBuffer + result["length"]));
			
			// Clear memory
			Secp256k1Zkp.instance["HEAPU8"].fill(0, resultBuffer / result["BYTES_PER_ELEMENT"], resultBuffer / result["BYTES_PER_ELEMENT"] + result["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, secretKeyBuffer / secretKey["BYTES_PER_ELEMENT"], secretKeyBuffer / secretKey["BYTES_PER_ELEMENT"] + secretKey["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, tweakBuffer / tweak["BYTES_PER_ELEMENT"], tweakBuffer / tweak["BYTES_PER_ELEMENT"] + tweak["length"]);
			
			// Free memory
			Secp256k1Zkp.instance._free(resultBuffer);
			Secp256k1Zkp.instance._free(secretKeyBuffer);
			Secp256k1Zkp.instance._free(tweakBuffer);
			
			// Return result
			return result;
		}
		
		// Public key tweak multiply
		static publicKeyTweakMultiply(publicKey, tweak) {
		
			// Check if instance doesn't exist
			if(typeof Secp256k1Zkp.instance === "undefined") {
			
				// Set instance
				Secp256k1Zkp.instance = secp256k1Zkp();
				
				// Initialize seed to size of seed
				var seed = new Uint8Array(Secp256k1Zkp.instance._seedSize());
				
				// Fill seed with random values
				crypto.getRandomValues(seed);
				
				// Allocate and fill memory
				var seedBuffer = Secp256k1Zkp.instance._malloc(seed["length"] * seed["BYTES_PER_ELEMENT"]);
				Secp256k1Zkp.instance["HEAPU8"].set(seed, seedBuffer / seed["BYTES_PER_ELEMENT"]);
				
				// Check if initializing failed
				if(Secp256k1Zkp.instance._initialize(seedBuffer, seed["length"] * seed["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
					
					// Set instance to invalid
					Secp256k1Zkp.instance = Secp256k1Zkp.INVALID;
				}
				
				// Otherwise
				else {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
				}
			}
		
			// Check if instance is invalid
			if(Secp256k1Zkp.instance === Secp256k1Zkp.INVALID)
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			
			// Initialize result to size of public key
			var result = new Uint8Array(Secp256k1Zkp.instance._publicKeySize());
			
			// Allocate and fill memory
			var resultBuffer = Secp256k1Zkp.instance._malloc(result["length"] * result["BYTES_PER_ELEMENT"]);
			
			var publicKeyBuffer = Secp256k1Zkp.instance._malloc(publicKey["length"] * publicKey["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(publicKey, publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"]);
			
			var tweakBuffer = Secp256k1Zkp.instance._malloc(tweak["length"] * tweak["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(tweak, tweakBuffer / tweak["BYTES_PER_ELEMENT"]);
			
			// Check if performing public key tweak multiply failed
			if(Secp256k1Zkp.instance._publicKeyTweakMultiply(resultBuffer, publicKeyBuffer, publicKey["length"] * publicKey["BYTES_PER_ELEMENT"], tweakBuffer, tweak["length"] * tweak["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
			
				// Clear memory
				Secp256k1Zkp.instance["HEAPU8"].fill(0, resultBuffer / result["BYTES_PER_ELEMENT"], resultBuffer / result["BYTES_PER_ELEMENT"] + result["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"], publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"] + publicKey["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, tweakBuffer / tweak["BYTES_PER_ELEMENT"], tweakBuffer / tweak["BYTES_PER_ELEMENT"] + tweak["length"]);
				
				// Free memory
				Secp256k1Zkp.instance._free(resultBuffer);
				Secp256k1Zkp.instance._free(publicKeyBuffer);
				Secp256k1Zkp.instance._free(tweakBuffer);
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			}
			
			// Get result
			result = new Uint8Array(Secp256k1Zkp.instance["HEAPU8"].subarray(resultBuffer, resultBuffer + result["length"]));
			
			// Clear memory
			Secp256k1Zkp.instance["HEAPU8"].fill(0, resultBuffer / result["BYTES_PER_ELEMENT"], resultBuffer / result["BYTES_PER_ELEMENT"] + result["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"], publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"] + publicKey["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, tweakBuffer / tweak["BYTES_PER_ELEMENT"], tweakBuffer / tweak["BYTES_PER_ELEMENT"] + tweak["length"]);
			
			// Free memory
			Secp256k1Zkp.instance._free(resultBuffer);
			Secp256k1Zkp.instance._free(publicKeyBuffer);
			Secp256k1Zkp.instance._free(tweakBuffer);
			
			// Return result
			return result;
		}
		
		// Shared secret key from secret key and public key
		static sharedSecretKeyFromSecretKeyAndPublicKey(secretKey, publicKey) {
		
			// Check if instance doesn't exist
			if(typeof Secp256k1Zkp.instance === "undefined") {
			
				// Set instance
				Secp256k1Zkp.instance = secp256k1Zkp();
				
				// Initialize seed to size of seed
				var seed = new Uint8Array(Secp256k1Zkp.instance._seedSize());
				
				// Fill seed with random values
				crypto.getRandomValues(seed);
				
				// Allocate and fill memory
				var seedBuffer = Secp256k1Zkp.instance._malloc(seed["length"] * seed["BYTES_PER_ELEMENT"]);
				Secp256k1Zkp.instance["HEAPU8"].set(seed, seedBuffer / seed["BYTES_PER_ELEMENT"]);
				
				// Check if initializing failed
				if(Secp256k1Zkp.instance._initialize(seedBuffer, seed["length"] * seed["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
					
					// Set instance to invalid
					Secp256k1Zkp.instance = Secp256k1Zkp.INVALID;
				}
				
				// Otherwise
				else {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
				}
			}
		
			// Check if instance is invalid
			if(Secp256k1Zkp.instance === Secp256k1Zkp.INVALID)
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			
			// Initialize shared secret key to size of secret key
			var sharedSecretKey = new Uint8Array(Secp256k1Zkp.instance._secretKeySize());
			
			// Allocate and fill memory
			var sharedSecretKeyBuffer = Secp256k1Zkp.instance._malloc(sharedSecretKey["length"] * sharedSecretKey["BYTES_PER_ELEMENT"]);
			
			var secretKeyBuffer = Secp256k1Zkp.instance._malloc(secretKey["length"] * secretKey["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(secretKey, secretKeyBuffer / secretKey["BYTES_PER_ELEMENT"]);
			
			var publicKeyBuffer = Secp256k1Zkp.instance._malloc(publicKey["length"] * publicKey["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(publicKey, publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"]);
			
			// Check if getting shared secret key from secret key and public key failed
			if(Secp256k1Zkp.instance._sharedSecretKeyFromSecretKeyAndPublicKey(sharedSecretKeyBuffer, secretKeyBuffer, secretKey["length"] * secretKey["BYTES_PER_ELEMENT"], publicKeyBuffer, publicKey["length"] * publicKey["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
			
				// Clear memory
				Secp256k1Zkp.instance["HEAPU8"].fill(0, sharedSecretKeyBuffer / sharedSecretKey["BYTES_PER_ELEMENT"], sharedSecretKeyBuffer / sharedSecretKey["BYTES_PER_ELEMENT"] + sharedSecretKey["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, secretKeyBuffer / secretKey["BYTES_PER_ELEMENT"], secretKeyBuffer / secretKey["BYTES_PER_ELEMENT"] + secretKey["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"], publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"] + publicKey["length"]);
			
				// Free memory
				Secp256k1Zkp.instance._free(sharedSecretKeyBuffer);
				Secp256k1Zkp.instance._free(secretKeyBuffer);
				Secp256k1Zkp.instance._free(publicKeyBuffer);
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			}
			
			// Get shared secret key
			sharedSecretKey = new Uint8Array(Secp256k1Zkp.instance["HEAPU8"].subarray(sharedSecretKeyBuffer, sharedSecretKeyBuffer + sharedSecretKey["length"]));
			
			// Clear memory
			Secp256k1Zkp.instance["HEAPU8"].fill(0, sharedSecretKeyBuffer / sharedSecretKey["BYTES_PER_ELEMENT"], sharedSecretKeyBuffer / sharedSecretKey["BYTES_PER_ELEMENT"] + sharedSecretKey["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, secretKeyBuffer / secretKey["BYTES_PER_ELEMENT"], secretKeyBuffer / secretKey["BYTES_PER_ELEMENT"] + secretKey["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"], publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"] + publicKey["length"]);
			
			// Free memory
			Secp256k1Zkp.instance._free(sharedSecretKeyBuffer);
			Secp256k1Zkp.instance._free(secretKeyBuffer);
			Secp256k1Zkp.instance._free(publicKeyBuffer);
			
			// Return shared secret key
			return sharedSecretKey;
		}
		
		// Pedersen commit
		static pedersenCommit(blind, value) {
		
			// Check if instance doesn't exist
			if(typeof Secp256k1Zkp.instance === "undefined") {
			
				// Set instance
				Secp256k1Zkp.instance = secp256k1Zkp();
				
				// Initialize seed to size of seed
				var seed = new Uint8Array(Secp256k1Zkp.instance._seedSize());
				
				// Fill seed with random values
				crypto.getRandomValues(seed);
				
				// Allocate and fill memory
				var seedBuffer = Secp256k1Zkp.instance._malloc(seed["length"] * seed["BYTES_PER_ELEMENT"]);
				Secp256k1Zkp.instance["HEAPU8"].set(seed, seedBuffer / seed["BYTES_PER_ELEMENT"]);
				
				// Check if initializing failed
				if(Secp256k1Zkp.instance._initialize(seedBuffer, seed["length"] * seed["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
					
					// Set instance to invalid
					Secp256k1Zkp.instance = Secp256k1Zkp.INVALID;
				}
				
				// Otherwise
				else {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
				}
			}
		
			// Check if instance is invalid
			if(Secp256k1Zkp.instance === Secp256k1Zkp.INVALID)
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			
			// Initialize result to size of commit
			var result = new Uint8Array(Secp256k1Zkp.instance._commitSize());
			
			// Allocate and fill memory
			var resultBuffer = Secp256k1Zkp.instance._malloc(result["length"] * result["BYTES_PER_ELEMENT"]);
			
			var blindBuffer = Secp256k1Zkp.instance._malloc(blind["length"] * blind["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(blind, blindBuffer / blind["BYTES_PER_ELEMENT"]);
			
			var cStringValue = Secp256k1Zkp.stringToCString(value);
			var valueBuffer = Secp256k1Zkp.instance._malloc(cStringValue["length"] * cStringValue["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(cStringValue, valueBuffer / cStringValue["BYTES_PER_ELEMENT"]);
			cStringValue.fill(0);
			
			// Check if performing Pedersen commit failed
			if(Secp256k1Zkp.instance._pedersenCommit(resultBuffer, blindBuffer, blind["length"] * blind["BYTES_PER_ELEMENT"], valueBuffer) === Secp256k1Zkp.C_FALSE) {
			
				// Clear memory
				Secp256k1Zkp.instance["HEAPU8"].fill(0, resultBuffer / result["BYTES_PER_ELEMENT"], resultBuffer / result["BYTES_PER_ELEMENT"] + result["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, blindBuffer / blind["BYTES_PER_ELEMENT"], blindBuffer / blind["BYTES_PER_ELEMENT"] + blind["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, valueBuffer / cStringValue["BYTES_PER_ELEMENT"], valueBuffer / cStringValue["BYTES_PER_ELEMENT"] + cStringValue["length"]);
				
				// Free memory
				Secp256k1Zkp.instance._free(resultBuffer);
				Secp256k1Zkp.instance._free(blindBuffer);
				Secp256k1Zkp.instance._free(valueBuffer);
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			}
			
			// Get result
			result = new Uint8Array(Secp256k1Zkp.instance["HEAPU8"].subarray(resultBuffer, resultBuffer + result["length"]));
			
			// Clear memory
			Secp256k1Zkp.instance["HEAPU8"].fill(0, resultBuffer / result["BYTES_PER_ELEMENT"], resultBuffer / result["BYTES_PER_ELEMENT"] + result["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, blindBuffer / blind["BYTES_PER_ELEMENT"], blindBuffer / blind["BYTES_PER_ELEMENT"] + blind["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, valueBuffer / cStringValue["BYTES_PER_ELEMENT"], valueBuffer / cStringValue["BYTES_PER_ELEMENT"] + cStringValue["length"]);
			
			// Free memory
			Secp256k1Zkp.instance._free(resultBuffer);
			Secp256k1Zkp.instance._free(blindBuffer);
			Secp256k1Zkp.instance._free(valueBuffer);
			
			// Return result
			return result;
		}
		
		// Pedersen commit sum
		static pedersenCommitSum(positiveCommits, negativeCommits) {
		
			// Check if instance doesn't exist
			if(typeof Secp256k1Zkp.instance === "undefined") {
			
				// Set instance
				Secp256k1Zkp.instance = secp256k1Zkp();
				
				// Initialize seed to size of seed
				var seed = new Uint8Array(Secp256k1Zkp.instance._seedSize());
				
				// Fill seed with random values
				crypto.getRandomValues(seed);
				
				// Allocate and fill memory
				var seedBuffer = Secp256k1Zkp.instance._malloc(seed["length"] * seed["BYTES_PER_ELEMENT"]);
				Secp256k1Zkp.instance["HEAPU8"].set(seed, seedBuffer / seed["BYTES_PER_ELEMENT"]);
				
				// Check if initializing failed
				if(Secp256k1Zkp.instance._initialize(seedBuffer, seed["length"] * seed["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
					
					// Set instance to invalid
					Secp256k1Zkp.instance = Secp256k1Zkp.INVALID;
				}
				
				// Otherwise
				else {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
				}
			}
		
			// Check if instance is invalid
			if(Secp256k1Zkp.instance === Secp256k1Zkp.INVALID)
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			
			// Initialize result to size of commit
			var result = new Uint8Array(Secp256k1Zkp.instance._commitSize());
			
			// Allocate and fill memory
			var resultBuffer = Secp256k1Zkp.instance._malloc(result["length"] * result["BYTES_PER_ELEMENT"]);
			
			var positiveCommitsLength = positiveCommits.reduce(function(positiveCommitsLength, positiveCommit) {
			
				// Return length of positive commit added to total
				return positiveCommitsLength + positiveCommit["length"];
				
			}, 0);
			
			var positiveCommitsBuffer = Secp256k1Zkp.instance._malloc(positiveCommitsLength * Uint8Array["BYTES_PER_ELEMENT"]);
			
			// Go through all positive commits
			var positiveCommitsOffset = 0;
			for(var i = 0; i < positiveCommits["length"]; ++i) {
			
				// Set positive commit in memory at offset
				Secp256k1Zkp.instance["HEAPU8"].set(positiveCommits[i], positiveCommitsBuffer / Uint8Array["BYTES_PER_ELEMENT"] + positiveCommitsOffset);
				
				// Update offset
				positiveCommitsOffset += positiveCommits[i]["length"];
			}
			
			var positiveCommitsSizesBuffer = Secp256k1Zkp.instance._malloc(positiveCommits["length"] * Uint32Array["BYTES_PER_ELEMENT"]);
			
			for(var i = 0; i < positiveCommits["length"]; ++i)
				Secp256k1Zkp.instance["HEAPU32"].set(new Uint32Array([positiveCommits[i]["length"]]), positiveCommitsSizesBuffer / Uint32Array["BYTES_PER_ELEMENT"] + i);
			
			var negativeCommitsLength = negativeCommits.reduce(function(negativeCommitsLength, negativeCommit) {
			
				// Return length of negative commit added to total
				return negativeCommitsLength + negativeCommit["length"];
				
			}, 0);
			
			var negativeCommitsBuffer = Secp256k1Zkp.instance._malloc(negativeCommitsLength * Uint8Array["BYTES_PER_ELEMENT"]);
			
			// Go through all negative commits
			var negativeCommitsOffset = 0;
			for(var i = 0; i < negativeCommits["length"]; ++i) {
			
				// Set negative commit in memory at offset
				Secp256k1Zkp.instance["HEAPU8"].set(negativeCommits[i], negativeCommitsBuffer / Uint8Array["BYTES_PER_ELEMENT"] + negativeCommitsOffset);
				
				// Update offset
				negativeCommitsOffset += negativeCommits[i]["length"];
			}
			
			var negativeCommitsSizesBuffer = Secp256k1Zkp.instance._malloc(negativeCommits["length"] * Uint32Array["BYTES_PER_ELEMENT"]);
			
			for(var i = 0; i < negativeCommits["length"]; ++i)
				Secp256k1Zkp.instance["HEAPU32"].set(new Uint32Array([negativeCommits[i]["length"]]), negativeCommitsSizesBuffer / Uint32Array["BYTES_PER_ELEMENT"] + i);
			
			// Check if performing Pedersen commit sum failed
			if(Secp256k1Zkp.instance._pedersenCommitSum(resultBuffer, positiveCommitsBuffer, positiveCommitsSizesBuffer, positiveCommits["length"], negativeCommitsBuffer, negativeCommitsSizesBuffer, negativeCommits["length"]) === Secp256k1Zkp.C_FALSE) {
			
				// Clear memory
				Secp256k1Zkp.instance["HEAPU8"].fill(0, resultBuffer / result["BYTES_PER_ELEMENT"], resultBuffer / result["BYTES_PER_ELEMENT"] + result["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, positiveCommitsBuffer / Uint8Array["BYTES_PER_ELEMENT"], positiveCommitsBuffer / Uint8Array["BYTES_PER_ELEMENT"] + positiveCommitsLength);
				Secp256k1Zkp.instance["HEAPU32"].fill(0, positiveCommitsSizesBuffer / Uint32Array["BYTES_PER_ELEMENT"], positiveCommitsSizesBuffer / Uint32Array["BYTES_PER_ELEMENT"] + positiveCommits["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, negativeCommitsBuffer / Uint8Array["BYTES_PER_ELEMENT"], negativeCommitsBuffer / Uint8Array["BYTES_PER_ELEMENT"] + negativeCommitsLength);
				Secp256k1Zkp.instance["HEAPU32"].fill(0, negativeCommitsSizesBuffer / Uint32Array["BYTES_PER_ELEMENT"], negativeCommitsSizesBuffer / Uint32Array["BYTES_PER_ELEMENT"] + negativeCommits["length"]);
				
				// Free memory
				Secp256k1Zkp.instance._free(resultBuffer);
				Secp256k1Zkp.instance._free(positiveCommitsBuffer);
				Secp256k1Zkp.instance._free(positiveCommitsSizesBuffer);
				Secp256k1Zkp.instance._free(negativeCommitsBuffer);
				Secp256k1Zkp.instance._free(negativeCommitsSizesBuffer);
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			}
			
			// Get result
			result = new Uint8Array(Secp256k1Zkp.instance["HEAPU8"].subarray(resultBuffer, resultBuffer + result["length"]));
			
			// Clear memory
			Secp256k1Zkp.instance["HEAPU8"].fill(0, resultBuffer / result["BYTES_PER_ELEMENT"], resultBuffer / result["BYTES_PER_ELEMENT"] + result["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, positiveCommitsBuffer / Uint8Array["BYTES_PER_ELEMENT"], positiveCommitsBuffer / Uint8Array["BYTES_PER_ELEMENT"] + positiveCommitsLength);
			Secp256k1Zkp.instance["HEAPU32"].fill(0, positiveCommitsSizesBuffer / Uint32Array["BYTES_PER_ELEMENT"], positiveCommitsSizesBuffer / Uint32Array["BYTES_PER_ELEMENT"] + positiveCommits["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, negativeCommitsBuffer / Uint8Array["BYTES_PER_ELEMENT"], negativeCommitsBuffer / Uint8Array["BYTES_PER_ELEMENT"] + negativeCommitsLength);
			Secp256k1Zkp.instance["HEAPU32"].fill(0, negativeCommitsSizesBuffer / Uint32Array["BYTES_PER_ELEMENT"], negativeCommitsSizesBuffer / Uint32Array["BYTES_PER_ELEMENT"] + negativeCommits["length"]);
			
			// Free memory
			Secp256k1Zkp.instance._free(resultBuffer);
			Secp256k1Zkp.instance._free(positiveCommitsBuffer);
			Secp256k1Zkp.instance._free(positiveCommitsSizesBuffer);
			Secp256k1Zkp.instance._free(negativeCommitsBuffer);
			Secp256k1Zkp.instance._free(negativeCommitsSizesBuffer);
			
			// Return result
			return result;
		}
		
		// Pedersen commit to public key
		static pedersenCommitToPublicKey(commit) {
		
			// Check if instance doesn't exist
			if(typeof Secp256k1Zkp.instance === "undefined") {
			
				// Set instance
				Secp256k1Zkp.instance = secp256k1Zkp();
				
				// Initialize seed to size of seed
				var seed = new Uint8Array(Secp256k1Zkp.instance._seedSize());
				
				// Fill seed with random values
				crypto.getRandomValues(seed);
				
				// Allocate and fill memory
				var seedBuffer = Secp256k1Zkp.instance._malloc(seed["length"] * seed["BYTES_PER_ELEMENT"]);
				Secp256k1Zkp.instance["HEAPU8"].set(seed, seedBuffer / seed["BYTES_PER_ELEMENT"]);
				
				// Check if initializing failed
				if(Secp256k1Zkp.instance._initialize(seedBuffer, seed["length"] * seed["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
					
					// Set instance to invalid
					Secp256k1Zkp.instance = Secp256k1Zkp.INVALID;
				}
				
				// Otherwise
				else {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
				}
			}
		
			// Check if instance is invalid
			if(Secp256k1Zkp.instance === Secp256k1Zkp.INVALID)
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			
			// Initialize public key to size of public key
			var publicKey = new Uint8Array(Secp256k1Zkp.instance._publicKeySize());
			
			// Allocate and fill memory
			var publicKeyBuffer = Secp256k1Zkp.instance._malloc(publicKey["length"] * publicKey["BYTES_PER_ELEMENT"]);
			
			var commitBuffer = Secp256k1Zkp.instance._malloc(commit["length"] * commit["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(commit, commitBuffer / commit["BYTES_PER_ELEMENT"]);
			
			// Check if getting public key from Pedersen commit failed
			if(Secp256k1Zkp.instance._pedersenCommitToPublicKey(publicKeyBuffer, commitBuffer, commit["length"] * commit["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
			
				// Clear memory
				Secp256k1Zkp.instance["HEAPU8"].fill(0, publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"], publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"] + publicKey["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, commitBuffer / commit["BYTES_PER_ELEMENT"], commitBuffer / commit["BYTES_PER_ELEMENT"] + commit["length"]);
				
				// Free memory
				Secp256k1Zkp.instance._free(publicKeyBuffer);
				Secp256k1Zkp.instance._free(commitBuffer);
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			}
			
			// Get public key
			publicKey = new Uint8Array(Secp256k1Zkp.instance["HEAPU8"].subarray(publicKeyBuffer, publicKeyBuffer + publicKey["length"]));
			
			// Clear memory
			Secp256k1Zkp.instance["HEAPU8"].fill(0, publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"], publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"] + publicKey["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, commitBuffer / commit["BYTES_PER_ELEMENT"], commitBuffer / commit["BYTES_PER_ELEMENT"] + commit["length"]);
			
			// Free memory
			Secp256k1Zkp.instance._free(publicKeyBuffer);
			Secp256k1Zkp.instance._free(commitBuffer);
			
			// Return public key
			return publicKey;
		}
		
		// Public key to Pedersen commit
		static publicKeyToPedersenCommit(publicKey) {
		
			// Check if instance doesn't exist
			if(typeof Secp256k1Zkp.instance === "undefined") {
			
				// Set instance
				Secp256k1Zkp.instance = secp256k1Zkp();
				
				// Initialize seed to size of seed
				var seed = new Uint8Array(Secp256k1Zkp.instance._seedSize());
				
				// Fill seed with random values
				crypto.getRandomValues(seed);
				
				// Allocate and fill memory
				var seedBuffer = Secp256k1Zkp.instance._malloc(seed["length"] * seed["BYTES_PER_ELEMENT"]);
				Secp256k1Zkp.instance["HEAPU8"].set(seed, seedBuffer / seed["BYTES_PER_ELEMENT"]);
				
				// Check if initializing failed
				if(Secp256k1Zkp.instance._initialize(seedBuffer, seed["length"] * seed["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
					
					// Set instance to invalid
					Secp256k1Zkp.instance = Secp256k1Zkp.INVALID;
				}
				
				// Otherwise
				else {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
				}
			}
		
			// Check if instance is invalid
			if(Secp256k1Zkp.instance === Secp256k1Zkp.INVALID)
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			
			// Initialize commit to size of commit
			var commit = new Uint8Array(Secp256k1Zkp.instance._commitSize());
			
			// Allocate and fill memory
			var commitBuffer = Secp256k1Zkp.instance._malloc(commit["length"] * commit["BYTES_PER_ELEMENT"]);
			
			var publicKeyBuffer = Secp256k1Zkp.instance._malloc(publicKey["length"] * publicKey["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(publicKey, publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"]);
			
			// Check if getting Pedersen commit from public key failed
			if(Secp256k1Zkp.instance._publicKeyToPedersenCommit(commitBuffer, publicKeyBuffer, publicKey["length"] * publicKey["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
			
				// Clear memory
				Secp256k1Zkp.instance["HEAPU8"].fill(0, commitBuffer / commit["BYTES_PER_ELEMENT"], commitBuffer / commit["BYTES_PER_ELEMENT"] + commit["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"], publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"] + publicKey["length"]);
				
				// Free memory
				Secp256k1Zkp.instance._free(commitBuffer);
				Secp256k1Zkp.instance._free(publicKeyBuffer);
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			}
			
			// Get commit
			commit = new Uint8Array(Secp256k1Zkp.instance["HEAPU8"].subarray(commitBuffer, commitBuffer + commit["length"]));
			
			// Clear memory
			Secp256k1Zkp.instance["HEAPU8"].fill(0, commitBuffer / commit["BYTES_PER_ELEMENT"], commitBuffer / commit["BYTES_PER_ELEMENT"] + commit["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"], publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"] + publicKey["length"]);
			
			// Free memory
			Secp256k1Zkp.instance._free(commitBuffer);
			Secp256k1Zkp.instance._free(publicKeyBuffer);
			
			// Return commit
			return commit;
		}
		
		// Create single-signer signature
		static createSingleSignerSignature(message, secretKey, secretNonce, publicKey, publicNonce, publicNonceTotal) {
		
			// Check if instance doesn't exist
			if(typeof Secp256k1Zkp.instance === "undefined") {
			
				// Set instance
				Secp256k1Zkp.instance = secp256k1Zkp();
				
				// Initialize seed to size of seed
				var seed = new Uint8Array(Secp256k1Zkp.instance._seedSize());
				
				// Fill seed with random values
				crypto.getRandomValues(seed);
				
				// Allocate and fill memory
				var seedBuffer = Secp256k1Zkp.instance._malloc(seed["length"] * seed["BYTES_PER_ELEMENT"]);
				Secp256k1Zkp.instance["HEAPU8"].set(seed, seedBuffer / seed["BYTES_PER_ELEMENT"]);
				
				// Check if initializing failed
				if(Secp256k1Zkp.instance._initialize(seedBuffer, seed["length"] * seed["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
					
					// Set instance to invalid
					Secp256k1Zkp.instance = Secp256k1Zkp.INVALID;
				}
				
				// Otherwise
				else {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
				}
			}
		
			// Check if instance is invalid
			if(Secp256k1Zkp.instance === Secp256k1Zkp.INVALID)
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			
			// Initialize signature to size of single-signer signature
			var signature = new Uint8Array(Secp256k1Zkp.instance._singleSignerSignatureSize());
			
			// Initialize seed to size of seed
			var seed = new Uint8Array(Secp256k1Zkp.instance._seedSize());
			
			// Fill seed with random values
			crypto.getRandomValues(seed);
			
			// Allocate and fill memory
			var signatureBuffer = Secp256k1Zkp.instance._malloc(signature["length"] * signature["BYTES_PER_ELEMENT"]);
			
			var messageBuffer = Secp256k1Zkp.instance._malloc(message["length"] * message["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(message, messageBuffer / message["BYTES_PER_ELEMENT"]);
			
			var secretKeyBuffer = Secp256k1Zkp.instance._malloc(secretKey["length"] * secretKey["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(secretKey, secretKeyBuffer / secretKey["BYTES_PER_ELEMENT"]);
			
			if(secretNonce !== Secp256k1Zkp.NO_SECRET_NONCE) {
				var secretNonceBuffer = Secp256k1Zkp.instance._malloc(secretNonce["length"] * secretNonce["BYTES_PER_ELEMENT"]);
				Secp256k1Zkp.instance["HEAPU8"].set(secretNonce, secretNonceBuffer / secretNonce["BYTES_PER_ELEMENT"]);
			}
			
			var publicKeyBuffer = Secp256k1Zkp.instance._malloc(publicKey["length"] * publicKey["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(publicKey, publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"]);
			
			if(publicNonce !== Secp256k1Zkp.NO_PUBLIC_NONCE) {
				var publicNonceBuffer = Secp256k1Zkp.instance._malloc(publicNonce["length"] * publicNonce["BYTES_PER_ELEMENT"]);
				Secp256k1Zkp.instance["HEAPU8"].set(publicNonce, publicNonceBuffer / publicNonce["BYTES_PER_ELEMENT"]);
			}
			
			if(publicNonceTotal !== Secp256k1Zkp.NO_PUBLIC_NONCE_TOTAL) {
				var publicNonceTotalBuffer = Secp256k1Zkp.instance._malloc(publicNonceTotal["length"] * publicNonceTotal["BYTES_PER_ELEMENT"]);
				Secp256k1Zkp.instance["HEAPU8"].set(publicNonceTotal, publicNonceTotalBuffer / publicNonceTotal["BYTES_PER_ELEMENT"]);
			}
			
			var seedBuffer = Secp256k1Zkp.instance._malloc(seed["length"] * seed["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(seed, seedBuffer / seed["BYTES_PER_ELEMENT"]);
			
			// Check if creating single-signer signature failed
			if(Secp256k1Zkp.instance._createSingleSignerSignature(signatureBuffer, messageBuffer, message["length"] * message["BYTES_PER_ELEMENT"], secretKeyBuffer, secretKey["length"] * secretKey["BYTES_PER_ELEMENT"], (secretNonce !== Secp256k1Zkp.NO_SECRET_NONCE) ? secretNonceBuffer : Secp256k1Zkp.C_NULL, (secretNonce !== Secp256k1Zkp.NO_SECRET_NONCE) ? secretNonce["length"] * secretNonce["BYTES_PER_ELEMENT"] : 0, publicKeyBuffer, publicKey["length"] * publicKey["BYTES_PER_ELEMENT"], (publicNonce !== Secp256k1Zkp.NO_PUBLIC_NONCE) ? publicNonceBuffer : Secp256k1Zkp.C_NULL, (publicNonce !== Secp256k1Zkp.NO_PUBLIC_NONCE) ? publicNonce["length"] * publicNonce["BYTES_PER_ELEMENT"] : 0, (publicNonceTotal !== Secp256k1Zkp.NO_PUBLIC_NONCE_TOTAL) ? publicNonceTotalBuffer : Secp256k1Zkp.C_NULL, (publicNonceTotal !== Secp256k1Zkp.NO_PUBLIC_NONCE_TOTAL) ? publicNonceTotal["length"] * publicNonceTotal["BYTES_PER_ELEMENT"] : 0, seedBuffer, seed["length"] * seed["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
			
				// Clear memory
				Secp256k1Zkp.instance["HEAPU8"].fill(0, signatureBuffer / signature["BYTES_PER_ELEMENT"], signatureBuffer / signature["BYTES_PER_ELEMENT"] + signature["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, messageBuffer / message["BYTES_PER_ELEMENT"], messageBuffer / message["BYTES_PER_ELEMENT"] + message["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, secretKeyBuffer / secretKey["BYTES_PER_ELEMENT"], secretKeyBuffer / secretKey["BYTES_PER_ELEMENT"] + secretKey["length"]);
				
				if(secretNonce !== Secp256k1Zkp.NO_SECRET_NONCE)
					Secp256k1Zkp.instance["HEAPU8"].fill(0, secretNonceBuffer / secretNonce["BYTES_PER_ELEMENT"], secretNonceBuffer / secretNonce["BYTES_PER_ELEMENT"] + secretNonce["length"]);
				
				Secp256k1Zkp.instance["HEAPU8"].fill(0, publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"], publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"] + publicKey["length"]);
				
				if(publicNonce !== Secp256k1Zkp.NO_PUBLIC_NONCE)
					Secp256k1Zkp.instance["HEAPU8"].fill(0, publicNonceBuffer / publicNonce["BYTES_PER_ELEMENT"], publicNonceBuffer / publicNonce["BYTES_PER_ELEMENT"] + publicNonce["length"]);
				
				if(publicNonceTotal !== Secp256k1Zkp.NO_PUBLIC_NONCE_TOTAL)
					Secp256k1Zkp.instance["HEAPU8"].fill(0, publicNonceTotalBuffer / publicNonceTotal["BYTES_PER_ELEMENT"], publicNonceTotalBuffer / publicNonceTotal["BYTES_PER_ELEMENT"] + publicNonceTotal["length"]);
				
				Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
				
				// Free memory
				Secp256k1Zkp.instance._free(signatureBuffer);
				Secp256k1Zkp.instance._free(messageBuffer);
				Secp256k1Zkp.instance._free(secretKeyBuffer);
				
				if(secretNonce !== Secp256k1Zkp.NO_SECRET_NONCE)
					Secp256k1Zkp.instance._free(secretNonceBuffer);
				
				Secp256k1Zkp.instance._free(publicKeyBuffer);
				
				if(publicNonce !== Secp256k1Zkp.NO_PUBLIC_NONCE)
					Secp256k1Zkp.instance._free(publicNonceBuffer);
				
				if(publicNonceTotal !== Secp256k1Zkp.NO_PUBLIC_NONCE_TOTAL)
					Secp256k1Zkp.instance._free(publicNonceTotalBuffer);
				
				Secp256k1Zkp.instance._free(seedBuffer);
				
				// Clear seed
				seed.fill(0);
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			}
			
			// Get signature
			signature = new Uint8Array(Secp256k1Zkp.instance["HEAPU8"].subarray(signatureBuffer, signatureBuffer + signature["length"]));
			
			// Clear memory
			Secp256k1Zkp.instance["HEAPU8"].fill(0, signatureBuffer / signature["BYTES_PER_ELEMENT"], signatureBuffer / signature["BYTES_PER_ELEMENT"] + signature["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, messageBuffer / message["BYTES_PER_ELEMENT"], messageBuffer / message["BYTES_PER_ELEMENT"] + message["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, secretKeyBuffer / secretKey["BYTES_PER_ELEMENT"], secretKeyBuffer / secretKey["BYTES_PER_ELEMENT"] + secretKey["length"]);
			
			if(secretNonce !== Secp256k1Zkp.NO_SECRET_NONCE)
				Secp256k1Zkp.instance["HEAPU8"].fill(0, secretNonceBuffer / secretNonce["BYTES_PER_ELEMENT"], secretNonceBuffer / secretNonce["BYTES_PER_ELEMENT"] + secretNonce["length"]);
			
			Secp256k1Zkp.instance["HEAPU8"].fill(0, publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"], publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"] + publicKey["length"]);
			
			if(publicNonce !== Secp256k1Zkp.NO_PUBLIC_NONCE)
				Secp256k1Zkp.instance["HEAPU8"].fill(0, publicNonceBuffer / publicNonce["BYTES_PER_ELEMENT"], publicNonceBuffer / publicNonce["BYTES_PER_ELEMENT"] + publicNonce["length"]);
			
			if(publicNonceTotal !== Secp256k1Zkp.NO_PUBLIC_NONCE_TOTAL)
				Secp256k1Zkp.instance["HEAPU8"].fill(0, publicNonceTotalBuffer / publicNonceTotal["BYTES_PER_ELEMENT"], publicNonceTotalBuffer / publicNonceTotal["BYTES_PER_ELEMENT"] + publicNonceTotal["length"]);
			
			Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
			
			// Free memory
			Secp256k1Zkp.instance._free(signatureBuffer);
			Secp256k1Zkp.instance._free(messageBuffer);
			Secp256k1Zkp.instance._free(secretKeyBuffer);
			
			if(secretNonce !== Secp256k1Zkp.NO_SECRET_NONCE)
				Secp256k1Zkp.instance._free(secretNonceBuffer);
			
			Secp256k1Zkp.instance._free(publicKeyBuffer);
			
			if(publicNonce !== Secp256k1Zkp.NO_PUBLIC_NONCE)
				Secp256k1Zkp.instance._free(publicNonceBuffer);
			
			if(publicNonceTotal !== Secp256k1Zkp.NO_PUBLIC_NONCE_TOTAL)
				Secp256k1Zkp.instance._free(publicNonceTotalBuffer);
			
			Secp256k1Zkp.instance._free(seedBuffer);
			
			// Clear seed
			seed.fill(0);
			
			// Return signature
			return signature;
		}
		
		// Add single-signer signatures
		static addSingleSignerSignatures(signatures, publicNonceTotal) {
		
			// Check if instance doesn't exist
			if(typeof Secp256k1Zkp.instance === "undefined") {
			
				// Set instance
				Secp256k1Zkp.instance = secp256k1Zkp();
				
				// Initialize seed to size of seed
				var seed = new Uint8Array(Secp256k1Zkp.instance._seedSize());
				
				// Fill seed with random values
				crypto.getRandomValues(seed);
				
				// Allocate and fill memory
				var seedBuffer = Secp256k1Zkp.instance._malloc(seed["length"] * seed["BYTES_PER_ELEMENT"]);
				Secp256k1Zkp.instance["HEAPU8"].set(seed, seedBuffer / seed["BYTES_PER_ELEMENT"]);
				
				// Check if initializing failed
				if(Secp256k1Zkp.instance._initialize(seedBuffer, seed["length"] * seed["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
					
					// Set instance to invalid
					Secp256k1Zkp.instance = Secp256k1Zkp.INVALID;
				}
				
				// Otherwise
				else {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
				}
			}
		
			// Check if instance is invalid
			if(Secp256k1Zkp.instance === Secp256k1Zkp.INVALID)
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			
			// Initialize result to size of single-signer signature
			var result = new Uint8Array(Secp256k1Zkp.instance._singleSignerSignatureSize());
			
			// Allocate and fill memory
			var resultBuffer = Secp256k1Zkp.instance._malloc(result["length"] * result["BYTES_PER_ELEMENT"]);
			
			var signaturesLength = signatures.reduce(function(signaturesLength, signature) {
			
				// Return length of signature added to total
				return signaturesLength + signature["length"];
				
			}, 0);
			
			var signaturesBuffer = Secp256k1Zkp.instance._malloc(signaturesLength * Uint8Array["BYTES_PER_ELEMENT"]);
			
			// Go through all signatures
			var signaturesOffset = 0;
			for(var i = 0; i < signatures["length"]; ++i) {
			
				// Set signature in memory at offset
				Secp256k1Zkp.instance["HEAPU8"].set(signatures[i], signaturesBuffer / Uint8Array["BYTES_PER_ELEMENT"] + signaturesOffset);
				
				// Update offset
				signaturesOffset += signatures[i]["length"];
			}
			
			var signaturesSizesBuffer = Secp256k1Zkp.instance._malloc(signatures["length"] * Uint32Array["BYTES_PER_ELEMENT"]);
			
			for(var i = 0; i < signatures["length"]; ++i)
				Secp256k1Zkp.instance["HEAPU32"].set(new Uint32Array([signatures[i]["length"]]), signaturesSizesBuffer / Uint32Array["BYTES_PER_ELEMENT"] + i);
			
			var publicNonceTotalBuffer = Secp256k1Zkp.instance._malloc(publicNonceTotal["length"] * publicNonceTotal["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(publicNonceTotal, publicNonceTotalBuffer / publicNonceTotal["BYTES_PER_ELEMENT"]);
			
			// Check if adding single-signer signatures failed
			if(Secp256k1Zkp.instance._addSingleSignerSignatures(resultBuffer, signaturesBuffer, signaturesSizesBuffer, signatures["length"], publicNonceTotalBuffer, publicNonceTotal["length"] * publicNonceTotal["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
			
				// Clear memory
				Secp256k1Zkp.instance["HEAPU8"].fill(0, resultBuffer / result["BYTES_PER_ELEMENT"], resultBuffer / result["BYTES_PER_ELEMENT"] + result["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, signaturesBuffer / Uint8Array["BYTES_PER_ELEMENT"], signaturesBuffer / Uint8Array["BYTES_PER_ELEMENT"] + signaturesLength);
				Secp256k1Zkp.instance["HEAPU32"].fill(0, signaturesSizesBuffer / Uint32Array["BYTES_PER_ELEMENT"], signaturesSizesBuffer / Uint32Array["BYTES_PER_ELEMENT"] + signatures["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, publicNonceTotalBuffer / publicNonceTotal["BYTES_PER_ELEMENT"], publicNonceTotalBuffer / publicNonceTotal["BYTES_PER_ELEMENT"] + publicNonceTotal["length"]);
				
				// Free memory
				Secp256k1Zkp.instance._free(resultBuffer);
				Secp256k1Zkp.instance._free(signaturesBuffer);
				Secp256k1Zkp.instance._free(signaturesSizesBuffer);
				Secp256k1Zkp.instance._free(publicNonceTotalBuffer);
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			}
			
			// Get result
			result = new Uint8Array(Secp256k1Zkp.instance["HEAPU8"].subarray(resultBuffer, resultBuffer + result["length"]));
			
			// Clear memory
			Secp256k1Zkp.instance["HEAPU8"].fill(0, resultBuffer / result["BYTES_PER_ELEMENT"], resultBuffer / result["BYTES_PER_ELEMENT"] + result["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, signaturesBuffer / Uint8Array["BYTES_PER_ELEMENT"], signaturesBuffer / Uint8Array["BYTES_PER_ELEMENT"] + signaturesLength);
			Secp256k1Zkp.instance["HEAPU32"].fill(0, signaturesSizesBuffer / Uint32Array["BYTES_PER_ELEMENT"], signaturesSizesBuffer / Uint32Array["BYTES_PER_ELEMENT"] + signatures["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, publicNonceTotalBuffer / publicNonceTotal["BYTES_PER_ELEMENT"], publicNonceTotalBuffer / publicNonceTotal["BYTES_PER_ELEMENT"] + publicNonceTotal["length"]);
			
			// Free memory
			Secp256k1Zkp.instance._free(resultBuffer);
			Secp256k1Zkp.instance._free(signaturesBuffer);
			Secp256k1Zkp.instance._free(signaturesSizesBuffer);
			Secp256k1Zkp.instance._free(publicNonceTotalBuffer);
			
			// Return result
			return result;
		}
		
		// Verify single-signer signature
		static verifySingleSignerSignature(signature, message, publicNonce, publicKey, publicKeyTotal, isPartial) {
		
			// Check if instance doesn't exist
			if(typeof Secp256k1Zkp.instance === "undefined") {
			
				// Set instance
				Secp256k1Zkp.instance = secp256k1Zkp();
				
				// Initialize seed to size of seed
				var seed = new Uint8Array(Secp256k1Zkp.instance._seedSize());
				
				// Fill seed with random values
				crypto.getRandomValues(seed);
				
				// Allocate and fill memory
				var seedBuffer = Secp256k1Zkp.instance._malloc(seed["length"] * seed["BYTES_PER_ELEMENT"]);
				Secp256k1Zkp.instance["HEAPU8"].set(seed, seedBuffer / seed["BYTES_PER_ELEMENT"]);
				
				// Check if initializing failed
				if(Secp256k1Zkp.instance._initialize(seedBuffer, seed["length"] * seed["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
					
					// Set instance to invalid
					Secp256k1Zkp.instance = Secp256k1Zkp.INVALID;
				}
				
				// Otherwise
				else {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
				}
			}
		
			// Check if instance is invalid
			if(Secp256k1Zkp.instance === Secp256k1Zkp.INVALID)
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			
			// Allocate and fill memory
			var signatureBuffer = Secp256k1Zkp.instance._malloc(signature["length"] * signature["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(signature, signatureBuffer / signature["BYTES_PER_ELEMENT"]);
			
			if(publicNonce !== Secp256k1Zkp.NO_PUBLIC_NONCE) {
				var publicNonceBuffer = Secp256k1Zkp.instance._malloc(publicNonce["length"] * publicNonce["BYTES_PER_ELEMENT"]);
				Secp256k1Zkp.instance["HEAPU8"].set(publicNonce, publicNonceBuffer / publicNonce["BYTES_PER_ELEMENT"]);
			}
			
			var messageBuffer = Secp256k1Zkp.instance._malloc(message["length"] * message["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(message, messageBuffer / message["BYTES_PER_ELEMENT"]);
			
			var publicKeyBuffer = Secp256k1Zkp.instance._malloc(publicKey["length"] * publicKey["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(publicKey, publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"]);
			
			var publicKeyTotalBuffer = Secp256k1Zkp.instance._malloc(publicKeyTotal["length"] * publicKeyTotal["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(publicKeyTotal, publicKeyTotalBuffer / publicKeyTotal["BYTES_PER_ELEMENT"]);
			
			// Check if single-signer signature isn't verified
			if(Secp256k1Zkp.instance._verifySingleSignerSignature(signatureBuffer, signature["length"] * signature["BYTES_PER_ELEMENT"], messageBuffer, message["length"] * message["BYTES_PER_ELEMENT"], (publicNonce !== Secp256k1Zkp.NO_PUBLIC_NONCE) ? publicNonceBuffer : Secp256k1Zkp.C_NULL, (publicNonce !== Secp256k1Zkp.NO_PUBLIC_NONCE) ? publicNonce["length"] * publicNonce["BYTES_PER_ELEMENT"] : 0, publicKeyBuffer, publicKey["length"] * publicKey["BYTES_PER_ELEMENT"], publicKeyTotalBuffer, publicKeyTotal["length"] * publicKeyTotal["BYTES_PER_ELEMENT"], Secp256k1Zkp.booleanToCBoolean(isPartial)) === Secp256k1Zkp.C_FALSE) {
			
				// Clear memory
				Secp256k1Zkp.instance["HEAPU8"].fill(0, signatureBuffer / signature["BYTES_PER_ELEMENT"], signatureBuffer / signature["BYTES_PER_ELEMENT"] + signature["length"]);
				
				if(publicNonce !== Secp256k1Zkp.NO_PUBLIC_NONCE)
					Secp256k1Zkp.instance["HEAPU8"].fill(0, publicNonceBuffer / publicNonce["BYTES_PER_ELEMENT"], publicNonceBuffer / publicNonce["BYTES_PER_ELEMENT"] + publicNonce["length"]);
				
				Secp256k1Zkp.instance["HEAPU8"].fill(0, messageBuffer / message["BYTES_PER_ELEMENT"], messageBuffer / message["BYTES_PER_ELEMENT"] + message["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"], publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"] + publicKey["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, publicKeyTotalBuffer / publicKeyTotal["BYTES_PER_ELEMENT"], publicKeyTotalBuffer / publicKeyTotal["BYTES_PER_ELEMENT"] + publicKeyTotal["length"]);
				
				// Free memory
				Secp256k1Zkp.instance._free(signatureBuffer);
				
				if(publicNonce !== Secp256k1Zkp.NO_PUBLIC_NONCE)
					Secp256k1Zkp.instance._free(publicNonceBuffer);
				
				Secp256k1Zkp.instance._free(messageBuffer);
				Secp256k1Zkp.instance._free(publicKeyBuffer);
				Secp256k1Zkp.instance._free(publicKeyTotalBuffer);
			
				// Return false
				return false;
			}
			
			// Clear memory
			Secp256k1Zkp.instance["HEAPU8"].fill(0, signatureBuffer / signature["BYTES_PER_ELEMENT"], signatureBuffer / signature["BYTES_PER_ELEMENT"] + signature["length"]);
			
			if(publicNonce !== Secp256k1Zkp.NO_PUBLIC_NONCE)
				Secp256k1Zkp.instance["HEAPU8"].fill(0, publicNonceBuffer / publicNonce["BYTES_PER_ELEMENT"], publicNonceBuffer / publicNonce["BYTES_PER_ELEMENT"] + publicNonce["length"]);
			
			Secp256k1Zkp.instance["HEAPU8"].fill(0, messageBuffer / message["BYTES_PER_ELEMENT"], messageBuffer / message["BYTES_PER_ELEMENT"] + message["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"], publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"] + publicKey["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, publicKeyTotalBuffer / publicKeyTotal["BYTES_PER_ELEMENT"], publicKeyTotalBuffer / publicKeyTotal["BYTES_PER_ELEMENT"] + publicKeyTotal["length"]);
			
			// Free memory
			Secp256k1Zkp.instance._free(signatureBuffer);
			
			if(publicNonce !== Secp256k1Zkp.NO_PUBLIC_NONCE)
				Secp256k1Zkp.instance._free(publicNonceBuffer);
			
			Secp256k1Zkp.instance._free(messageBuffer);
			Secp256k1Zkp.instance._free(publicKeyBuffer);
			Secp256k1Zkp.instance._free(publicKeyTotalBuffer);
			
			// Return true
			return true;
		}
		
		// Single-signer signature from data
		static singleSignerSignatureFromData(data) {
		
			// Check if instance doesn't exist
			if(typeof Secp256k1Zkp.instance === "undefined") {
			
				// Set instance
				Secp256k1Zkp.instance = secp256k1Zkp();
				
				// Initialize seed to size of seed
				var seed = new Uint8Array(Secp256k1Zkp.instance._seedSize());
				
				// Fill seed with random values
				crypto.getRandomValues(seed);
				
				// Allocate and fill memory
				var seedBuffer = Secp256k1Zkp.instance._malloc(seed["length"] * seed["BYTES_PER_ELEMENT"]);
				Secp256k1Zkp.instance["HEAPU8"].set(seed, seedBuffer / seed["BYTES_PER_ELEMENT"]);
				
				// Check if initializing failed
				if(Secp256k1Zkp.instance._initialize(seedBuffer, seed["length"] * seed["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
					
					// Set instance to invalid
					Secp256k1Zkp.instance = Secp256k1Zkp.INVALID;
				}
				
				// Otherwise
				else {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
				}
			}
		
			// Check if instance is invalid
			if(Secp256k1Zkp.instance === Secp256k1Zkp.INVALID)
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			
			// Initialize signature to size of single-signer signature
			var signature = new Uint8Array(Secp256k1Zkp.instance._singleSignerSignatureSize());
			
			// Allocate and fill memory
			var signatureBuffer = Secp256k1Zkp.instance._malloc(signature["length"] * signature["BYTES_PER_ELEMENT"]);
			
			var dataBuffer = Secp256k1Zkp.instance._malloc(data["length"] * data["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(data, dataBuffer / data["BYTES_PER_ELEMENT"]);
			
			// Check if getting single-signer signature from data failed
			if(Secp256k1Zkp.instance._singleSignerSignatureFromData(signatureBuffer, dataBuffer, data["length"] * data["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
			
				// Clear memory
				Secp256k1Zkp.instance["HEAPU8"].fill(0, signatureBuffer / signature["BYTES_PER_ELEMENT"], signatureBuffer / signature["BYTES_PER_ELEMENT"] + signature["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, dataBuffer / data["BYTES_PER_ELEMENT"], dataBuffer / data["BYTES_PER_ELEMENT"] + data["length"]);
				
				// Free memory
				Secp256k1Zkp.instance._free(signatureBuffer);
				Secp256k1Zkp.instance._free(dataBuffer);
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			}
			
			// Get signature
			signature = new Uint8Array(Secp256k1Zkp.instance["HEAPU8"].subarray(signatureBuffer, signatureBuffer + signature["length"]));
			
			// Clear memory
			Secp256k1Zkp.instance["HEAPU8"].fill(0, signatureBuffer / signature["BYTES_PER_ELEMENT"], signatureBuffer / signature["BYTES_PER_ELEMENT"] + signature["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, dataBuffer / data["BYTES_PER_ELEMENT"], dataBuffer / data["BYTES_PER_ELEMENT"] + data["length"]);
			
			// Free memory
			Secp256k1Zkp.instance._free(signatureBuffer);
			Secp256k1Zkp.instance._free(dataBuffer);
			
			// Return signature
			return signature;
		}
		
		// Compact single-signer signature
		static compactSingleSignerSignature(signature) {
		
			// Check if instance doesn't exist
			if(typeof Secp256k1Zkp.instance === "undefined") {
			
				// Set instance
				Secp256k1Zkp.instance = secp256k1Zkp();
				
				// Initialize seed to size of seed
				var seed = new Uint8Array(Secp256k1Zkp.instance._seedSize());
				
				// Fill seed with random values
				crypto.getRandomValues(seed);
				
				// Allocate and fill memory
				var seedBuffer = Secp256k1Zkp.instance._malloc(seed["length"] * seed["BYTES_PER_ELEMENT"]);
				Secp256k1Zkp.instance["HEAPU8"].set(seed, seedBuffer / seed["BYTES_PER_ELEMENT"]);
				
				// Check if initializing failed
				if(Secp256k1Zkp.instance._initialize(seedBuffer, seed["length"] * seed["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
					
					// Set instance to invalid
					Secp256k1Zkp.instance = Secp256k1Zkp.INVALID;
				}
				
				// Otherwise
				else {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
				}
			}
		
			// Check if instance is invalid
			if(Secp256k1Zkp.instance === Secp256k1Zkp.INVALID)
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			
			// Initialize result to size of single-signer signature
			var result = new Uint8Array(Secp256k1Zkp.instance._singleSignerSignatureSize());
			
			// Allocate and fill memory
			var resultBuffer = Secp256k1Zkp.instance._malloc(signature["length"] * signature["BYTES_PER_ELEMENT"]);
			
			var signatureBuffer = Secp256k1Zkp.instance._malloc(signature["length"] * signature["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(signature, signatureBuffer / signature["BYTES_PER_ELEMENT"]);
			
			// Check if compacting single-signer signature failed
			if(Secp256k1Zkp.instance._compactSingleSignerSignature(resultBuffer, signatureBuffer, signature["length"] * signature["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
			
				// Clear memory
				Secp256k1Zkp.instance["HEAPU8"].fill(0, resultBuffer / result["BYTES_PER_ELEMENT"], resultBuffer / result["BYTES_PER_ELEMENT"] + result["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, signatureBuffer / signature["BYTES_PER_ELEMENT"], signatureBuffer / signature["BYTES_PER_ELEMENT"] + signature["length"]);
				
				// Free memory
				Secp256k1Zkp.instance._free(resultBuffer);
				Secp256k1Zkp.instance._free(signatureBuffer);
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			}
			
			// Get result
			result = new Uint8Array(Secp256k1Zkp.instance["HEAPU8"].subarray(resultBuffer, resultBuffer + result["length"]));
			
			// Clear memory
			Secp256k1Zkp.instance["HEAPU8"].fill(0, resultBuffer / result["BYTES_PER_ELEMENT"], resultBuffer / result["BYTES_PER_ELEMENT"] + result["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, signatureBuffer / signature["BYTES_PER_ELEMENT"], signatureBuffer / signature["BYTES_PER_ELEMENT"] + signature["length"]);
			
			// Free memory
			Secp256k1Zkp.instance._free(resultBuffer);
			Secp256k1Zkp.instance._free(signatureBuffer);
			
			// Return result
			return result;
		}
		
		// Uncompact single-signer signature
		static uncompactSingleSignerSignature(signature) {
		
			// Check if instance doesn't exist
			if(typeof Secp256k1Zkp.instance === "undefined") {
			
				// Set instance
				Secp256k1Zkp.instance = secp256k1Zkp();
				
				// Initialize seed to size of seed
				var seed = new Uint8Array(Secp256k1Zkp.instance._seedSize());
				
				// Fill seed with random values
				crypto.getRandomValues(seed);
				
				// Allocate and fill memory
				var seedBuffer = Secp256k1Zkp.instance._malloc(seed["length"] * seed["BYTES_PER_ELEMENT"]);
				Secp256k1Zkp.instance["HEAPU8"].set(seed, seedBuffer / seed["BYTES_PER_ELEMENT"]);
				
				// Check if initializing failed
				if(Secp256k1Zkp.instance._initialize(seedBuffer, seed["length"] * seed["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
					
					// Set instance to invalid
					Secp256k1Zkp.instance = Secp256k1Zkp.INVALID;
				}
				
				// Otherwise
				else {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
				}
			}
		
			// Check if instance is invalid
			if(Secp256k1Zkp.instance === Secp256k1Zkp.INVALID)
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			
			// Initialize result to size of uncompact single-signer signature
			var result = new Uint8Array(Secp256k1Zkp.instance._uncompactSingleSignerSignatureSize());
			
			// Allocate and fill memory
			var resultBuffer = Secp256k1Zkp.instance._malloc(signature["length"] * signature["BYTES_PER_ELEMENT"]);
			
			var signatureBuffer = Secp256k1Zkp.instance._malloc(signature["length"] * signature["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(signature, signatureBuffer / signature["BYTES_PER_ELEMENT"]);
			
			// Check if uncompacting single-signer signature failed
			if(Secp256k1Zkp.instance._uncompactSingleSignerSignature(resultBuffer, signatureBuffer, signature["length"] * signature["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
			
				// Clear memory
				Secp256k1Zkp.instance["HEAPU8"].fill(0, resultBuffer / result["BYTES_PER_ELEMENT"], resultBuffer / result["BYTES_PER_ELEMENT"] + result["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, signatureBuffer / signature["BYTES_PER_ELEMENT"], signatureBuffer / signature["BYTES_PER_ELEMENT"] + signature["length"]);
				
				// Free memory
				Secp256k1Zkp.instance._free(resultBuffer);
				Secp256k1Zkp.instance._free(signatureBuffer);
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			}
			
			// Get result
			result = new Uint8Array(Secp256k1Zkp.instance["HEAPU8"].subarray(resultBuffer, resultBuffer + result["length"]));
			
			// Clear memory
			Secp256k1Zkp.instance["HEAPU8"].fill(0, resultBuffer / result["BYTES_PER_ELEMENT"], resultBuffer / result["BYTES_PER_ELEMENT"] + result["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, signatureBuffer / signature["BYTES_PER_ELEMENT"], signatureBuffer / signature["BYTES_PER_ELEMENT"] + signature["length"]);
			
			// Free memory
			Secp256k1Zkp.instance._free(resultBuffer);
			Secp256k1Zkp.instance._free(signatureBuffer);
			
			// Return result
			return result;
		}
		
		// Combine public keys
		static combinePublicKeys(publicKeys) {
		
			// Check if instance doesn't exist
			if(typeof Secp256k1Zkp.instance === "undefined") {
			
				// Set instance
				Secp256k1Zkp.instance = secp256k1Zkp();
				
				// Initialize seed to size of seed
				var seed = new Uint8Array(Secp256k1Zkp.instance._seedSize());
				
				// Fill seed with random values
				crypto.getRandomValues(seed);
				
				// Allocate and fill memory
				var seedBuffer = Secp256k1Zkp.instance._malloc(seed["length"] * seed["BYTES_PER_ELEMENT"]);
				Secp256k1Zkp.instance["HEAPU8"].set(seed, seedBuffer / seed["BYTES_PER_ELEMENT"]);
				
				// Check if initializing failed
				if(Secp256k1Zkp.instance._initialize(seedBuffer, seed["length"] * seed["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
					
					// Set instance to invalid
					Secp256k1Zkp.instance = Secp256k1Zkp.INVALID;
				}
				
				// Otherwise
				else {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
				}
			}
		
			// Check if instance is invalid
			if(Secp256k1Zkp.instance === Secp256k1Zkp.INVALID)
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			
			// Initialize result to size of public key
			var result = new Uint8Array(Secp256k1Zkp.instance._publicKeySize());
			
			// Allocate and fill memory
			var resultBuffer = Secp256k1Zkp.instance._malloc(result["length"] * result["BYTES_PER_ELEMENT"]);
			
			var publicKeysLength = publicKeys.reduce(function(publicKeysLength, publicKey) {
			
				// Return length of public key added to total
				return publicKeysLength + publicKey["length"];
				
			}, 0);
			
			var publicKeysBuffer = Secp256k1Zkp.instance._malloc(publicKeysLength * Uint8Array["BYTES_PER_ELEMENT"]);
			
			// Go through all public keys
			var publicKeysOffset = 0;
			for(var i = 0; i < publicKeys["length"]; ++i) {
			
				// Set public key in memory at offset
				Secp256k1Zkp.instance["HEAPU8"].set(publicKeys[i], publicKeysBuffer / Uint8Array["BYTES_PER_ELEMENT"] + publicKeysOffset);
				
				// Update offset
				publicKeysOffset += publicKeys[i]["length"];
			}
			
			var publicKeysSizesBuffer = Secp256k1Zkp.instance._malloc(publicKeys["length"] * Uint32Array["BYTES_PER_ELEMENT"]);
			
			for(var i = 0; i < publicKeys["length"]; ++i)
				Secp256k1Zkp.instance["HEAPU32"].set(new Uint32Array([publicKeys[i]["length"]]), publicKeysSizesBuffer / Uint32Array["BYTES_PER_ELEMENT"] + i);
			
			// Check if combining public keys failed
			if(Secp256k1Zkp.instance._combinePublicKeys(resultBuffer, publicKeysBuffer, publicKeysSizesBuffer, publicKeys["length"]) === Secp256k1Zkp.C_FALSE) {
			
				// Clear memory
				Secp256k1Zkp.instance["HEAPU8"].fill(0, resultBuffer / result["BYTES_PER_ELEMENT"], resultBuffer / result["BYTES_PER_ELEMENT"] + result["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, publicKeysBuffer / Uint8Array["BYTES_PER_ELEMENT"], publicKeysBuffer / Uint8Array["BYTES_PER_ELEMENT"] + publicKeysLength);
				Secp256k1Zkp.instance["HEAPU32"].fill(0, publicKeysSizesBuffer / Uint32Array["BYTES_PER_ELEMENT"], publicKeysSizesBuffer / Uint32Array["BYTES_PER_ELEMENT"] + publicKeys["length"]);
				
				// Free memory
				Secp256k1Zkp.instance._free(resultBuffer);
				Secp256k1Zkp.instance._free(publicKeysBuffer);
				Secp256k1Zkp.instance._free(publicKeysSizesBuffer);
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			}
			
			// Get result
			result = new Uint8Array(Secp256k1Zkp.instance["HEAPU8"].subarray(resultBuffer, resultBuffer + result["length"]));
			
			// Clear memory
			Secp256k1Zkp.instance["HEAPU8"].fill(0, resultBuffer / result["BYTES_PER_ELEMENT"], resultBuffer / result["BYTES_PER_ELEMENT"] + result["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, publicKeysBuffer / Uint8Array["BYTES_PER_ELEMENT"], publicKeysBuffer / Uint8Array["BYTES_PER_ELEMENT"] + publicKeysLength);
			Secp256k1Zkp.instance["HEAPU32"].fill(0, publicKeysSizesBuffer / Uint32Array["BYTES_PER_ELEMENT"], publicKeysSizesBuffer / Uint32Array["BYTES_PER_ELEMENT"] + publicKeys["length"]);
			
			// Free memory
			Secp256k1Zkp.instance._free(resultBuffer);
			Secp256k1Zkp.instance._free(publicKeysBuffer);
			Secp256k1Zkp.instance._free(publicKeysSizesBuffer);
			
			// Return result
			return result;
		}
		
		// Create secret nonce
		static createSecretNonce() {
		
			// Check if instance doesn't exist
			if(typeof Secp256k1Zkp.instance === "undefined") {
			
				// Set instance
				Secp256k1Zkp.instance = secp256k1Zkp();
				
				// Initialize seed to size of seed
				var seed = new Uint8Array(Secp256k1Zkp.instance._seedSize());
				
				// Fill seed with random values
				crypto.getRandomValues(seed);
				
				// Allocate and fill memory
				var seedBuffer = Secp256k1Zkp.instance._malloc(seed["length"] * seed["BYTES_PER_ELEMENT"]);
				Secp256k1Zkp.instance["HEAPU8"].set(seed, seedBuffer / seed["BYTES_PER_ELEMENT"]);
				
				// Check if initializing failed
				if(Secp256k1Zkp.instance._initialize(seedBuffer, seed["length"] * seed["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
					
					// Set instance to invalid
					Secp256k1Zkp.instance = Secp256k1Zkp.INVALID;
				}
				
				// Otherwise
				else {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
				}
			}
		
			// Check if instance is invalid
			if(Secp256k1Zkp.instance === Secp256k1Zkp.INVALID)
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			
			// Initialize nonce to size of nonce
			var nonce = new Uint8Array(Secp256k1Zkp.instance._nonceSize());
			
			// Initialize seed to size of seed
			var seed = new Uint8Array(Secp256k1Zkp.instance._seedSize());
			
			// Fill seed with random values
			crypto.getRandomValues(seed);
			
			// Allocate and fill memory
			var nonceBuffer = Secp256k1Zkp.instance._malloc(nonce["length"] * nonce["BYTES_PER_ELEMENT"]);
			
			var seedBuffer = Secp256k1Zkp.instance._malloc(seed["length"] * seed["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(seed, seedBuffer / seed["BYTES_PER_ELEMENT"]);
			
			// Check if creating secure nonce failed
			if(Secp256k1Zkp.instance._createSecretNonce(nonceBuffer, seedBuffer, seed["length"] * seed["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
			
				// Clear memory
				Secp256k1Zkp.instance["HEAPU8"].fill(0, nonceBuffer / nonce["BYTES_PER_ELEMENT"], nonceBuffer / nonce["BYTES_PER_ELEMENT"] + nonce["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
				
				// Free memory
				Secp256k1Zkp.instance._free(nonceBuffer);
				Secp256k1Zkp.instance._free(seedBuffer);
				
				// Clear seed
				seed.fill(0);
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			}
			
			// Get nonce
			nonce = new Uint8Array(Secp256k1Zkp.instance["HEAPU8"].subarray(nonceBuffer, nonceBuffer + nonce["length"]));
			
			// Clear memory
			Secp256k1Zkp.instance["HEAPU8"].fill(0, nonceBuffer / nonce["BYTES_PER_ELEMENT"], nonceBuffer / nonce["BYTES_PER_ELEMENT"] + nonce["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
			
			// Free memory
			Secp256k1Zkp.instance._free(nonceBuffer);
			Secp256k1Zkp.instance._free(seedBuffer);
			
			// Clear seed
			seed.fill(0);
			
			// Return nonce
			return nonce;
		}
		
		// Create message hash signature
		static createMessageHashSignature(messageHash, secretKey) {
		
			// Check if instance doesn't exist
			if(typeof Secp256k1Zkp.instance === "undefined") {
			
				// Set instance
				Secp256k1Zkp.instance = secp256k1Zkp();
				
				// Initialize seed to size of seed
				var seed = new Uint8Array(Secp256k1Zkp.instance._seedSize());
				
				// Fill seed with random values
				crypto.getRandomValues(seed);
				
				// Allocate and fill memory
				var seedBuffer = Secp256k1Zkp.instance._malloc(seed["length"] * seed["BYTES_PER_ELEMENT"]);
				Secp256k1Zkp.instance["HEAPU8"].set(seed, seedBuffer / seed["BYTES_PER_ELEMENT"]);
				
				// Check if initializing failed
				if(Secp256k1Zkp.instance._initialize(seedBuffer, seed["length"] * seed["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
					
					// Set instance to invalid
					Secp256k1Zkp.instance = Secp256k1Zkp.INVALID;
				}
				
				// Otherwise
				else {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
				}
			}
		
			// Check if instance is invalid
			if(Secp256k1Zkp.instance === Secp256k1Zkp.INVALID)
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			
			// Initialize signature to maximum size of message hash signature
			var signature = new Uint8Array(Secp256k1Zkp.instance._maximumMessageHashSignatureSize());
			
			// Initialize signature size to size of a max 64-bit integer C string
			var signatureSize = new Uint8Array(Secp256k1Zkp.MAX_64_BIT_INTEGER_C_STRING["length"]);
			
			// Allocate and fill memory
			var signatureBuffer = Secp256k1Zkp.instance._malloc(signature["length"] * signature["BYTES_PER_ELEMENT"]);
			
			var signatureSizeBuffer = Secp256k1Zkp.instance._malloc(signatureSize["length"] * signatureSize["BYTES_PER_ELEMENT"]);
			
			var messageHashBuffer = Secp256k1Zkp.instance._malloc(messageHash["length"] * messageHash["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(messageHash, messageHashBuffer / messageHash["BYTES_PER_ELEMENT"]);
			
			var secretKeyBuffer = Secp256k1Zkp.instance._malloc(secretKey["length"] * secretKey["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(secretKey, secretKeyBuffer / secretKey["BYTES_PER_ELEMENT"]);
			
			// Check if creating message hash signature failed
			if(Secp256k1Zkp.instance._createMessageHashSignature(signatureBuffer, signatureSizeBuffer, messageHashBuffer, messageHash["length"] * messageHash["BYTES_PER_ELEMENT"], secretKeyBuffer, secretKey["length"] * secretKey["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
			
				// Clear memory
				Secp256k1Zkp.instance["HEAPU8"].fill(0, signatureBuffer / signature["BYTES_PER_ELEMENT"], signatureBuffer / signature["BYTES_PER_ELEMENT"] + signature["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, signatureSizeBuffer / signatureSize["BYTES_PER_ELEMENT"], signatureSizeBuffer / signatureSize["BYTES_PER_ELEMENT"] + signatureSize["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, messageHashBuffer / messageHash["BYTES_PER_ELEMENT"], messageHashBuffer / messageHash["BYTES_PER_ELEMENT"] + messageHash["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, secretKeyBuffer / secretKey["BYTES_PER_ELEMENT"], secretKeyBuffer / secretKey["BYTES_PER_ELEMENT"] + secretKey["length"]);
				
				// Free memory
				Secp256k1Zkp.instance._free(signatureBuffer);
				Secp256k1Zkp.instance._free(signatureSizeBuffer);
				Secp256k1Zkp.instance._free(messageHashBuffer);
				Secp256k1Zkp.instance._free(secretKeyBuffer);
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			}
			
			// Get signature size
			signatureSize = Secp256k1Zkp.cStringToString(Secp256k1Zkp.instance["HEAPU8"].subarray(signatureSizeBuffer, signatureSizeBuffer + signatureSize["length"]));
			
			// Get signature
			signature = new Uint8Array(Secp256k1Zkp.instance["HEAPU8"].subarray(signatureBuffer, signatureBuffer + parseInt(signatureSize, Secp256k1Zkp.DECIMAL_NUMBER_BASE)));
			
			// Clear memory
			Secp256k1Zkp.instance["HEAPU8"].fill(0, signatureBuffer / signature["BYTES_PER_ELEMENT"], signatureBuffer / signature["BYTES_PER_ELEMENT"] + signature["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, signatureSizeBuffer / signatureSize["BYTES_PER_ELEMENT"], signatureSizeBuffer / signatureSize["BYTES_PER_ELEMENT"] + signatureSize["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, messageHashBuffer / messageHash["BYTES_PER_ELEMENT"], messageHashBuffer / messageHash["BYTES_PER_ELEMENT"] + messageHash["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, secretKeyBuffer / secretKey["BYTES_PER_ELEMENT"], secretKeyBuffer / secretKey["BYTES_PER_ELEMENT"] + secretKey["length"]);
			
			// Free memory
			Secp256k1Zkp.instance._free(signatureBuffer);
			Secp256k1Zkp.instance._free(signatureSizeBuffer);
			Secp256k1Zkp.instance._free(messageHashBuffer);
			Secp256k1Zkp.instance._free(secretKeyBuffer);
			
			// Return signature
			return signature;
		}
		
		// Verify message hash signature
		static verifyMessageHashSignature(signature, messageHash, publicKey) {
		
			// Check if instance doesn't exist
			if(typeof Secp256k1Zkp.instance === "undefined") {
			
				// Set instance
				Secp256k1Zkp.instance = secp256k1Zkp();
				
				// Initialize seed to size of seed
				var seed = new Uint8Array(Secp256k1Zkp.instance._seedSize());
				
				// Fill seed with random values
				crypto.getRandomValues(seed);
				
				// Allocate and fill memory
				var seedBuffer = Secp256k1Zkp.instance._malloc(seed["length"] * seed["BYTES_PER_ELEMENT"]);
				Secp256k1Zkp.instance["HEAPU8"].set(seed, seedBuffer / seed["BYTES_PER_ELEMENT"]);
				
				// Check if initializing failed
				if(Secp256k1Zkp.instance._initialize(seedBuffer, seed["length"] * seed["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
					
					// Set instance to invalid
					Secp256k1Zkp.instance = Secp256k1Zkp.INVALID;
				}
				
				// Otherwise
				else {
				
					// Clear memory
					Secp256k1Zkp.instance["HEAPU8"].fill(0, seedBuffer / seed["BYTES_PER_ELEMENT"], seedBuffer / seed["BYTES_PER_ELEMENT"] + seed["length"]);
					
					// Free memory
					Secp256k1Zkp.instance._free(seedBuffer);
					
					// Clear seed
					seed.fill(0);
				}
			}
		
			// Check if instance is invalid
			if(Secp256k1Zkp.instance === Secp256k1Zkp.INVALID)
			
				// Return operation failed
				return Secp256k1Zkp.OPERATION_FAILED;
			
			// Allocate and fill memory
			var signatureBuffer = Secp256k1Zkp.instance._malloc(signature["length"] * signature["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(signature, signatureBuffer / signature["BYTES_PER_ELEMENT"]);
			
			var messageHashBuffer = Secp256k1Zkp.instance._malloc(messageHash["length"] * messageHash["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(messageHash, messageHashBuffer / messageHash["BYTES_PER_ELEMENT"]);
			
			var publicKeyBuffer = Secp256k1Zkp.instance._malloc(publicKey["length"] * publicKey["BYTES_PER_ELEMENT"]);
			Secp256k1Zkp.instance["HEAPU8"].set(publicKey, publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"]);
			
			// Check if message hash signature isn't verified
			if(Secp256k1Zkp.instance._verifyMessageHashSignature(signatureBuffer, signature["length"] * signature["BYTES_PER_ELEMENT"], messageHashBuffer, messageHash["length"] * messageHash["BYTES_PER_ELEMENT"], publicKeyBuffer, publicKey["length"] * publicKey["BYTES_PER_ELEMENT"]) === Secp256k1Zkp.C_FALSE) {
			
				// Clear memory
				Secp256k1Zkp.instance["HEAPU8"].fill(0, signatureBuffer / signature["BYTES_PER_ELEMENT"], signatureBuffer / signature["BYTES_PER_ELEMENT"] + signature["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, messageHashBuffer / messageHash["BYTES_PER_ELEMENT"], messageHashBuffer / messageHash["BYTES_PER_ELEMENT"] + messageHash["length"]);
				Secp256k1Zkp.instance["HEAPU8"].fill(0, publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"], publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"] + publicKey["length"]);
				
				// Free memory
				Secp256k1Zkp.instance._free(signatureBuffer);
				Secp256k1Zkp.instance._free(messageHashBuffer);
				Secp256k1Zkp.instance._free(publicKeyBuffer);
			
				// Return false
				return false;
			}
			
			// Clear memory
			Secp256k1Zkp.instance["HEAPU8"].fill(0, signatureBuffer / signature["BYTES_PER_ELEMENT"], signatureBuffer / signature["BYTES_PER_ELEMENT"] + signature["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, messageHashBuffer / messageHash["BYTES_PER_ELEMENT"], messageHashBuffer / messageHash["BYTES_PER_ELEMENT"] + messageHash["length"]);
			Secp256k1Zkp.instance["HEAPU8"].fill(0, publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"], publicKeyBuffer / publicKey["BYTES_PER_ELEMENT"] + publicKey["length"]);
			
			// Free memory
			Secp256k1Zkp.instance._free(signatureBuffer);
			Secp256k1Zkp.instance._free(messageHashBuffer);
			Secp256k1Zkp.instance._free(publicKeyBuffer);
			
			// Return true
			return true;
		}
		
		// Operation failed
		static get OPERATION_FAILED() {
		
			// Return operation failed
			return null;
		}
		
		// No secret nonce
		static get NO_SECRET_NONCE() {
		
			// Return no secret nonce
			return null;
		}
		
		// No public nonce
		static get NO_PUBLIC_NONCE() {
		
			// Return no public nonce
			return null;
		}
		
		// No public nonce total
		static get NO_PUBLIC_NONCE_TOTAL() {
		
			// Return no public nonce total
			return null;
		}
	
	// Private
	
		// String to C string
		static stringToCString(string) {
		
			// Get UTF-8 string from string
			var utf8String = (new TextEncoder()).encode(string);
			
			// Append NULL terminator to UTF-8 string
			var nullTerminator = new Uint8Array([Secp256k1Zkp.NULL_TERMINATOR]);
			var cString = new Uint8Array(utf8String["length"] + nullTerminator["length"]);
			
			cString.set(utf8String);
			cString.set(nullTerminator, utf8String["length"]);
			
			// Clear memory
			utf8String.fill(0);
			
			// Return C string
			return cString;
		}
		
		// C string to string
		static cStringToString(cString) {
		
			// Get index of NULL terminator character in C string
			var nullTerminatorIndex = cString.findIndex(function(element, index, array) {
			
				// Return if the element is a NULL terminator
				return element === Secp256k1Zkp.NULL_TERMINATOR;
			});
			
			// Return string
			return (new TextDecoder()).decode(cString.subarray(0, nullTerminatorIndex));
		}
		
		// Boolean to C boolean
		static booleanToCBoolean(boolean) {
		
			// Return boolean as a C boolean
			return (boolean === true) ? Secp256k1Zkp.C_TRUE : Secp256k1Zkp.C_FALSE;
		}
		
		// NULL terminator
		static get NULL_TERMINATOR() {
		
			// Return NULL terminator
			return 0;
		}
		
		// Max 64-bit integer C string
		static get MAX_64_BIT_INTEGER_C_STRING() {
		
			// Return max 64-bit integer C string
			return "18446744073709551615\0";
		}
		
		// Invalid
		static get INVALID() {
		
			// Return invalid
			return null;
		}
		
		// C false
		static get C_FALSE() {
		
			// Return C false
			return 0;
		}
		
		// C true
		static get C_TRUE() {
		
			// Return C true
			return 1;
		}
		
		// C null
		static get C_NULL() {
		
			// Return C null
			return null;
		}
		
		// Decimal number base
		static get DECIMAL_NUMBER_BASE() {
		
			// Return decimal number base
			return 10;
		}
}


// Supporting fuction implementation

// Check if document doesn't exist
if(typeof document === "undefined") {

	// Create document
	var document = {};
}

// Check if module exports exists
if(typeof module === "object" && module !== null && "exports" in module === true) {

	// Exports
	module["exports"] = Secp256k1Zkp;
}
