var pcap = require('pcap');
pcap_session = pcap.createSession(process.argv[2], process.argv[3]);


pcap_session.on('packet', function (raw_packet) {
    // do some stuff with a raw packet
    var packet = pcap.decode.packet(raw_packet);
//    console.log("strength: %s ", packet.signalStrength);
    console.log("PWR: " + packet.payload.signalStrength + " || shost: " + packet.payload.ieee802_11Frame.shost + " || dhost: " + packet.payload.ieee802_11Frame.dhost + " || bssid: " + packet.payload.ieee802_11Frame.bssid);
//    console.log(packet);
}); 

