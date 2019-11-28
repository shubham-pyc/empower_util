function create(obj) {

    this.settings = $.extend({
        'node': 'div'
    }, obj)
    var node = $(document.createElement(settings.node));

    for (var i in settings) {
        var attr = i[0].toLowerCase();

        if (attr === 'a') {
            node.attr(i.slice(1, i.length), settings[i]);
        }
        if (attr === 'e') {
            if (typeof settings[i] === 'function') {
                node.on(i.slice(1, i.length), settings[i]);
            }
        }
    }
    if (settings.class != undefined) {
        node.addClass(settings.class);
    }
    if (settings.html != undefined) {
        node.html(settings.html)
    }
    if (settings.child != undefined) {
        for (var i in settings.child) {
            node.append(settings.child[i]);
        }
    }
    
    if (settings.position != undefined) {

        node.css({
            'position': 'absolute',
            'top': settings.position.y,
            'left': settings.position.x
        })
    }

    if(settings.parent != undefined){
        //console.warn($(parent));
        $(parent).append(node);
    }
    return node;
}