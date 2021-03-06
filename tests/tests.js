const JsonLint = require('json-dup-key-validator')
const Ajv = require('ajv')
const ajv = new Ajv()
ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04'))
ajv.addSchema(require('../json/fermentation'))
ajv.addSchema(require('../json/fermentation_step'))
ajv.addSchema(require('../json/grain'))
ajv.addSchema(require('../json/hops'))
ajv.addSchema(require('../json/mash_step'))
ajv.addSchema(require('../json/mash'))
ajv.addSchema(require('../json/measureable_units'))
ajv.addSchema(require('../json/misc'))
ajv.addSchema(require('../json/recipes'))
ajv.addSchema(require('../json/style'))
ajv.addSchema(require('../json/water'))
ajv.addSchema(require('../json/yeast'))
ajv.addSchema(require('../json/equipment'))

const validate = ajv.compile(require('../json/BeerXML'))

const testJson = path => {
  console.log(path)
  const rawJSON = require('fs').readFileSync(
    __dirname + '/' + path + '.json',
    'utf8'
  )

  if (!validate(JsonLint.parse(rawJSON))) {
    console.log(JSON.stringify(validate.errors, null, 2))
    process.exit(1)
  }
}

testJson('generic/cultures')
testJson('generic/equipment')
testJson('generic/fermentable')
testJson('generic/hop_varieties')
testJson('generic/miscellaneous_ingredients')
testJson('generic/procedure')
testJson('generic/fermentation')
testJson('generic/profiles')
testJson('generic/recipes')
testJson('generic/styles')

testJson('real/MedievalAle')
testJson('real/FermentableRecord')
testJson('real/HoppedExtract')
testJson('real/CrystalMaltSpecialtyGrain')
testJson('real/IrishMoss')
testJson('real/CorianderSpice')
testJson('real/HopWithRequiredFieldsOnly')
testJson('real/HopRecordWithAllFields')
testJson('real/YeastWithRequiredFieldsOnly')
testJson('real/YeastWithMorePopularFields')
testJson('real/SampleWaterProfile')
testJson('real/StyleBohemianPilsner')
testJson('real/StyleDryIrishStoutWithAllFields')
testJson('real/MashSingleStepInfusion')
testJson('real/MashTwoStepTemperature')

testJson('styles/styleguide-2015')
