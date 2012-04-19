function Node (value, children) {
    this.value = value;
    
    this.children = children;
    
    this.addChild = function(n) {
        this.children.push(n);
    };
    
    this.size = function() {
        if (this.children.length) {
            return this.children.length;
        } else {
            return 0;
        }
    };
    
    this.child = function(i) {
        if(this.children[i]) {
            return this.children[i];
        } else {
            return null;
        }
    };
    
}

function preorder(node) {
    if (node === null) {
        return;
    } 
    console.log(node.value);
    for (var i = 0; i<node.size(); i++) {
        preorder(node.child(i));
    }
}

function inorder(node) {
    if (node === null) {
        return;
    } 
    var l = node.child(0);
    inorder(l);
    console.log(node.value);    
    for(var i = 1; i<node.size(); i++) {
        inorder(node.child(i));
    }
}

function postorder(node) {
    if (node === null) {
        return;
    } 
    
    for (var i = 0; i<node.size(); i++) {
        postorder(node.child(i));
    }
    console.log(node.value);

}

exports.Node = Node;
exports.preorder = preorder;
exports.postorder = postorder;
exports.inorder = inorder;