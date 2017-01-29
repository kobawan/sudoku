//CLEAN FUNCTION

Array.prototype.clean = function(deleteValue) {
	for (var j = 0; j < this.length; j++){
		for (var i = 0; i < this.length; i++) {
			if (this[j][i] == deleteValue) {         
			  this[j].splice(i, 1);
			  i--;
			}
		}
	}
	return this;
};

//END CLEAN FUNCTION