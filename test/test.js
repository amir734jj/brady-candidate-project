var should = require("should");
var request = require("supertest");
var superagent = require("superagent");
var url = "http://localhost";

describe("Check Login Functionality", function() {
			it("Check response on adding correct email and password", function(done) {
					var profile = {
						email: 'hesamian@uwm.edu',
						password: 'AMIR1372jj@'
					};
					request(url)
						.post('/login')
							.send('profile')
							.end(function(err, res) {
								if (err) {
									console.log(err);
								}console.log(res);
								res.status.should.equal(200);
								done();
							});
						});
			});
