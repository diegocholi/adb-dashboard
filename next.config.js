// next.config.js
const path = require('path')
module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Exemplo: Adicionar um alias
    config.resolve.alias['@components'] = path.join(__dirname, 'components')

    // Exemplo: Adicionar uma nova regra
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    // Exemplo: Modificar as regras existentes para CSS (atenção, pode precisar de ajustes específicos)
    const ruleCss = config.module.rules.find(
      (rule) => rule.test && rule.test.toString().includes('.css')
    )
    if (ruleCss) {
      const ruleCssModules = ruleCss.oneOf.find(
        (oneOf) => oneOf.sideEffects === false
      )
      if (ruleCssModules) {
        // Adicione ou modifique a configuração do loader aqui
      }
    }

    // Lembre-se de retornar a configuração modificada
    return config
  },
}
