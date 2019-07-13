var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var app = express();
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var Schema = mongoose.Schema

mongoose.connect("mongodb://test:test@ds053156.mlab.com:53156/mongodb-test-valentino", function (err) {

	if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
	}

	else {
		console.log('Connection established');
	}
});

mongoose.connection.once("open", function(err){

    if(err){
        console.log(err);
    }

    else{

        var schema = new Schema({
            oldData : Schema.Types.Mixed,
            newData : Schema.Types.Mixed,
            updated : {type:Date, default:Date.now().toString()}
        });

        var Oferta = mongoose.model("Oferta", schema);

    }

    app.get("/data", function(req, res){

		Oferta.find({}, function(err, snippet){

			if(err||!snippet){
				console.log(err);
			}
			else{
				console.log(snippet);
				res.send(snippet[0].newData);
			}

		});

    });

});

app.listen(process.env.PORT||8080);
