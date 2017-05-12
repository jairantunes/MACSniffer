// This is a simple code to execute read the MAC Adresses and BSSI of 
// wifi stations and access points packages that are captured by the network interface

var pcap = require('pcap');
pcap_session = pcap.createSession(process.argv[2], process.argv[3]);


pcap_session.on('packet', function (raw_packet) {
    // do some stuff with a raw packet
    // We need to be carefull with the diferent types and subtypes of the packages
    // The main issue is that some of these types/subtypes don't have the parse routine created
    // In the current code what can happen is that the program crashes
    // So we need create the proper error handling mechanism 
    // and/or adjust our own parser routine
    var packet = pcap.decode.packet(raw_packet);
//    console.log("strength: %s ", packet.signalStrength);
    console.log("PWR: " + packet.payload.signalStrength + " || shost: " + packet.payload.ieee802_11Frame.shost + " || dhost: " + packet.payload.ieee802_11Frame.dhost + " || bssid: " + packet.payload.ieee802_11Frame.bssid);
//    console.log(packet);
}); 

