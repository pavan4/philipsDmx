"use strict"
var DMX = require('.\\dmx')
var A = DMX.Animation

var dmx = new DMX()
var osc = require('.\\node_modules\\node-osc');
//var osc = require('node-osc');

var universe = dmx.addUniverse('demo', 'enttec-usb-dmx-pro', 0)
//var universe = dmx.addUniverse('demo', 'null')

var blink = 17;
var prev_item ;
var dmx_start = 136;
//var dmx_end = 4;
var dmx_count = 136+71;
var blink_obj = {};
var search = false;


var oscServer = new osc.Server(50002, '0.0.0.0');
oscServer.on("message", function (msg, rinfo) {
  //console.log(msg);
  if (msg[0]=="/item" && !search) {
    if(msg.length>1){
      if(prev_item){
        for(var k =1 ; k< prev_item.length;k++){
          blink_obj[prev_item[k]] = 0;
        }
      }
      for(var k =1 ; k< msg.length;k++){
        blink_obj[msg[k]] = 255;
      }
      universe.update(blink_obj);
      //console.log(msg[1]+"***" + msg.length);
      prev_item = msg;
    }
  }if(msg[0]=="/search") {
    if(msg.length>1){
      search = true;
      if(prev_item){
        for(var k =1 ; k< prev_item.length;k++){
          blink_obj[prev_item[k]] = 0;
        }
      }
      for(var k =1 ; k< msg.length;k++){
        blink_obj[msg[k]] = 255;
      }
      universe.update(blink_obj);
      //console.log(msg[1]+"***" + msg.length);
      prev_item = msg;
    }
  }if(msg[0]=="/reset") {
    //console.log("reset");
    search = false;
    if(prev_item){
      for(var k =1 ; k< prev_item.length;k++){
        blink_obj[prev_item[k]] = 0;
      }
    }
    universe.update(blink_obj);
  }if(msg[0]=="/selected") {
    if(msg.length>1){
	  //console.log("selected");
      blink_obj = {};
      for(var j =0;j<blink;j=j+15){
        for(var i=dmx_start;i<dmx_count;i++){
          blink_obj[i] = j;
        }
        universe.update(blink_obj);
        blink_obj = {};
      }
      for(var j =255;j>=0;j=j-15){
        for(var i=dmx_start;i<dmx_count;i++){
          blink_obj[i] = j;
        }
        universe.update(blink_obj);
        blink_obj = {};
      }
      for(var j =0;j<blink;j=j+15){
        for(var i=dmx_start;i<dmx_count;i++){
          blink_obj[i] = j;
        }
        universe.update(blink_obj);
        blink_obj = {};
      }
      for(var j =255;j>=0;j=j-15){
        for(var i=dmx_start;i<dmx_count;i++){
          blink_obj[i] = j;
        }
        universe.update(blink_obj);
        blink_obj = {};
      }
      for(var k =1 ; k< prev_item.length;k++){
        blink_obj[prev_item[k]] = 255;
      }
      universe.update(blink_obj);
      //prev_item = msg;
    }
  }
});
