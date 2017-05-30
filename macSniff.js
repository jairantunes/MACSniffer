// This is a simple code to execute read the MAC Adresses and BSSI of 
// wifi stations and access points packages that are captured by the network interface
// Here is an example of how to run this program
// sudo node ./macSniff.js <interface> “type mgt”

// references:
//
// how to use pcap filters:
// http://www.tcpdump.org/manpages/pcap-filter.7.txt
//
// how to calculate the distance based on the BSSI power:
// https://www.quora.com/How-do-I-calculate-distance-in-meters-km-yards-from-rssi-values-in-dBm-of-BLE-in-android
// http://electronicdesign.com/communications/understanding-wireless-range-calculations

var pcap = require('../../node_pcap/pcap');
pcap_session = pcap.createSession(process.argv[2], process.argv[3]);


pcap_session.on('packet', function (raw_packet) {

    // do some stuff with a raw packet
    // http://www.tcpdump.org/manpages/pcap-filter.7.txt -> Doc for packages types/subtypes 
    // We need to be carefull with the diferent types and subtypes of the packages
    // The main issue is that some of these types/subtypes don't have the parse routine created
    // In the current code what can happen is that the program crashes
    // So we need create the proper error handling mechanism 
    // and/or adjust our own parser routine

    var packet = pcap.decode.packet(raw_packet);

    console.log( " time: "      + packet.payload.tsft + 
                 " signal: "    + packet.payload.signalStrength + 
                 " type: " + packet.payload.ieee802_11Frame.type +
                 " subtype: " + packet.payload.ieee802_11Frame.subtype +
                 " emitter: "   + packet.payload.RadioFrame.emitter +
                 " shost: "     + packet.payload.ieee802_11Frame.shost + 
                 " dhost: "     + packet.payload.ieee802_11Frame.dhost + 
                 " bssid: "     + packet.payload.ieee802_11Frame.bssid);

}); 

