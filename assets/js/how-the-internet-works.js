  (function(){

    /* Theme is now handled by the shared toggle in main.js (data-theme-toggle / .theme-toggle-icon) —
       this page's hero button just wires into that same mechanism, see markup below. */

    /* Extracted inline event-handler attributes (were onclick/onerror in the HTML) */
    var langToggleBtn = document.getElementById('lang-toggle');
    if (langToggleBtn) {
      langToggleBtn.addEventListener('click', function(){ toggleLang && toggleLang(); });
    }
    var i18nScript = document.getElementById('i18n-script');
    if (i18nScript) {
      i18nScript.addEventListener('error', function(){ console.log('i18n not loaded'); });
    }
    var mainScript = document.getElementById('main-script');
    if (mainScript) {
      mainScript.addEventListener('error', function(){ console.log('main.js not loaded'); });
    }

    /* ═══════════════════════ OSI LAYER DATA ═══════════════════════ */
    var LAYERS = [
      { n:7, id:'application', name:'Application', color:'var(--l7)', pdu:'Data / Message',
        desc:'The only layer end-user software actually talks to. It defines the message format applications exchange — a web page request, an email, a file transfer — without caring how that message physically gets anywhere.',
        protocols:['HTTP / HTTPS','DNS','SMTP / IMAP','FTP','QUIC (app-facing)'] },
      { n:6, id:'presentation', name:'Presentation', color:'var(--l6)', pdu:'Data',
        desc:'Translates data between the format an application needs and the format that is safe to send over a network — character encoding, compression, and encryption/decryption (TLS lives conceptually here, though in practice it is bolted onto Transport).',
        protocols:['TLS / SSL','UTF-8 / ASCII','JPEG / MPEG','MIME'] },
      { n:5, id:'session', name:'Session', color:'var(--l5)', pdu:'Data',
        desc:'Opens, manages, and tears down the conversation ("session") between two applications — keeping track of who is talking to whom, handling reconnects, and synchronizing checkpoints in long transfers.',
        protocols:['Sockets API','NetBIOS','RPC','PPTP'] },
      { n:4, id:'transport', name:'Transport', color:'var(--l4)', pdu:'Segment (TCP) / Datagram (UDP)',
        desc:'Breaks application data into manageable chunks and decides how reliability works: TCP guarantees ordered, retransmitted delivery via a handshake and acknowledgements; UDP fires datagrams with no guarantees, trading reliability for speed.',
        protocols:['TCP','UDP','QUIC'] },
      { n:3, id:'network', name:'Network', color:'var(--l3)', pdu:'Packet',
        desc:'Adds logical addressing (IP addresses) and figures out the best path across multiple networks — this is the layer routers operate at, forwarding packets hop by hop toward their destination.',
        protocols:['IP (IPv4 / IPv6)','ICMP','ARP','OSPF / BGP'] },
      { n:2, id:'datalink', name:'Data Link', color:'var(--l2)', pdu:'Frame',
        desc:'Handles node-to-node delivery across a single physical link using MAC addresses — this is where switches operate, and where a frame gets a checksum trailer to catch transmission errors.',
        protocols:['Ethernet (802.3)','Wi-Fi (802.11)','PPP','MAC addressing'] },
      { n:1, id:'physical', name:'Physical', color:'var(--l1)', pdu:'Bits',
        desc:'The actual medium and signaling: electrical pulses on copper, light pulses on fiber, or radio waves over the air. No structure at all here — just a raw stream of 0s and 1s.',
        protocols:['Copper cabling','Fiber optics','Radio frequency (RF)','Hubs / repeaters'] }
    ];

    var stackList = document.getElementById('osi-stack-list');
    var detail = document.getElementById('osi-detail');

    function renderLayerList(){
      stackList.innerHTML = LAYERS.map(function(l){
        return '<button class="osi-layer" style="--lc:' + l.color + '" data-id="' + l.id + '">' +
          '<span class="osi-layer-num">L' + l.n + '</span>' +
          '<span class="osi-layer-meta">' +
            '<span class="osi-layer-name">' + l.name + '</span>' +
            '<span class="osi-layer-pdu">PDU: ' + l.pdu + '</span>' +
          '</span>' +
          '<span class="osi-layer-chev">→</span>' +
        '</button>';
      }).join('');
    }

    function renderDetail(l){
      detail.style.setProperty('--lc', l.color);
      detail.innerHTML =
        '<div class="osi-detail-badge">Layer ' + l.n + ' · ' + l.name + '</div>' +
        '<h3>' + l.name + '</h3>' +
        '<div class="osi-pdu-line">Protocol Data Unit → ' + l.pdu + '</div>' +
        '<p class="desc">' + l.desc + '</p>' +
        '<div class="osi-detail-label">Protocols that live here</div>' +
        '<div class="osi-protocol-chips">' +
          l.protocols.map(function(p){ return '<span class="osi-protocol-chip">' + p + '</span>'; }).join('') +
        '</div>';
    }

    function selectLayer(id){
      var l = LAYERS.find(function(x){ return x.id === id; });
      if (!l) return;
      Array.prototype.forEach.call(stackList.querySelectorAll('.osi-layer'), function(btn){
        btn.classList.toggle('active', btn.dataset.id === id);
      });
      renderDetail(l);
    }

    renderLayerList();
    stackList.addEventListener('click', function(e){
      var btn = e.target.closest('.osi-layer');
      if (btn) selectLayer(btn.dataset.id);
    });
    selectLayer('application');

    /* ═══════════════════════ ENCAPSULATION DIAGRAM ═══════════════════════ */
    var STAGES = [
      { name:'Application', pdu:'Data', wraps: [] },
      { name:'Transport', pdu:'Segment', wraps: [{ tag:'L4 Header', color:'var(--l4)' }] },
      { name:'Network', pdu:'Packet', wraps: [{ tag:'L3 Header', color:'var(--l3)' }, { tag:'L4 Header', color:'var(--l4)' }] },
      { name:'Data Link', pdu:'Frame', wraps: [{ tag:'L3 Header', color:'var(--l3)' }, { tag:'L4 Header', color:'var(--l4)' }], trailer:true },
      { name:'Physical', pdu:'Bits', wraps: [], bits:true }
    ];

    var encapRow = document.getElementById('encap-row');

    function buildStage(stage){
      var inner = '<div class="encap-core">DATA</div>';
      // wrap from innermost (closest to data) outward — reverse array so last item (L2) is outermost
      var order = stage.wraps.slice().reverse();
      order.forEach(function(w){
        inner = '<div class="encap-wrap" style="border-color:' + w.color + '">' +
                  '<span class="encap-tag" style="color:' + w.color + '">' + w.tag + '</span>' + inner +
                '</div>';
      });
      if (stage.trailer) {
        inner = '<div class="encap-wrap" style="border-color:var(--l2)">' +
                  '<span class="encap-tag" style="color:var(--l2)">L2 Header</span>' + inner +
                  '<span class="encap-tag" style="color:var(--l2)">L2 Trailer (CRC)</span>' +
                '</div>';
      }
      if (stage.bits) {
        inner = '<div class="encap-core" style="letter-spacing:1px">01001 11010 00110 …</div>';
      }
      return inner;
    }

    function renderStages(){
      encapRow.innerHTML = STAGES.map(function(s, i){
        return '<div class="encap-stage" data-i="' + i + '" style="--sc:' + (s.wraps[0] ? s.wraps[0].color : (s.bits ? 'var(--l1)' : 'var(--l7)')) + '">' +
          '<div class="encap-core-wrap">' + buildStage(s) + '</div>' +
          '<div class="encap-stage-name">' + s.name + '</div>' +
          '<div class="encap-stage-pdu">' + s.pdu + '</div>' +
        '</div>';
      }).join('');
    }
    renderStages();

    var direction = 'down';
    document.getElementById('dir-down').addEventListener('click', function(){ setDir('down'); });
    document.getElementById('dir-up').addEventListener('click', function(){ setDir('up'); });
    function setDir(d){
      direction = d;
      document.getElementById('dir-down').classList.toggle('active', d === 'down');
      document.getElementById('dir-up').classList.toggle('active', d === 'up');
      document.getElementById('encap-status').textContent = d === 'down' ? 'Ready — Application → Physical' : 'Ready — Physical → Application';
    }

    document.getElementById('encap-play').addEventListener('click', function(){
      var stages = Array.prototype.slice.call(encapRow.querySelectorAll('.encap-stage'));
      var seq = direction === 'down' ? stages : stages.slice().reverse();
      stages.forEach(function(s){ s.classList.remove('active'); });
      var statusEl = document.getElementById('encap-status');
      seq.forEach(function(s, idx){
        setTimeout(function(){
          s.classList.add('active');
          var label = direction === 'down' ? 'Encapsulating' : 'Decapsulating';
          statusEl.textContent = label + ' — ' + s.querySelector('.encap-stage-name').textContent;
          if (idx === seq.length - 1) {
            setTimeout(function(){ statusEl.textContent = 'Done'; }, 500);
          }
        }, idx * 550);
      });
    });

    /* ═══════════════════════ HELPERS: bitfield + flow ═══════════════════════ */
    function bitRow(fields){
      return '<div class="bitfield-row">' + fields.map(function(f){
        var basis = (f.bits / 32 * 100).toFixed(3);
        return '<div class="bitfield" style="flex:0 0 ' + basis + '%; max-width:' + basis + '%">' +
                 '<b>' + f.label + '</b><span class="bits">' + f.bits + ' bit' + (f.bits > 1 ? 's' : '') + '</span>' +
               '</div>';
      }).join('') + '</div>';
    }
    function bitDiagram(rows){
      return '<div class="bitfield-diagram">' + rows.map(bitRow).join('') + '</div>';
    }
    function fieldNotes(items){
      return '<div class="field-note">' + items.map(function(it){
        return '<div class="field-note-item"><b>' + it[0] + '</b><span>' + it[1] + '</span></div>';
      }).join('') + '</div>';
    }
    function flowDiagram(id, party1, party2, steps){
      // steps: [{label, dir:'ltr'|'rtl'}]
      var html = '<div class="flow" id="' + id + '">' +
        '<div class="flow-party"><div class="box">' + party1 + '</div></div>' +
        '<div class="flow-steps">' +
          steps.map(function(st, i){
            return '<div class="flow-step" data-i="' + i + '">' +
              '<div class="lbl">' + st.label + '</div>' +
              '<div class="line ' + (st.dir === 'ltr' ? 'right' : 'left') + '"><span class="dot ' + st.dir + '"></span></div>' +
            '</div>';
          }).join('') +
        '</div>' +
        '<div class="flow-party"><div class="box">' + party2 + '</div></div>' +
      '</div>' +
      '<button class="flow-play" data-target="' + id + '" type="button">▶ Play flow</button>';
      return html;
    }
    function wireFlowPlay(container){
      Array.prototype.forEach.call(container.querySelectorAll('.flow-play'), function(btn){
        btn.addEventListener('click', function(){
          var flow = container.querySelector('#' + btn.dataset.target);
          var steps = Array.prototype.slice.call(flow.querySelectorAll('.flow-step'));
          steps.forEach(function(s){ s.classList.remove('run'); });
          steps.forEach(function(s, idx){
            setTimeout(function(){
              void s.offsetWidth;
              s.classList.add('run');
            }, idx * 750);
          });
        });
      });
    }
    function wireTabs(container){
      Array.prototype.forEach.call(container.querySelectorAll('.pc-tabs'), function(tabbar){
        var card = tabbar.closest('.protocol-card');
        Array.prototype.forEach.call(tabbar.querySelectorAll('.pc-tab'), function(tab){
          tab.addEventListener('click', function(){
            Array.prototype.forEach.call(tabbar.querySelectorAll('.pc-tab'), function(t){ t.classList.remove('active'); });
            tab.classList.add('active');
            var group = tab.dataset.group;
            Array.prototype.forEach.call(card.querySelectorAll('.pc-pane[data-group="' + group + '"]'), function(p){
              p.classList.toggle('active', p.dataset.pane === tab.dataset.pane);
            });
          });
        });
      });
    }

    /* ═══════════════════════ PROTOCOL CARDS ═══════════════════════ */
    var grid = document.getElementById('protocol-grid');

    var cardsHTML = [];

    /* ── HTTP / HTTPS ── */
    cardsHTML.push({
      layer: 7, profiles: ['reliable'],
      html:
      '<div class="protocol-card" data-layer="7" data-profile="reliable">' +
        '<div class="pc-head">' +
          '<div><div class="pc-title">HTTP / HTTPS</div><div class="pc-sub">Application layer · runs over TCP (or QUIC for HTTP/3)</div></div>' +
          '<div class="pc-badges"><span class="pc-badge layer">L7</span><span class="pc-badge reliable">Reliable</span></div>' +
        '</div>' +
        '<div class="pc-tabs">' +
          '<button class="pc-tab active" data-group="http" data-pane="flow" type="button">Request/Response</button>' +
          '<button class="pc-tab" data-group="http" data-pane="tls" type="button">TLS Handshake</button>' +
        '</div>' +
        '<div class="pc-pane active" data-group="http" data-pane="flow">' +
          '<p class="pc-p">Every HTTP exchange is a simple request from client to server, and a response back — stateless by default, with headers carrying metadata like content type, cookies, and caching rules.</p>' +
          flowDiagram('http-flow', 'Browser', 'Server', [
            { label: 'GET /index.html HTTP/1.1', dir: 'ltr' },
            { label: '200 OK + HTML body', dir: 'rtl' },
            { label: 'GET /style.css', dir: 'ltr' },
            { label: '200 OK + CSS body', dir: 'rtl' }
          ]) +
        '</div>' +
        '<div class="pc-pane" data-group="http" data-pane="tls">' +
          '<div class="toggle2" id="tls-toggle">' +
            '<button class="active" data-v="1.2" type="button">TLS 1.2 (2 RTT)</button>' +
            '<button data-v="1.3" type="button">TLS 1.3 (1 RTT)</button>' +
          '</div>' +
          '<div id="tls-1.2">' +
            '<p class="pc-p">TLS 1.2 needs a full round trip just to agree on parameters, then another to exchange keys — two round trips before any application data moves.</p>' +
            flowDiagram('tls12-flow', 'Client', 'Server', [
              { label: 'ClientHello (cipher suites)', dir: 'ltr' },
              { label: 'ServerHello + Certificate + ServerKeyExchange', dir: 'rtl' },
              { label: 'ClientKeyExchange + ChangeCipherSpec + Finished', dir: 'ltr' },
              { label: 'ChangeCipherSpec + Finished → app data', dir: 'rtl' }
            ]) +
          '</div>' +
          '<div id="tls-1.3" style="display:none">' +
            '<p class="pc-p">TLS 1.3 collapses this to one round trip by having the client guess a key-exchange group up front — the server can finish the handshake and start sending encrypted data immediately.</p>' +
            flowDiagram('tls13-flow', 'Client', 'Server', [
              { label: 'ClientHello + KeyShare (guessed group)', dir: 'ltr' },
              { label: 'ServerHello + KeyShare + Cert + Finished + app data', dir: 'rtl' },
              { label: 'Finished → app data', dir: 'ltr' }
            ]) +
          '</div>' +
        '</div>' +
      '</div>'
    });

    /* ── DNS ── */
    cardsHTML.push({
      layer: 7, profiles: ['besteffort'],
      html:
      '<div class="protocol-card" data-layer="7" data-profile="besteffort">' +
        '<div class="pc-head">' +
          '<div><div class="pc-title">DNS</div><div class="pc-sub">Application layer · typically UDP/53, falls back to TCP/53</div></div>' +
          '<div class="pc-badges"><span class="pc-badge layer">L7</span><span class="pc-badge besteffort">Best-effort</span></div>' +
        '</div>' +
        '<div class="pc-tabs">' +
          '<button class="pc-tab active" data-group="dns" data-pane="lookup" type="button">Lookup Flow</button>' +
          '<button class="pc-tab" data-group="dns" data-pane="records" type="button">Record Types</button>' +
        '</div>' +
        '<div class="pc-pane active" data-group="dns" data-pane="lookup">' +
          '<div class="toggle2" id="dns-toggle">' +
            '<button class="active" data-v="recursive" type="button">Recursive (client ↔ resolver)</button>' +
            '<button data-v="iterative" type="button">Iterative (resolver ↔ servers)</button>' +
          '</div>' +
          '<div id="dns-recursive">' +
            '<p class="pc-p">The client asks its recursive resolver one question and waits for one final answer — the resolver does all the legwork behind the scenes.</p>' +
            flowDiagram('dns-rec-flow', 'Client', 'Resolver', [
              { label: 'Query: what is A record for naiyar.dev?', dir: 'ltr' },
              { label: '(resolver walks root → TLD → authoritative)', dir: 'ltr' },
              { label: 'Final answer: 76.76.21.61', dir: 'rtl' }
            ]) +
          '</div>' +
          '<div id="dns-iterative" style="display:none">' +
            '<p class="pc-p">Behind the resolver, each query to root, TLD, and authoritative servers is iterative — every server either answers directly or refers the resolver to the next server down the chain.</p>' +
            flowDiagram('dns-it-flow', 'Resolver', 'Root/TLD/Auth', [
              { label: 'Query root: who handles .dev?', dir: 'ltr' },
              { label: 'Referral → TLD server for .dev', dir: 'rtl' },
              { label: 'Query TLD: who handles naiyar.dev?', dir: 'ltr' },
              { label: 'Referral → authoritative server', dir: 'rtl' },
              { label: 'Query authoritative: A record?', dir: 'ltr' },
              { label: 'Answer: 76.76.21.61', dir: 'rtl' }
            ]) +
          '</div>' +
        '</div>' +
        '<div class="pc-pane" data-group="dns" data-pane="records">' +
          '<table class="mini-table"><thead><tr><th>Type</th><th>Purpose</th></tr></thead><tbody>' +
            '<tr><td><b>A</b></td><td>Maps a hostname to an IPv4 address.</td></tr>' +
            '<tr><td><b>AAAA</b></td><td>Maps a hostname to an IPv6 address.</td></tr>' +
            '<tr><td><b>CNAME</b></td><td>Aliases one hostname to another hostname (which is then resolved again).</td></tr>' +
            '<tr><td><b>MX</b></td><td>Points a domain to the mail servers responsible for accepting email.</td></tr>' +
          '</tbody></table>' +
        '</div>' +
      '</div>'
    });

    /* ── QUIC ── */
    cardsHTML.push({
      layer: 4, profiles: ['lowlatency', 'reliable'],
      html:
      '<div class="protocol-card" data-layer="4" data-profile="lowlatency reliable">' +
        '<div class="pc-head">' +
          '<div><div class="pc-title">QUIC</div><div class="pc-sub">Transport layer · built on UDP, powers HTTP/3</div></div>' +
          '<div class="pc-badges"><span class="pc-badge layer">L4</span><span class="pc-badge lowlatency">Low-latency</span></div>' +
        '</div>' +
        '<p class="pc-p">QUIC rebuilds reliability and encryption directly on top of UDP, folding the transport and TLS 1.3 handshakes into a single round trip, and giving every stream its own lane so one lost packet cannot stall the others.</p>' +
        '<table class="mini-table"><thead><tr><th>Property</th><th>TCP + TLS</th><th>QUIC</th></tr></thead><tbody>' +
          '<tr><td>Handshake round trips</td><td><b>2–3 RTT</b></td><td><b>0–1 RTT</b></td></tr>' +
          '<tr><td>Head-of-line blocking</td><td><b>Yes</b>, across all streams</td><td><b>No</b>, per-stream delivery</td></tr>' +
          '<tr><td>Connection migration</td><td><b>No</b> — tied to IP:port</td><td><b>Yes</b> — survives network switches</td></tr>' +
          '<tr><td>Encryption</td><td>Bolted on (TLS)</td><td>Built-in by design</td></tr>' +
        '</tbody></table>' +
        '<div class="lane-compare">' +
          '<div class="lane-card"><h5>TCP: one blocked stream stalls all</h5>' +
            '<div class="lane blocked"><span></span></div>' +
            '<div class="lane blocked" style="opacity:.5"><span style="width:20%"></span></div>' +
            '<div class="lane blocked" style="opacity:.5"><span style="width:20%"></span></div>' +
          '</div>' +
          '<div class="lane-card"><h5>QUIC: independent stream lanes</h5>' +
            '<div class="lane stream1"><span></span></div>' +
            '<div class="lane stream2"><span></span></div>' +
            '<div class="lane stream3"><span></span></div>' +
          '</div>' +
        '</div>' +
      '</div>'
    });

    /* ── TCP ── */
    cardsHTML.push({
      layer: 4, profiles: ['reliable'],
      html:
      '<div class="protocol-card" data-layer="4" data-profile="reliable">' +
        '<div class="pc-head">' +
          '<div><div class="pc-title">TCP</div><div class="pc-sub">Transport layer · connection-oriented, ordered, reliable</div></div>' +
          '<div class="pc-badges"><span class="pc-badge layer">L4</span><span class="pc-badge reliable">Reliable</span></div>' +
        '</div>' +
        '<div class="pc-tabs">' +
          '<button class="pc-tab active" data-group="tcp" data-pane="handshake" type="button">3-Way Handshake</button>' +
          '<button class="pc-tab" data-group="tcp" data-pane="header" type="button">Header Structure</button>' +
        '</div>' +
        '<div class="pc-pane active" data-group="tcp" data-pane="handshake">' +
          '<p class="pc-p">Before any data flows, both sides synchronize sequence numbers with three messages — this is the cost of TCP\'s reliability guarantee.</p>' +
          flowDiagram('tcp-flow', 'Client', 'Server', [
            { label: 'SYN (seq=x)', dir: 'ltr' },
            { label: 'SYN-ACK (seq=y, ack=x+1)', dir: 'rtl' },
            { label: 'ACK (ack=y+1) → connection established', dir: 'ltr' }
          ]) +
        '</div>' +
        '<div class="pc-pane" data-group="tcp" data-pane="header">' +
          bitDiagram([
            [ {label:'Source Port', bits:16}, {label:'Destination Port', bits:16} ],
            [ {label:'Sequence Number', bits:32} ],
            [ {label:'Acknowledgment Number', bits:32} ],
            [ {label:'Data Offset', bits:4}, {label:'Reserved', bits:6}, {label:'Flags', bits:6}, {label:'Window Size', bits:16} ],
            [ {label:'Checksum', bits:16}, {label:'Urgent Pointer', bits:16} ],
            [ {label:'Options (variable)', bits:32} ]
          ]) +
          fieldNotes([
            ['Sequence #', 'Position of this segment\'s first byte in the overall byte stream — how TCP reorders and detects loss.'],
            ['Flags', 'SYN, ACK, FIN, RST, PSH, URG — control bits that drive connection setup, teardown, and delivery.'],
            ['Window Size', 'How many bytes the sender is willing to receive right now — the basis of TCP flow control.'],
            ['Checksum', 'Error-detection over header + data, covering corruption introduced anywhere along the path.']
          ]) +
        '</div>' +
      '</div>'
    });

    /* ── UDP ── */
    cardsHTML.push({
      layer: 4, profiles: ['besteffort', 'lowlatency'],
      html:
      '<div class="protocol-card" data-layer="4" data-profile="besteffort lowlatency">' +
        '<div class="pc-head">' +
          '<div><div class="pc-title">UDP</div><div class="pc-sub">Transport layer · connectionless, no guarantees</div></div>' +
          '<div class="pc-badges"><span class="pc-badge layer">L4</span><span class="pc-badge besteffort">Best-effort</span></div>' +
        '</div>' +
        '<p class="pc-p">No handshake, no acknowledgements, no retransmission — UDP just fires datagrams and moves on. That makes it fast and lightweight, ideal for DNS, video calls, and gaming where a late packet is worse than a dropped one.</p>' +
        bitDiagram([
          [ {label:'Source Port', bits:16}, {label:'Destination Port', bits:16} ],
          [ {label:'Length', bits:16}, {label:'Checksum', bits:16} ]
        ]) +
        '<div class="field-note">' +
          '<div class="field-note-item"><b>Header size</b><span>Just 8 bytes, versus TCP\'s minimum 20 — far less overhead per packet.</span></div>' +
          '<div class="field-note-item"><b>No sequencing</b><span>Datagrams can arrive out of order, duplicated, or not at all — the application must handle that if it matters.</span></div>' +
        '</div>' +
        '<div class="lane-compare" style="grid-template-columns:1fr">' +
          '<div class="lane-card"><h5>UDP stream: fire and forget, no waiting</h5>' +
            '<div class="lane stream1"><span style="width:100%"></span></div>' +
          '</div>' +
        '</div>' +
      '</div>'
    });

    /* ── IP ── */
    cardsHTML.push({
      layer: 3, profiles: ['besteffort'],
      html:
      '<div class="protocol-card" data-layer="3" data-profile="besteffort">' +
        '<div class="pc-head">' +
          '<div><div class="pc-title">IP (IPv4 / IPv6)</div><div class="pc-sub">Network layer · logical addressing &amp; routing</div></div>' +
          '<div class="pc-badges"><span class="pc-badge layer">L3</span><span class="pc-badge besteffort">Best-effort</span></div>' +
        '</div>' +
        '<div class="pc-tabs">' +
          '<button class="pc-tab active" data-group="ip" data-pane="ipv4" type="button">IPv4 Header</button>' +
          '<button class="pc-tab" data-group="ip" data-pane="ipv6" type="button">IPv6 Header</button>' +
          '<button class="pc-tab" data-group="ip" data-pane="subnet" type="button">Subnetting</button>' +
        '</div>' +
        '<div class="pc-pane active" data-group="ip" data-pane="ipv4">' +
          bitDiagram([
            [ {label:'Version', bits:4}, {label:'IHL', bits:4}, {label:'Type of Service', bits:8}, {label:'Total Length', bits:16} ],
            [ {label:'Identification', bits:16}, {label:'Flags', bits:3}, {label:'Fragment Offset', bits:13} ],
            [ {label:'TTL', bits:8}, {label:'Protocol', bits:8}, {label:'Header Checksum', bits:16} ],
            [ {label:'Source IP Address', bits:32} ],
            [ {label:'Destination IP Address', bits:32} ]
          ]) +
          fieldNotes([
            ['TTL', 'Time To Live — decremented by every router hop; the packet is discarded at zero, preventing infinite routing loops.'],
            ['Protocol', 'Tells the receiver which L4 protocol to hand this payload to next — 6 for TCP, 17 for UDP.'],
            ['Source / Dest IP', 'The 32-bit logical addresses routers use to forward this packet toward its destination.']
          ]) +
        '</div>' +
        '<div class="pc-pane" data-group="ip" data-pane="ipv6">' +
          bitDiagram([
            [ {label:'Version', bits:4}, {label:'Traffic Class', bits:8}, {label:'Flow Label', bits:20} ],
            [ {label:'Payload Length', bits:16}, {label:'Next Header', bits:8}, {label:'Hop Limit', bits:8} ],
            [ {label:'Source Address (128 bits)', bits:32} ],
            [ {label:'…continued (128-bit total)', bits:32} ],
            [ {label:'Destination Address (128 bits)', bits:32} ],
            [ {label:'…continued (128-bit total)', bits:32} ]
          ]) +
          fieldNotes([
            ['Hop Limit', 'IPv6\'s equivalent of TTL — same job, renamed for clarity.'],
            ['Next Header', 'Replaces IPv4\'s Protocol field and also chains optional extension headers.'],
            ['Address space', '128-bit addresses (vs IPv4\'s 32-bit) — enough for roughly 3.4×10³⁸ unique addresses, ending address exhaustion.']
          ]) +
        '</div>' +
        '<div class="pc-pane" data-group="ip" data-pane="subnet">' +
          '<div class="subnet-tool">' +
            '<div class="pc-p">Drag the prefix length to see how CIDR notation splits an address space into network and host bits.</div>' +
            '<label style="font-family:var(--mono);font-size:.72rem;color:var(--accent5);font-weight:700" id="subnet-cidr-label">192.168.1.0 / 24</label>' +
            '<input type="range" min="0" max="32" value="24" id="subnet-range">' +
            '<div class="subnet-readout">' +
              '<div class="subnet-stat"><div class="k">Subnet Mask</div><div class="v" id="subnet-mask">255.255.255.0</div></div>' +
              '<div class="subnet-stat"><div class="k">Network Bits</div><div class="v" id="subnet-netbits">24</div></div>' +
              '<div class="subnet-stat"><div class="k">Host Bits</div><div class="v" id="subnet-hostbits">8</div></div>' +
              '<div class="subnet-stat"><div class="k">Usable Hosts</div><div class="v" id="subnet-hosts">254</div></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    });

    grid.innerHTML = cardsHTML.map(function(c){ return c.html; }).join('');
    wireFlowPlay(grid);
    wireTabs(grid);

    /* TLS toggle */
    var tlsToggle = document.getElementById('tls-toggle');
    if (tlsToggle) {
      tlsToggle.addEventListener('click', function(e){
        var btn = e.target.closest('button');
        if (!btn) return;
        Array.prototype.forEach.call(tlsToggle.querySelectorAll('button'), function(b){ b.classList.remove('active'); });
        btn.classList.add('active');
        document.getElementById('tls-1.2').style.display = btn.dataset.v === '1.2' ? '' : 'none';
        document.getElementById('tls-1.3').style.display = btn.dataset.v === '1.3' ? '' : 'none';
      });
    }

    /* DNS toggle */
    var dnsToggle = document.getElementById('dns-toggle');
    if (dnsToggle) {
      dnsToggle.addEventListener('click', function(e){
        var btn = e.target.closest('button');
        if (!btn) return;
        Array.prototype.forEach.call(dnsToggle.querySelectorAll('button'), function(b){ b.classList.remove('active'); });
        btn.classList.add('active');
        document.getElementById('dns-recursive').style.display = btn.dataset.v === 'recursive' ? '' : 'none';
        document.getElementById('dns-iterative').style.display = btn.dataset.v === 'iterative' ? '' : 'none';
      });
    }

    /* Subnetting live calculator */
    var subnetRange = document.getElementById('subnet-range');
    if (subnetRange) {
      function prefixToMask(n){
        var bits = '';
        for (var i = 0; i < 32; i++) bits += i < n ? '1' : '0';
        var octets = [];
        for (var o = 0; o < 4; o++) octets.push(parseInt(bits.slice(o * 8, o * 8 + 8), 2));
        return octets.join('.');
      }
      function updateSubnet(){
        var n = parseInt(subnetRange.value, 10);
        var hostBits = 32 - n;
        var usable = hostBits >= 2 ? Math.pow(2, hostBits) - 2 : (hostBits === 1 ? 0 : 1);
        document.getElementById('subnet-cidr-label').textContent = '192.168.1.0 / ' + n;
        document.getElementById('subnet-mask').textContent = prefixToMask(n);
        document.getElementById('subnet-netbits').textContent = n;
        document.getElementById('subnet-hostbits').textContent = hostBits;
        document.getElementById('subnet-hosts').textContent = usable.toLocaleString();
      }
      subnetRange.addEventListener('input', updateSubnet);
      updateSubnet();
    }

    /* ═══════════════════════ FILTERS ═══════════════════════ */
    var activeLayer = 'all';
    var activeProfile = 'all';
    function applyFilters(){
      Array.prototype.forEach.call(grid.querySelectorAll('.protocol-card'), function(card){
        var layerOk = activeLayer === 'all' || card.dataset.layer === activeLayer;
        var profOk = activeProfile === 'all' || (' ' + card.dataset.profile + ' ').indexOf(' ' + activeProfile + ' ') !== -1;
        card.classList.toggle('hidden', !(layerOk && profOk));
      });
    }
    document.getElementById('layer-filters').addEventListener('click', function(e){
      var btn = e.target.closest('.filter-btn');
      if (!btn) return;
      activeLayer = btn.dataset.layer;
      Array.prototype.forEach.call(this.querySelectorAll('.filter-btn'), function(b){ b.classList.toggle('active', b === btn); });
      applyFilters();
    });
    document.getElementById('profile-filters').addEventListener('click', function(e){
      var btn = e.target.closest('.filter-btn');
      if (!btn) return;
      activeProfile = btn.dataset.profile;
      Array.prototype.forEach.call(this.querySelectorAll('.filter-btn'), function(b){ b.classList.toggle('active', b === btn); });
      applyFilters();
    });

  })();
