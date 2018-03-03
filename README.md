# Simple calculator on Ember with a backend in rails

Is a simple calculator that performs the operations ```['+', '-', '*', '/', '**', 'sqrt']``` that gets filled on the frontend ember app and performed on the backend rails app. I used ember-cli-rails to embed the ember app inside the rails app.

Setup:
  * With an installation of ruby, version ```2.4.2```
  * run ```gem install bundler```
  * run ```bundle```

To run the tests:
  * ```cd frontend && ember test --server``` for the frontend ember app
  * ```rspec``` for the rails app

#### Future work
* Add the operations from the backend
* Polish frontend
* Properly handle unary operations
* Refactor frontend to use components
* Add more tests for frontend
