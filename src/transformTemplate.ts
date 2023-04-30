// eslint-disable-next-line vue/prefer-import-from-vue
import { extend } from '@vue/shared';
// import * as CompilerDOM from '@vue/compiler-dom'
import { 
  parse,
  getBaseTransformPreset,
  DOMNodeTransforms,
  DOMDirectiveTransforms 
} from '@vue/compiler-dom'

import { stringifyStatic } from '@/tempalte/stringifyStatic'
import { transform, generate } from '@vue/compiler-core'



function creareOptions(options: any = {}) {
  const { expressionPlugins } = options || {}
  options.expressionPlugins = [...(expressionPlugins || []), 'typescript']
  const [nodeTransforms, directiveTransforms] =
    getBaseTransformPreset(true);

  return extend({}, options, {
    prefixIdentifiers: true,
    isSSR: false,
    mode: 'module',
    cacheHandlers: true,
    hoistStatic: true,
    nodeTransforms: [
      ...nodeTransforms,
      ...DOMNodeTransforms,
      ...(options.nodeTransforms || []) // user transforms
    ],
    directiveTransforms: extend(
      {},
      directiveTransforms,
      DOMDirectiveTransforms,
      options.directiveTransforms || {} // user transforms
    ),
    transformHoist:  stringifyStatic
  })
}

function parseTemplate(content: string, options: any = {}) {
  const resovledOptions = creareOptions(options)
  return parse(content, resovledOptions)
}

function transformTemplate(ast: any, options: any = {}) {
  const resovledOptions = creareOptions(options)
  transform(
    ast,
    resovledOptions
  )

  return ast
}

function generateTemplate(ast: any, options: any = {}) {
  const resovledOptions = creareOptions(options)
  return generate(
    ast,
    extend({}, resovledOptions, {
      mode: 'module',
      prefixIdentifiers: true
    })
  )
}

export {
  transformTemplate,
  parseTemplate, 
  generateTemplate,
}