path = require 'path'
buildStylus = require './utils/build-stylus'

module.exports = (paths, options = {}) ->
  handler: ->
    buildStylus
      srcGlob: path.join(paths.frontend.src, 'stylus', 'global.styl')
      watchGlob: path.join(paths.frontend.src, 'stylus', '**', '**', '*.styl')
      outputName: 'global.css'
      outputDir: path.join(paths.frontend.build, 'css')
      options: options
