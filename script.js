(function(){
  var STORAGE_KEY = 'jp-lab-lang';
  var current = 'uk';

  function applyLang(lang){
    current = lang;
    document.documentElement.setAttribute('data-lang', lang);
    document.querySelectorAll('.lang-toggle button').forEach(function(btn){
      btn.classList.toggle('active', btn.getAttribute('data-set') === lang);
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    applyLang('uk');
    document.querySelectorAll('.lang-toggle button').forEach(function(btn){
      btn.addEventListener('click', function(){
        applyLang(btn.getAttribute('data-set'));
      });
    });

    // Hero pathway diagram: hover & focus interactions
    var svg = document.querySelector('.hero-diagram svg');
    if(svg){
      var nodes = svg.querySelectorAll('.node');
      var edges = svg.querySelectorAll('.edge');

      function clearHighlights(){
        edges.forEach(function(e){ e.classList.remove('lit'); });
        nodes.forEach(function(n){ n.classList.remove('hovered', 'connected'); });
      }

      function highlightNode(node){
        clearHighlights();
        node.classList.add('hovered');
        var id = node.getAttribute('data-id');
        var connectedIds = [];

        edges.forEach(function(edge){
          var from = edge.getAttribute('data-from');
          var to = edge.getAttribute('data-to');
          if(from === id || to === id){
            edge.classList.add('lit');
            connectedIds.push(from === id ? to : from);
          }
        });

        // Highlight connected neighbor nodes
        nodes.forEach(function(n){
          if(connectedIds.indexOf(n.getAttribute('data-id')) !== -1){
            n.classList.add('connected');
          }
        });
      }

      nodes.forEach(function(node){
        node.addEventListener('mouseenter', function(){ highlightNode(node); });
        node.addEventListener('mouseleave', clearHighlights);
        node.addEventListener('focus', function(){ highlightNode(node); });
        node.addEventListener('blur', clearHighlights);
      });
    }
  });
})();