var Matrix = function(rows, cols) {
    this.data = new Array(rows);
    for (var i = 0; i< rows; i++) {
        this.data[i] = new Array(cols);
    }
}

Matrix.prototype.set = function(col, row, val) {
    this.data[col][row] = val;
}

Matrix.prototype.print = function(title) {
    if (title) {
        console.log(title);
    }
    for (var i in this.data) {
        for (var j in this.data[i]) {
            process.stdout.write(this.data[i][j] + " ");
        }
        console.log();
    }
    console.log();
};

Matrix.prototype.add = function(M) {
    var rowsEqual = this.data.length == M.data.length;
    var colsEqual = this.data[0].length == M.data[0].length;
    if ( !rowsEqual || !colsEqual) {
        throw "can't add unequal size matrices.";
    }
    
    var Z = new Matrix(this.data.length, this.data[0].length);
    for (var i in this.data) {
        for (var j in this.data[i]) {
            Z.set(i,j, this.data[i][j] + M.data[i][j]);
        }
    }

    return Z;
}

Matrix.prototype.mult = function(M) {
    // Matrix multiplication only works if the number of the columns in the first
    // matrix is equal to the number of rows in the second
    if (this.columns() != M.rows()) {
        throw "matrices are not conformable!";
    }
    var pRows = this.rows();
    var pCols = M.columns();

    var product = new Matrix(pRows, pCols);
    //console.log("created new matrix rows = " +  product.rows() + " columns = " + product.columns());
    for (var r = 0; r<pRows; r++) {
        for (var c = 0; c< pCols; c++) {
            var rowVec = this.row(r);
            var colVec = M.col(c);
            //console.log("rowVec: " + rowVec);
            //console.log("colVec: " + colVec);
            var vprod = multiplyVector(rowVec, colVec);
            //console.log("vprod : " + vprod);
            product.set(r,c, vprod);
        }
    } 
    return product;
};

Matrix.prototype.bitProd = function(M) {
    if (this.columns() != M.rows()){
        throw "matrices are not conformable!";
    }
    var pRows = this.rows();
    var pCols = M.columns();
    var product = new Matrix(pRows, pCols);
    //console.log("created new matrix rows = " +  product.rows() + " columns = " + product.columns());
    for (var r = 0; r<pRows; r++) {
        for (var c = 0; c< pCols; c++) {
            var rowVec = this.row(r);
            var colVec = M.col(c);
            //console.log("rowVec: " + rowVec);
            //console.log("colVec: " + colVec);
            var vprod = bitwiseMultiplyVector(rowVec, colVec);
            //console.log("vprod : " + vprod);
            product.set(r,c, vprod);
        }
    } 
    return product;
};

Matrix.prototype.col = function(col) {
    var rows = this.data.length;
    var vector = new Array();
    for (var i = 0; i<rows; i++) {
        vector.push(this.data[i][col]);
    } 
    return vector;
}

Matrix.prototype.row = function(row) {
    return this.data[row];
}

Matrix.prototype.columns = function() {
    return this.data[0].length;
}
Matrix.prototype.rows = function() {
    return this.data.length;
}

function multiplyVector(v1, v2) {
    if (v1.length != v2.length) {
        throw ("uh oh");
    }
    var product = 0;
    for (var i = 0; i< v1.length; i++) {
            product += (v1[i] * v2[i]);
    }
    return product;
}

function bitwiseMultiplyVector(v1, v2) {
    if (v1.length != v2.length) {
        throw ("uh oh");
    }
    var product = 0;
    for (var i = 0; i< v1.length; i++) {
            product |= (v1[i] & v2[i]);
    }
    return product;
}



exports.Matrix = Matrix;
