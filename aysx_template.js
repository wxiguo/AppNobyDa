let obj = JSON.parse($response.body);
obj.status = 0;
if(obj.error == 'ok'){
   delete obj.error;
   delete obj.update;
   delete obj.slot;
   delete obj.conf;
   delete obj.active_conf;
   delete obj.video;
   delete obj.d_status;
   delete obj.subs;
   delete obj.subs_sdk;
}
$done({body: JSON.stringify(obj)});
