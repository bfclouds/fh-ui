import FhButton from './src/FhButton.vue'

FhButton.install = function(app) {
  app.component(FhButton.name, FhButton)
}

export default FhButton