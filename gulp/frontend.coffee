module.exports = (options, paths = {}, tasks) ->
  return {
    deps: [
      'frontend-stylus'
      'frontend-img'
      'frontend-fonts'
      'frontend-js'
      'frontend-js-lib'
      'frontend-pug'
    ]
  }
