_und = require('./underscore-min');
//INFINITY = 9;

//from Resig



// Class for representing undirected weighted graphs.
function Graph(nodes) {
    this.nodeList = nodes.sort();
    //initialize our adjacency matrix
    this.adjacencyMatrix = [];
    var l = this.nodeList.length;
    for (var i = 0; i<l; i++) {
        this.adjacencyMatrix[i] = [];
        for (var j = 0; j<l; j++) {
            this.adjacencyMatrix[i][j] = Infinity;
        }
    }

    // the index of the element in the adjacency matrix.
    this._index = function(vertex) {
        return this.nodeList.indexOf(vertex);
    }
    
    // return the distance between 2 nodes
    this.distance = function(s, e) {
        var a = this.adjacencyMatrix[this._index(s)][this._index(e)]; 
        var b = this.adjacencyMatrix[this._index(e)][this._index(s)];
        if (a != b) {  
            // should be symmetrical.
            throw("uh oh");
        }
        return a;
    }
    
    // this adds an edge from s to f, and from f to s of a certain weight.
    this.addEdge = function(start, finish, weight) {
        // since this is an undirected graph, we are assuming that
        // edges always have a symmetry.
        this.adjacencyMatrix[this._index(start)][this._index(finish)] = weight;
        this.adjacencyMatrix[this._index(finish)][this._index(start)] = weight; 
    };
    
    // return a list of the vertices in the graph.
    this.vertices = function() {
        var clone = [];
        for (var i = 0; i< this.nodeList.length; i++) {
            clone[i] = this.nodeList[i];
        }
        return clone; 
    };
    
    
    // return a list of the nodes neighbors.
    this.neighbors = function(v) {
        var neighbors = [];
        var row = this._index(v);
        if (row == -1) {
            throw ("looking for neighbors of '" + v + "' something thats not in the node list. " + this.nodeList);
        }
        for (var i = 0; i<this.adjacencyMatrix[row].length; i++) {
            var weight = this.adjacencyMatrix[row][i];
            var nodeValue = this.nodeList[i];
            if ( (weight < Infinity) && (weight > 0) ) {
                neighbors.push(nodeValue);
            }
        } 
        return neighbors;
    };
    
    // utility function
    this.__decrease_key = function(array, v) {
        var i = array.indexOf(v);
        if (i == 0) {
            //console.log("WARN: tried to decrease index of min element");
            return;
        } else {
            var tmp = array[i-1];
            array[i-1] = array[i];
            array[i] = tmp;
        }
    };
    
    // utility function
    this.__least = function(Q, h) {
        var keys = _und.keys(h);
        var least = keys[0];
        var distance = Number.MAX_VALUE;
        _und.each(_und.keys(h), function(v) {
            if (Q.indexOf(v) != -1) {
                if (h[v] < distance) {
                    distance = h[v];
                    least = v;
                }
            }
        });
        return least;
    };
    
    // From Resig http://ejohn.org/blog/javascript-array-remove/
    this._remove = function(arr, from, to) {
        var rest = arr.slice((to || from) + 1 || arr.length);
        arr.length = from < 0 ? arr.length + from : from;
        return arr.push.apply(arr, rest);
    };
}

/*
From wikipedia http://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
1  function Dijkstra(Graph, source):
 2      for each vertex v in Graph:            // Initializations
 3          dist[v] := infinity ;              // Unknown distance function from source to v
 4          previous[v] := undefined ;         // Previous node in optimal path from source
 5      end for ;
 6      dist[source] := 0 ;                    // Distance from source to source
 7      Q := the set of all nodes in Graph ;   // All nodes in the graph are unoptimized - thus are in Q
 8      while Q is not empty:                  // The main loop
 9          u := vertex in Q with smallest distance in dist[] ;
10          if dist[u] = infinity:
11              break ;                        // all remaining vertices are inaccessible from source
12          end if ;
13          remove u from Q ;
14          for each neighbor v of u:          // where v has not yet been removed from Q.
15              alt := dist[u] + dist_between(u, v) ;
16              if alt < dist[v]:              // Relax (u,v,a)
17                  dist[v] := alt ;
18                  previous[v] := u ;
19                  decrease-key v in Q;       // Reorder v in the Queue
20              end if ;
21          end for ;
22      end while ;
23      return dist[] ;
24  end Dijkstra.

If we are only interested in a shortest path between vertices source 
and target, we can terminate the search at line 13 if u = target. 
Now we can read the shortest path from source to target by iteration:
1  S := empty sequence
2  u := target
3  while previous[u] is defined:
4      insert u at the beginning of S
5      u := previous[u]
6  end while ;
*/
Graph.prototype.shortestPath = function(source,target) {
    console.log("Computing shortest path from " +source + " to " + target + " using Dijkstra's algorithm");
    var dist = [];
    var previous = [];
    var Q = this.vertices();
    _und.each(Q, function(v) {
        dist[v] = Infinity;
        previous[v] = null;
    });
    dist[source] = 0;
    while (Q.length > 0) {
        var u = this.__least(Q, dist);
        if (dist[u] == Infinity) {
            break;
        }
        this._remove(Q, Q.indexOf(u));
        _und.each(this.neighbors(u), function(v) {
            if (Q.indexOf(v) == -1) {
                return;
            }
            alt = dist[u] + this.distance(u, v);
            if (alt < dist[v]) {
                dist[v] = alt;
                previous[v] = u;
                this.__decrease_key(Q, v);
            }
        }, this);
    }
    var S = [];
    var u = target;
    while(previous[u]) {
        S.unshift(u);
        u = previous[u];
    }
    S.unshift(source);
    return {
        distances : dist,
        shortestPath : S
    }
}

exports.Graph = Graph;

function example() {    
    /*
    EXAMPLE
    
                c ------ d   
              / |        | \
            a   |        |   f
              \ |        | /
                b ------ e 
    
    a <=> c : 1     c <=> d : 3
    a <=> b : 1     d <=> f : 2
    b <=> c : 3     e <=> f : 4
    b <=> e : 5
    */
    var G = new Graph(['a','b','c','d','e','f']);
    G.addEdge('a','b', 1);
    G.addEdge('a','c', 1);
    G.addEdge('b','c', 2);
    G.addEdge('c','d', 3);
    G.addEdge('b','e', 5);
    G.addEdge('d','f', 2);
    G.addEdge('e','f', 4);
    var shortestPath = G.shortestPath('a', 'f');
    console.log("answer:"); 
    console.log(shortestPath);  
}
